import React, { useState } from 'react'
import { Dimensions, FlatList, StyleSheet } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PasswordContainer from '../components/PasswordContainer'
import TopBar from '../components/TopBar'
import HiddenFlatListView from '../components/HiddenFlatListView'
import { PasswordProps } from '../interface/interfaces'
import GeneratePasswordSheet from '../components/GeneratePasswordSheet'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar'
import { usePasslogUserData } from '../services/PasslogUserDataProvider'
import EmptyDataView from '../components/EmptyDataView'
import LottieView from 'lottie-react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

interface PasswordContainer {
  navigation: any
}

const PasswordsScreen = ({ navigation }: PasswordContainer) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { passwords, setPasswords } = usePasslogUserData()
  const [searchInput, setSearchInput] = useState("")
  const [showBottomSheet, setShowBottomSheet] = useState(false)

  const goToScreen = (screen: string, params: any) => {
    setShowBottomSheet(false)
    navigation.navigate(screen, params)
  }

  const sortedPasswords = passwords?.sort((a: PasswordProps, b: PasswordProps) => {
    if (a.profileName > b.profileName) {
      return 1
    }
    if (a.profileName < b.profileName) {
      return -1
    }
    return 0
  })

  const filteredPasswords = sortedPasswords?.filter((profiles: PasswordProps) =>
    profiles.profileName.toLowerCase().includes(searchInput.toLowerCase()) ||
    profiles.email.toLowerCase().includes(searchInput.toLowerCase()) ||
    profiles.user.toLowerCase().includes(searchInput.toLowerCase())
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusAwareStatusBar backgroundColor={theme.colors.primary} />
      <TopBar
        showIcon
        iconFunction={() => goToScreen('createPassword', {})}
        icon={{ name: 'add', type: 'material' }}
        title="Passwords"
      />
      {passwords?.length != 0 ? (
        <FlatList
          style={styles.scrollView}
          contentContainerStyle={{ minHeight: windowHeight }}
          contentOffset={{ y: 60, x: windowWidth }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <HiddenFlatListView
              showButton
              inputValue={searchInput}
              inputPlaceHolder="Search password..."
              changeInputValue={(value: string) => setSearchInput(value)}
              cancelInput={() => setSearchInput("")}
              buttonText="Generate"
              buttonFunction={() => setShowBottomSheet(true)}
            />
          }
          ListHeaderComponentStyle={{
            paddingBottom: 15
          }}
          data={filteredPasswords}
          keyExtractor={(item: PasswordProps) => item.id}
          renderItem={({ item }: { item: PasswordProps }) => (
            <PasswordContainer
              password={item}
              goToScreen={goToScreen}
            />
          )}
        />
      ) : (
        <EmptyDataView
          text="Start adding your passwords and keep them safe here"
          buttonFunction={() => goToScreen('createPassword', {})}
        >
          <LottieView
            source={require('../../assets/animations/locked.json')}
            autoPlay
            loop={false}
            style={{ width: 250, height: 250 }}
          />
        </EmptyDataView>
      )}
      <GeneratePasswordSheet
        goToScreen={goToScreen}
        visible={showBottomSheet}
        setVisible={setShowBottomSheet}
      />
    </SafeAreaView>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  scrollView: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
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

export default PasswordsScreen