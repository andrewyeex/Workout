import React from 'react'
import { View, TouchableOpacity, Text, ScrollView} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import TextSubHeader from '../ui_components/TextSubHeader'
import TextList from '../ui_components/TextList'

const CreateAddActivityList = ({
  activities,
  removeActivity,
  openModal
}) => (
  <View style={{ padding: 20, marginTop: 10 }}>
    {!!activities.length &&
      <ScrollView style={{height: 100}}>
        <TextList>
          {activities.map(({
            activitySelected,
            timeInSeconds
          }, i) => (
            <View key={i} style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{flex: 1 }} onPress={removeActivity(i)}>
                <Ionicons name='ios-remove-circle' size={24} />
              </TouchableOpacity>
              <Text style={{flex: 1, lineHeight: 24, paddingLeft: 10}} >{activitySelected.label}</Text>
              <Text style={{flex: 1, lineHeight: 24, paddingLeft: 10}}>{timeInSeconds} sec</Text>
            </View>
          ))}
        </TextList>
      </ScrollView>}
  </View>
)

export default CreateAddActivityList
