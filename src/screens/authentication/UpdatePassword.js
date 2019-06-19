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


class UpdatePassword extends React.Component {
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
       
        this._retrieveData()
        
        
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

  
    

    render() {
        const { email,  NewPassword } = this.state

        return (
            <View style={styles.main}>
               
                <StatusBar hidden={true} />
                <View style={{ flexDirection: 'row', paddingVertical: '6%' }}>
                    <View style={{ width: '60%', paddingLeft: 15, height: 50, justifyContent: 'center' }}>
                        <Image
                            // style={{ width: 100, height: 100 }}
                            source={logo}
                        />
                    </View>
                    <View style={{ paddingHorizontal: '2%', height: 50, borderWidth: 1, borderColor: "#5dc5c0", flexDirection: 'column',alignItems:'center',}}>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Image
                                // style={{ width: '100%', height: '100%' }}
                                source={mail}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize:12,color:'#5dc5c0'}}>
                            Settings
                            </Text>

                    </View>
                    <View style={{paddingHorizontal: '2%', height: 50, marginRight: '5%', flexDirection: 'column',alignItems:'center' }}>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Image
                                // style={{ width: '100%', height: '100%' }}
                                source={scan}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize:12 }} >
                            Scan
                                                            </Text>
                    </View>
                </View>
                <View style={styles.minDiv}>
                    <View style={{
                        // borderWidth: 1,
                        // flex: 1,
                        height: '25%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={{ width: '80%', }}>

                        <Text style={{ textAlign: 'center', fontSize: 13, color: '#686868', fontWeight: '400',justifyContent:'center'}}>
                                {`Email:`}
                            </Text>
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
                    <View style={{
                        // borderWidth: 1,
                        // flex: 1,
                        height: '25%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={{ width: '80%',}}>

                        <Text style={{ textAlign: 'center', fontSize: 13, color: '#686868', fontWeight: 'bold',}}>
                                {`Password:`}
                            </Text>
                            <TextInput
                                keyboardType={'email-address'}
                                placeholder={'Enter Password here'}
                                placeholderTextColor={'#686868'}
                                onChangeText={(email) => this.setState({ NewPassword })}
                                value={NewPassword}
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
                    <View style={{ flex: 1, justifyContent: 'space-between', paddingBottom: '2%' }}>
                        <View style={{ alignItems: 'center' }}>
                            
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={this.Next} activeOpacity={0.7} style={{ width: '70%', backgroundColor: '#77d8c5', borderColor: '#7ad6c5', borderWidth: 1, paddingVertical: 2, borderRadius: 10 }}>
                                <View>
                                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                                        {'Update'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ paddingVertical: '3%', alignItems: 'center' }}>
                       
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
export default UpdatePassword;

