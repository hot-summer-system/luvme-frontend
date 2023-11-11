import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput, RadioButton, ActivityIndicator } from 'react-native-paper';
import PinkButton from '../components/PinkButton';
import { useNavigation } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { fillInfo } from '../api/user'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Merriweather_700Bold, Merriweather_400Regular } from '@expo-google-fonts/merriweather';
import { Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

export default function FillInfoScreen() {
  const [fontsLoaded] = useFonts({
    Merriweather_700Bold,
    Merriweather_400Regular,
    Quicksand_400Regular,
    Quicksand_700Bold
  })
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [fullName, onChangeFullName] = useState('');
  const [gender, setGender] = useState('male');
  const [birthDay, setBirthDay] = useState(new Date());
  const [userData, setUserData] = useState(null)
  async function getUserInfo() {
    try {
      const userJSON = await AsyncStorage.getItem("@user")
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserData(userData)
      if (userData.status !== "NONFULLFILL") {
        if (userData.isTest === false) {
          navigation.navigate("Question")
        } else {
          navigation.navigate('Root', { screen: 'Home' })
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getUserInfo()
  }, [])

  const nextPage = async () => {
    try {
      if (userData.userId, fullName !== '', gender, birthDay) {
        await fillInfo(userData.userId, { fullName: fullName, gender: gender, birthDay: birthDay.toISOString().slice(0, 10) })
        userData.status = "ACTIVE";
        await AsyncStorage.setItem("@user", JSON.stringify(userData))
        if (userData.isTest === false) {
          navigation.navigate('Question');
        } else {
          navigation.navigate('Root', { screen: 'Home' })
        }
      } else {
        alert('Please input all fields')
      }
    } catch (error) {
      console.log(error)
    }
  }
  if (!fontsLoaded) {
    return null
  }
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size='large' color='#DC447A' />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Fill Info</Text>
        <Text style={styles.label}>Full Name:</Text>
        <TextInput
          mode="outlined"
          style={styles.inputBox}
          value={fullName}
          onChangeText={onChangeFullName}
          clearButtonMode='always'
        />
        <Text style={styles.label}>Gender:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <View>
            <Text style={{ fontFamily: 'Quicksand_400Regular' }}>Male</Text>
            <RadioButton
              value="male"
              status={gender === 'male' ? 'checked' : 'unchecked'}
              onPress={() => setGender('male')}
            />
          </View>
          <View>
            <Text style={{ fontFamily: 'Quicksand_400Regular' }}>Female</Text>
            <RadioButton
              value="female"
              status={gender === 'female' ? 'checked' : 'unchecked'}
              onPress={() => setGender('female')}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.label}>Birthday:</Text>
          <TouchableOpacity onPress={() => (
            DateTimePickerAndroid.open({
              value: birthDay,
              onChange: (event, selectedDate) => { setBirthDay(selectedDate) },
              mode: 'date',
              maximumDate: new Date()
            })
          )}>
            <Text style={{ marginTop: 10, fontFamily: 'Quicksand_400Regular' }}> {birthDay.toLocaleDateString()} </Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: 'center', position: 'absolute', bottom: 50 }}>
          <PinkButton onClick={nextPage} text="Next" />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: 'white',
  },
  title: {
    flex: 0.2,
    textAlign: 'center',
    fontSize: 32,
    paddingTop: 100,
    fontFamily: 'Quicksand_700Bold',
    color: '#DC447A',
  },
  inputBox: {
    marginTop: 10,
    height: 40,
    fontSize: 16,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#DC447A',
    fontFamily: 'Merriweather_700Bold',
  }
})