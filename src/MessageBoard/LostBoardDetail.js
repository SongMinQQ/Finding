import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DetailMain from './DetailMain';
import { Image } from "react-native-expo-image-cache";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LoadingContext } from '../Loading/LoadingContext';
import LoadingSpinner from '../Loading/LoadingSpinner';
import { useFocusEffect } from '@react-navigation/native';

import { fireStoreDB } from '../../FireBase/DB';
import { doc, deleteDoc, updateDoc, collection, arrayUnion, arrayRemove, query, where, getDoc, addDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const PROFILE_SECTION_HEIGHT = WINDOW_HEIGHT * 0.16;
const PROFILE_SECTION_PADDING = WINDOW_HEIGHT * 0.017;
const PROFILE_IMAGE_SIZE = WINDOW_HEIGHT * 0.1;
const PROFILE_IMAGE_MARGIN_RIGHT = WINDOW_HEIGHT * 0.03;

const MAIN_SELECT_LAYOUT_HEIGHT = WINDOW_HEIGHT * 0.14;
const ICON_AREA_LAYOUT_HEIGHT = WINDOW_HEIGHT * 0.08;

const BUTTON_PADDING = WINDOW_HEIGHT * 0.01; // 예: 전체 높이의 1%
const FONT_SIZE_LARGE = WINDOW_HEIGHT * 0.03;
const FONT_SIZE_MEDIUM = WINDOW_HEIGHT * 0.025;
const FONT_SIZE_SMALL = WINDOW_HEIGHT * 0.02;
const ITEM_SIZE = WINDOW_HEIGHT * 0.15;
const ITEM_BORDER_RADIUS = ITEM_SIZE * 0.08;


const LostBoardDetail = ({ navigation: { navigate }, route }) => {
    const navigation = useNavigation();
    const { loading } = useContext(LoadingContext);
    const [findCount, setFindCount] = useState('');

    const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };

    const { spinner } = useContext(LoadingContext);

    const findOrLost = "lost"
    const userName = "홍길동"

    const deletePost = async (postId) => {
        try {
            spinner.start();
            const postRef = doc(fireStoreDB, "lostBoard", postId);
            await deleteDoc(postRef);

            const userRef = doc(fireStoreDB, "users", uid);
            await updateDoc(userRef, {
                lostPosts: arrayRemove(postId)
            });
            console.log("Document successfully deleted: ", postId);
        } catch (error) {
            console.error("Error removing document: ", error);
        } finally {
            spinner.stop();
            navigation.navigate('Home');
        }
    };


    const fetchUserCount = async () => {
        try {
            const userRef = doc(fireStoreDB, "users", route.params.sellUser);
            console.log("글ID 가져오기");
            const userDoc = await getDoc(userRef);
            console.log("글ID 가져오기 성공");
            const userFindCount = userDoc.data().foundItemsCount ? userDoc.data().foundItemsCount:0;
            setFindCount(userFindCount);
        } catch (error) {
            console.error("Error fetching user posts: ", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchUserCount();
            // 페이지가 포커스 될 때마다 실행될 로직을 여기에 작성합니다.

            return () => {
                // 포커스가 사라질 때 실행될 클린업 로직이 필요하다면 여기에 작성합니다.
            };
        }, [route.params])
    );


    const handleDeletePress = () => {
        deletePost(route.params.id);
    };

    const writerId = route.params.sellUser;
    const uid = useSelector((state) => state.UID);
    //현재 로그인한 사용자의 닉네임
    const displayName = useSelector((state) => state.displayName);
    //현재 로그인한 사용자의 프로필 사진
    const profileImg = useSelector((state) => state.profileImg);

    const handleChatPress = () => {
        navigation.navigate('Home', {
            screen: '채팅',
        })
    };

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <DetailMain
                    imgURL={route.params.imgURL}
                    itemName={route.params.itemName}
                    location={route.params.location}
                    date={route.params.date}
                    onPress={handleDeletePress}
                    findOrLost={findOrLost}
                    writerId={writerId}
                />
                <Text style={styles.requireHeader}>보답 사항</Text>

                <View style={styles.requireSelectLayout}>
                    <View style={styles.requireInfoBox}>
                        <View style={styles.iconArea}>
                            <FontAwesome name="dollar" size={ICON_AREA_LAYOUT_HEIGHT * 0.5} color={'#000'} />
                        </View>

                        <Text style={styles.requireText}>{route.params.money}</Text>
                    </View>
                    <View style={styles.requireInfoBox}>
                        <View style={styles.iconArea}>
                            <FontAwesome5 name="handshake" size={ICON_AREA_LAYOUT_HEIGHT * 0.5} color={'#000'} />

                        </View>
                        <Text style={styles.requireText}>{route.params.tradeType}</Text>
                    </View>
                    <View style={styles.requireInfoBox}>
                        <View style={styles.iconArea}>
                            <Ionicons name="location" size={ICON_AREA_LAYOUT_HEIGHT * 0.5} color={'#000'} />

                        </View>
                        <Text style={styles.requireText}>{route.params.tradeLocation}</Text>
                    </View>
                </View>
                <Text style={styles.item}>{route.params.articleExplain}</Text>
                <View style={styles.profileSection}>
                    <Image
                        {...{preview, uri: route.params.profileImage ? route.params.profileImage: "https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultProfile.png?alt=media&token=233e2813-bd18-4335-86a6-c11f92c96fc6"}}
                        style={styles.profileImage}
                        onError={(e) => console.log(e)}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.textMedium}>{route.params.displayName}</Text>
                        <Text style={styles.textSmall}>찾아준 횟수: {findCount}번</Text>
                    </View>
                    {/* '채팅하기' 버튼 추가 */}
                    <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
                        <Text style={styles.buttonText}>채팅하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        padding: 10,
    },
    requireHeader: {
        fontSize: FONT_SIZE_MEDIUM,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    requireText: {
        fontSize: FONT_SIZE_SMALL,
        fontWeight: 'bold',
    },
    imageContainer: {
        alignItems: 'center',
        margin: 10,
    },
    requireSelectLayout: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: MAIN_SELECT_LAYOUT_HEIGHT,
        width: '100%',
        marginBottom: 10,
        gap: 5,
        borderBottomWidth: 1,
        borderColor: '#F2F2F2',
    },
    image: {
        width: ITEM_SIZE * 0.5,
        height: ITEM_SIZE * 0.5,
        borderRadius: ITEM_BORDER_RADIUS,
    },
    imageText: {
        marginTop: 5,
        fontSize: 12,
    },
    item: {
        fontSize: FONT_SIZE_SMALL,
        marginVertical: 15,
        minHeight: 70,
    },
    requireInfoBox: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconArea: {
        alignItems: 'center',
        justifyContent: 'center',
        width: ICON_AREA_LAYOUT_HEIGHT,
        height: ICON_AREA_LAYOUT_HEIGHT,
        borderRadius: ICON_AREA_LAYOUT_HEIGHT / 2,
        borderWidth: 2,
        borderColor: '#000',
        marginBottom: 10,
    },
    textInput: {
        width: '100%',
        backgroundColor: '#fff',
        height: WINDOW_HEIGHT * 0.055,
    },
    profileSection: {
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
        backgroundColor: '#EFF7FF',
        height: PROFILE_SECTION_HEIGHT,
        padding: PROFILE_SECTION_PADDING,
        alignItems: 'center',
        borderRadius: 20,
    },
    profileImage: {
        width: PROFILE_IMAGE_SIZE,
        height: PROFILE_IMAGE_SIZE,
        borderRadius: PROFILE_IMAGE_SIZE / 2,
        marginRight: PROFILE_IMAGE_MARGIN_RIGHT
    },
    textMedium: {
        fontSize: FONT_SIZE_LARGE,
        fontWeight: 'bold',
        marginBottom: 10
    },
    textSmall: {
        fontSize: FONT_SIZE_SMALL,
        marginBottom: 5
    },
    chatButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        padding: BUTTON_PADDING,
        backgroundColor: '#007bff',
        borderRadius: ITEM_BORDER_RADIUS,
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center'
    },

});

export default LostBoardDetail;