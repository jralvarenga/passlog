import React, { useCallback, useMemo, useRef } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { Text, View } from 'react-native'

const PasswordBottonSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['25%', '50%'], [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      enablePanDownToClose
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View>
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheet>
  )
}

export default PasswordBottonSheet