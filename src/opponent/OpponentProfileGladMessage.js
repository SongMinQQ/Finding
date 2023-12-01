import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Modal, Button, RefreshControl } from 'react-native';
import GladMessageDialog from '../profile/GladMessageDialog';

import { useNavigation } from '@react-navigation/native';

import { fireStoreDB } from '../../FireBase/DB';
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { Image } from 'expo-image';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const PROFILE_IMAGE_SIZE = WINDOW_HEIGHT * 0.09;
const CARD_BORDER_RADIUS = WINDOW_HEIGHT * 0.01;
const TEXT_SIZE_MEDIUM = WINDOW_HEIGHT * 0.022;
const TEXT_SIZE_SMALL = WINDOW_HEIGHT * 0.012;


const OpponentProfileGladMessage = ({ opponentUserID }) => {
    const navigation = useNavigation();

    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
  
    const [posts, setPosts] = useState([]);


    const handleCardPress = (index) => {
        setSelectedMessage(index);
        setDialogVisible(true);
    };

    const fetchGladMessages = async () => {
        try {
            const userRef = doc(fireStoreDB, "users", opponentUserID); // UID는 현재 로그인한 사용자의 ID

            const userDoc = await getDoc(userRef);

    
            if (userDoc.exists()) {
                const gladMessages = userDoc.data().gladMessages; // 사용자의 감사 메시지 배열
                if (gladMessages && Array.isArray(gladMessages)) {
                    setPosts(gladMessages);
                } else {
                    console.log("감사 메시지가 존재하지 않습니다.");
                }
            } else {
                console.log("유저 데이터가 존재하지 않습니다.");
            }
        } catch (error) {
            console.error("감사 메시지 가져오기 오류:", error);
        }
    };

    useEffect(() => {
        fetchGladMessages();
    }, [])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchGladMessages().then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.container}>
                {posts.map((message, index) => (
                    <TouchableOpacity key={index} onPress={() => handleCardPress(message)}>
                        <View style={styles.card}>
                            <Image
                                source={ message.profileImage }
                                style={styles.profileImage}
                            />
                                <View style={styles.messageContainer}>
                                    <Text style={styles.itemName}>{message.displayName}</Text>
                                    <Text
                                        style={styles.messageText}
                                        numberOfLines={2}
                                        ellipsizeMode='tail'
                                    >
                                        {message.message}
                                    </Text>
                                </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {selectedMessage && (
                <GladMessageDialog
                    visible={dialogVisible}
                    onClose={() => setDialogVisible(false)}
                    message={selectedMessage.message}
                    userName={selectedMessage.displayName}
                    lostArticle={selectedMessage.itemName}
                    profileImage={selectedMessage.profileImage}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    card: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 15,
        borderRadius: CARD_BORDER_RADIUS,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    profileImage: {
        width: PROFILE_IMAGE_SIZE,
        height: PROFILE_IMAGE_SIZE,
        borderRadius: PROFILE_IMAGE_SIZE / 2,
        marginRight: 15,
    },
    messageContainer: {
        flex: 1,
    },
    itemName: {
        fontSize: TEXT_SIZE_MEDIUM,
        fontWeight: 'bold',
    },
    messageText: {
        fontSize: TEXT_SIZE_SMALL,
        marginTop: 5,
    }
});

export default OpponentProfileGladMessage;
