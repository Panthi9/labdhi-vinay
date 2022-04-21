import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useDispatch, useSelector } from 'react-redux';
import { getFirestore, collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { app } from '../firebase';
import { Formik } from 'formik';
import * as yup from 'yup';

const ProfileScreen = () => {
    const [showEditProfileForm, setEditProfileForm] = useState(false);

    const navigation = useNavigation()
    const userDetails = useSelector((state) => state.userDetails);
    const dispatch = useDispatch();

    const db = getFirestore(app);
    const userCollectionRef = collection(db, "users");

    const {
        headerContainer, backButtonIcon, profileContainer, profileIcon, profileDetailContainer,
        profileDetailText, backButton, headerTitleContainer, keyboardAwareScrollView,
        profileReadContainer, editButton, editButtonIcon, headerTitleText, inputError,
        inputContainer, buttonContainer, button, buttonText, textInputContainer, input,
        container,
    } = styles;


    const updateEditProfileFormState = (status) => setEditProfileForm(status);

    const handleBack = () => navigation.pop();

    const updateProfile = async (values) => {
        const { firstName, lastName, email, phonenumber, address } = values;
        let userProfileDetail = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phonenumber: phonenumber,
            address: address,
        }
        await updateDoc(doc(db, 'users', userDetails.id), userProfileDetail);
        getUserByEmail(email);
    }

    const getUserByEmail = async (email) => {
        let user;
        const userDetial = await query(userCollectionRef, where('email', '==', email));
        const querySnapshot = await getDocs(userDetial);
        querySnapshot.forEach((doc) => {
            user = doc.data();
            user = { ...user, id: doc.id }
        });

        if (querySnapshot.size == 1) {
            dispatch({ type: 'IS_AUTHENTICATED', payload: user });
        } 
        updateEditProfileFormState(false);
    }

    return (
        <>
            <SafeAreaView />
            <View style={headerContainer}>
                <TouchableOpacity onPress={() => handleBack()} style={backButton}>
                    <Image
                        source={require('../assets/back.png')}
                        style={backButtonIcon} />
                </TouchableOpacity>
                <View style={headerTitleContainer}>
                    <Text style={headerTitleText}>
                        Profile
                    </Text>
                </View>
                <TouchableOpacity onPress={() => updateEditProfileFormState(true)} style={editButton}>
                    <Image
                        source={require('../assets/editing.png')}
                        style={editButtonIcon} />
                </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView
                contentContainerStyle={keyboardAwareScrollView} >

                {showEditProfileForm ?
                    <Formik
                        validationSchema={editProfileValidationSchema}
                        initialValues={{
                            firstName: userDetails.firstName,
                            lastName: userDetails.lastName,
                            email: userDetails.email,
                            phonenumber: userDetails.phonenumber,
                            address: userDetails.address,
                        }}
                        onSubmit={values => updateProfile(values)} >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                            return (
                                <>
                                    <View style={container}>
                                        <View style={inputContainer}>
                                            <View style={textInputContainer}>
                                                <TextInput
                                                    placeholder="First Name"
                                                    placeholderTextColor={'#1C2833'}
                                                    onChangeText={handleChange('firstName')}
                                                    onBlur={handleBlur('firstName')}
                                                    value={values.firstName}
                                                    style={[input, ((errors.firstName && touched.firstName) && inputError)]} />
                                            </View>
                                            <View style={textInputContainer}>
                                                <TextInput
                                                    placeholder="Last Name"
                                                    placeholderTextColor={'#1C2833'}
                                                    onChangeText={handleChange('lastName')}
                                                    onBlur={handleBlur('lastName')}
                                                    value={values.lastName}
                                                    style={[input, ((errors.lastName && touched.lastName) && inputError)]} />
                                            </View>
                                            <View style={textInputContainer}>
                                                <TextInput
                                                    accessible={false}
                                                    placeholder="Email"
                                                    placeholderTextColor={'#1C2833'}
                                                    vonChangeText={handleChange('email')}
                                                    onBlur={handleBlur('email')}
                                                    value={values.email}
                                                    style={[input, ((errors.email && touched.email) && inputError)]}
                                                    keyboardType="email-address" />
                                            </View>
                                            <View style={textInputContainer}>
                                                <TextInput
                                                    placeholder="Phone Number"
                                                    placeholderTextColor={'#1C2833'}
                                                    onChangeText={handleChange('phonenumber')}
                                                    onBlur={handleBlur('phonenumber')}
                                                    value={values.phonenumber}
                                                    style={[input, ((errors.phonenumber && touched.phonenumber) && inputError)]} />
                                            </View>

                                            <View style={textInputContainer}>
                                                <TextInput
                                                    placeholder="Address"
                                                    placeholderTextColor={'#1C2833'}
                                                    onChangeText={handleChange('address')}
                                                    onBlur={handleBlur('address')}
                                                    value={values.address}
                                                    style={[input, ((errors.address && touched.address) && inputError)]} />
                                            </View>
                                        </View>

                                        <View style={buttonContainer}>
                                            <TouchableOpacity
                                                onPress={handleSubmit}
                                                style={button} >
                                                <Text style={buttonText}> EDIT </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </>
                            );
                        }}
                    </Formik> :

                    <View style={profileReadContainer}>
                        <View style={profileContainer}>
                            <Image
                                source={require('../assets/user.png')}
                                style={profileIcon} />
                            <View style={profileDetailContainer}>
                                <Text style={profileDetailText}>
                                    {userDetails.firstName} {userDetails.lastName}
                                </Text>
                            </View>
                        </View>
                        <View style={profileContainer}>
                            <Image
                                source={require('../assets/email.png')}
                                style={profileIcon} />
                            <View style={profileDetailContainer}>
                                <Text style={profileDetailText}>
                                    {userDetails.email}
                                </Text>
                            </View>
                        </View>
                        {userDetails.phonenumber ?
                            <View style={profileContainer}>
                                <Image
                                    source={require('../assets/phone-call.png')}
                                    style={profileIcon} />
                                <View style={profileDetailContainer}>
                                    <Text style={profileDetailText}>
                                        {userDetails.phonenumber}
                                    </Text>
                                </View>
                            </View> : <View />}
                        {userDetails.address ?
                            <View style={profileContainer}>
                                <Image
                                    source={require('../assets/home.png')}
                                    style={profileIcon} />
                                <View style={profileDetailContainer}>
                                    <Text style={profileDetailText}>
                                        {userDetails.address}
                                    </Text>
                                </View>
                            </View> : <View />}
                    </View>}
            </KeyboardAwareScrollView>
        </>
    )
}

export default ProfileScreen;

const editProfileValidationSchema = yup.object().shape({
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
    address: yup
        .string()
        .required('Address is required'),
    phonenumber: yup
        .string()
        .max(10)
        .min(10)
        .required('Phonenumber is required'),
});

const styles = StyleSheet.create({
    headerContainer: {
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
    },
    backButton: {
        padding: 10,
    },
    backButtonIcon: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        resizeMode: 'contain',
        width: 15,
        height: 15,
    },
    editButton: {
        padding: 10,
    },
    editButtonIcon: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        resizeMode: 'contain',
        width: 30,
        height: 30,
    },
    headerTitleContainer: {
        flex: 1
    },
    headerTitleText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    keyboardAwareScrollView: {
        flex: 1,
        justifyContent: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'center'
    },
    profileIcon: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        resizeMode: 'contain',
        width: 40,
        height: 40,
    },
    profileDetailContainer: {
        flex: 1,
        marginHorizontal: 10
    },
    profileDetailText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    profileReadContainer: {
        alignItems: 'center',
        paddingHorizontal: 10
    },
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
    textInputContainer: {
        marginTop: 10,
        marginBottom: 10
    }
})
