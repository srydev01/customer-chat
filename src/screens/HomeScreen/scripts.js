import firebase from '../../firebase/config'
import { collection, getDocs, deleteDoc, query, where, addDoc, doc, orderBy } from 'firebase/firestore';


//collection
const chatsCol = collection(firebase, 'chats');
const productsCol = collection(firebase, 'products');

class HomeScript {
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
}

export default HomeScript