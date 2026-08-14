'use client'

import { useEffect, useState } from 'react'

/** Simula o carregamento de dados para exibir Skeletons. */
export function useLoading(delay = 900) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), delay)
    return () => clearTimeout(t)
  }, [delay])

  return loading
}
