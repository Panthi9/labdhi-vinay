import { View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from '../firebase';
import { Formik } from 'formik';
import * as yup from 'yup'

const ContactUs = (props) => {

    const {
        inputContainer, inputView, input, inputError, buttonContainer, button, buttonText,
        screenTitleContainer, screenBackIcon, screenTitle
    } = styles;

    const db = getFirestore(app);
    const feedbackRef = collection(db, "feedbacks");

    const navigation = useNavigation();

    const handleFeedback = async (values) => {
        const { email, name, phonenumber, message } = values;
       
        let response =  await addDoc(feedbackRef, {
            "email": email,
            "name": name,
            "phonenumber": phonenumber,
            "message": message,
        });

        if(response.id) {
            navigation.pop();
        }
    }

    return (
        <View>
            <SafeAreaView />
            <View style={{}}>
                <View style={screenTitleContainer}>
                    <TouchableOpacity onPress={() => navigation.pop()} style={{ padding: 10, }}>
                        <Image
                            source={require('../assets/back.png')}
                            style={screenBackIcon} />
                    </TouchableOpacity>
                    <Text style={screenTitle}> CONTACT US </Text>
                </View>
                <ScrollView>
                    <View style={{ marginHorizontal: 25}}>
                        <Text style={{fontSize:20, marginVertical: 20,}}>Shop Detail</Text>
                        <Text style={{fontSize:15, marginVertical: 18,}}>Labdhi Vinay</Text> 
                        <Text style={{fontSize:15, marginVertical: 18,}}>+91-8073180631</Text> 
                        <Text style={{fontSize:15, marginVertical: 18,}}>Info.labdhivinay@gmail.com</Text> 
                    </View>
                    <Text style={{marginHorizontal: 25, fontSize:20, marginVertical: 20,}}>Share Your Thought For Better Improvement</Text>
                    <Formik
                        validationSchema={feedbackValidationSchema}
                        initialValues={{ email: '', name: '', phonenumber: '', message: '' }}
                        onSubmit={values => handleFeedback(values)} >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                            return (
                                <>
                                    <View style={inputContainer}>
                                        <View style={inputView}>
                                            <TextInput
                                                placeholder="Email Address"
                                                placeholderTextColor={'#1C2833'}
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                keyboardType="email-address"
                                                style={[input, ((errors.email && touched.email) && inputError)]}
                                            />
                                        </View>
                                        <View style={inputView}>
                                            <TextInput
                                                placeholder="Name"
                                                placeholderTextColor={'#1C2833'}
                                                onChangeText={handleChange('name')}
                                                onBlur={handleBlur('name')}
                                                value={values.name}
                                                style={[input, ((errors.name && touched.name) && inputError)]}
                                            />
                                        </View>
                                        <View style={inputView}>
                                            <TextInput
                                                placeholder="Phonenumber"
                                                placeholderTextColor={'#1C2833'}
                                                onChangeText={handleChange('phonenumber')}
                                                onBlur={handleBlur('phonenumber')}
                                                value={values.phonenumber}
                                                style={[input, ((errors.phonenumber && touched.phonenumber) && inputError)]}
                                            />
                                        </View>
                                        <View style={inputView}>
                                            <TextInput
                                                placeholder="Message"
                                                placeholderTextColor={'#1C2833'}
                                                onChangeText={handleChange('message')}
                                                onBlur={handleBlur('message')}
                                                value={values.message}
                                                style={[input, ((errors.message && touched.message) && inputError)]}
                                            />
                                        </View>
                                    </View>

                                    <View style={buttonContainer}>
                                        <TouchableOpacity
                                            onPress={handleSubmit}
                                            style={button}>
                                            <Text style={buttonText}>SUBMIT</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            );
                        }}
                    </Formik>
                </ScrollView>
            </View>
        </View>
    );
}

export default ContactUs;

const feedbackValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    name: yup
        .string()
        .required('Name is required'),
    phonenumber: yup
        .string()
        .max(10)
        .min(10)
        .required('Phone number is required'),
    message: yup
        .string()
        .required('Phone number is required'),
});

const styles = StyleSheet.create({
    inputContainer: {
        width: '90%',
        alignSelf:'center'
    },
    screenTitleContainer: {
        paddingBottom: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center'
    },
    screenBackIcon: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        resizeMode: 'contain',
        width: 15,
        height: 15,
    },
    screenTitle: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center'
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
        alignSelf:'center',
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
});