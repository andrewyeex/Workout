import React from 'react'
import {TouchableOpacity, Text} from 'react-native'

const TextHeader = ({
  text,
  alignItems = 'center',
  callback,
  style,
  fontStyle
}) => (
  <TouchableOpacity
    onPress={callback}
    style={{flex: 0.5, alignItems, ...style}}
  >
    <Text style={{fontSize: 40, fontWeight: '600', ...fontStyle}}>{text}</Text>
  </TouchableOpacity>
)

export default TextHeader
