import React from 'react'
import { AppLoading, Asset, Font, Constants } from 'expo'
import Navigation from 'app/src'

/* npm */
import twitter from 'react-native-simple-twitter'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoadingComplete: false
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={(error) => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      )
    }
    else {
      return <Navigation />
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('app/assets/images/icon.png'),
        require('app/assets/images/ok_man.png')
      ]),
      twitter.setConsumerKey(Constants.manifest.extra.twitter.consumerKey, Constants.manifest.extra.twitter.consumerKeySecret)
    ])
  };
}