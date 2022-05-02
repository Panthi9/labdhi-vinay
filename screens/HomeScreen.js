import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, SafeAreaView, TextInput } from 'react-native';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { Card } from 'react-native-paper';
import { app } from '../firebase'
import ProductQtyModal from '../component/modal/ProductQtyModal';
import ProductDetailModal from '../component/modal/ProductDetailModal';


const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [showQtyModal, setShowQtyModal] = useState(false);
  const [qty, setQty] = useState(1);
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchProductTextFieldValue, setSearchProductTextFieldValue] = useState('');

  const {
    container, screenTitleContainer, screenTitle, flatListCardContainer, card, cardBody,
    productTitleContainer, productTitle, productDescription, cardActionContainer,
    cardActionButton, cardActionButtonIcon, searchBoxContainer, searchTextbox,
    productPriceAndWightContainer
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
        price: doc.data().price,
        description: doc.data().description,
        imageUrl: doc.data().image_url
      });
    });
    setProductList(products);
  }

  const searchProducts = async (event) => {
    if (event.nativeEvent.text) {
      let products = [];

      const productDetail = await query(productCollectionRef, where('product_name', '==', event.nativeEvent.text));
      const querySnapshot = await getDocs(productDetail);

      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          productName: doc.data().product_name,
          price: doc.data().price,
          description: doc.data().description,
          imageUrl: doc.data().image_url
        });
      });
      setProductList(products);
    } else {
      getProducts();
    }

  }

  const toggleModal = (productDetail) => {
    setModalVisible(!isModalVisible);
    setSelectedProduct(productDetail)
  };

  const toggleShowQtyModal = (status, productDetail) => {
    setShowQtyModal(status);
    setSelectedProduct(productDetail);
    setQty(1);
  };

  const increaseQty = () => {
    if (qty < 1000) {
      setQty(qty + 1);
    }
  }

  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  }

  return (
    <>
      <SafeAreaView />
      <View style={container}>
        <View style={screenTitleContainer}>
          <Text style={screenTitle}> PRODUCTS </Text>
        </View>
        <View style={searchBoxContainer}>
          <TextInput
            placeholder="Search Product"
            placeholderTextColor={'#1C2833'}
            style={searchTextbox}
            value={searchProductTextFieldValue}
            onChange={(event) => setSearchProductTextFieldValue(event)}
            onSubmitEditing={(event) => searchProducts(event)} />
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
                  <Text
                    numberOfLines={10}
                    style={productDescription}>
                    {item.description}
                  </Text>
                </View>
                <Card.Actions style={cardActionContainer}>
                  <TouchableOpacity onPress={() => toggleShowQtyModal(true, item)}>
                    <View style={cardActionButton}>
                      <Image
                        source={require('../assets/bag.png')}
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

      {showQtyModal &&
        <ProductQtyModal
          showQtyModal={showQtyModal}
          selectedProduct={selectedProduct}
          qty={qty}
          increaseQty={() => increaseQty()}
          decreaseQty={() => decreaseQty()}
          toggleShowQtyModal={(status, productDetail) => toggleShowQtyModal(status, productDetail)} />}

      {selectedProduct &&
        <ProductDetailModal
          isModalVisible={isModalVisible}
          selectedProduct={selectedProduct}
          toggleModal={(productDetail) => toggleModal(productDetail)}/>}
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
  searchBoxContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  searchTextbox: {
    fontSize: 20,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10
  },
  productPriceAndWightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
