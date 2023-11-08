import { View, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function LandingScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.navigation}></View>
            <View style={styles.body}>
                <Image source={require('../../assets/images/full_logo.png')} style={styles.luvmeLogo} />
            </View>
            <View style={styles.footer}></View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navigation: {
        flex: 1,
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
    },
    luvmeLogo: {
        width: 480,
        height: 480,
    },
})