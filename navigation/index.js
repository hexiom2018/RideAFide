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

import Setting from  '../src/screens/setting'

const StackNavigator = createStackNavigator({
    
    Splash: {
        screen: Splash
    },
    LogIn: {
        screen: Email
    },
    UpdatePassword: {
        screen: UpdatePassword
    },
    SignUp: {
        screen: SignUp
    },
    ForgetPassword: {
        screen: ForgetPassword
    },
    Setting: {
        screen: Setting
    },
    Scan: {
        screen: Scan
    },
    PersonalInfo: {
        screen: PersonalInfo
    },
    Emergency: {
        screen: Emergency
    },
   

},
);

const Navigation = createAppContainer(StackNavigator)
export default Navigation;