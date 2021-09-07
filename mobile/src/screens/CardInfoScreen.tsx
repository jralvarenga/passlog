import { Theme, useTheme } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import HeaderNavigationBar from '../components/HeaderNavigationBar'
import { CardProps } from '../interface/interfaces'
import { cardIcon } from '../lib/getCardIcon'
import { reduceIncrementColor } from '../lib/reduceIncrementColor'

interface CardInfoScreenProps {
  route: any
}

const CardInfoScreen = ({ route }: CardInfoScreenProps) => {
  const [cardInfo, setCardInfo] = useState<CardProps>(route.params.cardInfo)
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <View style={{ flex: 1 }}>
      <HeaderNavigationBar
        title={cardInfo.cardName}
        /*showIcon
        icon={{ name: "menu", type: 'feather' }}*/
      />
      <Text
          selectable
          selectionColor={theme.colors.primary}
          style={[styles.text, { marginLeft: 15 }]}
        >
        {cardInfo.type} card type
      </Text>
      <View style={styles.cardInfo}>
        <View style={styles.emailCardContainer}>
          <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="mail"
              type="ionicon"
              size={25}
              color={theme.colors.text}
            />
            <View style={styles.emailCardBox}>
              <Text
                selectable
                selectionColor={theme.colors.primary}
                style={styles.text}
              >
                {cardInfo.holder}
              </Text>
            </View>
          </View>
          <Icon
            name="copy"
            color={theme.colors.text}
            containerStyle={[styles.copyIconContainerStyle]}
            type="ionicon"
          />
        </View>
        <View style={styles.emailCardContainer}>
          <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="lock-open"
              type="ionicon"
              size={28}
              color={theme.colors.text}
            />
            <View style={styles.emailCardBox}>
              <Text
                selectable
                selectionColor={theme.colors.primary}
                style={styles.text}>
                {cardInfo.number}
              </Text>
            </View>
          </View>
          <Icon
            name="copy"
            color={theme.colors.text}
            containerStyle={[styles.copyIconContainerStyle]}
            type="ionicon"
          />
        </View>
      </View>
      <Text style={[styles.text, { marginLeft: 15 }]}>
        Last update on {cardInfo.date}
      </Text>
      <View style={styles.commentsContainer}>
      </View>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  emailCardContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  emailCardBox: {
    width: '90%',
    marginLeft: 10,
    backgroundColor: theme.colors.card,
    padding: 10,
    paddingLeft: 15,
    borderRadius: 15
  },
  commentsContainer: {
    flex: 3,
    padding: 15
  },
  copyIconContainerStyle: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 100,
  },
  commentsBox: {
    borderWidth: 2,
    borderColor: theme.colors.card,
    borderRadius: 20,
    height: '90%',
    padding: 15
  }
})

export default CardInfoScreen