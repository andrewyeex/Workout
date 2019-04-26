import React from 'react'
import { View, Text } from 'react-native'

const TextList = props => (
  <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
    {props.children}
  </View>
)

export default TextList
