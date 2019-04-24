import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

const Button = ({
  text,
  type = 'success',
  callback
}) => (
  <TouchableOpacity
    onPress={callback}
    style={{
      backgroundColor: typeColorMapper[type],
      borderRadius: 10,
      height: 40,
      alignItems: 'center'}}>
    <Text style={{lineHeight: 40, color: '#fff', fontWeight: '600'}}>{text}</Text>
  </TouchableOpacity>
)

export default Button

const typeColorMapper = {
  success: '#36bc14',
  failure: '#f44d41',
  warning: '#f4ee41',
  information: '#41aff4'
}
