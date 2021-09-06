import React, { useState, useEffect } from "react"
import {
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { BottomMenuItem } from "./BottomMenuItem"
import { Theme, useTheme } from "@react-navigation/native"

export const TabBar = ({ state, descriptors, navigation}: BottomTabBarProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const [translateValue] = useState(new Animated.Value(0))
  const totalWidth = Dimensions.get("window").width
  const tabWidth = totalWidth / state.routes.length
  
  const animateSlider = (index: number) => {
    Animated.spring(translateValue, {
      toValue: index * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    animateSlider(state.index)
  }, [state.index])
  
  return (
    <View style={[styles.tabContainer, { width: totalWidth }]}>
      <View style={{ flexDirection: "row" }}>
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{ translateX: translateValue }],
              width: tabWidth - 20,
            },
          ]}
        />

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name

          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }

            animateSlider(index)
          }

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            })
          }

          return (
            <TouchableOpacity
              accessibilityRole="button"
              /* @ts-ignore */
              accessibilityStates={isFocused ? ["selected"] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={index}
            >
              <BottomMenuItem
                iconName={label.toString()}
                isCurrent={isFocused}
              />
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  tabContainer: {
    height: 60,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    backgroundColor: theme.colors.background,
    elevation: 10,
    bottom: 0,
  },
  slider: {
    height: 5,
    position: "absolute",
    top: 0,
    left: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
  },
})