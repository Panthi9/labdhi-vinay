import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, Colors } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const SettingScreen = () => {
    const navigation = useNavigation();

    const {
        socialMediaButtonContainer, socialMediaButtonView, socialMediaIcon,
    } = styles;

    const isAuthenticated = useSelector((state) => state.isAuthenticated);

    const handleSignOut = () => navigation.replace("Login");
    const handleCart = () => navigation.push("Cart");
    const handleProfile = () => navigation.push("Profile");
    const handleOrder = () => navigation.push("Order");
    const handleLogin = () => navigation.push("Login");

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
                    {isAuthenticated && <View >
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
                    </View>}

                    {isAuthenticated && <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={() => handleOrder()}>
                            <Card style={{ backgroundColor: '#1C2833' }}>
                                <View style={{ flexDirection: 'row', paddingLeft: 10, alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                    <Image
                                        source={require('../assets/bag.png')}
                                        style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            resizeMode: 'contain',
                                            width: 40,
                                            height: 40
                                        }}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}> ORDERS </Text>
                                        <Text style={{ color: '#FFFFFF', fontSize: 12 }}> View your product order history </Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    </View>}

                    {isAuthenticated && <View style={{ marginTop: 10 }}>
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
                    </View>}

                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={() => handleSignOut()}>
                            <Card style={{ backgroundColor: '#1C2833' }}>
                                <View style={{ flexDirection: 'row', paddingLeft: 10, alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                    <Image
                                        source={require('../assets/support.png')}
                                        style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            resizeMode: 'contain',
                                            width: 40,
                                            height: 40
                                        }}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}> Contact US </Text>
                                        <Text style={{ color: '#FFFFFF', fontSize: 12 }}> Connect with over store </Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    </View>

                    {isAuthenticated && <View style={{ marginTop: 10 }}>
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
                    </View>}

                    {!isAuthenticated && <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={() => handleLogin()}>
                            <Card style={{ backgroundColor: '#1C2833' }}>
                                <View style={{ flexDirection: 'row', paddingLeft: 10, alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                    <Image
                                        source={require('../assets/enter.png')}
                                        style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            resizeMode: 'contain',
                                            width: 40,
                                            height: 40
                                        }}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}> LOGIN </Text>
                                        <Text style={{ color: '#FFFFFF', fontSize: 12 }}> Login with application </Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    </View>}
                </View>

                <View style={{
                    flexDirection: 'column', alignItems: 'center',
                    alignSelf: 'flex-end', justifyContent: 'space-between', marginTop: 20
                }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}> Follow Us </Text>
                    <View style={socialMediaButtonContainer}>
                        <View style={socialMediaButtonView}>
                            <TouchableOpacity
                                onPress={() => openSocialMediaPlatform(instagramURL)}>
                                <Image
                                    source={require(`../assets/instagram.png`)}
                                    style={socialMediaIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={socialMediaButtonView}>
                            <TouchableOpacity
                                onPress={() => openSocialMediaPlatform(fbURL)}>
                                <Image
                                    source={require(`../assets/facebook.png`)}
                                    style={socialMediaIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>

            {/* <View style={{
                flexDirection: 'column', alignItems: 'center',
                alignSelf: 'flex-end', justifyContent: 'space-between', marginBottom: 50
            }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}> Follow Us </Text>
                <View style={socialMediaButtonContainer}>
                    <View style={socialMediaButtonView}>
                        <TouchableOpacity
                            onPress={() => openSocialMediaPlatform(instagramURL)}>
                            <Image
                                source={require(`../assets/instagram.png`)}
                                style={socialMediaIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={socialMediaButtonView}>
                        <TouchableOpacity
                            onPress={() => openSocialMediaPlatform(fbURL)}>
                            <Image
                                source={require(`../assets/facebook.png`)}
                                style={socialMediaIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View> */}
        </>
    );
}

export default SettingScreen;

const styles = StyleSheet.create({
    socialMediaButtonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        alignSelf: 'flex-end'
    },
    socialMediaButtonView: {
        margin: 10
    },
    socialMediaIcon: {
        height: 40,
        width: 40
    }
});