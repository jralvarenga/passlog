import React, { useState } from 'react'
import { Dimensions, FlatList, StyleSheet } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from '../components/TopBar'
import HiddenFlatListView from '../components/HiddenFlatListView'
import { CardProps, PasslogUserDataProps } from '../interface/interfaces'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import CardContainer from '../components/CardContainer'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'
import EmptyDataView from '../components/EmptyDataView'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

interface PasswordContainerProps {
  navigation: any
}

const CardsScreen = ({ navigation }: PasswordContainerProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { cards, setCards }: PasslogUserDataProps = usePasslogUserData()
  const [searchInput, setSearchInput] = useState("")

  const goToScreen = (screen: string, params: any) => {
    navigation.navigate(screen, params)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusAwareStatusBar backgroundColor={theme.colors.primary} />
      <TopBar
        iconFunction={() => console.log('xd')}
        title="Cards"
      />
      {cards?.length != 0 ? (
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
      ) : (
        <EmptyDataView
          item="Card"
          buttonFunction={() => goToScreen('createCard', {})}
        />
      )}
    </SafeAreaView>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  scrollView: {
    paddingLeft: 20,
    paddingRight: 20,
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