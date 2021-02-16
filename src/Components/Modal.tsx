import React from 'react';
import {
  Modal,
  SafeAreaView,
} from 'react-native';

/* npm */
import WebView, { WebViewNavigation } from 'react-native-webview';

/* components */
import Header from './Header';

type PackageProps = {
  visible: boolean,
  authURL: string,
  onClosePress: () => void,
  onWebViewStateChanged: (webViewState: WebViewNavigation) => void,
}

export type Props = {
  headerColor?: string,
  textColor?: string,
  closeText?: string,
  renderHeader?: (props: { onClose: () => void }) => React.ReactElement,
}

function TWLoginModal(props: Props & PackageProps) {
  return (
    <Modal visible={props.visible} animationType="slide" onRequestClose={() => { }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: props.headerColor }}>
        {props.renderHeader ? props.renderHeader({ onClose: props.onClosePress })
          : <Header textColor={props.textColor} headerColor={props.headerColor} onClose={props.onClosePress} closeText={props.closeText} />}
        <WebView
          startInLoadingState
          source={{ uri: props.authURL }}
          onNavigationStateChange={props.onWebViewStateChanged}
        />
      </SafeAreaView>
    </Modal>
  );
}

TWLoginModal.defaultProps = {
  headerColor: '#f7f7f7',
  closeText: 'close',
  renderHeader: null,
};

export default TWLoginModal;
