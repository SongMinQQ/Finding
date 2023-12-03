import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';

import { TextInput } from 'react-native-paper';
import theme from '../PaperTheme';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { auth } from '../../FireBase/DB';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { storage } from '../../FireBase/DB';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { useContext } from 'react';
import { LoadingContext } from '../Loading/LoadingContext';
import LoadingSpinner from '../Loading/LoadingSpinner';



const WINDOW_HEIGHT = Dimensions.get('window').height;
const PROFILE_IMAGE_SIZE = WINDOW_HEIGHT * 0.18;



export default function JoinMembershipSecondScreen({ navigation: { navigate }, route }) {

  const navigation = useNavigation();

  const { loading } = useContext(LoadingContext);
  const { spinner } = useContext(LoadingContext);


  // 이름
  const [name, setName] = useState('');   // 이름
  const [error, setError] = useState(null);   // 에러 메시지 
  //image  address
  const [selectImageUrl, setImageUrl] = useState(null);
  //권한 요청
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const uploadImage = async () => {
    // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    // 이미지 업로드 기능
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1]
    });
    if (result.cancelled) {
      return null; // 이미지 업로드 취소한 경우
    }
    console.log(result);
    // 이미지 업로드 결과 및 이미지 경로 업데이트

    setImageUrl(result.assets[0].uri);
  };


  const uploadImageToFirebase = async (imageUri) => {
    // 이미지 파일 이름 (예: image_12345.jpg)
    const fileName = `profile_image_${new Date().getTime()}.jpg`;
    const storageRef = ref(storage, `profileImages/${fileName}`);

    try {
      // 이미지를 Blob 형태로 변환
      if (imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Blob을 Firebase Storage에 업로드
        await uploadBytesResumable(storageRef, blob);

        // 업로드된 이미지의 URL 가져오기
        const url = await getDownloadURL(storageRef);
        return url;
      } else {
        return null;
      }

    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };


  // 회원가입 버튼을 눌렀을 때의 처리
  const handleSignup = async () => {
    let newError = '';
    try {
      spinner.start();
      if (!name) {
        newError = '닉네임을 입력해주세요.';
      } else if (name.length < 2) {
        newError = '닉네임을 2글자 이상 입력해주세요.';
      } else {
        const firebaseImageUrl = await uploadImageToFirebase(selectImageUrl);
        await createUserWithEmailAndPassword(auth, route.params.email, route.params.password);

        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: firebaseImageUrl,
          phoneNumber: route.params.phoneNumber,
        }).then(() => {
          navigation.navigate("Join Membership Third");
        }).catch((error) => {
          console.error("에러남ㅅㄱ: " + error)
        });

      }
      setError(newError);
    } catch (e) {
      console.log("Error adding document: ", e);
    } finally {
      spinner.stop();
    }

  };



  return (
    <View style={styles.container}>
      {loading && <LoadingSpinner />}
      <View style={{ width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ marginBottom: 20, position: 'relative' }}
          onPress={uploadImage}>
          <Image
            source={selectImageUrl ? { uri: selectImageUrl } : require('../../img/defaultProfile.png')}
            style={styles.profileImage}
          />
          <View style={styles.cameraIcon}>
            <Fontisto name="camera" size={PROFILE_IMAGE_SIZE * 0.13} color="#FFF" />
          </View>

        </TouchableOpacity>
        <View style={styles.textInputBox}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textInputName}>닉네임</Text>
            <Text style={{ color: '#ff0000', fontWeight: 'bold' }}>*</Text>
          </View>
          <TextInput style={styles.input}
            mode="outlined"
            value={name}
            placeholder="닉네임 입력"
            theme={theme}
            placeholderTextColor={'#BDBDBD'}
            autoCorrect={false}
            onChangeText={(text) => setName(text)}
          />
        </View>
      </View>



      {/* 경고 메세지 및 회원가입 버튼 */}
      <View style={{ width: '100%' }}>
        {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignup}
        >
          <Text style={styles.signupText}>가입완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 50,
  },
  profileImage: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_SIZE / 2,
  },
  textInputBox: {
    width: '100%',
    marginBottom: 15,
  },
  textInputName: {
    fontSize: WINDOW_HEIGHT * 0.022,
    marginBottom: 10,
  },
  cameraIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 0,
    width: PROFILE_IMAGE_SIZE * 0.31,
    height: PROFILE_IMAGE_SIZE * 0.31,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#444444',
    borderRadius: PROFILE_IMAGE_SIZE * 0.31 / 2,
    padding: 5,
  },
  input: {
    width: '100%',
    backgroundColor: "#fff",
    height: WINDOW_HEIGHT * 0.06,
    marginBottom: 5,
  },
  signupButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 5,
  },
  signupText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: WINDOW_HEIGHT * 0.02,
  },
});