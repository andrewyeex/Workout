import React from 'react'
import { View, TouchableOpacity, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import CreateAddActivityForm from './CreateAddActivityForm'
import CreateAddActivityList from './CreateActivityList'
import TextSubHeader from '../ui_components/TextSubHeader'
import TextRowLinks from '../ui_components/TextRowLinks'
import TextInput from '../ui_components/TextInput'
import Select from '../ui_components/Select'

const SelectOptions = [
  {label: 'Workout', value: 'workout', key: 'workout'},
  {label: 'Activity', value: 'activity', key: 'activity'}
]

const CreateAdd = ({
  handleUpdateStateObj,
  addWorkoutObj,
  addActivityObj,
  handleImagePicker,
  handleUpdateState,
  handleAddActivities,
  handleRemoveActivities,
  addSelectedType,
  isAddWorkoutActivitiesModalVisible
}) => (
  <View style={{flex: 1}}>
    <TextRowLinks
      isButton={true}
      leftText={'Back'}
      leftTextCallback={handleUpdateState('mode')(0)}
      rightText={'Save'}
      rightTextCallback={()=>{}} />
    <Select
      options={SelectOptions}
      optionSelected={addSelectedType}
      handleOptionSelected={handleUpdateState('addSelectedType')} />
    {addSelectedType === 'workout' &&
      <View style={{ padding: 20, marginTop: 10 }}>
        <TouchableOpacity
          onPress={handleImagePicker}
          style={{
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#000',
            height: 50 }}>
          <Ionicons name='ios-images' size={24} color={'#fff'} />
          <TextSubHeader text='Select an Image' fontStyle={{color: '#fff'}} />
        </TouchableOpacity>
      </View>}
    <TextInput
      placeholder='Enter a name'
      value={addWorkoutObj.name}
      onChangeText={handleUpdateStateObj('addWorkoutObj')('name')} />
    <TextInput
      placeholder='Enter a description'
      value={addWorkoutObj.description}
      onChangeText={handleUpdateStateObj('addWorkoutObj')('description')}  />
    <View style={{flex:1}}>
      {addSelectedType === 'workout' &&
        <CreateAddActivityList
          activities={addWorkoutObj.activities}
          removeActivity={handleRemoveActivities}
          openModal={handleUpdateState('isAddWorkoutActivitiesModalVisible')(true)} />}
    </View>
    <Modal
      animationType='slide'
      transparent={false}
      visible={isAddWorkoutActivitiesModalVisible}>
      <CreateAddActivityForm
        addActivity={handleAddActivities}
        closeModal={handleUpdateState('isAddWorkoutActivitiesModalVisible')(false)} />
    </Modal>
  </View>
)

export default CreateAdd
