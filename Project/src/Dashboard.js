import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { firebase } from '../config';

const Dashboard = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists) {
                setName(snapshot.data())
            }
            else {
                console.log('User does not exist');
            }
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Hello, {name.firstName}
            </Text>
            <TouchableOpacity
                onPress={() => {firebase.auth().signOut()}}
                style={styles.button}
            >
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                    Sign Out
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
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