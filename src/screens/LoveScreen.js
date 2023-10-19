import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFavoriteProducts } from '../api/products';
import ProductsView from '../components/ProductsView';

export default function LoveScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getFavorites()
  }, [])

  const getFavorites = async () => {
    const products = await getFavoriteProducts();
    setProducts(products);
  };

  return (
    <View style={styles.container}>
      <ProductsView products={products} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
