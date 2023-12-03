import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { TextInput } from 'react-native-paper';
import theme from '../PaperTheme';

import { auth } from '../../FireBase/DB';
import { app } from '../../FireBase/DB';

import { signInWithCredential, deleteUser, PhoneAuthProvider } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

import { useContext } from 'react';
import { LoadingContext } from '../Loading/LoadingContext';
import LoadingSpinner from '../Loading/LoadingSpinner';

const WINDOW_HEIGHT = Dimensions.get('window').height;

export default function JoinMembership({ navigation }) {


  const { loading } = useContext(LoadingContext);

  const { spinner } = useContext(LoadingContext);

  // 사용자 입력값
  const [email, setEmail] = useState('');   // 이메일
  const [password, setPassword] = useState('');   // 비밀번호
  const [confirmPassword, setConfirmPassword] = useState('');   // 비밀번호 확인
  const [phoneNumber, setPhoneNumber] = useState('');   // 전화번호
  const [error, setError] = useState(null);   // 에러 메시지 


  const recaptchaVerifier = React.useRef(null);

  const [isSend, setIsSend] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  // 인증 코드 전송 함수
  const sendVerificationCode = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        "+82" + phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      Alert.alert('인증번호 전송 성공');
    } catch (err) {
      Alert.alert('인증번호 전송 실패: ' + err);
    }

  };

  // 인증 코드 확인 함수
  const verifyPhoneNumber = async () => {
    try {
      spinner.start();
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);

      // Firebase에 인증 요청
      const userCredential = await signInWithCredential(auth, credential);

      // 인증 성공 후 즉시 계정 삭제 처리
      await deleteUser(userCredential.user);

      navigation.navigate("Join Membership Second", {
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      });
    } catch (err) {
      Alert.alert('잘못된 인증번호입니다. 다시 시도해주세요.');
      console.log('휴대폰 인증 오류: ' + err)
    } finally {
      spinner.stop();
    }
  };


  // 전화번호 전송 버튼 실행 함수
  const handleVerification = () => {
    if (!isSend) {
      sendVerificationCode();
      setIsSend(true);
    } else {
      Alert.alert("인증코드는 한번만 보낼 수 있습니다.")
    }
  };



  // 정보 입력 완료 함수
  const handleSignup = () => {
    let newError = '';
    // 이메일 형식을 검증하는 정규 표현식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password || !confirmPassword) {
      newError = '입력이 안된 값이 있습니다.';
    }
    else if (!emailRegex.test(email)) {
      newError = '유효한 이메일 형식이 아닙니다.';
    } else if (password.length < 6) {
      newError = '비밀번호는 6자 이상이어야 합니다.';
    } else if (password.length > 40) {
      newError = '비밀번호는 40자 이하여야 합니다.';
    } else if (password !== confirmPassword) {
      newError = '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
    } else if (!isSend) {
      newError = '휴대폰 인증을 완료해주세요.';
    } else {
      verifyPhoneNumber();
    }

    setError(newError);
  };

  return (
    <>
      <View style={styles.container}>
        {loading && <LoadingSpinner />}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          {/* 이메일 입력 */}
          <View style={{ width: '100%' }}>
            <View style={styles.textInputBox}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textInputName}>이메일</Text>
                <Text style={{ color: '#ff0000', fontWeight: 'bold' }}>*</Text>
              </View>
              <TextInput style={styles.input}
                mode="outlined"
                value={email}
                placeholder="이메일 입력"
                theme={theme}
                placeholderTextColor={'#BDBDBD'}
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
              />
            </View>


            {/* 비밀번호 입력 */}
            <View style={styles.textInputBox}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textInputName}>비밀번호</Text>
                <Text style={{ color: '#ff0000', fontWeight: 'bold' }}>*</Text>
              </View>
              <TextInput style={styles.input}
                mode="outlined"
                value={password}
                placeholder="비밀번호 입력"
                theme={theme}
                placeholderTextColor={'#BDBDBD'}
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={(text) => setPassword(text)}
              />

              {/* 비밀번호 재확인 입력 */}
              <TextInput style={styles.input}
                mode="outlined"
                value={confirmPassword}
                placeholder="비밀번호 확인"
                theme={theme}
                placeholderTextColor={'#BDBDBD'}
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={(text) => setConfirmPassword(text)}
              />
            </View>


            {/*전화번호 입력 및 인증*/}
            <View style={styles.textInputBox}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textInputName}>전화번호</Text>
                <Text style={{ color: '#ff0000', fontWeight: 'bold' }}>*</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                  mode="outlined"
                  style={[styles.input, { width: '65%' }]}
                  value={phoneNumber}
                  placeholder="휴대전화번호 입력"
                  placeholderTextColor={'#BDBDBD'}
                  theme={theme}
                  keyboardType="phone-pad"
                  onChangeText={(text) => setPhoneNumber(text)}
                />
                <TouchableOpacity style={styles.verifyButton} onPress={handleVerification}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>인증번호 발송</Text>
                </TouchableOpacity>
              </View>
              <TextInput style={styles.input}
                mode="outlined"
                value={verificationCode}
                placeholder="인증번호"
                theme={theme}
                placeholderTextColor={'#BDBDBD'}
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={(text) => setVerificationCode(text)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>


        {/* 경고 메세지 및 회원가입 버튼 */}
        <View style={{ width: '100%' }}>
          {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignup}
          >
            <Text style={[styles.signupText]}>가입하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
      />
    </>
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
  textInputBox: {
    width: '100%',
    marginBottom: 15,
  },
  textInputName: {
    fontSize: WINDOW_HEIGHT * 0.022,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: "#fff",
    height: WINDOW_HEIGHT * 0.06,
    marginBottom: 5,
  },
  verifyButton: {
    width: '33%',
    height: WINDOW_HEIGHT * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
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