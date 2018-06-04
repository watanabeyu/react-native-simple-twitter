import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal,
  WebView,
} from 'react-native';

/* npm */
import SafeAreaView from 'react-native-safe-area-view';

/* components */
import Header from '../Header';

/* client */
import twitter from '../../client';
import styles from './styles';

export default class TWLoginButton extends React.Component {
  static defaultProps = {
    type: 'TouchableOpacity',
    headerColor: '#f7f7f7',
    callbackUrl: null,
    onPress: () => { },
    onGetAccessToken: () => { },
    onClose: () => { },
    onSuccess: () => { },
    onError: () => { },
    renderHeader: props => <Header {...props} />,
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
    const match = webViewState.url.match(/\?oauth_token=.+&oauth_verifier=(.+)/);

    if (match && match.length > 0) {
      this.setState({
        isVisible: false,
      });

      /* get access token */
      try {
        const response = await twitter.getAccessToken(match[1]);

        if (response.errors) {
          throw new Error(JSON.stringify(response.errors));
        }

        this.token = response;
      } catch (err) {
        console.warn(`[getAccessToken failed] ${err}`);
        this.props.onError(err);

        return false;
      }

      await this.props.onGetAccessToken(this.token);

      /* get account */
      try {
        const response = await twitter.get('account/verify_credentials.json', { include_entities: false, skip_status: true, include_email: true });

        if (response.errors) {
          throw new Error(JSON.stringify(response.errors));
        }

        this.user = response;
      } catch (err) {
        console.warn(`[get("account/verify_credentials.json") failed] ${err}`);
        this.props.onError(err);

        return false;
      }

      await this.props.onSuccess(this.user);

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

  onClose = async (e) => {
    this.setState({
      isVisible: false,
    }, () => this.props.onClose(e));
  }

  renderHeader = (props) => {
    if (this.props.renderHeader) {
      return React.cloneElement(this.props.renderHeader(props), props);
    }

    return <Header {...props} />;
  }

  render() {
    let Component;

    switch (this.props.type) {
      case 'TouchableOpacity':
        Component = TouchableOpacity;
        break;
      case 'TouchableHighlight':
        Component = TouchableHighlight;
        break;
      case 'TouchableWithoutFeedback':
        Component = TouchableWithoutFeedback;
        break;
      default:
        console.warn('TWLoginButton type must be TouchableOpacity or TouchableHighlight or TouchableWithoutFeedback');
        return null;
    }

    return (
      <Component {...this.props} onPress={this.onButtonPress}>
        {this.props.children}
        <Modal visible={this.state.isVisible} animationType="slide" onRequestClose={() => { }}>
          <SafeAreaView style={[styles.safeArea, { backgroundColor: this.props.headerColor }]}>
            {this.renderHeader({ headerColor: this.props.headerColor, onClose: this.onClose })}
            <WebView source={{ uri: this.state.authUrl }} onNavigationStateChange={this.onNavigationStateChange} />
          </SafeAreaView>
        </Modal>
      </Component>
    );
  }
}
