import { Theme, useTheme } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import FormInput from '../components/FormInput'
import HeaderNavigationBar from '../components/HeaderNavigationBar'

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
            placeholder="my_user"
            label="Card type"
            width="50%"
            icon={{ type: 'ionicon', name: 'card' }}
            value={type}
            onChangeText={(value: string) => setType(value)}
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