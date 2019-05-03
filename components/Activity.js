import React from 'react'
import { StyleSheet, View } from 'react-native'
import * as Progress from 'react-native-progress'

import TextHeader from '../ui_components/TextHeader'
import Countdown from '../ui_components/Countdown'

const Activity = ({
  currentActivity: {
    name,
    duration,
    order
  },
  handleIncrementWorkoutActivityIndex,
  handleDecrementProgressCounter,
  progress
}) => (
  <View style={styles.container}>
    <TextHeader text={name} />
    <View style={styles.countdownContainer}>
      <Countdown
        key={order}
        duration={duration}
        intervalCallback={handleDecrementProgressCounter}
        onEnd={handleIncrementWorkoutActivityIndex} />
    </View>
    <View style={styles.pieContainer}>
      <Progress.Pie
        key={order}
        size={300}
        progress={progress}/>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  countdownContainer: {
    alignItems: 'center',
    height: 100,
  },
  pieContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Activity
