import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import axios from 'axios';

export default class CategStatScreen extends React.Component {
  static navigationOptions = {
    title:'Estadísticas por Categoria',
    headerStyle: {
      backgroundColor: '#663399',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      textAlign: 'center',
      flexGrow:0.5, 
      alignSelf:'center',
      fontWeight: 'bold',
    },
  };

  constructor(props){
    super(props);
    this.state={cats:[] ,cant:"",};
  }

  async componentWillMount () {
    axios.get(API_HOST+"/statistics", {
        headers: { 'Authorization' : await AsyncStorage.getItem('userToken')}
    })
    .then(response => JSON.parse(JSON.stringify(response)))
    .then(response => {

      let cats = [];

        Object.values(response.data.cats).forEach(item => {
            cats = cats.concat(item);
        });
        
      this.setState({cats:cats, cant:response.data.cant});
    });
  }


// Correctas: {JSON.stringify(c1.correct)}
//Incorrectas: {JSON.stringify(c1.incorrect)}
  render() {
      const c= this.state.cats;
      const cant=this.state.cant;
      console.log(c);
      console.log(cant);
      
     // console.log(cat);
      return(
        <View style={styles.container}>
          <FlatList          
            data={c} 
            keyExtractor={(item, index) => item.nombre}         
            renderItem={({ item }) => (
              
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                  <View style={styles.getStartedContainer}>
                    <Text style={styles.categoryStyle}>
                      {item.nombre} {"\n"}
                    </Text>
                    <Text style={styles.getStartedText}>
                      Correctas:  {" "} {item.correct} {" "}
                      Incorrectas:  {" "} {item.incorrect}
                    </Text>
                  </View>
                </ScrollView>
                    
            )}
          ></FlatList>
        </View> 
      );
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CDCDCD',
    },
    contentContainer: {
      paddingTop: 30,
    },
    categoryStyle: {
        fontSize:20, 
        color:'#ffff00', 
        paddingLeft:30, 
        paddingRight:30, 
        textShadowColor:'#585858', 
        textShadowOffset:{width: 5, height: 5}, 
        textShadowRadius:10, 
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    getStartedText: {
      fontSize: 17,
      color: 'rgba(255, 255, 255, 1)',
      lineHeight: 24,
      textAlign: 'center',
    },
  });
