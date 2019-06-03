import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Email from '../src/screens/email'
import Scan from '../src/screens/scan'

const StackNavigator = createStackNavigator({
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