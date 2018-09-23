import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Divider } from 'react-native-elements'
import { logout } from '../../actions/firebase-action';
import { connect } from 'react-redux';
import { initUserData } from '../../actions/firebase-action';

class Profile extends Component {
    static navigationOptions = {
        title: 'Profile',
    };
    onPressLogout() {
        logout();
    }
    componentWillMount() {
        this.props.initUserData();
    }
    render() {
        const { user, isFetching } = this.props.UserReducer;
        return (
            <View style={styles.container}>
                <View style={styles.detailContainer}>
                    <Text style={styles.left}>Name </Text>
                    <Text style={styles.right}>{user.name}</Text>
                </View>
                <Divider style={{ backgroundColor: '#dcdde1', marginBottom: 10 }} />
                <View style={styles.detailContainer}>
                    <Text style={styles.left}>Phone number </Text>
                    <Text style={styles.right}>{user.phone}</Text>
                </View>
                <Divider style={{ backgroundColor: '#dcdde1', marginBottom: 10  }} />
                <View style={styles.detailContainer}>
                    <Text style={styles.left}>Email </Text>
                    <Text style={styles.right}>{user.email}</Text>
                </View>
                <Divider style={{ backgroundColor: '#dcdde1', marginBottom: 10  }} />
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
        marginVertical: 15,
        backgroundColor:'white',
        padding: 10,
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    left: {
        fontSize: 18,
        color: '#636e72',
    },
    right: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#636e72'
    },
});

function mapStateToProps(state) {
    return {
        UserReducer: state.UserReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initUserData: () => dispatch(initUserData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
