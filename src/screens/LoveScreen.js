import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { getFavoriteProducts, removeProductFromFavorites } from '../api/products';
import { useFocusEffect } from '@react-navigation/native';
import { useFonts, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { ActivityIndicator } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const numCol = 2;
const columnWidth = windowWidth / numCol;

export default function LoveScreen() {
  const [loading, setLoading] = useState(false)
  const [fontsLoaded] = useFonts({
    Quicksand_700Bold,
  })
  const [favorites, setFavorites] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getFavorites()
    }, [])
  );

  const getFavorites = async () => {
    try {
      setLoading(true)
      const favorites = await getFavoriteProducts();
      setFavorites(favorites);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };
  const deleteFavorite = async (favorite) => {
    await removeProductFromFavorites(favorite.favoriteId);
    getFavorites()
  };
  if (!fontsLoaded) {
    return null
  }
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size='large' color='#DC447A' />
      </View>
    )
  }
  return (
    <FlatList
      style={styles.container}
      data={favorites}
      keyExtractor={(item) => item.favoriteId}
      numColumns={numCol}
      renderItem={({ item }) => (
        <View style={styles.column}>
          <Image source={{ uri: item.productResponse.productImage }} style={styles.image} />
          <View style={styles.actionView}>
            <Text style={styles.productTitle}>{item.productResponse.productName}</Text>
            <TouchableOpacity onPress={() => deleteFavorite(item)} style={{ position: 'absolute', top: 10, right: 5 }}>
              <Image
                source={require('../../assets/images/heart_pink_icon.png')}
                style={{ width: 15, height: 15 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  column: {
    width: columnWidth,
    padding: 10,
  },
  image: {
    borderColor: '#ED8AA8',
    borderWidth: 1,
    width: columnWidth - 20,
    height: columnWidth - 20,
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: 16,
    color: '#DC447A',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 20,
    fontFamily: 'Quicksand_700Bold',
  },
  actionView: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})
