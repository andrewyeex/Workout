import React from 'react'
import { View } from 'react-native'
import PickerSelect from 'react-native-picker-select'
import { Icon } from 'expo'

const Select = ({
  style,
  placeholder = 'Select an option',
  optionSelected,
  handleOptionSelected,
  options
}) => (
  <View style={{flex: 1, paddingVertical: 10, paddingHorizontal: 20}}>
    <PickerSelect
      placeholder={{
        label: placeholder,
        value: null,
        color: '#9EA0A4',
      }}
      style={{...pickerStyle, ...style}}
      value={optionSelected}
      Icon={() => <Icon.Ionicons name='ios-arrow-down' size={24} />}
      onValueChange={handleOptionSelected}
      items={options}
    />
  </View>
)

const pickerStyle = {
	inputIOS: {
		color: '#000',
		paddingTop: 13,
		paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1
	},
	inputAndroid: {
		color: '#000',
	},
	placeholderColor: '#000',
  underline: { borderTopWidth: 0 },
  iconContainer: {
    top: 5,
    right: 15,
  },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
};

export default Select
