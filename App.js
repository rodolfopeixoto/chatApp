import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { send, subscribe } from 'react-native-training-chat-server';

const NAME   = 'Rodolfo Peixoto';
const CHANEL = 'Reactivate';

export default class App extends React.Component {

  state = {
    typing: "",
    message: [],
  };

  componentDidMount(){
    subscribe(CHANEL, message => {
      this.setState({ message });
    });
  }

  renderItem({item}){
    return(
      <View style={ styles.row } >
        <Text style={styles.sender} >{item.sender}</Text>
        <Text style={styles.message} >{item.message}</Text>
      </View>
    );
  }

  async sendMessage(){
    await send({
      channel: CHANEL,
      sender: NAME,
      message: this.state.typing
    });

    this.setState({
      typing: '',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.message}
          renderItem={this.renderItem}
          inverted
        />
        <KeyboardAvoidingView behavior="padding">
        <View style={styles.footer}>
          <TextInput 
            value={this.state.typing}
            onChangeText={ (text) => { this.setState({typing: text}) }}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Type something nice"
          />
        </View>
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={ this.sendMessage.bind(this) }>
          <Text style={styles.send}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  message: {
    fontSize: 18,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20
  }
});
