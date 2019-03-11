import React from 'react';
import {
  View,
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

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      token: null,
      tokenSecret: null
    }
  }

  async componentDidMount() {
    console.log(decodeHTMLEntities('&amp; &apos; &#x27; &#x2F; &#39; &#47; &lt; &gt; &nbsp; &quot;'));
    console.log(getRelativeTime(new Date(new Date().getTime() - 32390)));
    console.log(getRelativeTime('Thu Apr 06 15:28:43 +0000 2017'));

    /* check AsyncStorage */
    try {
      const userData = await AsyncStorage.getItem("user");

      if (userData !== null) {
        const user = JSON.parse(userData);

        twitter.setAccessToken(user.token, user.tokenSecret);

        try {
          const user = await twitter.get('account/verify_credentials.json', { include_entities: false, skip_status: true, include_email: true });

          this.props.navigation.replace('Home', { user });
        } catch (err) {
          console.log(err);
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  onGetAccessToken = ({ oauth_token: token, oauth_token_secret: tokenSecret }) => {
    this.setState({
      token,
      tokenSecret
    })
  }

  onSuccess = async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify({ ...user, token: this.state.token, tokenSecret: this.state.tokenSecret }))
    }
    catch (err) {
      console.log(err)
    }

    Alert.alert(
      'Success',
      'ログインできました',
      [
        {
          text: 'Go HomeScreen',
          onPress: () => {
            this.props.navigation.replace('Home', { user });
          },
        },
      ],
    );
  }

  onPress = (e) => {
    console.log('button pressed');
  }

  onClose = (e) => {
    console.log('press close button');
  }

  onError = (err) => {
    console.log(err);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Login</Text>
        </View>
        <TWLoginButton
          style={{ width: '100%', height: 60 }}
          type="TouchableOpacity"
          onPress={this.onPress}
          onGetAccessToken={this.onGetAccessToken}
          onSuccess={this.onSuccess}
          onClose={this.onClose}
          onError={this.onError}
        >
          <Text style={{ textAlign: 'center', color: '#fff' }}>Twitterでログインする</Text>

        </TWLoginButton>
      </View>
    );
  }
}
