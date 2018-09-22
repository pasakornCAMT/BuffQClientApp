import React, { Component } from 'react';
import { View, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { FormLabel, FormInput, Button, Text } from 'react-native-elements'
import { register, login } from '../../actions/firebase-action';
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            email: '',
            password: '',
            isPressRegis: false,
            regisEmail: '',
            regisPassword: '',
            confirmPassword: '',
            name: '',
            phone: '',
        })
    }
    onPressRegister(user) {
        register(user);
    }
    onPressLogin(email, password){ 
        login(email, password)
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={require('../../../images/logo.png')}
                            style={{ width: 250, height: 250 }}
                        />
                    </View>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        underlineColorAndroid="#ccc"
                        onChangeText={email => this.setState({ email: email })}
                    />
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        underlineColorAndroid="#ccc"
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password: password })}
                    />
                    <Button
                        title='LOGIN'
                        backgroundColor='tomato'
                        onPress={()=>this.onPressLogin(this.state.email, this.state.password)}
                    />
                    <Button
                        title='RESGISTER'
                        color='tomato'
                        backgroundColor='tomato'
                        outline={true}
                        onPress={() => this.setState({ isPressRegis: !this.state.isPressRegis })}
                    />
                    {
                        this.state.isPressRegis ? (
                            <View style={{flex:1, justifyContent: 'center'}}>
                                <Text h1 style={{textAlign: 'center'}}>Register</Text>
                                <FormLabel>Email</FormLabel>
                                <FormInput
                                    underlineColorAndroid="#ccc"
                                    onChangeText={email => this.setState({ regisEmail: email })}
                                />
                                <FormLabel>Password</FormLabel>
                                <FormInput
                                    underlineColorAndroid="#ccc"
                                    secureTextEntry={true}
                                    onChangeText={password => this.setState({ regisPassword: password })}
                                />
                                <FormLabel>Confirm Password</FormLabel>
                                <FormInput
                                    underlineColorAndroid="#ccc"
                                    secureTextEntry={true}
                                    onChangeText={password => this.setState({ confirmPassword: password })}
                                />
                                <FormLabel>Name</FormLabel>
                                <FormInput
                                    underlineColorAndroid="#ccc"
                                    onChangeText={name => this.setState({ name: name })}
                                />
                                <FormLabel>Phone</FormLabel>
                                <FormInput
                                    underlineColorAndroid="#ccc"
                                    onChangeText={phone => this.setState({ phone: phone })}
                                    keyboardType="numeric"
                                />
                                <Button
                                    title='SUBMIT'
                                    color='tomato'
                                    backgroundColor='tomato' 
                                    outline={true}
                                    onPress={() => {
                                        let user = {
                                            email: this.state.regisEmail,
                                            password: this.state.regisPassword,
                                            name: this.state.name,
                                            phone: this.state.phone,
                                        }
                                        this.onPressRegister(user)
                                        this.setState({
                                            isPressRegis: false,
                                            regisEmail: '',
                                            regisPassword: '',
                                            confirmPassword: '',
                                            name: '',
                                            phone: '',
                                        })
                                    }}
                                />
                            </View>
                        ) : null
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingBottom: 40,
    },
});

export default Login