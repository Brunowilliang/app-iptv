import React from 'react'
import { View } from 'react-native'
import { Text } from '~/components/Text'

export default function NotFoundPage() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text h1 bold>
        Ooops!
      </Text>
      <Text h2>Page not found</Text>
    </View>
  )
}
