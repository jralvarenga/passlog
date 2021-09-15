import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'

interface SlideProps {
  label: string
  right?: boolean
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
export const SLIDE_HEIGHT = 0.55*windowHeight

const Slide = ({ label, right }: SlideProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.labelStyle}>
          {label}
        </Text>
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
    fontSize: 40,
    color: theme.colors.text,
    textAlign: 'center',
  }
})

export default Slide