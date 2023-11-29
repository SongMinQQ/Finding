import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, doc, addDoc, onSnapshot, orderBy, serverTimestamp, query } from 'firebase/firestore';
import { fireStoreDB } from '../../FireBase/DB';
import { useSelector } from 'react-redux';

const Chatting = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const uid = useSelector((state) => state.UID); // Current logged-in user's UID
    const displayName = useSelector((state) => state.displayName); // Current logged-in user's UID
    const profileImg = useSelector((state) => state.profileImg); // Current logged-in user's UID
    const { chatRoomId } = route.params; // Chat room ID

    const onSend = useCallback((messagesToSend = []) => {
      messagesToSend.forEach(async (message) => {
          await addDoc(collection(fireStoreDB, "channels", chatRoomId, "messages"), {
              text: message.text,
              createdAt: serverTimestamp(),
              user: {
                  _id: uid,
                  name: displayName, // Replace with current user's name
                  avatar: profileImg,// ... other user properties
              },
          });
      });
  }, [chatRoomId, uid]);
  
  useEffect(() => {
      const messagesRef = collection(doc(fireStoreDB, "channels", chatRoomId), "messages");
      const q = query(messagesRef, orderBy("createdAt", "desc"));
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const newMessages = querySnapshot.docChanges()
              .filter(change => change.type === 'added') // Only process new messages
              .map(change => {
                  const doc = change.doc;
                  const firebaseData = doc.data();
                  const createdAt = firebaseData.createdAt?.toDate ? firebaseData.createdAt.toDate() : new Date();
  
                  return {
                      _id: `${firebaseData.user._id}_${doc.id}`, // Unique _id
                      text: firebaseData.text,
                      createdAt: createdAt,
                      user: firebaseData.user,
                  };
              });
  
          if (newMessages.length > 0) {
              setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
          }
      });
  
      return () => unsubscribe();
  }, [chatRoomId]);

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{ _id: uid }}
        />
    );
};

export default Chatting;
