import React from 'react'
import { View, TouchableOpacity, Modal, Text} from 'react-native'

import CreateAddActivityForm from './CreateAddActivityForm'
import TextRowLinks from '../ui_components/TextRowLinks'
import TextInput from '../ui_components/TextInput'
import Select from '../ui_components/Select'

const CreateAdd = ({
  handleToggleIsAddActivitiesModalVisible,
  handleUpdateAddSelectedType,
  handleModeChange,
  handleAddActivities,
  addSelectedType,
  addTextInputValue,
  addTextInputDescription,
  addActivities,
  isAddActivitiesModalVisible
}) => (
  <View style={{flex: 1}}>
    <TextRowLinks
      leftText={'Back'}
      leftTextCallback={()=>handleModeChange(0)}
      rightText={'Save'}
      rightTextCallback={()=>{}} />
    <Select
      options={[
        {label: 'workout', value: 'workout', key: 'workout'},
        {label: 'activity', value: 'activity', key: 'activity'}
      ]}
      optionSelected={addSelectedType}
      handleOptionSelected={handleUpdateAddSelectedType}
    />
    <TextInput value={addTextInputValue} />
    <TextInput value={addTextInputDescription} />
    <View style={{flex:1}}>
      {addSelectedType === 'workout' &&
        <CreateAddActivityList
          addActivities={addActivities}
          handleToggleIsAddActivitiesModalVisible={handleToggleIsAddActivitiesModalVisible} />}
    </View>
    <Modal
      animationType='slide'
      transparent={false}
      visible={isAddActivitiesModalVisible}>
      <CreateAddActivityForm
        add={handleAddActivities}
        cancel={handleToggleIsAddActivitiesModalVisible} />
    </Modal>
  </View>
)

const CreateAddActivityList = ({handleToggleIsAddActivitiesModalVisible}) => (
  <TouchableOpacity onPress={handleToggleIsAddActivitiesModalVisible}>
    <Text>Show Modal</Text>
  </TouchableOpacity>
)

export default CreateAdd
