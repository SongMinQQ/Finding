import React from 'react'
import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme, } from 'react-native-paper';
import { Image } from 'expo-image';
import { useSelector } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';


const WINDOW_HEIGHT = Dimensions.get('window').height;

const PROFILE_IMAGE_SIZE = WINDOW_HEIGHT * 0.18;

const ProfileEdit = () => {
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newProfileImg, setNewProfileImg] = useState('');

  const uid = useSelector((state) => state.UID); // Current logged-in user's UID
  const displayName = useSelector((state) => state.displayName); // Current logged-in user's displayName
  const profileImg = useSelector((state) => state.profileImg); // Current logged-in user's profileImg
  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#007bff',
    },
  };

  const profileEdit = async() => {
    try{
      
    }
    catch(error) {

    }
    finally {

    }
  }
  return (
<View style={styles.container}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ marginBottom: 20, position: 'relative' }}
          // onPress={uploadImage}
        >
          <Image
            source={profileImg ? { uri: profileImg } : require('../../img/defaultProfile.png')}
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
          // onPress={handleSignup}
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
    borderRadius:  PROFILE_IMAGE_SIZE * 0.31 / 2, 
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
export default ProfileEdit;
