import React from 'react'
import { View, Text } from 'react-native'

const TextList = props => (
  <View style={{backgroundColor: '#eee', padding: 10, borderRadius: 10}}>
    {props.children}
  </View>
)

export default TextList
