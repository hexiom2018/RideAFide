import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { Header, Icon } from 'react-native-elements';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView,
    Image, ScrollView, ActivityIndicator
} from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome'
// import BackIcon from '../../../assets/back.png'
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import { Snackbar } from 'react-native-paper'
import tick from '../../../assets/email/tick-checked.png'
import Untick from '../../../assets/email/untick.png'
import mail from '../../../assets/settings.png'
import scan from '../../../assets/Scan.png'
import logo from '../../../assets/email/logo.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Headers from '../../components/header/Header'
class ForgetPassword extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
        }

    }

    onChange(value, text) {
        this.setState({
            [text]: value
        })
    }

    goBack() {
        const { navigate } = this.props.navigation

        navigate('LogIn')
    }

    forgetPassword() {
        const { email } = this.state
        this.setState({
            loading: true
        })
        if (email) {

            var count = 0
            let that = this
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                console.log(this.response, 'eeskdjbsak')
                if (this.status === 200 && !count) {
                    count = 1
                    that.setState({
                        alert: true,
                        checkEmail: true,
                        loading: false,
                        text: 'Please check your email'
                    })
                }
                else if (this.status === 401 && !count) {
                    that.setState({
                        alert: true,
                        loading: false,
                        text: 'A user with that email does not exist'
                    })
                }
                else if (this.state && !count) {
                    count = 1
                    that.setState({
                        alert: true,
                        loading: false,
                        text: 'Something went wrong'
                    })
                }

            }
            xhttp.open("POST", "https://rideafide.com/wp-json/app/v2/auth/reset_password", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(`user_login=${email}`);



            // this.setState({
            //     alert: true,
            //     text: err.message,
            //     loading: false,
            // })

        } else {
            this.setState({
                alert: true,
                text: 'Please enter your email',
                loading: false,
            })
        }
        this.setState({
            checkEmail: false,
            email: '',
        })
    }

    render() {
        const { email, text, checkEmail, loading } = this.state
        return (



            <KeyboardAvoidingView style={{ flex: 1, position: 'relative', }} behavior={'padding'} enabled>
                <Headers
                    back={() => this.props.navigation.navigate('LogIn')}
                />
                <View style={{ backgroundColor: '#1cbbb4', height: 7 }} />

                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingVertical: 40 }}>
                    <View>
                        <View style={styles.form}>
                            {/* <InputField
                                label={'E-mail'}
                                name={'email'}
                                type={'email-address'}
                                placeholder={'Enter e-mail...'}
                                value={email}
                                secure={false}
                                fontAwesome={false}
                                change={(value) => this.onChange(value, 'email')}
                            /> */}

                            <View style={{ width: '80%' }}>
                                <TextInput
                                    keyboardType={'email-address'}
                                    placeholder={'Enter email'}
                                    placeholderTextColor={'#686868'}
                                    // change={(value) => this.onChange(value, 'email')}
                                    onChangeText={(email) => this.setState({ email })}
                                    // value={username}
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


                            {
                                checkEmail &&
                                <View style={{ width: '90%', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, color: 'white' }}>
                                        {'Please check your email'}
                                    </Text>
                                </View>
                            }
                        </View>
                        <View style={{ alignItems: 'center', marginTop: '20%' }}>
                            <TouchableOpacity onPress={() => this.forgetPassword()} activeOpacity={0.7} style={{ width: '70%', backgroundColor: '#77d8c5', borderColor: '#7ad6c5', borderWidth: 1, paddingVertical: 2, borderRadius: 10 }}>
                                {
                                    !loading &&
                                    <View>
                                        <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
                                            {'Send'}
                                        </Text>
                                    </View>
                                }
                                {loading && <ActivityIndicator size="small" color="#00ff00" />}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {/* </View> */}
                <Snackbar
                    visible={this.state.alert}
                    onDismiss={() => this.setState({ alert: false })}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                            this.goBack()
                        },
                    }}
                >
                    {text}
                </Snackbar>

            </KeyboardAvoidingView >
        )
    }
}

const styles = StyleSheet.create({
    header: {
        // borderWidth: 1,
        paddingVertical: 30,
        flexDirection: 'row'
    },
    Icon: {
        width: 40,
        height: 40,
        alignItems: 'center',
        // borderWidth: 1
    },
    button: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 15
    },
    form: {
        // borderWidth: 1,
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center'
    },
})


function mapStateToProps(states) {
    return ({
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // actions: bindActionCreators({
        //     ForgetPasswordAction
        // }, dispatch)
    })
}

export default ForgetPassword;