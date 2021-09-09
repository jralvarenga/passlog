import React, { useCallback, useMemo, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { Button, Chip, Icon } from 'react-native-elements'
import { generatePassword } from '../lib/generatePassword'
import Clipboard from '@react-native-clipboard/clipboard'
import Snackbar from 'react-native-snackbar'
import BottomSheet from './BottomSheet'

interface SelectCardTypeSheetProps {
  visible: boolean
  setVisible: Function
  type: string
  changeCardType: Function
}

const windowHeight = Dimensions.get('window').height
const bottomSheetHeight = 0.35

const SelectCardTypeSheet = ({ visible, setVisible, type, changeCardType }: SelectCardTypeSheetProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  const cardTypes = [
    {
      name: 'ID',
      value: 'id'
    },
    {
      name: 'Credit Card',
      value: 'credit'
    },
    {
      name: 'Debit Card',
      value: 'debit'
    },
    {
      name: 'Licence',
      value: 'licence'
    },
    {
      name: 'Promo Code',
      value: 'promo'
    },
    {
      name: 'Other',
      value: 'other'
    }
  ]

  return (
      <BottomSheet
        visible={visible}
        setVisible={setVisible}
        bottomSheetHeight={bottomSheetHeight}
      >
        <View style={styles.contentContainer}>
          <View style={{ flex: 1}}>
            <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 24 }]}>
              Card type
            </Text>
          </View>
          <View style={styles.typesContainer}>
            <View style={styles.types}>
              {cardTypes.map((item, i) => (
                <Chip
                  key={i}
                  containerStyle={styles.typeBoxContainerStyle}
                  buttonStyle={type != item.name ? styles.chipButtonStyle : {}}
                  titleStyle={styles.text}
                  onPress={() => changeCardType(item)}
                  title={item.name}
                />
              ))}
            </View>
          </View>
        </View>
      </BottomSheet>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  contentContainer: {
    flex: 1,
    height: windowHeight * bottomSheetHeight,
    padding: 12,
    backgroundColor: theme.colors.background,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  typesContainer: {
    flex: 3,
  },
  types: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBoxContainerStyle: {
    minWidth: 80,
    margin: 6
  },
  chipButtonStyle: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.primary 
  }
})

export default SelectCardTypeSheet