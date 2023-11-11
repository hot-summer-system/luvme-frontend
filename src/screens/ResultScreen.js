import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { getResultById } from '../api/questions';
import PinkButton from '../components/PinkButton';
import { useFonts, Quicksand_700Bold, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import { ActivityIndicator } from 'react-native-paper';


export default function ResultScreen() {
    const [fontsLoaded] = useFonts({
        Quicksand_700Bold,
        Quicksand_400Regular,
    })
    const navigation = useNavigation();
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const route = useRoute();
    const resultId = route.params.resultId;
    async function getResult() {
        try {
            setLoading(true);
            const data = await getResultById(resultId);
            setResult(data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getResult()
    }, [])
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
        <>
            {result && (
                <View style={styles.container}>
                    <Image
                        source={{ uri: result?.image }}
                        style={styles.image}
                    />
                    <Text style={styles.resultText}>{result?.content}</Text>
                    <View style={{ position: 'absolute', bottom: 50 }}>
                        <PinkButton onClick={() => navigation.navigate('Root', { screen: 'Routine' })} text='Routine' />
                        <PinkButton onClick={() => navigation.navigate('Root', { screen: 'Home' })} text='Recommend' />
                    </View>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        marginTop: 50,
        width: 300,
        height: 500,
        resizeMode: 'cover',
    },
    resultText: {
        fontSize: 24,
        marginBottom: 20,
        color: '#DC447A',
        fontFamily: 'Quicksand_700Bold'
    },
    infoContainer: {
        width: '80%',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    infoTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'Quicksand_400Regular'
    },
});