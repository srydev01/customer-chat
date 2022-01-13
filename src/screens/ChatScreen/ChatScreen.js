import React, { useState, useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import ChatScript from './scripts'
import firebase from '../../firebase/config'
import { onSnapshot, collection, query, doc, where, orderBy } from 'firebase/firestore'

export default function ChatScreen(props) {
  const [scrollRef, setScrollRef] = useState(null)
  const [messages, setMessages] = useState([])
  const [msgInput, setMsgInput] = useState('')
  const [positionY, setPositionY] = useState(null)
  const [visibleToLastBtn, setVisibleToLastBtn] = useState({height: 0})

  const script = new ChatScript()

  useEffect(() => {
    const usSubscribeRetrieveMessage = onSnapshot(query(collection(doc(firebase, 'chats', props.route.params.id), 'messages'), orderBy('msgNo', 'desc')), (data) => {
      setMessages(data.docs.map(item => item.data()))
    })
    return () => usSubscribeRetrieveMessage()
  }, [])

  /*const retrieveMessage = () => {
    script.getMessages(props.route.params.id, lastMsg).then(data => {
      if(data.ret != messages) {
        setMessages(data.ret)
        setLastMsg(data.lastMsg ? data.lastMsg : 'end')
        setLastMsgNo(data.lastMsgNo)
        //console.log(data.lastMsgNo)
      }
    })
  }*/

  const handlerScrollToEnd = (event) => {
    scrollRef.scrollToEnd({animated: false})
  }

  const onScroll = (event) => {
    //console.log(event.nativeEvent);
    if(event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height != positionY) {
      setPositionY(event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height)
    }
    if(event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height == positionY && positionY && (positionY - event.nativeEvent.contentOffset.y) > 50) {
      setVisibleToLastBtn({})
    } else {
      setVisibleToLastBtn({height: 0})
    }
  }

  const sentMessage = () => {
    if(msgInput && msgInput.match(/^ *$/) == null) {
      script.sentMessage(props.route.params.id, msgInput, messages.length > 0 ? messages[0].msgNo+1 : 1).then(() => {
        setMsgInput('')
        handlerScrollToEnd()
      })
    } else {
      setMsgInput('')
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{width: '100%',}}
        onScroll={onScroll}
        ref={(ref) => setScrollRef(ref)}
        onLayout={handlerScrollToEnd}
      >
        <View style={styles.chatBox}>
          <View style={{height: 50}}></View>
          {messages.map((item, index) => {
            return <View key={index} style={[styles.formMsg, item.fromHost ? styles.thereChatFrom : styles.ownChatFrom]}>
              <View style={[styles.msgBox, item.fromHost ? styles.thereChatMsg : styles.ownChatMsg]}>
                <Text style={[styles.fontMsg, item.fromHost ? {color: '#fff'} : {}]} selectable>{item.text}</Text>
              </View>
            </View>
          })}
          <View style={{height: 20}}></View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.toLastBtn, visibleToLastBtn]}
        onPress={() => handlerScrollToEnd()}
      >
        <Icon
          name='angle-down'
          color={'#0af'}
          size={32}
        >
        </Icon>
      </TouchableOpacity>
      <View style={styles.inputChat}>
        <TextInput
          style={styles.input}
          placeholder='Type a message...'
          onTouchEnd={() => handlerScrollToEnd()}
          onChangeText={text => setMsgInput(text)}
          value={msgInput}
        />
        <TouchableOpacity
          style={styles.sentBtn}
          onPress={() => sentMessage()}
        >
          <Icon
            name="paper-plane"
            color={'#0af'}
            size={24}
          >
          </Icon>
        </TouchableOpacity>
      </View>
    </View>
  )
}