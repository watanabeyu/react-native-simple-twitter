import React from 'react';
import { StatusBar, View, Platform } from 'react-native';
import { Provider } from 'react-redux';

import { configureStore } from 'rnstexampleapp/src/store';
import AppWithNavigationState from 'rnstexampleapp/src/navigation/AppNavigator';
import store from 'rnstexampleapp/src/store';

export default class Navigation extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        {Platform.OS === "android" && <View style={{ height: 24, backgroundColor: 'rgba(0,0,0,0.2)' }} />}
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      </View>
    );
  }
}
