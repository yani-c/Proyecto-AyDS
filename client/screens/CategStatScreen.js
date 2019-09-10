import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  View,
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
      const c1= this.state.c1;
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
                    <Text style={styles.categoryStyle}>
                    {c1.nombre} {"\n"}
                    </Text>
                    <Text style={styles.getStartedText}>
                    Correctas:  {" "} {c1.correct} {" "}
                    Incorrectas:  {" "} {c1.incorrect}
                    </Text>
                    <Text style={styles.categoryStyle}>
                    {"\n"} {"\n"}
                    {c2.nombre} {"\n"}
                    </Text>
                    <Text style={styles.getStartedText}>
                    Correctas: {" "} {c2.correct} {" "}
                    Incorrectas: {" "} {c2.incorrect}
                    </Text>
                    <Text style={styles.categoryStyle}>
                    {"\n"} {"\n"}
                    {c3.nombre}{"\n"}
                    </Text>
                    <Text style={styles.getStartedText}>
                    Correctas: {" "} {c3.correct} {" "}
                    Incorrectas: {" "} {c3.incorrect}
                    </Text>
                    <Text style={styles.categoryStyle}>
                    {"\n"} {"\n"}
                    {c4.nombre}{"\n"} 
                    </Text>
                    <Text style={styles.getStartedText}>
                    Correctas: {" "} {c4.correct} {" "}
                    Incorrectas: {" "} {c4.incorrect}
                    </Text>
                    <Text style={styles.categoryStyle}>
                    {"\n"} {"\n"}
                    {c5.nombre} {"\n"} 
                    </Text>
                    <Text style={styles.getStartedText}>
                    Correctas: {" "} {c5.correct} {" "}
                    Incorrectas: {" "} {c5.incorrect}
                    </Text>
                    <Text style={styles.categoryStyle}>
                    {"\n"} {"\n"}
                    {c6.nombre}{"\n"} 
                    </Text>
                    <Text style={styles.getStartedText}>
                    Correctas: {" "} {c6.correct} {" "}
                    Incorrectas: {" "}  {c6.incorrect}
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
