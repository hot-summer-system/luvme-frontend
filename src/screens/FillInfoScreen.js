import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput, RadioButton, Button } from 'react-native-paper';
import PinkButton from '../components/PinkButton';
import { useNavigation } from '@react-navigation/native';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { fillInfo } from '../api/user'

export default function FillInfoScreen() {
  const navigation = useNavigation();
  const [fullName, onChangeFullName] = useState('');
  const [gender, setGender] = useState('male');
  const [birthDay, setBirthDay] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setBirthDay(currentDate);
  };
  const nextPage = async () => {
    // const data = await fillInfo(userId, { fullName, gender, birthDay })
    const data = null
    if (data?.test == false) {
      navigation.navigate('Question');
    } else {
      navigation.navigate('Root', { screen: 'Home' })
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fill Info</Text>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        mode="outlined"
        style={styles.inputBox}
        value={fullName}
        onChangeText={onChangeFullName}
        clearButtonMode='always'
      />
      <Text style={styles.label}>Gender</Text>
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
      <Text style={styles.label}>Birthday</Text>
      {/* {DateTimePickerAndroid.open({
        value: birthDay,
        onChange,
        mode: 'date',
        maximumDate: new Date(),
      })} */}
      {/* <DateTimePicker
        value={birthDay}
        mode='date'
        maximumDate={new Date()}
        onChange={(evt, selectedDate) => {
          setBirthDay(selectedDate);
        }}
      /> */}
      <PinkButton onClick={nextPage} text="Next" />
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
    height: 40,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  }
})