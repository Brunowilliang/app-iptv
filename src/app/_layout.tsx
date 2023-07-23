import { Slot, SplashScreen } from 'expo-router'
import useLoadFonts from '~/hooks/useLoadFonts'
import { AuthProvider } from '~/providers/AuthProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LogBox } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { StatusBar } from 'expo-status-bar'
import FlashMessage from 'react-native-flash-message'

export { ErrorBoundary } from 'expo-router'

LogBox.ignoreLogs(['Could not find image'])

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const { loaded } = useLoadFonts()

  if (!loaded) {
    return null
  }

  return <RootLayout />
}

const queryClient = new QueryClient()

function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1 justify-center bg-gray-100">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <StatusBar style="dark" />
          <BottomSheetModalProvider>
            <FlashMessage position="top" />
            <Slot />
          </BottomSheetModalProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
