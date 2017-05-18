import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDbwpp2jgUhSerlknmslCiw392wDXPzDfw',
      authDomain: 'udemy-reactnative-auth.firebaseapp.com',
      databaseURL: 'https://udemy-reactnative-auth.firebaseio.com',
      projectId: 'udemy-reactnative-auth',
      storageBucket: 'udemy-reactnative-auth.appspot.com',
      messagingSenderId: '30703267482'
    });
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        <LoginForm />
      </View>
    );
  }
}

export default App;
