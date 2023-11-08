import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getFirstQuestion, getQuestion } from '../api/questions';
import PinkButton from '../components/PinkButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Quicksand_700Bold, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import { ActivityIndicator } from 'react-native-paper';


export default function QuestionScreen() {
    const [fontsLoaded] = useFonts({
        Quicksand_700Bold,
        Quicksand_400Regular,
    })
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [questions, setQuestions] = useState([]);
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    async function get1Question() {
        try {
            setLoading(true);
            const userJSON = await AsyncStorage.getItem("@user")
            const userData = userJSON ? JSON.parse(userJSON) : null;
            if (userData.isTest !== false) {
                navigation.navigate('Root', { screen: 'Home' })
            }
            const data = await getFirstQuestion();
            setQuestions([...questions, data]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        get1Question();
    }, []);


    const handleAnswerPress = (answerId) => {
        setSelectedAnswerId(answerId);
    };

    const handleNextQuestion = async () => {
        const selectedAnswer = questions[currentQuestionIndex].answers.find((answer) => answer.answerId === selectedAnswerId);
        const resultId = selectedAnswer.resultId
        const linkedQuestionId = selectedAnswer.linkedQuestionId;
        if (linkedQuestionId) {
            const data = await getQuestion(linkedQuestionId);
            setQuestions([...questions, data]);
            setSelectedAnswerId(null);
            setCurrentQuestionIndex(questions.length);
        } else if (resultId) {
            const userJSON = await AsyncStorage.getItem("@user")
            const userData = userJSON ? JSON.parse(userJSON) : null
            userData.isTest = true;
            AsyncStorage.setItem("@user", JSON.stringify(userData))
            navigation.navigate("Result", { resultId });
        }
    };
    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            const newQuestions = [...questions];
            newQuestions.splice(currentQuestionIndex, 1)
            setQuestions(newQuestions)
            setSelectedAnswerId(null);
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
            console.log('This is the first question');
        }
    };
    if (!fontsLoaded) {
        return null
    }
    if (loading) return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} size='large' color='#DC447A' />
        </View>
    )
    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>{questions[currentQuestionIndex]?.content}</Text>
            <View style={styles.answerContainer}>
                {questions[currentQuestionIndex]?.answers.map((item) => (
                    <TouchableOpacity
                        key={item.answerId}
                        style={[
                            styles.answerButton,
                            item.answerId === selectedAnswerId && styles.selectedAnswer,
                        ]}
                        onPress={() => handleAnswerPress(item.answerId)}
                    >
                        <Text style={[styles.answerButtonText, item.answerId === selectedAnswerId && styles.selectedAnswerText]}>{item.content}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={{ position: 'absolute', bottom: 50 }}>
                <PinkButton onClick={() => handlePreviousQuestion()} text='Back' />
                <PinkButton onClick={() => handleNextQuestion()} text='Next' isDisable={selectedAnswerId ? false : true} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Quicksand_700Bold'
    },
    answerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    answerButton: {
        marginTop: 20,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ED8AA8',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    selectedAnswer: {
        backgroundColor: '#ED8AA8',
    },
    selectedAnswerText: {
        color: 'white',
    },
    answerButtonText: {
        color: '#ED8AA8',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

