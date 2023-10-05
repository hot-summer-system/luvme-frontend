import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { useNavigation } from '@react-navigation/native'
import { login } from '../api/login'
import PinkButton from '../components/PinkButton'
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth'
import { GoogleSigninButton, GoogleSignin } from '@react-native-google-signin/google-signin'

const slides = [
    {
        image: require('../images/skintone.png'),
        title: 'Skintone',
        caption: 'Discover your unique skin tone and its specific characteristics to make informed skincare choices'
    },
    {
        image: require('../images/products.png'),
        title: 'Find products',
        caption: 'Search for a wide range of high-quality skincare and beauty products that match your unique skin type and preferences.'
    },
    {
        image: require('../images/skincare.png'),
        title: 'Skincare',
        caption: 'Personalize your skincare routine with expert recommendations and tips tailored to your individual skin needs.'
    },
]

export default function StartedScreen() {
    const navigation = useNavigation();
    // GoogleSignin.configure({
    //     webClientId: "252404852599-bfgeti42ibci6pto0rkcmjps90chu5oa.apps.googleusercontent.com",
    // })
    const onGoogleButtonPress = async () => {
        // Check if your device supports Google Play
        // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // // Get the users ID token
        // const { idToken } = await GoogleSignin.signIn();
        // await AsyncStorage.setItem('idToken', idToken);
        const data = await login();
        console.log(data);
        const userId = data.userId;
        if (data.status === "NONFULLFILL") {
            navigation.navigate('FillInfo', { userId });
        } else if (data.isTest === false) {
            navigation.navigate('Questions')
        } else {
            navigation.navigate('Home')
        }
    }
    return (
        <View style={styles.container}>
            <Swiper
                style={styles.wrapper}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                loop
                autoplay
            >
                {slides.map((slide, index) => (
                    <View key={index}
                        style={styles.slide}
                    >
                        <Image source={slide.image} style={styles.image} />
                        <Text style={styles.title}>{slide.title}</Text>
                        <Text style={styles.caption}>{slide.caption}</Text>
                    </View>
                ))}
            </Swiper>
            <View style={{ height: 200 }}>
                <Text style={styles.signUpText}>Signup now, to save your progress & analysis</Text>
                <GoogleSigninButton
                    style={styles.signUpButton}
                    title="Google Sign-In"
                    onPress={() => onGoogleButtonPress()}
                />
                <PinkButton onClick={() => navigation.navigate('Root', { screen: 'Home' })} text="Home" />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    wrapper: {},
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    activeDot: {
        backgroundColor: '#ED8AA8',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        marginTop: 40,
        height: 200,
        width: 'auto',
        marginStart: 10,
        marginEnd: 10,
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderRadius: 4,
        // borderColor: '#ED8AA8',
        resizeMode: 'contain'
    },
    title: {
        marginTop: 40,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    caption: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 5,
    },
    signUpText: {
        textAlign: 'center',
        fontSize: 20,
    },
    signUpButton: {
    },
})