// The site is served under a sub-path on GitHub Pages (e.g. /react-bits-app/), so plain <a href> values need the base prefix
export const BASE = import.meta.env.BASE_URL

export const to = (path: string) => BASE + path.replace(/^\//, '')
