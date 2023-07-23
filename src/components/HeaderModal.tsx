import { useRouter } from 'expo-router'
import { CaretDown } from 'phosphor-react-native'
import React from 'react'
import { TouchableOpacity, View, ViewProps } from 'react-native'
import { Text } from './Text'
import { colors } from '~/styles/constants'

interface Props extends ViewProps {
  title: string
  onPress?: () => void
  back?: boolean
  rightComponent?: React.ReactNode
}

const HeaderModal = (p: Props) => {
  const router = useRouter()

  return (
    <View className="flex-row items-center justify-between py-3" {...p}>
      <View className="w-14">
        {p.back && (
          <TouchableOpacity
            className="items-start"
            onPress={() => router.back()}
          >
            <CaretDown size={25} weight="bold" color={colors.gray} />
          </TouchableOpacity>
        )}
      </View>
      <Text h5 semibold className="text-gray">
        {p.title}
      </Text>
      <View className="w-14 items-center justify-end space-x-2">
        {p.rightComponent}
      </View>
    </View>
  )
}

export default HeaderModal
