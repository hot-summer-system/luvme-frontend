import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { getResultById } from '../api/questions';
import PinkButton from '../components/PinkButton';

export default function ResultScreen() {
    const navigation = useNavigation();
    const [result, setResult] = useState(null)
    const route = useRoute();
    const resultId = route.params?.resultId;
    useEffect(() => {
        async function getResult() {
            const data = await getResultById(resultId);
            setResult(data)
        }
        getResult()
    }, [])
    return (
        <>
            {result && (
                <View style={styles.container}>
                    <Image
                        source={require('../images/full_logo.png')}
                        style={styles.image}
                    />
                    <Text style={styles.resultText}>{result.content}</Text>
                    {/* <View style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>Feature of your skin</Text>
                        <Text style={styles.infoText}>{result.feature1}</Text>
                        <Text style={styles.infoText}>{result.feature2}</Text>
                    </View> */}
                    <View style={{ position: 'absolute', bottom: 50 }}>
                        <PinkButton text='Skincare Routines' />
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
        width: 480,
        height: 200,
        resizeMode: 'cover',
    },
    resultText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
    },
});