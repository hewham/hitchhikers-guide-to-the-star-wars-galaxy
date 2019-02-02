import React from 'react';
import {
  Text,
} from 'react-native';
import { Icon } from 'react-native-elements'
import styles from '../styles/styles';


// Funtion to return very simple detail tile used in cards for planets and species

export default function detailTile(icon, iconColor, title, detail){
  return(
    <React.Fragment>
      <Icon
        name={icon}
        color={iconColor} />
      <Text style={styles.detailTitle}>{title}</Text>
      <Text style={styles.detailText}>{detail}</Text>
    </React.Fragment>
  )
}
