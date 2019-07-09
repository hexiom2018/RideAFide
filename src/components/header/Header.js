import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons'
import logo from '../../../assets/email/logo.png'


export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    back() {
        const { back } = this.props
        back()
    }

    render() {
        return (
            <View>
                <View style={styles.statusBar} />
                <View style={styles.container}>
                    <TouchableOpacity
                        style={{ marginLeft: 12 }}
                        onPress={() => this.back()}
                    >
                        <Ionicons
                            color={'#1cbbb4'}
                            name={'ios-arrow-back'}
                            size={34}
                        />
                    </TouchableOpacity>
                    <View style={styles.appLogo}>
                        <Image
                            source={logo}
                        />
                    </View>
                    <View style={{ marginRight: 20 }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 105,
        alignItems: 'center'
    },
    appLogo: {
        width: '60%',
        alignItems: 'center',
        height: 36,
        justifyContent: 'center'
    },
    statusBar: {
        opacity: 0.2,
        height: Constants.statusBarHeight,
    },
});
