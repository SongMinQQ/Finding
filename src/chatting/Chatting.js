import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, doc, addDoc, onSnapshot, orderBy, serverTimestamp, query } from 'firebase/firestore';
import { fireStoreDB } from '../../FireBase/DB';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

const Chatting = ({ route }) => {
  //메세지들이 저장되는 state
  const [messages, setMessages] = useState([]);
  //현재 로그인된 유저 정보 redux에서 불러옴
  const uid = useSelector((state) => state.UID); // Current logged-in user's UID
  const displayName = useSelector((state) => state.displayName); // Current logged-in user's displayName
  const profileImg = useSelector((state) => state.profileImg); // Current logged-in user's profileImg
  //현재 채팅방의 ID를 CjattingChannels.js에서 받아옴. 상대 채팅 유저를 알아내기 위해 필요
  const { chatRoomId } = route.params; // Chat room ID

  //메세지를 보낼때 작동하는 함수
  const onSend = useCallback((messagesToSend = []) => {
    messagesToSend.forEach(async (message) => {
      //channels의 채팅방 ID의 서브 컬렉션으로 messages를 추가. text, 보낸 시간, 유저 정보를 저장
        await addDoc(collection(fireStoreDB, "channels", chatRoomId, "messages"), {
            text: message.text,
            createdAt: serverTimestamp(),
            user: {
                _id: uid,
                name: displayName,
                avatar: profileImg,
            },
        });
    });
  }, [chatRoomId, uid]);

  useEffect(() => {
    const messagesRef = collection(doc(fireStoreDB, "channels", chatRoomId), "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));
    //onSnapshot은 실시간으로 firebase의 변경상태를 감지하는 함수. firebase의 message 컬렉션이 변경되면 바로바로 반영한다.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //새 메세지가 추가될 때 메세지 전송 중복을 docChanges 함수로 방지함
        const newMessages = querySnapshot.docChanges()
            .filter(change => change.type === 'added') // Only process new messages
            .map(change => {
                const doc = change.doc;
                const firebaseData = doc.data();
                const createdAt = firebaseData.createdAt?.toDate ? firebaseData.createdAt.toDate() : new Date();
                //react-native-gifted-chat은 채팅에 고유한 id가 필요. 이를 위한 id 생성. column은 _id 고정. 공식문서 참조
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
  //messages는 메세지를 렌더링. onSend는 사용자가 메세지를 보내는 동작을 할때 수행. _id는 현재 로그인된 유저 uid를 redux에서 받아옴. 공식문서 참조
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{ _id: uid }}
      />
      </View>
    );
};

export default Chatting;
