import React from 'react';
import {
    View, ScrollView, Image, LayoutAnimation, Text, StyleSheet, TouchableOpacity,
    TextInput, StatusBar, Platform, Dimensions, AppState, Linking, WebView, Alert
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Constants, Location, BarCodeScanner, Permissions, Contacts } from 'expo';
import firebase from '../../../Config/Firebase'
import logo from '../../../assets/email/logo.png'
import { AsyncStorage } from 'react-native';



class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            welcomeText: [
                {
                    text: 'Click on the Proceed button to go to next page'
                },
                {
                    text: 'Enter your email and click on the save button'
                },
                {
                    text: 'Scan the QR code and record a video maximum one minute'
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
                navigate('Email')
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
                        <View style={{ paddingVertical: '7%' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>
                                {'How to verify your ride'}
                            </Text>
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
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Email')} activeOpacity={0.7} style={{ width: '70%', backgroundColor: '#77d8c5', borderColor: '#77d8c5', borderWidth: 1, paddingVertical: 2, borderRadius: 10 }}>
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