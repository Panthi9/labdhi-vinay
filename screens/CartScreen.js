import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, SafeAreaView } from 'react-native'
// import { auth } from '../firebase'
import { Avatar, Button, Card, Title, Paragraph, Colors } from 'react-native-paper';
import Modal from "react-native-modal";


const CartScreen = () => {
  const navigation = useNavigation();
  let data = [
    { name: '01' },
    // { name: "02" },
    // { name: "03" },
    // {name: 04},
    // {name: 02},
    // {name: 04},
    // {name: 03},
    // {name: 01},
    // {name: 04},
  ];

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleBack = () => {
    navigation.pop()
    // auth
    //   .signOut()
    //   .then(() => {
    //     navigation.replace("Login")
    //   })
    //   .catch(error => alert(error.message))
  }

  return (
    <>
      <SafeAreaView />
      <View style={styles.container}>
        <View style={{ paddingBottom: 10,flexDirection: 'row', alignItems:'center', marginLeft:5, }}>
        <TouchableOpacity onPress={() => handleBack()} style={{padding:10,}}>
          <Image
            source={require('../assets/back.png')}
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              resizeMode: 'contain',
              width: 15,
              height: 15,
            }}
          />
          </TouchableOpacity>
          <View style={{flex:1}}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Cart </Text>
          </View>
          <TouchableOpacity onPress={() => handleBack()} style={{padding:10, backgroundColor:'#D35400', borderRadius:150/2, marginRight:5,}}>
          <Image
            source={require('../assets/wallet.png')}
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              resizeMode: 'contain',
              width: 30,
              height: 30,
            }}
          />
          </TouchableOpacity>
        </View>
        <View style={{flex:1,height:'100%'}}>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({ item, index }) =>
            <View style={{ width: '50%', padding: 5, }}>
              <Card style={{ backgroundColor: '#FFFFFF' }}>
                <Card.Cover
                  source={require(`../assets/04.png`)}
                // source={{ uri: 'https://drive.google.com/drive/folders/1nWGLjZFWqMry6qyVCUndT1f469--iGdS' }} style={{height:100}}
                />
                <View style={{ paddingRight: 5, paddingLeft: 5 }}>
                  <View style={{ marginBottom: 5, }}>
                    <Text style={{ fontSize: 18, textAlign: 'justify', fontWeight: 'bold', color: '#D35400' }}>Product Name </Text>
                  </View>
                  <Text style={{ textAlign: 'justify', color: '#1C2833' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</Text>
                </View>
                <Card.Actions style={{ justifyContent: 'flex-end', }}>
                  <TouchableOpacity onPress={toggleModal}>
                    <View style={{ marginRight: 5, backgroundColor: '#D35400', padding: 10, borderRadius: 150 / 2 }}>
                      <Image
                        source={require('../assets/binoculars.png')}
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          resizeMode: 'contain',
                          width: 18,
                          height: 18,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <View style={{ marginRight: 5, backgroundColor: '#D35400', padding: 10, borderRadius: 150 / 2 }}>
                      <Image
                        source={require('../assets/garbage.png')}
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          resizeMode: 'contain',
                          width: 18,
                          height: 18
                        }}
                      />
                    </View>
                  </TouchableOpacity>

                </Card.Actions>
              </Card>
            </View>
          }
        />
        </View>

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
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
