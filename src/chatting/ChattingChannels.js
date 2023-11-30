import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { fireStoreDB } from "../../FireBase/DB";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ChattingChannels = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const uid = useSelector((state) => state.UID);
  const navigation = useNavigation();

  const fetchChatRooms = async () => {
    const chatRoomsRef = collection(fireStoreDB, "channels");
    const q = query(chatRoomsRef, where(`participants.${uid}.uid`, "==", uid));
    try {
      const querySnapshot = await getDocs(q);
      const fetchedChatRooms = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const participants = data.participants || {};
        const otherUserId = Object.keys(participants).find((participantUid) => participantUid !== uid);
        const otherUser = participants[otherUserId] || {};
        return {
          id: doc.id,
          otherUserId: otherUserId,
          otherUserDisplayName: otherUser.displayName,
          otherUserProfileImage: otherUser.profileImage,
          ...data,
        };
      });

      setChatRooms(fetchedChatRooms);
    } catch (error) {
      console.error("Error fetching chat rooms: ", error);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, [uid]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchChatRooms().then(() => setRefreshing(false));
  }, []);

  const goToChat = (chatRoom) => {
    navigation.navigate("Chatting", { chatRoomId: chatRoom.id, chatRoom });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.chatRoomContainer} onPress={() => goToChat(item)}>
      <Image source={{ uri: item.otherUserProfileImage }} style={styles.profileImage} />
      <Text style={styles.displayName}>{item.otherUserDisplayName}</Text>
    </TouchableOpacity>
  );
  return <FlatList data={chatRooms} renderItem={renderItem} keyExtractor={(item) => item.id} refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
}/>;
};

const styles = StyleSheet.create({
  chatRoomContainer: {
    flexDirection: "row",
    alignItems: "center",
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
