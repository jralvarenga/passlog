import { Theme, useTheme } from '@react-navigation/native'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

interface EmptyDataViewProps {
  text: string
  buttonFunction: Function
  children: ReactElement
}

const EmptyDataView = ({ text, buttonFunction, children }: EmptyDataViewProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      {children}
      <Text style={[styles.text, { fontFamily: 'poppins-bold', width: '85%', textAlign: 'center', fontSize: 18 }]}>
        {text}
      </Text>
      <Button
        title={t('create_one_here')}
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