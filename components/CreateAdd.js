import React, { Component } from 'react'
import { View, TextInput, Text} from 'react-native'

const CreateAdd = ({
  handleModeChange,
  addSelectedType,
  addTextInputValue,
  addTextInputDescription,
  addActivities
}) => (
  <View style={{flex: 1}}>
    <View style={{flex: 1, paddingVertical: 10, paddingHorizontal: 20}}>
      <View style={{paddingVertical: 10, borderBottomWidth: 1}}>
        <TextInput style={{height: 40, paddingHorizontal: 10}} value={addTextInputValue} />
      </View>
    </View>
    <View style={{flex: 1, paddingVertical: 10, paddingHorizontal: 20}}>
      <View style={{paddingVertical: 10, borderBottomWidth: 1}}>
        <TextInput style={{height: 40, paddingHorizontal: 10}} value={addTextInputDescription} />
      </View>
    </View>


  </View>
)

const CreateTextInput = () => (
  <TextInput
    style={{flex: 1}}
  />
)

export default CreateAdd
