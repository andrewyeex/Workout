import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import * as Progress from 'react-native-progress'

export class WorkoutInterval extends Component {
  state = {
    activityIndex: 0,
    activity: [],
    showIntro: true,
    progressCounter: 0,
    progressTotal: 0
  }
  activityLength  = this.props.selectedWorkout.activities.length
  /**
   * MOVE THIS LOGIC TO CHILD
   */
  // componentDidMount() {
  //   const {activities : MainActivities, selectedWorkout: {activities}} = this.props
  //   this.setState(prevState => {
  //     const activity = MainActivities[activities[this.state.selected].id]
  //     activity.duration = activities[this.state.selected].duration
  //     return { activity }
  //   })
  // }

  // handleIncrementSelected = () => {
  //   const {activities : MainActivities, selectedWorkout: {activities}} = this.props
  //   this.setState(prevState => {
  //     const activity = MainActivities[activities[prevState.selected].id]
  //     activity.duration = activities[prevState.selected].duration
  //     return { activity }
  //   })
  // }
  handleSelectedWorkout() { }
  handleToggleShowIntro = () => this.setState(prevState => ({showIntro: !prevState.showIntro}))
  render() {
    const {
      selected,
      activity,
      showIntro
    } = this.state
    const {
      activities
    } = this.props
    if (showIntro)
      return <CountdownScreen duration={1} onEnd={this.handleToggleShowIntro} />
    if (activity)
      return <ActivityScreen
        selected={selected}
        activities
        activityLength={this.activityLength}
        handleIncrementSelected={this.handleIncrementSelected}/>
  }
}

class CountdownScreen extends Component {
  interval = null
  state = { counter: this.props.duration }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.counter === 0) {
      clearInterval(this.interval)
      typeof this.props.onEnd === 'function' && this.props.onEnd()
    }
  }

  componentDidMount() {
    if (!this.interval) {
      this.interval = setInterval(()=>{
        typeof this.props.intervalCallback === 'function' && this.props.intervalCallback()
        this.setState(prevState=>({
          counter: prevState.counter-1
        }))
      }, 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render(){
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 40}}>{this.state.counter}</Text>
      </View>
    )
  }
}

class ActivityScreen extends Component {
  // state = {
  //   counter: this.props.duration,
  //   total: this.props.duration
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.selected !== this.props.selected)
  //     this.setState({
  //       counter: this.props.duration,
  //       total: this.props.duration
  //     })
  //   if (this.state.counter === 0)
  //     this.props.handleIncrementSelected()
  // }

  // handleDecrementCounter = () => this.setState(prevState => ({counter: prevState.counter-1}))

  render(){
    const {
      name,
      selected,
      activityLength,
      duration,
      handleIncrementSelected
    } = this.props
    const {
      counter,
      total
    } = this.state
    return(
      <View style={{flex: 1}}>
        <View style={{flexGrow: .25, flexDirection: 'row', padding: 5}}>{/* TOP ROW */}
          <Text style={{flex: 1}}>{selected + 1} of {activityLength}</Text>
          <Text style={{flex: 1, textAlign: 'right'}}>END</Text>
        </View>
        <View style={{flexGrow: .5, alignItems: 'center'}}>{/* ACTIVITY HEADER */}
          <Text style={{fontSize: 40, fontWeight: '600'}}>
            {name.toUpperCase()}
          </Text>
        </View>
        <View style={{flexGrow: 1, alignItems: 'center'}}>{/* ACTIVITY TIMER */}
          <CountdownScreen duration={duration} intervalCallback={this.handleDecrementCounter}/>
        </View>
        <View style={{flexGrow: 3, alignItems: 'center', justifyContent: 'center'}}>{/* ACTIVITY PROGRESS */}
          <Progress.Pie size={300} progress={counter/total}/>
        </View>
        <View style={{flexGrow: .25}}>{/* BOTTOM ROW */}
          <Text>BOTTOM</Text>
        </View>
      </View>
    )
  }
}

export default WorkoutInterval
