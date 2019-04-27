import React, { Component } from 'react'
import { View } from 'react-native'
import { ImagePicker, Permissions } from 'expo'

import TextHeader from '../ui_components/TextHeader'
import CreateAdd from '../components/CreateAdd'

function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

class CreateScreen extends React.Component {
  state = {
    mode: 0,
    // ADD STATES
    isAddWorkoutActivitiesModalVisible: false,
    addWorkoutObj : {
      id: '',
      name: '',
      description: '',
      image: '',
      activities: [],
      duration: 0
    },
    addActivityObj: {
      id: '',
      name: '',
      description: '',
      youtube: ''
    },
    addImageSelected: null,
    addSelectedType: 'workout',
  }

  handleCreateWorkout = () => {
    const workout = { id: generateUUID(), ...this.state.addWorkoutObj }
  }

  handleUpdateStateObj = state => key => value => this.setState(prevState => ({
    [state]: {...prevState[state], [key]: value }
  }))

  handleUpdateState = state => value => () => this.setState({ [state]: value })

  handleImagePicker = async () => {
    const permission = await this.handleCameraPermission()
    if (permission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      })
      console.log(result)
      if (!result.cancelled) {
        this.setState({ image: result.uri })
      }
    }
  }

  handleCameraPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      const { status : _status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (_status !== 'granted') {
        alert('You have not granted Camera permission to EXPO')
        return false
      }
      return true
    }
  }

  handleAddActivities = activity => () => this.setState(prevState => ({
    isAddWorkoutActivitiesModalVisible: false,
    addWorkoutObj: {
      ...prevState.addWorkoutObj,
      activities: [...prevState.addWorkoutObj.activities, activity],
      duration: [...prevState.addWorkoutObj.activities, activity].reduce((acc, curr) => +acc + +curr['timeInSeconds'], 0)
    }
  }))

  handleRemoveActivities = index => () => this.setState(prevState => ({
    addWorkoutObj: {
      ...prevState.addWorkoutObj,
      activities: [...prevState.addWorkoutObj.activities].filter((v,i) => i !== index)
    }
  }))

  render(){
    const {
      mode,
      addWorkoutObj,
      addActivityObj,
      addSelectedType,
      isAddWorkoutActivitiesModalVisible
    } = this.state

    const {
      handleUpdateState,
      handleUpdateStateObj,
      handleUpdateState,
      handleAddActivities,
      handleRemoveActivities,
      handleImagePicker
    } = this

    const createAddProps = {
      handleImagePicker,
      handleUpdateState,
      handleAddActivities,
      handleRemoveActivities,
      addSelectedType,
      handleUpdateStateObj,
      addWorkoutObj,
      addActivityObj,
      isAddWorkoutActivitiesModalVisible
    }

    return(
      mode === 0 ? <CreateMenu handleUpdateState={handleUpdateState} /> :
      mode === 1 ? <CreateAdd {...createAddProps} /> :
      mode === 2 ? this.renderRemovePage() :
      mode === 3 ? this.renderEditPage() : this.renderErrorPage()
    )
  }
}

const CreateMenu = ({ handleUpdateState }) => (
  <View style={{flex: 1}}>
    <TextHeader text='ADD'    callback={handleUpdateState('mode')(1)} fontStyle={{color: '#fff'}} style={{justifyContent: 'center', backgroundColor: '#000'}} />
    <TextHeader text='REMOVE' callback={handleUpdateState('mode')(2)} style={{justifyContent: 'center'}} />
    <TextHeader text='EDIT'   callback={handleUpdateState('mode')(3)} fontStyle={{color: '#fff'}} style={{justifyContent: 'center', backgroundColor: '#000'}}  />
  </View>
)

export default CreateScreen
