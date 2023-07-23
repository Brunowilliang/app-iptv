import { styled } from 'nativewind'
import React from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated'

interface MyButtonProps extends TouchableOpacityProps {
  ViewStyle?: ViewProps['style']
  children: React.ReactNode
}

function Pressable({ children, ViewStyle, ...props }: MyButtonProps) {
  const scale = useSharedValue(1)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const onPressIn = () => {
    scale.value = withTiming(0.98, {
      duration: 100,
      easing: Easing.ease,
    })
  }

  const onPressOut = () => {
    scale.value = withTiming(1, {
      duration: 100,
      easing: Easing.ease,
    })
  }

  return (
    <Animated.View
      style={[animatedStyles, ViewStyle]}
      onTouchStart={onPressIn}
      onTouchEnd={onPressOut}
    >
      <TouchableOpacity
        {...props}
        activeOpacity={0.7}
        className="h-14 items-center justify-center"
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  )
}

export default styled(Pressable, {
  props: {
    ViewStyle: true,
  },
})
