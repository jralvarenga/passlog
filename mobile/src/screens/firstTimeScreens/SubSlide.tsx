import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

interface SubSlideProps {
  title: string
  description: string
  buttonType: 'next' | 'done'
  onPress: Function
}

const SubSlide = ({ title, description, buttonType, onPress }: SubSlideProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View style={styles.container}>
      <View style={[{ flex: 5 }, styles.containerStyle]}>
        <Text style={styles.titleStyle}>
          {title}
        </Text>
        <Text style={styles.description}>
          {description}
        </Text>
      </View>
      <View style={[styles.containerStyle, { flex: 1.5 }]}>
        {buttonType == 'next' ? (
          <Button
            /* @ts-ignore */
            onPress={onPress}
            containerStyle={[styles.buttonContainerStyle, { height: 45 }]}
            buttonStyle={{ backgroundColor: theme.colors.card, height: 45 }}
            titleStyle={styles.description}
            title="Next"
          />
        ) : (
          <Button
            containerStyle={[styles.buttonContainerStyle, { height: 45 }]}
            buttonStyle={{ height: 45 }}
            titleStyle={styles.description}
            title="Lets start"
          />
        )}
      </View>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    textAlign: 'center',
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  buttonContainerStyle: {
    width: '60%',
    borderRadius: 15
  },
})

export default SubSlide