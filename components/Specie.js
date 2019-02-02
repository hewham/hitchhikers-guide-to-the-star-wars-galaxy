import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import renderDetailTile from './renderDetailTile';
import styles from '../styles/styles';



// Planet component, renders details about specie in small card

export default class Specie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  // Toggles specie detail modal
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render(){
    const state = this.state;
    const specie = this.props.specie;
    return(
      <React.Fragment>
        <View style={styles.planetCard}>
          <Text style={styles.planetName}>{specie.name}</Text>
          <Grid>
              <Col style={styles.detailCol}>
                {renderDetailTile('pets', '#663300', 'Class', specie.classification)}
              </Col>
              <Col style={styles.detailCol}>
                {renderDetailTile('language', '#808080', 'Language', specie.language)}
              </Col>
              <Col style={styles.detailCol}>
                {renderDetailTile('directions-walk', '#0099ff', 'Lifespan', specie.average_lifespan+" yrs")}
              </Col>
          </Grid>
          <Grid>
              <Col style={styles.detailCol}>
                {renderDetailTile('people', '#6600ff', 'Skin', specie.skin_colors)}
              </Col>
              <Col style={styles.detailCol}>
                {renderDetailTile('face', '#009933', 'Hair', specie.hair_colors)}
              </Col>
              <Col style={styles.detailCol}>
                {renderDetailTile('remove-red-eye', '#ff6600', 'Eye', specie.eye_colors)}
              </Col>
          </Grid>

          {/* <PlanetModal 
            visible={state.modalVisible} 
            specie={specie}
          /> */}

          {/* <Button
            title="View"
            color="#841584"
            onPress={() => {
              this.setModalVisible(true);
            }} /> */}

        </View>
      </ React.Fragment>
    )
  }
}