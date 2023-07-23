import React from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps,
  TextProps,
} from 'react-native'
import { Text as RNText } from '../Text'
import { styled } from 'nativewind'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated'

const variantStyles = {
  primary: 'text-slate-200 bg-slate-800',
  secondary: 'bg-transparent text-slate-500',
}

interface MyButtonProps extends TouchableOpacityProps {
  textStyle?: TextProps['style']
  children: React.ReactNode
  variant?: keyof typeof variantStyles
  onPress?: () => void
}

function CardGroups({
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
    <Animated.View style={animatedStyles} className="">
      <TouchableOpacity
        {...props}
        activeOpacity={0.7}
        onPress={onPress}
        className={`
          h-full items-center justify-center rounded-lg px-4
          ${variantStyles[variant || 'primary']}
        `}
      >
        <RNText
          h6
          semibold
          className={variantStyles[variant || 'primary']}
          style={textStyle}
        >
          {children}
        </RNText>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default styled(CardGroups, {
  props: {
    textStyle: true,
  },
})
