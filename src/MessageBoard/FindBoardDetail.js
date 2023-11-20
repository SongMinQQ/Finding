import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DetailMain from './DetailMain';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const PROFILE_SECTION_HEIGHT = WINDOW_HEIGHT * 0.15;
const PROFILE_SECTION_PADDING = WINDOW_HEIGHT * 0.015;
const PROFILE_IMAGE_SIZE = WINDOW_HEIGHT * 0.1;
const PROFILE_IMAGE_MARGIN_RIGHT = WINDOW_HEIGHT * 0.03;

const MAIN_SELECT_LAYOUT_HEIGHT = WINDOW_HEIGHT * 0.18;
const ICON_AREA_LAYOUT_HEIGHT = WINDOW_HEIGHT * 0.1;

const BUTTON_PADDING = WINDOW_HEIGHT * 0.01; // 예: 전체 높이의 1%
const FONT_SIZE_LARGE = WINDOW_HEIGHT * 0.025;
const FONT_SIZE_SMALL = WINDOW_HEIGHT * 0.02;
const ITEM_SIZE = WINDOW_HEIGHT * 0.15;
const ITEM_BORDER_RADIUS = ITEM_SIZE * 0.08;

const FindBoardDetail = ({ navigation: { navigate }, route }) => {
  const navigation = useNavigation();

  const findOrLost = "find";
  const userName = "홍길동";

  const handleFindPress = () => {
    navigation.navigate("PaymentLegalAgree", {
      imgURL: route.params.imgURL,
      itemName: route.params.itemName,
      category: route.params.category,
      location: route.params.location,
      date: route.params.date,
      userName: userName,
    });
  };

  const handleChatPress = () => {
    navigation.navigate("Chatting"); // 채팅하기 버튼을 클릭시 화면 넘김
  };

  return (
    <View style={styles.container}>
      <DetailMain
        imgURL={route.params.imgURL}
        itemName={route.params.itemName}
        category={route.params.category}
        location={route.params.location}
        date={route.params.date}
        onPress={handleFindPress}
        findOrLost={findOrLost}
      />
      <View style={styles.textContainer}>
        <Text style={styles.requireList}> 요구 사항 </Text>
      </View>
      <View style={styles.requireSelectLayout}>
                    <View style={styles.requireInfoBox}>
                        <View style={styles.iconArea}>
                            <FontAwesome name="dollar" size={ICON_AREA_LAYOUT_HEIGHT * 0.5} color={'#000'} />

                        </View>

                        <Text>5만원 이상</Text>
                    </View>
                    <View style={styles.requireInfoBox}>
                        <View style={styles.iconArea}>
                            <FontAwesome5 name="handshake" size={ICON_AREA_LAYOUT_HEIGHT * 0.5} color={'#000'} />

                        </View>
                        <Text> 거래방법</Text>
                    </View>
                    <View style={styles.requireInfoBox}>
                        <View style={styles.iconArea}>
                            <Ionicons name="location" size={ICON_AREA_LAYOUT_HEIGHT * 0.5} color={'#000'} />

                        </View>
                        <Text>천안</Text>
                    </View>
                </View>
      <Text style={styles.item}> 여기에 설명을 추가해주세요 </Text>
      <View style={styles.profileSection}>
            <Image
                source={ require('../../img/defaultProfile.png') }
                style={styles.profileImage}
            />
            <View style={styles.userInfo}>
                <Text style={styles.textMedium}>홍길동</Text>
                <Text style={styles.textSmall}>친절점수 : 90점</Text>
            </View>
            {/* '채팅하기' 버튼 추가 */}
            <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
                <Text style={styles.buttonText}>채팅하기</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    flexDirection: "column",
    alignItems: 'left',
    paddingHorizontal: 10,
  },
  requireList: {
    fontSize: FONT_SIZE_LARGE,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    margin: 10,
  },
  requireSelectLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: MAIN_SELECT_LAYOUT_HEIGHT,
    width: '100%',
    marginBottom: 10,
    gap: 5,
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
    fontSize: FONT_SIZE_LARGE,
    padding: 10,
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
    borderWidth: 5,
    borderColor: '#000',
    marginBottom: 10,
},
textInput: {
    width: '100%',
    backgroundColor: '#fff',
    height: WINDOW_HEIGHT* 0.055,
},
profileSection: {
    flexDirection: 'row',
    width: '100%',
    height: PROFILE_SECTION_HEIGHT,
    padding: PROFILE_SECTION_PADDING,
    alignItems: 'center',
    backgroundColor: 'white'
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
