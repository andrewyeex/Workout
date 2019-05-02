import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import TextHeader from '../ui_components/TextHeader'
import TextSubHeader from '../ui_components/TextSubHeader'
import TextList from '../ui_components/TextList'
import Button from '../ui_components/Button'


const WorkoutInfo = ({
  activities,
  selectedWorkout : {
    name,
    description,
    activities: _act
  },
  handleBeginWorkout
}) => (
  <View style={styles.container}>
    <TextHeader text={name} />
    <TextSubHeader text={description} />
    <View style={styles.containerMid}>
      <TextList>
        <TextListRow row={['#','Activities','Sec']} />
        {_act.map(({order, duration, id}) => <TextListRow key={order} row={[order, activities[id].name, duration+'s']} />)}
      </TextList>
    </View>
    <View style={styles.containerBot}>
      <Button text={'Begin'} callback={handleBeginWorkout} />
    </View>
  </View>
)

class TextListRow extends PureComponent {
  render(){
    const { row : [a, b, c] } = this.props
    return(
      <View style={styles.textListRow}>
        <Text style={styles.textList1}>{a}</Text>
        <Text style={styles.textList2}>{b}</Text>
        <Text style={styles.textList1}>{c}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  containerMid: {
    flex: 4,
    padding: 40
  },
  containerBot : {
    padding: 10,
    flex: 1
  },
  textList1: {
    flex: 1,
    fontWeight: '100',
    color: '#555'
  },
  textList2: {
    flex: 4,
    fontWeight: '100',
    color: '#555'
  },
  textListRow: {
    height: 20,
    flexDirection: 'row'
  }
})

export default WorkoutInfo
