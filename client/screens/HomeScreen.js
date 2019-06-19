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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text> {"\n"} {"\n"}  {"\n"} {"\n"}</Text>
            <Text style={styles.textshadow}>Trivia Veterinaria</Text>
            <Text style={styles.espacio}> {"\n"} </Text>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/logo.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getTitleContainer}>
            <Text style={styles.espacio}> {"\n"} {"\n"} </Text>
            <Text style={styles.espacio}> {"\n"} {"\n"} {"\n"} {"\n"} {"\n"}</Text>
          </View>
          <View style={styles.container}>
            <Button color={'#663399'} title="Jugar" onPress= {this._Game} />
            <Text style={styles.espacio}> {"\n"} {"\n"} </Text>
            <Button color={'#663399'} title="Estadísticas" onPress= {()=> this.props.navigation.navigate('StatsMenu')} />
          </View>

        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.logout} onPress={this._handleLogout} >LogOut</Text>

        </View>
      </View>

    );
  }


    _Game = async () => {
        axios.get(API_HOST+"/randomCategory", {
              headers: { 'Authorization' : await AsyncStorage.getItem('userToken')}
        })
        .then(response => JSON.parse(JSON.stringify(response)))
        .then(response => {
          const category= response.data.cat ;
          const name=response.data.name;
          this.props.navigation.navigate('Game',{'category': category,'name_c':name});
        })
    };


 _handleLogout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };


  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };


}
// violeta : 'rgba(94, 0, 86, 1)'
// verde:  'rgba(48, 136, 63,1)'
//amarillo: 'rgba(255, 255, 0, 1)' NO QUEDO

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  '#9370db' ,//FONDO,
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
    width: 200,
    height: 180,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
    alignContent: 'center',
    alignItems: 'center',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
   
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
    fontSize: 45,
    color: '#008000', // escrito
    lineHeight: 46, 
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(96,100,109, 0.8)',
  },


textshadow:{ 
 
  fontSize:40, 

  color:'#ffff00', 

  paddingLeft:30, 

  paddingRight:30, 

  textShadowColor:'#585858', 

  textShadowOffset:{width: 5, height: 5}, 

  textShadowRadius:10, 

  },

  getTitleText: {
    fontSize: 27,
    color: 'rgba(94, 0, 86, 1)',
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
    backgroundColor: '#663399' ,//Parte BAJA,
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
    fontSize: 18,
    color: '#ffff00',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  espacio: {
    fontSize: 8,
    textAlign: 'center',
    margin: 2,
  }
});
