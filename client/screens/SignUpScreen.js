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
//<Button title="Sign up!" onPress ={this.props.navigation.navigate('SingUp')} />

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Registrate',
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
            <Text style={styles.welcome}> Ingrese sus datos </Text>

        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={(value) => this.setState({ username: value })}
          value={this.state.username}
        />

        <TextInput
          placeholder="Dni"
          style={styles.input}
          onChangeText={(value) => this.setState({ dni: value })}
          value={this.state.dni}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => this.setState({ password: value })}
          value={this.state.password}
        />

        <Button color={'#20b2aa'} title="Sign up!" onPress={this._signUp} />

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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
