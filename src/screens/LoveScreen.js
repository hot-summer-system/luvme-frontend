import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function LoveScreen() {
  return (
    <View style={styles.container}>
      <Text>LoveScreen</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
  },
})