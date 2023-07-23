import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'
import { MaterialIcons } from '@expo/vector-icons'

const PULL_HEIGHT = 180

export const RefreshControl = () => {
  const scrollY = useSharedValue(0)
  const isRefreshing = useSharedValue(false)
  const rotate = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const positionY = event.contentOffset.y
      scrollY.value = positionY
    },
    onEndDrag: () => {
      if (scrollY.value <= -PULL_HEIGHT / 2) {
        isRefreshing.value = true
        rotate.value = withTiming(
          720,
          { duration: 600, easing: Easing.linear },
          () => {
            isRefreshing.value = false
            rotate.value = 0
          },
        )
      }
    },
  })

  const iconStyle = useAnimatedStyle(() => {
    const pullProgress = interpolate(
      scrollY.value,
      [-PULL_HEIGHT / 3, 0],
      [1, 0],
      Extrapolate.CLAMP,
    )
    return {
      opacity: pullProgress,
      transform: [
        {
          scale: pullProgress,
        },
        {
          rotate: isRefreshing.value ? `${rotate.value}deg` : '0deg',
        },
      ],
    }
  })

  const refreshStyle = useAnimatedStyle(() => {
    return {
      marginTop: scrollY.value < 0 ? scrollY.value : 0,
      height: isRefreshing.value ? 0 : 0,
    }
  })

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      bounces={true}
    >
      <Animated.View
        style={[
          styles.refresh,
          refreshStyle,
          {
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <Animated.View style={[styles.icon, iconStyle]}>
          <MaterialIcons name="refresh" size={32} color="black" />
        </Animated.View>
      </Animated.View>
      <View style={styles.content}>
        <Text>Conteúdo da sua ScrollView</Text>
      </View>
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  refresh: {
    position: 'absolute',
    paddingTop: 20,
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
  content: {
    height: 2000,
  },
})
