import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import WriteButton from './WriteButton';
import { useNavigation } from '@react-navigation/native';
import { fireStoreDB } from '../../FireBase/DB';
import { collection, getDocs } from "firebase/firestore";

const WINDOW_HEIGHT = Dimensions.get('window').height;

const BORDER_COLOR = '#F8F8F8';
const ITEM_SIZE = WINDOW_HEIGHT * 0.15;
const ITEM_BORDER_RADIUS = ITEM_SIZE * 0.08;
const FONT_SIZE_TITLE = WINDOW_HEIGHT * 0.025;
const FONT_SIZE_TEXT = WINDOW_HEIGHT * 0.019;

// 게시글 10개씩 가져오기 코드
//   const fetchMoreDocs = async (lastVisible) => {
//     try {
//       const next = query(
//         collection(fireStoreDB, "findBoard"),
//         orderBy("createdAt"),
//         startAfter(lastVisible),
//         limit(10)
//       );

//       const documentSnapshots = await getDocs(next);
//       setPosts(prevState => {
//         const fetchedPosts = documentSnapshots.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         return [...prevState, ...fetchedPosts];
//       });
//     } catch (error) {
//       console.error("Error fetching additional documents: ", error);
//     }
//   };




const FindBoard = () => {
    const navigation = useNavigation();

    const [posts, setPosts] = useState([]);

    const fetchDocs = async () => {
        try {
            const querySnapshot = await getDocs(collection(fireStoreDB, "findBoard"));
            setPosts(prevState => {
                const fetchedPosts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                return [...prevState, ...fetchedPosts];
            });
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    useEffect(() => {
        fetchDocs();
    },[])
    const findItemData = [...Array(21)].map((_, index) => ({
        id: index,
        imgURL: `https://picsum.photos/id/${index}/200/200`,
        itemName: `물건 ${index + 1}`,
        category: `전자기기`,
        location: `위치 ${index + 1}`,
        date: `2023-10-${index + 1}`,
        money: `${index + 1}만원`,
        tradeType: `직거래`,
        tradeLocation: `천안`,
        articleExplain: `물건 ${index + 1}을 천안에서 찾았습니다. 연락주세요.`
    }));

    return (
        <>
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    {posts.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.item} onPress={() => navigation.navigate("FindBoardDetail", {
                            imgURL: item.imgUrl,
                            itemName: item.title,
                            // category: item.category,
                            location: item.findLocation,
                            // date: item.date,
                            money: item.thankMoney,
                            tradeType: item.tradeType,
                            tradeLocation: item.tradeLocation,
                            articleExplain: item.description,
                        })}>
                            <Image
                                source={{ uri: item.imgUrl }}
                                style={styles.itemImage}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.itemName}>{item.title}</Text>
                                <Text style={styles.itemText}>{item.findLocation}</Text>
                                {/* <Text style={styles.itemText}>{item.date}</Text> */}
                                <TouchableOpacity style={styles.itemUser}
                                    onPress={() => {
                                        // navigation.navigate('Home', {
                                        // screen: '프로필',})

                                        // fetchDocs();
                                        console.log(posts);

                                    }}>
                                    {/* 😎자리에 프로필 이미지 들어오도록 구현해야함.*/}
                                    {/* 채팅하기 버튼은 게시글 상세보기에 넣는게 좋을거 같아서 일단 뺌 */}
                                    <Text>😎홍길동</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <WriteButton type="find" />
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

export default FindBoard;