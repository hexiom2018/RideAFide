import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Email from '../src/screens/email'
import Scan from '../src/screens/scan'
import Splash from '../src/screens/splash/Splash';

const StackNavigator = createStackNavigator({
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