import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'

interface SlideProps {
  label: string
  right?: boolean
  color: Animated.AnimatedInterpolation
}

const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height
export const SLIDE_HEIGHT = 0.55*WINDOW_HEIGHT

const Slide = ({ label, right, color }: SlideProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const transform = [
    { translateY: (SLIDE_HEIGHT - WINDOW_HEIGHT*0.55)/2 },
    { translateX: right ? WINDOW_WIDTH/2 - 50 : -WINDOW_WIDTH/2 + 50 },
    { rotate: right ? '-90deg' : '90deg' },
  ]

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { transform }]}>
        <Animated.Text style={[styles.labelStyle, { color }]}>
          {label}
        </Animated.Text>
      </View>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    height: SLIDE_HEIGHT
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  titleContainer: {
    flex: 1,
    width: WINDOW_WIDTH,
    justifyContent: 'center',
  },
  labelStyle: {
    fontFamily: 'poppins-bold',
    fontSize: 60,
    color: theme.colors.text,
    textAlign: 'center'
  }
})

export default Slide