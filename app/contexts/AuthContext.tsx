'use client'

import { createContext, ReactNode, useCallback, useContext } from 'react'

type AuthContextValue = {
  signIn: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  // Default noop implementation so pages keep working even without the provider.
  signIn: async () => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('AuthProvider missing: signIn is falling back to a no-op implementation.')
    }
  },
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const signIn = useCallback(async (email: string, password: string) => {
    // TODO: replace with your real auth request
    console.info('Signing in (stub)', { email, passwordPresent: Boolean(password) })
    await new Promise((resolve) => setTimeout(resolve, 300))
  }, [])

  return <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

