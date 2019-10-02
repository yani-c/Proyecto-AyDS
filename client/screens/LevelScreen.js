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
    title:'NIVEL POR CATEGORIA',
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
    return(
        <View style={styles.container}>
        <FlatList          
          data={level} 
          keyExtractor={(item, index) => item.name}         
          renderItem={({ item }) => (
            
              <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.espacio}> {"\n"} </Text>
                <View style={styles.getStartedContainer}>
                  <Text style={styles.levelCatStyle}>
                    {item.name} {"\n"}
                  </Text>
                  <Text style={styles.levelStyle}>
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
    levelCatStyle: {
      fontSize:25, 
      color:'#663399', 
      paddingLeft:30, 
      paddingRight:30, 
    },
    levelStyle: {
      fontSize: 20,
      color: '#000000',
      lineHeight: 41,
      textAlign: 'center',
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    espacio: {
      fontSize: 7,
      textAlign: 'center',
      margin: 2,
    },
  
  });
