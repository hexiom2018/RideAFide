import React from 'react';
import { StyleSheet, Text, StatusBar, View, TextInput, ScrollView, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import logo from '../../../assets/email/logo.png'
import tick from '../../../assets/green-tick1.png'
import checkBox from '../../../assets/Shape 2.png'
import signing from '../../../assets/signing.png'

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            loading: false,
            count: 0,
            ticked: false
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
        const { email, password, username, ticked } = this.state


        if (username.length < 3) {
            alert('username must be more than 3 characters')
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            alert('Invalid Email')
        }
        else if (password.length < 4) {
            alert('Weak Password')
        }
        else if (!ticked) {
            alert('Please check the terms and privacy policy')
        }
        else {
            this.setState({
                loading: true,
            })
            const that = this
            let request = {
                method: "POST",
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded; charset=UTF=8"
                },
                body: `username=${username}&password=${password}&email=${email}`
            };
            fetch('https://rideafide.com/wp-json/app/v2/auth/register', request)
                .then(response => {
                    response.json().then(function (data) {
                        console.log(data, 'ye dhekho data');
                        var token = data.jwt
                        that._storeData('detailpg1', 'false').then(() => {

                        })
                        that._storeData('email', email).then(() => {

                        })
                        that._storeData('detailpg2', 'false').then(() => {

                        })
                        that._storeData('token', token).then(() => {
                            that.props.navigation.navigate('PersonalInfo')
                            that.setState({
                                loading: false
                            })
                        })
                    });

                })
                .catch(error => {
                    console.error(error.data.status, 'ye error ');
                })

        }
    }

    static navigationOptions = { header: null }

    render() {
        const { email, password, username, LastName, select, ticked, loading } = this.state
        return (
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <View style={{ flexDirection: 'row', paddingVertical: '10%', justifyContent: 'center' }}>
                    <View style={{ width: '60%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            // style={{ width: 100, height: 100 }}
                            source={logo}
                        />
                    </View>
                </View>
                <View style={{ backgroundColor: '#1cbbb4', height: 7 }} />
                <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }} behavior={'padding'}>
                    <ScrollView style={{ flex: 1, marginTop: '5%' }} >
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
                                            paddingVertical: 7,
                                            borderRadius: 7,
                                            fontStyle: 'italic'
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={styles.container}>
                                <View style={{ width: '100%' }}>
                                    <TextInput
                                        keyboardType={'email-address'}
                                        placeholder={'Enter Email Address'}
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
                                            paddingVertical: 7,
                                            borderRadius: 7,
                                            fontStyle: 'italic'
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={styles.container}>

                                <View style={{ width: '100%' }}>
                                    <TextInput
                                        keyboardType={'ascii-capable'}
                                        secureTextEntry={true}
                                        placeholder={'Enter Password'}
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
                                            paddingVertical: 7,
                                            borderRadius: 7,
                                            fontStyle: 'italic'
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', color: '', width: '100%', paddingVertical: '5%', paddingHorizontal: '11%' }}>
                                <View style={{ width: '20%', justifyContent: 'center' }}>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.setState({ ticked: !ticked })}>
                                        <View style={{ width: 21, height: 22, position: 'relative', alignSelf: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#77d8c5' }}>
                                            <View style={{ alignSelf: 'center', position: 'absolute', bottom: '25%', left: '25%' }}>
                                                {
                                                    ticked ?
                                                        <Image
                                                            width={{ width: '100%', height: '100%' }}
                                                            source={tick}
                                                        />
                                                        :
                                                        null
                                                }
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '80%' }}>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({ ticked: !ticked })}>
                                        <Text style={{ color: '#787878', fontSize: 14, fontWeight: '500' }}>
                                            {'By signing up you agree that you are 18 years or older and agree to the Terms of Use and Privacy Policy.'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', width: '90%', marginTop: 7 }}>
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
                                <View style={{ alignItems: 'center', paddingVertical: 15 }}>
                                    <Text style={{ fontSize: 20, color: 'grey' }}>
                                        {'OR'}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('LogIn')} activeOpacity={0.7} style={{ width: '90%', backgroundColor: '#77d8c5', borderColor: '#7ad6c5', borderWidth: 1, paddingVertical: 2, borderRadius: 10 ,marginBottom:20}}>
                                    <View>
                                        <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                                            {'Login'}
                                        </Text>
                                    </View>
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
        marginTop: 7,
        marginBottom: 10,
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
        // marginBottom: 10
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