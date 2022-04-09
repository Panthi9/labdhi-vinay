import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, SafeAreaView } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, Colors } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const SettingScreen = () => {
    const navigation = useNavigation();

    const handleSignOut = () => {
        navigation.replace("Login")
        // auth
        //   .signOut()
        //   .then(() => {
        //     navigation.replace("Login")
        //   })
        //   .catch(error => alert(error.message))
    }

    const handleCart = () => {
        navigation.push("Cart")
        // auth
        //   .signOut()
        //   .then(() => {
        //     navigation.replace("Login")
        //   })
        //   .catch(error => alert(error.message))
    }

    const handleProfile = () => {
        navigation.push("Profile");
        
    }

    return (
        <>
            <SafeAreaView />
            <View style={{ paddingBottom: 10 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Settings </Text>
            </View>
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flex: 1,
                }} style={{ height: '100%' }}>
                <View style={{ margin: 5 }}>
                    <View >
                        <TouchableOpacity onPress={() => handleCart()}>
                            <Card style={{ backgroundColor: '#1C2833' }}>
                                <View style={{ flexDirection: 'row', paddingLeft: 10, alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                    <Image
                                        source={require('../assets/trolley-white.png')}
                                        style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            resizeMode: 'contain',
                                            width: 40,
                                            height: 40
                                        }}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}> CART </Text>
                                        <Text style={{ color: '#FFFFFF', fontSize: 12 }}> View your selected product for payment </Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={() => handleProfile()}>
                            <Card style={{ backgroundColor: '#1C2833' }}>
                                <View style={{ flexDirection: 'row', paddingLeft: 10, alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                    <Image
                                        source={require('../assets/profile-user.png')}
                                        style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            resizeMode: 'contain',
                                            width: 40,
                                            height: 40
                                        }}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}> PROFILE </Text>
                                        <Text style={{ color: '#FFFFFF', fontSize: 12 }}> Check your personal details </Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={() => handleSignOut()}>
                            <Card style={{ backgroundColor: '#1C2833' }}>
                                <View style={{ flexDirection: 'row', paddingLeft: 10, alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                    <Image
                                        source={require('../assets/power-off.png')}
                                        style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            resizeMode: 'contain',
                                            width: 40,
                                            height: 40
                                        }}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}> LOGOUT </Text>
                                        <Text style={{ color: '#FFFFFF', fontSize: 12 }}> Logout from application </Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </>
    );
}

export default SettingScreen;