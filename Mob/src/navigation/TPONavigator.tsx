import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, Briefcase, Users, Layers, MoreHorizontal } from 'lucide-react-native';

import { colors } from '../config/colors';
import { TPOTabParamList } from './types';

// Screen Imports
import TPODashboardScreen from '../modules/tpo/screens/TPODashboardScreen';
import TPODriveManagementScreen from '../modules/tpo/screens/TPODriveManagementScreen';
import TPOApplicationsScreen from '../modules/tpo/screens/TPOApplicationsScreen';
import TPOStudentDatabaseScreen from '../modules/tpo/screens/TPOStudentDatabaseScreen';
import TPOMoreScreen from '../modules/tpo/screens/TPOMoreScreen';

const Tab = createBottomTabNavigator<TPOTabParamList>();

export default function TPONavigator() {
  return (
    <Tab.Navigator
      initialRouteName="TPODashboard"
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
        name="TPODashboard"
        component={TPODashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <LayoutDashboard size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="TPODrives"
        component={TPODriveManagementScreen}
        options={{
          tabBarLabel: 'Drives',
          tabBarIcon: ({ color }) => <Briefcase size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="TPOApplications"
        component={TPOApplicationsScreen}
        options={{
          tabBarLabel: 'Applications',
          tabBarIcon: ({ color }) => <Layers size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="TPOStudents"
        component={TPOStudentDatabaseScreen}
        options={{
          tabBarLabel: 'Students',
          tabBarIcon: ({ color }) => <Users size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="TPOMore"
        component={TPOMoreScreen}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => <MoreHorizontal size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
