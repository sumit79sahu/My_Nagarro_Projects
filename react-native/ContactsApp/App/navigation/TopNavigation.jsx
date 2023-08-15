import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ContactList from '../screens/ContactList';
import FavouriteContactList from '../screens/FavouriteContactList';

const Tab = createBottomTabNavigator();

const TopNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false,tabBarLabelStyle:{fontSize:25,marginBottom:5},tabBarIconStyle:{display:"none"}}}>
      <Tab.Screen name="Contact List" component={ContactList} />
      <Tab.Screen name="Favourite" component={FavouriteContactList} />
    </Tab.Navigator>
  );
};

export default TopNavigation;
