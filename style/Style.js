import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: '#cbd3cc',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#cbd3cc',
    flexDirection: 'row'
  },
  title: {
    color: '#69756a',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
    
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 10
  },
  gameinfo: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    fontSize: 15,
    padding: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 10,
    flexDirection: "row",
    padding: 10,
    backgroundColor: '#eec392',
    width: 150,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  playerName: {
    backgroundColor: '#faebdb'
  },
  titles: {
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    color: '#69756a'
  },
  label: {
    fontSize: 15,
    padding: 10
  },
  row: {
    padding: 5
  }
});