import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import BudgetScreen from '../screens/BudgetScreen';
import SettingsScreen from '../screens/SettingsScreen';




const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen}/>
             <Tab.Screen name='Stats' component={StatsScreen}/>
            <Tab.Screen name='Budget' component={BudgetScreen}/>
            <Tab.Screen name='Settings' component={SettingsScreen}/>
        </Tab.Navigator>
    );
}