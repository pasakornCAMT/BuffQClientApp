import { AppRegistry } from 'react-native';
import App from './src/App';
import React from 'react';

//For dismiss the warning message
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
console.ignoredYellowBox = [ 'Setting a timer' ]

//For redux
import {Provider} from 'react-redux'
import configureStore from './configureStore'

const store = configureStore()

const ReduxApp = () => (
  <Provider store={store}>
    <App/>
  </Provider>
)
AppRegistry.registerComponent('BuffQClientApp', () => ReduxApp);
