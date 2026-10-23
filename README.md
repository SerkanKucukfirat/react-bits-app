# React Bits App

Vite + React + TypeScript + Tailwind CSS projesi. [React Bits](https://reactbits.dev) bileşenleri Claude Code üzerinden eklenmeye hazır.

## Kurulum

```bash
npm install
npm run dev
```

## Claude Code ile React Bits

- `components.json` içinde `@react-bits` kaynağı tanımlı.
- `.mcp.json` içinde shadcn MCP sunucusu tanımlı. Claude Code bu klasörde açıldığında sunucuyu onaylamanızı ister.

Örnek istekler:

- "React Bits'teki tüm arka planları göster"
- "React Bits'ten Dither arka planını sayfaya ekle, mor yap"
- "FadeContent ile kaydırınca beliren yeni bir bölüm ekle"

Elle eklemek için: `npx shadcn@latest add @react-bits/Dither-TS-TW`
