import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PinkButton from '../components/PinkButton'
import WhiteButton from '../components/WhiteButton'
import { FIREBASE_AUTH } from '../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native-paper'
import { signOut } from 'firebase/auth'
import { useFonts, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

export default function ProfileScreen() {
  const [fontsLoaded] = useFonts({
    Quicksand_700Bold,
  })
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  const logOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
    } catch (e) {
      console.log(e)
    }
  }
  const getUserData = async () => {
    try {
      const userJSON = await AsyncStorage.getItem("@user")
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUser(userData)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { getUserData() }, [])
  if (!fontsLoaded) {
    return null
  }
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size='large' color='#DC447A' />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.name}>User: {user?.email}</Text>
      <View style={{
        position: 'absolute',
        bottom: 50
      }}>
        <WhiteButton text="Source" onClick={() => navigation.navigate('Source')} />
        <PinkButton text="Sign Out" onClick={() => logOut()} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    color: '#DC447A',
    marginLeft: 10,
    fontFamily: 'Quicksand_700Bold'
  }
})