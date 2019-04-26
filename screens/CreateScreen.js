import React, { Component } from 'react'
import { View } from 'react-native'
import { ImagePicker, Permissions } from 'expo'

import TextHeader from '../ui_components/TextHeader'
import CreateAdd from '../components/CreateAdd'

function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

class CreateScreen extends React.Component {
  state = {
    mode: 0,
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
    addSelectedType: 'workout',
    // addTextInputValue: '',
    // addTextInputDescription: '',
    // addActivitiesCollection: [],
    // addActivitiesDuration: 0,
    // addImageSelected: null
  }

  handleCreateWorkout = () => {
    const workout = {
      id: generateUUID(),
      name: this.state.addTextInputValue,
      description: this.state.addTextInputDescription,
      activities: this.state.addActivitiesCollection,
      image: this.state.addImageSelected,
      duration: this.state.addActivitiesDuration
    }
  }

  handleUpdateStateObj = state => key => value => this.setState(prevState => ({
    [state]: {...prevState[state], [key]: value }
  }))

  handleUpdateState = state => value => this.setState({ [state]: value })

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

  handleModeChange = mode => () => this.setState({ mode })
  handleUpdateAddSelectedType = addSelectedType => this.setState({ addSelectedType })
  handleToggleIsAddWorkoutActivitiesModalVisible = () => this.setState(prevState => ({isAddWorkoutActivitiesModalVisible: !prevState.isAddWorkoutActivitiesModalVisible }))
  handleOnChangeText = key => text => this.setState({[key]: text})
  handleAddActivities = activity => () => this.setState(prevState => {
    const addActivitiesCollection = [...prevState.addActivitiesCollection, activity]
    return {
      addActivitiesCollection,
      // addActivitiesDuration: addActivitiesCollection.reduce((curr, prev) => curr + prev),
      isAddWorkoutActivitiesModalVisible: !prevState.isAddWorkoutActivitiesModalVisible
    }}
  )
  handleRemoveActivities = index => () => this.setState(prevState => ({ addActivitiesCollection: [...prevState.addActivitiesCollection].filter((v,i) => i !== index)}))

  render(){
    const {
      mode,
      addWorkoutObj,
      addActivityObj,
      addSelectedType,
      // addTextInputValue,
      // addTextInputDescription,
      // addActivitiesCollection,
      isAddWorkoutActivitiesModalVisible
    } = this.state

    const {
      handleUpdateStateObj,
      handleToggleIsAddWorkoutActivitiesModalVisible,
      handleUpdateAddSelectedType,
      handleModeChange,
      handleAddActivities,
      handleRemoveActivities,
      handleOnChangeText,
      handleImagePicker
    } = this

    const createAddProps = {
      // handleImagePicker,
      handleToggleIsAddWorkoutActivitiesModalVisible,
      handleUpdateAddSelectedType,
      handleModeChange,
      // handleAddActivities,
      // handleRemoveActivities,
      // handleOnChangeText,
      addSelectedType,
      // addTextInputValue,
      // addTextInputDescription,
      // addActivitiesCollection,
      handleUpdateStateObj,
      addWorkoutObj,
      addActivityObj,
      isAddWorkoutActivitiesModalVisible
    }

    return(
      mode === 0 ? <CreateMenu handleModeChange={this.handleModeChange} /> :
      mode === 1 ? <CreateAdd {...createAddProps} /> :
      mode === 2 ? this.renderRemovePage() :
      mode === 3 ? this.renderEditPage() : this.renderErrorPage()
    )
  }
}

const CreateMenu = ({ handleModeChange }) => (
  <View style={{flex: 1}}>
    <TextHeader text='ADD'    callback={handleModeChange(1)} fontStyle={{color: '#fff'}} style={{justifyContent: 'center', backgroundColor: '#000'}} />
    <TextHeader text='REMOVE' callback={handleModeChange(2)} style={{justifyContent: 'center'}} />
    <TextHeader text='EDIT'   callback={handleModeChange(3)} fontStyle={{color: '#fff'}} style={{justifyContent: 'center', backgroundColor: '#000'}}  />
  </View>
)

export default CreateScreen
