import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WINDOW_WIDTH = Dimensions.get('window').width;

const ITEM_SIZE = WINDOW_WIDTH * 0.3;
const ITEM_PADDING_SIZE = WINDOW_WIDTH * 0.1 / 4;
const ITEM_BORDER_RADIUS = ITEM_SIZE * 0.08;
const ITEM_TEXT_SIZE_LARGE = ITEM_SIZE * 0.15;
const ITEM_TEXT_SIZE_SMALL = ITEM_SIZE * 0.12;

const ProfileFind = () => {
    const navigation = useNavigation();

    const findItemData = [...Array(20)].map((_, index) => ({
        id: index,
        imgURL: `https://picsum.photos/id/${index}/200/200`,
        itemName: `물건 ${index + 1}`,
        category: `전자기기`,
        location: `위치 ${index + 1}`,
        date: `2023-10-${index + 1}`
    }));

    return (
        <ScrollView>
            <View style={styles.container}>
                {findItemData.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.item,
                            { marginRight: (item.id % 3) !== 2 ? 0 : ITEM_PADDING_SIZE } // 세 번째 아이템에는 마진을 적용하지 않음
                        ]}
                        onPress={() => navigation.navigate("FindBoardDetail", {
                            imgURL: item.imgURL,
                            itemName: item.itemName,
                            category: item.category,
                            location: item.location,
                            date: item.date,
                        })}>

                        <Image
                            source={{ uri: item.imgURL }}
                            style={styles.itemImage}
                        />
                        <Text style={styles.itemName}>{item.itemName}</Text>
                        <Text style={styles.itemLocation}>{item.location}</Text>
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
        justifyContent: 'flex-start',
    },
    item: {
        width: ITEM_SIZE,
        height: ITEM_SIZE * 1.4,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: ITEM_PADDING_SIZE,
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

export default ProfileFind;
