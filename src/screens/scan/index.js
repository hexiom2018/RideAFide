import React from 'react';
import {
    View, ScrollView, Image, LayoutAnimation, Text, StyleSheet, TouchableOpacity,
    TextInput, StatusBar, Platform, Dimensions, AppState, Linking, WebView, Alert
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Constants, Location, BarCodeScanner, Permissions, Contacts } from 'expo';
import Web from '../WebView/webView'


class Scan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            lastScannedUrl: null,
            barcode: false,
            button: false
        };
    }
    static navigationOptions = {
        // title: 'Welcome',
        header: null
    };

    componentDidMount() {
        const { navigation, } = this.props
        const email = navigation.getParam('email')
        console.log(email, '>>>>email')
        if (email) {
            this.setState({
                email,
            })
        }
        this._requestCameraPermission();
        this._getLocationAsync();


    }
    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };
    _handleBarCodeRead = result => {
        if (result.data !== this.state.lastScannedUrl) {
            LayoutAnimation.spring();
            this.setState({ lastScannedUrl: result.data });
        }
        if (result.data) {
            this.setState({ barcode: false })
            console.log(result.data)

        }
    };
    _getLocationAsync = async () => {
        let location = await Location.getCurrentPositionAsync({});
        const obj = {
            direction: { lat: location.coords.latitude, lng: location.coords.longitude },
        }
        this.setState({
            currentLocation: { lat: location.coords.latitude, lng: location.coords.longitude },

        })
        // console.log("location===>>>>", obj)
    }

    _Create = () => {
        console.log("function run")
        this.props.navigation.navigate('Create')
    }
    _Read = () => {
        console.log("function run")
        this.props.navigation.navigate('Read')
    }
    function = (state) => {
        console.log(state, "gggg")
        if (state.loading === false) {
            this.setState({
                button: true
            })
        }
    }

    result = (status) => {

        var statuss = status
        if (statuss === 200) {
            Alert.alert(
                'Success',
                'Thanks for submit your feedback.',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
            );
        }
    }



    Submit = () => {
        const { email, currentLocation, lastScannedUrl } = this.state
        this.setState({
            button: false,
            lastScannedUrl: null
        })
        Alert.alert(
            'Success',
            'Thanks for submit your feedback.',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
        );
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
        }
        console.log(this.response)
        xhttp.open("POST", "https://rideafide.com/wp-json/qrcode_log/v2", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(`url=${lastScannedUrl}&approved=true&email=${email}&latitude=${currentLocation.lat}&longitude=${currentLocation.lng}`);

    }

    render() {
        const { barcode, lastScannedUrl, button } = this.state
        return (
            <View style={styles.main}>
                <StatusBar backgroundColor={'#014E70'} />

                {barcode &&
                    <View style={styles.main}>
                        {
                            this.state.hasCameraPermission === null
                                ? <Text>Requesting for camera permission</Text>
                                : this.state.hasCameraPermission === false
                                    ? <Text style={{ color: '#fff' }}>
                                        Camera permission is not granted
                </Text>
                                    : <BarCodeScanner
                                        onBarCodeRead={this._handleBarCodeRead}
                                        style={{
                                            height: Dimensions.get('window').height,
                                            width: Dimensions.get('window').width,
                                        }}
                                    />
                        }
                    </View>
                }
                {!barcode &&
                    <View style={styles.main}>

                        <Header
                            containerStyle={{
                                backgroundColor: '#0274BD',
                                borderBottomWidth: 0
                            }}
                            // leftComponent={{ icon: 'arrow-back', color: 'white', onPress: () => this.props.navigation.navigate('Home') }}
                            // centerComponent={{ text: "Create", style: { color: 'white', fontSize: 25, fontWeight: 'bold' } }}
                            rightComponent={
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Icon
                                        name="select-all"
                                        color="#fff"
                                        onPress={() => this.setState({ barcode: true, button: false })}
                                        Component={TouchableOpacity}
                                        style={{ justifyContent: 'space-around' }}
                                        size={28}
                                    />
                                    <Icon
                                        name="more-vert"
                                        color="#fff"
                                        size={28}
                                        onPress={this.goForward}
                                        Component={TouchableOpacity}
                                    />
                                </View>
                            }
                        />
                        <View style={styles.minDiv}>
                            <View style={styles.Button}>
                                <View style={styles.textDivBottom}>
                                    {lastScannedUrl === null && <View>
                                        <Text>Scan Barcode</Text>
                                    </View>}
                                    {lastScannedUrl !== null &&
                                        <WebView
                                            source={{
                                                uri: lastScannedUrl,
                                            }}
                                            onNavigationStateChange={(state) => this.function(state)}
                                            startInLoadingState
                                            scalesPageToFit={true}
                                            javaScriptEnabled
                                            style={{ flex: 1, height: 100, width: Dimensions.get('window').width, }}
                                        />}
                                </View>

                                {
                                    button ?
                                        <View style={styles.ButtonDiv}>
                                            <TouchableOpacity style={styles.buttondiv3} onPress={this.Submit}>
                                                <Text style={styles.buttonTittle}>
                                                    EMERGENCY
                                          </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.buttondiv4} onPress={this.Submit}>
                                                <Text style={styles.buttonTittle}>
                                                    SAFE
                                          </Text>
                                            </TouchableOpacity>
                                        </View> :
                                        <View style={styles.ButtonDiv}>
                                            <View style={styles.buttondiv1}>
                                                <Text style={styles.buttonTittle}>
                                                    EMERGENCY
                                          </Text>
                                            </View>
                                            <View style={styles.buttondiv2} >
                                                <Text style={styles.buttonTittle}>
                                                    SAFE
                                          </Text>
                                            </View>
                                        </View>


                                }

                            </View>

                        </View>
                    </View>
                }
            </View>
        );
    }
}

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
        justifyContent: 'center'
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
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

    },
    textDivBottom: {
        height: "90%",
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // flex:1,
        width: "100%"
    },
    ButtonDiv: {
        height: "10%",
        // borderWidth: 1,
        width: "100%",
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#0274BD',
        flexDirection: 'row'
    },
    ButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around'
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
    buttondiv1: {
        backgroundColor: '#D7D7D7',
        width: '47%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 3,
        borderRadius: 8
    },
    buttondiv2: {
        backgroundColor: '#D7D7D7',
        width: '47%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 3,
        borderRadius: 8
    },
    buttondiv3: {
        backgroundColor: '#FA0202',
        width: '47%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 3,
        borderRadius: 8
    },
    buttondiv4: {
        backgroundColor: '#00FF00',
        width: '47%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 3,
        borderRadius: 8
    },
    buttonTittle: {
        fontSize: 16,
        color: '#f2f2f2'
    }
});

export default Scan;

