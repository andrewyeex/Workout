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
  handleActivitySelected = activitySelected => this.setState({ activitySelected })
  handleTimeInSecondsSelected = timeInSeconds => this.setState({ timeInSeconds })
  render(){
    const { cancel, add } = this.props
    const { activitySelected, timeInSeconds } = this.state
    return(
      <WorkoutContext.Consumer>
        {({ activities }) =>
          <View style={{marginTop: 85, flex: 1, borderTopWidth: 1, borderTopColor: '#ccc'}}>
            <TextRowLinks
              isButton={true}
              leftText={'Cancel'}
              leftTextCallback={cancel}
              rightText={'Add'}
              rightTextCallback={() => add(this.state)} />
            <Select
              placeholder={'Select an activity'}
              options={Object.entries(activities).map(([key, {name: label}]) => ({label, value: key, key}))}
              optionSelected={activitySelected}
              handleOptionSelected={this.handleActivitySelected} />
            <Select
              placeholder={'Select a time in seconds'}
              options={
                ['15', '30', '45', '60',
                  '75', '90', '105', '120',
                  '135', '150', '165', '180'].map(s => ({label: s, value: s, key: s}))}
              optionSelected={timeInSeconds}
              handleOptionSelected={this.handleTimeInSecondsSelected} />
          </View>}
      </WorkoutContext.Consumer>
    )
  }
}