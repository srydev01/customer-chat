import firebase from '../config';
import { collection, getDocs, deleteDoc, query, addDoc, doc, orderBy } from 'firebase/firestore'

//collection
const chatsCol = collection(firebase, 'chats');

class ChatsDB {
  addChat = (name) => {
    return new Promise((resolve, reject) => {
      addDoc(chatsCol, {name: name, createdDate: new Date(), lastUpdateDate: new Date()}).then(() => {
        console.log('Add chat ' + name + ' success.');
        resolve()
      })
    })
  }
  deleteChat = () => {
    getDocs(query(chatsCol, orderBy('lastUpdate', 'desc'))).then(data => {
      data.forEach(item => {
        //console.log(item._document);
        deleteDoc(item.ref)
      })
    })
  }
  sentMessage = (chatID, message, lastMsgNo) => {
    return new Promise((resolve, reject) => {
      addDoc(collection(doc(firebase, 'chats', chatID), 'messages'), {text: message, readed: false, msgNo: lastMsgNo, fromHost: false}).then(() => {
        getDocFromCache(doc(firebase, 'chats', chatID)).then(chatRef => {
          let chat = chatRef.data()
          chat.lastUpdateDate = new Date()
          setDoc(doc(firebase, 'chats', chatID), chat)
        })
        console.log('Sent message success.');
        resolve()
      })
    })
  }
}

export default ChatsDB