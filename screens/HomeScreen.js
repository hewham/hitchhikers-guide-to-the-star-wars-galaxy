import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { Icon } from 'react-native-elements'
import Constants from '../constants/variables';
import httpGet from '../providers/http';


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

  // randomIconGen = () => {
  //   icons = [
  //     '../assets/images/stormtrooper.png',
  //     '../assets/images/death-star.png',
  //     '../assets/images/lightsaber.png'
  //   ]

  //   console.log("icons[Math.floor(Math.random() * 2)]: ",icons[Math.floor(Math.random() * 2)])
  //   this.setState({
  //     mainIcon: icons[Math.floor(Math.random() * 2)]
  //   });
  // }

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      species: [],
      planetCount: 0,
      naxePlanetsURL: "",
      isLoaded: false,
      mainIcon: '../assets/images/stormtrooper.png',
    };

    this.init();
  }

  init = async () => {
    // this.randomIconGen();
    if(!this.state.isLoaded){
      this.getPlanets("https://swapi.co/api/planets/");
    }
  }

  getPlanets = async (url) => {
    console.log("getPlanets: ",url);
    if(url){
      var res = await httpGet(url);
      console.log("RES: ",res);
      var planets = this.state.planets.concat(res.results);
  
      this.setState({
        planetCount: res.count,
        nextPlanetsURL: res.next,
        planets: planets,
      });
  
      // this.getPlanets(res.next);
    }
  }

  renderPlanetsList(){
    return this.state.planets.map((planet) =>
        <Planet
          planet={planet}
          key={planet.name}
        />
    );
  }


  render(){
    // this.init();
    const temperature = "Temperature lol";
    const location = "Location";
    // const temperature = this.state.temperature;
    const planetCount = this.state.planetCount;
    const state = this.state;

    return(
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/death-star.png')}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>


          <Text style={styles.getStartedText}>{Constants.appName}</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>{planetCount} Planets Found</MonoText>
            </View>

            <Icon
          name='terrain'
          color='#00aced' />

            {this.renderPlanetsList(state)}

          </View>
        </ScrollView>
      </View>
    )
  }



}


class Planet extends React.Component {
  constructor(props) {
    super(props);
    console.log("Planet props: ",this.props);
  }

  render(){
    const planet = this.props.planet;
    return(
      <React.Fragment>
        <Text style={styles.getStartedText}>{planet.name}</Text>
        <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
          <MonoText style={styles.codeHighlightText}>Terrain: {planet.terrain}</MonoText>
        </View>
        <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
          <MonoText style={styles.codeHighlightText}>Climate: {planet.climate}</MonoText>
        </View>
        <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
          <MonoText style={styles.codeHighlightText}>Gravity: {planet.gravity}</MonoText>
        </View>
        <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
          <MonoText style={styles.codeHighlightText}>Surface Water: {planet.surface_water}</MonoText>
        </View>
      </ React.Fragment>
    )
  }


}








const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 120,
    height: 120,
    marginTop: 20,
    resizeMode: 'contain',
    borderRadius: 60,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    paddingHorizontal: 4,
    marginTop: 10,
    padding: 3,
  },
  getStartedText: {
    fontSize: 20,
    fontWeight: '900',
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    paddingTop: 10,
  },
  getStartedText2: {
    fontSize: 20,
    fontWeight: '900',
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    paddingTop: 40,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
