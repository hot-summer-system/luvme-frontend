import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Linking } from 'react-native';
import { useFonts, Quicksand_700Bold, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';

export default function SourceScreen() {
    const [fontsLoaded] = useFonts({
        Quicksand_700Bold,
        Quicksand_400Regular
    })
    const openExternalLink = (url) => {
        Linking.openURL(url).catch((err) => console.error('Can\'t open this link: ', err));
    };
    const linkIcons = [
        { name: 'Moisturizer', link: 'https://www.flaticon.com/free-icons/moisturizer' },
        { name: 'Cleanser', link: 'https://www.flaticon.com/free-icons/cleanser' },
        { name: 'Cleansing', link: 'https://www.flaticon.com/free-icons/cleansing' },
        { name: 'Foundation', link: 'https://www.flaticon.com/free-icons/foundation' },
        { name: 'Primer', link: 'https://www.flaticon.com/free-icons/primer' },
        { name: 'Concealer', link: 'https://www.flaticon.com/free-icons/concealer' },
        { name: 'Face-cover', link: 'https://www.flaticon.com/free-icons/face-cover' },
        { name: 'Cosmetic', link: 'https://www.flaticon.com/free-icons/cosmetic' },
        { name: 'Contour', link: 'https://www.flaticon.com/free-icons/contour' },
        { name: 'Blush brush', link: 'https://www.flaticon.com/free-icons/blush-brush' },
        { name: 'Beauty treatment', link: 'https://www.flaticon.com/free-icons/beauty-treatment' },
        { name: 'Skincare', link: 'https://www.flaticon.com/free-icons/skin-care' },
        { name: 'Soap', link: 'https://www.flaticon.com/free-icons/soap' },
        { name: 'Home', link: 'https://www.flaticon.com/free-icons/home-button' },
        { name: 'Heart', link: 'https://www.flaticon.com/free-icons/heart' },
        { name: 'User', link: 'https://www.flaticon.com/free-icons/user' },
        { name: 'Routine', link: 'https://www.flaticon.com/free-icons/routine' },
        { name: 'cancel', link: 'https://www.flaticon.com/free-icons/cancel' }

    ]
    const linkImages = [
        { name: 'Skintype by Freepik', link: 'https://www.freepik.com/free-vector/hand-drawn-skin-types-collection_12558233.htm#query=skin%20type&from_query=skintype&position=2&from_view=search&track=sph' },
        { name: 'Skintype  by Freepik', link: "https://www.freepik.com/free-vector/skin-types-differences-hand-drawn_12395470.htm#page=2&query=skin%20type&position=18&from_view=search&track=ais" },
        { name: 'Product  by Freepik', link: "https://www.freepik.com/free-photo/collection-beauty-products-with-copy-space_9377183.htm#query=makeup%20product&position=0&from_view=search&track=ais" },

    ]
    if (!fontsLoaded) {
        return null
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTile}>
                Icons:
            </Text>
            {linkIcons.map((item, index) => (
                <View key={index}>
                    <Text style={styles.title}>{item.name}</Text>
                    <TouchableOpacity onPress={() => openExternalLink(item.link)}>
                        <Text style={styles.link}>{item.link}</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <Text style={styles.sectionTile}>
                Images:
            </Text>
            {linkImages.map((item, index) => (
                <View key={index}>
                    <Text style={styles.title}>{item.name}</Text>
                    <TouchableOpacity onPress={() => openExternalLink(item.link)}>
                        <Text style={styles.link}>{item.link}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sectionTile: {
        fontSize: 24,
        color: '#DC447A',
        fontFamily: 'Quicksand_700Bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        color: '#DC447A',
        fontFamily: 'Quicksand_700Bold',
        textAlign: 'center',
    },
    link: {
        color: '#ED8AA8',
        fontFamily: 'Quicksand_400Regular',
        textAlign: 'center',
        marginBottom: 5,
        textDecorationLine: 'underline',
    }
})