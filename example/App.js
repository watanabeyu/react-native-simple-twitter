import React from 'react';
import { AppLoading } from 'expo';
import Constants from 'expo-constants';
import Navigation from 'app/src';

/* npm */
import twitter from 'react-native-simple-twitter';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
    };
  }

  loadResourcesAsync = async () => Promise.all([
    twitter.setConsumerKey(Constants.manifest.extra.twitter.consumerKey, Constants.manifest.extra.twitter.consumerKeySecret),
  ]);

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={(error) => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    return <Navigation />;
  }
}
