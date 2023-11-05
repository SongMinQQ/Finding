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

    const lostItemData = [...Array(21)].map((_, index) => ({
        id: index,
        imgURL: `https://picsum.photos/id/${index+21}/200/200`,
        itemName: `물건 ${index + 22}`,
        category: `전자기기`,
        location: `위치 ${index + 22}`,
        date: `2023-10-${index+1}` 
    }));
    return (
        <ScrollView>
            <View style={styles.container}>
                {lostItemData.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => navigation.navigate("LostBoardDetail", {
                        imgURL: item.imgURL,
                        itemName: item.itemName,
                        category: item.category,
                        location: item.location,
                        date: item.date,
                    })}>
                        <View key={item.id} style={styles.item}>
                            <Image
                                source={{uri:item.imgURL}}
                                style={styles.itemImage}
                            />
                            <Text style={styles.itemName}>{item.itemName}</Text>
                            <Text style={styles.itemLocation}>{item.location}</Text>
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