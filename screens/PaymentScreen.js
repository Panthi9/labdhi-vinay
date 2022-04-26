import React, { useState } from "react";
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";

//ADD localhost address of your server
const API_URL = "http://localhost:3000";

const PaymentScreen = props => {
    const [email, setEmail] = useState();
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment, loading } = useConfirmPayment();

    const fetchPaymentIntentClientSecret = async () => {
        console.log("=== fetchPaymentIntentClientSecret");
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { clientSecret, error } = await response.json();
        console.log("===",clientSecret, error);
        return { clientSecret, error };
    };

    const handlePayPress = async () => {
        if (!cardDetails?.complete || !email) {
            Alert.alert("Please enter Complete card details and Email");
            return;
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
            <TextInput
                autoCapitalize="none"
                placeholder="E-mail"
                keyboardType="email-address"
                onChange={value => setEmail(value.nativeEvent.text)}
                style={styles.input}
            />
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
        marginTop: 100,
        height: 450
    },
    input: {
        backgroundColor: "#efefefef",

        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
    },
    card: {
        backgroundColor: "#efefefef",
    },
    cardContainer: {
        height: 50,
        marginVertical: 30,
    },
});
