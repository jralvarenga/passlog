import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, StyleSheet } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from '../components/TopBar'
import HiddenFlatListView from '../components/HiddenFlatListView'
import { CardProps, PasswordProps } from '../interface/interfaces'
import BottomSheet from '@gorhom/bottom-sheet'
import GeneratePasswordSheet from '../components/GeneratePasswordSheet'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import CardContainer from '../components/CardContainer'

// Test data
import { testCards } from '../data/testData'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

interface PasswordContainerProps {
  navigation: any
}

const CardsScreen = ({ navigation }: PasswordContainerProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const [cards, setCards] = useState<CardProps[]>([])
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    setCards(testCards)
  }, [])

  const goToScreen = (screen: string, params: any) => {
    navigation.navigate(screen, params)
  }

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
            inputPlaceHolder="Search card..."
            changeInputValue={(value: string) => setSearchInput(value)}
            cancelInput={() => setSearchInput("")}
            buttonText="New"
            buttonFunction={() => goToScreen('createCard', {})}
          />
        }
        ListHeaderComponentStyle={{
          paddingBottom: 15
        }}
        data={cards}
        keyExtractor={(item: CardProps) => item.id}
        renderItem={({ item }: { item: CardProps }) => (
          <CardContainer
            card={item}
            goToScreen={goToScreen}
          />
        )}
      />
    </SafeAreaView>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  scrollView: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 130,
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