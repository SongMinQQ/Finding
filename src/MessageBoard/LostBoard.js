import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WriteButton from './WriteButton';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const BORDER_COLOR = '#F8F8F8';
const ITEM_SIZE = WINDOW_HEIGHT * 0.15;
const ITEM_BORDER_RADIUS = ITEM_SIZE * 0.08;
const FONT_SIZE_TITLE = WINDOW_HEIGHT * 0.025;
const FONT_SIZE_TEXT = WINDOW_HEIGHT * 0.019;
const LostBoard = () => {
    const navigation = useNavigation();

    const lostItemData = [...Array(21)].map((_, index) => ({
        id: index,
        imgURL: `https://picsum.photos/id/${index + 21}/200/200`,
        itemName: `물건 ${index + 22}`,
        category: `전자기기`,
        location: `위치 ${index + 22}`,
        date: `2023-10-${index + 1}`
    }));

    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    {lostItemData.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.item} onPress={() => navigation.navigate("LostBoardDetail", {
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
                            <View style={styles.textContainer}>
                                <Text style={styles.itemName}>{item.itemName}</Text>
                                <Text style={styles.itemText}>{item.location}</Text>
                                <Text style={styles.itemText}>{item.date}</Text>
                                <TouchableOpacity style={styles.itemUser} onPress={() => navigation.navigate('Home', {
                                    screen: '프로필',
                                })}>
                                    {/* 😎자리에 프로필 이미지 들어오도록 구현해야함.*/}
                                    {/* 채팅하기 버튼은 게시글 상세보기에 넣는게 좋을거 같아서 일단 뺌 */}
                                    <Text>😎홍길동</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <WriteButton />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    item: {
        width: '100%',
        height: ITEM_SIZE,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: BORDER_COLOR,
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        padding: 10,
    },
    itemImage: {
        width: ITEM_SIZE * 0.8,
        height: ITEM_SIZE * 0.8,
        borderRadius: ITEM_BORDER_RADIUS,
    },
    itemName: {
        width: '100%',
        fontSize: FONT_SIZE_TITLE,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    itemText: {
        width: '100%',
        fontSize: FONT_SIZE_TEXT,
        textAlign: 'left',
    },
    itemUser: {
        alignSelf: 'flex-end',
    },
    textContainer: {
        flex: 1,
        height: '100%',
        flexDirection: "column",
        justifyContent: "space-around",
        paddingHorizontal: 10,
    },
});


export default LostBoard;