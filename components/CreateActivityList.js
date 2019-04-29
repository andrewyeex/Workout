import React, {PureComponent} from 'react'
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import TextList from '../ui_components/TextList'

const CreateAddActivityList = ({ activities, removeActivity }) => (
  <View style={styles.container}>
    {!!activities.length && <ScrollView style={styles.scrollViewContainer}>

      <TextList>
        {activities.map(({ activitySelected: {label}, timeInSeconds : duration }, i) =>
          <Row
            i={i}
            key={i}
            onPress={removeActivity}
            label={label}
            duration={duration}/>)}
      </TextList>

    </ScrollView>}
  </View>
)

class Row extends PureComponent {
  render(){
    const { label, duration, onPress, i } = this.props
    return (
      <View style={styles.listContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={onPress(i)}>
          <Ionicons name='ios-remove-circle' size={24} />
        </TouchableOpacity>
        <Text style={styles.text} >{label}</Text>
        <Text style={styles.text}>{duration} sec</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    lineHeight: 24,
    paddingLeft: 10
  },
  container: {
    padding: 20,
    marginTop: 10
  },
  listContainer: { flexDirection: 'row' },
  scrollViewContainer: { height: 100 },
  iconContainer: {flex: 1 }
})

export default CreateAddActivityList
