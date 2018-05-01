import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  WebView,
} from 'react-native';

/* npm */
import SafeAreaView from 'react-native-safe-area-view';

/* client */
import twitter from '../client';
import styles from './styles';

export default class TWLoginButton extends React.Component {
  static defaultProps = {
    children: 'Login with Twitter',
    callbackUrl: null,
    containerStyle: null,
    style: null,
    textStyle: null,
    headerColor: '#efefef',
    headerStyle: null,
    closeStyle: null,
    closeText: 'close',
    closeTextStyle: null,
    onPress: () => { },
    onGetAccessToken: () => { },
    onClose: () => { },
    onSuccess: () => { },
    onError: () => { },
  }

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      authUrl: null,
    };

    this.token = null;
    this.user = null;
  }

  onNavigationStateChange = async (webViewState) => {
    const match = webViewState.url.match(/\?oauth_token=.+\&oauth_verifier=(.+)/);

    if (match.length > 0) {
      this.setState({
        isVisible: false,
      });

      /* get access token */
      try {
        this.token = await twitter.getAccessToken(match[1]);
      } catch (err) {
        console.warn(`[getAccessToken failed] ${err}`);
        this.props.onError(err);

        return false;
      }

      await this.props.onGetAccessToken(this.token);

      /* get account */
      try {
        this.user = await twitter.get('account/verify_credentials.json', { include_entities: false, skip_status: true, include_email: true });
      } catch (err) {
        console.warn(`[get("account/verify_credentials.json") failed] ${err}`);
        this.props.onError(err);

        return false;
      }

      this.props.onSuccess(this.user);

      return true;
    }

    return false;
  }

  onButtonPress = async (e) => {
    await this.props.onPress(e);

    this.setState({
      isVisible: true,
      authUrl: await twitter.getLoginUrl(this.props.callbackUrl),
    });
  }

  onClosePress = async (e) => {
    this.setState({
      isVisible: false,
    }, () => this.props.onClose(e));
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
