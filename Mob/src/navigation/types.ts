import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  RoleSelection: undefined;
  ForgotPassword: undefined;
};

export type StudentTabParamList = {
  StudentHome: undefined;
  StudentDrives: undefined;
  StudentCommunities: undefined;
  StudentTracker: undefined;
  StudentProfile: undefined;
};

export type TPOTabParamList = {
  TPODashboard: undefined;
  TPODrives: undefined;
  TPOApplications: undefined;
  TPOStudents: undefined;
  TPOMore: undefined;
};

export type CoordinatorTabParamList = {
  CoordinatorDashboard: undefined;
  CoordinatorDrives: undefined;
  CoordinatorVerify: undefined;
  CoordinatorCommunities: undefined;
  CoordinatorMore: undefined;
};

export type RootStackParamList = {
  // Navigation Stacks
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  StudentApp: NavigatorScreenParams<StudentTabParamList>;
  TPOApp: NavigatorScreenParams<TPOTabParamList>;
  CoordinatorApp: NavigatorScreenParams<CoordinatorTabParamList>;
  
  // Student Screens
  ProfileBuilder: undefined;
  ResumeUpload: undefined;
  DriveDetails: { driveId: string };
  OneClickApply: { driveId: string };
  ApplicationSuccess: { driveId: string; companyName: string; applicationId?: string };
  CommunityChat: { communityId: string };
  Notifications: undefined;

  // New Student Feature Screens
  Search: undefined;
  SavedDrives: undefined;
  ResumePreview: undefined;
  Calendar: undefined;
  AnnouncementFeed: undefined;

  EditProfile: undefined;
  StudentApplicationDetails: { applicationId: string };
  
  // TPO Screens
  TPOCreateDrive: undefined;
  TPOAnalytics: undefined;
  TPONotifications: undefined;
  TPOCommunities: undefined;
  TPOStudentDetails: { studentPrn: string };
  TPODriveDetails: { driveId: string };
  TPOStudentProfile: { studentId: string };
  TPOCommunityDetails: { communityId: string };
  TPOSearch: undefined;
  TPOCalendar: undefined;
  TPOAnnouncementFeed: undefined;
  

  // Coordinator Screens
  CreateAnnouncement: undefined;
  RoundUpdates: undefined;
  CoordinatorDriveDetails: { driveId: string };
  CoordinatorStudentDetails: { studentId: string };
  CoordinatorSearch: undefined;
  CoordinatorCalendar: undefined;
  CoordinatorAnnouncementFeed: undefined;
};
