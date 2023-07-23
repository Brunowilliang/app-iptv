import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { SplashScreen } from 'expo-router'

export default function useLoadFonts() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    MontserratBold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    MontserratSemiBold: require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    MontserratMedium: require('../../assets/fonts/Montserrat-Medium.ttf'),
    MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf'),
  })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        SplashScreen.hideAsync()
      }, 500)
    }
  }, [loaded])

  return { loaded }
}
