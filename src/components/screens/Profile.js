import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import { logout } from '../../actions/firebase-action';
import { connect } from 'react-redux';
import {initUserData} from '../../actions/firebase-action';

class Profile extends Component {
    static navigationOptions = {
        title: 'Profile',
    };
    onPressLogout() {
        logout();
    }
    componentWillMount(){
        this.props.initUserData();
    }
    render() {
        const { user, isFetching } = this.props.UserReducer;
        return (
            <View style={styles.container}>
            <Text>{user.name}</Text>
                <Button
                    title='LOGOUT'
                    backgroundColor='#eb3b5a'
                    onPress={() => this.onPressLogout()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 7,
    }
});

function mapStateToProps(state) {
    return {
        UserReducer: state.UserReducer
    }
}

function mapDispatchToProps (dispatch){
    return{
      initUserData: () => dispatch(initUserData())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
