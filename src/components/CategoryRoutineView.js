import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { getProductsByCategory } from '../api/products';
import ProductsRoutineView from './ProductsRoutineView'
import { useFonts, Quicksand_700Bold, Quicksand_400Regular } from '@expo-google-fonts/quicksand';

export default function CategoryRoutineView({ categories }) {
  const [fontsLoaded] = useFonts({
    Quicksand_700Bold,
    Quicksand_400Regular,
  })
  const [loading, setLoading] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => { handleCategoryPress(categories[0]) }, [])

  const handleCategoryPress = async (category) => {
    try {
      setLoading(true)
      setSelectedCategoryId(category.categoryId);
      const products = await getProductsByCategory(category.categoryCode);
      setProducts(products);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
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
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        horizontal
        data={categories}
        keyExtractor={(item) => item.categoryId}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCategoryPress(item)} style={styles.category}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
                width: 50,
                height: 50,
                borderStyle: 'solid',
                borderWidth: 1,
                borderRadius: 15,
                borderColor: selectedCategoryId === item.categoryId ? '#DC447A' : '#ED8AA8',
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.categoryImage}
              />
            </View>
            <Text style={{
              fontFamily: selectedCategoryId === item.categoryId ? 'Quicksand_700Bold' : 'Quicksand_400Regular',
              color: selectedCategoryId === item.categoryId ? '#DC447A' : '#ED8AA8',
              textAlign: 'center'
            }}>{item.categoryName}</Text>
          </TouchableOpacity>
        )}
      />
      <ProductsRoutineView products={products} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    maxHeight: 100,
  },
  category: {
    width: 80,
    alignItems: 'center'
  },
  categoryImage: {
    width: 30,
    height: 30
  }
})
