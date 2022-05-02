import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";

const ProductDetailModal = (props) => {
    const { isModalVisible, selectedProduct, toggleModal, } = props;

    const {
        modalContainer, modalView, modalCloseView, modalCloseIcon, productDetailView,
        cardBody, productTitleContainer, productTitle, productDescription,
        productPriceAndWightContainer,
    } = styles;

    return (
        <Modal isVisible={isModalVisible} style={modalContainer}>
            <View style={modalView}>
                <TouchableOpacity onPress={() => toggleModal(null)}>
                    <View style={modalCloseView}>
                        <Image
                            source={require('../../assets/close.png')}
                            style={modalCloseIcon} />
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
                                    numberOfLines={1}>
                                    {`\u00A3 ${selectedProduct && selectedProduct.price}`}
                                </Text>
                            </View>
                            <View style={productTitleContainer}>
                                <Text
                                    numberOfLines={1}>
                                    {selectedProduct && selectedProduct.weight}
                                </Text>
                            </View>
                        </View>
                        <Text
                            numberOfLines={10}
                            style={productDescription}>
                            {selectedProduct && selectedProduct.description}
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default ProductDetailModal;

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
    modalCloseView: {
        marginRight: 5,
        alignItems: 'flex-end',
        padding: 10
    },
    modalCloseIcon: {
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
    productPriceAndWightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});