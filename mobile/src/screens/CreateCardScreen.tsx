import { Theme, useTheme } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
import FormInput from '../components/FormInput'
import HeaderNavigationBar from '../components/HeaderNavigationBar'
import SelectCardTypeSheet from '../components/SelectCardTypeSheet'
import { CardProps, PasslogUserDataProps } from '../interface/interfaces'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'
import { createId } from '../lib/createId'
import { setCardsInStorage } from '../lib/asyncStorage'
import { encryptCard } from '../lib/encripter'
import { createNewPasslogDocument } from '../lib/firestore'
import Snackbar from 'react-native-snackbar'
import { useTranslation } from 'react-i18next'

interface CreateCardScreenProps {
  navigation: any
}

const CreateCardScreen = ({ navigation }: CreateCardScreenProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()
  const { cards, setCards, userSettings, renderPasslogDataHandler } = usePasslogUserData()
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [typeValue, setTypeValue] = useState("")
  const [holder, setHolder] = useState("")
  const [numbers, setNumbers] = useState("")
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [loading, setLoading] = useState(false)
  const nameRef = useRef<TextInput>(null)
  const typeRef = useRef<TextInput>(null)
  const holderRef = useRef<TextInput>(null)
  const numbersdRef = useRef<TextInput>(null)

  const showBottomSheetHandler = () => {
    setShowBottomSheet(true)
  }

  const changeCardType = (type: { name: string, value: string }) => {
    setShowBottomSheet(false)
    setType(type.name)
    setTypeValue(type.value)
  }

  const createCard = async() => {
    if (name == '' || holder == '' || numbers == '' || type == '') {
      Snackbar.show({
        text: t('all_fields_required'),
        fontFamily: 'poppins',
        textColor: theme.colors.text,
        backgroundColor: theme.colors.primary
      })
      return
    }
    setLoading(true)
    try {
      const currentDate = new Date()
      currentDate.setMinutes(currentDate.getMinutes() + currentDate.getTimezoneOffset())
      let newCard: CardProps = {
        id: createId(),
        cardName: name,
        type: typeValue,
        holder: holder,
        number: numbers,
        addedInfo: "",
        date: `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
      }

      cards!.push(newCard)
      setCards!(cards)
      await setCardsInStorage(cards!)
      if (userSettings?.alwaysSync) {
        newCard = encryptCard(newCard)
        await createNewPasslogDocument(newCard, 'cards')
      }
      renderPasslogDataHandler!()
      setLoading(false)
      navigation.goBack()
    } catch (error: any) {
      setLoading(false)
      Snackbar.show({
        text: t('server_problem'),
        fontFamily: 'poppins',
        textColor: theme.colors.text,
        backgroundColor: theme.colors.primary
      })
    }
    
  }

  return (
    <View style={styles.container}>
      <HeaderNavigationBar
        title={t('create_card_title')}
      />
      <View style={styles.cardInfoContainer}>
        <View style={styles.cardNameContainer}>
          <FormInput
            label={t('card_name_label')}
            placeholder={t('name_example')}
            ref={nameRef}
            width="50%"
            icon={{ type: 'ionicon', name: 'card' }}
            value={name}
            onChangeText={(value: string) => setName(value)}
            inputProps={{
              returnKeyType: 'next',
              onSubmitEditing: () => typeRef.current?.focus()
            }}
          />
          <FormInput
            label={t('card_type_label')}
            placeholder={t('card_type_example')}
            width="50%"
            icon={{ type: 'ionicon', name: 'card' }}
            value={type}
            onChangeText={(value: string) => setType(value)}
            inputProps={{
              onPressIn: showBottomSheetHandler,
              showSoftInputOnFocus: false,
              returnKeyType: 'next',
              onSubmitEditing: () => holderRef.current?.focus()
            }}
          />
        </View>
        <View>
          <FormInput
            label={t('the_holder_label')}
            placeholder={t('the_holder_example')}
            icon={{ type: 'material-community', name: 'account' }}
            value={holder}
            onChangeText={(value: string) => setHolder(value)}
            inputProps={{
              returnKeyType: 'next',
              onSubmitEditing: () => numbersdRef.current?.focus()
            }}
          />
        </View>
        <View>
          <FormInput
            label={t('the_numbers_label')}
            placeholder={t('the_numbers_example')}
            icon={{ type: 'material-community', name: 'dots-horizontal' }}
            value={numbers}
            onChangeText={(value: string) => setNumbers(value)}
            inputProps={{
              autoCapitalize: 'none',
              autoCompleteType: 'off',
              returnKeyType: 'done',
            }}
          />
        </View>
      </View>
      <View style={styles.createButtonContainer}>
        <Button
          title={t('create_button')}
          loading={loading}
          onPress={createCard}
          titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
          containerStyle={{
            width: '45%',
          }}
        />
      </View>
      <SelectCardTypeSheet
        visible={showBottomSheet}
        setVisible={setShowBottomSheet}
        type={type}
        changeCardType={changeCardType}
      />
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
  cardInfoContainer: {
    width: '100%',
    padding: 5,
    height: '70%',
    display: 'flex',
  },
  createButtonContainer: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center'
  },
  cardNameContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default CreateCardScreen