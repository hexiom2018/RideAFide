import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Button from '../../components/button/Button'
import tick from '../../../assets/email/tick-checked.png'
import Untick from '../../../assets/email/untick.png'
import mail from '../../../assets/settings.png'
import scan from '../../../assets/Scan.png'
import logo from '../../../assets/email/logo.png'

class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loading: false
        }
    }

    componentDidMount() {

    }

    _storeData = async (text, value) => {
        try {
            const store = await AsyncStorage.setItem(text, value);
            return store
        } catch (error) {
            // Error saving data
            console.log(error, 'error')
        }
    };

    LoginAction() {

        var count = 0
        const { username, password, } = this.state
        if (username && password) {
            this.setState({
                loading: true
            })


            let that = this
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                console.log(this.response, 'eeskdjbsak')

                if (this.status === 200) {
                    count = 1
                    var myres = this.response.split(',').pop().slice(7)
                    var token = myres.slice(0, myres.length - 2)

                    that._storeData('token', token).then((store) => {
                        console.log(store, 'stotre her')
                        that.props.navigation.navigate('Email')
                        that.setState({
                            loading: false
                        })
                    })
                }
                else if (this.status === 401 && !count) {
                    count = 1
                    alert('Invalid Email Or Password')
                }
                else if (!count && this.status === 500) {
                    count = 1
                    alert('Something went wrong')
                }
                if (this.status) {
                    that.setState({
                        loading: false
                    })
                }
            }
            xhttp.open("POST", "https://rideafide.com/wp-json/app/v2/auth/login", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(`username=${username}&password=${password}`);


        } else {
            alert('Please Enter Valid Email And Password')
        }

    }

    createAccount() {
        this.props.navigation.navigate('SignUp')
    }

    static navigationOptions = { header: null }
    render() {
        const { username, password, loading } = this.state
        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#3498db' }}>

                {/* <ScrollView style={{ flexGrow: 1 }} > */}
                {/* <KeyboardAvoidingView behavior={'padding'}> */}
                <View style={{ alignItems: "center", justifyContent: 'center', width: '100%' }} >
                    <View style={{ width: '90%' }} >
                        <Text style={styles.text}>Username</Text>
                    </View>
                    <View style={styles.container}>
                        <TextInput
                            value={username}
                            onChangeText={e => this.setState({ username: e })}
                            style={styles.input}
                        />
                    </View>
                    <View style={{ width: '90%' }}>
                        <Text style={styles.text}>Password</Text>
                    </View>
                    <View style={styles.container}>
                        <TextInput
                            value={password}
                            onChangeText={e => this.setState({ password: e })}
                            style={styles.input}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.button}>
                        {!loading && <Button
                            color={true}
                            border={true}
                            name={'Log In'}
                            background={true}
                            backgroundColor={'#77d8c5'}
                            buttonAction={() => this.LoginAction()}
                            textColor={'white'}
                        />}
                        {loading && <ActivityIndicator size="small" color="#00ff00" />}
                    </View>
                    <Text onPress={() => this.props.navigation.navigate('ForgetPassword')} style={styles.forgot}>Forgot Password?</Text>
                    <Text style={styles.create} onPress={() => this.createAccount()}>Create Account</Text>
                </View>
                {/* </KeyboardAvoidingView> */}
                {/* </ScrollView> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 4,
        width: '90%',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.51,
        shadowRadius: 4.16,
        elevation: 5,
        shadowColor: 'grey',
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: 'space-between'
    },
    input: {
        color: 'black',
        height: 50,
        width: '95%',
        fontSize: 18,
        paddingVertical: 10,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 15,
        opacity: 1,
        marginBottom: 10
    },
    text: {
        fontSize: 16,
        fontWeight: '500'
    },
    forgot: {
        fontSize: 12,
        fontWeight: '400',
        color: "white",
        textDecorationLine: 'underline'
    },
    create: {
        fontSize: 16,
        fontWeight: '500',
        color: "white",
        marginTop: 20,
        textDecorationLine: 'underline'
    }
});

function mapStateToProps(states) {
    return ({
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            Action,
            userAuth
        }, dispatch),
    })
}

export default LogIn;