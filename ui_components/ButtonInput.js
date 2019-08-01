import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

import TextSubHeader from '../ui_components/TextSubHeader'

const ButtonInput = ({onPress, iconName, text}) => (
  <View style={{padding: 10}}>
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000',
        height: 50
      }}
    >
      <Ionicons name={iconName} size={24} color={'#fff'} />
      <TextSubHeader text={text} fontStyle={{color: '#fff'}} />
    </TouchableOpacity>
  </View>
)

export default ButtonInput
