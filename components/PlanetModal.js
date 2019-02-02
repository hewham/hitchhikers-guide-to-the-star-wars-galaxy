import React from 'react';
import {
  Text,
  Modal,
  View,
  ScrollView,
  Button
} from 'react-native';
import { MonoText } from '../components/StyledText';


import httpGet from '../providers/http';
import renderListItem from './renderListItem';
import { sortAlpha, sortNum } from '../providers/sort';

import styles from '../styles/styles';
import listStyles from '../styles/listStyles';



// Modal popup that contains detailed information on a selected planet

export default class PlanetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: this.props.visible,
      residents: [],
      films: []
    };
  }

  // On modal open
  componentWillReceiveProps(nextProps) {
    if(nextProps.visible != this.state.visibleModal){
      this.init();
      this.setState({
        visibleModal: nextProps.visible,
        residents: [],
        films: [],
      })
    }
  }

  // fetch important characters (residents) and related films on modal popup
  init(){
    for(let residentsURL of this.props.planet.residents){
      this.getResident(residentsURL);
    }
    for(let filmsURL of this.props.planet.films){
      this.getFilm(filmsURL);
    }
  }

  // fetch resident from url
  getResident = async (url) => {
    var res = await httpGet(url);
    this.state.residents.push(res);
    
    //Sort residents alphabetically
    this.state.residents = sortAlpha(this.state.residents);
    this.setState({
      residents: this.state.residents,
    });
  }


  // fetch related film from url
  getFilm = async (url) => {
    var res = await httpGet(url);
    this.state.films.push(res);
    
    //Sort films by episode number numerically
    this.state.films = sortNum(this.state.films);
    this.setState({
      films: this.state.films,
    });
  }


  // Function to dismiss modal
  hideModal(){
    this.setState({
      visibleModal: false,
    })
  }

  // funtion to render list of residents
  renderResidents(){
    return this.state.residents.map((resident) =>
      renderListItem("keyboard-arrow-right", "#aaa", resident.name, "")
    );
  }
  // funtion to render list of films
  renderFilms(){
    return this.state.films.map((film) =>
      renderListItem("keyboard-arrow-right", "#aaa", "Episode "+film.episode_id, film.title)
    );
  }

  render(){
    return(
      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.visibleModal}
      >
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.hideButton}>
          <Button
            title="Hide"
            color="#841584"
            onPress={() => {
              this.hideModal();
            }} />
        </View>

          <View style={{marginTop: 22}}>

              <Text style={styles.planetName}>{this.props.planet.name}</Text>
              <MonoText style={styles.planetSubtitle}>Planet</MonoText>



              <View style={listStyles.listBox}>
                {renderListItem('terrain', '#663300', 'Terrain', this.props.planet.terrain)}
                {renderListItem('cloud', '#808080', 'Climate', this.props.planet.climate)}
                {renderListItem('pool', '#0099ff', 'Surface Water', this.props.planet.surface_water+"%")}
                {renderListItem('people', '#6600ff', 'Population', this.props.planet.population)}
              </View>


              <View style={listStyles.listBox}>
                {renderListItem('donut-small', '#ff6600', 'Diameter', this.props.planet.diameter+" KM")}
                {renderListItem('get-app', '#800000', 'Gravity', this.props.planet.gravity)}
                {renderListItem('rotate-left', '#3366cc', 'Day Length', this.props.planet.rotation_period+" Days")}
                {renderListItem('today', '#cc0099', 'Year Length', this.props.planet.orbital_period+" Days")}
              </View>


              <View style={listStyles.listBox}>
                {renderListItem('mood', '#009933', 'Important Characters', this.props.planet.residents.length)}
                <View style={{ marginLeft: 30}}>
                  {this.renderResidents()}
                </View>
              </View>


              <View style={listStyles.listBox}>
                {renderListItem('local-movies', '#595959', 'Appears In Films', this.props.planet.films.length)}
                <View style={{ marginLeft: 30}}>
                  {this.renderFilms()}
                </View>
              </View>


            </View>

        </ScrollView>
      </View>
    </Modal>
    )
  }

}
