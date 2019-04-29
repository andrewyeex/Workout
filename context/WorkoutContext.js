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

const obj = {
  "activities":  [
    {
      "activitySelected":  {
        "key": "12sdgfna83",
        "label": "Break",
      },
      "timeInSeconds": "15",
    },
    {
      "activitySelected":  {
        "key": "d8f23nf78a",
        "label": "Push Up",
      },
      "timeInSeconds": "45",
    },
    {
      "activitySelected":  {
        "key": "d8f23nf78a",
        "label": "Push Up",
      },
      "timeInSeconds": "30",
    },
  ],
  "description": "Testing",
  "duration": 90,
  "id": "",
  "image": "file:///var/mobile/Containers/Data/Application/AA0EFA33-3C9F-4EEE-8F01-21930B428363/Library/Caches/ExponentExperienceData/%2540anonymous%252Fworkout-fc9938e4-7bef-4534-a89f-a94f7122bff9/ImagePicker/4B1AD950-BB5B-4FA1-BEB0-31BD620CD3B7.jpg",
  "name": "Dummy",
}


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

  reset = async () => await AsyncStorage.multiSet(APP_RESET, (err) => { })

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

  append = key => toAppend => async () => {
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
          console.log({key, value})
          this.set(key, value)
        }
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
      <WorkoutContext.Provider value={{...this.state, append: this.append}}>
        {this.props.children}
      </WorkoutContext.Provider>
  }
}
