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
    title: 'TRIVIA VETERINARIA',
    headerStyle: {
      backgroundColor: '#663399',
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      textAlign: 'center',
      flexGrow:1,
      alignSelf:'center',
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={styles.container}>

        <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
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
            <View style={styles.containerButton}>
              <Button color={'rgba(48, 136, 63,1)'} title="Jugar" onPress= {this._Game} />
              <Text style={styles.espacio}> {"\n"} {"\n"} </Text>
              <Button color={'rgba(48, 136, 63,1)'} title="Estadísticas" onPress= {()=> this.props.navigation.navigate('StatsMenu')} />
              <Text style={styles.espacio}> {"\n"} {"\n"} </Text>
              <Button color={'rgba(48, 136, 63,1)'} title="Puntaje" onPress= {()=> this.props.navigation.navigate('Score')} />
            </View>
            <Text style={styles.espacio}> {"\n"} {"\n"} </Text>
            <Text style={styles.espacio}> {"\n"} {"\n"} </Text>
        </ScrollView>
          <Text style={styles.logout} onPress={this._handleLogout}> SALIR </Text>
          <Text style={styles.espacio}> {"\n"} {"\n"} </Text>

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
          this.props.navigation.navigate('Category',{'category': category,'name_c':name});
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#CDCDCD',
    margin: 3,
  },
  contentContainer: {
    paddingTop: 30,
  },
  containerButton: {
    margin: 50,
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

  logout: {
    textAlign: 'center',
    color: '#663399',
    fontWeight: 'bold',
    fontSize: 15,
  },
  espacio: {
    fontSize: 8,
    textAlign: 'center',
    margin: 2,
  },
});
