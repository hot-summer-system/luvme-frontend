import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { addProductToFavorites, getFavoriteProducts, removeProductFromFavorites } from '../api/products';
import { useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const numCol = 2;
const columnWidth = windowWidth / numCol;

export default function ProductsView({ products }) {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    async function getFavorites() {
        const products = await getFavoriteProducts();
        setFavoriteProducts(products)
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

    return (
        <FlatList
            style={styles.container}
            data={products}
            keyExtractor={(item) => item.productId}
            numColumns={numCol}
            renderItem={({ item }) => (
                <View style={styles.column}>
                    <Image source={{ uri: item.productImage }} style={styles.image} />
                    <Text style={styles.productTitle}>{item.productName}</Text>
                    <TouchableOpacity onPress={() => toggleFavorite(item)}>
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
                            style={{ width: 20, height: 20 }}
                        />
                    </TouchableOpacity>
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
        fontWeight: 'bold',
        color: '#DC447A',
        width: columnWidth - 30,
        marginTop: 5,
    },
});
