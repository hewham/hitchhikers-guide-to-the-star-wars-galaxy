import {
  StyleSheet,
} from 'react-native';
 



//  GLOBAL STYLESHEET
 
 
 const styles = StyleSheet.create({
  gap:{
    height: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },
  mainImageContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  mainImage: {
    width: 120,
    height: 120,
    marginTop: 20,
    // resizeMode: 'contain',
    resizeMode: 'cover',
    borderRadius: 60,
  },
  mainContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
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
  titleText: {
    fontSize: 20,
    fontWeight: '900',
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    paddingTop: 10,
  },


  searchbarContainer:{
    flex: 1,
    width: 300,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d6d7da',
    marginTop: 10,
    paddingTop: -20,
  },
  searchBarGap:{
    height: 400,
    backgroundColor: 'rgb(255,0,0)'
  },




  planetCard:{
    flex: 1,
    width: 300,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d6d7da',
    marginTop: 10,
    paddingTop: -20,
    backgroundColor: '#f8f8f8',
    position: 'relative'
  },
  planetName:{
    fontSize: 20,
    fontWeight: '900',
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  planetSubtitle:{
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(96,100,109, 0.8)',
    textAlign: 'center',
    paddingBottom: 6,
  },



  detailCol:{
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 4,
    margin: 2,
    padding: 3,
  },
  detailTitle:{
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
    paddingBottom: 3,
  },
  detailText:{
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#888',
  },

  viewButton:{
    position: 'absolute',
    right: 0,
    top: -2,
    zIndex: 100,
  },
  hideButton:{
    position: 'absolute',
    left: 10,
    top: 20,
  }


});


export default styles;