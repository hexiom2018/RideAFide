import React from 'react';
import {
    View, ScrollView, Image, LayoutAnimation, Text, StyleSheet, TouchableOpacity,
    TextInput, StatusBar, Platform, Dimensions, AppState, Linking, WebView, Alert
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Constants, Location, BarCodeScanner, Permissions, Contacts } from 'expo';
import firebase from '../../../Config/Firebase'
import logo from '../../../assets/newlogo2/newlogo.png'
import { AsyncStorage } from 'react-native';
import UnderLine from "../../../assets/underline.png";
import { StackActions, NavigationActions } from 'react-navigation';
import alerticon from "../../../assets/alerticon.png"
import RegisterIcon from "../../../assets/RegisterIcon.png"
import Scanicon from "../../../assets/Scanicon.png"
import Verifyicon from "../../../assets/Verifyicon.png"


class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            welcomeText: [
                {
                    text: 'Sign up as a rideshare passenger with the RideAfide app.',
                    icon: RegisterIcon
                },
                {
                    text: 'Identify by scanning any rideshare drivers emblem.',
                    icon: Scanicon
                },
                {
                    text: 'Verify your drivers vehicle, license plate and profile picture.',
                    icon: Verifyicon
                },
                {
                    text: 'Notify your emergency contacts directly from the RideAfide app.',
                    icon: alerticon
                }
            ],
            splash: false
        };
    }
    static navigationOptions = {
        // title: 'Welcome',
        header: null
    };

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

    _storeData = async (user) => {
        try {
            const store = await AsyncStorage.setItem('user', user);
            return store
        } catch (error) {
            // Error saving data
            console.log(error, 'error')
        }
    };

    componentWillMount() {
        this._retrieveData('user').then((user) => {
            console.log(user, 'user here')
            const { navigate } = this.props.navigation
            if (user) {
                this._retrieveData('token').then((token) => {
                    console.log(token, 'token')
                    if (token) {
                        // navigate('Scan')
                        this._retrieveData('detailpg1').then((detail1) => {
                            this._retrieveData('detailpg2').then((detail2) => {
                                console.log(detail1, detail2, 'detail1 and detaol2')
                                if (detail1 === 'true' && detail2 === 'true') {
                                    const resetAction = StackActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'Scan' }),
                                        ]
                                    })
                                    this.props.navigation.dispatch(resetAction)
                                }
                                else if (detail1 === 'true' && detail2 === 'false') {
                                    const resetAction = StackActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'Emergency' }),
                                        ]
                                    })
                                    this.props.navigation.dispatch(resetAction)
                                }
                                // else if (detail1 === 'false' && detail2 === 'false') {
                                //     const resetAction = StackActions.reset({
                                //         index: 0,
                                //         actions: [
                                //             NavigationActions.navigate({ routeName: 'PersonalInfo' }),
                                //         ]
                                //     })
                                //     this.props.navigation.dispatch(resetAction)
                                // }
                                else {
                                    const resetAction = StackActions.reset({
                                        index: 0,
                                        actions: [
                                            NavigationActions.navigate({ routeName: 'Scan' }),
                                        ]
                                    })
                                    this.props.navigation.dispatch(resetAction)
                                }

                            })
                        })

                    } else {
                        // navigate('LogIn')
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'LogIn' }),
                            ]
                        })
                        this.props.navigation.dispatch(resetAction)
                    }
                })
            } else {
                this.setState({ splash: true })
                this._storeData('true').then((store) => {
                    console.log(store, 'store here')

                })
            }
        })
    }


    Details(items, key) {
        return (
            <View key={key} style={{ justifyContent: 'flex-start', flexDirection: 'row', paddingHorizontal: '2%' }}>
                <View style={{ width: '22%', alignSelf: 'center' ,justifyContent:'center'}}>
                    <Image
                        style={{ height: 40, width:40}}
                        source={items.icon}
                    />
                </View>
                <View style={{ alignSelf: 'flex-start', width: '78%', paddingRight: '5%' }}>
                    <Text style={{ fontSize: 18 }}>
                        {items.text}
                    </Text>
                </View>
            </View>
        )
    }

    render() {
        const { welcomeText, splash } = this.state
        return (
            <>
                {
                    splash &&
                    <View style={styles.main}>
                    {/* <ScrollView style={{flex:1}}>    */}
                        <View style={{ paddingVertical: '4%', alignItems: 'center' }}>
                            <Image
                                source={logo}
                            />
                        </View>
                        <View style={{ backgroundColor: '#1cbbb4', height: 7 }} />

                        <View style={{ paddingVertical: '3%', }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>
                                {'How to verify your ride?'}
                            </Text>
                        </View>
                       
                        <View style={{ justifyContent: 'center', flexGrow: 1 }}>
                            {
                                welcomeText &&
                                welcomeText.map((items, index) => {
                                    return (
                                        <View key={index} style={{ marginBottom: '7%' }}>
                                            {
                                                this.Details(items, index)
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View style={{ backgroundColor: '#1cbbb4', height: 7 }} />
                        <View style={{ paddingVertical: '3%', }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>
                            Identify - Verify - Notify
                            </Text>
                        </View>
                        <View style={{ backgroundColor: '#1cbbb4', height: 7 }} />
                        <View style={{ alignItems: 'center', flexGrow: 1, justifyContent: 'center', marginVertical: 10 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('LogIn')} activeOpacity={0.7} style={{ width: '70%', backgroundColor: '#77d8c5', borderColor: '#77d8c5', borderWidth: 1, paddingVertical: 2, borderRadius: 10 }}>
                                <View>
                                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                                        {'Proceed'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    {/* </ScrollView> */}
                    </View > 
                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        borderWidth: 1
        // justifyContent: 'space-around'
    },
});

export default Splash;