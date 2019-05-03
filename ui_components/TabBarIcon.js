import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'

const TabBarIcon = () =>
  <Ionicons
    name={this.props.name}
    size={26}
    style={{ marginBottom: -3 }}
    color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />

export default TabBarIcon