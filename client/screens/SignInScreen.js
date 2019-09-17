import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: '#663399',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      textAlign: 'center',
      flexGrow:1, 
      alignSelf:'center',
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Image style={{width:150, height:150, resizeMode:'contain', alignSelf:'center',}} source={require('../assets/images/logo.png')}/>

        <TextInput
          placeholder="Nombre de Usuario"
          placeholderTextColor = 'gray' 
          style={styles.input}
          onChangeText={(value) => this.setState({ username: value })}
          value={this.state.username}
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor = 'gray' 
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => this.setState({ password: value })}
          value={this.state.password}
        />

        
        <View style={styles.button}>
         <Button color={'#663399'} title="Iniciar Sesión" onPress={this._signIn} />
         <Text style={styles.espacio}> {"\n"} </Text>
         <Text style={styles.negrita}> No tiene una cuenta? 
          <Text style={styles.conButton} onPress ={() => this.props.navigation.navigate('SignUp')}>  Crear Cuenta </Text>
         </Text>
        </View>  
     
      </View>
    );
  }




  _signIn = () => {
    const { username, password } = this.state;

    axios.post(API_HOST+"/login", {
      username: username,
      password: password,
    }, {
      auth: {
        username: username,
        password: password
      }
    })
      .then(response => JSON.parse(JSON.stringify(response)))
      .then(response => {
        AsyncStorage.setItem('userToken', response.config.headers.Authorization);
        this.props.navigation.navigate('App');
      })
    .catch((error) => {
      if(error.toString().match(/401/)) {
        alert("Nombre de usuario o contraseña incorrecta");
        return;
      }

      alert("Problema de Network");
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#cdcdcd',
  },
  espacio: {
    fontSize: 12,
    textAlign: 'center',
    margin: 2,
  },
  button: {
    margin: 25,
  },
  conButton: {
    textAlign: 'center',
    color: '#663399',
    fontWeight: 'bold',
    fontSize: 15,
  },
  negrita:{
    textAlign: 'center',
    fontSize: 15,
  },
  input: {
    margin: 25,
    height: 40,
    padding: 5,
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#663399',
    color: 'black',
  }
})
