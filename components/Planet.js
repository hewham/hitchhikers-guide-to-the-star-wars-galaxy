import React from 'react';
import {
  Text,
  Button,
  View
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import renderDetailTile from './renderDetailTile';
import PlanetModal from '../components/PlanetModal';
import styles from '../styles/styles';



// Planet component, renders details about planet in small card

export default class Planet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  // Toggles planet detail modal
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render(){
    const state = this.state;
    const planet = this.props.planet;
    return(
      <React.Fragment>
        <View style={styles.planetCard}>
          <Text style={styles.planetName}>{planet.name}</Text>
          <Grid>
              <Col style={styles.detailCol}>
                {renderDetailTile('terrain', '#663300', 'Terrain', planet.terrain)}
              </Col>
              <Col style={styles.detailCol}>
                {renderDetailTile('cloud', '#808080', 'Climate', planet.climate)}
              </Col>
              <Col style={styles.detailCol}>
                {renderDetailTile('pool', '#0099ff', 'Surface Water', planet.surface_water)}
              </Col>
          </Grid>
          <Grid>
              <Col style={styles.detailCol}>
                {renderDetailTile('people', '#6600ff', 'Population', planet.population)}
              </Col>
              <Col style={styles.detailCol}>
                {renderDetailTile('mood', '#009933', 'Characters', planet.residents.length)}
              </Col>
              <Col style={styles.detailCol}>
                {renderDetailTile('donut-small', '#ff6600', 'Diameter', String(planet.diameter+" KM"))}
              </Col>
          </Grid>

          <PlanetModal 
            visible={state.modalVisible} 
            planet={planet}
          />

          <Button
            title="View"
            color="#841584"
            onPress={() => {
              this.setModalVisible(true);
            }} />

        </View>
      </ React.Fragment>
    )
  }
}