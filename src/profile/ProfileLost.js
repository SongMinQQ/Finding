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

const ProfileLost = () => {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };
   
    const uid = useSelector((state) => state.UID);
    const [posts, setPosts] = useState([]);

    // const lostItemData = [...Array(20)].map((_, index) => ({
    //     id: index,
    //     imgURL: `https://picsum.photos/id/${index + 21}/200/200`,
    //     itemName: `물건 ${index + 22}`,
    //     category: `전자기기`,
    //     location: `위치 ${index + 22}`,
    //     date: `2023-10-${index + 1}`
    // }));

    const fetchUserPosts = async () => {
        try {
            const userRef = doc(fireStoreDB, "users", uid); // UID는 현재 로그인한 사용자의 ID
            console.log("글ID 가져오기");
            const userDoc = await getDoc(userRef);
            console.log("글ID 가져오기 성공");
            const userPostsIds = userDoc.data().lostPosts; // 사용자가 작성한 글 ID 목록

            const postsData = [];
            for (const postId of userPostsIds) {
                const postRef = doc(fireStoreDB, "lostBoard", postId);
                console.log("글 정보 가져오기");
                const postDoc = await getDoc(postRef);
                console.log("글 정보 가져오기 성공");
                if (postDoc.exists()) {
                    postsData.push({ id: postDoc.id, ...postDoc.data() });
                    console.log(postsData);
                }
            }

            setPosts(postsData); // 가져온 게시글 정보로 상태 업데이트
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
                        style={ styles.item }
                        onPress={() => navigation.navigate("LostBoardDetail", {
                            imgURL: item.imageUrl,
                            itemName: item.title,
                            location: item.findLocation,
                            date: item.date.toDate().toLocaleDateString('ko-KR'),
                            displayName: item.displayName,
                            money: item.thankMoney,
                            tradeType: item.tradeType,
                            tradeLocation: item.tradeLocation,
                            articleExplain: item.description,
                            profileImage: item.profileImage,
                        })}>
                        <Image
                            {...{preview, uri: route.params.profileImage ? route.params.profileImage: "https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultProfile.png?alt=media&token=233e2813-bd18-4335-86a6-c11f92c96fc6"}}
                            style={styles.itemImage}
                            onError={(e) => console.log(e)}
                        />
                        <Text style={styles.itemName}>{item.title}</Text>
                        <Text style={styles.itemLocation}>{item.findLocation}</Text>

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


export default ProfileLost;