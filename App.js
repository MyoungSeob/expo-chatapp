import React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/screen/LoginScreen";
import RegisterScreen from "./src/screen/RegisterScreen";
import ChatScreen from "./src/screen/ChatScreen";
import { auth } from './firebase'

export default function App() {
  const Stack = createNativeStackNavigator();
  // const navigation = useNavigation();
  const logout = () => {
    auth.signOut().then(() => {
      navigation.navigate("Login");
    }).catch((error) => {
      alert(error)
    })
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerTitleAlign: "center",
          }}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
