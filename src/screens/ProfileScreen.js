import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PinkButton from '../components/PinkButton'
import signOut from 'firebase/auth'
import { FIREBASE_AUTH } from '../../firebase'

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <PinkButton text="Sign Out" onClick = {async() => await signOut(FIREBASE_AUTH)}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})