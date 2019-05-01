import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const BackArrow = ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Ionicons name='ios-arrow-back' size={24} />
  </TouchableOpacity>
)

export default BackArrow

const styles = StyleSheet.create({
  container: {
    padding: 3,
    margin: 5
  }
})
