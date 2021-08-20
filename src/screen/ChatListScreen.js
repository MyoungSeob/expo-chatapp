import React, {useEffect, useLayoutEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import {auth, db} from '../../firebase'
import UserList from '../components/UserList';

const ChatListScreen = ({navigation}) => {
    const [username, setUserName] = useState([]);
    const [loading, setLoading] = useState(false);

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
          headerLeft: () => (
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
            >
                <Text>Make Chat</Text>
            </TouchableOpacity>
          ),
        });
        const getUsername = async() => {
            try{
                setLoading(true);
                const response = await db
                .collection("Users")
                .onSnapshot((snapshot) =>
                    setUserName(
                    snapshot.docs.map((doc) => ({
                        name : doc.data().name,
                    }))
                  )
                );
                
                setUserName([response]);
            } catch (error) {
                console.log("error" , error);
            }
            setLoading(false);
        };
        getUsername();
        return () => setLoading(false)
    }, [navigation]);

    const signOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace("Login");
          })
          .catch((error) => {
          });
      };
    const names = [];
    for(let i=0; i < username.length; i++){
        names.push(username[i].name)
    }
    console.log(names)
    if(loading){
        return(
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator /> 
            </View>
            
        )
    }else{
        return(
        <View>
            {names.map((p, index) => {
                return <UserList key={index} name={p} />
            })}
        </View>
        )
        
    }
       
    
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})

export default ChatListScreen