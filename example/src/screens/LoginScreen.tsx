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
import { useTwitter, decodeHTMLEntities, getRelativeTime } from 'react-native-simple-twitter';

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
  const [me, setMe] = useState<any>({});
  const [token, setToken] = useState<{ oauth_token: string, oauth_token_secret: string }>({ oauth_token: null, oauth_token_secret: null });
  const { twitter, TWModal } = useTwitter({
    onSuccess: (user, accessToken) => {
      setMe(user);
      setToken(accessToken);
    },
  });

  const onLoginPress = async () => {
    try {
      await twitter.login();
    } catch (e) {
      console.log(e.errors);
    }
  };

  useEffect(() => {
    console.log(decodeHTMLEntities('&amp; &apos; &#x27; &#x2F; &#39; &#47; &lt; &gt; &nbsp; &quot;'));
    console.log(getRelativeTime(new Date(new Date().getTime() - 32390)));
    console.log(getRelativeTime('Thu Apr 06 15:28:43 +0000 2017'));

    /* check AsyncStorage */
    AsyncStorage.getItem('token').then(async (accessToken) => {
      if (accessToken !== null) {
        const userToken = JSON.parse(accessToken);
        twitter.setAccessToken(userToken.oauth_token, userToken.oauth_token_secret);

        const options = {
          include_entities: false,
          skip_status: true,
          include_email: true,
        };

        try {
          const response = await twitter.api('GET', 'account/verify_credentials.json', options);

          props.navigation.replace('Home', { user: response });
        } catch (e) {
          console.log(e.errors);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (token.oauth_token && token.oauth_token_secret && me) {
      const saveToAsyncStorage = async () => {
        await AsyncStorage.setItem('token', JSON.stringify(token));
        await AsyncStorage.setItem('user', JSON.stringify(me));

        Alert.alert(
          'Success',
          'ログインできました',
          [
            {
              text: 'Go HomeScreen',
              onPress: () => {
                props.navigation.replace('Home', { user: me });
              },
            },
          ],
        );
      };

      saveToAsyncStorage();
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Login</Text>
      </View>

      <TouchableOpacity style={{ padding: 40 }} onPress={onLoginPress}>
        <Text style={{ textAlign: 'center', color: '#fff' }}>Twitterでログインする</Text>
      </TouchableOpacity>

      <TWModal />
    </View>
  );
}

LoginScreen.navigationOptions = {
  header: null,
};

export default LoginScreen;
