import React, { useEffect } from 'react'
import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme, } from 'react-native-paper';
import { Image } from 'expo-image';
import { useDispatch, useSelector } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { auth } from '../../FireBase/DB';
import { updateProfile } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../FireBase/DB';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const WINDOW_HEIGHT = Dimensions.get('window').height;

const PROFILE_IMAGE_SIZE = WINDOW_HEIGHT * 0.18;

const ProfileEdit = ({ navigation }) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.UID); // Current logged-in user's UID
  const displayName = useSelector((state) => state.displayName); // Current logged-in user's displayName
  const profileImg = useSelector((state) => state.profileImg); // Current logged-in user's profileImg

  const [newDisplayName, setNewDisplayName] = useState(displayName);
  const [selectImageUrl, setSelectImageUrl] = useState(profileImg);
  const [loading, setLoading] = useState(false);


  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#007bff',
    },
  };

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

    setSelectImageUrl(result.assets[0].uri);
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

  const profileEdit = async () => {
    try {
      setLoading(true);
      const firebaseImageUrl = await uploadImageToFirebase(selectImageUrl);
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
        photoURL: firebaseImageUrl
      }).then(() => {
        dispatch({ type: 'SET_DISPLAYNAME', payload: newDisplayName });
        dispatch({ type: 'SET_PROFILE_IMG', payload: firebaseImageUrl });
        navigation.navigate('Home', {
          screen: '프로필'
        })
      })
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      {loading &&
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      }
      <View style={{ width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ marginBottom: 20, position: 'relative' }}
          onPress={uploadImage}
        >
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
            value={newDisplayName}
            placeholder="닉네임 입력"
            theme={theme}
            placeholderTextColor={'#BDBDBD'}
            autoCorrect={false}
            onChangeText={(text) => setNewDisplayName(text)}
          />
        </View>
      </View>
      {/* 프로필 수정버튼 */}
      <View style={{ width: '100%' }}>
        {/* {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>} */}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={profileEdit}
        >
          <Text style={styles.signupText}>프로필 수정</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
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
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
});
export default ProfileEdit;
