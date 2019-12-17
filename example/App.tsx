import React, { useState } from 'react';
import { AppLoading } from 'expo';
import Constants from 'expo-constants';
import Navigation from 'app/src';

/* npm */
import twitter from 'react-native-simple-twitter';

type Props = {
  skipLoadingScreen: boolean,
}

function App(props: Props) {
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);

  const loadResourcesAsync = async () => Promise.all([
    twitter.setConsumerKey(Constants.manifest.extra.twitter.consumerKey, Constants.manifest.extra.twitter.consumerKeySecret),
  ]);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={(error) => console.warn(error)}
        onFinish={() => setLoadingComplete(true)}
      />
    );
  }

  return <Navigation />;
}

export default App;
