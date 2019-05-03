import React, { Component } from 'react'
import { Text, TouchableOpacity} from 'react-native'
import Countdown from '../ui_components/Countdown'
import Activity from './Activity'

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

  handleIncrementWorkoutActivityIndex = () => this.setState(prevState => {
    const workoutActivityIndex = prevState.workoutActivityIndex+1
    return {
      workoutActivityIndex,
      progressCounter: this.workoutActivities[workoutActivityIndex] ? this.workoutActivities[workoutActivityIndex].duration : 0,
      progressTotal: this.workoutActivities[workoutActivityIndex] ? this.workoutActivities[workoutActivityIndex].duration : 0
    }
  })
  handleDecrementProgressCounter = () => this.state.progressCounter > 0 && this.setState(prevState => ({progressCounter: prevState.progressCounter-1}))
  handleToggleShowIntro = () => this.setState(prevState => ({showIntro: !prevState.showIntro}))

  render() {
    const {
      progressCounter,
      progressTotal,
      showIntro,
      workoutActivityIndex
    } = this.state

    const {
      activities,
      handleSelectedWorkout,
      handleEndActivity
    } = this.props

    const currentActivity = this.workoutActivities[workoutActivityIndex]
    currentActivity.name = activities[currentActivity.id].name.toUpperCase()

    if (showIntro)
      return <Countdown duration={1} onEnd={this.handleToggleShowIntro} />
    else
      return (currentActivity && progressTotal > 0) ?
        <Activity
          handleEndActivity={handleEndActivity}
          currentActivity={currentActivity}
          progress={progressCounter/progressTotal}
          handleIncrementWorkoutActivityIndex={this.handleIncrementWorkoutActivityIndex}
          handleDecrementProgressCounter={this.handleDecrementProgressCounter}
          workoutActivitiesLength={this.workoutActivitiesLength} /> :
        <TouchableOpacity onPress={handleSelectedWorkout({})}><Text>Congratulations, you finished!</Text></TouchableOpacity>
  }
}
