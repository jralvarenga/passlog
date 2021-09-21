import React, { ReactElement, useEffect, useRef } from 'react'
import { Animated, StyleProp, ViewStyle } from 'react-native'

interface EnterAnimationViewProps {
    children: ReactElement
    onAnimationEnd?: (() => void)
    style?: StyleProp<ViewStyle>
    left?: boolean
    right?: boolean
    top?: boolean
    bottom?: boolean
    zoom?: boolean
    fade?: boolean
    duration?: number
    size?: number
    delay?: number
    spring?: boolean
}

const EnterAnimationView = React.memo(({ children, onAnimationEnd, style = {}, left = false, right = false, top = false, bottom = false, zoom = false, fade = false, duration = 350, size = 120, delay = 0, spring = false }: EnterAnimationViewProps) => {
  const process = useRef<Animated.Value>(new Animated.Value(0)).current
  const inputRange = [0, 1]

  const scale = process.interpolate({ inputRange, outputRange: [0.01, 1] })
  const translateY = process.interpolate({ inputRange, outputRange: [top ? -size : size, 0] })
  const opacity = process.interpolate({ inputRange, outputRange: [0, 1] })
  const translateX = process.interpolate({ inputRange, outputRange: [left ? -size : size, 0] })

  useEffect(() => {
    spring ? Animated.spring(process, {
      toValue: 1,
      delay,
      bounciness: 1,
      speed:.6,
      useNativeDriver: true
    }).start(onAnimationEnd)
    : Animated.timing(process, {
      toValue: 1,
      duration, delay,
      useNativeDriver: true
    }).start(onAnimationEnd)
  }, [])

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fade ? opacity : 1,
          transform: [
            { translateY: top || bottom ? translateY : 0 },
            { translateX: left || right ? translateX : 0 },
            { scale: zoom ? scale : 1 }
          ]
        }
      ]}
    >
      {children}
    </Animated.View>
  )
})

export default EnterAnimationView