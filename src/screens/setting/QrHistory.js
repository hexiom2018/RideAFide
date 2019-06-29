import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Linking, AsyncStorage, ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Button from '../../components/button/Button'
import { Header, Input, CheckBox } from 'react-native-elements';
import tick from '../../../assets/email/tick-checked.png'
import Untick from '../../../assets/email/untick.png'
import mail from '../../../assets/settings.png'
import scan from '../../../assets/Scan.png'
import logo from '../../../assets/email/logo.png'
class QrHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            count: 0,
        }
    }


    update(token) {
        const that = this
        let request = {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + token
            },

        };
        fetch('https://rideafide.com/wp-json/app/v2/passenger/qr_log', request)
            .then(response => {
                // console.log(response, 'ye dhekho response');
                response.json().then(function (data) {
                    // console.log(data["1"].ID, 'ye dhekho data');
                    that.run(data)

                });
            })
            .catch(error => {
                console.error(error, 'ye error ');

            })
    }



    run(data) {
        var dataArray = []
        for (var i = 0; i < data.total; i++) {
            console.log(data[i], "ye ye ye??")
            dataArray.push(data[i])
            this.setState({
                QrScans: dataArray
            })
        }
    }
    componentDidMount() {
        const { qrdata } = this.state

        this._retrieveData('token').then((token) => {
            this.setState({ token })
            this.update(token)
        })

    }


    _retrieveData = async (text) => {
        try {
            const value = await AsyncStorage.getItem(text);
            if (value !== null) {
                // We have data!!
                console.log(value);
                return value
                // this.props.navigation.navigate('Scan', { value })
                this.setState({
                    email: value
                })
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    create() {

    }

    static navigationOptions = { header: null }
    location = (i) => {
        const url = `https://www.google.com/maps/place/${i}`
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                alert('Don\'t know how to open URI: ' + url);
            }
        });
    }
    video = (i) => {
        const url = `${i}`
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                alert('Don\'t know how to open URI: ' + url);
            }
        });
    }
    _goToURL = (i) => {
        const url = `${i}`
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                alert('Don\'t know how to open URI: ' + url);
            }
        });
    }
    render() {
        const { QrScans } = this.state
        return (
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <View style={{ flexDirection: 'row', paddingVertical: '6%', justifyContent: 'center' }}>
                    <View style={{ width: '60%', paddingLeft: 15, height: 30, justifyContent: 'center' }}>
                        <Image
                            // style={{ width: 100, height: 100 }}
                            source={logo}
                        />
                    </View>

                </View>
                <View style={{ justifyContent: 'center', alignContent: 'center', width: '100%', borderBottomWidth: 1, borderBottomColor: '#77d8c5' }}>
                    <Text style={styles.heading}>Scan History</Text>
                </View>
                {!QrScans &&
                    <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: "center" }} >
                        <Text style={styles.text1}>
                            No History
                    </Text>
                    </View>}
                {QrScans &&
                    <ScrollView style={{ flex: 1 }} >
                        <View style={{ flex: 1, width: '100%', flexDirection: 'column', alignItems: 'center' }} >
                            {QrScans.map((i) => {
                                return (


                                    <View style={{ width: '99%', flexDirection: 'column', borderBottomWidth: 1, height: 150, borderBottomColor: '#77d8c5' }}>
                                        <View style={{ width: '100%', flexDirection: 'row', height: '23%' }}>
                                            <View style={{ width: '70%', }}>
                                                <Text style={styles.text}>Time: <Text style={styles.text1}>{i.publish_time}</Text></Text>

                                            </View>
                                            <View style={{ width: '30%', }}>
                                                <Text style={styles.text}>ID: <Text style={styles.text1}>{i.ID}</Text></Text>

                                            </View>

                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'column', height: '23%' }}>
                                            <Text style={styles.text}>Email: <Text style={styles.text1}>{i.email}</Text></Text>
                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'column', height: '23%' }}>
                                            <Text style={styles.text}>URL: <Text style={styles.hyperLink} onPress={() => this._goToURL(i.url)}>{i.url}</Text></Text>
                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'row', height: '31%', justifyContent: 'space-around', alignItems: 'center' }}>
                                            {i.video_log === 'null' ? null : <TouchableOpacity onPress={() => this.video(i.video_log)} activeOpacity={0.7} style={{ width: '40%', backgroundColor: '#FC0600', borderColor: '#7ad6c5', borderWidth: 1, paddingVertical: 2, borderRadius: 10 }}>
                                                <View>
                                                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                                                        {'Video'}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>}
                                            <TouchableOpacity onPress={() => this.location(i.location)} activeOpacity={0.7} style={{ width: '40%', backgroundColor: '#77d8c5', borderColor: '#7ad6c5', borderWidth: 1, paddingVertical: 2, borderRadius: 10 }}>
                                                <View>
                                                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                                                        {'Location'}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        // borderRadius: 4,
        width: '90%',
        // shadowOffset: {
        //     width: 3,
        //     height: 3,
        // },
        // shadowOpacity: 0.51,
        // shadowRadius: 4.16,
        // elevation: 5,
        // shadowColor: 'grey',
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: 'space-between'
    },
    input: {
        color: 'black',
        height: 50,
        width: '95%',
        fontSize: 18,
        paddingVertical: 10,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 15,
        opacity: 1,
        marginBottom: 10
    },
    text: {
        fontSize: 17,
        fontWeight: '500'
    },
    text1: {
        fontSize: 15,
        fontWeight: '400'
    },
    hyperLink: {
        fontSize: 15,
        fontWeight: '400',
        color: "#686868",

    },
    heading: {
        fontSize: 24,
        fontWeight: '600',
        // color: "#77d8c5",
        paddingVertical: 10,
        textAlign: 'center'


    },
    create: {
        fontSize: 16,
        fontWeight: '500',
        color: "white",
        marginTop: 20,
        textDecorationLine: 'underline'
    }
});



export default QrHistory;