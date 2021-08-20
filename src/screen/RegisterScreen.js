import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../../firebase";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("chat");
      }
    });
    return unsubscribe;
  }, []);
  const regist = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        user
          .updateProfile({
            displayName: name,
          })
          .catch((error) => {
            alert(error.message);
          });
      }).then(() => {
        db.collection("Users").add({
          name : name,
        }).doc("names").then((docRef) => {
          console.log(docRef.id);
        })
        .catch((error) => console.log(error));
      });
  };
  return (
    <View style={styels.container}>
      <TextInput
        autoCapitalize="none"
        autoCompleteType="email"
        style={styels.input}
        placeholder="이메일을 적어주세요"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styels.input}
        placeholder="비밀번호를 적어주세요"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        autoCapitalize="none"
        style={styels.input}
        placeholder="이름을 적어주세요"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styels.button}
        onPress={regist}
      >
        <Text style={styels.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};
const styels = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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
    marginVertical: 7.5,
  },
  button: {
    width: "75%",
    backgroundColor: "#2c2c2c",
    marginTop: 15,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});

export default RegisterScreen;
