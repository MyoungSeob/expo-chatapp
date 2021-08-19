import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, db } from "../../firebase";

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];

    db.collection("chats")
      .add({
        _id: _id,
        createdAt: createdAt,
        text: text,
        user: user,
      })
      .then((docRef) => {
        console.log(docRef.id);
      })
      .catch((error) => console.log(error));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={signOut}
        >
          <Text>로그아웃</Text>
        </TouchableOpacity>
      ),
    });
    const unsubscribe = db
      .collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
    return unsubscribe;
  }, [navigation]);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showAvatarForEveryMessage={true}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
      }}
    />
  );
};

export default ChatScreen;
