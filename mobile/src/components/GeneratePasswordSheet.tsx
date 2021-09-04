import React, { useCallback, useMemo, useRef, useState } from 'react'
import BottomSheet, { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { StyleSheet, Text, View } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { reduceIncrementColor } from '../lib/reduceIncrementColor'
import { Button, Icon } from 'react-native-elements'
import { generatePassword } from '../lib/generatePassword'

interface GeneratePasswordSheetProps {
  bottomSheetRef: any
}

const GeneratePasswordSheet = ({ bottomSheetRef }: GeneratePasswordSheetProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  //const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['45%', '55%'], [])
  const [backdropPressBehavior, setBackdropPressBehavior] = useState<'none' | 'close' | 'collapse'>('collapse')
  const [password, setPassword] = useState(generatePassword())

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const renderBackdrop = useCallback((props) => (
    <CustomBackdrop {...props} pressBehavior={backdropPressBehavior} />
  ), [backdropPressBehavior])

  const refreshPassword = () => {
    const newPassword = generatePassword()
    setPassword(newPassword)
  }

  return (
      <BottomSheet
        /* @ts-ignore */
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: reduceIncrementColor(theme.colors.background, 'reduce', -10) }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
        //backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
          <View style={{ flex: 1}}>
            <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 24 }]}>
              Secure Password:
            </Text>
          </View>
          <View style={{ flex: 3 }}>
            <View style={styles.passwordContainer}>
              <Text style={[styles.text, { fontFamily: 'poppins-bold', fontSize: 22 }]}>
                {password}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name="refresh"
                  color={theme.colors.text}
                  onPress={refreshPassword}
                  containerStyle={[styles.iconContainerStyle, { marginRight: 8 }]}
                  type="ionicon"
                />
                <Icon
                  name="copy"
                  color={theme.colors.text}
                  containerStyle={[styles.iconContainerStyle, { marginRight: 10 }]}
                  type="ionicon"
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 4, alignItems: 'flex-end' }}>
            <Button
              titleStyle={styles.text}
              title="Create password profile"
            />
          </View>
        </View>
      </BottomSheet>
  )
}

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }))

  const containerStyle = useMemo(() => 
    [style, { backgroundColor: "#000000AA" }, containerAnimatedStyle],
    [style, containerAnimatedStyle]
  )

  return (
    <Animated.View style={containerStyle} />
  )

}

const styleSheet = (theme: Theme) => StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: reduceIncrementColor(theme.colors.background, 'reduce', -10)
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 35
  },
  iconContainerStyle: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 100,
  }
})

export default GeneratePasswordSheet