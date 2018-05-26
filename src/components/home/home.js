'use strict';

import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ListView,
  Image,
  Button,
} from 'react-native';

import FirebaseService from '../../services/firebase-service';
import {SearchBar} from 'react-native-elements';

class Home extends Component {

  static navigationOptions = {
    title: 'Home',
  };

  constructor() {
    super();
    let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});
    this.state = {
      text: '',
      itemDataSource: ds,
    };

    this.itemsRef = FirebaseService.child('items');
    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
    this.items = [];
  }

  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  componentDidMount(){
    //this.getItems(this.itemsRef);
  }

  getItems(itemsRef){
    itemsRef.on('value',(snap)=>{
      //let items = [];
      snap.forEach((child)=>{
        this.items.push({
          title: child.val().title,
          image: child.val().image,
          _key: child.key
        });
      });
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(this.items)
      });
    });
  }

  pressRow(item){
    const {navigate} = this.props.navigation;
    console.log(item);
    //this.itemsRef.child(item._key).remove();
    navigate('Booking',{
      item:item
    });
  }

  renderRow(item){
    return (
      <TouchableHighlight onPress={()=>{
        this.pressRow(item);
      }}>
      <View style={styles.li}>
        <Text style={styles.liText}>
          {item.title}
        </Text>
        <Image
          style={styles.image}
          source={{uri: item.image}}
        />
      </View>
      </TouchableHighlight>
    )
  }

  filterSearch(text){
    const newData = this.items.filter(function(item){
      const itemData = item.title.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      itemDataSource: this.state.itemDataSource.cloneWithRows(newData),
      text: text
    })
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>

        <SearchBar
          lightTheme = {true}
          onChangeText={(text)=> this.filterSearch(text)}
          value = {this.state.text}
        />

        <ListView
          dataSource = {this.state.itemDataSource}
          renderRow = {this.renderRow}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#33ff99',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingTop: 14,
    paddingBottom: 16,
  },
  buttonText: {
    color: '#000',
    fontSize: 24,
    textAlign: 'center'
  },
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },

  listview: {
    flex: 1,
  },

  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    padding: 10,
  },

  image:{
    flexGrow: 1,
    width:'100%',
    height:200,
  },

  liContainer: {
    flex: 2,
  },

  liText: {
    color: '#333',
    fontSize: 16,
  },
});


export default Home
