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

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            welcomeText: [
                {
                    text: 'Identify by scanning any rideshare drivers RideAfide emblem.'
                },
                {
                    text: 'Verify your drivers vehicle, license plate & picture.'
                },
                {
                    text: 'Notify your emergency contact through the app if you feel threatened or uncomfortable.'
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
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Scan' }),
                            ]
                        })
                        this.props.navigation.dispatch(resetAction)
            
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


    Details(text, key) {
        return (
            <View key={key} style={{ justifyContent: 'flex-start', flexDirection: 'row', paddingHorizontal: '2%' }}>
                <View style={{ width: '20%', alignSelf: 'flex-start' }}>
                    <Icon
                        size={40}
                        name={'chevron-right'}
                    />
                </View>
                <View style={{ alignSelf: 'flex-start', width: '80%', paddingRight: '5%' }}>
                    <Text style={{ fontSize: 18 }}>
                        {text}
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
                        <View style={{ paddingVertical: '4%', alignItems: 'center' }}>
                            <Image
                                source={logo}
                            />
                        </View>
                        <View style={{ paddingVertical: '3%', }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>
                                {'How to verify your ride?'}
                            </Text>
                        </View>
                        <View style={{ height: 2 }}>
                            <Image
                                style={{ height: 7, width: '100%' }}
                                source={UnderLine}
                            />
                        </View>
                        <View style={{ justifyContent: 'center', flexGrow: 1 }}>
                            {
                                welcomeText &&
                                welcomeText.map((items, index) => {
                                    return (
                                        <View key={index} style={{ marginBottom: '7%' }}>
                                            {
                                                this.Details(items.text, index)
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View style={{ alignItems: 'center', flexGrow: 1, justifyContent: 'center', marginVertical: 10 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('LogIn')} activeOpacity={0.7} style={{ width: '70%', backgroundColor: '#77d8c5', borderColor: '#77d8c5', borderWidth: 1, paddingVertical: 2, borderRadius: 10 }}>
                                <View>
                                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                                        {'Proceed'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
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