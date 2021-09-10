import { Theme, useTheme } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import FormInput from '../components/FormInput'
import HeaderNavigationBar from '../components/HeaderNavigationBar'
import SelectCardTypeSheet from '../components/SelectCardTypeSheet'
import { CardProps, PasslogUserDataProps } from '../interface/interfaces'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'
import { createId } from '../lib/createId'
import { setCardsInStorage } from '../lib/asyncStorage'

interface CreateCardScreenProps {
  route: any
  navigation: any
}

const CreateCardScreen = ({ route, navigation }: CreateCardScreenProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { cards, setCards, renderPasslogDataHandler } = usePasslogUserData()
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [typeValue, setTypeValue] = useState("")
  const [holder, setHolder] = useState("")
  const [numbers, setNumbers] = useState("")
  //const [extraInfo, setExtraInfo] = useState("")
  //const [extraInfoData, setExtraInfoData] = useState("")
  const [showBottomSheet, setShowBottomSheet] = useState(false)

  const showBottomSheetHandler = () => {
    setShowBottomSheet(true)
  }

  const changeCardType = (type: { name: string, value: string }) => {
    setShowBottomSheet(false)
    setType(type.name)
    setTypeValue(type.value)
  }

  const createCard = async() => {
    const currentDate = new Date()
    const newCard: CardProps = {
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
    renderPasslogDataHandler!()
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <HeaderNavigationBar
        title="Create Card"
      />
      <View style={styles.cardInfoContainer}>
        <View style={styles.cardNameContainer}>
          <FormInput
            placeholder="Name"
            label="Card name"
            width="50%"
            icon={{ type: 'ionicon', name: 'card' }}
            value={name}
            onChangeText={(value: string) => setName(value)}
          />
          <FormInput
            placeholder="card, promo..."
            label="Card type"
            width="50%"
            icon={{ type: 'ionicon', name: 'card' }}
            value={type}
            onChangeText={(value: string) => setType(value)}
            inputProps={{
              onPressIn: showBottomSheetHandler,
              showSoftInputOnFocus: false
            }}
          />
        </View>
        <View>
          <FormInput
            label="The holder"
            placeholder="Steve Adonis Dolphin"
            icon={{ type: 'material-community', name: 'account' }}
            value={holder}
            onChangeText={(value: string) => setHolder(value)}
          />
        </View>
        <View>
          <FormInput
            label="The numbers"
            placeholder="*************9756"
            icon={{ type: 'material-community', name: 'dots-horizontal' }}
            value={numbers}
            onChangeText={(value: string) => setNumbers(value)}
            inputProps={{
              autoCapitalize: 'none',
              autoCompleteType: 'off',
            }}
          />
        </View>
      <View>
          
        </View>
      </View>
      <View style={styles.createButtonContainer}>
        <Button
          title="Create"
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