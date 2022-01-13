import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#468'
  },
  addBtnForm: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    zIndex: 1000,
  },
  addBtn: {
    width: 44,
    backgroundColor: '#fff',
    height: 40,
    marginTop: 6,
    alignItems: 'center',
    paddingTop: 7,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  input: {
    width: '100%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  modalAdd: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 2,
    padding: 35,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "#000",
    elevation: 20,
  },
  flex: {
    flex: 1,
  },
  chatList: {
    width: '98%',
    height: 80,
    borderRadius: 16,
    borderStyle: 'solid',
    borderColor: '#026',
    borderWidth: 1.5,
    borderRadius: 5,
    margin: 5,
    padding: 10,
    backgroundColor: '#eee',shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  fullView: {
    width: '100%',
    height: '100%',
  },
})