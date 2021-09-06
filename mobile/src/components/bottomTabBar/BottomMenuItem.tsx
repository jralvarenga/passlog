import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
      <Ionicons
        name={iconName}
        size={32}
        style={{ color: isCurrent ? theme.colors.primary : theme.colors.card }}
      />
    </View>
  )
}