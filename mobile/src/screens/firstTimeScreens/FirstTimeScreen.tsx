import { Theme, useTheme } from '@react-navigation/native'
import React, { useRef } from 'react'
import { Animated, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import PaginationDot from './PaginationDot'
import Slide, { SLIDE_HEIGHT } from './Slide'
import SubSlide from './SubSlide'

interface SlideTypes {
  label: string
  title: string
  description: string
  buttonType: 'next' | 'done'
  color: string
}

const slides: SlideTypes[] = [
  {
    label: "Welcome",
    title: "Welcome To Passlog",
    description: "Stop worrying about all your sensitive information, use Passlog",
    buttonType: 'next',
    color: '#ffc658'
  },
  {
    label: "Save",
    title: "Save Your Data",
    description: "Manage your passwords and cards, take notes and keep it all safe in Passlog",
    buttonType: 'next',
    color: '#ff9262'
  },
  {
    label: "Encrypted",
    title: "All Encrypted",
    description: "All the data from passwords, notes and cards are encrypted with AES encryption, so no one will see your data, but you",
    buttonType: 'next',
    color: '#ff637c'
  },
  {
    label: "Cloud",
    title: "Secure Cloud",
    description: "Create an account, back up all your data and keep it safe in the cloud",
    buttonType: 'next',
    color: '#d74799'
  },
  {
    label: "Done",
    title: "Start Using Passlog",
    description: "Now that you know how it works, start using Passlog and stop worrying",
    buttonType: 'done',
    color: '#8e44ad'
  }
]

const windowWidth = Dimensions.get('window').width
const BORDER_RADIUS = 75

const FirstTimeScreen = () => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const scroll = useRef<any>(null)
  const x = new Animated.Value(0)
  const backgroundColor = x.interpolate({
    inputRange: slides.map((_, i) => i*windowWidth),
    outputRange: slides.map((slide) => slide.color)
  })

  const onScrollEvent = (event: any) => {
    const scrollXXvalue = event.nativeEvent.contentOffset.x
    x.setValue(scrollXXvalue)
    /*if (scrollXXvalue >= 0) {
      x.setValue(scrollXXvalue)
    }*/
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          horizontal
          ref={scroll}
          snapToInterval={windowWidth}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          onScroll={onScrollEvent}
        >
          {slides.map((slide, i) => (
            <Slide key={i} label={slide.label} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor }}
        ></Animated.View>
        <View 
          style={styles.subSlideContainer}>
          <View style={styles.pagination}>
            {slides.map((_, i) => (
              <PaginationDot
                key={i}
                currentIndex={Animated.divide(x, windowWidth)}
                index={i}
              />
            ))}
          </View>
          <Animated.View style={{
            flex: 1,
            width: windowWidth*slides.length,
            flexDirection: 'row',
            transform: [
              { translateX: Animated.multiply(x, -1) }
            ]
          }}>
            {slides.map((slide, i) => (
              <SubSlide
                key={i}
                title={slide.title}
                description={slide.description}
                buttonType={slide.buttonType}
                onPress={() => {
                  if (scroll.current) {
                    scroll.current.scrollTo({ x: windowWidth*(i + 1), animated: true })
                  }
                }}
              />
            ))}
          </Animated.View>
        </View>
      </View>
    </View>
  )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS
  },
  footer: {
    flex: 1,
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  subSlideContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: BORDER_RADIUS
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default FirstTimeScreen