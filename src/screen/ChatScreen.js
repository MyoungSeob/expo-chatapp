import React, {
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import { Text, TouchableOpacity } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, db } from "../../firebase";
import { Bubble } from 'react-native-gifted-chat';

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const readerName = route.params.name;
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];

    db.collection("Chatting "+`${readerName}`)
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
          <Text>logout</Text>
        </TouchableOpacity>
      ),
    });
    const unsubscribe = db
      .collection("Chatting "+`${readerName}`)
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
      renderUsernameOnMessage={true}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
      }}
      renderBubble={(props) => {
        return(
          <Bubble 
          {...props}
            wrapperStyle={{
              left : {
                backgroundColor : "#e3e3e3"
              },
            }}
          />
        )
      }}
    />
  );
};

export default ChatScreen;
