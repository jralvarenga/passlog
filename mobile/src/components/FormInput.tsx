import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TextInputProps } from 'react-native'
import { Input } from 'react-native-elements'
import { reduceIncrementColor } from '../lib/reduceIncrementColor'

interface FormInputProps {
  label: string
  value: string
  placeholder: string
  icon?: {
    type: string
    name: string
  }
  width?: string
  error?: string
  inputProps?: TextInputProps
  onChangeText: Function
}

const FormInput = ({ label, value, placeholder, icon, width, error, inputProps, onChangeText }: FormInputProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <Input
      label={label}
      value={value}
      placeholder={placeholder}
      containerStyle={[
        styles.containerStyle,
        width ? { width: width } : {}
      ]}
      errorMessage={error ? error : ''}
      errorStyle={styles.errorStyle}
      inputStyle={styles.inputStyle}
      inputContainerStyle={styles.inputContainerStyle}
      labelStyle={styles.labelStyle}
      onChangeText={(value) => onChangeText(value)}
      leftIcon={{
        type: icon?.type,
        name: icon?.name,
        color: reduceIncrementColor(theme.colors.text, 'reduce', 100)
      }}
      {...inputProps}
    />
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  text: {
    fontFamily: 'poppins',
    fontSize: 17,
    color: theme.colors.text
  },
  containerStyle: {},
  inputContainerStyle: {
    borderBottomWidth: 0
  },
  inputStyle: {
    fontFamily: 'poppins',
    fontSize: 17,
    color: theme.colors.text,
    backgroundColor: theme.colors.card,
    marginLeft: 5,
    paddingLeft: 10,
    borderRadius: 15
  },
  errorStyle: {
    fontSize: 16,
    fontFamily: 'poppins',
    color: 'rgb(240, 46, 46)'
  },
  labelStyle: {
    fontFamily: 'poppins-bold',
    fontSize: 17,
    color: reduceIncrementColor(theme.colors.text, 'reduce', 100)
  }
})

export default FormInput