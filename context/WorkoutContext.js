import React from 'react'
import { defaultData } from '../defaultData'
import { View, AsyncStorage } from 'react-native'
import * as Progress from 'react-native-progress'

export const WorkoutContext = React.createContext()

const APP_KEYS = ['workouts', 'activities', 'completed']
const APP_RESET = [['workouts', ''], ['activities', ''], ['completed', '']]
const UUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (new Date().getTime() + Math.random() * 16) % 16 | 0
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

export class WorkoutProvider extends React.Component {
  state = {
    loading: true,
    workouts: [],
    activities: {},
    completed: {},
    error: [],
    activitiesOptions: []
  }

  componentDidMount = () => this.initialize()

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.activities !== this.state.activities) {
      this.setState(prevState => ({
        activitiesOptions: Object.entries(prevState.activities).map(([key, {name: label}]) => ({label, value: {key, label}, key}))
      }))
    }
  }

  reset = async () => await AsyncStorage.multiSet(APP_RESET, (err) => { })

  handleError = error => this.setState(prevState => ({error: [...prevState.error, error]}), console.log({error}))

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
      await AsyncStorage.getItem(key, (error, value) => {
        if (!error) return value
        else this.handleError(error)
      })
    } catch(error) { this.handleError(error) }
  }

  set = async (key, v = defaultData.app[key]) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(v), (error) => {
        if (!error) this.setState({[key]: v})
        else this.handleError(error)
      })
    } catch(error) { this.handleError(error) }
  }

  append = ({key, content: toAppend, callback}) => async () => {
    try {
      await AsyncStorage.getItem(key, (error, value) => {
        if (!error) {
          value = JSON.parse(value)
          toAppend.id = UUID()
          let { activities, id } = toAppend
          if (key === 'workouts') {
            toAppend.activities = [...activities].map(({activitySelected : {key : id}, timeInSeconds : duration}, order) => ({ id, order: order+1, duration: +duration }))
            value = value.concat(toAppend)
          } else {
            value[id] = toAppend
          }
          this.set(key, value)
        }
        else this.handleError(error)
      })
    } catch(error) { this.handleError(error) }
    typeof callback === 'function' && callback()
  }

  render(){
    return this.state.loading ?
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Progress.Circle size={120} indeterminate={true} borderWidth={5} />
      </View> :
      <WorkoutContext.Provider value={{...this.state, append: this.append}}>
        {this.props.children}
      </WorkoutContext.Provider>
  }
}
