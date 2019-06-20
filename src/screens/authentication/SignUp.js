import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Button from '../../components/button/Button'

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
                        that.props.navigation.navigate('Scan')
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
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#3498db' }}>

                <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }} behavior={'padding'}>
                    <ScrollView style={{ flex: 1, marginTop: 24 }} >
                        <View style={{ alignItems: "center", justifyContent: 'center', width: '100%' }} >
                            <Text style={styles.heading}>Create Account</Text>
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
                            <View style={{ width: '90%' }} >
                                <Text style={styles.text}>Email</Text>
                            </View>
                            <View style={styles.container}>
                                <TextInput
                                    value={email}
                                    onChangeText={e => this.setState({ email: e })}
                                    style={styles.input}
                                />
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
                            {/* <View style={{ width: '90%', marginTop: 10, }}>
                                <Text onPress={() => this.setState({ select: false })} style={select ? { color: 'black', fontSize: 18, fontWeight: '300', paddingVertical: 8 } : { color: 'white', fontSize: 18, fontWeight: '400', borderColor: 'black', borderWidth: 1, paddingVertical: 8, paddingLeft: 4 }}>User</Text>
                            </View>
                            <View style={{ width: '90%', marginTop: 10, }}>
                                <Text onPress={() => this.setState({ select: true })} style={select ? { color: 'white', fontSize: 18, fontWeight: '400', borderColor: 'black', borderWidth: 1, paddingVertical: 8, paddingLeft: 4 } : { color: 'black', fontSize: 18, fontWeight: '300', paddingVertical: 8 }}>Delivery Boy</Text>
                            </View> */}
                            <View style={styles.button}>
                                {!loading &&
                                    <Button
                                        color={true}
                                        border={true}
                                        name={'Create Account'}
                                        background={true}
                                        buttonAction={() => this.create()}
                                        textColor={'white'}
                                    />}
                                {loading && <ActivityIndicator size="small" color="#00ff00" />}
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
    heading: {
        fontSize: 24,
        fontWeight: '600',
        color: "white",
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