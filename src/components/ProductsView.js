import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { addProductToFavorites, getFavoriteProducts, removeProductFromFavorites } from '../api/products';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFonts, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { ActivityIndicator } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const numCol = 2;
const columnWidth = windowWidth / numCol;

export default function ProductsView({ products }) {
    const [loading, setLoading] = useState(false)
    const [fontsLoaded] = useFonts({
        Quicksand_700Bold,
    })
    const navigation = useNavigation();
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    async function getFavorites() {
        try {
            setLoading(true)
            const products = await getFavoriteProducts();
            setFavoriteProducts(products)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            getFavorites()
        }, [])
    );

    const toggleFavorite = async (product) => {
        const foundFavoriteProduct = favoriteProducts.find((favoriteProduct) => favoriteProduct.productResponse.productId === product.productId);
        if (foundFavoriteProduct) {
            console.log("remove", product.productId)
            await removeProductFromFavorites(foundFavoriteProduct.favoriteId);
            getFavorites()
        } else {
            console.log("add", product.productId)
            await addProductToFavorites(product.productId);
            getFavorites()
        }
    };
    if (!fontsLoaded) {
        return null
    }
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={true} size='large' color='#DC447A' />
            </View>
        )
    }
    return (
        <FlatList
            style={styles.container}
            data={products}
            keyExtractor={(item) => item.productId}
            numColumns={numCol}
            renderItem={({ item }) => (
                <View style={styles.column}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Detail', { product: item })
                    }}>
                        <Image source={{ uri: item.productImage }} style={styles.image} />
                    </TouchableOpacity>
                    <View style={styles.actionView}>
                        <Text style={styles.productTitle}>{item.productName}</Text>
                        <TouchableOpacity onPress={() => toggleFavorite(item)} style={{ position: 'absolute', top: 10, right: 5 }}>
                            <Image
                                source={
                                    (() => {
                                        let isFavorite = false;
                                        favoriteProducts.forEach((favoriteProduct) => {
                                            if (favoriteProduct.productResponse.productId === item.productId) {
                                                isFavorite = true;
                                            }
                                        });
                                        return isFavorite ? require('../../assets/images/heart_pink_icon.png') : require('../../assets/images/heart_icon.png');
                                    })()
                                }
                                style={{ width: 15, height: 15 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    column: {
        width: columnWidth,
        padding: 10,
    },
    image: {
        borderColor: '#ED8AA8',
        borderWidth: 1,
        width: columnWidth - 20,
        height: columnWidth - 20,
        resizeMode: 'contain',
    },
    productTitle: {
        fontSize: 16,
        color: '#DC447A',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 20,
        fontFamily: 'Quicksand_700Bold',
    },
    actionView: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
