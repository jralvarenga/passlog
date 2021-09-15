import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

interface SubSlideProps {
  title: string
  description: string
  buttonType: 'next' | 'done'
}

const SubSlide = ({ title, description, buttonType }: SubSlideProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View style={styles.container}>
      <View style={[{ flex: 2 }, styles.containerStyle]}>
        <Text style={styles.titleStyle}>
          {title}
        </Text>
      </View>
      <View style={[{ flex: 4 }, styles.containerStyle]}>
        <Text style={styles.description}>
          {description}
        </Text>
      </View>
      <View style={[styles.containerStyle, styles.buttonContainer]}></View>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  titleStyle: {
    fontFamily: 'poppins-bold',
    fontSize: 25,
    color: theme.colors.text
  },
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  description: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  buttonContainer: {
    flex: 1
  }
})

export default SubSlide