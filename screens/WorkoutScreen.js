import React, { Component } from 'react'
import { View, ScrollView} from 'react-native'

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
  static navigationOptions = ({ navigation }) => {
    let headerLeft
    const { state : { params = {} } } = navigation
    if (params.showBack && typeof params.backFn === 'function')
      headerLeft = <BackArrow onPress={params.backFn} />
    return {
      title: 'Workout',
      headerLeft
    }
  }

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
      setParams({ showBack: true, backFn: this.handleSelectedWorkout({}) })
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

  renderWorkoutMenu = () => (
    <ScrollView style={{flex: 1}}>
      <WorkoutContext.Consumer>
        {({ workouts }) => (
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
                handleSelectedWorkout: this.handleSelectedWorkout
              })} /> )))}
      </WorkoutContext.Consumer>
    </ScrollView>
  )

  renderWorkout = () => (
    <WorkoutContext.Consumer>
      {({ activities }) =>
      this.state.begin ?
      <WorkoutInterval
        activities={activities}
        handleEndActivity={this.handleEndActivity}
        selectedWorkout={this.state.selectedWorkout}
        handleSelectedWorkout={this.handleSelectedWorkout} /> :
      <WorkoutInfo
        activities={activities}
        selectedWorkout={this.state.selectedWorkout}
        handleBeginWorkout={this.handleBeginWorkout} /> }
    </WorkoutContext.Consumer>
  )

  render() {
    return (
      <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'column'}}>
        {this.state.hasWorkoutSelected ? this.renderWorkout() : this.renderWorkoutMenu()}
      </View>
    )
  }
}
