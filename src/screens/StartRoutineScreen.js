import React, { useState } from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useFonts, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import { Merriweather_700Bold } from '@expo-google-fonts/merriweather';
import { useNavigation, useRoute } from '@react-navigation/native';
import PinkButton from '../components/PinkButton';

const screenWidth = Dimensions.get('window').width;
const StartRoutineScreen = () => {
    const navigation = useNavigation()
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fontsLoaded] = useFonts({
        Merriweather_700Bold,
        Quicksand_400Regular
    })
    const route = useRoute();
    const { routingProductResponses } = route.params

    const currentResponse = routingProductResponses[currentIndex];
    if (!fontsLoaded) {
        return null
    }
    return (
        <ScrollView style={styles.container}>
            {currentResponse && (
                <View>
                    <Image source={{ uri: currentResponse.productResponse.productImage }} style={styles.image} />
                    <View>
                        {currentResponse.productResponse.productManualResponses.map((step, index) => (
                            <View key={index}>
                                <Text style={styles.title}>{step.nameStep}</Text>
                                <Text style={styles.description}>{step.description}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            marginBottom: 50,
                            marginTop: 10
                        }}>
                            {currentIndex < routingProductResponses.length - 1 ? (
                                <PinkButton text="Next Step" onClick={() => setCurrentIndex(currentIndex + 1)} />
                            ) : (
                                <PinkButton text="Done" onClick={() => { navigation.navigate('Root', { screen: 'Routine' }) }} />
                            )}
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: screenWidth,
        height: screenWidth,
        resizeMode: 'contain',
        borderBottomLeftRadius: 190,
        borderBottomRightRadius: 190,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        color: '#DC447A',
        marginTop: 10,
        fontFamily: 'Merriweather_700Bold',
        marginHorizontal: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#DC447A',
        fontFamily: 'Quicksand_400Regular',
        marginHorizontal: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
})

export default StartRoutineScreen;
