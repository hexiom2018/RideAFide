import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Button from '../../components/button/Button'
import { Header, Input, CheckBox } from 'react-native-elements';
import tick from '../../../assets/email/tick-checked.png'
import Untick from '../../../assets/email/untick.png'
import mail from '../../../assets/settings.png'
import scan from '../../../assets/Scan.png'
import logo from '../../../assets/email/logo.png'
class ProfileDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            loading: false,
            count: 0,
            checked1: true,
            sms: 'yes',
            dataLoading: false
        }
    }

    // var myres = response.split(',')[index]


    update(token) {
        const { checked2, checked1 } = this.state
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
                    console.log(data, 'ye dhekho data');
                    that.setState({
                        full_name: data.fullname,
                        address: data.address,
                        sms_allowed: data.sms_allowed,
                        phone: data.phone,
                        country: data.country,
                        zip: data.zip,
                        state: data.state[0],
                        city: data.city[0],
                        dataLoading: true
                    })
                    if (data.sms_allowed === 'no') {
                        that.setState({ checked1: !checked1 })
                        that.setState({ checked2: !checked2 })
                    }

                });
            })
            .catch(error => {
                console.error(error, 'ye error ');

            })
    }



    componentDidMount() {
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
        const { address, phone, full_name, country, zip, state, city, sms, token } = this.state


        if (full_name.length < 3) {
            alert('username must be more than 3 characters')
        }

        else if (phone.length < 4) {
            alert('Enter valid phone number')
        }
        else if (!address) {
            alert('Enter Address')
        }
        else if (!country) {
            alert('Enter country')
        }
        else if (!zip) {
            alert('Enter zip')
        }
        else if (!state) {
            alert('Enter state')
        }
        else if (!city) {
            alert('Enter city')
        }
        else if (!sms) {
            alert('Select sms service')
        }

        else {
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
                        `'Thank's for submit`,
                        [
                            { text: 'ok', onPress: () => that.props.navigation.navigate('Scan') },
                        ],
                        { cancelable: false },
                    )
                    that
                    that.setState({
                        loading: false
                    })
                }



            }
            xhttp.open("POST", "https://rideafide.com/wp-json/app/v2/passenger/update_passenger", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.setRequestHeader("Authorization", 'Bearer ' + token);
            xhttp.send(`action=${`personal_info_section`}&address=${address}&sms_allowed=${sms}&phone=${phone}&country=${country}&zip=${zip}&state=${state}&city=${city}&full_name=${full_name}`);
        }
    }

    static navigationOptions = { header: null }

    checkedBox1() {
        const { checked1, checked2 } = this.state
        this.setState({ checked1: !checked1 })
        this.setState({ checked2: !checked2 })
        this.setState({ sms: 'yes' })
    }
    checkedBox2() {
        const { checked1, checked2 } = this.state
        this.setState({ checked1: !checked1 })
        this.setState({ checked2: !checked2 })
        this.setState({ sms: 'no' })
    }


    render() {
        const { address, phone, full_name, country, zip, state, loading, city, checked1, checked2, dataLoading } = this.state
        return (
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <View style={{ flexDirection: 'row', paddingVertical: '10%', justifyContent: 'center' }}>
                    <View style={{ width: '60%', alignItems: 'center', height: 30, justifyContent: 'center' }}>
                        <Image
                            // style={{ width: 100, height: 100 }}
                            source={logo}
                        />
                    </View>

                </View>
                <View style={{ backgroundColor: '#1cbbb4', height: 7 }} />

                <View style={{ justifyContent: 'center', alignContent: 'center', width: '100%' }}>
                    <Text style={styles.heading}>User Information</Text>
                </View>

                {!dataLoading && <ActivityIndicator size="large" color="#00ff00" />}
                {dataLoading &&
                    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }} behavior={'padding'}>
                        <ScrollView style={{ flex: 1, marginTop: 24 }} >
                            <View style={{ alignItems: "center", justifyContent: 'center', width: '100%' }} >
                                <View style={{ width: '90%' }} >
                                    <Text style={styles.text}>Name</Text>
                                </View>
                                <View style={styles.container}>

                                    <View style={{ width: '100%' }}>
                                        <TextInput
                                            keyboardType={'email-address'}
                                            placeholder={'Enter First and Last Name'}
                                            placeholderTextColor={'#686868'}
                                            onChangeText={e => this.setState({ full_name: e })}
                                            value={full_name}
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

                                <View style={{ width: '90%' }} >
                                    <Text style={styles.text}>Mobile Phone</Text>
                                </View>
                                <View style={styles.container}>

                                    <View style={{ width: '100%' }}>
                                        <TextInput
                                            keyboardType={'email-address'}
                                            placeholder={'Enter Mobile Number'}
                                            placeholderTextColor={'#686868'}
                                            onChangeText={e => this.setState({ phone: e })}
                                            value={phone}
                                            keyboardType={"number-pad"}
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
                                <View style={{ width: '90%' }} >
                                    <Text style={styles.text}>Address</Text>
                                </View>


                                <View style={styles.container}>


                                    <View style={{ width: '100%' }}>
                                        <TextInput
                                            keyboardType={'ascii-capable'}
                                            // secureTextEntry={true}
                                            placeholder={'Enter Address'}
                                            placeholderTextColor={'#686868'}
                                            onChangeText={e => this.setState({ address: e })}
                                            value={address}
                                            textContentType={'password'}
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
                                <View style={{ width: '90%' }}>
                                    <Text style={styles.text}>City</Text>
                                </View>
                                <View style={styles.container}>
                                    <View style={{ width: '100%' }}>
                                        <TextInput
                                            keyboardType={'ascii-capable'}
                                            // secureTextEntry={true}/
                                            placeholder={'Enter City '}
                                            placeholderTextColor={'#686868'}
                                            onChangeText={e => this.setState({ city: e })}
                                            value={city}
                                            textContentType={'password'}
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
                                <View style={{ width: '90%' }}>
                                    <Text style={styles.text}>State</Text>
                                </View>
                                <View style={styles.container}>


                                    <View style={{ width: '100%' }}>
                                        <TextInput
                                            keyboardType={'ascii-capable'}
                                            // secureTextEntry={true}
                                            placeholder={'Enter State'}
                                            placeholderTextColor={'#686868'}
                                            onChangeText={e => this.setState({ state: e })}
                                            value={state}
                                            textContentType={'password'}
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
                                <View style={{ width: '90%' }}>
                                    <Text style={styles.text}>Zip Code</Text>
                                </View>
                                <View style={styles.container}>
                                    <View style={{ width: '100%' }}>
                                        <TextInput
                                            keyboardType={'ascii-capable'}
                                            // secureTextEntry={true}
                                            placeholder={'Enter Zip Code'}
                                            placeholderTextColor={'#686868'}
                                            onChangeText={e => this.setState({ zip: e })}
                                            value={zip}
                                            textContentType={'password'}
                                            keyboardType={'number-pad'}
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
                                <View style={{ width: '90%' }}>
                                    <Text style={styles.text}>Country</Text>
                                </View>
                                <View style={styles.container}>


                                    <View style={{ width: '100%' }}>
                                        <TextInput
                                            keyboardType={'ascii-capable'}
                                            // secureTextEntry={true}
                                            placeholder={'Enter Country'}
                                            placeholderTextColor={'#686868'}
                                            onChangeText={e => this.setState({ country: e })}
                                            value={country}
                                            textContentType={'password'}
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

                                <View style={{ width: '90%' }}>
                                    <Text style={styles.text}>Text Message Allowed</Text>
                                </View>
                                <View style={styles.container}>


                                    <View style={{ width: '100%', flexDirection: 'row' }}>
                                        <CheckBox
                                            title='Yes'
                                            checked={checked1}
                                            checkedIcon={<Image source={tick} style={{ width: 20, height: 20 }} />}
                                            uncheckedIcon={<Image source={Untick} style={{ width: 20, height: 20 }} />}
                                            onPress={() => this.checkedBox1()}
                                            containerStyle={{ backgroundColor: 'white', borderColor: 'white' }}
                                        />
                                        <CheckBox
                                            title='No'
                                            checked={checked2}
                                            checkedIcon={<Image source={tick} style={{ width: 20, height: 20 }} />}
                                            uncheckedIcon={<Image source={Untick} style={{ width: 20, height: 20 }} />}
                                            onPress={() => this.checkedBox2()}
                                            containerStyle={{ backgroundColor: 'white', borderColor: 'white' }}
                                        />

                                    </View>
                                </View>


                                <View style={{ alignItems: 'center', width: '90%', marginBottom: 10 }}>
                                    {
                                        !loading &&
                                        <TouchableOpacity onPress={() => this.create()} activeOpacity={0.7} style={{ width: '70%', backgroundColor: '#77d8c5', borderColor: '#7ad6c5', borderWidth: 1, paddingVertical: 2, borderRadius: 10 }}>
                                            <View>
                                                <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                                                    {'Update'}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                    {loading && <ActivityIndicator size="large" color="#00ff00" />}
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                }
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
        fontSize: 16,
        fontWeight: '500'
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



export default ProfileDetails;