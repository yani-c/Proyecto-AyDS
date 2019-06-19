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

export default class GlobalScreen extends React.Component {
  static navigationOptions = {
    title:'Estadísticas Globales',
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
      //console.log(this.state.categoria1);
      const correct= this.state.correctas;
      const incorrect= this.state.incorrectas;
      //que me traiga las categorias y el nombre
      return(
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.getStartedContainer}>
                <View style={styles.getStartedContainer}>
                    <Text style={styles.getStartedText}> {"\n"} {"\n"} {"\n"} {"\n"} {"\n"}</Text>
                    <Text style={styles.correctaStyle}>
                    Correctas: {" "}
                    {correct}
                    <Text style={styles.getStartedText}> {"\n"} {"\n"} </Text>
                    </Text>
                    <Text style={styles.incorrectaStyle}>
                    Incorrectas: {" "}
                    {incorrect}
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
      backgroundColor: '#9370db',
    },
    contentContainer: {
      paddingTop: 30,
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
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
      color: 'rgba(255, 255, 255, 1)',
      lineHeight: 40,
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
