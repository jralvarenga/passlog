import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

interface SlideProps {
  label: string
  right?: boolean
  color: Animated.AnimatedInterpolation
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
export const SLIDE_HEIGHT = 0.55*windowHeight

const Slide = ({ label, right, color }: SlideProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const transform = [
    { translateY: (SLIDE_HEIGHT - windowHeight*0.55)/2 },
    { translateX: right ? windowWidth/2 - 50 : -windowWidth/2 + 50 },
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
    width: windowWidth,
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