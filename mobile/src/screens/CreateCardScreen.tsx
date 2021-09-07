import { Theme, useTheme } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import FormInput from '../components/FormInput'
import HeaderNavigationBar from '../components/HeaderNavigationBar'
import BottomSheet from '@gorhom/bottom-sheet'
import SelectCardTypeSheet from '../components/SelectCardTypeSheet'

interface CreateCardScreenProps {
  route: any
}

const CreateCardScreen = ({ route }: CreateCardScreenProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [holder, setHolder] = useState("")
  const [numbers, setNumbers] = useState("")
  const [extraInfo, setExtraInfo] = useState("")
  const [extraInfoData, setExtraInfoData] = useState("")
  const cardTypeSheetRef = useRef<BottomSheet>()
  const [showBottomSheet, setShowBottomSheet] = useState(false)

  const handleSheetChanges = useCallback((index: number) => {
    if (index == -1 || index == 0) {
      setShowBottomSheet(false)
      cardTypeSheetRef.current?.close()
    }
  }, [])

  const showBottomSheetHandler = () => {
    setShowBottomSheet(true)
    cardTypeSheetRef.current?.snapToIndex(1)
  }

  const changeCardType = (type: { name: string, value: string }) => {
    setType(type.name)
    cardTypeSheetRef.current?.close()
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
          titleStyle={[styles.text, { fontFamily: 'poppins-bold' }]}
          containerStyle={{
            width: '45%',
          }}
        />
      </View>
      <SelectCardTypeSheet
        bottomSheetRef={cardTypeSheetRef}
        type={type}
        changeCardType={changeCardType}
        handleSheetChanges={handleSheetChanges}
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