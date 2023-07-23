import { useRouter, useSegments } from 'expo-router'
import React, { ReactNode, createContext, useEffect, useState } from 'react'

export const AuthContext = createContext({} as any)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [appIsReady, setAppIsReady] = useState(false)
  // const isValid = api.authStore.isValid
  const isValid = false

  useProtectedRoute(isValid)

  useEffect(() => {
    setAppIsReady(true)
  }, [])

  const value = {} as any

  return (
    <AuthContext.Provider value={value}>
      {appIsReady ? children : null}
    </AuthContext.Provider>
  )
}

function useProtectedRoute(isValid: boolean) {
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)'

    if (!isValid && !inAuthGroup) {
      setTimeout(() => {
        router.replace('/(auth)/')
      }, 1)
    } else if (isValid && inAuthGroup) {
      setTimeout(() => {
        router.replace('/(app)/')
      }, 1)
    }
  }, [isValid, segments, router])
}
