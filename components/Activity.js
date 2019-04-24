import React from 'react'
import { Text, View } from 'react-native'
import * as Progress from 'react-native-progress'

import TextRowLinks from '../ui_components/TextRowLinks'
import TextHeader from '../ui_components/TextHeader'
import Countdown from '../ui_components/Countdown'

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
    let nextName, nextID
    const { id, duration, order } = workoutActivities[workoutActivityIndex]
    const { name } = activities[id]
    if (workoutActivities[workoutActivityIndex+1]) {
      nextID = workoutActivities[workoutActivityIndex+1].id
      nextName = activities[nextID].name
    }
    return (
      <View style={{flex: 1}}>
        <TextRowLinks
          leftText={`${workoutActivityIndex + 1} of ${workoutActivitiesLength}`}
          rightText={'END'}/>
        <TextHeader text={name.toUpperCase()} />
        <View style={{flexGrow: 1, alignItems: 'center'}}>
          <Countdown key={order} duration={duration} intervalCallback={handleDecrementProgressCounter} onEnd={handleIncrementWorkoutActivityIndex}/>
        </View>
        <View style={{flexGrow: 3, alignItems: 'center', justifyContent: 'center'}}>
          <Progress.Pie key={order} size={300} progress={progressCounter/progressTotal}/>
        </View>
        {nextName && <TextRowLinks rightText={nextName}/>}
      </View>
    )
  } else {
    return (<View></View>)
  }
}

export default Activity
