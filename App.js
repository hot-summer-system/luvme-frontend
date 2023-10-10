import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import StartedScreen from './src/screens/StartedScreen';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "1001644222317-cud4si99aso4rjvjcej6ih1lujv96mq5.apps.googleusercontent.com",
    androidClientId:
      "1001644222317-me5ll5alj4kmp9gu3mdrh65be44sa69f.apps.googleusercontent.com"
  })
  const checkLocalUser = async () => {
    try {
      setLoading(true)
      const userJSON = await AsyncStorage.getItem("@user")
      const userData = userJSON ? JSON.parse(userJSON) : null;
      console.log("local:", userData)
      setUserInfo(userData)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (response?.type == "success") {
      console.log(response.params)
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, credential)
    }
  }, [response])

  useEffect(() => {
    checkLocalUser();
    const unSub = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        console.log(user.getIdToken())
        setUserInfo(user)
        await AsyncStorage.setItem("@user", JSON.stringify(user))
      } else {
        console.log("User is not authenticated")
      }
    })
    return () => unSub()
  }, [])

  if (loading) return (
    <View>
      <ActivityIndicator size={'large'} />
    </View>
  )
  return (
    <View style={styles.container}>
      <NavigationContainer>
        {userInfo ? <StackNavigator /> : <StartedScreen promptAsync={promptAsync} />}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
