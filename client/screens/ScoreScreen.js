import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import axios from 'axios';

export default class GlobalScreen extends React.Component {
  static navigationOptions = {
    title:'Estadísticas Globales',
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
        <Text style={styles.espacio}> {"\n"} </Text>
        <Text style={styles.espacio}> {"\n"} </Text>
       <Text style={styles.correctaStyle}>
            Puntaje: {puntaje}
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
    correctaStyle: {
      fontSize: 30,
      color: '#32cd32',
      lineHeight: 41,
      textAlign: 'center',
    },
    incorrectaStyle: {
      fontSize: 29,
      color: '#ff0000',
      lineHeight: 30,
      textAlign: 'center',
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
