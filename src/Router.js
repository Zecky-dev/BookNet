import React,{useState,useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginRegister from './Screens/LoginRegister/LoginRegister';
import Home from './Screens/Home/Home';
import AddBook from './Screens/AddBook/AddBook';


import auth from '@react-native-firebase/auth';
import FlashMessage from 'react-native-flash-message';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './utils/colors';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import FavoriteBooks from './Screens/FavoriteBooks/FavoriteBooks';
import Profile from './Screens/Profile/Profile';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const headerStyles = {
  headerRight: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  headerTitleStyle: {
    color: colors.white,
  },
  headerContainerStyle: {
    backgroundColor: colors.primary,
  }
};



const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='LoginRegister' component={LoginRegister}/>
        </Stack.Navigator>
    )
}

const MainTabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Social"
          component={Home}
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => auth().signOut()}
                style={headerStyles.headerRight}>
                <Icon name="logout" size={28} color={colors.black} />
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
            headerTitleStyle: headerStyles.headerTitleStyle,
            headerStyle: headerStyles.headerContainerStyle,
            headerTitle: 'Social',
            tabBarIcon: ({focused, color, size}) => (
              <Icon name={focused ? 'post' : 'post-outline'} size={24} />
            ),
          }}
        />

        <Tab.Screen
          name="Favorites"
          component={FavoriteBooks}
          options={{
            headerTitleAlign: 'center',
            headerTitle: 'Favorites',
            headerStyle: headerStyles.headerContainerStyle,
            headerTitleStyle: headerStyles.headerTitleStyle,
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name={focused ? 'heart' : 'heart-outline'}
                size={24}
                color={focused ? 'red' : null}
              />
            ),
          }}
        />

        
        <Tab.Screen
          name="Add Book"
          component={AddBook}
          options={{
            headerTitleAlign: 'center',
            headerTitle: 'Add Book',
            headerStyle: headerStyles.headerContainerStyle,
            headerTitleStyle: headerStyles.headerTitleStyle,
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name={focused ? 'plus-circle' : 'plus-circle-outline'}
                size={24}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitleAlign: 'center',
            headerTitle: 'Profile',
            headerStyle: headerStyles.headerContainerStyle,
            headerTitleStyle: headerStyles.headerTitleStyle,
            tabBarIcon: ({focused, color, size}) => (
              <Icon name={focused ? 'account' : 'account-outline'} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    );
}


const Router = () => {


    // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

    return (
      <GestureHandlerRootView style={{flex: 1,}}>
      <NavigationContainer>
        {user ? <MainTabs /> : <AuthStack />}
        <FlashMessage position={"top"}/>
      </NavigationContainer>
      </GestureHandlerRootView>
    );
}

export default Router;