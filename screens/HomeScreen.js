import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, SafeAreaView } from 'react-native';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { app } from '../firebase'
import { Card } from 'react-native-paper';
import Modal from "react-native-modal";


const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [productList, setProductList] = useState([]);

  const {
    container, screenTitleContainer, screenTitle, flatListCardContainer, card, cardBody,
    productTitleContainer, productTitle, productDescription, cardActionContainer,
    cardActionButton, cardActionButtonIcon
  } = styles;

  const dispatch = useDispatch();

  const db = getFirestore(app);
  const productCollectionRef = collection(db, "products");


  useEffect(() => {
    if (productList.length == 0) {
      getProducts();
    }
  }, []);

  const getProducts = async () => {
    let products = [];

    const querySnapshot = await getDocs(productCollectionRef);
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        productName: doc.data().product_name,
        subTitle: doc.data().sub_title,
        description: doc.data().description,
      });
    });
    setProductList(products);
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <SafeAreaView />
      <View style={container}>
        <View style={screenTitleContainer}>
          <Text style={screenTitle}> Products </Text>
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
                  <TouchableOpacity onPress={() => dispatch({ type: 'SET_CARD_ITEM', payload: item })}>
                    <View style={cardActionButton}>
                      <Image
                        source={require('../assets/bag.png')}
                        style={cardActionButtonIcon} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={toggleModal}>
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

      {/* 
        Modal UI
      */}
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
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenTitleContainer: {
    paddingBottom: 10
  },
  screenTitle: {
    fontSize: 25,
    fontWeight: 'bold'
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
})
