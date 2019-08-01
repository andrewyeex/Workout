import React from 'react'
import {View, Modal, StyleSheet} from 'react-native'

import {WorkoutContext} from '../context/WorkoutContext'
import CreateAddActivityForm from './CreateAddActivityForm'
import CreateAddActivityList from './CreateActivityList'
import WorkoutCard from '../components/WorkoutCard'
import TextInput from '../ui_components/TextInput'
import Select from '../ui_components/Select'
import ButtonInput from '../ui_components/ButtonInput'
import BackArrow from '../ui_components/BackArrow'
import Button from '../ui_components/Button'

const SelectOptions = [
  {label: 'Workout', value: true, key: 'workout'},
  {label: 'Activity', value: false, key: 'activity'}
]

const CreateAdd = ({
  _setState,
  _setStateObj,
  payload,
  addWorkoutObj,
  addActivityObj,
  addSelectedType,
  handleImagePicker,
  handleAddActivities,
  handleRemoveActivities,
  isWorkoutSelected,
  isAddWorkoutActivitiesModalVisible
}) => (
  <View style={styles.container}>
    <Select
      options={SelectOptions}
      optionSelected={addSelectedType}
      handleOptionSelected={_setState('isWorkoutSelected')}
    />

    <TextInput
      placeholder='Enter a name'
      value={isWorkoutSelected ? addWorkoutObj.name : addActivityObj.name}
      onChangeText={_setStateObj(
        isWorkoutSelected ? 'addWorkoutObj' : 'addActivityObj'
      )('name')}
    />

    <TextInput
      placeholder='Enter a description'
      value={
        isWorkoutSelected
          ? addWorkoutObj.description
          : addActivityObj.description
      }
      onChangeText={_setStateObj(
        isWorkoutSelected ? 'addWorkoutObj' : 'addActivityObj'
      )('description')}
    />

    {isWorkoutSelected && (
      <View style={styles.workoutButtonContainer}>
        <ButtonInput
          onPress={_setState('isAddWorkoutActivitiesModalVisible')(true)}
          iconName='ios-add-circle-outline'
          text='Add Activities'
        />
        <CreateAddActivityList
          activities={addWorkoutObj.activities}
          removeActivity={handleRemoveActivities}
        />
        <ButtonInput
          onPress={handleImagePicker}
          iconName='ios-images'
          text='Select an Image'
        />
        <WorkoutCard image={{uri: addWorkoutObj.image}} />
      </View>
    )}

    <View style={styles.containerBot}>
      <WorkoutContext.Consumer>
        {({append}) => (
          <Button type='success' text='Save' callback={append(payload)} />
        )}
      </WorkoutContext.Consumer>
    </View>

    <Modal
      animationType='slide'
      transparent={false}
      visible={isAddWorkoutActivitiesModalVisible}
    >
      <CreateAddActivityForm
        addActivity={handleAddActivities}
        closeModal={_setState('isAddWorkoutActivitiesModalVisible')(false)}
      />
    </Modal>
  </View>
)

const styles = StyleSheet.create({
  container: {flex: 1},
  workoutButtonContainer: {flex: 1},
  containerBot: {
    padding: 10
  }
})

export default CreateAdd
