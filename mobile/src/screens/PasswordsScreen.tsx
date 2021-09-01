import React, { useState } from 'react'
import { Dimensions, FlatList, StyleSheet } from 'react-native'
import { Theme, useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PasswordContainer from '../components/PasswordContainer'
import TopBar from '../components/TopBar'
import HiddenFlatListView from '../components/HiddenFlatListView';

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const PasswordsScreen = () => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const [searchInput, setSearchInput] = useState("")

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
        data={[0, 1, 2,1,1,1,1,1,11,1,1,1]}
        renderItem={() => (
          <PasswordContainer />
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