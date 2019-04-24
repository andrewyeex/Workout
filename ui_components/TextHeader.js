import React from 'react'
import { View, Text } from 'react-native'

const TextHeader = ({
  text,
  alignItems = 'center',
  callback = () => console.warning('Callback Not Provided'),
}) => (
  <View onPress={callback} style={{flex: .5, alignItems}}>
    <Text style={{fontSize: 40, fontWeight: '600'}}>{text}</Text>
  </View>
)

export default TextHeader
