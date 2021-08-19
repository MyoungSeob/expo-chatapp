import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { auth } from "../../firebase";
const LoginScreen = ({ navigation }) => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Chat");
      } else {
        navigation.navigate("Login");
      }
    });
    return unsubscribe;
  }, []);

  const login = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      alert(error.message);
    });
  };

  return (
    <View style={styles.grid}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Tideflo Chat</Text>
      </View>
      <TextInput
        returnKeyLabel="Email"
        placeholder="이메일을 입력하세요"
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.gridTwoInput} />
      <TextInput
        placeholder="비밀번호를 입력하세요"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={login}
      >
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    marginVertical: 13,
  },
  titleText: {
    fontSize: 49,
    fontWeight: "bold",
  },
  input: {
    width: "75%",
    height: 60,
    borderWidth: 2,
    borderRadius: 50,
    borderStyle: "solid",
    paddingLeft: 25,
    fontSize: 20,
    fontStyle: "normal",
    marginVertical: 13,
  },
  grid: {
    flex: 1,
    width: "100%",
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  textGrid: {
    justifyContent: "flex-start",
  },
  button: {
    width: "75%",
    backgroundColor: "#2c2c2c",
    marginTop: 10,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

export default LoginScreen;
