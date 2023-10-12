import { View, Text, StyleSheet, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import PinkButton from '../components/PinkButton'

const slides = [
    {
        image: require('../images/skintone.png'),
        title: 'Skintone',
        caption: 'Discover your unique skin tone and its specific characteristics to make informed skincare choices'
    },
    {
        image: require('../images/skintype.png'),
        title: 'Skintype',
        caption: 'Discover your unique skin type and create a personalized skincare routine that you truly adore.'
    },
    {
        image: require('../images/products.png'),
        title: 'Find products',
        caption: 'Search for a wide range of high-quality skincare and beauty products that match your unique skin type and preferences.'
    },
]

export default function StartedScreen({ promptAsync }) {

    return (
        <View style={styles.container}>
            <Swiper
                style={styles.wrapper}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                loop
                autoplay
            >
                {slides.map((slide, index) => (
                    <View key={index}
                        style={styles.slide}
                    >
                        <View style={{ alignSelf: 'center', height: 250, marginBottom: 50 }}>
                            <Image source={slide.image} style={styles.image} />
                        </View>
                        <Text style={styles.title}>{slide.title}</Text>
                        <Text style={styles.caption}>{slide.caption}</Text>
                    </View>
                ))}
            </Swiper>
            <View style={styles.buttonView}>
                <PinkButton onClick={() => promptAsync()} text="Sign in with Google" />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    wrapper: {},
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    activeDot: {
        backgroundColor: '#ED8AA8',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        marginTop: 30,
        height: '100%',
        resizeMode: 'contain',
    },
    title: {
        marginTop: 40,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    caption: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 5,
        color: 'rgba(0,0,0,.5)',
    },
    buttonView: {
        marginBottom: 100,
    }
})