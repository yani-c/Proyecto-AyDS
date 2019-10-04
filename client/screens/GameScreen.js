import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

import axios from 'axios';

export default class GameScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('category', 'NO-Category'),
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
  };

  constructor(props){
    super(props);
    this.jump = this.jump.bind(this)
    this.state = {category:"",
      question: "", option1:"",option2:"",option3:"",option4:"",
    };
  }

  render() {
    const { navigation } = this.props;
    const q=navigation.getParam('question', 'NO-Question');
    const opcion1=(navigation.getParam('option1', 'NO-Option1')).description;
    const opcion2=(navigation.getParam('option2', 'NO-Option2')).description;
    const opcion3=(navigation.getParam('option3', 'NO-Option3')).description;
    const opcion4=(navigation.getParam('option4', 'NO-Option4')).description;
    var id1 = (navigation.getParam('option1', 'NO-Option1')).id;
    var id2 = (navigation.getParam('option2', 'NO-Option2')).id;
    var id3 = (navigation.getParam('option3', 'NO-Option3')).id;
    var id4 = (navigation.getParam('option4', 'NO-Option4')).id;
    return (
        <View style={styles.container}>          
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
              <Text style={styles.espacio}> </Text>
              <Text style={styles.espacio}> </Text>
              <View style={styles.pregunta}>
                <Text style={styles.espacio}> </Text> 
                <Text style={styles.textshadow}> ¿{q.description} </Text>
                <Text style={styles.espacio}> </Text>
              </View>
              <View style={styles.opciones}>
                <Text style={styles.espacio}> </Text>
                <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5}>
                  <Button color={'rgba(48, 136, 63,1)'} title= ' 1 ' onPress ={() => this.props.navigation.navigate('Answer', {'desc': opcion1, 'ident': id1})} />
                  <Text style={styles.opcionStyleText}> {opcion1} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5}>
                  <Button color={'rgba(48, 136, 63,1)'} title= ' 2 ' onPress ={() => this.props.navigation.navigate('Answer', {'desc': opcion2, 'ident': id2})} />
                  <Text style={styles.opcionStyleText}> {opcion2}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5}>
                  <Button color={'rgba(48, 136, 63,1)'} title= ' 3 ' onPress ={() => this.props.navigation.navigate('Answer', {'desc': opcion3, 'ident': id3})}/>
                  <Text style={styles.opcionStyleText}> {opcion3}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5}>
                  <Button color={'rgba(48, 136, 63,1)'} title= ' 4 ' onPress ={() => this.props.navigation.navigate('Answer', {'desc': opcion4, 'ident': id4})} />
                  <Text style={styles.opcionStyleText}> {opcion4}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonSaltear}>
                <Button color={'#663399'} title= 'Saltear Pregunta' onPress={this.jump}/>
              </View>                  
            </ScrollView>
        </View>
    )};


jump = async () => {
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
      backgroundColor: '#CDCDCD',
    },
    contentContainer: {
      paddingTop: 30,
    },
    pregunta: {
      backgroundColor: '#663399',
      borderRadius:15,
      margin: 15,
    },
    espacio: {
      fontSize: 8,
      textAlign: 'center',
      margin: 5,
    },
    buttonSaltear: {
      margin: 50,
      borderRadius: 5,
    },
    opciones: {
      alignItems: 'center',
    },
    ButtonStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(48, 136, 63,1)',
      borderWidth: 0.5,
      height: 40,
      width: 350,
      borderRadius: 5,
      margin: 5,
    },
    getStartedText: {
      fontSize: 27,
      color: '#000000',
      lineHeight: 28,
      textAlign: 'center',
    },
    opcionStyleText: {
      fontSize: 17,
      color: 'rgba(255, 255, 255, 1)',
      lineHeight: 24,
      textAlign: 'left',
    },
    textshadow:{ 
      fontSize:30, 
      color:'#FFFFFF', 
      paddingLeft:10, 
      paddingRight:10, 
    },
  });
