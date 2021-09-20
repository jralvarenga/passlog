import { Theme, useTheme } from '@react-navigation/native'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
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

const windowWidth = Dimensions.get('window').width
const BORDER_RADIUS = 75

const FirstTimeScreen = () => {
  const theme = useTheme()
  const styles = styleSheet(theme)
  const { t } = useTranslation()
  const scroll = useRef<any>(null)
  const x = new Animated.Value(0)
  const slides: SlideTypes[] = [
    {
      label: t("welcome_label"),
      title: t("welcome_title"),
      description: t("welcome_description"),
      buttonType: 'next',
      color: '#ffc658',
      fontColor: '#ffdfa1'
    },
    {
      label: t("safe_label"),
      title: t("safe_title"),
      description: t("safe_description"),
      buttonType: 'next',
      color: '#ff9262',
      fontColor: '#ffdac9'
    },
    {
      label: t("encrypted_label"),
      title: t("encrypted_title"),
      description: t("encrypted_description"),
      buttonType: 'next',
      color: '#ff637c',
      fontColor: '#ffa3b2'
    },
    {
      label: t("cloud_label"),
      title: t("cloud_title"),
      description: t("cloud_description"),
      buttonType: 'next',
      color: '#d74799',
      fontColor: '#ff9ed5'
    },
    {
      label: t("start_label"),
      title: t("start_title"),
      description: t("start_description"),
      buttonType: 'done',
      color: '#8e44ad',
      fontColor: '#e5a6ff'
    }
  ]
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