import React from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal,
  WebView,
} from 'react-native';

/* npm */
import SafeAreaView from 'react-native-safe-area-view';

/* components */
import Header from './Header';

/* client */
import twitter from '../client';

interface Props {
  type: string,
  headerColor: string,
  callbackUrl: string,
  onPress(e: any): void,
  onGetAccessToken(token: string): void,
  onClose(e: any): void,
  onSuccess(user: any): void,
  onError(err: any): void,
  renderHeader(props: any): React.ReactElement<{}>,
}

interface State {
  isVisible: boolean,
  authURL: string,
}

class TWLoginButton extends React.Component<Props, State> {
  static defaultProps = {
    type: 'TouchableOpacity',
    headerColor: '#f7f7f7',
    callbackUrl: null,
    onPress: () => { },
    onGetAccessToken: () => { },
    onClose: () => { },
    onError: () => { },
    renderHeader: (props = {}) => <Header {...props} />,
  }

  constructor(props: any) {
    super(props);

    this.state = {
      isVisible: false,
      authURL: '',
    };

    this.token = '';
    this.user = null;
  }

  onNavigationStateChange = async (webViewState: any) => {
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

  onButtonPress = async (e: any): Promise<void> => {
    await this.props.onPress(e);

    this.setState({
      isVisible: true,
      authURL: await twitter.getLoginUrl(this.props.callbackUrl),
    });
  }

  onClose = (e: any) => {
    this.setState({
      isVisible: false,
    }, () => this.props.onClose(e));
  }

  token!: any

  user!: any

  renderHeader = (props: any) => {
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
        <Modal
          visible={this.state.isVisible}
          animationType="slide"
          onRequestClose={() => { }
          }
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: this.props.headerColor }}>
            {this.renderHeader({ headerColor: this.props.headerColor, onClose: this.onClose })}
            <WebView source={{ uri: this.state.authURL }} onNavigationStateChange={this.onNavigationStateChange} />
          </SafeAreaView>
        </Modal>
      </Component>
    );
  }
}

export default TWLoginButton;
