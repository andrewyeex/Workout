import React, { Component } from 'react'
import { ImageBackground, Text, View, Image} from 'react-native'

export class WorkoutCard extends React.PureComponent {
  render() {
    const {
      name,
      description,
      image
    } = this.props
    return (
      <View style={{flexBasis: '50%', padding: 10 }}>
        <ImageBackground source={image} style={{height: 150, marginBottom: 10}} imageStyle={{borderRadius: 10}} />
        <View style={{flexWrap:'wrap', paddingHorizontal: 5}}>
          <Text style={{marginBottom: 5, fontWeight: '600'}}>{name}</Text>
          <Text style={{fontWeight: '100'}}>{description}</Text>
        </View>
    </View>
    )
  }
}

export default WorkoutCard
