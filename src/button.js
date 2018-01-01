import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  WebView,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';

/* npm */
import SafeAreaView from 'react-native-safe-area-view';

/* client */
import twitter from './client';

/* dimensions */
const { height, width } = Dimensions.get('window')

export default class TWLoginButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      authUrl: null
    }
  }

  static defaultProps = {
    children: "Login with Twitter",
    callbackUrl: null,
    containerStyle: null,
    style: null,
    textStyle: null,
    headerColor: "#efefef",
    headerStyle: null,
    closeStyle: null,
    closeText: "close",
    closeTextStyle: null,
    onGetAccessToken: () => { },
    onClose: () => { },
    onSuccess: () => { },
    onError: () => { },
  }

  onNavigationStateChange = async (webViewState) => {
    if (match = webViewState.url.match(/\?oauth_token=.+\&oauth_verifier=(.+)/)) {
      this.setState({
        isVisible: false
      })

      /* get access token */
      let token
      try {
        token = await twitter.getAccessToken(match[1])
      } catch (err) {
        console.warn(`[getAccessToken failed] ${err}`)
        this.props.onError(err)

        return false
      }

      await this.props.onGetAccessToken(token)

      /* get account */
      let user
      try {
        user = await twitter.get("account/verify_credentials.json", { include_entities: false, skip_status: true, include_email: true })
      } catch (err) {
        console.warn(`[get("account/verify_credentials.json") failed] ${err}`)
        this.props.onError(err)

        return false
      }

      this.props.onSuccess(user)
    }
  }

  onButtonPress = async (e) => {
    this.setState({
      isVisible: true,
      authUrl: await twitter.getLoginUrl(this.props.callbackUrl)
    })
  }

  onClosePress = (e) => {
    this.setState({
      isVisible: false
    }, () => this.props.onClose(e))
  }

  render() {
    return (
      <View>
        <View style={[styles.container, this.props.containerStyle]}>
          <TouchableOpacity style={[styles.button, this.props.style]} onPress={this.onButtonPress}>
            <Text style={[styles.buttonText, this.props.textStyle]}>{this.props.children}</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={this.state.isVisible} animationType="slide" onRequestClose={() => { }}>
          <SafeAreaView style={[styles.safeArea, { backgroundColor: this.props.headerColor }]}>
            <View style={[styles.modalHeader, { backgroundColor: this.props.headerColor }, this.props.headerStyle]}>
              <TouchableOpacity onPress={this.onClosePress} style={[styles.closeButton, this.props.closeStyle]}>
                <Text style={[styles.closeButtonText, this.props.closeTextStyle]}>{this.props.closeText}</Text>
              </TouchableOpacity>
            </View>
            <WebView source={{ uri: this.state.authUrl }} onNavigationStateChange={this.onNavigationStateChange} />
          </SafeAreaView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    backgroundColor: "transparent"
  },
  button: {
    backgroundColor: "#1da1f2",
    paddingVertical: 16
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  closeButton: {
    padding: 16
  },
  closeButtonText: {
    fontSize: 16
  }
});