import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Kids from './kids/Kids';
import Men from './men/Men';
import Women from './womentPage/Women';

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator
        >
            <Tab.Screen name="Women"  component={Women} />
            <Tab.Screen name="Men" component={Men} />
            <Tab.Screen name="Kids" component={Kids} />
        </Tab.Navigator>
        


    );
}

export default MyTabs