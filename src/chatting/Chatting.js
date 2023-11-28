import React, { useState, useCallback, useEffect } from 'react'
import { collection, addDoc, onSnapshot, orderBy, serverTimestamp, query } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat'
import { View, StyleSheet } from 'react-native';
import { fireStoreDB } from '../../FireBase/DB';
import { useSelector } from 'react-redux';

const Chatting = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const { chatRoomId, chatRoom } = route.params;

    const uid = useSelector((state) => state.UID);
    const displayName = useSelector((state) => state.displayName);
    const profileImg = useSelector((state) => state.profileImg);

    // Function to subscribe to chat messages
    const subscribeToChatMessages = (chatRoomId, updateMessages) => {
        const messagesRef = collection(fireStoreDB, "chatRooms", chatRoomId, "messages");
      
        return onSnapshot(
          query(messagesRef, orderBy("createdAt", "asc")),
          (querySnapshot) => {
            const newMessages = [];
            querySnapshot.docChanges().forEach(({ type, doc }) => {
              if (type === "added") {
                const data = doc.data();
                if (doc.id) { // Check if doc.id is not undefined
                  // Ensure 'createdAt' is a valid timestamp
                  const createdAt = data.createdAt?.seconds ? new Date(data.createdAt.seconds * 1000) : new Date();
                  // Use document ID as message _id
                  const message = {
                    _id: doc.id,
                    text: data.text,
                    createdAt: createdAt,
                    user: {
                      _id: data.user._id,
                      name: data.user.name,
                      avatar: data.user.avatar,
                    },
                  };
                  newMessages.push(message);
                }
              }
            });
      
            if (newMessages.length > 0) {
              updateMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
            }
          }
        );
      };

    useEffect(() => {
        const unsubscribe = subscribeToChatMessages(chatRoomId, newMessages => {
            setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
        });
    
        return () => unsubscribe(); // Make sure to unsubscribe when the component unmounts
    }, [chatRoomId]);

    const onSend = useCallback((messages = []) => {
        // Here you would send messages to Firebase
        // For each message in messages, you would add it to the Firestore collection
        messages.forEach(message => {
            sendMessageToFirebase(chatRoomId, message);
        });
    }, [chatRoomId]);

    const sendMessageToFirebase = async (chatRoomId, message) => {
        // Add a new message to the Firestore collection
        await addDoc(collection(fireStoreDB, "chatRooms", chatRoomId, "messages"), {
          text: message.text,
          createdAt: serverTimestamp(), // Use server timestamp to avoid client-side time discrepancies
          user: message.user,
        });
      };

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: uid, // Use the actual logged-in user's ID
                    name: displayName, // Optionally, include other user details
                    avatar: profileImg,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    input: {
        flex: 1,
        // borderTop: 1,
        // borderTopColor: 'black',
        paddingHorizontal: 16,
    },
    textArea: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#E5E5EA',
        paddingVertical: 5,
    },
    sendButton: {
        paddingHorizontal: 16,
    },
})
export default Chatting;