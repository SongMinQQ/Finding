import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = () => {
    const options = {
      title: '이미지 선택',
      cancelButtonTitle: '취소',
      takePhotoButtonTitle: '카메라로 사진 찍기',
      chooseFromLibraryButtonTitle: '갤러리에서 선택',
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('이미지 선택이 취소되었습니다');
      } else if (response.error) {
        console.log('에러: ', response.error);
      } else {
        setProfileImage(response.uri);
      }
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  /*
  const saveProfileToServer = async () => {
      // 이 부분은 서버에 프로필 저장하는 코드입니다.
  };
  */

  const completeProfile = () => {
    // saveProfileToServer();
    // 이 부분에서 서버에 프로필 저장하는 코드를 호출하거나 필요한 작업을 수행합니다.
    navigation.navigate('MainScreen'); // 저장 후 메인 화면으로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Text>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>프로필 설정</Text>
        <TouchableOpacity onPress={completeProfile}>
          <Text>완료</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.addImageText}>프로필 이미지 추가</Text>
        )}
      </TouchableOpacity>
      <TextInput
        placeholder="이름을 입력하세요"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addImageText: {
    fontSize: 16,
    color: '#3498db',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

export default ProfileScreen;