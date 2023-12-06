import { View, Text, Image, StyleSheet, Dimensions, Linking, ScrollView } from 'react-native'
import React from 'react'
import PinkButton from '../components/PinkButton'
import { useRoute } from '@react-navigation/native'
import { useFonts, Quicksand_700Bold, Quicksand_400Regular } from '@expo-google-fonts/quicksand';

const screenWidth = Dimensions.get('window').width;

export default function ProductDetailScreen() {
    const [fontsLoaded] = useFonts({
        Quicksand_700Bold,
        Quicksand_400Regular
    })
    const route = useRoute();
    const { product } = route.params
    const openExternalLink = (url) => {
        Linking.openURL(url).catch((err) => console.error('Can\'t open this link: ', err));
    };
    if (!fontsLoaded) {
        return null
    }
    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: product.productImage }} style={styles.image} />
            <Text style={styles.productTitle}>{product.productName}</Text>
            <View style={{ marginTop: 15, marginBottom: 10 }}>
                <PinkButton text="Shopping" onClick={() => openExternalLink(product.productAffiliate)} />
            </View>
            <Text style={styles.productTitle}>Characteristics</Text>
            {product.productCharacteristicsResponses.map((characteristic) => (
                <View key={characteristic.productCharacteristicId}>
                    <Text style={styles.description}>• {characteristic.characteristicResponse.description}</Text>
                </View>
            ))}
            <Text style={styles.productTitle}>Ingredients</Text>
            {product.productIngredientResponses.map((ingredient) => (
                <View key={ingredient.productIngredientId}>
                    <Text style={styles.description}>• {ingredient.ingredientResponse.name}: {ingredient.ingredientResponse.description}</Text>
                </View>
            ))}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    image: {
        width: screenWidth,
        height: screenWidth,
        resizeMode: 'contain',
    },
    productTitle: {
        fontSize: 24,
        color: '#DC447A',
        marginTop: 10,
        fontFamily: 'Quicksand_700Bold',
        marginLeft: 5,
    },
    description: {
        fontSize: 16,
        color: '#DC447A',
        fontFamily: 'Quicksand_400Regular',
        marginLeft: 10,
    }
})