import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import HeaderNavigationBar from '../components/HeaderNavigationBar'

const CreatePasswordScreen = () => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View style={styles.container}>
      <HeaderNavigationBar title="Create Password" />
      <View style={styles.passwordInfoContainer}>
        <View style={styles.passwordNameContainer}>
          <Input
            placeholder="Name"
            label="Password name"
            containerStyle={{
              width: '50%',
            }}
            leftIcon={{ type: 'foundation', name: 'key', color: theme.colors.text }}
          />
          <Input
            placeholder="my_username"
            label="User name"
            containerStyle={{
              width: '50%',
            }}
            leftIcon={{ type: 'font-awesome', name: 'user-circle', color: theme.colors.text }}
          />
        </View>
        <View>
          <Input
            label="An email or credential"
            focusable={true}
            placeholder="email132@adress.com"
            leftIcon={{ type: 'ionicons', name: 'mail', color: theme.colors.text }}
          />
        </View>
        <View>
          <Input
            label="The password"
            placeholder="your_password123"
            leftIcon={{ type: 'material', name: 'lock', color: theme.colors.text }}
          />
        </View>
        <View>
          <Input
            label="Your comments"
            placeholder="Write your comments here..."
            multiline={true}
            numberOfLines={6}
            leftIcon={{ type: 'font-awesome', name: 'comment', color: theme.colors.text }}
          />
        </View>
      </View>
      <View style={styles.createButtonContainer}>
        <Button
          title="Create"
          titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
          containerStyle={{
            width: '45%',
          }}
        />
      </View>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  passwordInfoContainer: {
    width: '100%',
    padding: 15,
    height: '70%',
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  createButtonContainer: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center'
  },
  passwordNameContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default CreatePasswordScreen