import React from 'react';
import {
    View, ScrollView, Image, LayoutAnimation, Text, StyleSheet, TouchableOpacity,
    TextInput, StatusBar, Platform, Dimensions, ActivityIndicator, Linking, WebView, Alert
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Location, BarCodeScanner, Permissions, Contacts } from 'expo';
import Web from '../WebView/webView'
import CameraExample from '../../components/camera/Camera';
import uuid from 'uuid'
import firebase from '../../../Config/Firebase'
import mail from '../../../assets/email/mail.png'
import scan from '../../../assets/email/scan-selected.png'
import logo from '../../../assets//newlogo2/newlogo.png'
import scanLogo from '../../../assets/email/scan.png'
import { Camera, Constants } from 'expo';
import Back from '../../../assets/back.png'
import Setting from '../../../assets/settingicon.png'
import History from '../../../assets/History.png'
import UnderLine from "../../../assets/underline.png";

class Send extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            lastScannedUrl: null,
            barcode: false,
            loader: false,
            button: false,
            recordVideo: false
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
        const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
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

    Submit = (downloadUrl) => {
        const { email, currentLocation, lastScannedUrl } = this.state
        this.setState({
            // button: false,
            // lastScannedUrl: null,
            loader: false
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
            console.log(this.response)
        }
        xhttp.open("POST", "https://rideafide.com/wp-json/qrcode_log/v2", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(`url=${lastScannedUrl}&approved=false&email=${email}&latitude=${currentLocation.lat}&longitude=${currentLocation.lng}&video_log=${downloadUrl}`);

    }

    back() {
        this.setState({ recordVideo: false })
    }

    async uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        const ref = firebase
            .storage()
            .ref()
            .child(uuid.v4());
        const snapshot = await ref.put(blob);

        // We're done with the blob, close and release it
        blob.close();

        return await snapshot.ref.getDownloadURL();
    }

    goback() {
        const { navigate } = this.props.navigation

        navigate('Email')
    }

    getUri(uri) {
        console.log(uri, 'the uri')

        this.uploadImageAsync(uri).then((downloadUrl) => {
            console.log(downloadUrl, 'download Url')
            this.Submit(downloadUrl)
        })

        this.setState({ recordVideo: false, loader: true })
    }

    recordAsync() {
        const { email, currentLocation, lastScannedUrl } = this.state

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            console.log(this.response)
        }
        xhttp.open("POST", "https://rideafide.com/wp-json/qrcode_log/v2", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(`url=${lastScannedUrl}&approved=false&email=${email}&latitude=${currentLocation.lat}&longitude=${currentLocation.lng}`);

        this.setState({ recordVideo: true })
    }
    //For Save Button Direct Send the REquest

    recordAsyncSave() {
        const { email, currentLocation, lastScannedUrl } = this.state
        this.setState({
            // button: false,
            // lastScannedUrl: null,
            loader: false
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
            console.log(this.response)
        }
        xhttp.open("POST", "https://rideafide.com/wp-json/qrcode_log/v2", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(`url=${lastScannedUrl}&approved=true&email=${email}&latitude=${currentLocation.lat}&longitude=${currentLocation.lng}`);

    }


    render() {
        const { barcode, lastScannedUrl, loader, recordVideo, button } = this.state
        return (
            <View style={styles.main}>
                {
                    recordVideo ?
                        <CameraExample duration={60000} back={() => this.back()} VideoUri={(uri) => this.getUri(uri)} />
                        :
                        <>
                            {/* <StatusBar hidden={true} /> */}
                            {lastScannedUrl !== null &&
                                <View style={styles.minDiv}>
                                    <View style={{ flexDirection: 'row', backgroundColor: '#1C3136', height: '15%', alignItems: 'center', justifyContent: 'center' }}>

                                        <TouchableOpacity
                                            onPress={lastScannedUrl ? () => this.recordAsync() : null}
                                            activeOpacity={lastScannedUrl ? 0.7 : 1}
                                            style={{
                                                width: '70%',
                                                backgroundColor: lastScannedUrl ? '#FC0600' : '#FC0600',
                                                borderColor: lastScannedUrl ? '#FC0600' : '#b5b0b0',
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                alignItems: 'center', justifyContent: 'center',
                                                height: 50,


                                            }}>
                                            <View>
                                                <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>
                                                    {'Emergency'}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ height: "70%", width: '100%', }}>
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
                                    <View style={{ flexDirection: 'row', backgroundColor: '#1C3136', height: '15%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ lastScannedUrl: null })}
                                            activeOpacity={0.7}
                                        >
                                            <Image
                                                style={{ height: 35, width: 35 }}
                                                source={Back}
                                            />
                                        </TouchableOpacity>


                                        <TouchableOpacity
                                            onPress={lastScannedUrl ? () => this.recordAsyncSave() : null}
                                            activeOpacity={lastScannedUrl ? 0.7 : 1}
                                            style={{
                                                width: '30%',
                                                backgroundColor: lastScannedUrl ? '#77d8c5' : '#b5b0b0',
                                                borderColor: lastScannedUrl ? '#77d8c5' : '#b5b0b0',
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                alignItems: 'center', justifyContent: 'center',
                                                height: 45
                                            }}>
                                            <View>
                                                <Text style={{ textAlign: 'center', fontSize: 18, color: 'white', }}>
                                                    {'SAFE'}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                            }

                        </>
                }
                {
                    loader &&
                    <View style={{ position: 'absolute', bottom: '50%', left: '45%' }}>
                        <ActivityIndicator size="large" color="#77d8c5" />
                    </View>
                }
            </View>
        );
    }
}
const opacity = 'rgba(0, 0, 0, .6)';
const { width } = Dimensions.get('window')
const qrSize = width * 0.9
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    main: {
        flex: 1,
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
    },
    HeadingText: {
        fontSize: 15,
        color: "#5DBCD2",
        borderBottomColor: '#5DBCD2'
    },
    InputDiv: {
        margin: 5,
        padding: 5,
        width: '100%',
        height: '40%'
    },
    Button: {
        height: "90%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

    },
    textDivBottom: {
        height: "77%",
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    ButtonDiv: {
        height: "10%",
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
    },
    qr: {
        marginTop: '20%',
        marginBottom: '20%',
        width: qrSize,
        height: qrSize,
    },
    description: {
        fontSize: width * 0.09,
        marginTop: '10%',
        textAlign: 'center',
        width: '70%',
        color: 'white',
    },
    cancel: {
        fontSize: width * 0.05,
        textAlign: 'center',
        width: '70%',
        color: 'white',
    },
});

export default Send;






