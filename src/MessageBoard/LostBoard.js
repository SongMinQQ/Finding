import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WriteButton from './WriteButton';
import { fireStoreDB } from '../../FireBase/DB';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Image } from "react-native-expo-image-cache";


const WINDOW_HEIGHT = Dimensions.get('window').height;

const BORDER_COLOR = '#F8F8F8';
const ITEM_SIZE = WINDOW_HEIGHT * 0.15;
const ITEM_BORDER_RADIUS = ITEM_SIZE * 0.08;
const FONT_SIZE_TITLE = WINDOW_HEIGHT * 0.025;
const FONT_SIZE_TEXT = WINDOW_HEIGHT * 0.019;
const LostBoard = () => {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };



    const [posts, setPosts] = useState([]);

    const fetchDocs = async () => {
        try {
            const q = query(collection(fireStoreDB, "lostBoard"),
                where("isDeleted", "==", false),
                orderBy("date", "desc")
            );

            // 생성된 쿼리를 사용하여 문서들을 가져옵니다.
            const querySnapshot = await getDocs(q);
            const fetchedPosts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log("분실 게시글 가져옴");
            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    // useEffect(() => {
    //     fetchDocs();
    // }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchDocs();
        });

        // 컴포넌트 언마운트 시 리스너 제거
        return unsubscribe;
    }, [navigation])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchDocs().then(() => setRefreshing(false));
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity key={item.id}
            style={styles.item}
            onPress={() => navigation.navigate("LostBoardDetail", {
                id: item.id,
                imgURL: item.imageUrl ? { uri: item.imageUrl } : { uri: 'https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultPost.png?alt=media&token=8e3077f3-62e5-4786-8cc2-729d01d41e8a' },
                itemName: item.title,
                location: item.findLocation,
                date: item.date.toDate().toLocaleDateString('ko-KR'),
                money: item.thankMoney,
                tradeType: item.tradeType,
                tradeLocation: item.tradeLocation,
                articleExplain: item.description,
                displayName: item.displayName,
                profileImage: item.profileImage,
                sellUser: item.uid,
                type: "lost",
            })}>
            <Image
                {...{ preview, uri: item.imageUrl ? item.imageUrl : "https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultPost.png?alt=media&token=8e3077f3-62e5-4786-8cc2-729d01d41e8a" }}
                style={styles.itemImage}
                onError={(e) => console.log(e)}
            />
            <View style={styles.textContainer}>
                <Text style={styles.itemName} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.itemText} numberOfLines={1}>{item.findLocation}</Text>
                <Text style={styles.itemText}>{item.date.toDate().toLocaleDateString('ko-KR')}</Text>
                <TouchableOpacity style={styles.itemUser}
                    onPress={() => navigation.navigate("OpponentProfileTopTabNavigation", {
                        opponentUserID: item.uid,
                        profileImage: item.profileImage,
                        displayName: item.displayName,
                    })}>
                    <Text>{item.displayName}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
            <WriteButton type="lost" />
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