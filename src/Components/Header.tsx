import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ViewStyle,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 44 : 56,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#a7a7aa',
  },
  closeButton: {
    paddingHorizontal: 16,
  },
});

type Props = {
  headerColor: string;
  style: ViewStyle;
  closeText: string,
  onClose: (e: any) => void;
}

function Header(props: Props) {
  return (
    <View style={[styles.container, { backgroundColor: props.headerColor }, props.style]}>
      <TouchableOpacity onPress={props.onClose} style={styles.closeButton}>
        <Text style={{ fontSize: 18, color: '#333' }}>{props.closeText}</Text>
      </TouchableOpacity>
    </View>
  );
}

Header.defaultProps = {
  headerColor: '#f7f7f7',
  style: null,
  closeText: 'close',
  onClose: () => { },
};

export default Header;
