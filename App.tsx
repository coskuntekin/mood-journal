import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddScreen from './screens/AddScreen';
import CalendarScreen from './screens/CalendarScreen';
import GraphicScreen from './screens/GraphicScreen';
import ProfileScreen from './screens/ProfileScreen';
import TimelineScreen from './screens/TimelineScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SingleScreen from './screens/SingleScreen';
import DataScreen from './screens/DataScreen';
import CalendarSettingsScreen from './screens/CalendarSettingsScreen';
import PrivacyScreen from './screens/PrivacyScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

interface TabIconProps {
  color: string;
  size: number;
}

const TimelineTabIcon: React.FC<TabIconProps> = ({color, size}) => (
  <Ionicons name="paw" color={color} size={size} />
);

const GraphicTabIcon: React.FC<TabIconProps> = ({color, size}) => (
  <Ionicons name="pie-chart" color={color} size={size} />
);

const CalendarTabIcon: React.FC<TabIconProps> = ({color, size}) => (
  <Ionicons name="calendar" color={color} size={size} />
);

const AddTabIcon: React.FC<TabIconProps> = () => {
  const day = new Date().getDate();
  return <Text style={styles.currentDay}>{day}</Text>;
};

const ProfileTabIcon: React.FC<TabIconProps> = ({color, size}) => (
  <Ionicons name="flower" color={color} size={size} />
);

const TimelineStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TimelineScreen"
        component={TimelineScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SingleScreen"
        component={SingleScreen}
        options={{
          title: 'Journal Entry',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#D1D5DB'},
          headerTintColor: '#717373',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DataScreen"
        component={DataScreen}
        options={{
          title: 'Data',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#F5FCFF',
            elevation: 0,
          },
          headerTintColor: '#717373',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <Stack.Screen
        name="CalendarSettingsScreen"
        component={CalendarSettingsScreen}
        options={{
          title: 'Calendar Settings',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#F5FCFF',
            elevation: 0,
          },
          headerTintColor: '#717373',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
      <Stack.Screen
        name="PrivacyScreen"
        component={PrivacyScreen}
        options={{
          title: 'Privacy Policy',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#F5FCFF',
            elevation: 0,
          },
          headerTintColor: '#717373',
          headerTitleStyle: {fontWeight: 'bold'},
        }}
      />
    </Stack.Navigator>
  );
};

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Timeline"
      screenOptions={{
        headerShown: false,
        tabBarAllowFontScaling: true,
        tabBarAccessibilityLabel: 'Tab Bar',
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: '#6a67f4',
        tabBarInactiveTintColor: '#a3accb',
        tabBarStyle: {display: 'flex'},
      }}>
      <Tab.Screen
        name="Timeline"
        component={TimelineStack}
        options={{
          tabBarLabel: 'Timeline',
          tabBarIcon: TimelineTabIcon,
        }}
      />
      <Tab.Screen
        name="Graphic"
        component={GraphicScreen}
        options={{
          tabBarLabel: 'Graphic',
          tabBarIcon: GraphicTabIcon,
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarLabel: 'Today',
          tabBarIcon: AddTabIcon,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: CalendarTabIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ProfileTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainApp"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  currentDay: {
    position: 'absolute',
    top: -25,
    left: 15,
    width: 50,
    height: 50,
    backgroundColor: 'tomato',
    borderRadius: 16,
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 50,
  },
});
