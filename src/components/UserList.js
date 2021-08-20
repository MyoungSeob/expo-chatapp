import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';


const UserList = (props) => {
    console.log(props)
    return (
        <View>
            <TouchableOpacity style={Styles.Container} activeOpacity={0.8}>
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