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
      modalVisible: false,
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
      planets.sort(function(a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

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

  onSearch(input){
    console.log("onSearch(): ", input);
    console.log("this.state.searchInput: ",this.state.searchInput);

    filteredPlanets = this.filterPlanets(input);
    this.setState({
      filteredPlanets: filteredPlanets,
      searchInput: input
    })
  }
  clearSearch(){
    console.log("ClearSearch()");
    this.setState({
      filteredPlanets: this.state.planets,
      searchInput: ""
    })

  }

  filterPlanets(input) {
    return this.state.planets.filter((v) => {
      if (v.name.toLowerCase().indexOf(input.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
  }

  renderSearchBar(){
    if(this.state.isLoaded){
      return(
        <View style={styles.searchbarContainer}>
          <SearchBar
            round
            lightTheme
            style = {styles.searchbar}
            onChangeText={(input) => this.onSearch(input)}
            onClearText={() => this.clearSearch()}
            placeholder='Search By Name...'
            value={this.state.searchInput}/>
        </View>
      )
    }
  }

  renderGap(){
    if(this.state.filteredPlanets.length == 0 && this.state.isLoaded){
      return(
        <View style={styles.searchBarGap}></View>
      )
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

            {/* <View style={styles.searchbarContainer}>
            <SearchBar
              round
              lightTheme
              ref='searchBar'
              style = {styles.searchbar}
              onChangeText={(input) => this.onSearch(input)}
              onClearText={() => this.clearSearch()}
              placeholder='Search By Name...'
              value={this.state.searchInput}/>
              </View> */}

            {this.renderSearchBar()}
            {this.renderGap()}
            {this.renderPlanetsList()}

          </View>
        </ScrollView>
      </View>
    )
  }



}


