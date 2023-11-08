import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../api/categories'
import CategoryView from '../components/CategoryView';
import { ActivityIndicator } from 'react-native-paper';

export default function HomeScreen() {
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([]);
    async function getAllCategories() {
        try {
            setLoading(true)
            const data = await getCategories();
            setCategories(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllCategories()
    }, [])
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={true} size='large' color='#DC447A' />
            </View>
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