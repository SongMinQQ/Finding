import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const ProfileScreen = (props) => {
    const [name, setName] = useState(''); 
    const [profileImage, setProfileImage] = useState(null); 
    
const pickImage = () => {
    const options = {
        title: '이미지 선택',
        canceButtonTitle: '취소',
        takePhotoButtonTitle: '카메라로 사진 찍기',
        chooseFromLibraryButtonTitle: '갤러리에서 선택',
    };

    ImagePicker.showImagePicker(options, (Response) => {
        if (Response.didCancel) {
            console.log('이미지 선택이 취소되었습니다');
        } else if (Response.error) {
            console.log('에러: ', Response.error);
        } else {
            setProfileImage(Response.uri);
        }
    });
  };

const goBack = () => {
    props.navigation.goBack();
  };

/*
const saveProfileToServer = async () => {
    const fromData = new FormData();
    fromData.append('이름', name);
    fromData.append('프로필 이미지', {
        uri: profileImage,
        type: 'image/png',
        name: 'profile.png',
    });

    try {
        const response = await fetch(서버 api 주소, {
            method: 'POST',
            body: fromData,
            headers: {
                'content-Type': '인증 토큰',
            },
        });

        if (response.ok) {
            props.navigation.navigate('Login');
        } else {
            console.error('프로필 저장에 실패했습니다');
        }
    } catch (error) {
        console.error('프로필 저장 중 오류 발생:', error);
    }
};
*/

const completeProfile = () => {
    saveProfileToServer();
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={goBack}>
          <Text>{'<'}</Text>
        </TouchableOpacity>
        <Text>프로필 설정</Text>
        <TouchableOpacity onPress={completeProfile}>
          <Text>완료</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={{ width: 100, height: 100 }} />
        ) : (
          <Text>프로필 이미지 추가</Text>
        )}
      </TouchableOpacity>
      <TextInput
        placeholder="이름을 입력하세요"
        value={name}
        onChangeText={(text) => setName(text)}
      />
    </View>
  );
};
