import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {db} from '../../firebase'


const UserList = (props) => {
    const Navigation = useNavigation();
    const makeChat = () => {
        db.collection("Chatting "+`${props.name}`)
            .add({
                _id: 1,
            })
            .then((docRef) => {
                console.log(docRef.id);
            })
            .catch((error) => console.log(error)).then(() => Navigation.navigate("Chat", {name : props.name}));
    }
    return (
        <View>
            <TouchableOpacity style={Styles.Container} activeOpacity={0.8} onPress={makeChat}>
                <Text style={Styles.textId}>{props.name}</Text>
            </TouchableOpacity>
        </View>
    )
}
const Styles = StyleSheet.create({
    Container : {
        width : '100%',
        backgroundColor : 'white',
        height : 50,
        justifyContent : 'center',
        marginBottom : 5,
    },
    textId : {
        fontSize : 20,
        marginLeft : 20,
        color : "#2c2c2c"
    }
})
export default UserList;