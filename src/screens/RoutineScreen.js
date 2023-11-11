import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import PinkButton from '../components/PinkButton'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native';
import { getRoutine } from '../api/routine';
import { useFonts, Merriweather_700Bold, Merriweather_400Regular } from '@expo-google-fonts/merriweather';
import { Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setDescription, setDateReminder, addArrayToRequests, clearRoutine } from '../store/features/routineSlice';
import WhiteButton from '../components/WhiteButton';

const windowWidth = Dimensions.get('window').width;
export default function RoutineScreen() {
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Merriweather_700Bold,
    Merriweather_400Regular,
    Quicksand_700Bold,
  })
  const navigation = useNavigation()
  const [routine, setRoutine] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  async function getRoutineById(userId) {
    try {
      setLoading(true)
      const data = await getRoutine(userId);
      setRoutine(data)
      if (data) {
        data?.routingProductResponses.sort((a, b) => a.orderProduct - b.orderProduct);
        setRoutine(data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  async function getUserInfo() {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user")
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserData(userData)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      getUserInfo()
    }, [])
  );
  useEffect(() => {
    getRoutineById(userData?.userId)
  }, [userData])
  if (!fontsLoaded) {
    return null
  }
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size='large' color='#DC447A' />
      </View>
    )
  } else if (routine === null) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
        <Text style={styles.title}>
          You don't have a routine yet
        </Text>
        <View style={{ position: 'absolute', bottom: 50 }}>
          <PinkButton text='Create Routine' onClick={() => { navigation.navigate('Modify Routine') }} />
        </View>
      </View>
    )
  } else {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.routineText}> {routine?.description} </Text>
        {/* <Text style={styles.label}>Time reminder:</Text>
        <Text style={styles.routineText}> {routine?.dateReminder} </Text> */}
        <Text style={styles.label}>Routine product list:</Text>
        {routine?.routingProductResponses?.map((product, index) => (
          <View key={product?.productResponse.productId} style={styles.product}>
            <Text style={styles.productCategory}>{product.orderProduct}. {product?.productResponse.productCategoryResponses[0]?.categoryResponse?.categoryName}</Text>
            <View style={styles.productDetail}>
              <Image style={styles.productImage} source={{ uri: product?.productResponse.productImage }} />
              <Text style={styles.productName}>{product?.productResponse.productName}</Text>
            </View>
          </View>
        ))}
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20,
        }}>
          <PinkButton text='Update Routine' onClick={() => {
            dispatch(clearRoutine())
            dispatch(setDescription(routine?.description));
            dispatch(setDateReminder(routine?.dateReminder));
            dispatch(addArrayToRequests(routine?.routingProductResponses.map(item => item.productResponse)));
            navigation.navigate('Modify Routine')
          }} />
          <WhiteButton text='Start Routine' onClick={() => {
            navigation.navigate('Start Routine', { routingProductResponses: routine?.routingProductResponses })
          }} />
        </View>
      </ScrollView >
    );
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
    fontSize: 24,
    marginTop: 10,
    color: '#DC447A',
    fontFamily: 'Merriweather_700Bold'
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#DC447A',
    fontFamily: 'Merriweather_700Bold'
  },
  routineText: {
    marginTop: 10,
    fontFamily: 'Quicksand_400Regular',
    fontSize: 16
  },
  product: {
    borderColor: '#FFD2D5',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  productCategory: {
    fontFamily: 'Merriweather_400Regular',
    color: '#DC447A'
  },
  productName: {
    fontFamily: 'Quicksand_700Bold',
    color: '#DC447A',
    width: windowWidth - 150,
    marginLeft: 8
  },
  productImage: {
    width: 80,
    height: 80
  },
  productDetail: {
    marginTop: 8,
    flexDirection: 'row',
  }
})