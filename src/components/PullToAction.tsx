import { useState, useEffect } from 'react'
import {
  ScrollView,
  GestureHandler,
  useAnimatedGestureHandler,
  View,
} from 'react-native'
import { Spring } from 'react-native-reanimated'

const PullRefresh = ({ children }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [progress, setProgress] = useState(0)

  const onRefresh = () => {
    setRefreshing(true)
    // Do your refresh logic here
    setRefreshing(false)
  }

  const animatedRef = useAnimatedGestureHandler({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event) => {
      setProgress(event.dy)
    },
    onPanResponderRelease: (event) => {
      if (progress > 20) {
        onRefresh()
      } else {
        setProgress(0)
      }
    },
  })

  return (
    <ScrollView onRefresh={onRefresh} animatedRef={animatedRef}>
      <View style={styles.container}>{children}</View>
      <View style={styles.progress}>
        <Spring fromValue={0} toValue={progress} duration={1000}>
          {(progress) => <View style={styles.progressBar} height={progress} />}
        </Spring>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    width: 100,
    height: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
  },
  progressBar: {
    width: 0,
    height: 10,
    backgroundColor: 'green',
  },
})

export default PullRefresh
