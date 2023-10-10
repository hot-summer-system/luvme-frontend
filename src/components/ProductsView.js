import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const numCol = 2;
const columnWidth = windowWidth / numCol;
export default function ProductsView({products}) {
    return (
        <FlatList
            style={styles.container}
            data={products}
            keyExtractor={(item) => item.productId}
            numColumns={numCol}
            renderItem={({ item }) => (
                <View style={styles.column}>
                    <Image source={{ uri: item.productImage }} style={styles.image} />
                    <Text style={styles.productTitle}>{item.productName}</Text>
                </View>
            )}
        />
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    column: {
        width: columnWidth,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    image: {
        borderColor: '#ED8AA8',
        borderWidth: 1,
        width: columnWidth - 20,
        height: columnWidth - 20,
        resizeMode: 'contain'
    },
    productTitle:{
        fontSize: 16,
        fontWeight: 'bold',
        color:'#DC447A',
        width: columnWidth - 30,
        marginTop: 5,
    }
})