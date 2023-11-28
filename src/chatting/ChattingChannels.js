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
          // 첫 번째 쿼리: uid가 현재 사용자의 uid와 일치하는 채팅방
          const q1 = query(collection(fireStoreDB, "channels"), where("uid", "==", uid));
          // 두 번째 쿼리: writerId가 현재 사용자의 uid와 일치하는 채팅방
          const q2 = query(collection(fireStoreDB, "channels"), where("writerId", "==", uid));
      
          try {
            // 두 쿼리 모두 실행
            const [querySnapshot1, querySnapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);
            // 두 결과를 하나의 배열로 병합
            const combinedRooms = [...querySnapshot1.docs, ...querySnapshot2.docs]
              .map(doc => ({
                id: doc.id,
                ...doc.data()
              }))
              // 동일한 채팅방 제거 (uid와 writerId가 같은 경우)
              .filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
              // 필터링 조건 적용
              .filter(doc => doc.writerProfileImage && doc.writerDisplayName);
      
            setChatRooms(combinedRooms);
          } catch (error) {
            console.error("Error fetching chat rooms: ", error);
          }
        };
        fetchChatRooms();
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