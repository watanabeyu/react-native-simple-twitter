import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

/* import twitter */
import twitter from 'react-native-simple-twitter'

@connect(
  state => ({
    user: state.user
  })
)
export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation
    const { params = {} } = navigation.state

    return {
      headerTitle: "ホーム"
    }
  }

  constructor(props) {
    super(props)
  }

  onButtonPress = (e) => {
    twitter.post("statuses/update.json", { status: "テストツイート！(Test Tweet!)" }).then(r => {
      if (!r.errors) {
        Alert.alert(
          "Success",
          "ツイートできました",
          [
            {
              text: 'ok',
              onPress: () => console.log("ok")
            }
          ]
        )
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 32, }}>
          <Image source={require('app/assets/images/ok_man.png')} style={{ width: 184, height: 200 }} />
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>{this.props.user.name} @{this.props.user.screen_name}</Text>
          <Text style={styles.description}>{this.props.user.description}</Text>
          <TouchableOpacity style={styles.button} onPress={this.onButtonPress}>
            <Text style={styles.buttonText}>Tweetする</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 32
  },
  name: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#1da1f2",
    paddingVertical: 16
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff"
  }
})