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
                    <Image source={{ uri: 'https://image.hsv-tech.io/1387x0/bbx/face-cleanser-200ml-da-by-moi-031021_03550e415ce6426f953a84af73c0d8f2.jpg' }} style={styles.image} />
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