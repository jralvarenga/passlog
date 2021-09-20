import React, { useCallback, useMemo, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { Button, Chip, Icon } from 'react-native-elements'
import { generatePassword } from '../lib/generatePassword'
import Clipboard from '@react-native-clipboard/clipboard'
import Snackbar from 'react-native-snackbar'
import BottomSheet from './BottomSheet'
import { useTranslation } from 'react-i18next'

interface SelectCardTypeSheetProps {
  visible: boolean
  setVisible: Function
  type: string
  changeCardType: Function
}

const WINDOW_HEIGHT = Dimensions.get('window').height
const BOTTOM_SHEET_HEIGHT = 0.35

const SelectCardTypeSheet = ({ visible, setVisible, type, changeCardType }: SelectCardTypeSheetProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()

  const cardTypes = [
    {
      name: t('type_id_name'),
      value: t('type_id_value')
    },
    {
      name: t('type_card_name'),
      value: t('type_card_value')
    },
    {
      name: t('type_licence_name'),
      value: t('type_licence_value')
    },
    {
      name: t('type_promo_name'),
      value: t('type_promo_value')
    },
    {
      name: t('type_other_name'),
      value: t('type_other_value')
    }
  ]

  return (
      <BottomSheet
        visible={visible}
        setVisible={setVisible}
        bottomSheetHeight={BOTTOM_SHEET_HEIGHT}
      >
        <View style={styles.contentContainer}>
          <View style={{ flex: 1}}>
            <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 24 }]}>
              {t('card_type_title')}
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
    height: WINDOW_HEIGHT * BOTTOM_SHEET_HEIGHT,
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