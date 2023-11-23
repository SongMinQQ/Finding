import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme, } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PickerSelect from 'react-native-picker-select';

const WINDOW_HEIGHT = Dimensions.get('window').height;


export default function JoinMembership({ navigation }) {
  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#007bff',
    },
  };

  // 사용자 입력값
  const [id, setID] = useState('');   // 아이디                        
  const [password, setPassword] = useState('');   // 비밀번호
  const [confirmPassword, setConfirmPassword] = useState('');   // 비밀번호 확인
  const [name, setName] = useState('');   // 이름
  const [birthday, setBirthday] = useState(null);   // 출생연도
  const [email, setEmail] = useState('');   // 이메일
  const [phoneNumber, setPhoneNumber] = useState('');   // 전화번호
  const [error, setError] = useState(null);   // 에러 메시지 
  const [status, setStatus] = useState(false);   // 상태
  const [verificationCode, setVerificationCode] = useState('');   // 인증 코드 
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (birthday) => {
    setBirthday(birthday);
    hideDatePicker();
  };

  //모달 관련 함수, 상태변수
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  const handleVerification = () => {
    // 본인 인증 기능 -> 전화번호로 인증번호 요청버튼 누르면 날라가는 기능 
  };

  const handleConfirmation = () => {
    Alert.alert('인증 번호 입력');
  };  // 인증번호 받고 값이 맞으면 가입 성공 아니면 다시 

  const handleSignup = () => {
    let newError = '';
    if(!email || !password || !confirmPassword || !birthday || !name){
      newError = '입력이 안된 값이 있습니다.';
    }
    else if (email.length < 8 || password.length < 8) {
      newError = '아이디와 비밀번호는 8자 이상이어야 합니다.';
    } else if (id.length > 20 || password.length > 20) {
      newError = '아이디와 비밀번호는 20자 이하여야 합니다.';
    } else if (password !== confirmPassword) {
      newError = '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
    } else {
      navigation.navigate("Login");
    }

    setError(newError);
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
    }}>
      <Text style={{ fontSize: 30, alignSelf: 'flex-start', fontWeight: 'bold' }}> Finding </Text>

      {/* 아이디 입력 */}
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

      {/* 비밀번호 입력 */}
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

      {/* 이름 입력 */}
      <TextInput style={styles.input}
        mode="outlined"
        value={name}
        placeholder="이름 입력"
        theme={theme}
        placeholderTextColor={'#BDBDBD'}
        autoCorrect={false}
        onChangeText={(text) => setName(text)}
      />

      {/* 출생 연도 */}
      <TextInput
        mode="outlined"
        style={styles.input}
        placeholder="출생연도"
        placeholderTextColor={'#BDBDBD'}
        value={birthday ? birthday.toLocaleDateString('ko-KR') : ""}
        onFocus={showDatePicker}
        theme={theme}
        onPressIn={openModal}
      />


      {/* 휴대전화번호 입력란과 '인증' 버튼 */}
      <View style={styles.inlineContainer}>
        <TextInput
          mode="outlined"
          style={[styles.input,{width: '80%'}]}
          value={phoneNumber}
          placeholder="휴대전화번호 입력"
          placeholderTextColor={'#ddd'}
          theme={theme}
          autoCorrect={false}
          keyboardType="phone-pad"
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TouchableOpacity style={styles.Button} onPress={handleVerification}>
          <Text style={{ color: 'white' }}>인증</Text>
        </TouchableOpacity>
      </View>

      {/* 인증번호 입력란과 '확인' 버튼 */}
      <View style={styles.inlineContainer}>
        <TextInput
          mode="outlined"
          style={[styles.input,{width: '80%'}]}
          value={verificationCode}
          placeholder="인증번호 입력"
          theme={theme}
          placeholderTextColor={'#ddd'}
          autoCorrect={false}
          keyboardType="phone-pad"
          onChangeText={(text) => setVerificationCode(text)}
        />
        <TouchableOpacity style={styles.Button} onPress={handleConfirmation}>
          <Text style={{ color: 'white' }}>확인</Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={{ color: 'red' }}>{error}</Text> }
      {/* 회원가입 버튼 */}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignup}
        >
        <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>

      {Platform.OS === 'ios' ? <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale="ko-KR"
      /> :
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date" // 또는 "time", "datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          locale="ko-KR"
        // display = "calendar"
        // value={new Date()}
        // display="default"
        />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 25,
  },

  title: {
    fontSize: 20,
    marginBottom: 20,
  },

  input: {
    width: '100%',
    backgroundColor: "#fff",
    height: WINDOW_HEIGHT * 0.06,
    marginBottom: 5,
  },

  inputWithMargin: {
    // ...styles.input,
    marginBottom: 20,
  },

  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },

  inlineInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
  },

  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },

  signupButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  signupText: {
    color: 'white',
    fontSize: 20,
  },

  pickerContainer: {
    flex: 1,
    marginRight: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },

  label: {
    paddingHorizontal: 10,
    paddingTop: 5,
    fontSize: 16,
    color: '#555',
  },

  picker: {
    height: 40,
  },
});

// export default JoinMembership