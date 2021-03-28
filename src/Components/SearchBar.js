import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


function SearchBar({ searchApi, text, onTermChange }) {
    return (
        <View style={styles.search_container}>
            <FontAwesome5 name='search' style={styles.iconStyle} />
            <TextInput
                style={styles.input}
                placeholder='Search'
                autoCapitalize='none'
                autoCorrect={false}
                value={text}
                onChangeText={onTermChange}
                onSubmitEditing={searchApi}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    search_container: {
        backgroundColor: 'gainsboro',
        height: 50,
        borderRadius: 5,
        flexDirection: 'row',
        marginVertical: 10
    },
    input: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 30,
        alignSelf: 'center',
        marginHorizontal: 15
    }
})

export default SearchBar