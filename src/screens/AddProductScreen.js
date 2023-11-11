import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../api/categories'
import { ActivityIndicator } from 'react-native-paper';
import CategoryRoutineView from '../components/CategoryRoutineView';

export default function AddProductScreen() {
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([]);
    async function getAllCategories() {
        try {
            setLoading(true)
            const data = await getCategories();
            data.sort((a, b) => a.categoryId - b.categoryId);
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
            <CategoryRoutineView categories={categories} />
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