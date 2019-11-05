import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Table from 'react-native-simple-table'
import axios from 'axios';
const columns = [
    {
      title: 'Nombre',
      dataIndex: 'username',
      width: 105
    },
    {
      title: 'Dni',
      dataIndex: 'dni'
    },
    {
      title: 'Puntaje',
      dataIndex: 'score'
    },
  ];
export default class RankingScreen extends React.Component {  
    static navigationOptions = {
    title:'Ranking',
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
    this.state={users:[] ,cant:"",};
  }

  async componentWillMount () {
    axios.get(API_HOST+"/rank", {
        headers: { 'Authorization' : await AsyncStorage.getItem('userToken')}
    })
    .then(response => JSON.parse(JSON.stringify(response)))
    .then(response => {
      let users = [];

        Object.values(response.data.users).forEach(item => {
            users = users.concat(item);
        });
        
      this.setState({users:users, cant:response.data.cant});
    });
  }


  render() {
      const u = this.state.users;
      const cant = this.state.cant;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ranking Jugadores</Text>
            <Table height={320} columnWidth={100} columns={columns} dataSource={u} />
        </View>
      )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CDCDCD',
    },
    puntajeStyle: {
      fontSize: 50,
      color: '#000000',
      lineHeight: 70,
      textAlign: 'center',
      
    },
    scoreStyle: {
      fontSize: 120,
      color: '#228b22',
      lineHeight: 121,
      textAlign: 'center',
      fontStyle: 'italic',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
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
    title: {
      fontSize: 40,
      padding: 10,
      textAlign: 'center'
    },
});