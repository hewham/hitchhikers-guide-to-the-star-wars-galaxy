import {
  StyleSheet,
} from 'react-native';
 


// STYLESHEET FOR LIST ITEMS WITHING PLANET MODAL LIST
 
 
 const listStyles = StyleSheet.create({

  listDetailContainer:{
    flexWrap: "wrap"
  },

  listBox:{
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 3,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  listDetailIcon:{
    position: 'absolute',
        width: 1,
    left: 0,
    top: 0,
    backgroundColor: 'rgb(255,0,0)'
  },
  listDetailTitle:{
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(96,100,109, 1)',
    textAlign: 'left',
    paddingBottom: 3,
  },
  listDetailText:{
    textAlign: 'left',
    textTransform: 'capitalize',
    color: '#999',
  },



});


export default listStyles;