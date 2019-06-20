import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Email from '../src/screens/email'
import Scan from '../src/screens/scan'
import Splash from '../src/screens/splash/Splash';
import LogIn from '../src/screens/authentication/LogIn'
import SignUp from '../src/screens/authentication/SignUp'
import ForgetPassword from '../src/screens/authentication/forgetPassword'
import UpdatePassword from '../src/screens/authentication/UpdatePassword'

const StackNavigator = createStackNavigator({
    LogIn: {
        screen: Email
    },
    UpdatePassword: {
        screen: UpdatePassword
    },
    Splash: {
        screen: Splash
    },
    SignUp: {
        screen: SignUp
    },
    ForgetPassword: {
        screen: ForgetPassword
    },
    // Email: {
    //     screen: Email
    // },
    Scan: {
        screen: Scan
    },

},
);

const Navigation = createAppContainer(StackNavigator)
export default Navigation;