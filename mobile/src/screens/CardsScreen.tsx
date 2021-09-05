import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, StyleSheet } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PasswordContainer from '../components/PasswordContainer'
import TopBar from '../components/TopBar'
import HiddenFlatListView from '../components/HiddenFlatListView'
import { PasswordProps } from '../interface/interfaces'
import BottomSheet from '@gorhom/bottom-sheet'
import GeneratePasswordSheet from '../components/GeneratePasswordSheet'

// Test data
import { testPasswords } from '../data/testData'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

interface PasswordContainer {
  navigation: any
}

const CardsScreen = ({ navigation }: PasswordContainer) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const [passwords, setPasswords] = useState<PasswordProps[]>([])
  const [searchInput, setSearchInput] = useState("")
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const generatePasswordSheetRef = useRef<BottomSheet>(null)

  useEffect(() => {
    setPasswords(testPasswords)
  }, [])

  const showBottomSheetHandler = () => {
    setShowBottomSheet(true)
    generatePasswordSheetRef.current?.snapToIndex(1)
    generatePasswordSheetRef.current?.snapToIndex(1)
  }

  const goToScreen = (screen: string, params: any) => {
    setShowBottomSheet(false)
    generatePasswordSheetRef.current?.close()
    navigation.navigate(screen, params)
  }

  const handleSheetChanges = useCallback((index: number) => {
    if (index == -1 || index == 0) {
      setShowBottomSheet(false)
      generatePasswordSheetRef.current?.close()
    }
  }, [])

  return (
    <SafeAreaView>
      <FocusAwareStatusBar backgroundColor={theme.colors.primary} />
      <TopBar
        iconFunction={() => console.log('xd')}
        title="Cards"
      />
      <FlatList
        style={styles.scrollView}
        contentContainerStyle={{ minHeight: windowHeight }}
        contentOffset={{ y: 60, x: windowWidth }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <HiddenFlatListView
            inputValue={searchInput}
            inputPlaceHolder="Search password..."
            changeInputValue={(value: string) => setSearchInput(value)}
            cancelInput={() => setSearchInput("")}
            buttonText="New"
            buttonFunction={() => goToScreen('createPassword', {})}
          />
        }
        ListHeaderComponentStyle={{
          paddingBottom: 15
        }}
        data={passwords}
        keyExtractor={(item: PasswordProps) => item.id}
        renderItem={({ item }: { item: PasswordProps }) => (
          <PasswordContainer
            password={item}
            goToScreen={goToScreen}
          />
        )}
      />
      {showBottomSheet && (
        <GeneratePasswordSheet
          goToScreen={goToScreen}
          handleSheetChanges={handleSheetChanges}
          bottomSheetRef={generatePasswordSheetRef}
        />
      )}
    </SafeAreaView>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  scrollView: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 150,
    marginTop: 15
  },
  searchInputContainer: {
    width: '70%',
    backgroundColor: theme.colors.background,
    padding: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  hiddenViewContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export default CardsScreen