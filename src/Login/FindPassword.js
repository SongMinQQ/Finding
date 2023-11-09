import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


state = {
    email: '',
  };


const FindPassword = ({navigation}) => {
    return (
        <View>
            <Text>비밀번호찾기 페이지</Text>
            <Text>Forgot Password</Text>
            <TextInput
              placeholder="Enter your ID"
              value={this.state.id}
              onChangeText={(text) => this.setState({ id: text })}
            />
            <View style = {styles.forgotBox}>
          <TouchableOpacity style = {styles.forgot_button} onPress={() => navigation.navigate("Find Id")}><Text>아이디찾기로</Text></TouchableOpacity>
          <TouchableOpacity style = {styles.forgot_button} onPress={() => navigation.navigate("Find Password")}><Text>비밀번호찾기로</Text></TouchableOpacity>
          </View> 
        </View>
    );

};

export default FindPassword;


const styles = StyleSheet.create({
  Flexbox: {
    backgroundColor: "#FBFBEF",
    flex: 1,
    flexDirection: "row",
    justifyContent : "space-between",
  },

  inputView: {
    backgroundColor: "#EFFBEF",
    textShadowColor: "#FBFBEF",
    borderRadius: 30,
    width: "100%",
    height: 45,
    marginBottom: 10,
    alignItems: "center",
  },

});