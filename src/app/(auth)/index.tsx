import { ResizeMode, Video } from 'expo-av'
import React, { useEffect, useRef, useState } from 'react'
import {
  FlatList,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CardGroups from '~/components/Page/CardGroups'
import CardChannels from '~/components/Page/CardChannels'
import { Text } from '~/components/Text'
import Toast from '~/components/Toast'
import { useChannels, useGroups } from '~/hooks/useChannels'

export default function Page() {
  const { top, bottom } = useSafeAreaInsets()
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedChannelUrl, setSelectedChannelUrl] = useState('')
  const videoRef = useRef<Video>(null)
  const [videoLoading, setVideoLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const {
    data: groups,
    isLoading: groupsLoading,
    error: groupsError,
  } = useGroups()

  const {
    data: channels,
    isLoading: channelsLoading,
    refetch: refetchChannels,
    error: channelsError,
  } = useChannels(selectedGroup)

  useEffect(() => {
    if (groups && groups.length > 0 && !selectedGroup) {
      setSelectedGroup(groups[0])
    }
  }, [groups, selectedGroup])

  if (groupsError || channelsError) {
    Toast({
      title: 'Error',
      message: 'Something went wrong',
      type: 'danger',
    })
  }

  const handleRefresh = () => {
    setIsRefreshing(true)

    refetchChannels().finally(() => {
      setTimeout(() => setIsRefreshing(false), 500)
    })
  }

  return (
    <>
      <View className="flex-1 bg-gray-900" style={{ paddingTop: top + 20 }}>
        <View className="gap-3 px-4">
          <Text h4 semibold className="text-slate-400">
            Groups
          </Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          className="my-3 h-14"
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
          keyExtractor={(item, index) => index.toString()}
          data={groups}
          renderItem={({ item }) => (
            <CardGroups
              onPress={() => setSelectedGroup(item)}
              variant={selectedGroup === item ? 'primary' : 'secondary'}
            >
              {item}
            </CardGroups>
          )}
        />

        {groupsLoading ||
          (channelsLoading && (
            <Text h6 semibold center className="mt-5 text-slate-600">
              Loading channels...
            </Text>
          ))}

        <FlatList
          showsVerticalScrollIndicator={false}
          className="h-full"
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: bottom + 16,
          }}
          keyExtractor={(item, index) => index.toString()}
          data={channels}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={'#94a3b8'}
            />
          }
          renderItem={({ item }) => (
            <CardChannels
              item={item}
              onPress={() => {
                setSelectedChannelUrl(item.url)
              }}
            />
          )}
        />
      </View>

      {videoLoading && selectedChannelUrl && (
        <View className="absolute h-full w-full items-center justify-center bg-black opacity-60">
          <ActivityIndicator size="large" color="white" />
        </View>
      )}

      <Video
        ref={videoRef}
        source={{
          uri: selectedChannelUrl,
        }}
        resizeMode={ResizeMode.CONTAIN}
        onError={() => {
          Toast({
            title: 'Error',
            message: 'Something went wrong',
            type: 'danger',
          })
        }}
        onLoadStart={() => {
          setVideoLoading(true)
        }}
        onLoad={() => {
          setVideoLoading(false)
          videoRef.current?.playAsync()
          videoRef.current?.presentFullscreenPlayer()
        }}
        useNativeControls
      />
    </>
  )
}
