import React, {PureComponent} from 'react'
import {View, StyleSheet} from 'react-native'
import {WorkoutContext} from '../context/WorkoutContext'
import Select from '../ui_components/Select'
import TextRowLinks from '../ui_components/TextRowLinks'

export default class CreateAddActivityForm extends PureComponent {
  state = {
    activitySelected: '',
    timeInSeconds: ''
  }

  secondOptions = [
    '15',
    '30',
    '45',
    '60',
    '75',
    '90',
    '105',
    '120',
    '135',
    '150',
    '165',
    '180'
  ].map(s => ({label: s, value: s, key: s}))

  _setState = state => value => () => this.setState({[state]: value})

  render() {
    const {_setState} = this
    const {closeModal, addActivity} = this.props
    const {activitySelected, timeInSeconds} = this.state
    return (
      <View style={styles.container}>
        <TextRowLinks
          isButton={true}
          leftText={'Cancel'}
          leftTextCallback={closeModal}
          rightText={'Add'}
          rightTextCallback={addActivity(this.state)}
        />

        <WorkoutContext.Consumer>
          {({activitiesOptions}) => (
            <Select
              placeholder={'Select an activity'}
              options={activitiesOptions}
              optionSelected={activitySelected}
              handleOptionSelected={_setState('activitySelected')}
            />
          )}
        </WorkoutContext.Consumer>

        <Select
          placeholder={'Select a time in seconds'}
          options={this.secondOptions}
          optionSelected={timeInSeconds}
          handleOptionSelected={_setState('timeInSeconds')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 85,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#ccc'
  }
})
