import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
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

interface Props {
  headerColor: string,
  style: any,
  onClose(e: any): void
}

const Header = (props: Props) => (
  <View style={[styles.container, { backgroundColor: props.headerColor }, props.style]}>
    <TouchableOpacity onPress={props.onClose} style={styles.closeButton}>
      <Text style={{ fontSize: 18, color: '#333' }}>close</Text>
    </TouchableOpacity>
  </View>
);

Header.defaultProps = {
  headerColor: '#f7f7f7',
  style: null,
  onClose: () => { },
};

export default Header;
