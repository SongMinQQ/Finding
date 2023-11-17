import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme, } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
const WINDOW_HEIGHT = Dimensions.get('window').height;

const FindPasswordEmail = ({ navigation }) => {
  // TextInput 클릭 시 테두리 색 변경하는 코드
  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#007bff', // 이거 바꾸면 됨
    },
  }
  // 유저 이메일 state
  const [userID, setUserID] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const _handleUserIDChange = text => {
    setUserID(text);
  }
  const _handleUserEmailChange = text => {
    setUserEmail(text);
  }
  return (
    <View style={styles.flexbox}>
      <TextInput style={styles.inputView}
        mode="outlined"
        placeholder='아이디'
        onChangeText={_handleUserIDChange}
        theme={theme}
      />
      <TextInput style={styles.inputView}
        mode="outlined"
        placeholder='이메일'
        keyboardType="email-address"
        onChangeText={_handleUserEmailChange}
        theme={theme}
      />

      <TouchableOpacity style={styles.correctBtn}
        onPress={() => {
          navigation.navigate("Home");
          console.log(`userEmail: ${userEmail}`);
        }}
      ><Text style={{ fontWeight: 'bold', color: 'white' }}>인증번호 받기</Text>
      </TouchableOpacity>
    </View>

  );
};


export default FindPasswordEmail;

const styles = StyleSheet.create({
  flexbox: {
    flex: 1,
    width: '100%',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: WINDOW_HEIGHT * 0.04,
  },

  inputView: {
    backgroundColor: "#fff",
    width: "90%",
    marginBottom: WINDOW_HEIGHT * 0.01,
  },

  correctBtn: {
    width: "90%",
    borderRadius: 25,
    height: WINDOW_HEIGHT * 0.06,
    alignItems: "center",
    justifyContent: "center",
    marginTop: WINDOW_HEIGHT * 0.02,
    backgroundColor: "#007bff",
  },

});