import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {

  constructor() {
    super();
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        // failed auth initial attempt
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginSuccess() {
    this.setState({ email: '', password: '', error: '', loading: false });
  }

  onLoginFail() {
    this.setState({ error: 'Authentication failed', loading: false });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    } 
    return (
      <Button onPress={this.onButtonPress}>
        Log in
      </Button>
    ); 
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input 
            label="Email"
            placeholder="user@gmail.com"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Password"
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            secureTextEntry
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20, 
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
