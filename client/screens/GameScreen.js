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
    title: 'Juego',
    headerStyle: {
      backgroundColor: '#663399',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      textAlign: 'center',
      flexGrow:0.8, 
      alignSelf:'center',
      fontWeight: 'bold',
    },
  };

  constructor(props){
    super(props);
    this.state = {category:"",
      question: "", option1:"",option2:"",option3:"",option4:"",
    };
  }

  render() {
    const { navigation } = this.props;
    const c=navigation.getParam('category', 'NO-Category');
    const q=navigation.getParam('question', 'NO-Question');
    const opcion1=(navigation.getParam('option1', 'NO-Option1')).description;
    const opcion2=(navigation.getParam('option2', 'NO-Option2')).description;
    const opcion3=(navigation.getParam('option3', 'NO-Option3')).description;
    const opcion4=(navigation.getParam('option4', 'NO-Option4')).description;
    var id1 = (navigation.getParam('option1', 'NO-Option1')).id;
    console.log("a ver");
    console.log(id1);
    var id2 = (navigation.getParam('option2', 'NO-Option2')).id;
    var id3 = (navigation.getParam('option3', 'NO-Option3')).id;
    var id4 = (navigation.getParam('option4', 'NO-Option4')).id;
    console.log(id1);
    return (
        <View style={styles.container}>          
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.getStartedContainer}>
                    <Text style={styles.getStartedText}>
                    Categoria: {c}
                    </Text>
                    <Text style={styles.welcome}> {"\n"} {"\n"} </Text> 
                     <Text style={styles.textshadow}>
                        ¿{q.description}
                     </Text>
                     <Text style={styles.welcome}> {"\n"} {"\n"} </Text>
                     <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5}>
                     <Button color={'rgba(48, 136, 63,1)'} title= ' 1 ' onPress ={() => this.props.navigation.navigate('Answer', {'desc': opcion1, 'ident': id1})} 
                     />
                     <View style={styles.SeparatorLine} />
                     <Text style={styles.opcionStyle}>
                       {opcion1}
                     </Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5}>
                     <Button color={'rgba(48, 136, 63,1)'} title= ' 2 ' onPress ={() => this.props.navigation.navigate('Answer', {'desc': opcion2, 'ident': id2})} 
                     />
                     <View style={styles.SeparatorLine} />
                     <Text style={styles.opcionStyle}>
                       {opcion2}
                     </Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5}>
                     <Button color={'rgba(48, 136, 63,1)'} title= ' 3 ' onPress ={() => this.props.navigation.navigate('Answer', {'desc': opcion3, 'ident': id3})}
                     />
                     <View style={styles.SeparatorLine} />
                     <Text style={styles.opcionStyle}>
                       {opcion3}
                     </Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5}>
                     <Button color={'rgba(48, 136, 63,1)'} title= ' 4 ' onPress ={() => this.props.navigation.navigate('Answer', {'desc': opcion4, 'ident': id4})} 
                     />
                     <View style={styles.SeparatorLine} />
                     <Text style={styles.opcionStyle}>
                       {opcion4}
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
      backgroundColor: '#FFFFFF',
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
      color: '#000000',

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
      color: '#000000',
      lineHeight: 28,
      textAlign: 'center',
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
    
      color:'#191970', 
    
      paddingLeft:10, 
    
      paddingRight:10, 
    
      },
  });
