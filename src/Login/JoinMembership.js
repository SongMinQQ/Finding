import React, { useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PickerSelect from 'react-native-picker-select';

export default function JoinMembership({ navigation }) {
  // 사용자 입력값
  const [id, setID] = useState('');   // 아이디                        
  const [password, setPassword] = useState('');   // 비밀번호
  const [confirmPassword, setConfirmPassword] = useState('');   // 비밀번호 확인
  const [name, setName] = useState('');   // 이름
  const [birthday, setBirthday] = useState('');   // 생일
  const [email, setEmail] = useState('');   // 이메일
  const [phoneNumber, setPhoneNumber] = useState('');   // 전화번호
  const [error, setError] = useState('');   // 에러 메시지 
  const [status, setStatus] = useState(false);   // 상태
  const [verificationCode, setVerificationCode] = useState('');   // 인증 코드 
  const [selectedYear, setSelectedYear] = useState(null);   //년도
  const [selectedMonth, setSelectedMonth] = useState(null);   // 월
  const [selectedDay, setSelectedDay] = useState(null);   //일
  
  // const birth = () => {
  //   const years = Array.from({ length: 83 }, (_, index) => 1940 + index);// 1940부터 2022까지 년도
  //   const months = Array.from({ length: 12 }, (_, index) => index + 1);// 1부터 12까지의 월
  //   const days = Array.from({ length: 31 }, (_, index) => index + 1);    // 1부터 31까지의 일
  // }
 

  const handleVerification = () => {
    // 본인 인증 기능 -> 전화번호로 인증번호 요청버튼 누르면 날라가는 기능 
  };

  const handleConfirmation = () => {
    if (status) {
      Alert.alert('가입 성공!');
    } else {
      Alert.alert('입력값을 확인하세요.');
    }
  };  // 인증번호 받고 값이 맞으면 가입 성공 아니면 다시 

  const handleSignup = () => {
    if (!email || !id || !password || !confirmPassword || !birthday || !name) {
      alert('모든 값을 입력해주세요.'); // 필수값이 비어있으면 알림을 띄움 
      return;
    }
    // 회원가입 처리 기능 (firebase, api)
  };

  const hasError = () => {
    let newError = '';
  
    if (id.length < 8 || password.length < 8) {
      newError = '아이디와 비밀번호는 8자 이상이어야 합니다.';
    } else if (id.length > 20 || password.length > 20) {
      newError = '아이디와 비밀번호는 20자 이하여야 합니다.';
    } else if (password !== confirmPassword) {
      newError = '비밀번호가 일치하지 않습니다.';
    } else {
      newError = '';
    }

    setError(newError);
  };

  useEffect(() => {
    hasError();

    if (password === confirmPassword && password.length >= 8) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [password, confirmPassword]);

  const allFieldsFilled = id && password && confirmPassword && name && birthday && email;
  const isSignupEnabled = allFieldsFilled && password === confirmPassword;
  
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 25,
    }}>
      <Text style={{ transform: [{ scale: 3 }], marginBottom: 100 , color: '#3498db' }}> Finding </Text>
    
      {/* 아이디 입력 */}
      <TextInput
        style={{ ...styles.input, margintop: 10 }}
        value={id}
        placeholder="아이디 입력"
        placeholderTextColor={'#ddd'}
        returnKeyType="next"
        autoCorrect={false}
        keyboardType="default"
        onChangeText={(text) => setID(text)}
      />

      {/* 비밀번호 입력 */}
      <TextInput
        style={styles.input}
        value={password}
        placeholder="비밀번호 입력"
        placeholderTextColor={'#ddd'}
        returnKeyType="next"
        secureTextEntry={true}
        autoCorrect={false}
        keyboardType="visble-password"
        onChangeText={(text) => setPassword(text)}
      />

      {/* 비밀번호 재확인 입력 */}
      <TextInput
        style={styles.input}
        value={confirmPassword}
        placeholder="비밀번호 확인"
        placeholderTextColor={'#ddd'}
        returnKeyType="next"
        secureTextEntry={true}
        autoCorrect={false}
        keyboardType="visble-password"
        onChangeText={(text) => setConfirmPassword(text)}
      />

      {/* 이름 입력 */}
      <TextInput
        style={styles.input}
        value={name}
        placeholder="이름 입력"
        placeholderTextColor={'#ddd'}
        returnKeyType="next"
        autoCorrect={false}
        keyboardType="default"
        onChangeText={(text) => setName(text)}
      />
      
      {/* 생일 입력 */}
      {/* <TextInput
        style={styles.input}
        value={birthday}
        placeholder="생일 설정"
        placeholderTextColor={'#ddd'}
        returnKeyType="next"
        autoCorrect={false}
        keyboardType="default"
        onChangeText={(text) => setBirthday(text)}
      /> */}

      {/* 출생 연도 */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>출생 연도</Text>
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="선택" value={null} />
          {/* {years.map((year) => (
            <Picker.Item key={year} label={year.toString()} value={year} />
          ))} */}
        </Picker>
      </View>

      {/* 월 */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>월</Text>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="선택" value={null} />
          {/* {months.map((month) => (
            <Picker.Item key={month} label={month.toString()} value={month} />
          ))} */}
        </Picker>
      </View>

      {/* 일 */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>일</Text>
        <Picker
          selectedValue={selectedDay}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="선택" value={null} />
          {/* {days.map((day) => (
            <Picker.Item key={day} label={day.toString()} value={day} />
          ))} */}
        </Picker>
      </View>

      {/* 이메일 입력 */}
      <TextInput
        style={styles.input}
        value={email}
        placeholder="이메일 주소 입력"
        placeholderTextColor={'#ddd'}
        returnKeyType="done"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      
      {/* 휴대전화번호 입력란과 '인증' 버튼 */}
      <View style={styles.inlineContainer}>
        <TextInput
          style={styles.inlineInput}
          value={phoneNumber}
          placeholder="휴대전화번호 입력"
          placeholderTextColor={'#ddd'}
          returnKeyType="done"
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
          style={styles.inlineInput}
          value={verificationCode}
          placeholder="인증번호 입력"
          placeholderTextColor={'#ddd'}
          returnKeyType="done"
          autoCorrect={false}
          keyboardType="phone-pad"
          onChangeText={(text) => setVerificationCode(text)}
        />
          <TouchableOpacity style={styles.Button} onPress={handleConfirmation}>
          <Text style={{ color: 'white' }}>확인</Text>
          </TouchableOpacity>
      </View>

      {/* 회원가입 버튼 */}
      <TouchableOpacity
        style={allFieldsFilled && isSignupEnabled ? styles.signupButton : styles.signupDisableButton}
        onPress={allFieldsFilled && isSignupEnabled ? handleSignup : null}
        disabled={!allFieldsFilled || !isSignupEnabled}>
        <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>

      <Text style={{ color: 'red' }}>{error}</Text>
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 0,
    padding: 10,
    fontSize: 20,
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
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },

  signupButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginTop: 50,
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