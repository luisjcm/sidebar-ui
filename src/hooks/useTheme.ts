import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function readInitial(fallback: Theme | 'system'): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* storage no disponible */
  }
  if (fallback !== 'system') return fallback
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Guarda el tema y lo aplica como `data-theme` en <html>.
 * `fallback` es el tema cuando el usuario aún no eligió ninguno: 'dark', 'light' o 'system'.
 */
export function useTheme(fallback: Theme | 'system' = 'system') {
  const [theme, setTheme] = useState<Theme>(() => readInitial(fallback))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, setTheme, toggle }
}
