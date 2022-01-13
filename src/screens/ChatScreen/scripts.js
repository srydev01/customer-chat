import firebase from '../../firebase/config'
import { collection, getDocs, query, where, addDoc, doc, orderBy, limit, startAfter, setDoc, getDocFromCache } from 'firebase/firestore'

class ChatScript {
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

export default ChatScript