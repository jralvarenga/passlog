import { Theme, useTheme } from '@react-navigation/native'
import React, { useRef } from 'react'
import { Animated, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import PaginationDot from './PaginationDot'
import Slide, { SLIDE_HEIGHT } from './Slide'
import SubSlide from './SubSlide'

interface SlideTypes {
  label: string
  title: string
  description: string
  buttonType: 'next' | 'done'
  color: string
  fontColor: string
}

const slides: SlideTypes[] = [
  {
    label: "Welcome",
    title: "Welcome To Passlog",
    description: "Start using Passlog and stop worrying about your inportant stuff",
    buttonType: 'next',
    color: '#ffc658',
    fontColor: '#ffdfa1'
  },
  {
    label: "Safe",
    title: "Save Your Data",
    description: "Manage your Passwords and Cards, take Notes and keep it all safe in Passlog",
    buttonType: 'next',
    color: '#ff9262',
    fontColor: '#ffdac9'
  },
  {
    label: "Encrypted",
    title: "All Encrypted",
    description: "Your data from Passwords, Notes and Cards are encrypted with AES encryption, no one will see your data besides you",
    buttonType: 'next',
    color: '#ff637c',
    fontColor: '#ffa3b2'
  },
  {
    label: "Cloud",
    title: "Secure Cloud",
    description: "Keep your data secured in the cloud with an account and have it in any device",
    buttonType: 'next',
    color: '#d74799',
    fontColor: '#ff9ed5'
  },
  {
    label: "Let's start",
    title: "Let's Get Started",
    description: "Start usign Passlog with or without an account and get all your data safe",
    buttonType: 'done',
    color: '#8e44ad',
    fontColor: '#e5a6ff'
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
  const labelColor = x.interpolate({
    inputRange: slides.map((_, i) => i*windowWidth),
    outputRange: slides.map((slide) => slide.fontColor)
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
      <FocusAwareStatusBar backgroundColor="#000" />
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
            <Slide
              key={i}
              right={i%2 == 0 ? false : true}
              label={slide.label}
              color={labelColor}
            />
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