import React from 'react';
import {
  StatusBar,
  View,
  Platform,
} from 'react-native';

import AppWithNavigationState from 'app/src/navigation/AppNavigator';

function Navigation() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      {Platform.OS === 'android' && <View style={{ height: 24, backgroundColor: 'rgba(0,0,0,0.2)' }} />}
      <AppWithNavigationState />
    </View>
  );
}

export default Navigation;
