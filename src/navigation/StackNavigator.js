import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionScreen from '../screens/QuestionScreen';
import ResultScreen from '../screens/ResultScreen';
import FillInfoScreen from '../screens/FillInfoScreen';
import BottomTabNavigator from './BottomTabNavigator'
import ProductDetailScreen from '../screens/ProductDetailScreen';
import SourceScreen from '../screens/SourceScreen';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="FillInfo">
            <Stack.Screen name="FillInfo" component={FillInfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Question" component={QuestionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Result" component={ResultScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Detail" component={ProductDetailScreen} />
            <Stack.Screen name="Source" component={SourceScreen} />
        </Stack.Navigator>
    )
}
export default StackNavigator;