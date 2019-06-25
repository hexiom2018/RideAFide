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

    goback() {
        const { navigate } = this.props.navigation

        navigate('Scan')
    }

    Logout() {
        const { navigate } = this.props.navigation
        // this.removeItemValue()
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('userEmail')
        navigate('LogIn')
    }

    goback() {
        const { navigate } = this.props.navigation

        navigate('Scan')
    }

    _goToURLabout = () => {
        const url = "https://rideafide.com/about/"
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                alert('Don\'t know how to open URI: ' + url);
            }
        });
    } 
     _goToURLtermsuser = () => {
        const url = "https://rideafide.com/terms-of-user/"
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                alert('Don\'t know how to open URI: ' + url);
            }
        });
    }
    _goToURLsupport = () => {
        const url = "https://rideafide.com/support"
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                alert('Don\'t know how to open URI: ' + url);
            }
        });
    }




    render() {
        const { username, openSetting, password, loading } = this.state

        return (
            <View style={styles.main}>

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
                <TouchableOpacity activeOpacity={0.7} style={{ width: '95%', backgroundColor: '#807E81', borderColor: '#7ad6c5', borderWidth: 1, paddingVertical: 2, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 3 }}>
                    <View>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: '#77d8c5' }}>
                            {'Settings'}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.minDiv}>

                    <View style={{ justifyContent: 'flex-start' }}>
                    
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileDetails')}>
                            <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: "row", width: '100%' }}>
                                <View style={{  width: '50%',}}>

                                    <Text style={{ color: '#000000',   fontSize: 16}}>Profile Details</Text>
                                </View>
                                <View style={{  width: '50%', alignItems:'flex-end'}}>

                                    <Text style={{ color: '#6a6a6a', fontSize: 20,  paddingRight:4}}>></Text>
                                </View>
                            </View>
                          
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('EmergencyContacts')}>
                            <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: "row", width: '100%' }}>
                                <View style={{  width: '80%',}}>

                                    <Text style={{ color: '#000000',   fontSize: 16}}>Emergency Contacts</Text>
                                </View>
                                <View style={{  width: '20%', alignItems:'flex-end'}}>

                                    <Text style={{ color: '#000000', fontSize: 20,  paddingRight:4}}>></Text>
                                </View>
                            </View>
                            {/* <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, }}>
                            </View> */}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Setting')}>
                            <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: "row", width: '100%' }}>
                                <View style={{  width: '50%',}}>

                                    <Text style={{ color: '#000000',   fontSize: 16}}>Scan History</Text>
                                </View>
                                <View style={{  width: '50%', alignItems:'flex-end'}}>

                                    <Text style={{ color: '#000000', fontSize: 20,  paddingRight:4}}>></Text>
                                </View>
                            </View>
                            {/* <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, }}>
                            </View> */}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._goToURLabout}>
                            <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: "row", width: '100%' }}>
                                <View style={{  width: '50%',}}>

                                    <Text style={{ color: '#000000',   fontSize: 16}}>About Us</Text>
                                </View>
                                <View style={{  width: '50%', alignItems:'flex-end'}}>

                                    <Text style={{ color: '#000000', fontSize: 20,  paddingRight:4}}>></Text>
                                </View>
                            </View>
                            {/* <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, }}>
                            </View> */}
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={this._goToURLtermsuser}>
                            <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: "row", width: '100%' }}>
                                <View style={{  width: '90%',}}>

                                    <Text style={{ color: '#000000',   fontSize: 16}}>{`Terms & Conditions / Privacy Policy`}</Text>
                                </View>
                                <View style={{  width: '10%', alignItems:'flex-end'}}>

                                    <Text style={{ color: '#000000', fontSize: 20,  paddingRight:4}}>></Text>
                                </View>
                            </View>
                            {/* <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, }}>
                            </View> */}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdatePassword')}>
                            <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: "row", width: '100%' }}>
                                <View style={{  width: '50%',}}>

                                    <Text style={{ color: '#000000',   fontSize: 16}}>Change Password</Text>
                                </View>
                                <View style={{  width: '50%', alignItems:'flex-end'}}>

                                    <Text style={{ color: '#000000', fontSize: 20,  paddingRight:4}}>></Text>
                                </View>
                            </View>
                            {/* <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, }}>
                            </View> */}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this._goToURLsupport}>
                            <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: "row", width: '100%' }}>
                                <View style={{  width: '50%',}}>

                                    <Text style={{ color: '#000000',   fontSize: 16}}>Contact Us</Text>
                                </View>
                                <View style={{  width: '50%', alignItems:'flex-end'}}>

                                    <Text style={{ color: '#000000', fontSize: 20,  paddingRight:4}}>></Text>
                                </View>
                            </View>
                            {/* <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, }}>
                            </View> */}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Setting')}>
                            <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: "row", width: '100%' }}>
                                <View style={{  width: '50%',}}>

                                    <Text style={{ color: '#000000',   fontSize: 16}}>App Version</Text>
                                </View>
                                <View style={{  width: '50%', alignItems:'flex-end'}}>

                                    <Text style={{ color: '#000000', fontSize: 18,  paddingRight:4}}>1.0.1</Text>
                                </View>
                            </View>
                            {/* <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, }}>
                            </View> */}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.Logout()}>
                            <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: "row", width: '100%' }}>
                                <View style={{  width: '50%',}}>

                                    <Text style={{ color: '#000000',   fontSize: 16}}>Logout</Text>
                                </View>
                                <View style={{  width: '50%', alignItems:'flex-end'}}>

                                    <Text style={{ color: '#000000', fontSize: 20,  paddingRight:4}}>></Text>
                                </View>
                            </View>
                            {/* <View style={{ paddingVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1, }}>
                            </View> */}
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
        justifyContent: 'space-around',
        borderColor: '#807E81',
        borderWidth: 2,
    },
    minDiv: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#807E81',
        borderWidth: 1,
        margin: 1,
        paddingHorizontal: 1,
        backgroundColor: '#D9D9D9',
        marginBottom:4
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

