import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

// 아이콘 사이즈
const ICON_CIRCLE_SIZE = WINDOW_HEIGHT * 0.15; 
// 결제 완료 메세지 사이즈
const MESSAGE_FONT_SIZE = WINDOW_HEIGHT * 0.03; 
// 버튼 높이
const BUTTON_HEIGHT = WINDOW_HEIGHT * 0.06; 
// 버튼 너비
const BUTTON_WIDTH = WINDOW_WIDTH * 0.35;
// 버튼 텍스트 사이즈
const BUTTON_TEXT_SIZE = WINDOW_HEIGHT * 0.02; 

export default function JoinMembershipThirdScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.checkIconCircle}>
        <FontAwesome name="check-circle" size={ICON_CIRCLE_SIZE} color="#007bff" />
      </View>

      <Text style={[styles.successMessage, { fontSize: MESSAGE_FONT_SIZE }]}>회원가입에 성공하였습니다!</Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => { navigation.navigate("Login"); }}
      >
        <FontAwesome name="chevron-left" size={BUTTON_TEXT_SIZE} color="#007bff" />
        <Text style={styles.backButtonText}>돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkIconCircle: {
    marginBottom: WINDOW_HEIGHT * 0.02,
  },
  successMessage: {
    fontWeight: 'bold',
    marginBottom: WINDOW_HEIGHT * 0.04,
  },
  backButton: {
    backgroundColor: '#fff',
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#007bff',
    paddingHorizontal: WINDOW_HEIGHT * 0.02,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: WINDOW_HEIGHT * 0.005,
  },
  backButtonText: {
    color: '#007bff',
    fontSize: BUTTON_TEXT_SIZE,
    fontWeight: 'bold',
  },
});