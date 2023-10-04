import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RoutineScreen from '../screens/RoutineScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoveScreen from '../screens/LoveScreen';
import { Image, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let icon = focused == true ? require('../images/home_pink_icon.png') : require('../images/home_icon.png');
                    return <Image source={icon} style={styles.tabIcon} />
                },
                tabBarActiveTintColor: '#DC447A',
            }} />
            <Tab.Screen name="Love" component={LoveScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let icon = focused == true ? require('../images/heart_pink_icon.png') : require('../images/heart_icon.png');
                    return <Image source={icon} style={styles.tabIcon} />
                },
                tabBarActiveTintColor: '#DC447A',
            }} />
            <Tab.Screen name="Routine" component={RoutineScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let icon = focused == true ? require('../images/routine_pink_icon.png') : require('../images/routine_icon.png');
                    return <Image source={icon} style={styles.tabIcon} />
                },
                tabBarActiveTintColor: '#DC447A',
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ focused }) => {
                    let icon = focused == true ? require('../images/profile_pink_icon.png') : require('../images/profile_icon.png');
                    return <Image source={icon} style={styles.tabIcon} />
                },
                tabBarActiveTintColor: '#DC447A',
            }} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabIcon: {
        width: 24,
        height: 24,
    },
});

