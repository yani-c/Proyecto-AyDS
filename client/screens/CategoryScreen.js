import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

export default class CategoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Categoria',
    headerStyle: {
      backgroundColor: '#663399',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      textAlign: 'center',
      flexGrow:0.7, 
      alignSelf:'center',
      fontWeight: 'bold',
    },
  };

  constructor(props){
    super(props);
    this.state = {category:"",
      question: "", option1:"",option2:"",option3:"",option4:"", found:"",
    };
  }

  async componentWillMount () {
    const { navigation } = this.props;
    const cat = navigation.getParam('category', 'NO-Category');
    const name_c=navigation.getParam('name_c','NO-NameCategory');
    axios.post(API_HOST+"/game", {
      category_id: cat
      }, {
        headers: { 'Authorization' : await AsyncStorage.getItem('userToken')}
    })
    .then(response => JSON.parse(JSON.stringify(response)))
    .then(response => {
      const f =JSON.parse(JSON.stringify(response.data.Found));
      const q =JSON.parse(JSON.stringify(response.data.Pregunta));
      const o1 =JSON.parse(JSON.stringify(response.data.Opcion1));
      const o2 =JSON.parse(JSON.stringify(response.data.Opcion2));
      const o3 =JSON.parse(JSON.stringify(response.data.Opcion3));
      const o4 =JSON.parse(JSON.stringify(response.data.Opcion4));
      this.setState({category:name_c,question: q, option1: o1, option2: o2, option3: o3, option4: o4, found:f});
    });
  }

  async componentWillReceiveProps () {

    const { navigation } = this.props;
    const cat = navigation.getParam('category', 'NO-Category');
    const name_c=navigation.getParam('name_c','NO-NameCategory');
    axios.post(API_HOST+"/game", {
      category_id: cat
      }, {
        headers: { 'Authorization' : await AsyncStorage.getItem('userToken')}
    })
    .then(response => JSON.parse(JSON.stringify(response)))
    .then(response => {
      const f =JSON.parse(JSON.stringify(response.data.Found));
      const q =JSON.parse(JSON.stringify(response.data.Pregunta));
      const o1 =JSON.parse(JSON.stringify(response.data.Opcion1));
      const o2 =JSON.parse(JSON.stringify(response.data.Opcion2));
      const o3 =JSON.parse(JSON.stringify(response.data.Opcion3));
      const o4 =JSON.parse(JSON.stringify(response.data.Opcion4));
      this.setState({category:name_c,question: q, option1: o1, option2: o2, option3: o3, option4: o4, found:f});
    });
  }

  

  render() {
    const { navigation } = this.props;
    const c = navigation.getParam('name_c', 'NO-Category');
    const found= this.state.found;
    const q=this.state.question;
    const opcion1=this.state.option1;
    const opcion2=this.state.option2;
    const opcion3=this.state.option3;
    const opcion4=this.state.option4;
    return (
        <View style={styles.container}>

            <Text style={styles.espacio}> {"\n"} </Text>
            <Text style={styles.getStartedText}> {c} </Text>
            <Text style={styles.espacio}> {"\n"} </Text>
            <View style={styles.containerImage}>
              <Image style={{width:250, height:250, resizeMode:'contain', alignSelf:'center',}} 
                      source={
                        c=="Ciencia" ? require('../assets/images/Ciencia.png')
                                      : c=="Historia" ? require('../assets/images/Historia.png')
                                                      : c=="Arte" ? require('../assets/images/Arte.png')
                                                                  : c=="Geografia" ? require('../assets/images/Geografia.png')
                                                                                    : c=="Entretenimiento"? require('../assets/images/Entretenimiento.png')
                                                                                                          : c=="Deporte"? require('../assets/images/Deporte.png')
                                                                                                                        : require('../assets/images/icon.png')
                      }
                />
            </View>
            
            <View style={styles.button}>
                {found ? ( <Button color={'rgba(48, 136, 63,1)'} title= ' JUGAR ' onPress={ () => this.props.navigation.navigate('Game', {'category':c, 'question':q,'option1':opcion1, 'option2': opcion2, 'option3':opcion3,'option4':opcion4})}  />) 
                       : ( <Text> No hay preguntas sin responder en esta categoría, vuelve a intentarlo </Text>)
                }
                <Text style={styles.espacio}> {"\n"} </Text>
                <Button color={'#663399'} title= ' VOLVER ' onPress ={() => this.props.navigation.navigate('Home')} />
            </View>
          
        </View>
    )}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    contentContainer: {
      paddingTop: 30,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    button: {
      margin: 80,
    },
    espacio: {
      fontSize: 10,
      textAlign: 'center',
      margin: 2,
    },
    getStartedText: {
      fontSize: 27,
      color: '#000000',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });
