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
  static navigationOptions = ({ navigation }) => {
    return{
    title:  navigation.getParam('name_c', 'NO-Category'),
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
};

  constructor(props){
    super(props);
    this.state = {category_name:"Categoria",
      question: "", option1:"",option2:"",option3:"",option4:"", found:"",
    };
  }

  game= async()=> {

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
      this.setState({show:"question",category:name_c,question: q, option1: o1, option2: o2, option3: o3, option4: o4, found:f});
    });
  }

  jump = async () => {
    axios.get(API_HOST+"/randomCategory", {
          headers: { 'Authorization' : await AsyncStorage.getItem('userToken')}
    })
    .then(response => JSON.parse(JSON.stringify(response)))
    .then(response => {
      const category= response.data.cat ;
      const name=response.data.name;
      this.setState({show:""});
      this.props.navigation.navigate('Category',{'category': category,'name_c':name});
    })
  };

  answer(option,id){
    this.setState({show:""});
    this.props.navigation.navigate('Answer', {'desc': option, 'ident': id})
  }

  show(){
    if(this.state.show=="question" && this.state.found){
      const q = this.state.question;
      const opcion1=this.state.option1.description;
      const opcion2=this.state.option2.description;
      const opcion3=this.state.option3.description;
      const opcion4=this.state.option4.description;
      var id1 = this.state.option1.id;
      var id2 = this.state.option2.id;
      var id3 = this.state.option3.id;
      var id4 = this.state.option4.id;
      return(
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
              <Button color={'rgba(48, 136, 63,1)'} title= ' 1 ' onPress ={() => this.answer(opcion1,id1)} />
              <Text style={styles.opcionStyleText}> {opcion1} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5}>
              <Button color={'rgba(48, 136, 63,1)'} title= ' 2 ' onPress ={() => this.answer(opcion2,id2)} />
              <Text style={styles.opcionStyleText}> {opcion2}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5}>
              <Button color={'rgba(48, 136, 63,1)'} title= ' 3 ' onPress ={() => this.answer(opcion3,id3)}/>
              <Text style={styles.opcionStyleText}> {opcion3}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5}>
              <Button color={'rgba(48, 136, 63,1)'} title= ' 4 ' onPress ={() => this.answer(opcion4,id4)} />
              <Text style={styles.opcionStyleText}> {opcion4}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonSaltear}>
            <Button color={'#663399'} title= 'Saltear Pregunta' onPress={this.jump}/>
          </View>                  
        </ScrollView>
    </View>
        );
    }
    else if(this.state.show=="question" && !this.state.found){
      const { navigation } = this.props;
      const c = navigation.getParam('name_c', 'NO-Category');
      return(
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
            <Text> No hay preguntas sin responder en esta categoría, vuelve a intentarlo </Text>
            <Text style={styles.espacio}> {"\n"} </Text>
            <Button color={'#663399'} title= ' VOLVER ' onPress ={() => this.props.navigation.navigate('Home')} />
        </View>
      
    </View>
      );
    }
    else{
      const { navigation } = this.props;
      const c = navigation.getParam('name_c', 'NO-Category');
      const found= this.state.found;
      const q=this.state.question;
      const opcion1=this.state.option1;
      const opcion2=this.state.option2;
      const opcion3=this.state.option3;
      const opcion4=this.state.option4;
      return(
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
             <Button color={'rgba(48, 136, 63,1)'} title= ' JUGAR ' onPress={ () => this.game()}/>
            
            <Text style={styles.espacio}> {"\n"} </Text>
            <Button color={'#663399'} title= ' VOLVER ' onPress ={() => this.props.navigation.navigate('Home')} />
        </View>
      
    </View>
      );
    }
  }

  

  render() {
    return (
      <View style={styles.container}> 
        {this.show()}
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
    pregunta: {
      backgroundColor: '#663399',
      borderRadius:15,
      margin: 15,
    },
    button: {
      margin: 80,
    },
    buttonSaltear: {
      margin: 50,
      borderRadius: 5,
    },
    espacio: {
      fontSize: 10,
      textAlign: 'center',
      margin: 2,
    },
    opciones: {
      alignItems: 'center',
    },
    getStartedText: {
      fontSize: 27,
      color: '#000000',
      textAlign: 'center',
      fontWeight: 'bold',
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

