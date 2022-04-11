
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Dialog, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup'
import { app } from '../../firebase'

const SignupScreen = () => {
    const [signupErrorDialog, setSignupErrorDialog] = useState('');

    const navigation = useNavigation();
    const auth = getAuth(app);
    const db = getFirestore(app);
    const userCollectionRef = collection(db, "users");

    const {
        safeAreaView, keyboardAwareScrollView, container, logo, inputContainer,
        inputView, input, inputError, buttonContainer, button, buttonText, buttonOutline,
        buttonOutlineText, dialogTitle, dialogSubtitle, dialogCloseButton, dialogCloseButtonTitle,
    } = styles;

    const handleSignupErrorDialogState = () => setSignupErrorDialog(!signupErrorDialog);

    const handleLogin = () => navigation.replace("Login");

    const addUserDetail = async (values) => {
        const {email, firstName, lastName} = values;
        let doc = {
            first_name: firstName,
            last_name: lastName,
            email: email,
        }
        let response = await addDoc(userCollectionRef, doc);
        (response.id) && navigation.replace("Login");
    }

    const handleSignup = (values) => {
        const {email, password} = values;
        
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => addUserDetail(values))
            .catch(error => handleSignupErrorDialogState());
    }

    return (
        <>
            <SafeAreaView style={safeAreaView} />
            <KeyboardAwareScrollView
                style={keyboardAwareScrollView} >
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/logo.jpg')}
                        style={logo} />
                    <Formik
                        validationSchema={signupValidationSchema}
                        initialValues={{ firstName: '', lastName: '', email: '', password: ''}}
                        onSubmit={values => handleSignup(values)} >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                            return (
                                <>
                                    <View style={inputContainer}>
                                        <View style={inputView}>
                                            <TextInput
                                                placeholder="First Name"
                                                placeholderTextColor={'#1C2833'}
                                                onChangeText={handleChange('firstName')}
                                                onBlur={handleBlur('firstName')}
                                                value={values.firstName}
                                                style={[input, ((errors.firstName && touched.firstName) && inputError)]} />
                                        </View>
                                        <View style={inputView}>
                                            <TextInput
                                                placeholder="Last Name"
                                                placeholderTextColor={'#1C2833'}
                                                onChangeText={handleChange('lastName')}
                                                onBlur={handleBlur('lastName')}
                                                value={values.lastName}
                                                style={[input, ((errors.lastName && touched.lastName) && inputError)]}/>
                                        </View>
                                        <View style={inputView}>
                                            <TextInput
                                                placeholder="Email Address"
                                                placeholderTextColor={'#1C2833'}
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                style={[input, ((errors.email && touched.email) && inputError)]}
                                                keyboardType="email-address" />
                                        </View>
                                        <View style={inputView}>
                                            <TextInput
                                                placeholder="Password"
                                                placeholderTextColor={'#1C2833'}
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                style={[input, ((errors.password && touched.password) && inputError)]}
                                                secureTextEntry />
                                        </View>
                                    </View>

                                    <View style={buttonContainer}>
                                        <TouchableOpacity
                                            onPress={handleSubmit}
                                            style={button}>
                                            <Text style={buttonText}>SIGNUP</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={handleLogin}
                                            style={[button, buttonOutline]}>
                                            <Text style={buttonOutlineText}>LOGIN</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            );
                        }}
                    </Formik>
                </View>
            </KeyboardAwareScrollView>

            <Dialog
                visible={signupErrorDialog}
                onDismiss={() => handleSignupErrorDialogState()}>
                <Dialog.Content>
                    <View>
                        <Text style={dialogTitle}>
                            {`Singup Issue.`}
                        </Text>
                        <Text style={dialogSubtitle}>
                            {`Something went wrong please try again.`}
                        </Text>
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        style={dialogCloseButton}
                        onPress={() => handleSignupErrorDialogState()}>
                        <Text style={dialogCloseButtonTitle} >CLOSE</Text>
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </>
    )
}

export default SignupScreen

const signupValidationSchema = yup.object().shape({
    firstName: yup
        .string()
        .required('First Name is required'),
    lastName: yup
        .string()
        .required('Last Name is required'),
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
})

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#D35400',
    },
    keyboardAwareScrollView: {
        backgroundColor: '#1C2833',
        height: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        resizeMode: 'contain',
        marginTop: 20,
        height: 100,
        width: 100,
        borderRadius: 150 / 2,
        overflow: "hidden",
        marginBottom: 30,
    },
    inputContainer: {
        width: '90%'
    },
    inputView: {
        marginTop: 10,
        marginBottom: 10
    },
    input: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 5,
    },
    inputError: {
        borderColor: '#E74C3C',
        borderWidth: 3,
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
    dialogTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#D35400'
    },
    dialogSubtitle: {
        fontSize: 16,
    },
    dialogCloseButton: {
        backgroundColor: '#D35400',
    },
    dialogCloseButtonTitle: {
        color: '#FFFFFF',
    }
});
