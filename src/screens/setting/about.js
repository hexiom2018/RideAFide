import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Linking, AsyncStorage, ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Button from '../../components/button/Button'
import { Input, CheckBox } from 'react-native-elements';
import tick from '../../../assets/email/tick-checked.png'
import Untick from '../../../assets/email/untick.png'
import mail from '../../../assets/settings.png'
import scan from '../../../assets/Scan.png'
import logo from '../../../assets/email/logo.png'
import Header from '../../components/header/Header'
class About extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            count: 0,
        }
    }


    static navigationOptions = { header: null }

    render() {
        const { QrScans } = this.state
        return (
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Header
                    back={() => this.props.navigation.navigate('Setting')}
                />
                <View style={{ backgroundColor: '#1cbbb4', height: 7 }} />

                <View style={{ justifyContent: 'center', alignContent: 'center', width: '100%', flexDirection: 'column' }}>
                    <Text style={styles.heading}>About Our Company </Text>
                </View>


                <ScrollView style={{ flex: 1 }} >
                    <View style={{ flex: 1, width: '100%', flexDirection: 'column', alignItems: 'center' }} >
                        <View style={{ flex: 1, width: '80%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={styles.text}>Horrified by the criminal actions of several rideshare experiences, we designed a new layer of security for the industry.

    We want YOU to feel confident when entering your rideshare vehicle!!!


Designed with a 19 point proprietary verification system, RideAfide is determined to save lives of our loved ones.</Text>
                        </View>
                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center', paddingVertical: 15, }}>We Are Growing Fast </Text>
                            <Text style={styles.text}>Launched in 2019, we are launching the first ever independently certified and verified rideshare safety platform.</Text>
                        </View>

                        <View style={{ flex: 1, width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <View style={{ backgroundColor: '#1cbbb4', height: 7 }} />
                            <View style={{ paddingVertical: '3%', width: '20%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center', color: '#1cbbb4' }}>
                                    1
                            </Text>
                                <Text style={{ fontWeight: '300', fontSize: 13, textAlign: 'center' }}>
                                    Idea
                            </Text>
                            </View>
                            <View style={{ paddingVertical: '3%', width: '45%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center', color: '#1cbbb4' }}>
                                    850+
                            </Text>
                                <Text style={{ fontWeight: '300', fontSize: 13, textAlign: 'center' }}>
                                    Hours of Research & Development
                            </Text>
                            </View>
                            <View style={{ paddingVertical: '3%', width: '30%' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center', color: '#1cbbb4' }}>
                                    35+
                            </Text>
                                <Text style={{ fontWeight: '300', fontSize: 13, textAlign: 'center' }}>
                                    QR Code Designs
                            </Text>
                            </View>
                            <View style={{ backgroundColor: '#1cbbb4', height: 7 }} />
                        </View>
                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center', paddingVertical: 15, }}>Reviews From Popular Media Says... </Text>
                            <Text style={styles.text}>We are currently seeking reviews from media sources and welcome any and all resources to reach out to us at RideAfide to discuss how we are adding a level of safety and security to the ridesharing community.</Text>
                            <Text style={{ fontSize: 15, fontWeight: '500', textAlign: 'center', paddingVertical: 15, }}>Tech Crunch or Your Media Firm</Text>

                        </View>
                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }} >
                            <Text style={styles.text}>We are currently seeking reviews from media sources and welcome any and all resources to reach out to us at RideAfide to discuss how we are adding a level of safety and security to the ridesharing community.</Text>
                            <Text style={{ fontSize: 15, fontWeight: '500', textAlign: 'center', paddingVertical: 15, }}>Today Show or Your Media Firm</Text>

                        </View>
                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 15, fontWeight: '500', textAlign: 'center', paddingVertical: 15, }}>Effective date as of</Text>
                            <Text style={{ fontSize: 15, fontWeight: '300', textAlign: 'center', paddingVertical: 5, }}>June 01, 2019</Text>

                        </View>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        width: '90%',
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

    },
    text1: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
        paddingVertical: 10

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



export default About;