import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

class InitialApp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../../images/logo.png')}
                        style={{ width: 250, height: 250 }}
                    />
                    <ActivityIndicator size={100} color="tomato" animating={true}/>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#353b48',
        height: '100%'
    }
});

export default InitialApp;
