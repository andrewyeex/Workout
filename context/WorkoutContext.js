import React from 'react'
import { defaultData } from '../defaultData'
import { View, AsyncStorage } from 'react-native'
import * as Progress from 'react-native-progress'

export const WorkoutContext = React.createContext()

export class WorkoutProvider extends React.Component {
  state = {
    loading: true,
    workouts: [],
    activities: {},
    completed: {},
    error: []
  }

  componentDidMount() {
    this.initialize()
  }

  initialize = async () => {
    await AsyncStorage.multiGet(['workouts', 'activities', 'completed'], (err, stores) => {
      for (const [key, value] of stores) {
        if (!value) this.set(key)
        else this.setState({[key]: JSON.parse(value)})
      }
    })
    this.setState({loading: false})
  }

  set = async(key, value = defaultData.app[key]) => {
    try {
      const _value = await AsyncStorage.setItem(key, value.toString())
      if (_value) this.setState({[key]: _value})
    } catch(e) {
      this.setState(prevState => ({e: prevState.error.push(e)}))
    }
  }

  render(){
    if (this.state.loading)
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Progress.Circle size={120} indeterminate={true} borderWidth={5} />
        </View>
      )
    else
      console.log({state: this.state})
      return(
        <WorkoutContext.Provider value={{...this.state}}>
          {this.props.children}
        </WorkoutContext.Provider>
      )
  }
}
