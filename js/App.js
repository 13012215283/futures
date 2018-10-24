/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { StackNavigator } from 'react-navigation';
import codePush from 'react-native-code-push';
import Screens from './screens';

const AppNavigator = StackNavigator(Screens, {
  initialRouteName: 'TabBar',
});

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

class App extends Component {
  render() {
    return (
      <AppNavigator
        onNavigationStateChange={(prevState, currentState) => {
          const currentScreen = getCurrentRouteName(currentState);
          DeviceEventEmitter.emit('NavigationStateChange', currentScreen);
        }}
      />
    );
  }
}

const FuturesApp = codePush(App);

export default FuturesApp;
