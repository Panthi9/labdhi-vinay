
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, SafeAreaView } from 'react-native'
import { Card } from 'react-native-paper';
import Modal from "react-native-modal";
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Button } from 'react-native-paper';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { app } from '../firebase';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentScreen from './PaymentScreen';


const CartScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [addressErrorDialog, setAddressErrorDialog] = useState(false);
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    container, screenTitleContainer, screenBackIcon, screenTitle, flatListCardContainer, card,
    cardBody, productTitleContainer, productTitle, productDescription, cardActionContainer,
    cardActionButton, cardActionButtonIcon, dialogTitle, dialogSubtitle, dialogOkButton,
    dialogOkButtonTitle, walletButton, walletIcon
  } = styles;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cardItems = useSelector((state) => state.cardItems);
  const userDetails = useSelector((state) => state.userDetails);


  const db = getFirestore(app);
  const orderCollectionRef = collection(db, "orders");

  useEffect(() => {
    setProductList([...cardItems]);
    (!userDetails.address) && setAddressErrorDialog(true);
  }, [cardItems]);

  const toggleModal = (productDetail) => {
    setModalVisible(!isModalVisible);
    setSelectedProduct(productDetail)
  }

  const togglePaymentModal = (status) => {
    setPaymentModalVisible(status);
    addOrderHandler();
  }

  const handleBack = () => navigation.pop();

  const addOrderHandler = () => {
    productList.forEach(async (product) => {
      let orderDetail = {
        product_id: product.id,
        user_id: userDetails.id,
        status: 'placed'.toUpperCase(),
        date: new Date(),
      }
      await addDoc(orderCollectionRef, orderDetail);
    });
    dispatch({ type: 'DELETE_CARD' })
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
          <Text style={screenTitle}> Cart </Text>

          {productList.length > 0 && <TouchableOpacity
            onPress={() => togglePaymentModal(true)}
            style={walletButton}>
            <Image
              source={require('../assets/wallet.png')}
              style={walletIcon} />
          </TouchableOpacity>}
        </View>

        <FlatList
          data={productList}
          numColumns={2}
          renderItem={({ item, index }) =>
            <View style={flatListCardContainer} key={index}>
              <Card style={card}>
                <Card.Cover source={{
                  uri: item.imageUrl,
                }} />
                <View style={cardBody}>
                  <View style={productTitleContainer}>
                    <Text
                      numberOfLines={2}
                      style={productTitle}>
                      {item.productName}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={10}
                    style={productDescription}>
                    {item.description}
                  </Text>
                </View>
                <Card.Actions style={cardActionContainer}>
                  <TouchableOpacity onPress={() => dispatch({ type: 'DELETE_CARD_ITEM', payload: index })}>
                    <View style={cardActionButton}>
                      <Image
                        source={require('../assets/garbage.png')}
                        style={cardActionButtonIcon} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleModal(item)}>
                    <View style={cardActionButton}>
                      <Image
                        source={require('../assets/binoculars.png')}
                        style={cardActionButtonIcon} />
                    </View>
                  </TouchableOpacity>
                </Card.Actions>
              </Card>
            </View>
          } />
      </View>

      {isPaymentModalVisible &&
        <Modal isVisible={true} style={{ margin: 5 }}>
          <View style={{ backgroundColor: '#FFFFFF', paddingRight: 5, paddingLeft: 5, paddingBottom: 15, paddingTop: 15 }}>
            <TouchableOpacity onPress={() => togglePaymentModal(false)}>
              <View style={{ marginRight: 5, alignItems: 'flex-end', padding: 10 }}>
                <Image
                  source={require('../assets/close.png')}
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    resizeMode: 'contain',
                    width: 15,
                    height: 15,
                  }}
                />
              </View>
            </TouchableOpacity>
            <View style={{ paddingRight: 5, paddingLeft: 5, height: 250 }}>
              <View style={cardBody}>
                <StripeProvider
                  publishableKey={'pk_test_51KsV96SJINhNLhDFA2wzyCn5n9We2iaud8gm6MvI5np09eQX3DZOpzRc0D8xXu1PzEfZx1LBPNvlCQlMyT34WRhv00ePRdTiYB'}
                  merchantIdentifier="merchant.identifier">
                  <PaymentScreen />
                </StripeProvider>
              </View>
            </View>
          </View>
        </Modal>}

      {selectedProduct &&
        <Modal isVisible={isModalVisible} style={{ margin: 5 }}>
          <View style={{ backgroundColor: '#FFFFFF', paddingRight: 5, paddingLeft: 5, paddingBottom: 15, paddingTop: 15 }}>
            <TouchableOpacity onPress={() => toggleModal(null)}>
              <View style={{ marginRight: 5, alignItems: 'flex-end', padding: 10 }}>
                <Image
                  source={require('../assets/close.png')}
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    resizeMode: 'contain',
                    width: 15,
                    height: 15,
                  }}
                />
              </View>
            </TouchableOpacity>
            <View style={{ paddingRight: 5, paddingLeft: 5 }}>
              <View style={cardBody}>
                <View style={productTitleContainer}>
                  <Text
                    numberOfLines={1}
                    style={productTitle}>
                    {selectedProduct && selectedProduct.productName}
                  </Text>
                </View>
                <View style={productTitleContainer}>
                  <Text
                    numberOfLines={1}>
                    {`\u00A3 ${selectedProduct && selectedProduct.price}`}
                  </Text>
                </View>
                <Text
                  numberOfLines={10}
                  style={productDescription}>
                  {selectedProduct && selectedProduct.description}
                </Text>
              </View>
            </View>
          </View>
        </Modal>}

      <Dialog
        visible={addressErrorDialog}
        onDismiss={() => handleBack()}>
        <Dialog.Content>
          <View>
            <Text style={dialogTitle}>
              {`User Details.`}
            </Text>
            <Text style={dialogSubtitle}>
              {`Please provide the shipping address detail.`}
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            style={dialogOkButton}
            onPress={() => handleBack()}>
            <Text style={dialogOkButtonTitle}>OK</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}

export default CartScreen

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
    width: '50%',
    padding: 5,
  },
  card: {
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
    height: 100,
    textAlign: 'justify',
    color: '#1C2833'
  },
  cardActionContainer: {
    justifyContent: 'flex-end',
  },
  cardActionButton: {
    marginRight: 5,
    backgroundColor: '#D35400',
    padding: 10,
    borderRadius: 150 / 2
  },
  cardActionButtonIcon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    resizeMode: 'contain',
    width: 18,
    height: 18
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
  dialogOkButton: {
    backgroundColor: '#D35400',
  },
  dialogOkButtonTitle: {
    color: '#FFFFFF',
  },
  walletIcon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  walletButton: {
    padding: 10,
    backgroundColor: '#D35400',
    borderRadius: 150 / 2,
    marginRight: 5,
  }
})