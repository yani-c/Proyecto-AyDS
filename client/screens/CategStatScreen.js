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

    function dosDecimales(n) {
      let t=n.toString();
      let regex=/(\d*.\d{0,2})/;
      return t.match(regex)[0];
    }

    function calcularPorcentajeCorrrectas(item) {
      var totalPreg= parseInt(item.correct)+parseInt(item.incorrect);
      var porcentajeCorrectas= dosDecimales(item.correct*100/totalPreg);
      if (porcentajeCorrectas==0 || totalPreg==0){
        return 0;
      }
      return porcentajeCorrectas;
    }

    function calcularPorcentajeIncorrrectas(item) {
      var totalPreg= parseInt(item.correct)+parseInt(item.incorrect);
      var porcentajeIncorrectas= dosDecimales(item.incorrect*100/totalPreg);
      if (porcentajeIncorrectas==0 || totalPreg==0){
        return 0;
      }
      return porcentajeIncorrectas;
    }

      const c= this.state.cats;
      const cant=this.state.cant;
      //console.log(c);
      //console.log(cant);
     // console.log(cat);
     
      return(
        <View style={styles.container}>
          <FlatList          
            data={c} 
            keyExtractor={(item, index) => item.nombre}         
            renderItem={({ item }) => (
              
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                  <View style={styles.getStartedContainer}>
                    <Text style={styles.categoryStyle}>{item.nombre} {"\n"}</Text>

                    <Text style={styles.correctas}>
                      Correctas:  {" "} {calcularPorcentajeCorrrectas(item)+'%'} {" "}
                    </Text>
                    <View style={styles.containerCorrectas}>
                      <View style={{borderRadius: 3,backgroundColor: '#32cd32',width:(calcularPorcentajeCorrrectas(item)*199)/100, resizeMode:'contain'}}>
                        <Text style={styles.espacio}> </Text>
                      </View>
                    </View>

                    <Text style={styles.incorrectas}>
                      Incorrectas:  {" "} {calcularPorcentajeIncorrrectas(item)+'%'}
                    </Text>
                    <View style={styles.containerIncorrectas}>
                      <View style={{borderRadius: 3,backgroundColor: '#ff0000',width:(calcularPorcentajeIncorrrectas(item)*199)/100, resizeMode:'contain'}}>
                        <Text style={styles.espacio}> </Text>
                      </View>
                    </View>
                  </View>
                </ScrollView>       
            )}>
            </FlatList>
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
        fontSize:25, 
        color:'#663399', 
        paddingLeft:30, 
        paddingRight:30, 
    },
    containerCorrectas: {
      width:200,
      height:30,
      backgroundColor: '#CDCDCD',
      borderColor:'#32cd32',
      borderWidth:2,
      borderRadius: 5,
      margin: 5,
    }, 
    containerIncorrectas: {
      width:200,
      height:30,
      backgroundColor: '#CDCDCD',
      borderColor:'#ff0000',
      borderWidth:2,
      borderRadius: 5,
      margin: 5,
    }, 
    getStartedContainer: {
      alignItems: 'center',
      borderColor:'#663399',
      borderRadius: 5,
      borderWidth: 3,
      margin: 5,
    },
    correctas: {
      fontSize: 17,
      color: '#32cd32',
      lineHeight: 24,
      textAlign: 'center',
    },
    incorrectas: {
      fontSize: 17,
      color: '#ff0000',
      lineHeight: 24,
      textAlign: 'center',
    },
    espacio: {
      fontSize: 17,
      textAlign: 'center',
      margin: 2,
    },
  });
