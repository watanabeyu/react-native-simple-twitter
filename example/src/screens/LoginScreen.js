import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

/* import twitter */
import twitter, { TWLoginButton, decodeHTMLEntities, getRelativeTime } from 'react-native-simple-twitter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  title: {
    flex: 1,
    padding: 64,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

function LoginScreen(props) {
  const [token, setToken] = useState({ token: null, tokenSecret: null });

  const onGetAccessToken = ({ oauth_token, oauth_token_secret }) => {
    setToken({ token: oauth_token, tokenSecret: oauth_token_secret });
  };

  const onSuccess = async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify({ ...user, ...token }));
    } catch (err) {
      console.log(err);
    }

    Alert.alert(
      'Success',
      'ログインできました',
      [
        {
          text: 'Go HomeScreen',
          onPress: () => {
            props.navigation.replace('Home', { user });
          },
        },
      ],
    );
  };

  const onPress = (e) => {
    console.log('button pressed');
  };

  const onClose = (e) => {
    console.log('press close button');
  };

  const onError = (err) => {
    console.log(err);
  };

  useEffect(() => {
    console.log(decodeHTMLEntities('&amp; &apos; &#x27; &#x2F; &#39; &#47; &lt; &gt; &nbsp; &quot;'));
    console.log(getRelativeTime(new Date(new Date().getTime() - 32390)));
    console.log(getRelativeTime('Thu Apr 06 15:28:43 +0000 2017'));

    /* check AsyncStorage */
    AsyncStorage.getItem('user').then((userData) => {
      if (userData !== null) {
        const user = JSON.parse(userData);
        twitter.setAccessToken(user.token, user.tokenSecret);

        const options = {
          include_entities: false,
          skip_status: true,
          include_email: true,
        };

        twitter.get('account/verify_credentials.json', options).then((response) => {
          props.navigation.replace('Home', { user });
        }).catch((err) => console.log(err));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Login</Text>
      </View>
      <TWLoginButton
        style={{ width: '100%', height: 60 }}
        type="TouchableOpacity"
        onPress={onPress}
        onGetAccessToken={onGetAccessToken}
        onSuccess={onSuccess}
        onClose={onClose}
        onError={onError}
        closeText="閉じる"
        renderHeader={(headerProps) => (
          <View>
            <TouchableOpacity style={{ justifyCntent: 'center', alignItems: 'center' }} onPress={headerProps.onClose}>
              <Text style={{ paddingVertical: 30 }}>close modal</Text>
            </TouchableOpacity>
          </View>
        )}
      >
        <Text style={{ textAlign: 'center', color: '#fff' }}>Twitterでログインする</Text>
      </TWLoginButton>
    </View>
  );
}

LoginScreen.navigationOptions = {
  header: null,
};

export default LoginScreen;
