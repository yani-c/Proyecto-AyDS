import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from 'react-native';

import axios from 'axios';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';


export default class StatisticsMenu extends React.Component {
  static navigationOptions = {
    title:'Estadisticas',
    headerStyle: {
      backgroundColor: '#663399',
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      textAlign: 'center',
      flexGrow:0.65, 
      alignSelf:'center',
      fontWeight: 'bold',
    },
  };

  constructor(props){
    super(props);
    this.state = {
      usuario:"",
    };
  }




  render(){
      return(
        <View style={styles.container}>
          <View style={styles.containerImage}>
            <Image style={{width:250, height:250, resizeMode:'contain', alignSelf:'center',}} source={require('../assets/images/estad.png')}/>
          </View>
          <View style={styles.container3}></View>
        
          <View style={styles.container2}>
              <Button color={'rgba(48, 136, 63,1)'} title="Estadisticas Globales" onPress= {()=> this.props.navigation.navigate('Global')} />
              <Text style={styles.espacio}> {"\n"} </Text>
              <Button color={'rgba(48, 136, 63,1)'} title="Estadísticas por Categoria" onPress= {()=> this.props.navigation.navigate('CatStat')} />        
            </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#CDCDCD',
    },
    containerImage:{
      backgroundColor:'#CDCDCD',
    },
    container2: {
      margin:40,
      fontSize: 20,
    },
    container3: {
      flex:0.04,
      backgroundColor:'#663399',
      margin:40,
    },
    espacio: {
      fontSize: 8,
      textAlign: 'center',
      margin: 10,
    }, 
  });
