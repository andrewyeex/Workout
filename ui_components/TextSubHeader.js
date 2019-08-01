import React from 'react'
import {View, Text} from 'react-native'

const TextSubHeader = ({
  text,
  fontStyle,
  alignItems = 'center',
  textCallback = () => console.warning('Callback Not Provided')
}) => (
  <View onPress={textCallback} style={{flex: 0.5, alignItems}}>
    <Text style={{fontSize: 20, fontWeight: '300', ...fontStyle}}>{text}</Text>
  </View>
)

export default TextSubHeader
