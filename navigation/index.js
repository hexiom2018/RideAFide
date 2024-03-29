import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Email from '../src/screens/email'
import Scan from '../src/screens/scan'
import Splash from '../src/screens/splash/Splash';
import LogIn from '../src/screens/authentication/LogIn'
import SignUp from '../src/screens/authentication/SignUp'
import ForgetPassword from '../src/screens/authentication/forgetPassword'
import UpdatePassword from '../src/screens/authentication/UpdatePassword'
import PersonalInfo from '../src/screens/authentication/personal_info'
import Emergency from '../src/screens/authentication/emergency_section'
import EmergencyContacts from '../src/screens/setting/EmergencyContacts'
import Setting from  '../src/screens/setting'
import ProfileDetails from '../src/screens/setting/ProfileDetails'
import QrHistory from '../src/screens/setting/QrHistory'
import About from '../src/screens/setting/about'
import Terms from '../src/screens/setting/Terms'
import SettingTerms from '../src/screens/authentication/SettingTerms'


const StackNavigator = createStackNavigator({
   
    Splash: {
        screen: Splash
    },
    QrHistory: {
        screen: QrHistory
    },
    SignUp: {
        screen: SignUp
    },
    LogIn: {
        screen: Email
    },
    UpdatePassword: {
        screen: UpdatePassword
    },
    
    ForgetPassword: {
        screen: ForgetPassword
    },
    
    Scan: {
        screen: Scan
    },
    Setting: {
        screen: Setting
    },
    Terms: {
        screen: Terms
    },
    About: {
        screen: About
    },
    PersonalInfo: {
        screen: PersonalInfo
    },
    Emergency: {
        screen: Emergency
    },
    EmergencyContacts: {
        screen: EmergencyContacts
    },
    ProfileDetails: {
        screen: ProfileDetails
    },
    SettingTerms: {
        screen: SettingTerms
    },
},
);

const Navigation = createAppContainer(StackNavigator)
export default Navigation;