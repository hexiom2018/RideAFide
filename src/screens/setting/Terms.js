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
import Header from '../../components/header/Header';
class Terms extends React.Component {
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
                    <Text style={styles.heading}>Terms of Use</Text>
                </View>


                <ScrollView style={{ flex: 1 }} >
                    <View style={{ flex: 1, width: '100%', flexDirection: 'column', alignItems: 'center' }} >
                        <View style={{ flex: 1, width: '85%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center', paddingVertical: 5, }}>Agreement between User and www.rideafide.com</Text>

                            <Text style={styles.text}>Welcome to rideafide.com. The rideafide.com website (the “Site”) is comprised of various web pages operated by RideAfide LLC (“RideAfide”). rideafide.com is offered to you conditioned on your acceptance without modification of the terms, conditions, and notices contained herein (the “Terms”). Your use of rideafide.com constitutes your agreement to all such Terms. Please read these terms carefully, and keep a copy of them for your reference.
                            </Text>
                            <Text style={styles.text}>rideafide.com is an E-Commerce Site.
                            </Text>

                            <Text style={styles.text}>RideAfide provides an independent verification system process to rideshare drivers and provides mobile applications to rideshare passengers which allows them to scan unique proprietary RideAfide emblems, identify rideshare drivers, verify rideshare driver information and notify emergency contacts through RideAfide’s system via SMS Text messaging and emails.
                            </Text>
                        </View>

                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', alignItems: 'flex-start', paddingVertical: 15, color: '#1cbbb4' }}>Privacy:</Text>
                            <Text style={styles.text}>Your use of www.rideafide.com is subject to RideAfide’s Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.</Text>
                        </View>


                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center', paddingVertical: 15, color: '#1cbbb4' }}>Electronic Communications:</Text>
                            <Text style={styles.text}>Visiting https://www.rideafide.com or sending emails to RideAfide constitutes electronic communications. You consent to receive electronic communications and you agree that all agreements, notices, disclosures and other communications that we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communications be in writing.</Text>

                        </View>
                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center', paddingVertical: 15, color: '#1cbbb4' }}>Your Account:</Text>
                            <Text style={styles.text}>If you use this site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password. You may not assign or otherwise transfer your account to any other person or entity. You acknowledge that RideAfide is not responsible for third party access to your account that results from theft or misappropriation of your account. RideAfide and its associates reserve the right to refuse or cancel service, terminate accounts, or remove or edit content in our sole discretion.</Text>

                        </View>
                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center', paddingVertical: 15, color: '#1cbbb4' }}>Children Under Thirteen:</Text>
                            <Text style={styles.text}>RideAfide does not knowingly collect, either online or offline, personal information from persons under the age of thirteen. If you are under 18, you may use https://www.rideafide.com only with permission of a parent or guardian.</Text>

                        </View>
                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center', paddingVertical: 15, color: '#1cbbb4' }}>Cancellation/Refund Policy:</Text>
                            <Text style={styles.text}>Driver or Passengers may cancel their membership subscription services at anytime. RideAfide does not provide refunds on memberships or subscriptions and the users services will remain effective until the end of their annual period. Once the annual membership / subscription has ended, if the user has canceled no renewals will occur. Drivers who have a verified status will be updated to unverified at the end of their membership. Passengers will revert to the free membership and will not have premium access unless they choose to re-enroll in a premium membership. Any questions related to cancellation or refund policy should be directed to support@rideafide.com or you may open a case ticket at https://www.rideafide.com/support</Text>

                        </View>
                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', alignItems: 'flex-start', paddingVertical: 15, color: '#1cbbb4' }}>Links to Third Party Sites/Third Party Services:</Text>
                            <Text style={styles.text}>www.rideafide.com may contain links to other websites (“Linked Sites”). The Linked Sites are not under the control of RideAfide and RideAfide is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site. RideAfide is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by RideAfide of the site or any association with its operators.

Certain services made available via www.rideafide.com are delivered by third party sites and organizations. By using any product, service or functionality originating from the https://www.rideafide.com domain, you hereby acknowledge and consent that RideAfide may share such information and data with any third party with whom RideAfide has a contractual relationship to provide the requested product, service or functionality on behalf of https://www.rideafide.com users and customers.</Text>

