import React, { useState, useEffect, useRef } from 'react'
import { Button, TextInput, Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import HomeScript from './scripts'
import firebase from '../../firebase/config'
import { collection, getDocs, deleteDoc, query, where, addDoc, doc, orderBy, onSnapshot } from 'firebase/firestore';

export default function HomeScreen(props) {
  const [modalAdd, setModalAdd] = useState(false)
  const [chatId, setChatId] = useState(null)
  const [chats, setChats] = useState([])

  const script = new HomeScript()

  const chatsCol = collection(firebase, 'chats')

  //Retrieve chats
  useEffect(() => {
    const unSubscribeRetrieveChat = onSnapshot(query(chatsCol, orderBy('lastUpdateDate', 'desc')), data => {
      setChats(data.docs.map(item => item))
    })
    return () => unSubscribeRetrieveChat()
  }, [])

  /*const getAllChats = () => {
    script.getAllChats().then(data => {
      setChat(data)
    })
  }*/

  const addChat = () => {
    script.addChat(chatId).then(() => {
      setModalAdd(false)
      setChatId(null)
    })
  }

  const addChatModal = () => {
    setModalAdd(true)
  }

  const closeModalAdd = () => {
    setModalAdd(false)
    setChatId(null)
  }

  const openChat = (item) => {
    props.navigation.navigate('Chat', {id: item.id, chat: item.data()})
  }

  return (
    <View style={styles.container}>
      <View style={styles.addBtnForm}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => addChatModal()}
        >
          <Icon
            name="plus"
            color={'#0af'}
            size={28}
          >
          </Icon>
        </TouchableOpacity>
      </View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalAdd}
        onRequestClose={closeModalAdd}
      >
        <View style={styles.flex}></View>
        <View style={styles.modalAdd}>
          <Text>Chat ID</Text>
          <TextInput
            style={styles.input}
            value={chatId}
            onChangeText={setChatId}
            autoFocus={true}
          />
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Button
                title="   OK   "
                onPress={addChat}
              />
            </View>
            <View style={styles.flex}></View>
            <View>
              <Button
                title="Cancel"
                onPress={closeModalAdd}
                color='red'
              />
            </View>
          </View>
        </View>
        <View style={styles.flex}></View>
        <View style={styles.flex}></View>
      </Modal>
      <ScrollView style={{width: '100%'}}>
        {chats.map((item, index) => {
          return <View key={index} style={styles.chatList}>
            <TouchableOpacity
              style={styles.fullView}
              onPress={() => openChat(item)}
            >
              <Text style={{fontSize: 20}}>{item.data().name}</Text>
            </TouchableOpacity>
          </View>
        })}
      </ScrollView>
    </View>
  )
}