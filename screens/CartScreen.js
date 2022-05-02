
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, SafeAreaView } from 'react-native'
import { Card } from 'react-native-paper';
import Modal from "react-native-modal";
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Button } from 'react-native-paper';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { StripeProvider } from '@stripe/stripe-react-native';
import { app } from '../firebase';
import PaymentScreen from './PaymentScreen';
import ProductDetailModal from '../component/modal/ProductDetailModal';


const CartScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [addressErrorDialog, setAddressErrorDialog] = useState(false);
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    container, screenTitleContainer, screenBackIcon, screenTitle, flatListCardContainer, card,
    cardBody, productTitleContainer, productTitle, productDescription, cardActionContainer,
    cardActionButton, cardActionButtonIcon, dialogTitle, dialogSubtitle, dialogOkButton,
    dialogOkButtonTitle, walletButton, walletIcon, totalPriceView, totalPriceContainer,
    totalPriceText, productPriceAndWightContainer,
  } = styles;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cardItems = useSelector((state) => state.cardItems);
  const userDetails = useSelector((state) => state.userDetails);


  const db = getFirestore(app);
  const orderCollectionRef = collection(db, "orders");

  useEffect(() => {
    setProductList([...cardItems]);

    let tempPrice = totalPrice;
    cardItems.forEach((item) => {
      tempPrice = (item.price * item.qty) + tempPrice;
    });
    setTotalPrice(tempPrice);

    (userDetails && !userDetails.address) && setAddressErrorDialog(true);
  }, [cardItems]);

  const toggleModal = (productDetail) => {
    setModalVisible(!isModalVisible);
    setSelectedProduct(productDetail)
  }

  const togglePaymentModal = (status) => {
    setPaymentModalVisible(status);
  }

  const handleBack = () => navigation.pop();

  const addOrderHandler = (userDetails) => {
    productList.forEach(async (product) => {
      let orderDetail = {
        product_id: product.id,
        user_id: userDetails ? userDetails.id : '',
        status: 'placed'.toUpperCase(),
        qty: product.qty,
        price: product.qty * product.price,
        date: new Date(),
      }
      orderDetail = userDetails ? userDetails : { 
        ...orderDetail, 
        address: address,
        user_name: `${userDetails.firstName} ${userDetails.lastName}`,
        phonenumber: userDetails.phonenumber,
        post_code: userDetails.postCode,
      }

      await addDoc(orderCollectionRef, orderDetail);
    });
    dispatch({ type: 'DELETE_CARD' });
    togglePaymentModal(false);
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
          <Text style={screenTitle}> CART </Text>
          {productList.length > 0 &&
            <View style={totalPriceView}>
              <View style={totalPriceContainer}>
                <Text
                  style={totalPriceText}
                  numberOfLines={1}>
                  {`\u00A3 ${totalPrice}`}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => togglePaymentModal(true)}
                style={walletButton}>
                <Image
                  source={require('../assets/wallet.png')}
                  style={walletIcon} />
              </TouchableOpacity>
            </View>}
        </View>
        <FlatList
          data={productList}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <View style={flatListCardContainer} key={index}>
                <Card style={card}>
                  <Card.Cover source={{
                    uri: item.imageUrl,
                  }} />
                  <View style={cardBody}>
                    <View style={productTitleContainer}>
                      <Text
                        numberOfLines={1}
                        style={productTitle}>
                        {item.productName}
                      </Text>
                    </View>
                    <View style={productPriceAndWightContainer}>
                      <View style={productTitleContainer}>
                        <Text
                          numberOfLines={1}>
                          {`\u00A3 ${item.price}`}
                        </Text>
                      </View>
                      <View style={productTitleContainer}>
                        <Text
                          numberOfLines={1}>
                          {item.weight}
                        </Text>
                      </View>
                    </View>
                    <View style={productTitleContainer}>
                      <Text
                        numberOfLines={1}>
                        {`QTY: ${item.qty}`}
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
              </View>);
          }} />
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
            <View style={{ paddingRight: 5, paddingLeft: 5, height: 500 }}>
              <View style={cardBody}>
                <StripeProvider
                  publishableKey={'pk_test_51KsV96SJINhNLhDFA2wzyCn5n9We2iaud8gm6MvI5np09eQX3DZOpzRc0D8xXu1PzEfZx1LBPNvlCQlMyT34WRhv00ePRdTiYB'}
                  merchantIdentifier="merchant.identifier">
                  <PaymentScreen
                    showForm={userDetails ? false : true}
                    firstName={userDetails && userDetails.firstName ? userDetails.firstName : ''}
                    lastName={userDetails && userDetails.lastName ? userDetails.lastName : ''}
                    address={userDetails && userDetails.address ? userDetails.address : ''}
                    postalCode={userDetails && userDetails.postalCode ? userDetails.postalCode : ''}
                    addOrder={(userDetails) => addOrderHandler(userDetails)}
                    totalPrice={totalPrice} />
                </StripeProvider>
              </View>
            </View>
          </View>
        </Modal>}

      {selectedProduct &&
        <ProductDetailModal
          isModalVisible={isModalVisible}
          selectedProduct={selectedProduct}
          toggleModal={(productDetail) => toggleModal(productDetail)} />}

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
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center'
  },
  screenTitle: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center'
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
  },
  totalPriceView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  totalPriceContainer: {
    marginHorizontal: 10
  },
  totalPriceText: {
    fontSize: 25
  },
  productPriceAndWightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})