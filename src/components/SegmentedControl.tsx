import React, { useEffect } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
  View,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { colors } from '~/styles/constants'
import { Text } from './Text'

interface SegmentedControlProps {
  segments: Array<{
    label: string
    value?: string | number | any
    icon?: React.ReactNode
    badge?: number
    visible: boolean
  }>
  currentIndex: number
  onChange: (index: number, segment: string) => void
  fontSize?: number
  badgeValues?: Array<number | null>
  isRTL?: boolean
  containerMargin?: number
  activeTextStyle?: TextStyle
  inactiveTextStyle?: TextStyle
  segmentedControlWrapper?: ViewStyle
  pressableWrapper?: TouchableOpacityProps
  tileStyle?: ViewStyle
  activeBadgeStyle?: ViewStyle
  inactiveBadgeStyle?: ViewStyle
  badgeTextStyle?: TextStyle
}

const DEFAULT_SPRING_CONFIG = {
  stiffness: 150,
  damping: 20,
  mass: 1,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  segments,
  currentIndex,
  onChange,
  isRTL = false,
  containerMargin = 0,
  segmentedControlWrapper,
  tileStyle,
}: SegmentedControlProps) => {
  const width = widthPercentageToDP('100%') - containerMargin * 2
  const translateValue =
    width / segments.filter((segment) => segment.visible).length
  const tabTranslateValue = useSharedValue(0)

  useEffect(() => {
    const transitionMultiplier = isRTL ? -1 : 1
    tabTranslateValue.value = withSpring(
      currentIndex * (translateValue * transitionMultiplier),
      DEFAULT_SPRING_CONFIG,
    )
  }, [currentIndex])

  const tabTranslateAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabTranslateValue.value }],
    }
  })

  return (
    <Animated.View
      style={[styles.defaultSegmentedControlWrapper, segmentedControlWrapper]}
    >
      <Animated.View
        style={[
          styles.movingSegmentStyle,
          tileStyle,
          StyleSheet.absoluteFill,
          {
            width: width / segments.filter((segment) => segment.visible).length,
          },
          tabTranslateAnimatedStyles,
        ]}
      />
      {segments
        .filter((segment) => segment.visible)
        .map((segment, index) => {
          return (
            <TouchableOpacity
              className="flex-1 py-2"
              onPress={() => {
                onChange(index, segment.value)
              }}
              key={index}
            >
              <View className="flex-row items-center justify-center">
                <Text
                  h6
                  bold={currentIndex === index}
                  medium={currentIndex !== index}
                  className={`
                    text-center
                    ${currentIndex === index ? 'text-primary' : 'text-gray'}
                  `}
                >
                  {segment.label}
                </Text>
                {segment.icon && (
                  <View className="ml-1 items-center">{segment.icon}</View>
                )}
              </View>
            </TouchableOpacity>
          )
        })}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  defaultSegmentedControlWrapper: {
    position: 'relative',
    display: 'flex',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  movingSegmentStyle: {
    top: 0,
    margin: 5,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
})

export default SegmentedControl
