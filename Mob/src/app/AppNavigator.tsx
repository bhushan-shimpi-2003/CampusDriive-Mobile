import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

// Navigators
import AuthNavigator from '../navigation/AuthNavigator';
import StudentNavigator from '../navigation/StudentNavigator';
import TPONavigator from '../navigation/TPONavigator';
import CoordinatorNavigator from '../navigation/CoordinatorNavigator';

// Common / Sub Screens
import ProfileBuilderScreen from '../modules/student/screens/ProfileBuilderScreen';
import ResumeUploadScreen from '../modules/student/screens/ResumeUploadScreen';
import DriveDetailsScreen from '../modules/student/screens/DriveDetailsScreen';
import OneClickApplyScreen from '../modules/student/screens/OneClickApplyScreen';
import ApplicationSuccessScreen from '../modules/student/screens/ApplicationSuccessScreen';
import CommunityChatScreen from '../modules/student/screens/CommunityChatScreen';
import NotificationsScreen from '../modules/student/screens/NotificationsScreen';
import EditProfileScreen from '../modules/student/screens/EditProfileScreen';
import StudentApplicationDetailsScreen from '../modules/student/screens/StudentApplicationDetailsScreen';

// New Student Screens
import SearchScreen from '../modules/student/screens/SearchScreen';
import SavedDrivesScreen from '../modules/student/screens/SavedDrivesScreen';
import ResumePreviewScreen from '../modules/student/screens/ResumePreviewScreen';
import CalendarScreen from '../modules/student/screens/CalendarScreen';
import AnnouncementFeedScreen from '../modules/student/screens/AnnouncementFeedScreen';

import TPOCreateDriveScreen from '../modules/tpo/screens/TPOCreateDriveScreen';
import TPOAnalyticsScreen from '../modules/tpo/screens/TPOAnalyticsScreen';
import TPONotificationsScreen from '../modules/tpo/screens/TPONotificationsScreen';
import TPOCommunitiesScreen from '../modules/tpo/screens/TPOCommunitiesScreen';
import TPODriveDetailsScreen from '../modules/tpo/screens/TPODriveDetailsScreen';
import TPOStudentProfileScreen from '../modules/tpo/screens/TPOStudentProfileScreen';
import TPOCommunityDetailsScreen from '../modules/tpo/screens/TPOCommunityDetailsScreen';

// New TPO Screens
import TPOSearchScreen from '../modules/tpo/screens/TPOSearchScreen';
import TPOCalendarScreen from '../modules/tpo/screens/TPOCalendarScreen';
import TPOAnnouncementFeedScreen from '../modules/tpo/screens/TPOAnnouncementFeedScreen';

import CreateAnnouncementScreen from '../modules/coordinator/screens/CreateAnnouncementScreen';
import RoundUpdatesScreen from '../modules/coordinator/screens/RoundUpdatesScreen';
import CoordinatorDriveDetailsScreen from '../modules/coordinator/screens/CoordinatorDriveDetailsScreen';
import CoordinatorStudentDetailsScreen from '../modules/coordinator/screens/CoordinatorStudentDetailsScreen';

// New Coordinator Screens
import CoordinatorSearchScreen from '../modules/coordinator/screens/CoordinatorSearchScreen';
import CoordinatorCalendarScreen from '../modules/coordinator/screens/CoordinatorCalendarScreen';
import CoordinatorAnnouncementFeedScreen from '../modules/coordinator/screens/CoordinatorAnnouncementFeedScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* Role Navigation Gateways */}
      <Stack.Screen name="AuthStack" component={AuthNavigator} />
      <Stack.Screen name="StudentApp" component={StudentNavigator} />
      <Stack.Screen name="TPOApp" component={TPONavigator} />
      <Stack.Screen name="CoordinatorApp" component={CoordinatorNavigator} />

      {/* Common Student Sub Screens */}
      <Stack.Screen name="ProfileBuilder" component={ProfileBuilderScreen} />
      <Stack.Screen name="ResumeUpload" component={ResumeUploadScreen} />
      <Stack.Screen name="DriveDetails" component={DriveDetailsScreen} />
      <Stack.Screen name="OneClickApply" component={OneClickApplyScreen} />
      <Stack.Screen name="ApplicationSuccess" component={ApplicationSuccessScreen} />
      <Stack.Screen name="CommunityChat" component={CommunityChatScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="StudentApplicationDetails" component={StudentApplicationDetailsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SavedDrives" component={SavedDrivesScreen} />
      <Stack.Screen name="ResumePreview" component={ResumePreviewScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="AnnouncementFeed" component={AnnouncementFeedScreen} />

      {/* TPO Sub Screens */}
      <Stack.Screen name="TPOCreateDrive" component={TPOCreateDriveScreen} />
      <Stack.Screen name="TPOAnalytics" component={TPOAnalyticsScreen} />
      <Stack.Screen name="TPONotifications" component={TPONotificationsScreen} />
      <Stack.Screen name="TPOCommunities" component={TPOCommunitiesScreen} />
      <Stack.Screen name="TPODriveDetails" component={TPODriveDetailsScreen} />
      <Stack.Screen name="TPOStudentProfile" component={TPOStudentProfileScreen} />
      <Stack.Screen name="TPOCommunityDetails" component={TPOCommunityDetailsScreen} />
      <Stack.Screen name="TPOSearch" component={TPOSearchScreen} />
      <Stack.Screen name="TPOCalendar" component={TPOCalendarScreen} />
      <Stack.Screen name="TPOAnnouncementFeed" component={TPOAnnouncementFeedScreen} />

      {/* Coordinator Sub Screens */}
      <Stack.Screen name="CreateAnnouncement" component={CreateAnnouncementScreen} />
      <Stack.Screen name="RoundUpdates" component={RoundUpdatesScreen} />
      <Stack.Screen name="CoordinatorDriveDetails" component={CoordinatorDriveDetailsScreen} />
      <Stack.Screen name="CoordinatorStudentDetails" component={CoordinatorStudentDetailsScreen} />
      <Stack.Screen name="CoordinatorSearch" component={CoordinatorSearchScreen} />
      <Stack.Screen name="CoordinatorCalendar" component={CoordinatorCalendarScreen} />
      <Stack.Screen name="CoordinatorAnnouncementFeed" component={CoordinatorAnnouncementFeedScreen} />
    </Stack.Navigator>
  );
}
