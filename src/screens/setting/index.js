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
import mail from '../../../assets/settings.png'
import scan from '../../../assets/Scan.png'
import logo from '../../../assets/email/logo.png'


class Setting extends React.Component {
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
                        that.props.navigation.navigate('Scan')
                        that.setState({
                            loading: false
                        })
                        that._storeData('email', email).then(() => {

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
    goback() {
        const { navigate } = this.props.navigation

        navigate('Scan')
    }
    render() {
        const { username, openSetting, password, loading } = this.state

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
                <View style={{ flexDirection: 'row', paddingVertical: '6%', justifyContent: 'center' }}>
                    <View style={{ width: '60%', paddingLeft: 15, height: 50, justifyContent: 'center' }}>
                        <Image
                            // style={{ width: 100, height: 100 }}
                            source={logo}
                        />
                    </View>
                    <View style={{ paddingHorizontal: '2%', height: 50, borderWidth: 1, borderColor: "#5dc5c0", flexDirection: 'column', alignItems: 'center', }}>
                        <TouchableOpacity activeOpacity={0.7} >
                            <Image
                                // style={{ width: '100%', height: '100%' }}
                                source={mail}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 12, color: '#5dc5c0' }}>
                            {'Settings'}
                        </Text>

                    </View>
                    <View style={{ paddingHorizontal: '2%', height: 50, marginRight: '5%', flexDirection: 'column', alignItems: 'center' }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.goback()}>
                            <Image
                                // style={{ width: '100%', height: '100%' }}
                                source={scan}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 12 }} >
                            {'Scan'}
                        </Text>
                    </View>
                </View>
                <View style={styles.minDiv}>

                    <View style={{ justifyContent:'flex-start' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdatePassword')}>
                            <View style={{ paddingVertical: 10, borderBottomColor:'black',borderBottomWidth:1 }}>
                                <Text style={{ color: '#6a6a6a', textDecorationLine: 'underline' }}>Update Password?</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('LogIn')}>
                            <View style={{ paddingVertical: 10 , borderBottomColor:'black',borderBottomWidth:1 }}>
                                <Text style={{ color: '#6a6a6a', textDecorationLine: 'underline' }}>Logout</Text>
                            </View>
                        </TouchableOpacity>
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
    }
})
export default Setting;

