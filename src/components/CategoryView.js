import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { getProductsByCategory } from '../api/products';
import ProductsView from './ProductsView'

export default function CategoryView({ categories }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    handleCategoryPress(categories[0])
  }, [])

  const handleCategoryPress = async (category) => {
    setSelectedCategoryId(category.categoryId);
    const products = await getProductsByCategory(category.categoryCode);
    setProducts(products);
  };

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
                borderColor: selectedCategoryId === item.categoryId ? '#DC447A' : '#FFD2D5',
              }}
            >
              <Image
                // source={{uri:"https://cdn-icons-png.flaticon.com/512/4305/4305564.png"}}
                source={require('../images/heart_pink_icon.png')}
                style={styles.categoryImage}
              />
            </View>
            <Text style={{
              color: selectedCategoryId === item.categoryId ? '#DC447A' : '#FFD2D5',
              fontWeight: 'bold'
            }}>{item.categoryName}</Text>
          </TouchableOpacity>
        )}
      />
      <ProductsView products={products} />
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
    width: 120,
    alignItems: 'center'
  },
  categoryImage: {
    maxWidth: 30,
    maxHeight: 30
  }
})
