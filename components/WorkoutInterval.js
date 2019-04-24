import React, { Component } from 'react'
import { Text } from 'react-native'
import { Countdown } from './Countdown'
import { Activity } from './Activity'

export default class WorkoutInterval extends Component {
  state = {
    workoutActivityIndex: 0,
    showIntro: true,
    progressCounter: 0,
    progressTotal: 0
  }
  workoutActivities  = this.props.selectedWorkout.activities
  workoutActivitiesLength  = this.workoutActivities.length

  componentDidMount() {
    const { workoutActivityIndex } = this.state
    this.setState({
      progressCounter: this.workoutActivities[workoutActivityIndex].duration,
      progressTotal: this.workoutActivities[workoutActivityIndex].duration
    })
  }

  handleIncrementWorkoutActivityIndex = () => this.setState(prevState => ({workoutActivityIndex: prevState.workoutActivityIndex+1}))
  handleDecrementProgressCounter = () => this.state.progressCounter > 0 && this.setState(prevState => ({progressCounter: prevState.progressCounter-1}))
  handleToggleShowIntro = () => this.setState(prevState => ({showIntro: !prevState.showIntro}))

  render() {
    const {
      progressCounter,
      progressTotal,
      showIntro,
      workoutActivityIndex
    } = this.state
    
    const { activities } = this.props

    if (showIntro)
      return <Countdown duration={1} onEnd={this.handleToggleShowIntro} />
    else
      if (progressTotal > 0)
        return <Activity
          activities={activities}
          workoutActivities={this.workoutActivities}
          workoutActivityIndex={workoutActivityIndex}
          progressCounter={progressCounter}
          progressTotal={progressTotal}
          handleIncrementWorkoutActivityIndex={this.handleIncrementWorkoutActivityIndex}
          handleDecrementProgressCounter={this.handleDecrementProgressCounter}
          workoutActivitiesLength={this.workoutActivitiesLength} />
      else
        return <Text>Nothing Here</Text>
  }
}
