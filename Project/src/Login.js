import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import { useState } from 'react';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch(error) {
            alert(error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize:26}}>Login</Text>
            <View style={{marginTop:40}}>
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
                onPress={() => loginUser(email, password)}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:22}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}
                style={{marginTop: 20}}
            >
                <Text style={{fontWeight:'bold', fontSize:16}}>Don't have an account? Register Now</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;

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