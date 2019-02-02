import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';


import { MonoText } from '../components/StyledText';
import httpGet from '../providers/http';
import Specie from '../components/Specie';
import styles from '../styles/styles';


export default class SpeciesScreen extends React.Component {
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
      species: [],
      species: [],
      speciesCount: 0,
      speciesURL: "",
      isLoaded: false,
      modalVisible: false,
    };

    this.init();
  }

  init = async () => {
    if(!this.state.isLoaded){
      this.getSpecies("https://swapi.co/api/species/");
    }
  }

  // Funtion to fetch species from api
  // Iterates through api pages until there are no more
  getSpecies = async (url) => {
    if(url){
      var res = await httpGet(url);
      var species = this.state.species.concat(res.results);

      //Sort species alphabetically
      species.sort(function(a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

      this.setState({
        specieCount: res.count,
        nextSpeciesURL: res.next,
        species: species,
      });
  
      //Call function again to check for another page
      this.getSpecies(res.next);
    }else{
      //No more pages, set state as done scanning
      this.setState({
        isLoaded: true
      });
    }
  }

  // Specie Card Render Function
  renderSpeciesList(){
    if(this.state.isLoaded){
      return this.state.species.map((specie) =>
        <Specie
          specie={specie}
          key={specie.name}
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
    countText = state.species.length+" Species Found";

    return(
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Text style={styles.titleText}>Species Identifier</Text>


          <View style={styles.mainImageContainer}>
            <Image
              source={require('../assets/images/r2d2.gif')}
              style={styles.mainImage}
            />
          </View>



          <View style={styles.mainContainer}>

            <View style={styles.codeHighlightContainer}>
              <MonoText style={styles.codeHighlightText}>{scanText}</MonoText>
            </View>



            <View style={styles.codeHighlightContainer}>
              <MonoText style={styles.codeHighlightText}>{countText}</MonoText>
            </View>


            {this.renderSpeciesList(state)}

          </View>
        </ScrollView>
      </View>
    )
  }



}


