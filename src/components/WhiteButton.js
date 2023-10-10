import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

export default function WhiteButton(props) {
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
        borderRadius: 20,
        paddingVertical: 10,
        alignSelf: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#ED8AA8',
    },
    btnText: {
        color: '#ED8AA8',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})