import { useTheme } from '@react-navigation/native'
import React from 'react'
import { Animated, View } from 'react-native'

interface PaginationDotProps {
  index: number
  currentIndex: Animated.AnimatedDivision
}

const PaginationDot = ({ currentIndex, index }: PaginationDotProps) => {
  const theme = useTheme()
  const opacity = currentIndex.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp'
  })
  const scale = currentIndex.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.25, 1],
    extrapolate: 'clamp'
  })

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          { scale }
        ],
        backgroundColor: theme.colors.primary,
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 4
      }}
    />
  )
}

export default PaginationDot