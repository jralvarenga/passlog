import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NoteProps } from '../interface/interfaces'

interface NoteContainerProps {
  note: NoteProps
  goToScreen: Function
}

const NoteContainer = ({ note, goToScreen }: NoteContainerProps) => {
  const theme = useTheme()
  const styles = styleSheet(theme)

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => goToScreen('noteEditor', { note: note })}
    >
      <LinearGradient
        colors={[theme.colors.card, theme.colors.background]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.noteName}>
          <View style={styles.noteNameInfo}>
            <Text
              style={[styles.text, { fontSize: 28, fontFamily: 'poppins-bold' }]}
            >
              {note.title}
            </Text>
          </View>
          <View style={styles.noteNameIcon}>
            <Ionicons
              name={"book"}
              size={30}
              color={theme.colors.text}
            />
          </View>
        </View>
        <View style={styles.noteInfo}>
          <Text style={[styles.text]}>{note.body}</Text>
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
  noteName: {
    flex: 3,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteNameInfo: {
    width: '80%',
    display: 'flex'
  },
  noteNameIcon: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noteInfo: {
    flex: 1.5,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default NoteContainer