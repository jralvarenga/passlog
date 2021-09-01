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
}

const HiddenFlatListView = ({ inputValue, changeInputValue, inputPlaceHolder, cancelInput, buttonText, buttonFunction }: HiddenFlatListViewProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View style={styles.container}>
      <SearchBar
        platform="default"
        value={inputValue}
        containerStyle={{
          width: '70%',
          backgroundColor: theme.colors.background,
          padding: 0,
          borderBottomWidth: 0,
          borderTopWidth: 0
        }}
        inputContainerStyle={{
          backgroundColor: theme.colors.card
        }}
        /* @ts-ignore */
        onChangeText={changeInputValue}
        /* @ts-ignore */
        onCancel={cancelInput}
        round={true}
        placeholder={inputPlaceHolder}
      />

      <Button
        containerStyle={{ width: '25%' }}
        /* @ts-ignore */
        onPress={buttonFunction}
        title={buttonText}
      />
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
  searchInputContainer: {
    width: '70%',
    backgroundColor: theme.colors.background,
    padding: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
})

export default HiddenFlatListView