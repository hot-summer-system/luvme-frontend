import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function PinkButton(props) {
  return (
    <View>
      <TouchableOpacity onPress={props.onClick} style={styles.btn}>
        <Text style={styles.btnText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  btn: {
    marginTop: 50,
    marginHorizontal: 50,
    backgroundColor: '#ED8AA8',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})