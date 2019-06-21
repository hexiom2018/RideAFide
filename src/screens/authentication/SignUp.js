import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Button from '../../components/button/Button'
import tick from '../../../assets/email/tick-checked.png'
import Untick from '../../../assets/email/untick.png'
import mail from '../../../assets/settings.png'
import scan from '../../../assets/Scan.png'
import logo from '../../../assets/email/logo.png'
class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            loading: false,
            count: 0
        }
    }

    _retrieveData = async (getData) => {
        try {
            const value = await AsyncStorage.getItem(getData);
            if (value !== null) {
                // We have data!!
                return value
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    _storeData = async (text, value) => {
        try {
            const store = await AsyncStorage.setItem(text, value);
            return store
        } catch (error) {
            // Error saving data
            console.log(error, 'error')
        }
    };

    create() {
        const { email, password, username } = this.state


        if (username.length < 3) {
            alert('username must be more than 3 characters')
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            alert('Invalid Email')
        }
        else if (password.length < 4) {
            alert('Weak Password')
        }
        else {
            this.setState({
                loading: true,
            })
            var count = 0
            const that = this
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {

                if (this.status === 200 && !count) {
                    count = 1
                    console.log(this.response, 'this response')
                    var myres = this.response.split(',')[0].slice(9)
                    var token = myres.slice(0, myres.length - 1)
                    console.log(token, 'token')
                    // console.log(response, 'response')
                    that._storeData('token', token).then(() => {
                        that.props.navigation.navigate('LogIn')
                        that.setState({
                            loading: false
                        })
                    })
                    that._storeData('email', email).then(() => {

                    })
                }

                else if (this.status === 401 && !count) {
                    count = 1
                    Alert.alert(
                        'Message',
                        'User already exists',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                    )
                    that.setState({ loading: false })
                }
                else if (!count && this.status === 500) {
                    count = 1
                    Alert.alert(
                        'Message',
                        'Something went wrong, Please try again later',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                    )
                    that.setState({ loading: false })
                }
            }
            xhttp.open("POST", "https://rideafide.com/wp-json/app/v2/auth/register", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(`username=${username}&password=${password}&email=${email}`);
        }
    }

    static navigationOptions = { header: null }

    render() {
        const { email, password, username, LastName, select, address, loading } = this.state
        return (
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <View style={{ flexDirection: 'row', paddingVertical: '6%',justifyContent: 'center' }}>
                    <View style={{ width: '60%', paddingLeft: 15, height: 50, justifyContent: 'center' }}>
                        <Image
                            // style={{ width: 100, height: 100 }}
                            source={logo}
                        />
                    </View>
                    {/* <View style={{ paddingHorizontal: '2%', height: 50, borderWidth: 1, borderColor: "#5dc5c0", flexDirection: 'column', alignItems: 'center', }}>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Image
                                // style={{ width: '100%', height: '100%' }}
                                source={mail}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 12, color: '#5dc5c0' }}>
                            {'Settings'}
                        </Text>

                    </View> */}
                    {/* <View style={{ paddingHorizontal: '2%', height: 50, marginRight: '5%', flexDirection: 'column', alignItems: 'center' }}>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Image
                                // style={{ width: '100%', height: '100%' }}
                                source={scan}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 12 }} >
                            {'Scan'}
                        </Text>
                    </View> */}
                </View>
                <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }} behavior={'padding'}>
                    <ScrollView style={{ flex: 1, marginTop: 24 }} >
                        <View style={{ alignItems: "center", justifyContent: 'center', width: '100%' }} >
                            <Text style={styles.heading}>Create Account</Text>
                            {/* <View style={{ width: '90%' }} >
                                <Text style={styles.text}>Username</Text>
                            </View> */}
                            <View style={styles.container}>
                                {/* <TextInput
                                    value={username}
                                    onChangeText={e => this.setState({ username: e })}
                                    style={styles.input}
                                /> */}
                                 <View style={{ width: '100%' }}>
                                    <TextInput
                                        keyboardType={'email-address'}
                                        placeholder={'Enter User Name'}
                                        placeholderTextColor={'#686868'}
                                        onChangeText={e => this.setState({ username: e })}
                                        value={username}
                                        textContentType={'emailAddress'}
                                        style={{
                                            borderWidth: 1,
                                            color: '#6a6a6a',
                                            borderColor: '#77d8c5',
                                            textAlign: 'center',
                                            paddingHorizontal: 10,
                                            paddingVertical: 10,
                                            borderRadius: 7,
                                            fontStyle: 'italic'
                                        }}
                                    />
                                </View>
                            </View>
                            {/* <View style={{ width: '90%' }} >
                                <Text style={styles.text}>Last Name</Text>
                            </View>
                            <View style={styles.container}>
                                <TextInput
                                    value={LastName}
                                    onChangeText={e => this.setState({ LastName: e })}
                                    style={styles.input}
                                />
                            </View> */}
                            {/* <View style={{ width: '90%' }} >
                                <Text style={styles.text}>Email</Text>
                            </View> */}
                            <View style={styles.container}>
                                {/* <TextInput
                                    value={email}
                                    onChangeText={e => this.setState({ email: e })}
                                    style={styles.input}
                                /> */}
                                <View style={{ width: '100%' }}>
                                    <TextInput
                                        keyboardType={'email-address'}
                                        placeholder={'Enter email here'}
                                        placeholderTextColor={'#686868'}
                                        onChangeText={e => this.setState({ email: e })}
                                        value={email}
                                        textContentType={'emailAddress'}
                                        style={{
                                            borderWidth: 1,
                                            color: '#6a6a6a',
                                            borderColor: '#77d8c5',
                                            textAlign: 'center',
                                            paddingHorizontal: 10,
                                            paddingVertical: 10,
                                            borderRadius: 7,
                                            fontStyle: 'italic'
                                        }}
                                    />
                                </View>
                            </View>
                            {/* <View style={{ width: '90%' }} >
                                <Text style={styles.text}>Address</Text>
                            </View>
                            <View style={styles.container}>
                                <TextInput
                                    value={address}
                                    onChangeText={e => this.setState({ address: e })}
                                    style={styles.input}
                                />
                            </View> */}
                            {/* <View style={{ width: '90%' }}>
                                <Text style={styles.text}>Password</Text>
                            </View> */}
                            <View style={styles.container}>
                                {/* <TextInput
                                    value={password}
                                    onChangeText={e => this.setState({ password: e })}
                                    style={styles.input}
                                    secureTextEntry={true}
                                /> */}

                                <View style={{ width: '100%' }}>
                                    <TextInput
                                        keyboardType={'ascii-capable'}
                                        secureTextEntry={true}
                                        placeholder={'Enter password here'}
                                        placeholderTextColor={'#686868'}
                                        onChangeText={e => this.setState({ password: e })}
                                        value={password}
                                        textContentType={'password'}
                                        style={{
                                            borderWidth: 1,
                                            color: '#6a6a6a',
                                            borderColor: '#77d8c5',
                                            textAlign: 'center',
                                            paddingHorizontal: 10,
                                            paddingVertical: 10,
                                            borderRadius: 7,
                                            fontStyle: 'italic'
                                        }}
                                    />
                                </View>
                            </View>

                            <View style={{ alignItems: 'center', width: '90%' }}>
                                <TouchableOpacity onPress={() => this.create()} activeOpacity={0.7} style={{ width: '90%', backgroundColor: '#77d8c5', borderColor: '#7ad6c5', borderWidth: 1, paddingVertical: 2, borderRadius: 10 }}>
                                    {
                                        !loading &&
                                        <View>
                                            <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                                                {'Create Account'}
                                            </Text>
                                        </View>
                                    }
                                    {loading && <ActivityIndicator size="small" color="#00ff00" />}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        // borderRadius: 4,
        width: '90%',
        // shadowOffset: {
        //     width: 3,
        //     height: 3,
        // },
        // shadowOpacity: 0.51,
        // shadowRadius: 4.16,
        // elevation: 5,
        // shadowColor: 'grey',
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
    heading: {
        fontSize: 24,
        fontWeight: '600',
        // color: "#77d8c5",
        paddingVertical: 20
    },
    create: {
        fontSize: 16,
        fontWeight: '500',
        color: "white",
        marginTop: 20,
        textDecorationLine: 'underline'
    }
});



export default SignUp;