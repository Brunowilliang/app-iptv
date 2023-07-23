import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { IChannel } from '~/types/types'
import { Text } from '../Text'

interface Props {
  item: IChannel
  onPress: () => void
}

export default function CardChannels({ item, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="my-1 flex-row items-center rounded-lg bg-slate-800 p-3"
    >
      <Image
        source={{
          uri: item.tvg.logo,
        }}
        alt={item.name}
        style={{
          width: 50,
          height: 50,
          resizeMode: 'contain',
        }}
      />
      <View className="ml-3 flex-1">
        <Text h6 semibold className="text-slate-400">
          {item.name}
        </Text>
        <Text h6 medium className="text-slate-500">
          {item.group.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
