import React from 'react'
import { View, TouchableOpacity, Modal } from 'react-native'

import CreateAddActivityForm from './CreateAddActivityForm'
import CreateAddActivityList from './CreateActivityList'
import TextSubHeader from '../ui_components/TextSubHeader'
import TextRowLinks from '../ui_components/TextRowLinks'
import TextInput from '../ui_components/TextInput'
import Select from '../ui_components/Select'

/*
TODO:
Rename variables to match two objects we need to build
ACTIVITY
WORKOUT
- CreateWorkout
  - ID
  - Name
  - Description
  - Image
  - Activities
- CreateActivity
  - ID
  - Name
  - Description
  - YouTube // optional
*/

const CreateAdd = ({
  handleUpdateStateObj,
  addWorkoutObj,
  addActivityObj,
  // handleImagePicker,
  handleToggleIsAddActivitiesModalVisible,
  handleUpdateAddSelectedType,
  handleModeChange,
  // handleAddActivities,
  // handleRemoveActivities,
  // handleOnChangeText,
  addSelectedType,
  // addTextInputValue,
  // addTextInputDescription,
  // addActivitiesCollection,
  isAddWorkoutActivitiesModalVisible
}) => (
  <View style={{flex: 1}}>
    <TextRowLinks
      isButton={true}
      leftText={'Back'}
      leftTextCallback={handleModeChange(0)}
      rightText={'Save'}
      rightTextCallback={()=>{}} />
    <Select
      options={[
        {label: 'workout', value: 'workout', key: 'workout'},
        {label: 'activity', value: 'activity', key: 'activity'}
      ]}
      optionSelected={addSelectedType}
      handleOptionSelected={handleUpdateAddSelectedType} />
    {/* {addSelectedType === 'workout' &&
      <View style={{ padding: 20, marginTop: 10 }}>
        <TouchableOpacity
          onPress={handleImagePicker}
          style={{
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#000',
            height: 50 }}>
          <Icon.Ionicons name='ios-images' size={24} color={'#fff'} />
          <TextSubHeader text='Select an Image' fontStyle={{color: '#fff'}} />
        </TouchableOpacity>
      </View>} */}
    <TextInput value={addWorkoutObj.name} onChangeText={handleUpdateStateObj('addWorkoutObj')('name')} placeholder='Enter a name'/>
    <TextInput value={addWorkoutObj.description} onChangeText={handleUpdateStateObj('addWorkoutObj')('description')} placeholder='Enter a description' />
    <View style={{flex:1}}>
      {addSelectedType === 'workout' &&
        <CreateAddActivityList
          addActivitiesCollection={addWorkoutObj.addActivitiesCollection}
          handleRemoveActivities={handleRemoveActivities}
          handleToggleIsAddWorkoutActivitiesModalVisible={handleToggleIsAddActivitiesModalVisible} />}
    </View>
    <Modal
      animationType='slide'
      transparent={false}
      visible={isAddWorkoutActivitiesModalVisible}>
      <CreateAddActivityForm
        add={handleAddActivities}
        cancel={handleToggleIsAddActivitiesModalVisible} />
    </Modal>
  </View>
)



export default CreateAdd
