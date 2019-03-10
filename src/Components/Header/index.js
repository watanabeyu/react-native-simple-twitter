import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

/* client */
import styles from './styles';

export default class Header extends React.Component {
  static defaultProps = {
    headerColor: '#f7f7f7',
    style: null,
    onClose: () => { },
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.headerColor }, this.props.style]}>
        <TouchableOpacity onPress={this.props.onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: "#333" }}>close</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
