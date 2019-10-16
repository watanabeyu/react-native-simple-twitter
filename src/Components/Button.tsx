import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal,
  SafeAreaView,
} from 'react-native';

/* npm */
import WebView from 'react-native-webview';

/* components */
import Header from './Header';

/* client */
import twitter from '../client';

type Token = {
  oauth_token: string;
  oauth_token_secret: string;
}

type Props = {
  type: string;
  headerColor: string;
  callbackUrl: string;
  closeText: string;
  onPress: (e: any) => void;
  onGetAccessToken: (token: Token) => void;
  onClose: (e: any) => void;
  onSuccess: (user: any) => void;
  onError: (e: any) => void;
  renderHeader: (props: any) => React.ReactElement<{}>;
  children: any;
}

function TWLoginButton(props: Props) {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [authURL, setAuthURL] = useState<string>('');
  const [token, setToken] = useState<Token>({ oauth_token: '', oauth_token_secret: '' });

  let Component;
  switch (props.type) {
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

  const onButtonPress = async (e: any): Promise<void> => {
    await props.onPress(e);

    try {
      const loginURL = await twitter.getLoginUrl(props.callbackUrl);
      setAuthURL(loginURL);
    } catch (err) {
      console.warn(`[getLoginUrl failed] ${err}`);
    }
  };

  const onClosePress = (e: any) => {
    setVisible(false);
    props.onClose(e);
  };

  const onNavigationStateChange = async (webViewState: any) => {
    const match = webViewState.url.match(/\?oauth_token=.+&oauth_verifier=(.+)/);

    if (match && match.length > 0) {
      setVisible(false);

      /* get access token */
      try {
        const response = await twitter.getAccessToken(match[1]);

        if (response.errors) {
          throw new Error(JSON.stringify(response.errors));
        }

        setToken(response);
      } catch (err) {
        console.warn(`[getAccessToken failed] ${err}`);

        props.onError(err);
      }
    }
  };

  useEffect(() => {
    if (authURL !== '') {
      setVisible(true);
    }
  }, [authURL]);

  useEffect(() => {
    if (!isVisible) {
      setAuthURL('');
    }
  }, [isVisible]);

  useEffect(() => {
    if (token && token.oauth_token && token.oauth_token_secret) {
      props.onGetAccessToken(token);

      const options = {
        include_entities: false,
        skip_status: true,
        include_email: true,
      };

      twitter.get('account/verify_credentials.json', options).then((response) => {
        if (response.errors) {
          const err = JSON.stringify(response.errors);
          console.warn(`[get("account/verify_credentials.json") failed] ${err}`);

          props.onError(err);
        } else {
          props.onSuccess(response);
        }
      });
    }
  }, [token]);

  return (
    <Component {...props} onPress={onButtonPress}>
      {props.children}
      <Modal visible={isVisible} animationType="slide" onRequestClose={() => { }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: props.headerColor }}>
          {props.renderHeader ? props.renderHeader({ onClose: onClosePress })
            : <Header headerColor={props.headerColor} onClose={onClosePress} closeText={props.closeText} />}
          <WebView source={{ uri: authURL }} onNavigationStateChange={onNavigationStateChange} />
        </SafeAreaView>
      </Modal>
    </Component>
  );
}

TWLoginButton.defaultProps = {
  type: 'TouchableOpacity',
  headerColor: '#f7f7f7',
  callbackUrl: null,
  closeText: 'close',
  onPress: () => { },
  onGetAccessToken: () => { },
  onClose: () => { },
  onError: () => { },
  renderHeader: null,
  children: null,
};

export default TWLoginButton;
