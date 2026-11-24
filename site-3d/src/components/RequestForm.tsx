import { useState, type FormEvent, type MouseEvent, type ReactNode } from 'react'
import { EMAIL, WHATSAPP } from '../content'

// The site is static (GitHub Pages), so requests are mailed to EMAIL through FormSubmit
// (formsubmit.co), a form-to-email relay. WhatsApp stays available as a second way to send.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`
const WA_NUMBER = /wa\.me\/(\d+)/.exec(WHATSAPP)?.[1] ?? ''

export type Field =
  | { name: string; label: string; type?: 'text' | 'email' | 'tel'; required?: boolean; half?: boolean; placeholder?: string; autoComplete?: string }
  | { name: string; label: string; type: 'textarea'; required?: boolean; placeholder?: string }
  | { name: string; label: string; type: 'select'; options: string[]; required?: boolean; half?: boolean }
  | { name: string; label: string; type: 'checks'; options: string[] }

type Props = { title: string; fields: Field[]; submitLabel?: string; note?: ReactNode }
type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'wa'; text: string } | { kind: 'error'; text: string }

function values(fields: Field[], data: FormData) {
  return fields
    .map(f => [f.label, f.type === 'checks' ? data.getAll(f.name).join(', ') : String(data.get(f.name) ?? '').trim()] as const)
    .filter(([, v]) => v)
}

function compose(title: string, rows: (readonly [string, string])[]) {
  return [`*${title}*`, '', ...rows.map(([k, v]) => (v.includes('\n') ? `${k}:\n${v}` : `${k}: ${v}`))].join('\n')
}

export default function RequestForm({ title, fields, submitLabel = 'Gönder', note }: Props) {
  const [state, setState] = useState<State>({ kind: 'idle' })

  const read = (form: HTMLFormElement) => (form.reportValidity() ? values(fields, new FormData(form)) : null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const rows = read(form)
    if (!rows) return
    setState({ kind: 'sending' })
    const email = rows.find(([k]) => k === 'E-posta')?.[1]
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: [title, rows.find(([k]) => k === 'Ad Soyad')?.[1]].filter(Boolean).join(' — '),
          _template: 'table',
          _captcha: 'false',
          ...(email ? { _replyto: email } : {}),
          ...Object.fromEntries(rows),
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || String(json.success) !== 'true') throw new Error(json.message || res.status)
      form.reset()
      setState({ kind: 'sent' })
    } catch {
      setState({ kind: 'error', text: compose(title, rows) })
    }
  }

  const byWhatsApp = (e: MouseEvent<HTMLButtonElement>) => {
    const rows = read(e.currentTarget.form!)
    if (!rows) return
    const text = compose(title, rows)
    setState({ kind: 'wa', text })
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  return (
    <form className="rform" onSubmit={onSubmit}>
      <div className="rform-grid">
        {fields.map(f => {
          const id = `rf-${f.name}`
          const req = 'required' in f && f.required
          const label = (
            <span className="rform-label">
              {f.label}
              {req && <em aria-hidden> *</em>}
            </span>
          )
          if (f.type === 'checks')
            return (
              <fieldset key={f.name} className="rform-field full">
                <legend className="rform-label">{f.label}</legend>
                <div className="rform-checks">
                  {f.options.map(o => (
                    <label key={o} className="rform-check">
                      <input type="checkbox" name={f.name} value={o} />
                      <span>{o}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )
          if (f.type === 'textarea')
            return (
              <label key={f.name} htmlFor={id} className="rform-field full">
                {label}
                <textarea id={id} name={f.name} rows={5} required={req} placeholder={f.placeholder} />
              </label>
            )
          if (f.type === 'select')
            return (
              <label key={f.name} htmlFor={id} className={`rform-field ${f.half ? '' : 'full'}`}>
                {label}
                <select id={id} name={f.name} required={req} defaultValue="">
                  <option value="" disabled>
                    Seçin
                  </option>
                  {f.options.map(o => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
            )
          return (
            <label key={f.name} htmlFor={id} className={`rform-field ${f.half ? '' : 'full'}`}>
              {label}
              <input id={id} name={f.name} type={f.type ?? 'text'} required={req} placeholder={f.placeholder} autoComplete={f.autoComplete} />
            </label>
          )
        })}
      </div>
      <div className="rform-actions">
        <button type="submit" className="btn dark" disabled={state.kind === 'sending'}>
          {state.kind === 'sending' ? 'Gönderiliyor…' : submitLabel} <span>↗</span>
        </button>
        <button type="button" className="btn ghost-dark" onClick={byWhatsApp}>
          WhatsApp ile gönder
        </button>
      </div>
      {note && <p className="rform-note">{note}</p>}
      <div aria-live="polite">
        {state.kind === 'sent' && (
          <div className="rform-sent">
            <strong>Talebiniz bize ulaştı, teşekkürler.</strong>
            <span>Ekibimiz en kısa sürede sizinle iletişime geçecek.</span>
          </div>
        )}
        {state.kind === 'wa' && (
          <div className="rform-sent">
            <strong>WhatsApp açıldı, mesajı göndermeniz yeterli.</strong>
            <span>Açılmadıysa aşağıdaki metni kopyalayıp WhatsApp’tan iletebilirsiniz.</span>
            <pre>{state.text}</pre>
          </div>
        )}
        {state.kind === 'error' && (
          <div className="rform-sent is-error">
            <strong>Talebiniz şu an gönderilemedi.</strong>
            <span>
              Lütfen tekrar deneyin, “WhatsApp ile gönder”i kullanın ya da aşağıdaki metni <a href={`mailto:${EMAIL}`}>{EMAIL}</a> adresine iletin.
            </span>
            <pre>{state.text.replace(/\*/g, '')}</pre>
          </div>
        )}
      </div>
    </form>
  )
}
