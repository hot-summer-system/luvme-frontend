import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFavoriteProducts, removeProductFromFavorites } from '../api/products';
import { useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const numCol = 2;
const columnWidth = windowWidth / numCol;

export default function LoveScreen() {
  const [favorites, setFavorites] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getFavorites()
    }, [])
  );

  const getFavorites = async () => {
    const favorites = await getFavoriteProducts();
    setFavorites(favorites);
  };
  const deleteFavorite = async (favorite) => {
    await removeProductFromFavorites(favorite.favoriteId);
    getFavorites()
  };

  return (
    <FlatList
      style={styles.container}
      data={favorites}
      keyExtractor={(item) => item.favoriteId}
      numColumns={numCol}
      renderItem={({ item }) => (
        <View style={styles.column}>
          <Image source={{ uri: item.productResponse.productImage }} style={styles.image} />
          <Text style={styles.productTitle}>{item.productResponse.productName}</Text>
          <TouchableOpacity onPress={() => deleteFavorite(item)}>
            <Image
              source={require('../../assets/images/heart_pink_icon.png')}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
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
    fontWeight: 'bold',
    color: '#DC447A',
    width: columnWidth - 30,
    marginTop: 5,
  },
})
