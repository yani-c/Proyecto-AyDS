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

export default class GameScreen extends React.Component {
  static navigationOptions = {
    title: 'Juego'
  };

  constructor(props){
    super(props);
    this.state = {category:"",
      question: "", option1:"",option2:"",option3:"",option4:"",
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
      console.log(response.data);
      const q =JSON.parse(JSON.stringify(response.data.Pregunta));
      const o1 =JSON.parse(JSON.stringify(response.data.Opcion1));
      const o2 =JSON.parse(JSON.stringify(response.data.Opcion2));
      const o3 =JSON.parse(JSON.stringify(response.data.Opcion3));
      const o4 =JSON.parse(JSON.stringify(response.data.Opcion4));
      this.setState({category:name_c,question: q, option1: o1, option2: o2, option3: o3, option4: o4});
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
      console.log(response.data);
      const q =JSON.parse(JSON.stringify(response.data.Pregunta));
      const o1 =JSON.parse(JSON.stringify(response.data.Opcion1));
      const o2 =JSON.parse(JSON.stringify(response.data.Opcion2));
      const o3 =JSON.parse(JSON.stringify(response.data.Opcion3));
      const o4 =JSON.parse(JSON.stringify(response.data.Opcion4));
      this.setState({category:name_c,question: q, option1: o1, option2: o2, option3: o3, option4: o4});
    });
  }

  

  render() {
    const c=this.state.category;
    const q=this.state.question;
    const opcion1=this.state.option1.description;
    const opcion2=this.state.option2.description;
    const opcion3=this.state.option3.description;
    const opcion4=this.state.option4.description;
    var id1 = this.state.option1.id;
    var id2 = this.state.option2.id;
    var id3 = this.state.option3.id;
    var id4 = this.state.option4.id;
    return (
        <View style={styles.container}>          
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.getStartedContainer}>
                    <Text style={styles.getStartedText}>
                    Categoria: {JSON.stringify(c)}
                    </Text>
                     <Text style={styles.getQuestionText}>
                       Pregunta: {q.description}
                     </Text>
                     <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5}>
                     <Button title= ' 1 ' onPress ={() => this.props.navigation.navigate('Answer', {'desc': opcion1, 'ident': id1})} 
                     />
                     <View style={styles.SeparatorLine} />
                     <Text style={styles.getStartedText}>
                      : {opcion1}
                     </Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5}>
                     <Button title= ' 2 ' onPress ={() => this.props.navigation.navigate('Answer', {'desc': opcion2, 'ident': id2})} 
                     />
                     <View style={styles.SeparatorLine} />
                     <Text style={styles.getStartedText}>
                      : {opcion2}
                     </Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5}>
                     <Button title= ' 3 ' onPress ={() => this.props.navigation.navigate('Answer', {'desc': opcion3, 'ident': id3})}
                     />
                     <View style={styles.SeparatorLine} />
                     <Text style={styles.getStartedText}>
                      : {opcion3}
                     </Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5}>
                     <Button title= ' 4 ' onPress ={() => this.props.navigation.navigate('Answer', {'desc': opcion4, 'ident': id4})} 
                     />
                     <View style={styles.SeparatorLine} />
                     <Text style={styles.getStartedText}>
                      : {opcion4}
                     </Text>
                     </TouchableOpacity>
                
                </View>
            </ScrollView>
        </View>
    )};

}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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

    },
    getOptionText:{
      alignItems: 'center',
      fontSize: 20,

    },SeparatorLine :{
 
      backgroundColor : '#fff',
      width: 1,
      height: 40
       
      },  
      ButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
       // backgroundColor: '#485a96',
        borderWidth: 0.5,
       // borderColor: '#fff',
        height: 40,
        width: 220,
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
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
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
  });
