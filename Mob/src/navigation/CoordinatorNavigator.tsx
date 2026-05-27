import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, Briefcase, ClipboardCheck, MessageSquare, MoreHorizontal } from 'lucide-react-native';

import { colors } from '../config/colors';
import { CoordinatorTabParamList } from './types';

// Screen Imports
import CoordinatorDashboardScreen from '../modules/coordinator/screens/CoordinatorDashboardScreen';
import AssignedDrivesScreen from '../modules/coordinator/screens/AssignedDrivesScreen';
import StudentVerificationScreen from '../modules/coordinator/screens/StudentVerificationScreen';
import CoordinatorCommunityScreen from '../modules/coordinator/screens/CoordinatorCommunityScreen';
import CoordinatorMoreScreen from '../modules/coordinator/screens/CoordinatorMoreScreen';

const Tab = createBottomTabNavigator<CoordinatorTabParamList>();

export default function CoordinatorNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="CoordinatorDashboard"
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
        name="CoordinatorDashboard"
        component={CoordinatorDashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <LayoutDashboard size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="CoordinatorDrives"
        component={AssignedDrivesScreen}
        options={{
          tabBarLabel: 'Drives',
          tabBarIcon: ({ color }) => <Briefcase size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="CoordinatorVerify"
        component={StudentVerificationScreen}
        options={{
          tabBarLabel: 'Verify',
          tabBarIcon: ({ color }) => <ClipboardCheck size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="CoordinatorCommunities"
        component={CoordinatorCommunityScreen}
        options={{
          tabBarLabel: 'Channels',
          tabBarIcon: ({ color }) => <MessageSquare size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="CoordinatorMore"
        component={CoordinatorMoreScreen}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => <MoreHorizontal size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
