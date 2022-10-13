import React, { useState } from 'react';
import { View, Keyboard, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'

const styles = StyleSheet.create({
    inputContainer: {
        paddingTop: 15
      },
      textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20
      },
    saveButton: {
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#007BFF',
        padding: 15,
        margin: 5
      },
      saveButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
      }
});

const PhoneNumber = () => {
    const onSubmitEdit = () => {
        // whatever you want to do on submit
    };
    const [name, setName] = useState("")
    const handleNameChange = ()=> {
        // setName(name);
      }
    const  handleSubmit = () => {
        // saveSettings(state);
      }
    return (
        <View>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your tel no"
                maxLength={20}
                onBlur={Keyboard.dismiss}
                value={name}
                onChangeText={handleNameChange}
            />
            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSubmit}
            >
                <Text style={styles.saveButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PhoneNumber;
