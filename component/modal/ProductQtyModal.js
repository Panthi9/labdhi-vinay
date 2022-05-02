import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Modal from "react-native-modal";

const ProductQtyModal = (props) => {
    const { showQtyModal, selectedProduct, toggleShowQtyModal, qty, increaseQty, decreaseQty } = props;

    const {
        modalContainer, modalView, closeModalView, closeIcon, productDetailView, cardBody,
        productTitleContainer, productPriceText, productPriceAndWightContainer, productQtyView,
        productQtyText, productQtyButton, cardActionButton, cardActionButtonIcon, productDescription,
        addToCardButtonView, addToCardButtonText, productTitle,  addToCardButton,
    } = styles;

    const dispatch = useDispatch();

    addToCardHandler = () => {
        dispatch({ type: 'SET_CARD_ITEM', payload: { ...selectedProduct, qty: qty } });
        toggleShowQtyModal(false, null)
    }

    return (
        <Modal isVisible={showQtyModal} style={modalContainer}>
            <View style={modalView}>
                <TouchableOpacity onPress={() => toggleShowQtyModal(false, null)}>
                    <View style={closeModalView}>
                        <Image
                            source={require('../../assets/close.png')}
                            style={closeIcon} />
                    </View>
                </TouchableOpacity>
                <View style={productDetailView}>
                    <View style={cardBody}>
                        <View style={productTitleContainer}>
                            <Text
                                numberOfLines={1}
                                style={productTitle}>
                                {selectedProduct && selectedProduct.productName}
                            </Text>
                        </View>
                        <View style={productPriceAndWightContainer}>
                            <View style={productTitleContainer}>
                                <Text
                                    style={productPriceText}
                                    numberOfLines={1}>
                                    {`\u00A3 ${selectedProduct && selectedProduct.price}`}
                                </Text>
                            </View>
                            <View style={productTitleContainer}>
                                <Text
                                    style={productPriceText}
                                    numberOfLines={1}>
                                    {selectedProduct && selectedProduct.weight}
                                </Text>
                            </View>
                        </View>

                        <View style={productQtyView}>
                            <Text style={productQtyText}> QTY </Text>
                        </View>
                        <View style={productQtyButton}>
                            <TouchableOpacity onPress={() => decreaseQty()}>
                                <View style={cardActionButton}>
                                    <Image
                                        source={require('../../assets/minus.png')}
                                        style={cardActionButtonIcon} />
                                </View>
                            </TouchableOpacity>
                            <View style={{ alignSelf: 'center', marginHorizontal: 15 }}>
                                <Text style={{ fontSize: 20 }}>
                                    {qty}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => increaseQty()}>
                                <View style={cardActionButton}>
                                    <Image
                                        source={require('../../assets/plus.png')}
                                        style={cardActionButtonIcon} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text
                            numberOfLines={10}
                            style={productDescription}>
                            {selectedProduct && selectedProduct.description}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={addToCardButton} onPress={() => addToCardHandler()}>
                    <View style={addToCardButtonView}>
                        <Text style={addToCardButtonText}> ADD TO CARD </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

export default ProductQtyModal;

const styles = StyleSheet.create({
    modalContainer: {
        margin: 5
    },
    modalView: {
        backgroundColor: '#FFFFFF',
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 15,
        paddingTop: 15
    },
    closeModalView: {
        marginRight: 5,
        alignItems: 'flex-end',
        padding: 10
    },
    closeIcon: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        resizeMode: 'contain',
        width: 15,
        height: 15,
    },
    productDetailView: {
        paddingRight: 5,
        paddingLeft: 5
    },
    cardBody: {
        paddingRight: 5,
        paddingLeft: 5
    },
    productTitleContainer: {
        marginBottom: 5,
    },
    productPriceText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    productPriceAndWightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    productQtyView: {
        marginVertical: 10
    },
    productQtyText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    productQtyButton: {
        flexDirection: 'row',
        marginVertical: 10
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
    productDescription: {
        height: 100,
        textAlign: 'justify',
        color: '#1C2833'
    },
    addToCardButton: {
        backgroundColor: '#D35400',
        borderRadius: 10
    },
    addToCardButtonView: {
        padding: 12
    },
    addToCardButtonText: {
        color: '#FFFFFF',
        textAlign: 'center'
    },
    productTitle: {
        fontSize: 18,
        textAlign: 'justify',
        fontWeight: 'bold',
        color: '#D35400',
    },
});