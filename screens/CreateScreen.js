import React, { Component } from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import TextHeader from '../ui_components/TextHeader'


import CreateAdd from '../components/CreateAdd'

class CreateScreen extends React.Component {
  state = {
    mode: 0,
    addSelectedType: 'workout',
    addTextInputValue: '',
    addTextInputDescription: '',
    addActivitiesCollection: [],
    isAddActivitiesModalVisible: false
  }

  handleModeChange = mode => () => this.setState({ mode })
  handleUpdateAddSelectedType = (type, index) => this.setState({ addSelectedType: type })
  handleToggleIsAddActivitiesModalVisible = () => this.setState(prevState => ({isAddActivitiesModalVisible: !prevState.isAddActivitiesModalVisible }))
  handleOnChangeText = key => text => this.setState({[key]: text})
  handleAddActivities = activity => () => this.setState(prevState => ({
    addActivitiesCollection: [...prevState.addActivitiesCollection, activity],
    isAddActivitiesModalVisible: !prevState.isAddActivitiesModalVisible
  }))
  handleRemoveActivities = index => this.setState(prevState => ({ addActivitiesCollection: [...prevState.addActivitiesCollection].filter((v,i) => i !== index)}))

  render(){
    const {
      mode,
      addSelectedType,
      addTextInputValue,
      addTextInputDescription,
      addActivitiesCollection,
      isAddActivitiesModalVisible
    } = this.state

    const {
      handleToggleIsAddActivitiesModalVisible,
      handleUpdateAddSelectedType,
      handleModeChange,
      handleAddActivities,
      handleRemoveActivities,
      handleOnChangeText
    } = this

    const createAddProps = {
      handleToggleIsAddActivitiesModalVisible,
      handleUpdateAddSelectedType,
      handleModeChange,
      handleAddActivities,
      handleRemoveActivities,
      handleOnChangeText,
      addSelectedType,
      addTextInputValue,
      addTextInputDescription,
      addActivitiesCollection,
      isAddActivitiesModalVisible
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
