import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Alert, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DetailMain from './DetailMain';
import { Image } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LoadingContext } from '../Loading/LoadingContext';
import LoadingSpinner from '../Loading/LoadingSpinner';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import theme from '../PaperTheme';

import { fireStoreDB } from '../../FireBase/DB';
import { doc, deleteDoc, updateDoc, collection, arrayUnion, arrayRemove, query, where, getDoc, addDoc, setDoc, getDocs } from "firebase/firestore";
import { useSelector } from 'react-redux';
import EditPostButton from './EditPostButton';

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
const ITEM_BORDER_RADIUS = WINDOW_HEIGHT * 0.006;


const LostBoardDetail = ({ navigation: { navigate }, route }) => {

  // useEffect(() => {
  //   console.log(route);
  // })
  const type = route.params.type;
  const {
    id,
    imgURL,
    itemName,
    location,
    date,
    money,
    tradeType,
    tradeLocation,
    articleExplain,
  } = route.params;

  const navigation = useNavigation();
  const { loading } = useContext(LoadingContext);
  const [findCount, setFindCount] = useState('');

  

  const { spinner } = useContext(LoadingContext);


  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleReport = () => {
    openModal();
    // 여기에 원하는 로직을 추가합니다.
  };

  const [reportTitle, setReportTitle] = useState('');
  const [reportContent, setReportContent] = useState('');
  // 네비게이션 헤더에 버튼 추가
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (uid != writerId ?
        <TouchableOpacity onPress={handleReport}>
          <FontAwesome name="exclamation-triangle" size={24} color="black" style={{ marginRight: 15 }} />
        </TouchableOpacity>
        :
        <EditPostButton
          type={type}
          id={id}
          imgURL={imgURL}
          itemName={itemName}
          location={location}
          date={date}
          money={money}
          tradeType={tradeType}
          tradeLocation={tradeLocation}
          articleExplain={articleExplain}
          displayName={route.params.displayName}
          profileImage={route.params.profileImage}
          sellUser={route.params.sellUser}
        />
      )
    });
  }, [navigation]);



  const findOrLost = "lost"

  const deletePost = async (postId) => {
    try {
      spinner.start();
      const postRef = doc(fireStoreDB, "lostBoard", postId);
      const isDeletedDoc = await getDoc(postRef);
      if (!isDeletedDoc.data().isDeleted) {

        await updateDoc(postRef, {
          isDeleted: true
        });

        const userRef = doc(fireStoreDB, "users", uid);
        await updateDoc(userRef, {
          lostPosts: arrayRemove(postId)
        });

        console.log("게시글 삭제 성공: ", postId);

      } else {
        Alert.alert('이미 삭제된 게시물입니다.');
        navigation.navigate('Home');
      }


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

      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userFindCount = userDoc.data().foundItemsCount;
        if (userFindCount) {
          setFindCount(userFindCount);
        } else {
          console.log("찾아준 횟수가 존재하지 않습니다.");
          setFindCount(0);
        }
      } else {
        console.log("찾아준 횟수가 존재하지 않습니다.");
        setFindCount(0);
      }

    } catch (error) {
      console.error("Error fetching user posts: ", error);
    }
  };

  const handleSave = async () => {
    const reportRef = doc(fireStoreDB, "lostBoardReport", route.params.id);
    await setDoc(reportRef, {
      reportInfo: arrayUnion({
        reportUser: uid,
        reportTitle: reportTitle,
        reportContent: reportContent,
      })
    }, { merge: true });

    setModalVisible(false);
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

  const handleChatPress = async () => {
    // Create a unique chat room ID using both user IDs
    const chatRoomId = [writerId, uid].sort().join('_');

    // Check if the chat room already exists
    const chatRoomQuery = query(collection(fireStoreDB, "channels"), where("chatRoomId", "==", chatRoomId));
    const querySnapshot = await getDocs(chatRoomQuery);

    // Proceed to create a new chat room only if it doesn't exist
    if (querySnapshot.empty) {
      // Firestore document for the chat room
      await addDoc(collection(fireStoreDB, "channels"), {
        chatRoomId: chatRoomId, // Unique identifier for the chat room
        participants: {
          [uid]: {
            uid: uid,
            displayName: displayName, // Display name of the current user
            profileImage: profileImg != null ? profileImg : 'https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultProfile.png?alt=media&token=233e2813-bd18-4335-86a6-c11f92c96fc6'
            
          },
          [writerId]: {
            uid: writerId,
            displayName: route.params.displayName, // Display name of the writer
            profileImage: route.params.profileImage != null ? route.params.profileImage : 'https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultProfile.png?alt=media&token=233e2813-bd18-4335-86a6-c11f92c96fc6'
            
          }
        },
        createdAt: new Date(), // Timestamp when the chat room is created
      });
    }

    // Navigate to the chat screen with the chatRoomId
    navigation.navigate('Home', {
      screen: '채팅',
    });
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

            <Text style={styles.requireText}>{route.params.money}원</Text>
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
        <TouchableOpacity style={styles.profileSection}
          onPress={() => navigation.navigate("OpponentProfileTopTabNavigation", {
            opponentUserID: route.params.sellUser,
            profileImage: route.params.profileImage,
            displayName: route.params.displayName,
          })}>

          <Image
            source={{ uri: route.params.profileImage ? route.params.profileImage : "https://firebasestorage.googleapis.com/v0/b/finding-e15ab.appspot.com/o/images%2FdefaultProfile.png?alt=media&token=233e2813-bd18-4335-86a6-c11f92c96fc6" }}
            containerStyle={styles.profileImage}
            PlaceholderContent={<ActivityIndicator style={styles.profileImage}/>}
          />
          <View style={styles.userInfo}>
            <Text style={styles.textMedium}>{route.params.displayName}</Text>
            <Text style={styles.textSmall}>찾아준 횟수: {findCount}번</Text>
          </View>
          {/* '채팅하기' 버튼 추가 */}
          {writerId != uid && <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
            <Text style={styles.buttonText}>채팅하기</Text>
          </TouchableOpacity>}
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                  <Text style={styles.modalHeader}>게시글 신고하기</Text>
                  <TouchableOpacity
                    onPress={closeModal}
                    style={{ alignSelf: 'flex-start' }}>
                    <FontAwesome name="close" size={FONT_SIZE_LARGE} color="#000" />
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.input}
                  mode="outlined"
                  onChangeText={setReportTitle}
                  value={reportTitle}
                  theme={theme}
                  placeholder="신고 제목"
                />
                <TextInput
                  mode="outlined"
                  style={[styles.input, { height: WINDOW_HEIGHT * 0.4 }]}
                  onChangeText={setReportContent}
                  value={reportContent}
                  theme={theme}
                  multiline={true}
                  placeholder="신고 내용"
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    fontSize: WINDOW_HEIGHT * 0.017,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center', // 모달을 가운데로 정렬합니다.
    width: '90%', // 모달의 너비를 확장합니다.
    height: '70%', // 모달의 최대 높이를 설정합니다.
    justifyContent: 'space-between', // 모달 내부의 요소들을 세로 방향으로 가운데 정렬합니다.
  },
  modalHeader: {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1, // 모달 컨테이너가 전체 화면을 차지하도록 설정
    justifyContent: 'center', // 수직 방향으로 중앙 정렬
    alignItems: 'center', // 가로 방향으로 중앙 정렬
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    width: '100%',
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    width: '100%', // 저장 버튼의 너비를 늘립니다.
    alignItems: 'center', // 버튼 내부의 텍스트를 가운데로 정렬합니다.
  },
  saveButtonText: {
    color: "white",
    fontSize: FONT_SIZE_SMALL,
    fontWeight: "bold",
  },

});

export default LostBoardDetail;