import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core'
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Linking } from 'react-native'
import { Card } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const fbURL = 'https://www.facebook.com/groups/5092353437469549/?multi_permalinks=5140427655995460%2C5135247693180123%2C5129797220391837&notif_id=1649326578171979&notif_t=group_activity&ref=notif';
const instagramURL = 'https://www.instagram.com/labdhivinay/';

const SettingScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {
        socialMediaButtonContainer, socialMediaButtonView, socialMediaIcon,
    } = styles;

    const isAuthenticated = useSelector((state) => state.isAuthenticated);

    const handleSignOut = () => {
        dispatch({ type: 'RESET_AUTHENTICATION' });
        navigation.replace("Login");
    }
    const handleCart = () => navigation.push("Cart");
    const handleProfile = () => navigation.push("Profile");
    const handleOrder = () => navigation.push("Order");
    const handleLogin = () => navigation.push("Login");
    const handleContactUs = () => navigation.push("ContactUs");


  const openSocialMediaPlatform = async (url) => {
    const supported = await Linking.canOpenURL(url);
    (supported) && await Linking.openURL(url);
  }
    return (
        <>
            <SafeAreaView />
            <View style={{ paddingBottom: 10 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}> SETTINGS </Text>
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
                        <TouchableOpacity onPress={() => handleContactUs()}>
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