
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, SafeAreaView } from 'react-native'
import { Card } from 'react-native-paper';
import Modal from "react-native-modal";
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Button } from 'react-native-paper';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { app } from '../firebase';


const CartScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [addressErrorDialog, setAddressErrorDialog] = useState(false);
  const [productList, setProductList] = useState([]);

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

  const toggleModal = () => setModalVisible(!isModalVisible);

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
            onPress={() =>  addOrderHandler()}
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
                <Card.Cover source={require(`../assets/04.png`)} />
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
                  <TouchableOpacity onPress={() => toggleModal()}>
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

      <Modal isVisible={isModalVisible} style={{ margin: 5 }}>
        <View style={{ backgroundColor: '#FFFFFF', paddingRight: 5, paddingLeft: 5, paddingBottom: 15, paddingTop: 15 }}>
          <TouchableOpacity onPress={toggleModal}>
            <View style={{ marginRight: 5, alignItems: 'flex-end' }}>
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
            <View style={{ marginBottom: 5, }}>
              <Text style={{ fontSize: 18, textAlign: 'justify', fontWeight: 'bold', color: '#D35400' }}>Product Name </Text>
            </View>
            <Text style={{ textAlign: 'justify', color: '#1C2833' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</Text>
          </View>
        </View>
      </Modal>

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
  walletIcon:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  walletButton:{ 
    padding: 10, 
    backgroundColor: '#D35400', 
    borderRadius: 150 / 2, 
    marginRight: 5, 
  }
})