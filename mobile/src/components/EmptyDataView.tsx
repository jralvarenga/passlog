import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { Button } from 'react-native-elements'

interface EmptyDataViewProps {
  item: string
  buttonFunction: Function
}

const EmptyDataView = ({ item, buttonFunction }: EmptyDataViewProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/empty-data.json')}
        autoPlay
        loop
        style={{ width: 300, height: 300, marginBottom: -18 }}
      />
      <Text style={[styles.text, { fontFamily: 'poppins-bold', width: '85%', textAlign: 'center', fontSize: 18 }]}>
        It seems you don't have any {item} saved😢
      </Text>
      <Button
        title="Create one here"
        /* @ts-ignore */
        onPress={buttonFunction}
        containerStyle={{ width: 200, marginTop: 15 }}
        titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
      />
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text,
  },
})

export default EmptyDataView