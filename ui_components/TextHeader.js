import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

const TextHeader = ({
  text,
  alignItems = 'center',
  callback,
  style
}) => (
  <TouchableOpacity onPress={callback} style={{flex: .5, alignItems, ...style}}>
    <Text style={{fontSize: 40, fontWeight: '600'}}>{text}</Text>
  </TouchableOpacity>
)

export default TextHeader
