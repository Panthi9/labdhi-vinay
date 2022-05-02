import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Alert, Text } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";

//ADD localhost address of your server
const API_URL = "http://localhost:3000";

const PaymentScreen = (props) => {
    const { totalPrice, showForm } = props;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment, loading } = useConfirmPayment();

    useEffect(() => {
        setAddress(props.firstName);
        setAddress(props.lastName);
        setAddress(props.address);
        setAddress(props.postalCode);
    }, []);

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { clientSecret, error } = await response.json();
        return { clientSecret, error };
    };

    const handlePayPress = async () => {
        if (!cardDetails?.complete || !firstName || !address || !lastName || !postalCode) {
            Alert.alert("Please enter Complete details");
            return;
        } else {
            props.addOrder({ address, firstName, lastName, postalCode });
        }
        const billingDetails = {
            email: email,
        };
        try {
            const { clientSecret, error } = await fetchPaymentIntentClientSecret();
            if (error) {
                console.log("Unable to process payment");
            } else {
                const { paymentIntent, error } = await confirmPayment(clientSecret, {
                    type: "Card",
                    billingDetails: billingDetails,
                });
                if (error) {
                    alert(`Payment Confirmation Error ${error.message}`);
                } else if (paymentIntent) {
                    alert("Payment Successful");
                    console.log("Payment successful ", paymentIntent);
                } else {
                    alert("Payment Successful");
                }
            }
        } catch (e) {
            console.log(e);
        }
        //3.Confirm the payment with the card details
    };

    return (
        <View style={styles.container}>
            <View style={{ height: 50 }}>
                <Text style={{ fontSize: 20, color: '#000000' }}>   {`Total Amount: \u00A3 ${totalPrice}`} </Text>
            </View>
            {showForm ?
                <View>
                    <TextInput
                        autoCapitalize="none"
                        placeholder="firstName"
                        keyboardType="default"
                        placeholderTextColor={'#1C2833'}
                        value={firstName}
                        onChange={value => setFirstName(value.nativeEvent.text)}
                        style={styles.input} />
                    <TextInput
                        autoCapitalize="none"
                        placeholder="lastName"
                        keyboardType="default"
                        placeholderTextColor={'#1C2833'}
                        value={lastName}
                        onChange={value => setLastName(value.nativeEvent.text)}
                        style={styles.input} />
                    <TextInput
                        autoCapitalize="none"
                        placeholder="address"
                        keyboardType="default"
                        placeholderTextColor={'#1C2833'}
                        value={address}
                        onChange={value => setAddress(value.nativeEvent.text)}
                        style={styles.input} />
                    <TextInput
                        autoCapitalize="none"
                        placeholder="postalCode"
                        keyboardType="default"
                        placeholderTextColor={'#1C2833'}
                        value={postalCode}
                        onChange={value => setPostalCode(value.nativeEvent.text)}
                        style={styles.input} />
                </View> : <View />}
            <CardField
                postalCodeEnabled={true}
                placeholder={{
                    number: "4242 4242 4242 4242",
                }}
                cardStyle={styles.card}
                style={styles.cardContainer}
                onCardChange={cardDetails => {
                    setCardDetails(cardDetails);
                }} />
            <TouchableOpacity onPress={handlePayPress}>
                <View style={{ marginRight: 5, alignItems: 'center', padding: 10 }}>
                    <Image
                        source={require('../assets/credit-card.png')}
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            resizeMode: 'contain',
                            width: 40,
                            height: 40,
                        }} />
                </View>
            </TouchableOpacity>
        </View>
    );
};
export default PaymentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        margin: 20,
        marginTop: 200,
        height: 500
    },
    input: {
        backgroundColor: "#efefefef",
        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
        marginBottom: 10
    },
    card: {
        backgroundColor: "#efefefef",
    },
    cardContainer: {
        height: 50,
        marginVertical: 30,
    },
});
