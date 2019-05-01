import React from 'react'
import { StyleSheet, View } from 'react-native'
import * as Progress from 'react-native-progress'

import TextRowLinks from '../ui_components/TextRowLinks'
import TextHeader from '../ui_components/TextHeader'
import Countdown from '../ui_components/Countdown'

const Activity = ({
  handleEndActivity,
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
      <View style={styles.container}>
        <TextRowLinks
          leftText={`${workoutActivityIndex + 1} of ${workoutActivitiesLength}`}
          rightText={'END'}
          rightTextCallback={handleEndActivity} />
        <TextHeader text={name.toUpperCase()} />
        <View style={styles.countdownContainer}>
          <Countdown key={order} duration={duration} intervalCallback={handleDecrementProgressCounter} onEnd={handleIncrementWorkoutActivityIndex}/>
        </View>
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
          <Progress.Pie key={order} size={300} progress={progressCounter/progressTotal}/>
        </View>
      </View>
    )
  } else {
    return (<View></View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  countdownContainer: {
    alignItems: 'center',
    height: 100,
  }
})

export default Activity
