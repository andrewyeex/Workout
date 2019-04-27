import React, { Component } from 'react'
import { View } from 'react-native'
import { WorkoutContext } from '../context/WorkoutContext'
import Select from '../ui_components/Select'
import TextRowLinks from '../ui_components/TextRowLinks'

export default class CreateAddActivityForm extends Component {
  state = {
    activitySelected: '',
    timeInSeconds: ''
  }

  _setState = state => value => () => this.setState({[state]: value})

  render(){
    const { _setState } = this
    const { closeModal, addActivity } = this.props
    const { activitySelected, timeInSeconds } = this.state
    return(
      <WorkoutContext.Consumer>
        {({ activities }) =>
          <View style={{marginTop: 85, flex: 1, borderTopWidth: 1, borderTopColor: '#ccc'}}>
            <TextRowLinks
              isButton={true}
              leftText={'Cancel'}
              leftTextCallback={closeModal}
              rightText={'Add'}
              rightTextCallback={addActivity(this.state)} />
            <Select
              placeholder={'Select an activity'}
              options={Object.entries(activities).map(([key, {name: label}]) => ({label, value: {key, label}, key}))}
              optionSelected={activitySelected}
              handleOptionSelected={_setState('activitySelected')} />
            <Select
              placeholder={'Select a time in seconds'}
              options={
                ['15', '30', '45', '60',
                  '75', '90', '105', '120',
                  '135', '150', '165', '180'].map(s => ({label: s, value: s, key: s}))}
              optionSelected={timeInSeconds}
              handleOptionSelected={_setState('timeInSeconds')} />
          </View>}
      </WorkoutContext.Consumer>
    )
  }
}
