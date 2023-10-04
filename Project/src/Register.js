import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { firebase } from '../config';
import { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const registerUser = async (email, password, firstName, lastName) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url:'https://fundraiser-d5490.firebaseapp.com',
            })
            .then(() => {
                alert('Verification Email sent');
            }).catch((error) => {
                alert(error.message);
            })
            .then(() => {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    firstName,
                    lastName,
                    email
                })
            })
            .catch((error) => {
                alert(error.message);
            })
        })
        .catch((error) => {
            alert(error.message);
        })
    }

    return (
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize:24}}>
                Register
            </Text>
            <View style={{marginTop:40}}>
                <TextInput 
                    style={styles.textInput}
                    placeholder='FirstName'
                    onChangeText={(firstName) => setFirstName(firstName)}
                    autoCapitalize='none'
                    // autoComplete={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='LastName'
                    onChangeText={(lastName) => setLastName(lastName)}
                    autoCapitalize='none'
                    // autoComplete={false}
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder='Email'
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize='none'
                    // autoComplete={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize='none'
                    // autoComplete={false}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                onPress={() => registerUser(email, password, firstName, lastName)}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:22}}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 400,
        fontSize: 20,
        borderBottomWidth: 1,
        marginBottom: 10,
        textAlign: 'center',
        borderBottomColor: '#000'
    },
    button: {
        marginTop: 50,
        height: 70,
        width: 250,
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    }
})