                        </View>
                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', alignItems: 'flex-start', paddingVertical: 15, color: '#1cbbb4' }}>No Unlawful or Prohibited Use/Intellectual Property:</Text>
                            <Text style={styles.text}>www.rideafide.com may contain links to other websites (“Linked Sites”). The Linked Sites are not under the control of RideAfide and RideAfide is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site. RideAfide is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by RideAfide of the site or any association with its operators.
                            You are granted a non-exclusive, non-transferable, revocable license to access and use https://www.rideafide.com strictly in accordance with these terms of use. As a condition of your use of the Site, you warrant to RideAfide that you will not use the Site for any purpose that is unlawful or prohibited by these Terms. You may not use the Site in any manner which could damage, disable, overburden, or impair the Site or interfere with any other party’s use and enjoyment of the Site. You may not obtain or attempt to obtain any materials or information through any means not intentionally made available or provided for through the Site.
</Text>
                            <Text style={styles.text}>All content included as part of the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Site, is the property of RideAfide or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights. You agree to observe and abide by all copyright and other proprietary notices, legends or other restrictions contained in any such content and will not make any changes thereto.
</Text>
                            <Text style={styles.text}>You will not modify, publish, transmit, reverse engineer, participate in the transfer or sale, create derivative works, or in any way exploit any of the content, in whole or in part, found on the Site. RideAfide content is not for resale. Your use of the Site does not entitle you to make any unauthorized use of any protected content, and in particular you will not delete or alter any proprietary rights or attribution notices in any content. You will use protected content solely for your personal use, and will make no other use of the content without the express written permission of RideAfide and the copyright owner. You agree that you do not acquire any ownership rights in any protected content. We do not grant you any licenses, express or implied, to the intellectual property of RideAfide or our licensors except as expressly authorized by these Terms.

                            International Users
</Text>

                        </View>
                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', alignItems: 'flex-start', paddingVertical: 15, color: '#1cbbb4' }}>International Users:</Text>
                            <Text style={styles.text}>The Service is controlled, operated and administered by RideAfide from our offices within the USA. If you access the Service from a location outside the USA, you are responsible for compliance with all local laws. You agree that you will not use the RideAfide Content accessed through https://www.rideafide.com in any country or in any manner prohibited by any applicable laws, restrictions or regulations.</Text>

                        </View>

                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', alignItems: 'flex-start', paddingVertical: 15, color: '#1cbbb4' }}>Indemnification:</Text>
                            <Text style={styles.text}>You agree to indemnify, defend and hold harmless RideAfide, its officers, directors, employees, agents and third parties, for any losses, costs, liabilities and expenses (including reasonable attorney’s fees) relating to or arising out of your use of or inability to use the Site or services, any user postings made by you, your violation of any terms of this Agreement or your violation of any rights of a third party, or your violation of any applicable laws, rules or regulations. RideAfide reserves the right, at its own cost, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will fully cooperate with RideAfide in asserting any available defenses.</Text>

                        </View>
                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', alignItems: 'flex-start', paddingVertical: 15, color: '#1cbbb4' }}>Arbitration:</Text>
                            <Text style={styles.text}>In the event the parties are not able to resolve any dispute between them arising out of or concerning these Terms and Conditions, or any provisions hereof, whether in contract, tort, or otherwise at law or in equity for damages or any other relief, then such dispute shall be resolved only by final and binding arbitration pursuant to the Federal Arbitration Act, conducted by a single neutral arbitrator and administered by the American Arbitration Association, or a similar arbitration service selected by the parties, in a location mutually agreed upon by the parties. The arbitrator’s award shall be final, and judgment may be entered upon it in any court having jurisdiction. In the event that any legal or equitable action, proceeding or arbitration arises out of or concerns these Terms and Conditions, the prevailing party shall be entitled to recover its costs and reasonable attorney’s fees. The parties agree to arbitrate all disputes and claims in regards to these Terms and Conditions or any disputes arising as a result of these Terms and Conditions, whether directly or indirectly, including Tort claims that are a result of these Terms and Conditions. The parties agree that the Federal Arbitration Act governs the interpretation and enforcement of this provision. The entire dispute, including the scope and enforceability of this arbitration provision shall be determined by the Arbitrator. This arbitration provision shall survive the termination of these Terms and Conditions.</Text>

