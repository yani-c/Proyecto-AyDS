import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import axios from 'axios';

export default class ScoreScreen extends React.Component {
  static navigationOptions = {
    title:'Puntaje',
    headerStyle: {
      backgroundColor: '#663399',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      textAlign: 'center',
      flexGrow:0.6,
      alignSelf:'center',
      fontWeight: 'bold',
    },
  };

  constructor(props){
    super(props);
    this.state={puntos:""};
  }

  async componentWillMount () {
    axios.get(API_HOST+"/score", {
        headers: { 'Authorization' : await AsyncStorage.getItem('userToken')}
    })
    .then(response => JSON.parse(JSON.stringify(response)))
    .then(response => {
      const u =response.data;
      this.setState({puntos: u.score});
    });
  }

  render() {
    const puntaje = this.state.puntos;

    return(
      <View style={styles.container}>
       <Text style={styles.espacio}> {"\n \n \n \n \n \n \n \n \n \n \n \n"} </Text>
       <Text style={styles.puntajeStyle}>
          Puntaje: 
      </Text>
      <Text style={styles.espacio}> {"\n"} </Text>
      <Text style= {styles.scoreStyle} > 
        {puntaje}
      </Text>
      <Text style={styles.espacio}> {"\n"} </Text>
      <Text style={styles.espacio}> {"\n"} </Text>
   </View>

    )

  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CDCDCD',
    },
    puntajeStyle: {
      fontSize: 50,
      color: '#000000',
      lineHeight: 70,
      textAlign: 'center',
      
    },
    scoreStyle: {
      fontSize: 120,
      color: '#228b22',
      lineHeight: 121,
      textAlign: 'center',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    espacio: {
      fontSize: 12,
      textAlign: 'center',
      margin: 2,
    },
    getStartedText: {
      fontSize: 17,
      color: 'rgba(255, 255, 255, 1)',
      lineHeight: 40,
      textAlign: 'center',

    },
  });
