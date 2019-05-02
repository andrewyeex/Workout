import React, { Component } from 'react'
import { View } from 'react-native'
import { ImagePicker, Permissions } from 'expo'

import TextHeader from '../ui_components/TextHeader'
import BackArrow from '../ui_components/BackArrow'
import CreateAdd from '../components/CreateAdd'

class CreateScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let headerLeft
    const { state : { params = {} } } = navigation
    if (params.showBack && typeof params.backFn === 'function')
      headerLeft = <BackArrow onPress={params.backFn} />
    return {
      title: 'Create',
      headerLeft
    }
  }

  state = {
    mode: 0,
    // ADD STATES
    isAddWorkoutActivitiesModalVisible: false,
    addWorkoutObj : {
      id: '',
      name: '',
      description: '',
      image: 'https://via.placeholder.com/400/ffffff/000000?text=image',
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
    isWorkoutSelected: true
  }

  componentDidMount = () => {
    this.props.navigation.setParams({ showBack: false, backFn: null })
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { setParams } = this.props.navigation
    if (prevState.mode !== this.state.mode && this.state.mode > 0)
      setParams({ showBack: true, backFn: this._setState('mode')(0) })
    if(prevState.mode !== this.state.mode && this.state.mode === 0)
      setParams({ showBack: false, backFn: null })
  }

  _setStateObj = state => key => value => this.setState(prevState => ({
    [state]: {...prevState[state], [key]: value }
  }))

  _setState = state => value => () => this.setState({ [state]: value })

  baseState = {...this.state}

  handleResetForm = () => this.setState(this.baseState)

  handleImagePicker = async () => {
    const permission = await this.handleCameraPermission()
    if (permission) {
      const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3] })
      if (!result.cancelled) this._setStateObj('addWorkoutObj')('image')(result.uri)
    }
  }

  handleCameraPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      const { status : _status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (_status !== 'granted') alert('You have not granted Camera permission to EXPO')
      return false
    }
    return true
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
      isWorkoutSelected,
      isAddWorkoutActivitiesModalVisible
    } = this.state

    const {
      _setState,
      _setStateObj,
      handleAddActivities,
      handleRemoveActivities,
      handleImagePicker,
      handleResetForm
    } = this

    const createAddProps = {
      _setState,
      _setStateObj,
      handleAddActivities,
      handleRemoveActivities,
      handleImagePicker,
      handleResetForm,
      isWorkoutSelected,
      addWorkoutObj,
      addActivityObj,
      isAddWorkoutActivitiesModalVisible,
      payload: {
        key: isWorkoutSelected ? 'workouts' : 'activities',
        content: isWorkoutSelected ? addWorkoutObj : addActivityObj,
        callback: handleResetForm
      }
    }

    return(
      mode === 0 ? <CreateMenu _setState={_setState} /> : <CreateAdd {...createAddProps} />
      // mode === 1 ? <CreateAdd {...createAddProps} /> :
      // mode === 2 ? this.renderRemovePage() :
      // mode === 3 ? this.renderEditPage() : this.renderErrorPage()
    )
  }
}

const CreateMenu = ({ _setState }) => (
  <View style={{flex: 1}}>
    <TextHeader text='ADD'    callback={_setState('mode')(1)} fontStyle={{color: '#fff'}} style={{justifyContent: 'center', backgroundColor: '#000'}} />
    <TextHeader text='REMOVE' callback={_setState('mode')(2)} style={{justifyContent: 'center'}} />
    <TextHeader text='EDIT'   callback={_setState('mode')(3)} fontStyle={{color: '#fff'}} style={{justifyContent: 'center', backgroundColor: '#000'}}  />
  </View>
)

export default CreateScreen
