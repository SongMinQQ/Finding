import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WriteButton from './WriteButton';
import { fireStoreDB } from '../../FireBase/DB';
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const WINDOW_HEIGHT = Dimensions.get('window').height;

const BORDER_COLOR = '#F8F8F8';
const ITEM_SIZE = WINDOW_HEIGHT * 0.15;
const ITEM_BORDER_RADIUS = ITEM_SIZE * 0.08;
const FONT_SIZE_TITLE = WINDOW_HEIGHT * 0.025;
const FONT_SIZE_TEXT = WINDOW_HEIGHT * 0.019;
const LostBoard = () => {
    const navigation = useNavigation();

    const [posts, setPosts] = useState([]);

    const fetchDocs = async () => {
        try {
            const q = query(collection(fireStoreDB, "lostBoard"), orderBy("date", "desc"));
        
            // 생성된 쿼리를 사용하여 문서들을 가져옵니다.
            const querySnapshot = await getDocs(q);
            const fetchedPosts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchDocs();
        });

        // 컴포넌트 언마운트 시 리스너 제거
        return unsubscribe;
    }, [navigation])

    return (
        <>
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    {posts.map((item) => (
                        <TouchableOpacity key={item.id}
                            style={styles.item}
                            onPress={() => navigation.navigate("LostBoardDetail", {
                                imgURL: item.imageUrl ? { uri: item.imageUrl } : require('../../img/defaultPost.png'),
                                itemName: item.title,
                                location: item.findLocation,
                                date: item.date.toDate().toLocaleDateString('ko-KR'),
                                money: item.thankMoney,
                                tradeType: item.tradeType,
                                tradeLocation: item.tradeLocation,
                                articleExplain: item.description,
                            })}>
                            <Image
                                source={item.imageUrl ? { uri: item.imageUrl } : require('../../img/defaultPost.png')}
                                style={styles.itemImage}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.itemName}>{item.title}</Text>
                                <Text style={styles.itemText}>{item.findLocation}</Text>
                                <Text style={styles.itemText}>{item.date.toDate().toLocaleDateString('ko-KR')}</Text>
                                <TouchableOpacity style={styles.itemUser}
                                    onPress={() => navigation.navigate('Home', {
                                        screen: '프로필',
                                    })}>
                                    <Text>😎홍길동</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <WriteButton type="lost" />
        </>
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