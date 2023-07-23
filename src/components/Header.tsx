import React from 'react'
import { CaretLeft } from 'phosphor-react-native'
import { colors } from '~/styles/constants'
import { useRouter } from 'expo-router'
import { Pressable, View, ViewProps } from 'react-native'
import { Text } from './Text'

interface Props extends ViewProps {
  back?: boolean
  title?: string
  subtitle?: string
  rightComponent?: React.ReactNode
  leftComponent?: React.ReactNode
  color?: string
}

const Header = (p: Props) => {
  const router = useRouter()

  return (
    <View
      {...p}
      className="justify-betweenpx-4 flex-row items-center px-4 py-3"
    >
      {p.back && (
        <Pressable onPress={router.back} className="mr-3">
          <CaretLeft size={26} weight="bold" color={colors.bluePrimary} />
        </Pressable>
      )}

      {p.leftComponent && <>{p.leftComponent}</>}

      <View className="flex-1">
        {p.title && (
          <Text h3 medium className="text-gray leading-5">
            {p.title}
          </Text>
        )}
        {p.subtitle && (
          <Text h3 bold className="text-gray leading-5 ">
            {p.subtitle}
          </Text>
        )}
      </View>

      {p.rightComponent && <>{p.rightComponent}</>}
    </View>
  )
}

export default Header