                        </View>
                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', alignItems: 'flex-start', paddingVertical: 15, color: '#1cbbb4' }}>Liability Disclaimer:</Text>
                            <Text style={styles.text}>THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN. RIDEAFIDE LLC AND/OR ITS SUPPLIERS MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THE SITE AT ANY TIME.
                            </Text>
                            <Text style={styles.text}>RIDEAFIDE LLC AND/OR ITS SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY OF THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS CONTAINED ON THE SITE FOR ANY PURPOSE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE PROVIDED “AS IS” WITHOUT WARRANTY OR CONDITION OF ANY KIND. RIDEAFIDE LLC AND/OR ITS SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT.
                            </Text>
                            <Text style={styles.text}>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL RIDEAFIDE LLC AND/OR ITS SUPPLIERS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OR PERFORMANCE OF THE SITE, WITH THE DELAY OR INABILITY TO USE THE SITE OR RELATED SERVICES, THE PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS OBTAINED THROUGH THE SITE, OR OTHERWISE ARISING OUT OF THE USE OF THE SITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF RIDEAFIDE LLC OR ANY OF ITS SUPPLIERS HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES. BECAUSE SOME STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SITE, OR WITH ANY OF THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE.
                            </Text>

                        </View>
                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', alignItems: 'flex-start', paddingVertical: 15, color: '#1cbbb4' }}>Termination/Access Restriction:</Text>
                            <Text style={styles.text}>RideAfide reserves the right, in its sole discretion, to terminate your access to the Site and the related services or any portion thereof at any time, without notice. To the maximum extent permitted by law, this agreement is governed by the laws of the State of Florida and you hereby consent to the exclusive jurisdiction and venue of courts in Florida in all disputes arising out of or relating to the use of the Site. Use of the Site is unauthorized in any jurisdiction that does not give effect to all provisions of these Terms, including, without limitation, this section.
                            </Text>
                            <Text style={styles.text}>You agree that no joint venture, partnership, employment, or agency relationship exists between you and RideAfide as a result of this agreement or use of the Site. RideAfide’s performance of this agreement is subject to existing laws and legal process, and nothing contained in this agreement is in derogation of RideAfide’s right to comply with governmental, court and law enforcement requests or requirements relating to your use of the Site or information provided to or gathered by RideAfide with respect to such use. If any part of this agreement is determined to be invalid or unenforceable pursuant to applicable law including, but not limited to, the warranty disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision and the remainder of the agreement shall continue in effect.
                            </Text>
                            <Text style={styles.text}>Unless otherwise specified herein, this agreement constitutes the entire agreement between the user and RideAfide with respect to the Site and it supersedes all prior or contemporaneous communications and proposals, whether electronic, oral or written, between the user and RideAfide with respect to the Site. A printed version of this agreement and of any notice given in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to this agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form. It is the express wish to the parties that this agreement and all related documents be written in English.
                            </Text>

                        </View>
                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', alignItems: 'flex-start', paddingVertical: 15, color: '#1cbbb4' }}>Changes to Terms:</Text>
                            <Text style={styles.text}>RideAfide reserves the right, in its sole discretion, to change the Terms under which https://www.rideafide.com is offered. The most current version of the Terms will supersede all previous versions. RideAfide encourages you to periodically review the Terms to stay informed of our updates.</Text>

                        </View>
                        <View style={{ flex: 1, width: '90%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 20, fontWeight: '500', alignItems: 'flex-start', paddingVertical: 15, color: '#1cbbb4' }}>Contact Us:</Text>
                            <Text style={styles.text}>RideAfide welcomes your questions or comments regarding the Terms:
                            </Text>
                            <Text style={styles.text}>RideAfide LLC .
                            </Text>

                            <Text style={styles.text}>Email Address: support@rideafide.com.
                            </Text>

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
        fontSize: 15,
        lineHeight: 20,
        paddingVertical: 10
    },
    text1: {
        fontSize: 12,
        fontWeight: '400'
    },
    hyperLink: {
        fontSize: 15,
        fontWeight: '400',
        color: "#686868",

    },
    heading: {
        fontSize: 30,
        fontWeight: '500',
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



export default Terms;