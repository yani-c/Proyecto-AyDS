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

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Respuesta',
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
    if ( JSON.stringify(cor) == "true") {
      respuesta = "Correcta!"
    }
    else {
      respuesta = "Incorrecta :("
    }
    return (
        <View style={styles.container}>
          <Text style={styles.respuestac}> Su respuesta "{desc}"</Text>
          <Text style={styles.respuestac}> ha sido {respuesta}</Text>
          <Text style={styles.respuestac}> {"\n"} {"\n"} {"\n"} {"\n"} </Text>
          <Button color={'#20b2aa'} title="Continuar" onPress={this._continuar} />
          <Text style={styles.espacio}> {"\n"}  </Text>
          <Button color={'#20b2aa'} title= "Volver" onPress={()=> this.props.navigation.navigate('Home')} />
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
      console.log(category);
      console.log(name);
      this.props.navigation.navigate('Game',{'category': category,'name_c':name});
    })
};

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 5,
  },
  
  respuestac: {
    fontSize: 30,
    textAlign: 'center',
    margin: 5,
    color: '#191970'
  },
 
  espacio: {
    fontSize: 5,
    textAlign: 'center',
    margin: 5,
  },
  input: {
    margin: 15,
    height: 40,
    padding: 5,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#4228F8'
  }
})