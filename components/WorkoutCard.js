import React from 'react'
import {ImageBackground, Text, View, TouchableOpacity} from 'react-native'

const WorkoutCard = ({name, description, image, handleSelectedWorkout}) => (
  <TouchableOpacity
    style={{marginBottom: 10, padding: 10}}
    onPress={handleSelectedWorkout}
  >
    <ImageBackground
      source={image}
      style={{height: 150, marginBottom: 10}}
      imageStyle={{borderRadius: 10}}
    />
    {name && description && (
      <View style={{flexWrap: 'wrap', paddingHorizontal: 5}}>
        <Text style={{marginBottom: 5, fontWeight: '600'}}>{name}</Text>
        <Text style={{fontWeight: '100'}}>{description}</Text>
      </View>
    )}
  </TouchableOpacity>
)

export default WorkoutCard
