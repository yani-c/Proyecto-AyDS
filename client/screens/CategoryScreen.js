import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from 'react-native';

import axios from 'axios';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class CategoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Categoria',
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
    this.state = {category:"",
      question: "", option1:"",option2:"",option3:"",option4:"", found:"",
    };
  }

  async componentWillMount () {
    console.log("por el prim");
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
      console.log(response.data);
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
    console.log("por seg");
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
      console.log(response.data);
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
    console.log(found);
    console.log(c);
    if(found == true){
      console.log('chau');
    }
    else{
      console.log('hola');
    }
    return (
        <View style={styles.container}>          
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.getStartedContainer}>
                    <Text style={styles.getStartedText}>
                    Categoria: {c}
                    </Text>
                     <Text style={styles.welcome}> {"\n"} {"\n"} </Text>
                     <Button color={'rgba(48, 136, 63,1)'} title= ' Volver al menu ' onPress ={() => this.props.navigation.navigate('Home')} 
                     />
                       {found ? (
                        <Button color={'rgba(48, 136, 63,1)'} title= ' Ver pregunta ' onPress={ () => this.props.navigation.navigate('Game', {'category':c, 'question':q,'option1':opcion1, 'option2': opcion2, 'option3':opcion3,'option4':opcion4})}  />
                          ) : (
                        <Text> No hay preguntas sin responder en esta categoría, vuelve a intentarlo </Text>
                      )}
                </View>
            </ScrollView>
        </View>
    )}

}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#9370db',
    },
    developmentModeText: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 14,
      lineHeight: 19,
      textAlign: 'center',
    },
    contentContainer: {
      paddingTop: 30,
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginTop: 3,
      marginLeft: -10,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    getQuestionText:{
      alignItems: 'center',
      fontSize: 30,
      color: 'rgba(255, 255, 255, 1)',

    },
    getOptionText:{
      alignItems: 'center',
      fontSize: 20,

    },SeparatorLine :{
 
      backgroundColor : '#fff',
      width: 0,
      height: 40
       
      },  
      ButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(48, 136, 63,1)',
        borderWidth: 0.5,
       // borderColor: '#fff',
        height: 40,
        width: 300,
        borderRadius: 5,
        margin: 5,
      },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 27,
      color: '#f8f8ff',
      lineHeight: 28,
      textAlign: 'center',
      textShadowColor:'#585858', 
      textShadowOffset:{width: 5, height: 5}, 
      textShadowRadius:10, 
    },
    opcionStyle: {
      fontSize: 17,
      color: 'rgba(255, 255, 255, 1)',
      lineHeight: 24,
      textAlign: 'left',
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
    },
    navigationFilename: {
      marginTop: 5,
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
    logout: {
      fontSize: 14,
      color: '#2e78b7',
      textAlign: 'center',
    },
    textshadow:{ 
 
      fontSize:30, 
    
      color:'#ffff00', 
    
      paddingLeft:10, 
    
      paddingRight:10, 
    
      textShadowColor:'#585858', 
    
      textShadowOffset:{width: 5, height: 5}, 
    
      textShadowRadius:10, 
    
      },
  });
