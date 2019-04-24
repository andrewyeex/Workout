import React from 'react'
import { defaultData } from '../defaultData'

export const WorkoutContext = React.createContext()

export class WorkoutProvider extends React.Component {
  state = defaultData

  set(key, value) {
    this.setState(prevState => {
      const nextState = {...prevState}
      nextState[key] = value
      return ({ nextState })
    })
  }

  get(key) { return this.state[key] }

  render(){
    return(
      <WorkoutContext.Provider value={{...this.state, set: this.set, get: this.get}}>
        {this.props.children}
      </WorkoutContext.Provider>
    )
  }
}
