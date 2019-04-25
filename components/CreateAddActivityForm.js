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
    return(
      <WorkoutContext.Consumer>
        {({ activities }) =>
          <View style={{marginTop: 85, flex: 1, borderTopWidth: 1, borderTopColor: '#ccc'}}>
            <TextRowLinks
              leftText={'Cancel'}
              leftTextCallback={this.props.cancel}
              rightText={'Add'}
              rightTextCallback={this.props.add} />
              <Select
                placeholder={'Select an activity'}
                options={Object.entries(activities).map(([key, {name: value}]) => ({label: value, value, key}))}
                optionSelected={this.state.activitySelected}
                handleOptionSelected={this.handleActivitySelected}
              />
              <Select
                placeholder={'Select a time in seconds'}
                options={
                  ['15', '30', '45', '60',
                    '75', '90', '105', '120',
                    '135', '150', '165', '180'].map(s => ({label: s, value: s, key: s}))}
                optionSelected={this.state.timeInSeconds}
                handleOptionSelected={this.handleTimeInSecondsSelected}
              />
          </View>}
      </WorkoutContext.Consumer>
    )
  }
}