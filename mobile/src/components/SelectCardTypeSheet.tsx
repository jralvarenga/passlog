import React, { useCallback, useMemo, useState } from 'react'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { StyleSheet, Text, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { Button, Chip, Icon } from 'react-native-elements'
import { generatePassword } from '../lib/generatePassword'
import Clipboard from '@react-native-clipboard/clipboard'
import Snackbar from 'react-native-snackbar'

interface SelectCardTypeSheetProps {
  bottomSheetRef: any,
  handleSheetChanges: any
  type: string
  changeCardType: Function
}

const SelectCardTypeSheet = ({ bottomSheetRef, handleSheetChanges, type, changeCardType }: SelectCardTypeSheetProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const snapPoints = useMemo(() => ['10%', '35%', '35%'], [])
  const [backdropPressBehavior, setBackdropPressBehavior] = useState<'none' | 'close' | 'collapse'>('collapse')

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

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop {...props} pressBehavior={backdropPressBehavior} />
  ), [backdropPressBehavior])

  return (
      <BottomSheet
        /* @ts-ignore */
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
        backdropComponent={renderBackdrop}
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
    padding: 12,
    backgroundColor: theme.colors.background
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