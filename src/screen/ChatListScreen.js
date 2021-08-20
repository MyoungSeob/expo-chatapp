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
        });
        // useEffect보다 조금 더 빠르게 이펙트를 수행하여, 화면이 빠르게 구성된다.
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
        // async await을 이용하여 채팅방 목록을 구성하기 위한 회원들의 이름을 동기적으로 가져오기 위해
        // 사용했습니다.
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