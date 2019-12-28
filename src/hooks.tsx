import React, { useEffect, useState, useCallback } from 'react';
import { NativeModules } from 'react-native';

/* node_modules */
import { WebViewNavigation } from 'react-native-webview';

/* client */
import client from './client';
import { ErrorResponse, AccessToken, TwitterUser } from './types';
import Modal, { Props as ModalProps } from './Components/Modal';

type Props = {
  onSuccess: (user: TwitterUser, accessToken: AccessToken) => void,
  onError?: (err: ErrorResponse) => void,
}

const useTwitter = (props?: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [authURL, setAuthURL] = useState<string>('');
  const [webViewState, setWebViewState] = useState<WebViewNavigation | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const login = async (callback_url?: string) => {
    const url: string = await client.getLoginUrl(callback_url);

    setAuthURL(url);
    setVisible(true);
  };

  const clearCookies = (callback: (result: boolean) => void = () => { }) => {
    NativeModules.Networking.clearCookies(callback);
  };

  const TWModal = useCallback((modalProps: ModalProps) => {
    const onWebViewStateChanged = (webViewNavigation: WebViewNavigation) => {
      setWebViewState(webViewNavigation);
    };

    return (
      <Modal
        visible={visible}
        authURL={authURL}
        onClosePress={() => setVisible(false)}
        onWebViewStateChanged={onWebViewStateChanged}
        headerColor={modalProps.headerColor}
        closeText={modalProps.closeText}
        renderHeader={modalProps.renderHeader}
      />
    );
  }, [visible]);

  useEffect(() => {
    if (webViewState) {
      const match = webViewState.url.match(/\?oauth_token=.+&oauth_verifier=(.+)/);

      if (match && match.length > 0) {
        setVisible(false);
        setAuthURL('');

        client.getAccessToken(match[1]).then((response) => {
          client.setAccessToken(response.oauth_token, response.oauth_token_secret);

          setLoggedIn(true);
        }).catch((err) => {
          console.warn(`[getAccessToken failed] ${err}`);

          if (props?.onError) {
            props.onError(err);
          }
        });
      }
    }
  }, [webViewState]);

  useEffect(() => {
    if (loggedIn && props?.onSuccess) {
      const options = {
        include_entities: false,
        skip_status: true,
        include_email: true,
      };

      client.api<TwitterUser>('GET', 'account/verify_credentials.json', options).then((response) => {
        props.onSuccess(response, { oauth_token: client.Token, oauth_token_secret: client.TokenSecret });

        setLoggedIn(false);
      }).catch((err) => {
        console.warn(`[get("account/verify_credentials.json") failed] ${err}`);

        if (props?.onError) {
          props.onError(err);
        }

        setLoggedIn(false);
      });
    }
  }, [loggedIn]);

  return {
    twitter: {
      login,
      clearCookies,
      getAccessToken: (): AccessToken => ({ oauth_token: client.Token, oauth_token_secret: client.TokenSecret }),
      setAccessToken: client.setAccessToken,
      setConsumerKey: client.setConsumerKey,
      api: client.api,
      post: client.post,
      get: client.get,
    },
    TWModal,
  };
};

export default useTwitter;
