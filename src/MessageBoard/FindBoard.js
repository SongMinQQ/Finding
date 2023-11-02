import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import WriteButton from './WriteButton';

const WINDOW_WIDTH = Dimensions.get('window').width;

const BORDER_COLOR = '#F2F2F2';
const ITEM_SIZE = WINDOW_WIDTH * 0.3;
const ITEM_BORDER_RADIUS = ITEM_SIZE * 0.08;

const FindBoard = () => {
    const handleChatButtonPress = (itemIndex) => {
        // 채팅하기 버튼이 눌렸을 때 수행할 동작을 정의
        console.log(`사각형 아이템 ${itemIndex + 1}의 채팅하기 버튼을 눌렀습니다.`);
        // 여기에서 원하는 채팅 액션을 수행할 수 있음
    };

    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    {[...Array(20)].map((_, index) => (
                        <View key={index} style={[styles.item, { backgroundColor: '#FFFFFF' }]}>
                            <Image 
                                source={{ uri: `https://cdn.pixabay.com/photo/2017/08/02/12/44/accessories-2571416_1280.jpg` }} 
                                style={styles.itemImage}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.itemName}>분실물 {index + 1}</Text>
                                <Text style={styles.itemLocation}>위치 </Text>
                                
                            </View>
                            <TouchableOpacity
                            style={styles.chatButton}
                            onPress={() => handleChatButtonPress(index)}
                        >
                            <Text style={styles.chatButtonText}>채팅하기</Text>
                        </TouchableOpacity>
                        </View>
                    ))}
                </View>
                
            </ScrollView>
            <WriteButton/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // 가로로 배열
        flexWrap: 'wrap', 
        justifyContent: 'space-evenly'
    },
    item: {
        width: WINDOW_WIDTH, // 가로와 세로 크기 바꿈
        height: ITEM_SIZE * 1.1,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth:1,
        borderColor: BORDER_COLOR,
        alignItems: 'flex-start',
        flexDirection:"row"
    },
    itemContent: {
        flexDirection: 'row', // 가로로 배열
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    itemImage: {
        width: ITEM_SIZE * 0.9,
        height: ITEM_SIZE * 0.9,
        borderRadius: ITEM_BORDER_RADIUS,
        marginLeft: 15,
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    itemName: {
        width: '100%',
        fontSize: 20, // 필요에 따라 스타일을 조절
        fontWeight: 'bold',
        textAlign: 'center'
    },
    itemLocation: {
        width: '100%',
        fontSize: 17, // 필요에 따라 스타일을 조절
        textAlign: 'center',
    },
    textContainer: {
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"center",
        marginTop: 15,
        marginLeft: 15
    },
    chatButton: {
        backgroundColor: '#045FB4',
        padding: 10,
        borderRadius: 15,
        position: 'absolute', // 절대 위치 설정
        bottom: 15, // 아래로부터의 거리를 조절
        right: 15, // 오른쪽으로부터의 거리를 조절
    },
    chatButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default FindBoard;
