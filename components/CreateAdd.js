import React from 'react'
import { View, TouchableOpacity, Modal, ImageBackground } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { WorkoutContext } from '../context/WorkoutContext'
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
  _setState,
  _setStateObj,
  addWorkoutObj,
  addActivityObj,
  addSelectedType,
  handleImagePicker,
  handleAddActivities,
  handleRemoveActivities,
  isAddWorkoutActivitiesModalVisible
}) => (
  <View style={{flex: 1}}>
    <WorkoutContext.Consumer>
    {({append}) =>
      <TextRowLinks
        isButton={true}
        leftText={'Back'}
        leftTextCallback={_setState('mode')(0)}
        rightText={'Save'}
        rightTextCallback={append('workouts')(addWorkoutObj)} />}
    </WorkoutContext.Consumer>
    <Select
      options={SelectOptions}
      optionSelected={addSelectedType}
      handleOptionSelected={_setState('addSelectedType')} />
    <TextInput
      placeholder='Enter a name'
      value={addWorkoutObj.name}
      onChangeText={_setStateObj('addWorkoutObj')('name')} />
    <TextInput
      placeholder='Enter a description'
      value={addWorkoutObj.description}
      onChangeText={_setStateObj('addWorkoutObj')('description')}  />
    {addSelectedType === 'workout' &&
    <View style={{flex:1}}>
      <View>
        <CreateAddActivityList
          activities={addWorkoutObj.activities}
          removeActivity={handleRemoveActivities}
          openModal={_setState('isAddWorkoutActivitiesModalVisible')(true)} />
      </View>
      <View style={{ padding: 20 }}>
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
      </View>
      <View style={{marginBottom: 10, paddingHorizontal: 20 }}>
        <ImageBackground
          source={{uri: addWorkoutObj.image ? addWorkoutObj.image : 'https://via.placeholder.com/400?text=image'}}
          style={{height: 150, marginBottom: 10}}
          imageStyle={{borderRadius: 10}} />
      </View>
    </View>}
    <Modal
      animationType='slide'
      transparent={false}
      visible={isAddWorkoutActivitiesModalVisible}>
      <CreateAddActivityForm
        addActivity={handleAddActivities}
        closeModal={_setState('isAddWorkoutActivitiesModalVisible')(false)} />
    </Modal>
  </View>
)

export default CreateAdd
