import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function SecondScreen({ navigation }) {
  // 사용자 입력값을 상태로 관리
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [name, setName] = useState('');

  // 회원가입 버튼을 눌렀을 때의 처리
  const handleSignup = () => {
    // 입력값이 비어있는지 확인
    if (!email || !username || !password || !confirmPassword || !birthday || !name) {
      alert('모든 값을 입력해주세요.');
      return;
    }

    // 여기서 파이어베이스 또는 API를 이용하여 회원가입 처리를 할 수 있습니다.
    // 이후 세 번째 창으로 네비게이션을 이용해 이동할 수 있습니다.

    // navigation.navigate('ThirdScreen'); // 예시로 적어둔 세 번째 창으로 이동
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>당신의 정보를 입력해주세요</Text>

      {/* 이메일 입력란 */}
      <TextInput
        style={styles.input}
        placeholder="이메일 주소"
        keyboardType="email-address"
        autoCorrect={false}
        returnKeyType="send"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* 아이디 입력란 */}
      <TextInput
        style={styles.input}
        placeholder="아이디"
        autoCorrect={false}
        returnKeyType="send"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      {/* 비밀번호 입력란 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry={true}
        autoCorrect={false}
        returnKeyType="send"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* 비밀번호 확인 입력란 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        secureTextEntry={true}
        autoCorrect={false}
        returnKeyType="send"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      {/* 생일 입력란 */}
      <TextInput
        style={styles.input}
        placeholder="생일"
        autoCorrect={false}
        returnKeyType="send"
        value={birthday}
        onChangeText={(text) => setBirthday(text)}
      />

      {/* 이름 입력란 */}
      <TextInput
        style={styles.input}
        placeholder="이름"
        autoCorrect={false}
        returnKeyType="send"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      {/* 회원가입 버튼 */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>회원가입</Text>
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
  signupButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  signupText: {
    color: 'white',
    fontSize: 18,
  },
});