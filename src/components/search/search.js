'use strict';

import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements'

import {
  StyleSheet,
  View,
} from 'react-native';

class Search extends Component {
  static navigationOptions = {
    title: 'Search',
  };
  render() {
    return (
      <View>
        <SearchBar>
        </SearchBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default Search;
