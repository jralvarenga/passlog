import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, SearchBar } from 'react-native-elements'

interface HiddenFlatListViewProps {
  inputValue: string
  changeInputValue: Function,
  cancelInput: Function
  inputPlaceHolder: string,
  buttonText: string,
  buttonFunction: Function
  showButton?: boolean
}

const HiddenFlatListView = ({ inputValue, changeInputValue, inputPlaceHolder, cancelInput, buttonText, buttonFunction, showButton }: HiddenFlatListViewProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View style={styles.container}>
      <SearchBar
        platform="default"
        value={inputValue}
        containerStyle={{
          width: showButton ? '65%' : '100%',
          backgroundColor: theme.colors.background,
          padding: 0,
          borderBottomWidth: 0,
          borderTopWidth: 0
        }}
        inputContainerStyle={{
          backgroundColor: theme.colors.card
        }}
        labelStyle={styles.text}
        /* @ts-ignore */
        onChangeText={changeInputValue}
        /* @ts-ignore */
        onCancel={cancelInput}
        round={true}
        placeholder={inputPlaceHolder}
      />
      {showButton && (
        <Button
          containerStyle={{ width: '30%' }}
          /* @ts-ignore */
          onPress={buttonFunction}
          titleStyle={styles.text}
          title={buttonText}
        />
      )}
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  searchInputContainer: {
    width: '70%',
    backgroundColor: theme.colors.background,
    padding: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
})

export default HiddenFlatListView