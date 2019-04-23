import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { WorkoutContext } from '../context/workout'

export default class WorkoutScreen extends Component {
  static navigationOptions = {
    title: 'Workout',
  };

  render() {
    return (
      <View>
        <WorkoutContext.Consumer>
          {
            ({app: { workouts }}) => {
              return workouts.map(({
                id,
                name,
                description,
                activities
              }) => 
                <ScrollView key={id}>
                  <Text>{name}</Text>
                  <Text>{description}</Text>
                  <Text>{activities.toString()}</Text>
                </ScrollView>
              )
            }
          }
        </WorkoutContext.Consumer>
      </View>
    )
  }
}

