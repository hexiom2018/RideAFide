import React from 'react';
import {
    View, Platform, Dimensions, AppState, Linking, Image,
    Text, StyleSheet, ActivityIndicator, TouchableOpacity, StatusBar, Button,
    TextInput, KeyboardAvoidingView
} from 'react-native';
import { Header, Input, CheckBox } from 'react-native-elements';
import { Constants, Location, Permissions, Contacts, Notifications, IntentLauncherAndroid } from 'expo';
import Modal from 'react-native-modal'
import { AsyncStorage } from 'react-native';
import tick from '../../../assets/email/tick-checked.png'
import Untick from '../../../assets/email/untick.png'
import mail from '../../../assets/email/mail-selected.png'
import scan from '../../../assets/email/scan.png'
import logo from '../../../assets/email/logo.png'


class Email extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isLocationModalVisible: false,
            appState: AppState.currentState
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

    _storeData = async (email) => {
        try {
            await AsyncStorage.setItem('UserEmail', email);
            // alert('sucess')
            // console.log("function run ")

            this.props.navigation.navigate('Scan', { email })

        } catch (error) {
            // Error saving data
            alert(error)
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

    render() {
        const { email, openSetting, checked } = this.state

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
                <StatusBar hidden={true} />
                <View style={{ flexDirection: 'row', paddingVertical: '6%' }}>
                    <View style={{ width: '62%', paddingLeft: 15, height: 50, justifyContent: 'center' }}>
                        <Image
                            // style={{ width: 100, height: 100 }}
                            source={logo}
                        />
                    </View>
                    <View style={{ paddingHorizontal: '5%', height: 50 }}>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Image
                                // style={{ width: '100%', height: '100%' }}
                                source={mail}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingRight: '5%', height: 50 }}>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Image
                                // style={{ width: '100%', height: '100%' }}
                                source={scan}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.minDiv}>
                    <View style={{
                        // borderWidth: 1,
                        // flex: 1,
                        height: '25%',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}>
                        <View style={{ width: '80%' }}>
                            <TextInput
                                keyboardType={'email-address'}
                                placeholder={'Enter email here'}
                                placeholderTextColor={'#686868'}
                                onChangeText={(email) => this.setState({ email })}
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
                    <View>
                        <View style={{ paddingVertical: '6%', paddingHorizontal: '10%' }}>
                            <Text style={{ textAlign: 'center', fontSize: 17, color: '#686868', fontWeight: '400' }}>
                                {`Please enter the email that you signed up with at www.rideafide.com, if you dont't have a profile, please create one for passengers by visiting out website:`}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'space-between', paddingBottom: '2%' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.hyperLink} onPress={this._goToURL}>
                                {'www.rideafide.com'}
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={this.Next} activeOpacity={0.7} style={{ width: '70%', backgroundColor: '#77d8c5', borderColor: '#7ad6c5', borderWidth: 1, paddingVertical: 2, borderRadius: 10 }}>
                                <View>
                                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                                        {'SAVE'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ paddingVertical: '3%', alignItems: 'center' }}>
                        <View>
                            <CheckBox
                                title='Privacy Policy'
                                checked={checked}
                                checkedIcon={<Image source={tick} style={{ width: 20, height: 20 }} />}
                                uncheckedIcon={<Image source={Untick} style={{ width: 20, height: 20 }} />}
                                onPress={() => this.setState({ checked: !checked })}
                                containerStyle={{ backgroundColor: 'white', borderColor: 'white' }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
//styleSheet
const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'space-around'
    },
    minDiv: {
        flex: 1,
        flexDirection: 'column',
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

    }, detailText: {
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
    }
})
export default Email;

