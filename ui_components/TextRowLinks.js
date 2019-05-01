import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const TextRowLinks = ({
  leftText,
  isButton=false,
  leftTextCallback,
  rightText,
  rightTextCallback
}) => (
  <View style={{flexDirection: 'row'}}>
    {leftText  &&
      <TouchableOpacity
        onPress={leftTextCallback}
        style={isButton ? style.button : style.textLink}>
        <Text style={{fontWeight: '600', ...(!isButton && {color: '#5998ff'}) }}>
          {leftText}
        </Text>
      </TouchableOpacity>}
    {rightText &&
      <TouchableOpacity
        onPress={rightTextCallback}
        style={isButton ? style.button : style.textLink}>
        <Text style={{fontWeight: '600'}}>
          {rightText}
        </Text>
      </TouchableOpacity>}
  </View>
)

const base = {
  flex: 1,
  height: 40,
  width: '48%',
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 10
}

const style = StyleSheet.create({
  button: {
    ...base,
    backgroundColor: '#aaa',
    borderRadius: 3,
  },
  textLink: {
    ...base,
    borderBottomWidth: 1,
    borderBottomColor: '#5998ff'
  }
})

export default TextRowLinks
