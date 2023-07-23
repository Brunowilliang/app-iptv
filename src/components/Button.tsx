import React from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps,
  TextProps,
} from 'react-native'
import { Text as RNText } from './Text'
import { styled } from 'nativewind'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated'

const variantStyles = {
  primary: 'bg-blue-500',
  secondary: 'bg-red-500',
}

interface MyButtonProps extends TouchableOpacityProps {
  textStyle?: TextProps['style']
  children: React.ReactNode
  variant?: keyof typeof variantStyles
  onPress?: () => void
}

function Button({
  textStyle,
  children,
  variant,
  onPress: onPressProp,
  ...props
}: MyButtonProps) {
  const scale = useSharedValue(1)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const onPress = () => {
    scale.value = withTiming(0.98, {
      duration: 100,
      easing: Easing.ease,
    })

    setTimeout(() => {
      scale.value = withTiming(1, {
        duration: 100,
        easing: Easing.ease,
      })
    }, 100)

    onPressProp && onPressProp()
  }

  return (
    <Animated.View style={animatedStyles} className="w-full">
      <TouchableOpacity
        {...props}
        activeOpacity={0.7}
        onPress={onPress}
        className={`
          h-14 w-full items-center justify-center rounded-xl
          ${variantStyles[variant || 'primary']}
        `}
      >
        <RNText h6 semibold className="text-white" style={textStyle}>
          {children}
        </RNText>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default styled(Button, {
  props: {
    textStyle: true,
  },
})
