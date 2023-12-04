import React, { useContext, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';

import { TextInput } from 'react-native-paper';
import theme from '../PaperTheme';

import { Image } from 'expo-image';

import { auth } from '../../FireBase/DB';
import { signInWithEmailAndPassword } from "firebase/auth";

import { LoadingContext } from '../Loading/LoadingContext';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../Loading/LoadingSpinner';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useContext(LoadingContext);


  //로딩화면 구현을 위한 context 가져오기
  const { spinner } = useContext(LoadingContext);

  const handleLogin = async () => {
    try {
      spinner.start();
      await signInWithEmailAndPassword(auth, userID, userPW);

      const user = auth.currentUser;
      dispatch({ type: 'SET_DISPLAYNAME', payload: user.displayName });
      dispatch({ type: 'SET_PROFILE_IMG', payload: user.photoURL });
      dispatch({ type: 'SET_ID', payload: user.uid });
      console.log('uid: ' + user.uid);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      // 로그인 성공 처리
    } catch (error) {
      // 로그인 실패 처리
      setLoginFail(true);
      console.log('로그인 실패');
    } finally {
      spinner.stop();
    }
  };

  // 유저 아이디 및 비번 state
  const [userID, setUserID] = useState('');
  const [userPW, setUserPW] = useState('');

  const _handleUserIDChange = text => {
    setLoginFail(false);
    setUserID(text);
  }
  const _handleUserPWChange = text => {
    setLoginFail(false);
    setUserPW(text);
  }

  // 비밀번호 보이게 하기 or 안 보이게 하기 설정값
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleToggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const [loginFail, setLoginFail] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'flex-start' }}>
      {loading && <LoadingSpinner />}
      <View style={styles.flexbox}>
        <Image style={styles.image} source={require('../../img/loginIcon.png')} />
        {/* 임시 로고(이미지로 만들 경우 교체해야 함) */}
        <Text style={styles.logoText}>Finding</Text>
        <Text style={[styles.logoText, { fontSize: WINDOW_HEIGHT * 0.017, marginBottom: WINDOW_HEIGHT * 0.08 }]}>나의 분실물을 찾아라!</Text>

        <TextInput style={styles.inputView}
          mode="outlined"
          placeholder='아이디'
          onChangeText={_handleUserIDChange}
          autoCorrect={false}
          keyboardType="email-address"
          theme={theme}
        />
        <TextInput style={styles.inputView}
          mode="outlined"
          secureTextEntry={secureTextEntry} // IOS에서 글자 보이게 하면 한글 입력할 수 있게 바뀜(보완 필요)
          placeholder="비밀번호"
          onChangeText={_handleUserPWChange}
          autoCorrect={false}
          theme={theme}
          right={
            <TextInput.Icon
              icon={secureTextEntry ? "eye-off" : "eye"}
              onPress={handleToggleSecureEntry}
              forceTextInputFocus={false}
            />
          }
        />
        {loginFail && <Text style={{ color: '#ff0000' }}>아이디 혹은 비밀번호가 잘못되었습니다.</Text>}
        <TouchableOpacity style={styles.loginBtn}
          onPress={handleLogin}
        ><Text style={{ fontWeight: 'bold', color: 'white', fontSize: WINDOW_HEIGHT * 0.02 }}>로그인</Text>
        </TouchableOpacity>
        <View style={styles.signBox}>

          <View style={[styles.signButtonContainer, { justifyContent: 'flex-end' }]}>
            <TouchableOpacity
              onPress={() => { navigation.navigate("Join Membership") }}>
              <Text style={{ fontWeight: 'bold' }}>회원가입</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={[styles.signButtonContainer, { justifyContent: 'flex-start' }]}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Find Password")}>
              <Text style={{ fontWeight: 'bold' }}>비밀번호 재설정</Text>
            </TouchableOpacity>
          </View>

        </View>


      </View>
    </View>
  );
};


export default Login;

const styles = StyleSheet.create({
  flexbox: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: WINDOW_HEIGHT * 0.11,
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

  signBox: {
    flexDirection: "row",
    width: '80%',
    alignItems: 'center',
    marginTop: 25,
    justifyContent: "center",
  },

  signButtonContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },

  divider: {
    height: 15,
    width: 0.5,
    marginHorizontal: 25,
    backgroundColor: "#000",
  },
  loginBtn: {
    width: "90%",
    borderRadius: WINDOW_HEIGHT * 0.06 / 2,
    height: WINDOW_HEIGHT * 0.06,
    alignItems: "center",
    justifyContent: "center",
    marginTop: WINDOW_HEIGHT * 0.01,
    backgroundColor: "#007bff",
  },

});