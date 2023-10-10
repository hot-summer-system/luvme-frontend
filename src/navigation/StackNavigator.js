import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import StartedScreen from '../screens/StartedScreen';
import QuestionScreen from '../screens/QuestionScreen';
import ResultScreen from '../screens/ResultScreen';
import FillInfoScreen from '../screens/FillInfoScreen';
import BottomTabNavigator from './BottomTabNavigator'
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FillInfo" component={FillInfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Question" component={QuestionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Started" component={StartedScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
export default StackNavigator;