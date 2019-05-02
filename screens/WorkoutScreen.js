import React, { Component } from 'react'
import { View } from 'react-native'

import BackArrow from '../ui_components/BackArrow'
import WorkoutCard from '../components/WorkoutCard'
import WorkoutInterval from '../components/WorkoutInterval'
import WorkoutInfo from '../components/WorkoutInfo'
import { WorkoutContext } from '../context/WorkoutContext'

const imageMapper = {
  run1:  require('../assets/images/run1.jpg'),
  run2:  require('../assets/images/run2.jpg'),
  run3:  require('../assets/images/run3.jpg'),
  run4:  require('../assets/images/run4.jpg'),
  run5:  require('../assets/images/run5.jpg'),
  run6:  require('../assets/images/run6.jpg'),
  lift1: require('../assets/images/lift1.jpg'),
  lift2: require('../assets/images/lift2.jpg'),
  lift3: require('../assets/images/lift3.jpg'),
  lift4: require('../assets/images/lift4.jpg'),
  lift5: require('../assets/images/lift5.jpg'),
  lift6: require('../assets/images/lift6.jpg')
}

export default class WorkoutScreen extends Component {
  static navigationOptions = ({ state : { params = {} } }) => ({
    title: 'Workout',
    headerLeft : (params.showBack && typeof params.backFn === 'function') ?
                  <BackArrow onPress={params.backFn} /> : undefined
  })

  state = {
    selectedWorkout: {},
    hasWorkoutSelected: false,
    begin: false
  }

  componentDidMount = () => {
    this.props.navigation.setParams({ showBack: false, backFn: null })
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { setParams } = this.props.navigation
    if (!prevState.hasWorkoutSelected && this.state.hasWorkoutSelected )
      setParams({ showBack: true, backFn: this.handleEndActivity })
    if (prevState.hasWorkoutSelected && !this.state.hasWorkoutSelected)
      setParams({ showBack: false, backFn: null })
  }

  handleBeginWorkout = begin => this.setState({ begin })

  handleSelectedWorkout = selectedWorkout => () => this.setState({
    selectedWorkout,
    hasWorkoutSelected: Object.keys(selectedWorkout).length > 0
  })

  handleEndActivity = () => this.setState({
    begin: false,
    selectedWorkout: {},
    hasWorkoutSelected: false
  })

  render() {
    const {
      begin,
      selectedWorkout,
      hasWorkoutSelected,
    } = this.state

    return (
      <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'column'}}>
        <WorkoutContext.Consumer>
          {({ workouts, activities }) => {
            if (hasWorkoutSelected)
              return (
                workouts.map(({
                  id,
                  name,
                  image,
                  description,
                  activities
                }) => (
                  <WorkoutCard
                    key={id}
                    image={image.length < 6 ? imageMapper[image] : {uri: image}}
                    name={name}
                    description={description}
                    activities={activities}
                    handleSelectedWorkout={this.handleSelectedWorkout({
                      name,
                      description,
                      activities,
                      handleSelectedWorkout: this.handleSelectedWorkout })}/>)))
            else
              return (
                begin ?
                  <WorkoutInterval
                    activities={activities}
                    handleEndActivity={this.handleEndActivity}
                    selectedWorkout={selectedWorkout}
                    handleSelectedWorkout={this.handleSelectedWorkout} /> :
                  <WorkoutInfo
                    activities={activities}
                    selectedWorkout={selectedWorkout}
                    handleBeginWorkout={this.handleBeginWorkout} />)}}
        </WorkoutContext.Consumer>
      </View>
    )
  }
}
