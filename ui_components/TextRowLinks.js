import React from 'react'
import { View, Text } from 'react-native'

const TextRowLinks = ({
  leftText,
  leftTextCallback,
  rightText,
  rightTextCallback
}) => (
  <View style={{flexGrow: .25, flexDirection: 'row', padding: 5}}>
    {leftText && <Text onPress={leftTextCallback} style={{flex: 1}}>{leftText}</Text>}
    {rightText && <Text onPress={rightTextCallback} style={{flex: 1, textAlign: 'right'}}>{rightText}</Text>}
  </View>
)

export default TextRowLinks
