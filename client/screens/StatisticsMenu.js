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
    title:'Menu Estadisticas',
    headerStyle: {
      backgroundColor: '#663399',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
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
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.getStartedContainer}>
                    <Text style={styles.espacio}> {"\n"} </Text>
                    <Button color={'rgba(48, 136, 63,1)'} title="Estadisticas Globales" onPress= {()=> this.props.navigation.navigate('Global')} />
                    <Text style={styles.espacio1}> {"\n"} </Text>
                    <Button color={'rgba(48, 136, 63,1)'} title="Estadísticas por Categoria" onPress= {()=> this.props.navigation.navigate('CatStat')} />
                </View>
            </ScrollView>
        </View>

      );
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#9370db',
    },
    espacio: {
      fontSize: 50,
      textAlign: 'center',
      margin: 50,
    },
    espacio1: {
      fontSize: 10,
      textAlign: 'center',
      margin: 10,
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
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    getQuestionText:{
      alignItems: 'center',
      fontSize: 30,

    },
    getOptionText:{
      alignItems: 'center',
      fontSize: 20,

    },
    homeScreenFilename: {
      marginVertical: 7,
    },

    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
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
    logout: {
      fontSize: 14,
      color: '#2e78b7',
      textAlign: 'center',
    },
  });
