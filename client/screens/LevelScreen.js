import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from 'react-native';

import axios from 'axios';

export default class LevelScreen extends React.Component {
  static navigationOptions = {
    title:'Nivel',
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
    this.state={level:[]};
  }

  async componentWillMount () {
    axios.get(API_HOST+"/level", {
        headers: { 'Authorization' : await AsyncStorage.getItem('userToken')}
    })
    .then(response => JSON.parse(JSON.stringify(response)))
    .then(response => {
        let lvl = [];
        Object.values(response.data).forEach(item => {
            lvl = lvl.concat(item);
        });
        this.setState({level:lvl});
    });
  }

  render() {
    const level = this.state.level;
    console.log(level);
    return(
        <View style={styles.container}>
        <FlatList          
          data={level} 
          keyExtractor={(item, index) => item.name}         
          renderItem={({ item }) => (
            
              <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.getStartedContainer}>
                  <Text style={styles.categoryStyle}>
                    {item.name} {"\n"}
                  </Text>
                  <Text style={styles.correctas}>
                    Nivel:  {" "} {item.level}
                  </Text>
                </View>
              </ScrollView>
                  
          )}
        ></FlatList>
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
