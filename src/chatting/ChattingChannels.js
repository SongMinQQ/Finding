import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator } from "react-native";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { fireStoreDB } from "../../FireBase/DB";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Image } from '@rneui/themed';

import { useContext } from 'react';
import { LoadingContext } from '../Loading/LoadingContext';
import LoadingSpinner from '../Loading/LoadingSpinner';

const ChattingChannels = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const uid = useSelector((state) => state.UID);
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);

  const { loading } = useContext(LoadingContext);
  const { spinner } = useContext(LoadingContext);

  

  const dispatch = useDispatch();
  const opponentDisplayName = useSelector((state) => state.opponentDisplayName);

  const fetchChatRooms = async () => {
    const chatRoomsRef = collection(fireStoreDB, "channels");
    const q = query(chatRoomsRef, where(`participants.${uid}.uid`, "==", uid));

    setIsLoading(true);
    spinner.start();
    try {
      const querySnapshot = await getDocs(q);
      const fetchedChatRooms = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const participants = data.participants || {};
        const otherUserId = Object.keys(participants).find(participantUid => participantUid !== uid);
        const otherUser = participants[otherUserId] || {};
        return {
          id: doc.id,
          otherUserId: otherUserId,
          otherUserDisplayName: otherUser.displayName,
          otherUserProfileImage: otherUser.profileImage,
          ...data
        };
      });

      setChatRooms(fetchedChatRooms);
    } catch (error) {
      console.error("Error fetching chat rooms: ", error);
    } finally {
      setIsLoading(false);
      spinner.stop();
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, [uid]);

  const goToChat = (chatRoom) => {
    navigation.navigate('Chatting', { chatRoomId: chatRoom.id, chatRoom });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchChatRooms().then(() => setRefreshing(false));
  }, []);

  const getOpponentDisplayName = (item) => {
    dispatch({ type: 'SET_OPPONENT_DISPLAYNAME', payload: item.otherUserDisplayName });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chatRoomContainer} onPress={() => { getOpponentDisplayName(item); goToChat(item); }}>
      <Image
        source={{ uri: item.otherUserProfileImage ? item.otherUserProfileImage : "https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultProfile.png?alt=media&token=233e2813-bd18-4335-86a6-c11f92c96fc6" }}
        containerStyle={styles.profileImage}
        PlaceholderContent={<ActivityIndicator style={styles.profileImage}/>}
      />
      <Text style={styles.displayName}>{item.otherUserDisplayName}</Text>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      {loading && <LoadingSpinner />}
      <Text style={styles.emptyText}>
        {isLoading ? "채팅 정보 불러오는 중..." : "진행중인 채팅이 없습니다."}
      </Text>
    </View>
  );

  return (
    <FlatList
      style={{ backgroundColor: '#fff' }}
      contentContainerStyle={{ flexGrow: 1 }}
      data={chatRooms}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  chatRoomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#DADADA',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: '#888888',
  },
});
export default ChattingChannels;
