import React from 'react'
import { View, TextInput as Input } from 'react-native'

const TextInput = ({
  placeholder,
  value,
  onChangeText
}) => (
  <View style={{ paddingVertical: 5, paddingHorizontal: 20}}>
    <View style={{paddingVertical: 5, borderBottomWidth: 1}}>
      <Input
        style={{height: 40, paddingHorizontal: 10}}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText} />
    </View>
  </View>
)

export default TextInput
