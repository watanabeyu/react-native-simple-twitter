import React from 'react';
import { StatusBar, View, Platform } from 'react-native';
import { Provider } from 'react-redux';

import { configureStore } from 'app/src/store';
import AppWithNavigationState from 'app/src/navigation/AppNavigator';

export default class Navigation extends React.Component {
  store = configureStore()

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        {Platform.OS === "android" && <View style={{ height: 24, backgroundColor: 'rgba(0,0,0,0.2)' }} />}
        <Provider store={this.store}>
          <AppWithNavigationState />
        </Provider>
      </View>
    );
  }
}
