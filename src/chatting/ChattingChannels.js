import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { fireStoreDB } from '../../FireBase/DB';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const ChattingChannels = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const uid = useSelector((state) => state.UID);
    const navigation = useNavigation();
    useEffect(() => {
        
        const fetchChatRooms = async () => {
          const q = query(
            collection(fireStoreDB, "channels"),
            where("uid", "==", uid)
        );
    
        try {
            const querySnapshot = await getDocs(q);
            const rooms = querySnapshot.docs
            .map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
              // Filter out any rooms without a writerProfileImage or writerDisplayName
            .filter(doc => doc.writerProfileImage && doc.writerDisplayName);
    
            setChatRooms(rooms);
        } catch (error) {
            console.error("Error fetching chat rooms: ", error);
        }
        };
        fetchChatRooms();
        console.log(chatRooms);
    }, [uid]);

    const goToChat = (chatRoom) => {
        navigation.navigate('Chatting', { chatRoomId: chatRoom.id, chatRoom });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.chatRoomContainer} onPress={() => goToChat(item)}>
            <Image source={{ uri: item.writerProfileImage }} style={styles.profileImage} />
            <Text style={styles.displayName}>{item.writerDisplayName}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={chatRooms}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    );
};

const styles = StyleSheet.create({
    chatRoomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    displayName: {
        fontSize: 18,
    },
});
export default ChattingChannels;