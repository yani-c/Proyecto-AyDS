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

export default class GameScreen extends React.Component {
  static navigationOptions = {
    title: 'Juego'
  };


  render() {
    const { navigation } = this.props;
    const opcion1 = navigation.getParam('descriptionOpcion1', 'NO-Option');
    const opcion2 = navigation.getParam('descriptionOpcion2', 'NO-Option');
    const opcion3 = navigation.getParam('descriptionOpcion3', 'NO-Option');
    const opcion4 = navigation.getParam('descriptionOpcion4', 'NO-Option');
    const date = navigation.getParam('description', 'NO-Question');
    //const otherParam = navigation.getParam('otherParam', 'some default value');
    return (
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.getStartedContainer}>
                    <Text style={styles.getStartedText}>
                    HOLA ESTAS JUGANDO!
                    </Text>
                     <Text style={styles.getQuestionText}>
                       Pregunta: {JSON.stringify(date)}
                     </Text>
                    <Text style={styles.getOptionText}>
                      Opcion 1: {JSON.stringify(opcion1)}
                     </Text>
                    <Text style={styles.getOptionText}>
                      Opcion 2: {JSON.stringify(opcion2)}
                    </Text>
                    <Text style={styles.getOptionText}>
                      Opcion 3: {JSON.stringify(opcion3)}
                    </Text>
                    <Text style={styles.getOptionText}>
                      Opcion 4: {JSON.stringify(opcion4)}
                    </Text>

                     <Text>
                     {JSON.stringify(AsyncStorage.getItem('userToken'))}
                     </Text>
                </View>
            </ScrollView>
        </View>
    )};
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
