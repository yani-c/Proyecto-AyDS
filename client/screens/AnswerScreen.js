import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default class AnswerScreen extends React.Component {
  static navigationOptions = {
    title: ' ',
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
    this.state = {respuesta:"",
    };
  }
  async componentWillMount () {
    const { navigation } = this.props;
    const identificador = navigation.getParam('ident', 'NO-Ident');
    axios.post(API_HOST+"/answer", {
      id: identificador
      }, {
        headers: { 'Authorization' : await AsyncStorage.getItem('userToken')}
    })
    .then(response => JSON.parse(JSON.stringify(response)))
        .then(response => {
          var r= response.data.Respuesta ;
          this.setState({respuesta : r});
        })
  }

  render() {
    const { navigation } = this.props;
    const desc =navigation.getParam('desc','NO-Desc');
    const cor = this.state.respuesta;
    var respuesta;
    var styleResp;

    if ( JSON.stringify(cor) == "true") {
      respuesta = "Correcta 😃";
      styleResp = true;
    }
    else {
      respuesta = "Incorrecta 😢";
      styleResp = false;
    }
    return (
        <View style={styles.container}>
          <View style={styleResp==true ? styles.respCorrecta
                                       : styles.respIncorrecta}>
            <Text style={styles.espacio}> {"\n"} </Text>
            <Text style={styles.respuestac}> Su respuesta "{desc}"</Text>
            <Text style={styles.respuestac}> ha sido {respuesta}</Text>
            <Text style={styles.espacio}> {"\n"} </Text>
          </View>
          <View style={styleResp==true ? styles.circuloCorrecto : styles.circuloIncorrecto}>
          <Text style={styles.espacio}> </Text>
            <Text style={styleResp==true ? styles.puntoCorrecto
                                        : styles.puntoIncorrecto}> {styleResp==true ? "+10 puntos ✅"
                                                                                    : "-10 puntos ❌"}
            </Text>
            <Text style={styles.espacio}> </Text>
          </View>
          <Text style={styles.respuestac}> {"\n"} </Text>
          <View style={styles.buttonSt}>
            <Button color={'rgba(48, 136, 63,1)'} title="Continuar" onPress={this._continuar} />
            <Text style={styles.espacio}> {"\n"}  </Text>
            <Button color={'#663399'} title= "Volver" onPress={()=> this.props.navigation.navigate('Home')} />
          </View>
        </View>
    );
  }

  _continuar = async () => {
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


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#CDCDCD',
  },
  circuloCorrecto: {
    borderRadius:15,
    borderColor:'#32cd32',
    borderWidth:5,
    marginHorizontal: 30,
  },
  circuloIncorrecto: {
    borderRadius:15,
    borderColor:'#ff0000',
    borderWidth:5,
    marginHorizontal: 30,
  },
  respCorrecta: {
    backgroundColor: '#32cd32',
    margin: 30,
    borderRadius:15,
  },
  respIncorrecta: {
    backgroundColor: '#ff0000',
    margin: 30,
    borderRadius:15,
  },
  buttonSt: {
    margin: 35,
  },
  puntoCorrecto: {
    fontSize: 30,
    color: '#32cd32',
    lineHeight: 35,
    textAlign: 'center',
  },
  puntoIncorrecto: {
    fontSize: 30,
    color: '#ff0000',
    lineHeight: 35,
    textAlign: 'center',
  },
  respuestac: {
    fontSize: 30,
    color: '#FFFFFF',
    lineHeight: 35,
    textAlign: 'center',
  },
  espacio: {
    fontSize: 8,
    textAlign: 'center',
    margin: 5,
  },
})
