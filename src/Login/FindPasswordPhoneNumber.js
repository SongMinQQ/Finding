import React, { useState } from 'react';
import { View, Text, Dimensions, Button, StyleSheet, TouchableOpacity } from 'react-native';

import { TextInput } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme, } from 'react-native-paper';
const WINDOW_HEIGHT = Dimensions.get('window').height;

const FindPasswordPhoneNumber = ({ navigation }) => {
  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#007bff', // 이거 바꾸면 됨
    },
  };
  // 유저 아이디 및 비번 state
  const [userName, setUserName] = useState('');
  const [userPhoneNum, setUserPhoneNum] = useState('');

  const _handleUserNameChange = text => {
    setUserName(text);
  }
  const _handleUserPhoneNumChange = text => {
    setUserPhoneNum(text);
  }
  return (
    <View>
      <Text style={styles.title}>비밀번호 번호로 찾기 페이지</Text>
      <TextInput style={styles.inputView}
        mode="outlined"
        placeholder="유저 이름"
        onChangeText={_handleUserNameChange}
        theme={theme} />
      <TextInput style={styles.inputView}
        mode="outlined"
        placeholder="핸드폰 번호"
        onChangeText={_handleUserPhoneNumChange}
        theme={theme}
      />
      <TouchableOpacity style={styles.correctBtn} onPress={() => navigation.navigate("Home")}><Text>확인</Text></TouchableOpacity>
    </View>
  );

}



export default FindPasswordPhoneNumber;


const styles = StyleSheet.create({

  flexbox: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: WINDOW_HEIGHT * 0.07,
  },

  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: WINDOW_HEIGHT * 0.1,
    height: WINDOW_HEIGHT * 0.1,
    margin: WINDOW_HEIGHT * 0.02,
  },

  logoText: {
    fontWeight: 'bold',
    fontSize: WINDOW_HEIGHT * 0.06,
  },
  buttonContainer: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputView: {
    backgroundColor: "#fff",
    width: "90%",
    marginBottom: WINDOW_HEIGHT * 0.02,
  },
  correctBtnBtn: {
    width: "100%",
    borderRadius: 25,
    height: WINDOW_HEIGHT * 0.06,
    alignItems: "center",
    justifyContent: "center",
    marginTop: WINDOW_HEIGHT * 0.01,
    backgroundColor: "#007bff",
  },

  forgotBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forgot_button: {
    margin: WINDOW_HEIGHT * 0.02,
  },


});
