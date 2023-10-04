import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function LandingScreen() {
    const navigation = useNavigation();
    setInterval(() => {
        navigation.navigate('Started')
    }, 1000)
    return (
        <View style={styles.container}>
            <View style={styles.navigation}></View>
            <View style={styles.body}>
                <Image source={require('../images/full_logo.png')} style={styles.luvmeLogo} />
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