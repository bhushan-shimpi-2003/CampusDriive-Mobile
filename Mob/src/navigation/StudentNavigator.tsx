import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Briefcase, MessageSquare, Layers, User } from 'lucide-react-native';

import { colors } from '../config/colors';
import { StudentTabParamList } from './types';

// Screen Imports
import StudentDashboardScreen from '../modules/student/screens/StudentDashboardScreen';
import EligibleDrivesScreen from '../modules/student/screens/EligibleDrivesScreen';
import CommunitiesScreen from '../modules/student/screens/CommunitiesScreen';
import PlacementTrackerScreen from '../modules/student/screens/PlacementTrackerScreen';
import StudentProfileScreen from '../modules/student/screens/StudentProfileScreen';

const Tab = createBottomTabNavigator<StudentTabParamList>();

export default function StudentNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="StudentHome"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10.5,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="StudentHome"
        component={StudentDashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="StudentDrives"
        component={EligibleDrivesScreen}
        options={{
          tabBarLabel: 'Drives',
          tabBarIcon: ({ color, size }) => <Briefcase size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="StudentCommunities"
        component={CommunitiesScreen}
        options={{
          tabBarLabel: 'Channels',
          tabBarIcon: ({ color, size }) => <MessageSquare size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="StudentTracker"
        component={PlacementTrackerScreen}
        options={{
          tabBarLabel: 'Tracker',
          tabBarIcon: ({ color, size }) => <Layers size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="StudentProfile"
        component={StudentProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
