import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../api/categories'
import CategoryView from '../components/CategoryView';

export default function HomeScreen() {
    const [categories, setCategories] = useState([]);
    async function getAllCategories() {
        const data = await getCategories();
        setCategories(data)
    }
    useEffect(() => {
        getAllCategories()
    }, [])
    return (
        <View style={styles.container}>
            <CategoryView categories={categories} />
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