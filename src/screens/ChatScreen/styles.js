import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#468',
  },
  chatBox: {
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  formMsg: {
    textAlign: 'left',
    width: '96%',
  },
  msgBox: {
    maxWidth: '86%',
    marginVertical: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 18,
    borderRadius: 16,
    borderStyle: 'solid',
    borderColor: '#026',
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  fontMsg: {
    fontSize: 16,
    color: '#000'
  },
  inputChat: {
    backgroundColor: '#468',
    flexDirection: "row",
    flexWrap: "wrap",
    position: 'absolute',
    bottom: 0,
    zIndex: 1000,
  },
  input: {
    width: '83%',
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    fontSize: 16,
    margin: 6,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sentBtn: {
    width: '13%',
    backgroundColor: '#fff',
    height: 40,
    marginTop: 6,
    alignItems: 'center',
    paddingTop: 7,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toLastBtn: {
    position: 'absolute',
    bottom: 60,
    width: '10%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 3,
    shadowColor: '#000',
    elevation: 3,
  },
  thereChatFrom: {
    alignItems: 'flex-start'
  },
  thereChatMsg: {
    backgroundColor: '#337'
  },
  ownChatFrom: {
    alignItems: 'flex-end'
  },
  ownChatMsg: {
    backgroundColor: '#fff'
  }
})