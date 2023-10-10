import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Link } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const auth = FIREBASE_AUTH;
    const signIn = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }
    const signUp = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>
            {/* <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={onChangeEmail}
                placeholder={'Email'}
                clearButtonMode='always'
                keyboardType='email-address'
            />
            <TextInput
                style={styles.inputBox}
                value={password}
                onChangeText={onChangePassword}
                placeholder={'Password'}
                clearButtonMode='always'
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={signIn} style={styles.btn}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signUp} style={styles.btn}>
                <Text style={styles.btnText}>Sign up</Text>
            </TouchableOpacity>
            <Text>Don't have an acount <Link to={"/Signup"}>Signup here</Link></Text> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100
    },
    inputBox: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderColor: '#EDEFEE',
        backgroundColor: '#EDEFEE',
    },
    btn: {
        marginTop: 50,
        marginHorizontal: 50,
        backgroundColor: '#ED8AA8',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})