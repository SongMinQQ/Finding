import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

export default function JoinMembershipThirdScreen({ navigation }) {

  return (
    <View style={styles.container}>

      <View style={styles.checkIconCircle}>
        <FontAwesome name="check-circle" size={WINDOW_HEIGHT * 0.15} color="#007bff" />
      </View>

      <Text style={[styles.successMessage, { fontSize: WINDOW_HEIGHT * 0.03 }]}>회원가입에 성공하였습니다!</Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => { navigation.navigate("Login"); }}
      >
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
    backgroundColor: '#007bff',
    width: WINDOW_WIDTH * 0.35,
    height: WINDOW_HEIGHT * 0.06,
    flexDirection: 'row',
    paddingHorizontal: WINDOW_HEIGHT * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: WINDOW_HEIGHT * 0.01,
  },
  backButtonText: {
    color: '#fff',
    fontSize: WINDOW_HEIGHT * 0.02,
    fontWeight: 'bold',
  },
});