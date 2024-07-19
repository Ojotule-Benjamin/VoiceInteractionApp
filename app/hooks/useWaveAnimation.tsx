import { useEffect } from "react"
import {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated"

export const useWaveAnimation = (isListening: boolean) => {
  const scale = useSharedValue(1)

  useEffect(() => {
    if (isListening) {
      scale.value = withRepeat(
        withTiming(1.1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      )
    } else {
      scale.value = withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) })
    }
  }, [isListening])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  return animatedStyle
}
