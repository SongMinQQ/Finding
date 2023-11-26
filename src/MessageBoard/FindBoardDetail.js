import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DetailMain from './DetailMain';
import { Image } from 'expo-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { fireStoreDB } from '../../FireBase/DB';
import { collection,  query, where, getDocs } from "firebase/firestore";


const WINDOW_HEIGHT = Dimensions.get('window').height;

const PROFILE_SECTION_HEIGHT = WINDOW_HEIGHT * 0.16;
const PROFILE_SECTION_PADDING = WINDOW_HEIGHT * 0.017;
const PROFILE_IMAGE_SIZE = WINDOW_HEIGHT * 0.12;
const PROFILE_IMAGE_MARGIN_RIGHT = WINDOW_HEIGHT * 0.03;

const MAIN_SELECT_LAYOUT_HEIGHT = WINDOW_HEIGHT * 0.14;
const ICON_AREA_LAYOUT_HEIGHT = WINDOW_HEIGHT * 0.08;

const BUTTON_PADDING = WINDOW_HEIGHT * 0.01; // 예: 전체 높이의 1%
const FONT_SIZE_LARGE = WINDOW_HEIGHT * 0.03;
const FONT_SIZE_MEDIUM = WINDOW_HEIGHT * 0.025;
const FONT_SIZE_SMALL = WINDOW_HEIGHT * 0.02;
const ITEM_SIZE = WINDOW_HEIGHT * 0.15;
const ITEM_BORDER_RADIUS = ITEM_SIZE * 0.08;

const FindBoardDetail = ({ navigation: { navigate }, route }) => {
  const navigation = useNavigation();

  const findOrLost = "find";
  const [profileImage, setProfileImage] = useState(''); 
  const [userName,setUserName] = useState(null); 

  const fetchUserData = async (uid) => {
    try {
      const usersRef = collection(fireStoreDB, "users");
      const q = query(usersRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setProfileImage(data.profileImageURL);
        setUserName(data.name);
      });
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    fetchUserData("Vm6cVPllNeZzZpa4KBUl5OxlHwQ2");
}, [])

  const handleFindPress = () => {
    navigation.navigate("PaymentLegalAgree", {
      imgURL: route.params.imgURL,
      itemName: route.params.itemName,
      location: route.params.location,
      date: route.params.date,
      userName: userName,
    });
  };

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
          onPress={handleFindPress}
          findOrLost={findOrLost}
        />
        <Text style={styles.requireHeader}>요구 사항</Text>

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
            //source={require('../../img/defaultProfile.png')}
            source={profileImage ? { uri: profileImage } : require('../../img/defaultProfile.png')}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.textMedium}>{userName}</Text>
            <Text style={styles.textSmall}>친절점수 : 90점</Text>
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

export default FindBoardDetail;
