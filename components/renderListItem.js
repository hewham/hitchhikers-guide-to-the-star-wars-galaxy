import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements'
import listStyles from '../styles/listStyles';


// Funtion to return very simple list item used in planet modal

export default function renderListItem(icon, iconColor, title, detail){
  return(
    <React.Fragment key={title}>
      <View style={listStyles.listDetailContainer}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Icon class={listStyles.listDetailIcon}
          name={icon}
          color={iconColor} />
        <Text style={listStyles.listDetailTitle}> {title} </Text>
        <Text style={listStyles.listDetailText}> {detail} </Text>
        </View>
      </View>
    </React.Fragment>
  )
}
