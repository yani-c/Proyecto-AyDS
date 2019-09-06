import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
//<Button title="Sign up!" onPress ={this.props.navigation.navigate('SingUp')} />

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Registrarse',
    headerStyle: {
      backgroundColor: '#663399',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      textAlign: 'center', 
      flexGrow:0.65, 
      alignSelf:'center',
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      dni:''
    }
  }

  render() {
    return (
        <View style={styles.container}>
            <Image style={{width:150, height:150, resizeMode:'contain', alignSelf:'center',}} source={require('../assets/images/logo.png')}/>

        <TextInput
          placeholder="Username"
          placeholderTextColor = 'gray'
          style={styles.input}
          onChangeText={(value) => this.setState({ username: value })}
          value={this.state.username}
        />

        <TextInput
          placeholder="DNI"
          placeholderTextColor = 'gray'
          style={styles.input}
          onChangeText={(value) => this.setState({ dni: value })}
          value={this.state.dni}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor = 'gray'
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => this.setState({ password: value })}
          value={this.state.password}
        />

        <Text style={styles.espacio}> {"\n"} </Text>

        <View style={styles.button}>
          <Button color={'#663399'} title="Sign up" onPress={this._signUp} />
        </View>

        </View>
    );
  }

  _signUp = () => {
    const { username, password, dni } = this.state;

    axios.post(API_HOST+"/users", {
      username: username,
      password: password,
      dni: dni,
      administrator: false,
    }, {
      auth: {
        username: "admin",
        password: "admin"
      }
    })
      .then(response => JSON.stringify(response))
      .then(response => {
        // Handle the JWT response here
        this.props.navigation.navigate('SignIn');
      })
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#CDCDCD',
  },
  espacio: {
    fontSize: 5,
    textAlign: 'center',
    margin: 2,
  },
  button: {
    margin: 25,
  },
  input: {
    margin: 25,
    height: 40,
    padding: 5,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#663399',
    color: 'black',
  }
})
