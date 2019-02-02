import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  SearchBar,
} from 'react-native';
import { WebBrowser } from 'expo';



import { MonoText } from '../components/StyledText';


import Constants from '../constants/variables';
import httpGet from '../providers/http';


import Planet from '../components/Planet';
import styles from '../styles/styles';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Home />
    );
  }
}


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      species: [],
      planetCount: 0,
      naxePlanetsURL: "",
      isLoaded: false,
      modalVisible: false,
    };

    this.init();
  }

  init = async () => {
    if(!this.state.isLoaded){
      this.getPlanets("https://swapi.co/api/planets/");
    }
  }

  // Funtion to fetch planets from api
  // Iterates through api pages until there are no more
  getPlanets = async (url) => {
    if(url){
      var res = await httpGet(url);
      var planets = this.state.planets.concat(res.results);

      //Sort planets alphabetically
      planets.sort(function(a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

      this.setState({
        planetCount: res.count,
        nextPlanetsURL: res.next,
        planets: planets,
      });
  
      //Call function again to check for another page
      this.getPlanets(res.next);
    }else{
      //No more pages, set state as done scanning
      this.setState({
        isLoaded: true
      });
    }
  }

  // Planet Render Function
  renderPlanetsList(){
    if(this.state.isLoaded){
      return this.state.planets.map((planet) =>
        <Planet
          planet={planet}
          key={planet.name}
        />
      );
    }
  }


  render(){
    const state = this.state;
    var scanText = "Scanning...";
    if(state.isLoaded){
      scanText = "Done!";
    }
    countText = state.planets.length+" Planets Found";

    return(
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Text style={styles.titleText}>{Constants.appName}</Text>


          <View style={styles.mainImageContainer}>
            <Image
              source={require('../assets/images/radar.gif')}
              style={styles.mainImage}
            />
          </View>



          <View style={styles.mainContainer}>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>{scanText}</MonoText>
            </View>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>{countText}</MonoText>
            </View>

            {this.renderPlanetsList(state)}

          </View>
        </ScrollView>
      </View>
    )
  }



}


