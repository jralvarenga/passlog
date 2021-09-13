import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { reduceIncrementColor } from '../../lib/reduceIncrementColor'

type Props = {
  iconName: string
  isCurrent?: boolean
}

export const BottomMenuItem = ({ iconName, isCurrent }: Props) => {
  const theme = useTheme()

  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Feather
        name={iconName}
        size={32}
        style={{ color: isCurrent ? theme.colors.primary : reduceIncrementColor(theme.colors.card, 'reduce', -30) }}
      />
    </View>
  )
}