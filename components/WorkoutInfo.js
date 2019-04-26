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
        <View style={{height: 20, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#555', marginBottom: 12}}>
          <Text style={{flex: 1, fontWeight: '100', color: '#555'}}>#</Text>
          <Text style={{flex: 4, fontWeight: '100', color: '#555'}}>Activities</Text>
          <Text style={{flex: 1, fontWeight: '100', color: '#555'}}>Sec</Text>
        </View>
        {selectedWorkoutActivities.map(
          ({order, duration, id}) =>
            <View key={order} style={{height: 20, flexDirection: 'row'}}>
              <Text style={{flex: 1, fontWeight: '100', color: '#555'}}>{order}.</Text>
              <Text style={{flex: 4, fontWeight: '100', color: '#555'}}>{activities[id].name}</Text>
              <Text style={{flex: 1, fontWeight: '100', color: '#555'}}>{duration}s</Text>
            </View>
        )}
      </TextList>
    </View>
    <View style={{padding: 20, flex: 1}}>
      <Button text={'Begin'} callback={handleBeginWorkout} />
    </View>
  </View>
)

export default WorkoutInfo
