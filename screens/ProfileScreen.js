import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
// import { auth } from '../firebase'

const ProfileScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        // const unsubscribe = auth.onAuthStateChanged(user => {
        //   if (user) {
        //     navigation.replace("Home")
        //   }
        // })

        // return unsubscribe
    }, [])

    const handleSignUp = () => {
        navigation.replace("Login");
        // auth
        //   .createUserWithEmailAndPassword(email, password)
        //   .then(userCredentials => {
        //     const user = userCredentials.user;
        //     console.log('Registered with:', user.email);
        //   })
        //   .catch(error => alert(error.message))
    }

    const handleBack = () => {
        navigation.pop()
        // auth
        //   .signOut()
        //   .then(() => {
        //     navigation.replace("Login")
        //   })
        //   .catch(error => alert(error.message))
      }

    return (
        <>
            <SafeAreaView/>
                <View style={{ paddingBottom: 10,flexDirection: 'row', alignItems:'center', marginLeft:5, }}>
        <TouchableOpacity onPress={() => handleBack()} style={{padding:10,}}>
          <Image
            source={require('../assets/back.png')}
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              resizeMode: 'contain',
              width: 15,
              height: 15,
            }}
          />
          </TouchableOpacity>
          <View style={{flex:1}}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Profile </Text>
          </View>
          
        </View>
            <KeyboardAwareScrollView 
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                }} >
                <View style={{ alignItems: 'center' }}>
                    {/* <Image
                        source={require('../assets/logo.jpg')}
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            resizeMode: 'contain',
                            marginTop: 20,
                            height: 100,
                            width: 100,
                            borderRadius: 150 / 2,
                            overflow: "hidden",
                        }}
                    /> */}
                    <View style={styles.inputContainer}>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <TextInput
                                placeholder="First Name"
                                placeholderTextColor={'#1C2833'}
                                value={email}
                                onChangeText={text => setEmail(text)}
                                style={styles.input}
                            />
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <TextInput
                                placeholder="Last Name"
                                placeholderTextColor={'#1C2833'}
                                value={email}
                                onChangeText={text => setEmail(text)}
                                style={styles.input}
                            />
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={'#1C2833'}
                                value={email}
                                onChangeText={text => setEmail(text)}
                                style={styles.input}
                            />
                        </View>
                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <TextInput
                                placeholder="Phone Number"
                                placeholderTextColor={'#1C2833'}
                                value={email}
                                onChangeText={text => setEmail(text)}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}> EDIT </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '90%'
    },
    input: {
        borderColor: '#1C2833',
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        marginBottom: 10,
        backgroundColor: '#D35400',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
    },
    buttonText: {
        color: '#1C2833',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#1C2833',
        fontWeight: '700',
        fontSize: 16,
    },
})
