import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setDescription, setDateReminder, addProductToRequests, removeProductFromRequests, clearRoutine } from '../store/features/routineSlice';
import { routine } from '../store/selector';
import PinkButton from '../components/PinkButton';
import WhiteButton from '../components/WhiteButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useFonts, Merriweather_700Bold, Merriweather_400Regular } from '@expo-google-fonts/merriweather';
import { Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { Dimensions } from 'react-native';
import { modifyRoutine } from '../api/routine';

const windowWidth = Dimensions.get('window').width;
function ModifyRoutineScreen() {
    const [fontsLoaded] = useFonts({
        Merriweather_700Bold,
        Merriweather_400Regular,
        Quicksand_700Bold,
    })
    const route = useRoute();
    const routineState = useSelector(routine);
    const [description, setRoutineDescription] = useState('');
    const [dateReminder, setRoutineDateReminder] = useState(null);
    const [routingProductRequests, setRoutingProductRequests] = useState([]);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    useEffect(() => {
        if (route.params && route.params.productToAdd) {
            dispatch(addProductToRequests(route.params.productToAdd));
            navigation.setParams({ productToAdd: null });
        }
        setRoutineDescription(routineState.description)
        setRoutineDateReminder(convertTimeStringToDate(routineState.dateReminder))
        setRoutingProductRequests(routineState.routingProductRequests)
    }, [route, routineState])
    function convertTimeStringToDate(timeString) {
        const currentDate = new Date();
        const [hours, minutes] = timeString.split(":");
        const [amPM] = timeString.split(" ")[1];
        let hoursInt = parseInt(hours, 10);
        if (amPM === "AM" && hoursInt === 12) {
            hoursInt = 0;
        }
        if (amPM === "PM" && hoursInt !== 12) {
            hoursInt += 12;
        }
        currentDate.setHours(hoursInt, parseInt(minutes, 10), 0, 0);
        return currentDate;
    }
    const handleAddProduct = () => {
        navigation.navigate('Add Product');
    };

    const handleRemoveProduct = (productId) => {
        dispatch(removeProductFromRequests(productId));
    };
    function transformProductsRequests(products) {
        return products.map((product, index) => ({
            productId: product.productId,
            orderProduct: index + 1,
        }));
    }
    const handleSave = async () => {
        if (description !== '' && dateReminder && routingProductRequests.length > 0) {
            const newRoutingProductRequests = transformProductsRequests(routingProductRequests);
            const newDateReminder = dateReminder.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
            const routine = {
                description: description,
                dateReminder: newDateReminder,
                routingProductRequests: newRoutingProductRequests
            }
            try {
                await modifyRoutine(routine)
                    .then(() => dispatch(clearRoutine()))
                    .then(() => navigation.navigate('Root', { screen: 'Routine' }))
            } catch (error) {
                console.log(error)
            }
        } else {
            alert('Please fill in all information and have at least 1 product in the list.');
        }
    };
    if (!fontsLoaded) {
        return null
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Description:</Text>
            <TextInput
                label="Description"
                mode="outlined"
                style={styles.inputBox}
                value={description}
                onChangeText={(text) => {
                    setRoutineDescription(text)
                    dispatch(setDescription(text))
                }}
                clearButtonMode='always'
            />
            <Text style={styles.label}>Time reminder:</Text>
            <TouchableOpacity onPress={() => (
                DateTimePickerAndroid.open({
                    value: dateReminder,
                    onChange: (e, selectedTime) => {
                        setRoutineDateReminder(selectedTime)
                        dispatch(setDateReminder(selectedTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })))
                    },
                    mode: 'time'
                })
            )}>
                <Text style={{ marginTop: 10, fontFamily: 'Quicksand_400Regular', fontSize: 16 }}> {dateReminder.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} </Text>
            </TouchableOpacity>
            {routingProductRequests.length > 0 ? (
                <View>
                    <Text style={styles.label}>Routine product list:</Text>
                    {routingProductRequests.map((product, index) => (
                        <View key={product.productId} style={styles.product}>
                            <Text style={styles.productCategory}>{++index}. {product.productCategoryResponses[0].categoryResponse.categoryName}</Text>
                            <TouchableOpacity onPress={() => handleRemoveProduct(product.productId)} style={{ position: 'absolute', right: 20, top: 15 }}>
                                <Image
                                    source={require('../../assets/images/delete_pink_icon.png')}
                                    style={{ width: 15, height: 15 }}
                                />
                            </TouchableOpacity>
                            <View style={styles.productDetail}>
                                <Image style={styles.productImage} source={{ uri: product.productImage }} />
                                <Text style={styles.productName}>{product.productName}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            ) : (
                <Text style={styles.label}>No products in the list.</Text>
            )
            }
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
            }}>
                <WhiteButton text="Add Product" onClick={handleAddProduct} />
                <PinkButton text="Save" onClick={handleSave} />
            </View>
        </ScrollView >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: 'white',
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
        fontFamily: 'Merriweather_700Bold'
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
        color: '#DC447A',
        fontSize: 14,
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

export default ModifyRoutineScreen;
