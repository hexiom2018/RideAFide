import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Email from '../src/screens/email'
import Scan from '../src/screens/scan'
import Splash from '../src/screens/splash/Splash';
import LogIn from '../src/screens/authentication/LogIn'
import SignUp from '../src/screens/authentication/SignUp'
const StackNavigator = createStackNavigator({

    LogIn:{
        screen:LogIn
    },
    SignUp:{
        screen:SignUp
    },
    Splash: {
        screen: Splash
    },
    Email: {
        screen: Email
    },
    Scan: {
        screen: Scan
    },
  
},
);

const Navigation = createAppContainer(StackNavigator)
export default Navigation;