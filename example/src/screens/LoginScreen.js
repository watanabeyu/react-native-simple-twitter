import React from 'react'
import {
  View,
  Text,
  Alert,
  StyleSheet
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Constants } from 'expo'

/* import twitter */
import twitter, { TWLoginButton, decodeHTMLEntities, getRelativeTime } from 'react-native-simple-twitter'

@connect(
  state => ({
    user: state.user
  })
)
export default class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation
    const { params = {} } = navigation.state

    return {
      header: null
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      isVisible: false,
      authUrl: null
    }

    console.log(decodeHTMLEntities("&amp; &apos; &#x27; &#x2F; &#39; &#47; &lt; &gt; &nbsp; &quot;"))
    console.log(getRelativeTime(new Date(new Date().getTime() - 32390)))
    console.log(getRelativeTime("Thu Apr 06 15:28:43 +0000 2017"))
  }

  async componentWillMount() {
    if (this.props.user.token) {
      twitter.setAccessToken(this.props.user.token, this.props.user.token_secret)

      try {
        const user = await twitter.get("account/verify_credentials.json", { include_entities: false, skip_status: true, include_email: true })
        this.props.dispatch({ type: "USER_SET", user: user })

        this.props.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' })
          ]
        }))
      } catch (err) {
        console.log(err)
      }
    }
  }

  onGetAccessToken = ({ oauth_token, oauth_token_secret }) => {
    this.props.dispatch({ type: "TOKEN_SET", token: oauth_token, token_secret: oauth_token_secret })
  }

  onSuccess = (user) => {
    this.props.dispatch({ type: "USER_SET", user: user })

    Alert.alert(
      "Success",
      "ログインできました",
      [
        {
          text: 'Go HomeScreen',
          onPress: () => {
            this.props.dispatch(NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' })
              ]
            }))
          }
        }
      ]
    )
  }

  onClose = (e) => {
    console.log("press close button")
  }

  onError = (err) => {
    console.log(err)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Login</Text>
        </View>
        <TWLoginButton headerColor={Constants.manifest.primaryColor}
          containerStyle={styles.loginContainer}
          style={styles.loginButton}
          textStyle={styles.loginButtonText}
          onGetAccessToken={this.onGetAccessToken}
          onSuccess={this.onSuccess}
          closeText="閉じる"
          closeTextStyle={styles.loginCloseText}
          onClose={this.onClose}
          onError={this.onError}>Twitter IDではじめる</TWLoginButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.manifest.primaryColor
  },
  title: {
    flex: 1,
    padding: 64
  },
  titleText: {
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold"
  },
  loginContainer: {
    paddingHorizontal: 32,
    marginBottom: 64,
    backgroundColor: "transparent"
  },
  loginButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 64,
    overflow: "hidden"
  },
  loginButtonText: {
    color: Constants.manifest.primaryColor,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  loginCloseText: {
    color: "#fff",
    fontWeight: "bold"
  }
})