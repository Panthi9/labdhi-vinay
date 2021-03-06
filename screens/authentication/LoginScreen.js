
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, where, query, getDocs } from "firebase/firestore";
import { Dialog, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup'
import { app } from '../../firebase';

const LoginScreen = () => {
  const [loginErrorDialog, setLoginErrorDialog] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const auth = getAuth(app);
  const db = getFirestore(app);
  const userCollectionRef = collection(db, "users");

  const fbURL = 'https://www.facebook.com/groups/5092353437469549/?multi_permalinks=5140427655995460%2C5135247693180123%2C5129797220391837&notif_id=1649326578171979&notif_t=group_activity&ref=notif';
  const instagramURL = 'https://www.instagram.com/labdhivinay/';

  const {
    safeAreaView, contentContainer, keyboardAwareScrollView, container, logo, inputContainer,
    inputView, input, inputError, buttonContainer, button, buttonText, buttonOutline,
    buttonOutlineText, dialogTitle, dialogSubtitle, dialogCloseButton, dialogCloseButtonTitle,
    socialMediaButtonContainer, socialMediaButtonView, socialMediaIcon,
  } = styles;

  const handleLoginErrorDialogState = () => {
    dispatch({ type: 'NOT_AUTHENTICATED' });
    setLoginErrorDialog(!loginErrorDialog);
  }

  const handleSignUp = () => navigation.replace("Signup");

  const handleHome = () => navigation.replace("Home");

  const openSocialMediaPlatform = async (url) => {
    const supported = await Linking.canOpenURL(url);
    (supported) && await Linking.openURL(url);
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
      navigation.replace("Home");
    } else {
      handleLoginErrorDialogState()
    }
  }

  useEffect(() => {
    getUserByEmail();
  }, []);

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => getUserByEmail(email))
      .catch(error => handleLoginErrorDialogState());
  }

  return (
    <>
      <SafeAreaView style={safeAreaView} />
      <KeyboardAwareScrollView
        contentContainerStyle={contentContainer}
        style={keyboardAwareScrollView}>
        <View style={container}>
          <Image
            source={require(`../../assets/logo.jpg`)}
            style={logo} />
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={values => handleLogin(values.email, values.password)} >
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
                        placeholder="Password"
                        placeholderTextColor={'#1C2833'}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        style={[input, ((errors.password && touched.password) && inputError)]}
                        secureTextEntry
                      />
                    </View>
                  </View>

                  <View style={buttonContainer}>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={button}>
                      <Text style={buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleSignUp}
                      style={[button, buttonOutline]}>
                      <Text style={buttonOutlineText}>SIGNUP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleHome}
                      style={[button, buttonOutline]}>
                      <Text style={buttonOutlineText}>Home</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={socialMediaButtonContainer}>
                    <View style={socialMediaButtonView}>
                      <TouchableOpacity
                        onPress={() => openSocialMediaPlatform(instagramURL)}>
                        <Image
                          source={require(`../../assets/instagram.png`)}
                          style={socialMediaIcon} />
                      </TouchableOpacity>
                    </View>
                    <View style={socialMediaButtonView}>
                      <TouchableOpacity
                        onPress={() => openSocialMediaPlatform(fbURL)}>
                        <Image
                          source={require(`../../assets/facebook.png`)}
                          style={socialMediaIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              );
            }}
          </Formik>
        </View>
      </KeyboardAwareScrollView>

      <Dialog
        visible={loginErrorDialog}
        onDismiss={() => handleLoginErrorDialogState()}>
        <Dialog.Content>
          <View>
            <Text style={dialogTitle}>
              {`Unauthorized.`}
            </Text>
            <Text style={dialogSubtitle}>
              {`Invalid email address or password.`}
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            style={dialogCloseButton}
            onPress={() => handleLoginErrorDialogState()}>
            <Text style={dialogCloseButtonTitle}>CLOSE</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}

export default LoginScreen;

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#D35400',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
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
  },
  socialMediaButtonContainer: {
    flexDirection: 'row'
  },
  socialMediaButtonView: {
    margin: 20
  },
  socialMediaIcon:{ 
    height: 40, 
    width: 40 
  }
});

