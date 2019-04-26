import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const TextRowLinks = ({
  leftText,
  leftTextCallback,
  rightText,
  rightTextCallback
}) => (
  <View style={{flexDirection: 'row', padding: 20}}>
    {leftText  && <TouchableOpacity onPress={leftTextCallback} style={style.button}><Text style={{fontWeight: '600'}}>{leftText}</Text></TouchableOpacity>}
    {rightText && <TouchableOpacity onPress={rightTextCallback} style={{...style.button}}><Text style={{fontWeight: '600'}}>{rightText}</Text></TouchableOpacity>}
  </View>
)

const style = StyleSheet.create({
  button: {
    backgroundColor: '#aaa',
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    flex: 1,
    marginHorizontal: 10
  }
})

export default TextRowLinks
