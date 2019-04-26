import React from 'react'
import { View, TouchableOpacity, Text, ScrollView} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import TextSubHeader from '../ui_components/TextSubHeader'
import TextList from '../ui_components/TextList'

const CreateAddActivityList = ({
  addActivitiesCollection,
  handleRemoveActivities,
  handleToggleIsAddActivitiesModalVisible
}) => (
  <View style={{ padding: 20, marginTop: 10 }}>
    <TouchableOpacity
      onPress={handleToggleIsAddActivitiesModalVisible}
      style={{
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000',
        height: 50 }}>
      <Ionicons name='ios-add-circle-outline' size={24} color={'#fff'} />
      <TextSubHeader text='Add Activities' fontStyle={{color: '#fff'}} />
    </TouchableOpacity>
    {!!addActivitiesCollection.length &&
      <ScrollView>
        <TextList>
          {addActivitiesCollection.map(({
            activitySelected,
            timeInSeconds
          }, i) => (
            <View key={i} style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{flex: 1 }} onPress={handleRemoveActivities(i)}>
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
