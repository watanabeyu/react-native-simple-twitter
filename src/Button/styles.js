import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#1da1f2',
    paddingVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  closeButton: {
    padding: 16,
  },
  closeButtonText: {
    fontSize: 16,
  },
});

export default styles;
