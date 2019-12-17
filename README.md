# **If you have request, Please send a PR or issue.**
* please see [CHANGELOG.md](CHANGELOG.md)

# React-Native-Simple-Twitter v3.0
Twitter API client for React Native without `react-native link`.  
This package **don't use NativeModule**, only pure javascript.  
So don't need to use `react-native link` and [Expo](https://expo.io) can also easily use twitter API without auth0 and server.
  
You can use custom hooks from v3.0

```
...
import { useTwitter } from "react-native-simple-twitter";

function Login() {
  // if login, please set onSuccess
  const { twitter,TWModal } = useTwitter({
    onSuccess:(user,accessToken) => {
      console.log(user);
      console.log(accessToken);
    }
  });

  const onLoginPress = async () => {
    try {
      await twitter.login();
    } catch(e) {
      console.log(e.errors);
    }
  }

  useEffect(() => {
    twitter.setConsumerKey("key","secret");
  },[]);

  ...

  return (
    <View>
      <Text onPress={onLoginPress}>login</Text>
      <TWModal />
    </View>
  )
}
```
  
Checkout v3.x [example](example).  
  
Previous version -> [v2.4.1](https://github.com/watanabeyu/react-native-simple-twitter/tree/2759e423db803d31f50bdb24adcabbf43afd925d)

## Installation
This package use WebView, but WebView from react-native is deprecated, so you download with `react-native-webview`.
```bash
$ npm install react-native-simple-twitter react-native-webview --save
```

if you want to use more twitter types, use [abraham/twitter-d](https://github.com/abraham/twitter-d)
```bash
$ npm install --save-dev twitter-d
```

## Demo
![demo gif](extras/demo.gif)

## useTwitter API
```
import { useTwitter } from 'react-native-simple-twitter';

const { twitter, TWModal } = useTwitter({
  onSuccess:(user,accessToken) => void,
  onError?:(err) => void,
})
```

### useTwitter()
| Name | Description |
| --- | --- |
| `onSuccess:(user,accessToken) => void` | return loggedin user object and access token |
| `onError?:(err) => void` | if login failed, call this method |

### twitter
| Name | Description |
| --- | --- |
| `twitter.login()` | Get login url and open TWModal |
| `twitter.setConsumerKey(consumer_key,consumer_key_secret)` | set application key and secret |
| `twitter.getAccessToken()` | get access_token and access_token_secret, when user logged in app |
| `twitter.setAccessToken(access_token,access_token_secret)` | set user access_token and access_token_secret, when you already have access_token and access_token_secret |
| `twitter.api("GET" | "POST" | "PUT" | "DELETE" | "PATCH",endpoint,parameters?)` | call twitter api |
| `twitter.get(endpoint,parameters)` | alias of `twitter.api`. **this method will be deprecated** |
| `twitter.post(endpoint,parameters)` | alias of `twitter.api`. **this method will be deprecated** |

## Other API

* decodeHTMLEntities
```js
import { decodeHTMLEntities } from 'react-native-simple-twitter'

console.log(decodeHTMLEntities("&amp; &apos; &#x27; &#x2F; &#39; &#47; &lt; &gt; &nbsp; &quot;"))
```
Tweet is include htmlencoded characters.  
So this function decode special characters.

* getRelativeTime
```js
import { getRelativeTime } from 'react-native-simple-twitter'

console.log(getRelativeTime(new Date(new Date().getTime() - 32390)))
console.log(getRelativeTime("Thu Apr 06 15:28:43 +0000 2017"))
```
Tweet created_at convert to relative time.
ex) 1s 15m 23h