import React from 'react'
import { View, Text } from 'react-native'

const TextList = props => (
  <View style={{flex: 1}}>
    {props.children}
  </View>
)

export default TextList
