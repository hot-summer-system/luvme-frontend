import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

export default function PinkButton(props) {
  return (
    <TouchableOpacity onPress={props.onClick} style={styles.btn}>
      <Text style={styles.btnText}>{props.text}</Text>
    </TouchableOpacity>
  )
}
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  btn: {
    width: windowWidth - 100,
    marginTop: 10,
    backgroundColor: '#ED8AA8',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})