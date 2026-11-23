import { useState, type FormEvent, type ReactNode } from 'react'
import { EMAIL, WHATSAPP } from '../content'

// The site is static (GitHub Pages), so a request is handed to WhatsApp — or the visitor's mail app —
// as a ready-written message. Nothing is stored or sent anywhere else.
const WA_NUMBER = /wa\.me\/(\d+)/.exec(WHATSAPP)?.[1] ?? ''

export type Field =
  | { name: string; label: string; type?: 'text' | 'email' | 'tel'; required?: boolean; half?: boolean; placeholder?: string; autoComplete?: string }
  | { name: string; label: string; type: 'textarea'; required?: boolean; placeholder?: string }
  | { name: string; label: string; type: 'select'; options: string[]; required?: boolean; half?: boolean }
  | { name: string; label: string; type: 'checks'; options: string[] }

type Props = { title: string; fields: Field[]; submitLabel?: string; note?: ReactNode }

function compose(title: string, fields: Field[], data: FormData) {
  const lines = [`*${title}*`, '']
  for (const f of fields) {
    const v = f.type === 'checks' ? data.getAll(f.name).join(', ') : String(data.get(f.name) ?? '').trim()
    if (v) lines.push(f.type === 'textarea' ? `${f.label}:\n${v}` : `${f.label}: ${v}`)
  }
  return lines.join('\n')
}

export default function RequestForm({ title, fields, submitLabel = 'WhatsApp ile gönder', note }: Props) {
  const [sent, setSent] = useState<'wa' | 'mail' | null>(null)
  const [message, setMessage] = useState('')

  const read = (form: HTMLFormElement) => {
    if (!form.reportValidity()) return null
    return compose(title, fields, new FormData(form))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const text = read(e.currentTarget)
    if (!text) return
    setMessage(text)
    setSent('wa')
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  const byMail = (e: React.MouseEvent<HTMLButtonElement>) => {
    const text = read(e.currentTarget.form!)
    if (!text) return
    setMessage(text)
    setSent('mail')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text.replace(/\*/g, ''))}`
  }

  return (
    <form className="rform" onSubmit={onSubmit} noValidate={false}>
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
        <button type="submit" className="btn dark">
          {submitLabel} <span>↗</span>
        </button>
        <button type="button" className="btn ghost-dark" onClick={byMail}>
          E-posta ile gönder
        </button>
      </div>
      {note && <p className="rform-note">{note}</p>}
      {sent && (
        <div className="rform-sent" role="status">
          <strong>{sent === 'wa' ? 'WhatsApp açıldı, mesajı göndermeniz yeterli.' : 'E-posta uygulamanız açıldı, göndermeniz yeterli.'}</strong>
          <span>Açılmadıysa aşağıdaki metni kopyalayıp {sent === 'wa' ? 'WhatsApp’tan' : `${EMAIL} adresine`} iletebilirsiniz.</span>
          <pre>{message}</pre>
        </div>
      )}
    </form>
  )
}
