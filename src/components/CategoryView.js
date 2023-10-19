import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import { getProductsByCategory } from '../api/products';
import ProductsView from './ProductsView'

export default function CategoryView({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    handleCategoryPress(selectedCategory)
  }, [])

  const handleCategoryPress = async (category) => {
    setSelectedCategory(category);
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
          <TouchableOpacity onPress={() => handleCategoryPress(item)}>
            <View
              style={{
                width: 50,
                height: 50,
                padding: 10,
                margin: 5,
              }}
            >
              <Avatar.Image
                source={{uri:"https://cdn-icons-png.flaticon.com/512/4305/4305564.png"}}
                size={30}
              />
            </View>
            <Text style={styles.categoryName}>{item.categoryName}</Text>
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
    maxHeight: 100
  },
  categoryName: {
    color: 'black'
  }
})
