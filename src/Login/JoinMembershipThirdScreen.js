import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function ThirdScreen({ navigation }) {
  // 본인인증을 위한 상태 관리
  const [verificationCode, setVerificationCode] = useState('');

  // 본인인증 확인 버튼을 눌렀을 때의 처리
  const handleVerification = () => {
    // 여기서 API를 이용하여 본인인증 처리를 할 수 있습니다.
    // 성공 시 다음 화면으로 네비게이션을 이용해 이동할 수 있습니다.

    // navigation.navigate('SuccessScreen'); // 예시로 적어둔 성공 화면으로 이동
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>입력한 정보를 확인해주세요</Text>

      {/* 이메일, 아이디, 비밀번호, 생일, 이름을 보여주는 부분 */}
      <Text>Email: 입력한 이메일 주소</Text>
      <Text>아이디: 입력한 아이디</Text>
      <Text>비밀번호: *********</Text>
      <Text>생일: 입력한 생일</Text>
      <Text>이름: 입력한 이름</Text>

      {/* 본인인증 코드 입력란 */}
      <TextInput
        style={styles.input}
        placeholder="본인인증 코드"
        autoCorrect={false}
        returnKeyType="send"
        value={verificationCode}
        onChangeText={(text) => setVerificationCode(text)}
      />

      {/* 본인인증 확인 버튼 */}
      <TouchableOpacity style={styles.verificationButton} onPress={handleVerification}>
        <Text style={styles.verificationText}>본인인증 확인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  verificationButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  verificationText: {
    color: 'white',
    fontSize: 18,
  },
});