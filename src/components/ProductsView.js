import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'

// const products = [
//     {
//         id: 1,
//         productImage: "https://m.media-amazon.com/images/I/41GXeshUYvL.jpg",
//         productName: "Heo Hồng",
//     },
//     {
//         id: 2,
//         productImage: "https://m.media-amazon.com/images/I/41u3tFiB3KL.jpg",
//         productName: "Bosu",
//     },
//     {
//         id: 3,
//         productImage: "https://www.ubuy.com.bd/productimg/?image=aHR0cHM6Ly9pbWFnZXMtY2RuLnVidXkuY28uaW4vNjM2Y2MyODVkNjIwZWI1N2NiMTdiYTYyLW1pbmlzby01LTM5LTM5LXBpZ2xldC1zdHVmZmVkLmpwZw.jpg",
//         productName: "Heo nhỏ nhiều màu"
//     },
//     {
//         id: 4,
//         productImage: "https://m.media-amazon.com/images/I/51grRZSnYHL.jpg",
//         productName: "Heo khủng long",
//     },
//     {
//         id: 5,
//         productImage: "https://m.media-amazon.com/images/I/51C7PMDTh2L.jpg",
//         productName: "Heo ong",
//     },
//     {
//         id: 6,
//         productImage: "https://shop.miniso-au.com/cdn/shop/products/2021102560241835_700x700.jpg?v=1669107583",
//         productName: "Heo bình sữa"
//     },
//     {
//         id: 7,
//         productImage: "https://www.miniso-au.com/files/images/products/2011886210108/4032c3934addf1f523888255c58533de-view.jpg",
//         productName: "Heo khăn sữa"
//     },
//     {
//         id: 8,
//         productImage: "https://i5.walmartimages.com/asr/e4ca2a50-fa93-439c-ab4d-d72504a49e7d.b54a71c7cc25c2e2eb3baa174260b9da.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
//         productName: "Heo chú hề"
//     },
//     {
//         id: 9,
//         productImage: "https://media.karousell.com/media/photos/products/2022/11/22/miniso_sitting_piglet_plush_co_1669107317_ab5bea6b_progressive.jpg",
//         productName: "Heo phù thủy"
//     },
//     {
//         id: 10,
//         productImage: "https://i5.walmartimages.com/asr/ecd1a10d-8ef2-4462-9dca-33762f4bd075.6085b2f35625b55c29a14b0cc97e6542.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
//         productName: "Heo tuần lộc"
//     },
//     {
//         id: 11,
//         productImage: "https://cdn.shopify.com/s/files/1/0556/7086/6010/products/6936735336241-1_959d67b9-8c4f-41ee-a9f5-9db1044b4969-452915_1024x1024.jpg?v=1683689510",
//         productName: "Heo kì lân"
//     },
//     {
//         id: 12,
//         productImage: "https://m.media-amazon.com/images/I/61XjJz0Es2L.jpg",
//         productName: "Heo koala"
//     }
// ]
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