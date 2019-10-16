import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  StyleSheet,
} from 'react-native';

/* import twitter */
import twitter from 'react-native-simple-twitter';

/* img */
const okImg = require('app/assets/images/ok_man.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
  },
  name: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#1da1f2',
    paddingVertical: 16,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
});

function HomeScreen(props) {
  const [user, setUser] = useState(null);

  const onButtonPress = (e) => {
    twitter.post('statuses/update.json', { status: 'テストツイート！(Test Tweet!)' }).then((r) => {
      if (!r.errors) {
        Alert.alert(
          'Success',
          'ツイートできました',
          [
            {
              text: 'ok',
              onPress: () => console.log('ok'),
            },
          ],
        );
      } else {
        console.warn(r);
      }
    });
  };

  const onLogoutButtonPress = async (e) => {
    await AsyncStorage.removeItem('user');
    twitter.setAccessToken(null, null);
    props.navigation.replace('Login');
  };

  useEffect(() => {
    setUser(props.navigation.getParam('user', null));
  }, []);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 32 }}>
        <Image source={okImg} style={{ width: 184, height: 200 }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{`${user.name} @${user.screen_name}`}</Text>
        <Text style={styles.description}>{user.description}</Text>
        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonText}>Tweetする</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#cfcfcf', marginTop: 40 }]} onPress={onLogoutButtonPress}>
          <Text style={styles.buttonText}>ログアウトする</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  headerTitle: 'ホーム',
};

export default HomeScreen;
