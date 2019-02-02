import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SearchBar } from 'react-native-elements'
import { WebBrowser } from 'expo';



import { MonoText } from '../components/StyledText';
import Constants from '../constants/Variables';
import httpGet from '../providers/http';
import searchFilter from '../providers/searchFilter';
import { sortAlpha } from '../providers/sort';

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
      filteredPlanets: [],
      planetCount: 0,
      isLoaded: false,
      searchInput: "",
    };

    this.init();
  }

  init = async () => {
    if(!this.state.isLoaded){
      this.getPlanets(Constants.planetsURL);
    }
  }

  // Funtion to fetch planets from api
  // Iterates through api pages until there are no more
  getPlanets = async (url) => {
    if(url){
      var res = await httpGet(url);
      var planets = this.state.planets.concat(res.results);

      //Sort planets alphabetically
      planets = sortAlpha(planets);
      this.setState({
        planetCount: res.count,
        planets: planets,
      });
      //Call function again to check for another page
      this.getPlanets(res.next);
    }else{
      //No more pages, set state as done scanning
      this.setState({
        filteredPlanets: this.state.planets,
        isLoaded: true
      });
    }
  }

  // Search bar renderer
  renderSearchBar(){
    if(this.state.isLoaded){
      return(
        <View style={styles.searchbarContainer}>
          <SearchBar
            round
            lightTheme
            style = {styles.searchbar}
            onChangeText={(input) => this.onSearch(input)}
            placeholder='Search By Name...'
            clearIcon = {false}
            value={this.state.searchInput}/>
        </View>
      )
    }
  }

  // on search input function to filter results
  onSearch(input){
    var filteredPlanets = searchFilter(input, this.state.planets);
    this.setState({
      filteredPlanets: filteredPlanets,
      searchInput: input
    })
  }

  // render gap below searchbar if no results to remove keyboard cover / jumps
  renderGap(){
    if(this.state.filteredPlanets.length == 0 && this.state.isLoaded){
      return <View style={styles.searchBarGap}></View>
    }
  }

  // Planet Render Function
  renderPlanetsList(){
    if(this.state.isLoaded){
      return this.state.filteredPlanets.map((planet) =>
        <Planet
          planet={planet}
          key={planet.name}
        />
      );
    }
  }

  render(){
    var scanText = "Scanning...";
    var countText = this.state.planets.length+" Planets Found";
    if(this.state.isLoaded){
      scanText = "Done!";
      countText = this.state.filteredPlanets.length+" Planets Found";
    }
    if(this.state.filteredPlanets.length == 1){
      countText = this.state.filteredPlanets.length+" Planet Found";
    }

    return(
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <Text style={styles.titleText}>Planet Scanner</Text>
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

            {this.renderSearchBar()}
            {this.renderGap()}
            {this.renderPlanetsList()}
          </View>

        </ScrollView>
      </View>
    )
  }



}


