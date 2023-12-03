import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fireStoreDB } from '../../FireBase/DB';
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { Image } from "react-native-expo-image-cache";


const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const ITEM_SIZE = WINDOW_HEIGHT * 0.14;
const numOfItem = Math.floor(WINDOW_WIDTH / ITEM_SIZE);
const ITEM_PADDING_SIZE = (WINDOW_WIDTH - (ITEM_SIZE * numOfItem)) / (numOfItem + 1);
const ITEM_BORDER_RADIUS = ITEM_SIZE * 0.08;
const ITEM_TEXT_SIZE_LARGE = ITEM_SIZE * 0.15;
const ITEM_TEXT_SIZE_SMALL = ITEM_SIZE * 0.12;

const ProfileFind = () => {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };

    const uid = useSelector((state) => state.UID);
    const [posts, setPosts] = useState([]);


    const fetchUserPosts = async () => {
        try {
            const userRef = doc(fireStoreDB, "users", uid); // UID는 현재 로그인한 사용자의 ID

            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userPostsIds = userDoc.data().findPosts; // 사용자가 작성한 글 ID 목록
                
                if (userPostsIds) {
                    const postsData = [];
                    for (const postId of userPostsIds) {
                        const postRef = doc(fireStoreDB, "findBoard", postId);

                        const postDoc = await getDoc(postRef);

                        if (postDoc.exists()) {
                            postsData.push({ id: postDoc.id, ...postDoc.data() });
                            console.log(postsData);
                        }
                    }
                    setPosts(postsData); // 가져온 게시글 정보로 상태 업데이트
                }
            } else {
                console.log("습득 물건 게시글이 없습니다.");
            }
        } catch (error) {
            console.error("Error fetching user posts: ", error);
        }
    };

    useEffect(() => {
        fetchUserPosts();
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchUserPosts().then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.container}>
                {posts.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.item}
                        onPress={() => navigation.navigate("FindBoardDetail", {
                            imgURL: item.imageUrl ? { uri: item.imageUrl } : { uri: 'https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultPost.png?alt=media&token=8e3077f3-62e5-4786-8cc2-729d01d41e8a' },
                            itemName: item.title,
                            location: item.findLocation,
                            date: item.date.toDate().toLocaleDateString('ko-KR'),
                            displayName: item.displayName,
                            sellUser: item.uid,
                            money: item.thankMoney,
                            tradeType: item.tradeType,
                            tradeLocation: item.tradeLocation,
                            articleExplain: item.description,
                            profileImage: item.profileImage,

                        })}>

                        <Image
                            {...{ preview, uri: item.imageUrl ? item.imageUrl : "https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultPost.png?alt=media&token=8e3077f3-62e5-4786-8cc2-729d01d41e8a" }}
                            style={styles.itemImage}
                            onError={(e) => console.log(e)}
                        />
                        <Text style={styles.itemName} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.itemLocation} numberOfLines={1}>{item.findLocation}</Text>
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
        marginLeft: ITEM_PADDING_SIZE,
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
