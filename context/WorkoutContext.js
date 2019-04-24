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

  get = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value) return value
      else this.setState(prevState => ({
        e: prevState.error.push({error: `error getItem() key: ${key}`})
      }))
    } catch(e) {
      this.setState(prevState => ({e: prevState.error.push(e)}))
    }
  }

  set = async (key, value = defaultData.app[key]) => {
    try {
      const value = await AsyncStorage.setItem(key, value.toString())
      if (value) this.setState({[key]: value})
      else this.setState(prevState => ({
        e: prevState.error.push({error: `error setItem() key: ${key}, value: ${value.toString()}`})
      }))
    } catch(e) {
      this.setState(prevState => ({e: prevState.error.push(e)}))
    }
  }

  render(){
    return this.state.loading ?
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Progress.Circle size={120} indeterminate={true} borderWidth={5} />
      </View> :
      <WorkoutContext.Provider value={{...this.state}}>
        {this.props.children}
      </WorkoutContext.Provider>
  }
}
