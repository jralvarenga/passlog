import { Theme, useNavigation, useTheme } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { SettingsProps } from '../../interface/interfaces'
import { setSettingsInStorage } from '../../lib/asyncStorage'
import { usePasslogUserData } from '../../services/PasslogUserDataProvider'

interface SubSlideProps {
  title: string
  description: string
  buttonType: 'next' | 'done'
  onPress: Function
}

const SubSlide = ({ title, description, buttonType, onPress }: SubSlideProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { settings, setSettings, renderPasslogDataHandler } = usePasslogUserData()

  const goTo = async(link: any) => {
    const newSettings: SettingsProps = {
      ...settings,
      firstTime: false
    }
    setSettings!(newSettings)
    await setSettingsInStorage(newSettings)
    renderPasslogDataHandler!()
    navigation.navigate(link)
  }

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
            title={t('next_button')}
          />
        ) : (
          <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              onPress={() => goTo('login')}
              containerStyle={[styles.buttonContainerStyle, { height: 45, width: '48%' }]}
              buttonStyle={{ height: 45, backgroundColor: '#ff637c' }}
              titleStyle={styles.description}
              title={t('login_signup_button')}
            />
            <Button
              onPress={() => goTo('Home')}
              containerStyle={[styles.buttonContainerStyle, { height: 45, width: '48%' }]}
              buttonStyle={{ height: 45 }}
              titleStyle={styles.description}
              title={t('lets_start_button')}
            />
          </View>
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