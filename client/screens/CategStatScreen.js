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

export default class CategStatScreen extends React.Component {
  static navigationOptions = {
    title:'Estadísticas por Categoria'
  };

  constructor(props){
    super(props);
    this.state={c1: "",c2:"",c3:"",c4:"",c5:"",c6:""};
  }

  async componentWillMount () {
    axios.get(API_HOST+"/statistics", {
        headers: { 'Authorization' : await AsyncStorage.getItem('userToken')}
    })
    .then(response => JSON.parse(JSON.stringify(response)))
    .then(response => {
      const categorias =response.data;
      this.setState({c1: categorias.categoria1, c2: categorias.categoria2, c3: categorias.categoria3,
    c4: categorias.categoria4, c5: categorias.categoria5, c6: categorias.categoria6});
    });
  }

// Correctas: {JSON.stringify(c1.correct)}
//Incorrectas: {JSON.stringify(c1.incorrect)}
  render() {
      //console.log(this.state.categoria1);
      const c1= this.state.c1;
      console.log(c1.estadisticas);
      const c2= this.state.c2;
      const c3= this.state.c3;
      const c4= this.state.c4;
      const c5= this.state.c5;
      const c6= this.state.c6;
      //que me traiga las categorias y el nombre
      return(
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.getStartedContainer}>
                    <Text style={styles.getStartedText}>
                    {JSON.stringify(c1.nombre)}
                    {JSON.stringify(c1.estadisticas)}
                    </Text>
                    <Text style={styles.getStartedText}>
                    {JSON.stringify(c2.nombre)}
                    {JSON.stringify(c2.estadisticas)}
                    </Text>
                    <Text style={styles.getStartedText}>
                    {JSON.stringify(c3.nombre)}
                    {JSON.stringify(c3.estadisticas)}
                    </Text>
                    <Text style={styles.getStartedText}>
                    {JSON.stringify(c4.nombre)}
                    {JSON.stringify(c4.estadisticas)}
                    </Text>
                    <Text style={styles.getStartedText}>
                    {JSON.stringify(c5.nombre)}
                    {JSON.stringify(c5.estadisticas)}
                    </Text>
                    <Text style={styles.getStartedText}>
                    {JSON.stringify(c6.nombre)}
                    {JSON.stringify(c6.estadisticas)}
                    </Text>
                </View>
            </ScrollView>
        </View>

      );
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
