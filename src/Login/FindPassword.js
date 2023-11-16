import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';


const WINDOW_HEIGHT = Dimensions.get('window').height;

const FindPassword = ({ navigation }) => {
  // TextInput 클릭 시 테두리 색 변경하는 코드
  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#007bff', // 이거 바꾸면 됨
    },
  }
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.flexbox}>
        <Image style={styles.image} source={require('../../img/loginIcon.png')} />
        {/* 임시 로고(이미지로 만들 경우 교체해야 함) */}
        <Text style={styles.logoText}>Finding</Text>
        <Text style={[styles.logoText, { fontSize: WINDOW_HEIGHT * 0.017, marginBottom: WINDOW_HEIGHT * 0.1 }]}>비밀번호 찾기 페이지!</Text>
        
          <View style ={styles.forgotBox}>
          <TouchableOpacity style = {styles.forgot_button} onPress={() => navigation.navigate("Find Password Email")}><Text>비밀번호 이메일로 찾기</Text></TouchableOpacity>
          <TouchableOpacity style = {styles.forgot_button} onPress={() => navigation.navigate("Find Password PhoneNumber")}><Text>비밀번호 핸드폰으로 찾기</Text></TouchableOpacity>
          </View>
          </View> 
        </SafeAreaView>
        
    );
};

export default FindPassword;


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