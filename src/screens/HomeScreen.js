import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../api/categories'
import CategoryView from '../components/CategoryView';
import LandingScreen from './LandingScreen';

export default function HomeScreen() {
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState([]);
    async function getAllCategories() {
        const data = await getCategories();
        setCategories(data)
        setIsLoading(false)
    }
    useEffect(() => {
        setIsLoading(true)
        getAllCategories()
    }, [])
    if (isLoading) {
        return (
            <LandingScreen />
        )
    }
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