import React from 'react'
import { View, TextInput as Input } from 'react-native'

const TextInput = ({
  value,
  name,
  onChangeText
}) => (
  <View style={{ paddingVertical: 5, paddingHorizontal: 20}}>
    <View style={{paddingVertical: 5, borderBottomWidth: 1}}>
      <Input style={{height: 40, paddingHorizontal: 10}} placeholder={value} value={''} name={name} onChange={(e)=>console.log({e: e})} />
    </View>
  </View>
)

export default TextInput
