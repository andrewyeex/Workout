import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

export const WorkoutContext = React.createContext()

class WorkoutProvider extends React.Component {
  state = demoAppObj

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
      <WorkoutContext.Provider value={this.state}>
        {this.props.children}
      </WorkoutContext.Provider>
    )
  }
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <WorkoutProvider>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator app={demoAppObj} />
          </View>
        </WorkoutProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const demoAppObj = {
  "app": {
    "workouts": [
      {
        "id": "gk39a8sf345",
        "name": "Absolute Power",
        "description": "Crazy muscle building exercises",
        "activities": [
          {
            "order": 1,
            "duration": 30,
            "id": "12sdgfna83"
          },
          {
            "order": 2,
            "duration": 30,
            "id": "12sdgfna83"
          }
        ]
      },
      {
        "id": "d8f23nf78a",
        "name": "Absolute Cardio",
        "description": "Crazy running sweat",
        "activities": [
          {
            "order": 1,
            "duration": 30,
            "id": "m39s8dg134"
          },
          {
            "order": 2,
            "duration": 30,
            "id": "m39s8dg134"
          }
        ]
      }
    ],
    "activities": [
      {
        "id": "12sdgfna83",
        "name": "break",
        "description": "relax and recover",
        "youtube": "https://www.youtube.com/watch?v=n9e7esJj6Hw"
      },
      {
        "id": "d8f23nf78a",
        "name": "Push Up",
        "description": "Basic Push Up exercises",
        "youtube": "https://www.youtube.com/watch?v=IODxDxX7oi4"
      }
    ],
    "completed": [
      {
        "workout_id": "gk39a8sf345",
        "datetime": 123456778,
        "completed": false,
        "last_order": 1
      }
    ],
    "username": "yeexay",
    "email": "andrew.yee@mail.com"
  }
}
