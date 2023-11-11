// import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Button, Dimensions, StyleSheet } from 'react-native';
import { MD3LightTheme as DefaultTheme, } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { TextInput } from 'react-native-paper';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const Login = ({ navigation }) => {
  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#007bff',
    },
  };

  const [userID, setUserID] = useState('');
  const [userPW, setUserPW] = useState('');

  const _handleUserIDChange = text => {
    setUserID(text);
  }
  const _handleUserPWChange = text => {
    setUserPW(text);
  }
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleToggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  // const navigation = useNavigation();
  return (
    <View style={styles.flexbox}>
      <Image style={styles.image} source={require('../../img/loginIcon.png')} />
      <Text style={styles.logoText}>Finding</Text>
      <Text style={[styles.logoText,{fontSize: WINDOW_HEIGHT * 0.017, marginBottom: WINDOW_HEIGHT * 0.1}]}>나의 분실물을 찾아라!</Text>
      {/* <TextInput style={styles.inputView}
        placeholder="Username"
        placeholderTextColor="#003f5c"
        value={this.state.username}
        onChangeText={(text) => this.setState({ username: text })} />
      <TextInput style={styles.inputView}
        placeholder="Password"
        placeholderTextColor="#003f5c"
        value={this.state.password}
        onChangeText={(text) => this.setState({ password: text })}
        secureTextEntry={true} /> */}
      <TextInput style={styles.inputView}
        mode="outlined"
        placeholder='아이디'
        onChangeText={_handleUserIDChange}
        theme={theme}
      />
      <TextInput style={styles.inputView}
        mode="outlined"
        secureTextEntry={secureTextEntry} // 글자 보이게 하면 한글 입력할 수 있게 바뀜(보완 필요)
        placeholder="비밀번호"
        onChangeText={_handleUserPWChange}
        theme={theme}
        right={
          <TextInput.Icon
            icon={secureTextEntry ? "eye-off" : "eye"}
            onPress={handleToggleSecureEntry}
            forceTextInputFocus={false}
          />
        }
      />


      <View style={styles.buttonContainer}>
        {/* <SafeAreaView> */}
        {/* <TouchableOpacity style={styles.forgot_button} onPress={() => navigation.navigate("Find Id")}><Text> 자동로그인</Text></TouchableOpacity> */}
        <View style={styles.forgotBox}>
          <TouchableOpacity style={styles.forgot_button}
            onPress={() => navigation.navigate("Find Id")}>
            <Text>아이디 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgot_button}
            onPress={() => navigation.navigate("Find Password")}>
            <Text>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginBtn}
          onPress={() => {
            navigation.navigate("Home")
            console.log(`userID: ${userID}`);
            console.log(`userPW: ${userPW}`)
          }}
        ><Text style={{fontWeight:'bold', color:'white'}}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupBtn}
          onPress={() => navigation.navigate("Join Membership")}>
          <Text style={{fontWeight:'bold'}}>회원가입</Text>
        </TouchableOpacity>
        {/* </SafeAreaView> */}

      </View>
    </View>

  );
};


export default Login;

const styles = StyleSheet.create({
  flexbox: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: WINDOW_HEIGHT * 0.1,
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
  icon: {
    marginRight: 10,
  },
  inputView: {
    backgroundColor: "#fff",
    width: "90%",
    marginBottom: WINDOW_HEIGHT * 0.02, 
  },

  forgotBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forgot_button: {
    height: 20,
    margin: WINDOW_HEIGHT * 0.02, 
  },
  signupBtn: {
    margin: WINDOW_HEIGHT * 0.01, 
  },
  loginBtn: {
    width: "100%",
    borderRadius: 25,
    height: WINDOW_HEIGHT * 0.06, 
    alignItems: "center",
    justifyContent: "center",
    marginTop: WINDOW_HEIGHT * 0.01,
    backgroundColor: "#007bff",
  },
});