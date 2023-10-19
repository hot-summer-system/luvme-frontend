import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import StartedScreen from './src/screens/StartedScreen';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { login } from './src/api/login'
import LandingScreen from './src/screens/LandingScreen';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "478792066490-grou5eeq1v3si2vijsrekthoki1n6ier.apps.googleusercontent.com",
    androidClientId:
      "478792066490-8t3jseoocv250kh32kp953k8t6chs4q8.apps.googleusercontent.com"
  })

  const checkLocalUser = async () => {
    try {
      await AsyncStorage.clear();
      await signOut(FIREBASE_AUTH);
      setLoading(true)
      const userJSON = await AsyncStorage.getItem("@user")
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(userData)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, credential)
    }
  }, [response])

  useEffect(() => {
    checkLocalUser();
    const unSub = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          await AsyncStorage.setItem("idToken", idToken);
          const data = await login();
          setUserInfo(data)
          await AsyncStorage.setItem("@user", JSON.stringify(data))
        } catch (error) {
          console.error("Error during user data retrieval:", error);
        }
      } else {
        setUserInfo(null)
        await AsyncStorage.removeItem("idToken")
        await AsyncStorage.removeItem("@user")
        console.log("User is not authenticated")
      }
    })
    return () => unSub()
  }, [])

  if (loading) return (
    <View style={styles.container}>
      <LandingScreen />
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
