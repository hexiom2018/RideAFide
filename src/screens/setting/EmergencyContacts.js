import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Button from '../../components/button/Button'
import tick from '../../../assets/email/tick-checked.png'
import Untick from '../../../assets/email/untick.png'
import mail from '../../../assets/settings.png'
import scan from '../../../assets/Scan.png'
import logo from '../../../assets/email/logo.png'
class EmergencyContacts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            count: 0,
            dataLoading: false

        }
    }



    update(token) {
        var count = 0
        const that = this
        let request = {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + token
            },

        };
        fetch('https://rideafide.com/wp-json/app/v2/passenger/get_all_info', request)
            .then(response => {
                // console.log(response, 'ye dhekho response');
                response.json().then(function (data) {
                    // console.log(data, 'ye dhekho data');
                    var emails = data.parent_emails.split(',')
                    console.log(emails, 'emails');

                    var numbers = data.parent_numbers.split(',')
                    console.log(numbers, 'numbers');

                    that.setState({
                        Email_1: emails[0],
                        Email_2: emails[1],
                        message: data.message,
                        numbers_1: numbers[0],
                        numbers_2: numbers[1],
                        dataLoading: true
                    })
                });
            })
            .catch(error => {
                console.error(error, 'ye error ');

            })

    }


    componentDidMount() {

        // console.log(AsyncStorage.getItem('token'), 'token')

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
        const { numbers_1, numbers_2, message, Email_1, Email_2, token } = this.state

        var Emails = []
        var Numbers = []


        if (!message) {
            alert('Message must be placed')
        }
        else if (!Email_1 && !Email_2) {
            alert('Input atleast one  Email')
        }
        else if (Email_1 && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email_1))) {
            alert('Invalid Email 1')
        }
        else if (Email_2 && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email_2))) {
            alert('Invalid Email 2')
        }
        else if (!numbers_1 && !numbers_2) {
            alert('Input atleast one  number')
        }


        else {

            if (Email_1) {

                Emails.push(Email_1)
            } if (Email_2) {

                Emails.push(Email_2)
            }


            if (numbers_1) {

                Numbers.push(numbers_1)
            } if (numbers_2) {

                Numbers.push(numbers_2)
            }

            this.setState({
                loading: true,
            })

            var count = 0
            const that = this
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {

                if (this.status === 200 && !count) {

                    // console.log(this.response, 'this response')
                    count = 1

                    Alert.alert(
                        'Sucess',
                        `Thank's for submit`,
                        [
                            { text: 'OK', onPress: () => that.props.navigation.navigate('Scan') },
                        ],
                        { cancelable: false },
                    )
                    that
                    that.setState({
                        loading: false,
                        Update: false
                    })
                }


            }
            xhttp.open("POST", "https://rideafide.com/wp-json/app/v2/passenger/update_passenger", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.setRequestHeader("Authorization", 'Bearer ' + token);
            xhttp.send(`action=${`emergency_section`}&parent_emails=${Emails}&parent_numbers=${Numbers}&message=${message}`);
        }
    }

    static navigationOptions = { header: null }

    render() {
        const { numbers_1, numbers_2, message, Email_1, Email_2, loading, Update, dataLoading } = this.state
        return (
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }} behavior={'padding'}>
                <ScrollView style={{ flex: 1, marginTop: 24 }} >
                    <View style={{ flex: 1, justifyContent: 'center', }}>
                        <View style={{ flexDirection: 'row', paddingVertical: '6%', justifyContent: 'center' }}>
                            <View style={{ width: '60%', paddingLeft: 15, height: 30, justifyContent: 'center' }}>
                                <Image
                                    // style={{ width: 100, height: 100 }}
                                    source={logo}
                                />
                            </View>

                        </View>
                        {!dataLoading &&
                            <View style={{ alignItems: "center", justifyContent: 'center', width: '100%' }} >
                                <Text style={styles.heading}> emergency_section</Text>
                                <ActivityIndicator size="large" color="#00ff00" /></View>
                        }


                        {dataLoading &&
                            <View style={{ alignItems: "center", justifyContent: 'center', width: '100%' }} >
                                <Text style={styles.heading}> emergency_section</Text>
                                <View style={{ width: '90%' }} >
                                    <Text style={styles.text}>parent_emails</Text>
                                </View>
                                <View style={styles.container}>

                                    <View style={{ width: '100%' }}>
                                        <TextInput
                                            keyboardType={'email-address'}
                                            placeholder={'Enter emails 1'}
                                            placeholderTextColor={'#686868'}
                                            onChangeText={e => this.setState({ Email_1: e })}
                                            value={Email_1}
                                            textContentType={'emailAddress'}
                                            style={{
                                                borderWidth: 1,
                                                color: '#6a6a6a',
                                                borderColor: '#77d8c5',
                                                textAlign: 'center',
                                                paddingHorizontal: 10,
                                                paddingVertical: 10,
                                                borderRadius: 7,
                                                fontStyle: 'italic', marginBottom: 2
                                            }}
                                        />
                                    </View>
                                    <View style={{ width: '100%' }}>
                                        <TextInput
                                            keyboardType={'email-address'}
                                            placeholder={'Enter emails 2'}
                                            placeholderTextColor={'#686868'}
                                            onChangeText={e => this.setState({ Email_2: e })}
                                            value={Email_2}
                                            textContentType={'emailAddress'}
                                            style={{
                                                borderWidth: 1,
                                                color: '#6a6a6a',
                                                borderColor: '#77d8c5',
                                                textAlign: 'center',
                                                paddingHorizontal: 10,
                                                paddingVertical: 10,
                                                borderRadius: 7,
                                                fontStyle: 'italic', marginTop: 2
                                            }}
                                        />
                                    </View>
                                </View>

                                <View style={{ width: '90%' }} >
                                    <Text style={styles.text}>Emergency Contact's</Text>
                                </View>
                                <View style={styles.container}>

                                    <View style={{ width: '100%' }}>
                                        <TextInput
                                            keyboardType={'email-address'}
                                            placeholder={' Contact 1 '}
                                            placeholderTextColor={'#686868'}
                                            onChangeText={e => this.setState({ numbers_1: e })}
                                            value={numbers_1}
                                            keyboardType={"number-pad"}
                                            style={{
                                                borderWidth: 1,
                                                color: '#6a6a6a',
                                                borderColor: '#77d8c5',
                                                textAlign: 'center',
                                                paddingHorizontal: 10,
                                                paddingVertical: 10,
                                                borderRadius: 7,
                                                fontStyle: 'italic', marginBottom: 2
                                            }}
                                        />
                                    </View>
                                    <View style={{ width: '100%' }}>
                                        <TextInput
                                            keyboardType={'email-address'}
                                            placeholder={'Contact 2'}
                                            placeholderTextColor={'#686868'}
                                            onChangeText={e => this.setState({ numbers_2: e })}
                                            value={numbers_2}
                                            textContentType={'emailAddress'}
                                            keyboardType={"number-pad"}
                                            style={{
                                                borderWidth: 1,
                                                color: '#6a6a6a',
                                                borderColor: '#77d8c5',
                                                textAlign: 'center',
                                                paddingHorizontal: 10,
                                                paddingVertical: 10,
                                                borderRadius: 7,
                                                fontStyle: 'italic', marginTop: 2
                                            }}
                                        />
                                    </View>
                                </View>

                                <View style={{ width: '90%' }}>
                                    <Text style={styles.text}>Message</Text>
                                </View>
                                <View style={styles.container}>


                                    <View style={{ width: '100%' }}>
                                        <TextInput
                                            keyboardType={'ascii-capable'}
                                            placeholder={'Enter message '}
                                            placeholderTextColor={'#686868'}
                                            onChangeText={e => this.setState({ message: e })}
                                            value={message}

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

                                <View style={{ alignItems: 'center', width: '90%', paddingBottom: 3 }}>

                                    {
                                        !loading &&
                                        <TouchableOpacity onPress={() => this.create()} activeOpacity={0.7} style={{ width: '70%', backgroundColor: '#77d8c5', borderColor: '#7ad6c5', borderWidth: 1, paddingVertical: 2, borderRadius: 10 }}>
                                            <View>
                                                <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                                                    {'Submit'}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                    {loading && <ActivityIndicator size="large" color="#00ff00" />}
                                </View>
                            </View>
                        }
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
        fontSize: 16,
        fontWeight: '500'
    },
    heading: {
        fontSize: 24,
        fontWeight: '600',
        // color: "#77d8c5",
        paddingVertical: 20
    },
    create: {
        fontSize: 16,
        fontWeight: '500',
        color: "white",
        marginTop: 20,
        textDecorationLine: 'underline'
    }
});



export default EmergencyContacts;