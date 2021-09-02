import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, StyleSheet } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PasswordContainer from '../components/PasswordContainer'
import TopBar from '../components/TopBar'
import HiddenFlatListView from '../components/HiddenFlatListView'
import { PasswordProps } from '../interface/interfaces'

// Test data
import { testPasswords } from '../data/testData'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const PasswordsScreen = () => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const [passwords, setPasswords] = useState<PasswordProps[]>([])
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    setPasswords(testPasswords)
  }, [])

  return (
    <SafeAreaView>
      <TopBar
        title="Passwords"
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
            buttonFunction={() => console.log('hi')}
          />
        }
        ListHeaderComponentStyle={{
          paddingBottom: 15
        }}
        data={passwords}
        keyExtractor={(item: PasswordProps) => item.id}
        renderItem={({ item }: { item: PasswordProps }) => (
          <PasswordContainer
            name={item.profileName}
            email={item.email}
            password={item.password}
            user={item.user ? item.user : ""}
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
    marginBottom: 150
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