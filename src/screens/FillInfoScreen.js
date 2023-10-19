import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput, RadioButton, Button } from 'react-native-paper';
import PinkButton from '../components/PinkButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { fillInfo } from '../api/user'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LandingScreen from './LandingScreen';

export default function FillInfoScreen() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [fullName, onChangeFullName] = useState('');
  const [gender, setGender] = useState('male');
  const [birthDay, setBirthDay] = useState(new Date());
  const [userData, setUserData] = useState(null)
  async function getUserInfo() {
    try {
      setLoading(true)
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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setBirthDay(currentDate);
  };
  const nextPage = async () => {
    try {
      const data = await fillInfo(userData.userId, { fullName: fullName, gender: gender, birthDay: birthDay.toISOString().slice(0, 10) })
      userData.status = "ACTIVE";
      AsyncStorage.setItem("@user", JSON.stringify(userData))
      if (userData.isTest === false) {
        navigation.navigate('Question');
      } else {
        navigation.navigate('Root', { screen: 'Home' })
      }
    } catch (error) {
      console.log(error)
    }
  }
  if (loading) return (
    <View style={styles.container}>
      <LandingScreen />
    </View>
  )
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
          <Text>Male</Text>
          <RadioButton
            value="male"
            status={gender === 'male' ? 'checked' : 'unchecked'}
            onPress={() => setGender('male')}
          />
        </View>
        <View>
          <Text>Female</Text>
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
            onChange,
            mode: 'date',
            maximumDate: new Date(),
          })
        )}>
          <Text style={{ marginTop: 10 }}> {birthDay.toLocaleDateString()} </Text>
        </TouchableOpacity>
      </View>
      {/* <DateTimePicker
        value={birthDay}
        mode='date'
        maximumDate={new Date()}
        onChange={(evt, selectedDate) => {
          setBirthDay(selectedDate);
        }}
      /> */}
      <View style={{ alignSelf: 'center', position: 'absolute', bottom: 50 }}>
        <PinkButton onClick={nextPage} text="Next" />
      </View>
    </View>
  )
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
    fontWeight: 'bold',
    paddingTop: 100,
  },
  inputBox: {
    marginTop: 10,
    height: 40,
    fontSize: 16,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  }
})