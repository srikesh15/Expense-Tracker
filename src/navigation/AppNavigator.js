import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';




const Stack = createNativeStackNavigator();

export default function AppNavigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Tabs' screenOptions={{headerShown:false}}>
                <Stack.Screen name='Tabs' component={TabNavigator}/>
                <Stack.Screen name='AddTransaction' component={AddTransactionScreen}/>
                <Stack.Screen name='TransactionDetail' component={TransactionDetailScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
        
    );
}