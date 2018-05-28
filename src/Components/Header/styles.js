import { StyleSheet, Platform } from 'react-native';

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

export default styles;
