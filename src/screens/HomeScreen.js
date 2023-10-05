import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductsView from '../components/ProductsView'
import { getSuitableProducts } from '../api/products'

export default function HomeScreen() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function getProducts() {
            const data = await getSuitableProducts();
            setProducts(data)
        }
        getProducts()
    }, [])
    return (
        <View style={styles.container}>
            <ProductsView products={products} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navigation: {
        flex: 2,
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
    },
})