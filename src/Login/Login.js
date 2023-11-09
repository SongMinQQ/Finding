// import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity, View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {image} from 'react-native';

state = {
    username: '',
    password: '',
  };

const Login = ({navigation}) => {
    // const navigation = useNavigation();
    return (
      <View style={styles.flexbox}>
        <View style={styles.container}>
          <Image style={styles.image}  source={require('../../img/findingLogo.png')}/>
          <StatusBar style="auto" />
          </View>

      <View style={styles.container}>
          <TextInput style = {styles.inputView}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })} />
          <TextInput style = {styles.inputView}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })}
            secureTextEntry = {true} /> 
             </View>
             <View style = {{backgroundColor : "0000ff"}}>
        <SafeAreaView>
          <TouchableOpacity style = {styles.forgot_button} onPress={() =>  navigation.navigate("Find Id")}><Text> 자동로그인</Text></TouchableOpacity> 
        <View style = {styles.forgotBox}>
          <TouchableOpacity style = {styles.forgot_button} onPress={() => navigation.navigate("Find Id")}><Text>아이디찾기로</Text></TouchableOpacity>
          <TouchableOpacity style = {styles.forgot_button} onPress={() => navigation.navigate("Find Password")}><Text>비밀번호찾기로</Text></TouchableOpacity>
          </View> 
          <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("Home")}><Text>Login</Text></TouchableOpacity>
          <TouchableOpacity style = {styles.signupBtn}  onPress={() => navigation.navigate("Join Membership")}><Text>Sign up</Text></TouchableOpacity>
        </SafeAreaView>

        </View>
        </View>
 
    );
};


export default Login;

const styles = StyleSheet.create({

  flexbox: {
    backgroundColor: "#EFFBEF",
    flex : 1,
    alignItems: "center",
    justifyContent: "center",
    
    
  },

  loginhome: {
    alignItems : "top",
    margin : 10
  },

  container: {
  
    backgroundColor: "#EFFBEF", 
    alignItems: "center",
    justifyContent: "center",
  
  },
  image: {
    width : 100 ,
    height : 100,
    margin : 20,
    borderRadius : 50
  },

  icon: {
    marginRight: 10,
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
  TextInput: {
    backgroundColor: "#FBFBEF",
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgotBox: {
    flexDirection: "row",
    justifyContent : "space-between",
  
    
  },

  forgot_button: {
    height: 20,
    margin: 20,
    textColor : "#FBFBEF",
    backgroundColor: "#FBFBEF",
  },

  signupBtn: {
    borderRadius: 25,
    alignItems: "center",
    margin  : 10
  },

  loginBtn: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#F5A9E1",
  },
});