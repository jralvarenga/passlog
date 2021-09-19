import React, { ReactElement } from 'react'
import { Theme, useTheme } from '@react-navigation/native'
import { Dimensions, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { BottomSheet as RNEBottomSheet, BottomSheetProps as RNEBottomSheetProps } from 'react-native-elements'

interface BottomSheetProps {
  visible: boolean
  setVisible?: Function
  children: ReactElement
  props?: RNEBottomSheetProps
  bottomSheetHeight: number
}

const WINDOW_HEIGHT = Dimensions.get('window').height

const BottomSheet = ({ visible, setVisible, children, props, bottomSheetHeight }: BottomSheetProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <RNEBottomSheet
      isVisible={visible}
      containerStyle={styles.containerStyle}
      modalProps={{
        onRequestClose: () => setVisible!(false),
        statusBarTranslucent: true
      }}
      {...props}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          if (setVisible) {
            setVisible!(false) 
          }
        }}
      >
        <View
          style={{ height: WINDOW_HEIGHT * (0.95 - bottomSheetHeight) }}
        />
      </TouchableWithoutFeedback>
      {children}
    </RNEBottomSheet>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'rgba(0.5, 0.25, 0, 0.5)',
  }
})

export default BottomSheet