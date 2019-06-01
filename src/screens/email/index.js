import React from 'react';
import {
    View, Platform, Dimensions, AppState, Linking, Image,
    Text, StyleSheet, ActivityIndicator, TouchableOpacity, StatusBar, Button,
    TextInput, KeyboardAvoidingView
} from 'react-native';
import { Header, Input } from 'react-native-elements';
import { Constants, Location, Permissions, Contacts, Notifications, IntentLauncherAndroid } from 'expo';
import Modal from 'react-native-modal'
import { AsyncStorage } from 'react-native';

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
                email:value
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
        const { email } = this.state
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email != null) {
            if (reg.test(this.state.email) === true) {
            this. _storeData(email)
                // console.log("emil")
                // alert("");
            }
            else {
                alert("Enter correct email ");
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
        const { email, openSetting } = this.state
      
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
                <StatusBar backgroundColor={'#014E70'} />
                <Header
                    containerStyle={{
                        backgroundColor: '#0274BD',
                        borderBottomWidth: 0
                    }}
                //  centerComponent={{ text: "Create", style: { color: 'white', fontSize: 25, fontWeight: 'bold' } }}
                />
                <View style={styles.minDiv}>
                    <View style={styles.Email}>

                        <View style={styles.headings}><Text style={styles.HeadingText}>Email</Text></View>
                        <View style={styles.InputDiv}>
                            <TextInput
                                style={styles.InputFields}
                                onChangeText={(email) => this.setState({ email })}
                                // placeholder={'Email'}
                                value={email}
                                textContentType={'emailAddress'}
                            />
                        </View>
                    </View>
                    <View style={styles.Button}>
                        <View style={styles.textDivBottom}>
                            <Text style={styles.detailText}>
                                Please enter the email that</Text>
                            <Text style={styles.detailText}>
                                you signed up with at</Text>
                            <Text style={styles.detailText}>
                                WWW.rideafide.com - if you</Text>
                            <Text style={styles.detailText}>
                                dont't have a profile, please</Text>
                            <Text style={styles.detailText}>
                                create one for passengers</Text>
                            <Text style={styles.detailText}>
                                by visiting out website:
                         </Text>
                            <Text style={styles.hyperLink} onPress={this._goToURL}>
                                WWW.rideafide.com
                        </Text>

                        </View>
                        <View style={styles.ButtonDiv}>
                            <TouchableOpacity style={styles.buttondiv4} onPress={this.Next}>
                                <Text style={styles.buttonTittle}>
                                    Save
                              </Text>
                            </TouchableOpacity>
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
        textAlign:"center"
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
        color: "#0274BD",
        marginTop: "10%"

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

