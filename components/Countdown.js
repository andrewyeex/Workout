import React from 'react'
import { Text, View } from 'react-native'

class Countdown extends React.Component {
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
    } else
      clearInterval(interval)
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

export { Countdown }
