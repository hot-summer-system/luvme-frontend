import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getFirstQuestion, getQuestion } from '../api/questions';


export default function QuestionScreen() {
    const navigation = useNavigation();
    const [questions, setQuestions] = useState([]);
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        async function get1Question() {
            const data = await getFirstQuestion();
            setQuestions([...questions, data]);
        }
        get1Question();
    }, []);


    const handleAnswerPress = (answerId) => {
        setSelectedAnswerId(answerId);
    };

    const handleNextQuestion = async () => {
        const resultId = questions[currentQuestionIndex].answers.find(function (answer) {
            return answer.answerId == selectedAnswerId;
        }).resultId
        if (resultId) {
            const data = await getQuestion(questions[currentQuestionIndex]?.answers.linkedQuestionId);
            setQuestions([...questions, data]);
            setSelectedAnswerId(null);
            setCurrentQuestionIndex(questions.length);
        } else {
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
            console.log(questions)
        } else {
            // Handle end of questions (e.g., navigate to result screen)
            console.log('This is the first question');
        }
    };

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
                        <Text style={[styles.answerButtonText, item.answerId === selectedAnswerId && styles.selectedAnswerText]}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.previousButton} onPress={handlePreviousQuestion}>
                <Text style={styles.nextButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                <Text style={styles.nextButtonText}>Continue</Text>
            </TouchableOpacity>
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
    nextButton: {
        position: 'absolute',
        width: 250,
        height: 50,
        bottom: 170,
        marginTop: 50,
        marginHorizontal: 50,
        backgroundColor: '#ED8AA8',
        borderRadius: 50,
        padding: 12,
    },
    previousButton: {
        position: 'absolute',
        width: 250,
        height: 50,
        bottom: 100,
        marginTop: 50,
        marginHorizontal: 50,
        backgroundColor: '#ED8AA8',
        borderRadius: 50,
        padding: 12,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

