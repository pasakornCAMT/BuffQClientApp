import React, { Component } from 'react';
import Router from './system/Router'
import Login from './components/screens/Login'
import FirebaseService from './services/firebase-service';
import InitialApp from './components/screens/InitialApp';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      isUserAuthenticated: false,
      isAppReady: false,
    })
  }
  componentWillMount() {
    FirebaseService.auth().onAuthStateChanged((user) => {
      this.setState({ isUserAuthenticated: !!user, isAppReady: true });
    })
  }
  render() {
    const { isAppReady, isUserAuthenticated } = this.state;
    return (
      isAppReady ? (
        isUserAuthenticated ? (
          <Router />
        ) : (
            <Login />
          )
      ) : (
          <InitialApp />
        )
    )
  }
}
