import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CardProps } from '../interface/interfaces'
import { cardIcon } from '../lib/getCardIcon'
import { reduceIncrementColor } from '../lib/reduceIncrementColor'

interface CardContainerProps {
  card: CardProps
  goToScreen: Function
}

const CardContainer = ({ card, goToScreen }: CardContainerProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { icon, iconFamily } = cardIcon(card.type)

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => goToScreen('cardInfo', { cardInfo: card })}
    >
      <LinearGradient
        colors={[theme.colors.card, theme.colors.background]}
        style={styles.container}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.cardName}>
          <View style={[styles.cardNameInfo]}>
              <Text
                style={[styles.text, { fontSize: 25, fontFamily: 'poppins-bold' }]}
              >
                {card.cardName}
              </Text>
            <Text
              style={[styles.text, { color: reduceIncrementColor(theme.colors.text, 'reduce', 80) }]}
            >
              {card.type}
            </Text>
          </View>
          <View style={styles.cardNameIcon}>
            {icon != '' && (
              iconFamily == 'ionicons' ? (
                <Ionicons
                  name={icon}
                  size={30}
                  color={theme.colors.text}
                />
              ) : (
                <MaterialIcon
                  name={icon}
                  size={30}
                  color={theme.colors.text}
                />
              )
            )}
          </View>
        </View>
        <View style={styles.profileInfo}>
          <Text style={[styles.text]}>{card.holder}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 130,
    padding: 15,
    marginVertical: 12,
    //backgroundColor: theme.colors.background,
    borderRadius: 20,
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  cardName: {
    flex: 3,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNameInfo: {
    width: '80%',
    display: 'flex'
  },
  cardNameIcon: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileInfo: {
    flex: 1.5,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default CardContainer