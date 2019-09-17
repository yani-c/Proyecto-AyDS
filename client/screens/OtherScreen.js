import React from 'react';
import { Text } from 'react-native';

export default class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Entre a su cuenta',
  };

  render() {
    return (
      <Text> otra pantalla </Text>
    );
  }
}
