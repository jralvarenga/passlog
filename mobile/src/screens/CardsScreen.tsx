import React, { useState } from 'react'
import { Dimensions, FlatList, StyleSheet } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from '../components/TopBar'
import HiddenFlatListView from '../components/HiddenFlatListView'
import { CardProps } from '../interface/interfaces'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import CardContainer from '../components/CardContainer'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'
import EmptyDataView from '../components/EmptyDataView'
import LottieView from 'lottie-react-native'
import { useTranslation } from 'react-i18next'
import EnterAnimationView from '../components/EnterAnimationView'

interface CardsContainerProps {
  navigation: any
}

const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height
const ENTER_ANIMATION_DURATION = 200
const ENTER_ANIMATION_DELAY = 150

const CardsScreen = ({ navigation }: CardsContainerProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()
  const { cards } = usePasslogUserData()
  const [searchInput, setSearchInput] = useState("")

  const goToScreen = (screen: string, params: any) => {
    navigation.navigate(screen, params)
  }

  const sortedCards = cards?.sort((a: CardProps, b: CardProps) => {
    if (a.cardName > b.cardName) {
      return 1
    }
    if (a.cardName < b.cardName) {
      return -1
    }
    return 0
  })

  const filteredCards = sortedCards?.filter((profiles: CardProps) =>
    profiles.cardName.toLowerCase().includes(searchInput.toLowerCase()) ||
    profiles.holder.toLowerCase().includes(searchInput.toLowerCase()) ||
    profiles.type.toLowerCase().includes(searchInput.toLowerCase())
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusAwareStatusBar backgroundColor={theme.colors.primary} />
      <TopBar
        showIcon
        iconFunction={() => goToScreen('createCard', {})}
        icon={{ name: 'add', type: 'material' }}
        title={t('cards_title')}
      />
      {cards?.length != 0 ? (
        <FlatList
          style={styles.scrollView}
          contentContainerStyle={{ minHeight: WINDOW_HEIGHT }}
          contentOffset={{ y: 60, x: WINDOW_WIDTH }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <HiddenFlatListView
              inputValue={searchInput}
              inputPlaceHolder={t('search_card')}
              changeInputValue={(value: string) => setSearchInput(value)}
              cancelInput={() => setSearchInput("")}
              buttonText="New"
              buttonFunction={() => console.log('xd')}
            />
          }
          ListHeaderComponentStyle={{
            paddingBottom: 15
          }}
          data={filteredCards}
          keyExtractor={(item: CardProps) => item.id}
          renderItem={({ item, index }: { item: CardProps, index: number }) => (
            <EnterAnimationView
              fade
              delay={ENTER_ANIMATION_DELAY + ENTER_ANIMATION_DELAY*index}
              duration={ENTER_ANIMATION_DURATION}
            >
              <CardContainer
                card={item}
                goToScreen={goToScreen}
              />
            </EnterAnimationView>
          )}
        />
      ) : (
        <EmptyDataView
          text={t('start_adding_cards')}
          buttonFunction={() => goToScreen('createCard', {})}
        >
          <LottieView
            source={require('../../assets/animations/cards.json')}
            autoPlay
            loop={false}
            style={{ width: 250, height: 250 }}
          />
        </EmptyDataView>
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