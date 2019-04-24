import React from 'react'
import { View, Text } from 'react-native'

import TextRowLinks from '../ui_components/TextRowLinks'
import TextHeader from '../ui_components/TextHeader'
import TextSubHeader from '../ui_components/TextSubHeader'
import TextList from '../ui_components/TextList'
import Button from '../ui_components/Button'

const WorkoutInfo = ({
  activities,
  selectedWorkout : {
    name,
    description,
    activities: selectedWorkoutActivities,
    handleSelectedWorkout
  },
  handleBeginWorkout
}) => (
  <View style={{flex: 1}}>
    <TextRowLinks leftText={'Back'} leftTextCallback={()=>handleSelectedWorkout({})} />
    <TextHeader text={name} />
    <TextSubHeader text={description} />
    <View style={{flex: 4, padding: 40}}>
      <TextList>
        {selectedWorkoutActivities.map(
          ({order, duration, id}) =>
            <Text key={order}>{order}. {activities[id].name} {duration}s</Text>
        )}
      </TextList>
    </View>
    <View style={{padding: 10, flex: 1}}>
      <Button text={'Begin'} callback={handleBeginWorkout} />
    </View>
  </View>
)

export default WorkoutInfo
