import React from 'react'
import { View, TextInput as Input } from 'react-native'

const TextInput = ({
  value,
  onChange
}) => (
  <View style={{flex: 1, paddingVertical: 10, paddingHorizontal: 20}}>
    <View style={{paddingVertical: 10, borderBottomWidth: 1}}>
      <Input style={{height: 40, paddingHorizontal: 10}} value={value} onChange={onChange} />
    </View>
  </View>
)

export default TextInput
