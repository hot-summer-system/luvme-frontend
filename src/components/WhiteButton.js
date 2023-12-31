import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useFonts, Merriweather_700Bold } from '@expo-google-fonts/merriweather';

export default function WhiteButton(props) {
    const [fontsLoaded] = useFonts({
        Merriweather_700Bold,
    })
    if (!fontsLoaded) {
        return null
    }
    return (
        <TouchableOpacity onPress={props.onClick} style={styles.btn} disabled={props.isDisabled}>
            <Text style={styles.btnText}>{props.text}</Text>
        </TouchableOpacity>
    )
}
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    btn: {
        width: windowWidth - 140,
        marginTop: 10,
        borderRadius: 30,
        paddingVertical: 12,
        alignSelf: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#ED8AA8',
    },
    btnText: {
        color: '#ED8AA8',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Merriweather_700Bold'
    },
})