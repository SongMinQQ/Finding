import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WINDOW_WIDTH = Dimensions.get('window').width;

const ITEM_SIZE = WINDOW_WIDTH * 0.3;
const ITEM_BORDER_RADIUS = ITEM_SIZE * 0.08;
const ITEM_TEXT_SIZE_LARGE = ITEM_SIZE * 0.15;
const ITEM_TEXT_SIZE_SMALL = ITEM_SIZE * 0.12;

const ProfileLost = () => {
    const navigation = useNavigation();
    return (
        <ScrollView>
            <View style={styles.container}>
                {[...Array(30)].map((_, index) => (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate("LostBoardDetail")}>
                        <View key={index} style={styles.item}>
                            <Image
                                source={{ uri: `https://picsum.photos/id/${index + 40}/200/200` }}
                                style={styles.itemImage}
                            />
                            <Text style={styles.itemName}>물건 {index + 1}</Text>
                            <Text style={styles.itemLocation}>위치 {index + 1}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    item: {
        width: ITEM_SIZE,
        height: ITEM_SIZE * 1.4,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemImage: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        borderRadius: ITEM_BORDER_RADIUS
    },
    itemName: {
        width: '100%',
        fontSize: ITEM_TEXT_SIZE_LARGE,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    itemLocation: {
        width: '100%',
        fontSize: ITEM_TEXT_SIZE_SMALL,
        textAlign: 'right'
    }
});


export default ProfileLost;