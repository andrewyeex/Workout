import React from 'react'
import { defaultData } from '../defaultData'
import { View, AsyncStorage } from 'react-native'
import * as Progress from 'react-native-progress'

export const WorkoutContext = React.createContext()

const APP_KEYS = ['workouts', 'activities', 'completed']

export class WorkoutProvider extends React.Component {
  state = {
    loading: true,
    workouts: [],
    activities: {},
    completed: {},
    error: []
  }

  componentDidMount = () => this.initialize()

  initialize = async () => {
    await AsyncStorage.multiGet(APP_KEYS, (err, stores) => {
      for (const [key, value] of stores) {
        if (!value) this.set(key)
        else this.setState({[key]: JSON.parse(value)})
      }
    })
    this.setState({loading: false})
  }

  reset = async () => {
    await AsyncStorage.multiSet([['workouts', ''], ['activities', ''], ['completed', '']], (err) => {
      console.log({err})
    })
  }

  get = async (key) => {
    try {
      await AsyncStorage.getItem(key, (error, value) => {
        if (!error) return value
        else this.setState(prevState => ({error: [...prevState.error, error]}))
      })
    } catch(error) {
      this.setState(prevState => ({error: [...prevState.error, error]}))
    }
  }

  set = async (key, v = defaultData.app[key]) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(v), (error) => {
        if (!error) this.setState({[key]: v})
        else this.setState(prevState => ({error: [...prevState.error, error]}))
      })
    } catch(error) {
      this.setState(prevState => ({error: [...prevState.error, error]}))
    }
  }

  render(){
    return this.state.loading ?
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Progress.Circle size={120} indeterminate={true} borderWidth={5} />
      </View> :
      <WorkoutContext.Provider value={this.state}>
        {this.props.children}
      </WorkoutContext.Provider>
  }
}
