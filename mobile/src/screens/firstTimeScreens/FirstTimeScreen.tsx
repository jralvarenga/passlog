import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { Animated, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import Slide, { SLIDE_HEIGHT } from './Slide'
import SubSlide from './SubSlide'

interface SlideTypes {
  label: string
  title: string
  description: string
  buttonType: 'next' | 'done'
}

const windowWidth = Dimensions.get('window').width

const FirstTimeScreen = () => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const x = new Animated.Value(0)

  const onScrollEvent = (event: any) => {
    const scrollXXvalue = event.nativeEvent.contentOffset.x
    x.setValue(scrollXXvalue)
    /*if (scrollXXvalue >= 0) {
      x.setValue(scrollXXvalue)
    }*/
  }

  const slides: SlideTypes[] = [
    {
      label: "Welcome",
      title: "Welcome to Passlog",
      description: "This is a test for description",
      buttonType: 'next'
    },
    {
      label: "Page 1",
      title: "Welcome to Passlog",
      description: "This is a test for description",
      buttonType: 'next'
    },
    {
      label: "Page 2",
      title: "Welcome to Passlog",
      description: "This is a test for description",
      buttonType: 'next'
    },
    {
      label: "Page 3",
      title: "Welcome to Passlog",
      description: "This is a test for description",
      buttonType: 'next'
    }
  ]

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <ScrollView
          horizontal
          snapToInterval={windowWidth}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={onScrollEvent}
        >
          {slides.map((slide, i) => (
            <Slide key={i} label={slide.label} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor: theme.colors.card }}
        ></View>
        <Animated.View 
          style={[
            styles.subSlideContainer,
            {
              width: windowWidth*slides.length,
              transform: [
                { translateX: Animated.multiply(x, -1) }
              ]
            }
          ]}>
          {slides.map((slide, i) => (
            <SubSlide
              key={i}
              title={slide.title}
              description={slide.description}
              buttonType={slide.buttonType}
            />
          ))}
        </Animated.View>
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
    backgroundColor: theme.colors.card,
    borderBottomRightRadius: 75
  },
  footer: {
    flex: 1
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 16,
    color: theme.colors.text
  },
  subSlideContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 75
  }
})

export default FirstTimeScreen