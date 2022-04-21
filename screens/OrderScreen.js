import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, SafeAreaView } from 'react-native';
import { getFirestore, collection, getDocs, where, query, doc, getDoc } from "firebase/firestore";
import { app } from '../firebase';
import { Card } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

const OrderScreen = () => {
    const [orders, setOrders] = useState([]);
    const navigation = useNavigation();
    const userDetails = useSelector((state) => state.userDetails);

    const db = getFirestore(app);
    const orderCollectionRef = collection(db, "orders");
    const productCollectionRef = collection(db, "products");

    const {
        container, screenTitleContainer, screenBackIcon, screenTitle,
        flatListCardContainer, card, cardBody,
        productTitleContainer, productTitle, productDescription, cardActionContainer,
        cardActionButton, cardActionButtonIcon
    } = styles;

    useEffect(() => {
        getOrders();
    }, []);

    useEffect(() => {
        console.log('orders', orders);
    }, [orders]);

    const handleBack = () => navigation.pop();

    const getOrders = async () => {
        let orders = [];

        const orderDetail = await query(orderCollectionRef, where('user_id', '==', userDetails.id));
        const orderQuerySnapshot = await getDocs(orderDetail);


        let orderDocCollection = [];
        orderQuerySnapshot.forEach(orderDoc => {

            orderDocCollection.push({
                id: orderDoc.id,
                date: new Date(orderDoc.data().date),
                status: orderDoc.data().status,
                productId: orderDoc.data().product_id,
            });
        });

        for (const order of orderDocCollection) {
            let productName;
            let orderDetails;

            const productQuerySnapshot = doc(db, 'products', order.productId);
            const docSnap = await getDoc(productQuerySnapshot);

            try {
                productName = docSnap.data().product_name;
                orderDetails = {
                    ...order,
                    productName: productName,
                }
                orders.push(orderDetails);
            } catch (error) { }
        }

        setOrders(orders);
    }

    return (
        <>
            <SafeAreaView />
            <View style={container}>
                <View style={screenTitleContainer}>
                    <TouchableOpacity onPress={() => handleBack()} style={{ padding: 10, }}>
                        <Image
                            source={require('../assets/back.png')}
                            style={screenBackIcon} />
                    </TouchableOpacity>
                    <Text style={screenTitle}> Orders </Text>
                </View>
                <FlatList
                    data={orders}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ marginVertical: 5, marginHorizontal: 10 }} key={index}>
                                <Card style={{ backgroundColor: '#1C2833' }}>
                                    <View style={{ flexDirection: 'row', paddingLeft: 10, alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                        <Image
                                            source={require('../assets/04.png')}
                                            style={{
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                resizeMode: 'contain',
                                                width: 50,
                                                height: 50,
                                            }}
                                        />
                                        <View style={{ marginLeft: 10, flex: 1 }}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}> {item.productName} </Text>
                                            <Text style={{ color: '#FFFFFF', fontSize: 12, marginTop: 5 }}> {item.status} </Text>
                                            <Text style={{ color: '#FFFFFF', fontSize: 12, marginTop: 5 }}> {item.date.toString()} </Text>
                                        </View>
                                        {item.status == 'PLACED' ?
                                            <View style={{ marginLeft: 10 }}>
                                                <TouchableOpacity onPress={() => { }}>
                                                    <View style={cardActionButton}>
                                                        <Text style={{ color: '#FFFFFF', fontSize: 12, marginTop: 5 }}> {'CANCLE'} </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View> : <View />}
                                    </View>
                                </Card>
                            </View>
                        );
                    }} />
            </View>
        </>
    );
}

export default OrderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screenTitleContainer: {
        paddingBottom: 10,
        flexDirection: 'row'
    },
    screenTitle: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold'
    },
    screenBackIcon: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        resizeMode: 'contain',
        width: 15,
        height: 15,
    },
    flatListCardContainer:
    {
        width: '100%',
        padding: 5,
    },
    card: {
        height: 400,
        backgroundColor: '#FFFFFF'
    },
    cardBody: {
        paddingRight: 5,
        paddingLeft: 5
    },
    productTitleContainer: {
        marginBottom: 5,
    },
    productTitle: {
        height: 50,
        fontSize: 18,
        textAlign: 'justify',
        fontWeight: 'bold',
        color: '#D35400',
    },
    productDescription: {
        textAlign: 'justify',
        color: '#1C2833'
    },
    cardActionContainer: {
        justifyContent: 'flex-start',
        marginVertical: 15
    },
    cardActionButton: {
        marginRight: 5,
        backgroundColor: '#D35400',
        padding: 10,
        borderRadius: 10
    },
    cardActionButtonIcon: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        resizeMode: 'contain',
        width: 18,
        height: 18
    },
})