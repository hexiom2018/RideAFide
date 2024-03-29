import React from 'react';
import {
    View, Platform, Dimensions, AppState, Linking, Image,
    Text, StyleSheet, ActivityIndicator, TouchableOpacity, StatusBar, Button,
    TextInput, KeyboardAvoidingView, ScrollView
} from 'react-native';
import { Header, Input, CheckBox } from 'react-native-elements';
import { Constants, Location, Permissions, Contacts, Notifications, IntentLauncherAndroid } from 'expo';
import Modal from 'react-native-modal'
import { AsyncStorage } from 'react-native';
import tick from '../../../assets/email/tick-checked.png'
import Untick from '../../../assets/email/untick.png'
import mail from '../../../assets/settings.png'
import scan from '../../../assets/Scan.png'
import logo from '../../../assets/email/logo.png'
import { StackActions, NavigationActions } from 'react-navigation';

class Email extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isLocationModalVisible: false,
            appState: AppState.currentState,
            loading: false
        };
    }

    //naviagtion default header null
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        console.log("hello")
        this._retrieveData()
        // this._getLocationAsync()
        if (!Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }

    }


    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('UserEmail');
            if (value !== null) {
                // We have data!!
                console.log(value);
                // this.props.navigation.navigate('Scan', { value })
                this.setState({
                    email: value
                })
            }
        } catch (error) {
            // Error retrieving data
        }
    };


    _goToURL = () => {
        const url = "https://rideafide.com/"
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                alert('Don\'t know how to open URI: ' + url);
            }
        });
    }
    PrivacyPolicy = () => {
        const url = "https://rideafide.com/"
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                alert('Don\'t know how to open URI: ' + url);
            }
        });
    }
    Next = () => {
        const { email, checked } = this.state
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email != null) {
            if (!checked) {
                alert('Please check Privacy Policy')
            } else {
                if (reg.test(this.state.email) === true) {
                    this._storeData(email)
                    // console.log("emil")
                    // alert("");
                }
                else {
                    alert("Enter correct email ");
                }
            }
        } else {
            alert("Enter the email")
        }
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

    _getLocationAsync = async () => {
        const { me } = this.props;

        try {
            // console.log( "function run ")
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            let location = await Location.getCurrentPositionAsync({});

            if (status !== 'granted') {
                this.setState({
                    errorMessage: 'Permission to access location was denied'
                });
                console.log("permission not granted ")
            }
            // console.log("permission  granted ")
            const obj = {
                direction: { lat: location.coords.latitude, lng: location.coords.longitude },
                date: Date.now(),
            }

            this.setState({
                currentLocation: { lat: location.coords.latitude, lng: location.coords.longitude },
                get: true,
            })
            // console.log("location===>>>>", obj)
        } catch (error) {
            let statuss = Location.getProviderStatusAsync()
            if (!statuss.LocationServicesEnabled) {
                this.setState({ isLocationModalVisible: true })
            }
        }

    };
    openSetting = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:')
        } else {
            IntentLauncherAndroid.startActivityAsync(
                IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
            )
        }
        this.setState({
            openSetting: false
        })
    }
    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
            this._getLocationAsync();
        }
        this.setState({ appState: nextAppState });
    }

    componentWillMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    LoginAction() {

        var count = 0
        const { username, password, } = this.state
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (username && password) {
            this.setState({
                loading: true
            })
            if (reg.test(username) === true) {

                let that = this

                let request = {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/x-www-form-urlencoded; charset=UTF=8"
                    },
                    body: `username=${username}&password=${password}`,
                };
                fetch('https://rideafide.com/wp-json/app/v2/auth/login', request)
                    .then(response => {
                        console.log(response, 'ye dhekho response');
                        if (response.status === 401) {
                            this.setState({
                                loading: false
                            })
                            alert('Invalid email or password')
                        }
                        response.json().then(function (data) {
                            console.log(data.jwt, 'ye dhekho token');
                            var token = data.jwt
                            that._storeData('email', username).then(() => {

                            })
                            that._storeData('token', token).then((store) => {
                                const resetAction = StackActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({ routeName: 'Scan' }),
                                    ]
                                })
                                that.props.navigation.dispatch(resetAction)
                                that.props.navigation.navigate('Scan')

                                that.setState({
                                    loading: false
                                })
                            })

                        });
                    })
                    .catch(error => {
                        console.error(error, 'ye error ');

                    })


                //     if (this.status === 200) {
                //         count = 1
                //         var myres = this.response.split(',').pop().slice(7)
                //         var token = myres.slice(0, myres.length - 2)

                //         that._storeData('email', username).then(() => {

                //         })
                //         that._storeData('token', token).then((store) => {
                //             const resetAction = StackActions.reset({
                //                 index: 0,
                //                 actions: [
                //                     NavigationActions.navigate({ routeName: 'Scan' }),
                //                 ]
                //             })
                //             that.props.navigation.dispatch(resetAction)
                //             // that.props.navigation.navigate('Scan')

                //             // that.setState({
                //             //     loading: false
                //             // })
                //         })
                //     }
                //     else if (this.status === 401 && !count) {
                //         count = 1
                //         alert('Invalid Email Or Password')
                //         that.setState({
                //             loading: false
                //         })
                //     }
                //     else if (!count && this.status === 500) {
                //         count = 1
                //         alert('Something went wrong')
                //         that.setState({
                //             loading: false
                //         })
                //     }
                //     // if (this.status) {
                //     //     that.setState({
                //     //         loading: false
                //     //     })
                //     // }
                // 

            }
            else {
                alert("Enter correct email ");
                this.setState({
                    loading: false
                })
            }
        } else {
            alert('Please Enter Valid Email And Password')
            this.setState({
                loading: false
            })
        }

    }

    render() {
        const { username, openSetting, password, loading } = this.state
        const screen = Dimensions.get('screen');
        return (
            <View style={styles.main}>
                <Modal
                    onModalHide={openSetting ? this.openSetting : undefined}
                    isVisible={this.state.isLocationModalVisible}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>

                        <Button title='Enabel Location Services' onPress={() => this.setState({
                            isLocationModalVisible: false, openSetting: true
                        })}>

                        </Button>
                    </View>
                </Modal>
                {/* <StatusBar hidden={true} /> */}
                <View style={styles.statusBar} />
                <View style={{ flexDirection: 'row', paddingVertical: '10%', justifyContent: 'center' }}>
                    <View style={{ width: '60%', height: 36, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={logo}
                        />
                    </View>

                </View>
                <View style={{ backgroundColor: '#1cbbb4', height: 7 }} />
                <KeyboardAvoidingView behavior={'padding'} style={{ height: screen.height }}>
                    <ScrollView scrollEnabled={false}>


                        <View style={styles.minDiv}>


                            <View style={{
                                height: '20%',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                paddingBottom: 8,
                                // borderWidth:1
                            }}>
                                <View style={{ width: '80%' }}>
                                    <TextInput
                                        keyboardType={'email-address'}
                                        placeholder={'Enter Email '}
                                        placeholderTextColor={'#686868'}
                                        onChangeText={(username) => this.setState({ username })}
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

                            <View style={{
                                height: '20%',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                paddingBottom: 20,
                                // borderWidth:1
                            }}>
                                <View style={{ width: '80%' }}>
                                    <TextInput
                                        keyboardType={'ascii-capable'}
                                        secureTextEntry={true}
                                        placeholder={'Enter password '}
                                        placeholderTextColor={'#686868'}
                                        onChangeText={(password) => this.setState({ password })}
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


                            <View style={{ flex: 1, justifyContent: 'space-between', paddingBottom: '5%', paddingTop: '8%' }}>

                                <View style={{ alignItems: 'center' }}>
                                    {
                                        !loading &&
                                        <TouchableOpacity onPress={() => this.LoginAction()} activeOpacity={0.7} style={{ width: '70%', backgroundColor: '#77d8c5', borderColor: '#7ad6c5', borderWidth: 1, paddingVertical: 2, borderRadius: 10 }}>
                                            <View>
                                                <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                                                    {'Login'}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                    {loading && <ActivityIndicator size="large" color="#00ff00" />}
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPassword')}>
                                        <View style={{ paddingVertical: 10 }}>
                                            <Text style={{ color: '#6a6a6a', textDecorationLine: 'underline' }}>Forgot Password?</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ alignItems: 'center', paddingVertical: 15 }}>
                                        <Text style={{ fontSize: 20, color: 'grey' }}>
                                            {'OR'}
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')} activeOpacity={0.7} style={{ width: '70%', backgroundColor: '#77d8c5', borderColor: '#7ad6c5', borderWidth: 1, paddingVertical: 2, borderRadius: 10 }}>
                                        <View>
                                            <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                                                {'Create Account'}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}
//styleSheet
const styles = StyleSheet.create({
    main: {
        flex: 1,
        // justifyContent: 'space-around'
    },
    minDiv: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: '16%'
    },
    Email: {
        // borderWidth: 1,
        height: "30%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    headings: {
        paddingHorizontal: 10,
        justifyContent: 'center',
    }, InputFields: {
        minHeight: 30,
        maxHeight: 100,
        borderBottomColor: '#5DBCD2',
        borderBottomWidth: 1,
        fontSize: 18,
        color: "black",
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center"
        // flex:1
    },
    HeadingText: {
        fontSize: 15,
        // fontWeight: 'bold',
        color: "#5DBCD2",
        borderBottomColor: '#5DBCD2'
    },
    InputDiv: {
        margin: 5,
        padding: 5,
        // borderWidth: 1,
        width: '100%',
        height: '40%'
    },
    Button: {
        // borderWidth: 1,
        height: "70%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

    },
    textDivBottom: {
        height: "70%",
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    ButtonDiv: {
        height: "30%",
        // borderWidth: 1,
        width: "96%",
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    hyperLink: {
        fontSize: 22,
        fontWeight: 'bold',
        color: "#686868",
        marginTop: "6%"

    }, hyperLink2: {
        fontSize: 14,
        // fontWeight: 'bold',
        color: "#77d8c5",
        // borderWidth:1,
        alignItems: 'center'
        , justifyContent: 'center'
        // marginTop: "6%"

    },
    detailText: {
        fontSize: 20,
        // fontWeight: 'bold',
        color: "#8B8B8B",
        margin: 0
    },
    buttondiv4: {
        backgroundColor: '#0274BD',
        width: '100%',
        height: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
        borderRadius: 6
    },
    buttonTittle: {
        fontSize: 16,
        color: 'white'
    },
    statusBar: {
        opacity: 0.2,
        height: Constants.statusBarHeight,
    },
})
export default Email;

