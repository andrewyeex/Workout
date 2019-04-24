import React from 'react'
import { Text, View } from 'react-native'
import * as Progress from 'react-native-progress'

import { Countdown } from './Countdown'

const Activity = ({
  activities,
  workoutActivities,
  workoutActivityIndex,
  workoutActivitiesLength,
  handleIncrementWorkoutActivityIndex,
  handleDecrementProgressCounter,
  progressCounter,
  progressTotal
}) => {
  if (workoutActivities[workoutActivityIndex]) {
    const { id, duration, order } = workoutActivities[workoutActivityIndex]
    const { name } = activities[id]
    return (
      <View style={{flex: 1}}>
        <View style={{flexGrow: .25, flexDirection: 'row', padding: 5}}>
          <Text style={{flex: 1}}>{workoutActivityIndex + 1} of {workoutActivitiesLength}</Text>
          <Text style={{flex: 1, textAlign: 'right'}}>END</Text>
        </View>
        <View style={{flexGrow: .5, alignItems: 'center'}}>
          <Text style={{fontSize: 40, fontWeight: '600'}}>
            {name.toUpperCase()}
          </Text>
        </View>
        <View style={{flexGrow: 1, alignItems: 'center'}}>
          <Countdown key={order} duration={duration} intervalCallback={handleDecrementProgressCounter} onEnd={handleIncrementWorkoutActivityIndex}/>
        </View>
        <View style={{flexGrow: 3, alignItems: 'center', justifyContent: 'center'}}>
          <Progress.Pie key={order} size={300} progress={progressCounter/progressTotal}/>
        </View>
        <View style={{flexGrow: .25}}>
          <Text>BOTTOM</Text>
        </View>
      </View>
    )
  } else {
    return (<View></View>)
  }
}

export { Activity }
