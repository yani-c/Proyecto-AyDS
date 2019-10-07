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
    this.state={correctas: "",incorrectas:""};
  }

  async componentWillMount () {
    axios.get(API_HOST+"/globalStatistics", {
        headers: { 'Authorization' : await AsyncStorage.getItem('userToken')}
    })
    .then(response => JSON.parse(JSON.stringify(response)))
    .then(response => {
      const cat =response.data;
      this.setState({correctas:cat.correct, incorrectas:cat.incorrect});
    });
  }

// Correctas: {JSON.stringify(c1.correct)}
//Incorrectas: {JSON.stringify(c1.incorrect)}
  render() {
    
      function dosDecimales(n) {
        let t=n.toString();
        let regex=/(\d*.\d{0,2})/;
        return t.match(regex)[0];
      }

      const correct= this.state.correctas;
      const incorrect= this.state.incorrectas;
      var totalPreg= parseInt(correct)+parseInt(incorrect);
      var porcentajeCorrectas= dosDecimales(correct*100/totalPreg);
      var porcentajeIncorrectas= dosDecimales(incorrect*100/totalPreg);
      
      if (totalPreg==0){
        porcentajeCorrectas=0;
        porcentajeIncorrectas=0;
      }
      
      return(
        <View style={styles.container}>

          <Text style={styles.espacio}> {"\n"} </Text>
          <Text style={styles.espacio}> {"\n"} </Text>
          <Text style={styles.espacio}> {"\n"} </Text>
          <Text style={styles.espacio}> {"\n"} </Text>

          <Text style={styles.correctaStyle}> CORRECTAS: {" "} {porcentajeCorrectas+'%'}</Text>
          <View style={styles.containerCorrectas}>
            <View style={{backgroundColor: '#32cd32',width:(porcentajeCorrectas*380)/100, resizeMode:'contain'}}>
              <Text style={styles.espacio}> {"\n"} </Text>
              <Text style={styles.espacio}> {"\n"} </Text>
            </View>
          </View>

          <Text style={styles.espacio}> {"\n"} </Text>
          <Text style={styles.espacio}> {"\n"} </Text>
          <Text style={styles.espacio}> {"\n"} </Text>

          <Text style={styles.incorrectaStyle}>INCORRECTAS: {" "} {porcentajeIncorrectas+'%'} </Text>
          <View style={styles.containerIncorrectas}>
            <View style={{backgroundColor: '#ff0000',width:(porcentajeIncorrectas*380)/100, resizeMode:'contain'}}>
              <Text style={styles.espacio}> {"\n"} </Text>
              <Text style={styles.espacio}> {"\n"} </Text>
            </View>
          </View>

        </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CDCDCD',
    },
    containerCorrectas: {
      backgroundColor: '#CDCDCD',
      borderColor:'#32cd32',
      borderWidth:2,
      borderRadius: 5,
      margin: 5,
    }, 
    containerIncorrectas: {
      backgroundColor: '#CDCDCD',
      borderColor:'#ff0000',
      borderWidth:2,
      borderRadius: 5,
      margin: 5,
    },  
    correctaStyle: {
      fontSize: 25,
      color: '#32cd32',
      lineHeight: 41,
      textAlign: 'center',
    },
    incorrectaStyle: {
      fontSize: 25,
      color: '#ff0000',
      lineHeight: 30,
      textAlign: 'center',
    },
    espacio: {
      fontSize: 12,
      textAlign: 'center',
      margin: 2,
    },
  });