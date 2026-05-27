export type UserRole = 'student' | 'tpo' | 'coordinator';

export interface PersonalDetails {
  fullName: string;
  email: string;
  mobileNumber: string;
  address: string;
  linkedIn: string;
  gitHub: string;
}

export interface AcademicDetails {
  collegeName: string;
  course: string;
  department: string;
  passingYear: string;
  cgpa: number;
  tenthPercentage: number;
  twelfthOrDiplomaPercentage: number;
  activeBacklogs: number;
  historyOfBacklogs: number;
}

export interface SkillSet {
  languages: string[];
  frameworks: string[];
  databases: string[];
  softSkills: string[];
}

export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  gitHubLink?: string;
  liveLink?: string;
}

export interface PreferenceDetail {
  jobType: 'Internship' | 'Full-time' | 'Both';
  preferredRole: string;
  preferredLocation: string;
  expectedPackage: string;
}

export interface StudentProfile {
  personal: PersonalDetails;
  academic: AcademicDetails;
  skills: SkillSet;
  projects: ProjectDetail[];
  preferences: PreferenceDetail;
  resumeUrl?: string;
  resumeName?: string;
  profileCompletionPercentage: number;
}

export interface Student {
  prn: string;
  name: string;
  email: string;
  mobile: string;
  department: string;
  cgpa: number;
  skills: string[];
  resumeStatus: 'Uploaded' | 'Pending';
  placementStatus: 'Placed' | 'Unplaced' | 'In Process';
  eligibilityScore: number; // 0 to 100
  activeBacklogs: number;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
}

export type ApplicationStatus =
  | 'Applied'
  | 'Shortlisted'
  | 'Aptitude Round'
  | 'Technical Round'
  | 'HR Round'
  | 'Selected'
  | 'Rejected';

export interface PlacementDrive {
  id: string;
  companyId: string;
  companyName: string;
  role: string;
  packageOffer: string; // e.g. "12 LPA", "6 LPA"
  location: string;
  jobType: 'Full-time' | 'Internship';
  workMode: 'On-site' | 'Remote' | 'Hybrid';
  description: string;
  requiredSkills: string[];
  minCGPA: number;
  departments: string[];
  passingYear: string;
  backlogsAllowed: boolean;
  selectionRounds: string[];
  importantDates: { label: string; date: string }[];
  documentsRequired: string[];
  deadline: string;
  status: 'Active' | 'Closed' | 'Upcoming';
  applicantsCount: number;
  eligibleCount: number;
  autoCreateCommunity: boolean;
}

export interface Application {
  id: string;
  driveId: string;
  studentPrn: string;
  studentName: string;
  studentDept: string;
  companyName: string;
  role: string;
  packageOffer: string;
  status: ApplicationStatus;
  nextStep: string;
  date: string;
  eligibilityScore: number;
}

export interface Community {
  id: string;
  companyId: string;
  companyName: string;
  role: string;
  memberCount: number;
  lastMessage: string;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
}

export interface CommunityMessage {
  id: string;
  communityId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  isPinned?: boolean;
  type: 'chat' | 'announcement' | 'resource' | 'schedule';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'drive' | 'deadline' | 'interview' | 'result' | 'community' | 'profile';
  actionLink?: string;
}

export interface TPOAnalytics {
  totalStudents: number;
  eligibleStudents: number;
  activeDrives: number;
  applicationsReceived: number;
  selectedStudents: number;
  highestPackage: string;
  averagePackage: string;
  upcomingInterviews: number;
  departmentWisePlacements: { name: string; percentage: number; placed: number }[];
  companyWiseHiring: { company: string; count: number }[];
  monthlyApplications: { month: string; count: number }[];
  selectionFunnel: { stage: string; count: number }[];
}

export interface CoordinatorTask {
  id: string;
  driveId: string;
  companyName: string;
  role: string;
  deadline: string;
  applicantsCount: number;
  currentRound: string;
  status: 'Active' | 'Completed';
}

// ─── New Feature Types ───────────────────────────────────────────────────────

export type SearchResultType = 'drive' | 'student' | 'community' | 'announcement' | 'application';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  relatedId?: string;
}

export interface SavedDrive {
  driveId: string;
  savedAt: string;
}

export type CalendarEventType = 'interview' | 'deadline' | 'drive' | 'announcement' | 'result';

export interface CalendarEvent {
  id: string;
  title: string;
  type: CalendarEventType;
  date: string;        // 'YYYY-MM-DD'
  time?: string;       // 'HH:MM AM/PM'
  description: string;
  location?: string;
  relatedId?: string;  // driveId or applicationId for navigation
}

export type AnnouncementCategory = 'all' | 'drives' | 'communities' | 'results' | 'deadlines';

export interface Announcement {
  id: string;
  title: string;
  body: string;
  category: Exclude<AnnouncementCategory, 'all'>;
  isPinned: boolean;
  time: string;
  isRead: boolean;
  author: string;
  authorRole: 'tpo' | 'coordinator' | 'system';
  relatedId?: string;
}

export type NotificationCategory = 'all' | 'applications' | 'communities' | 'announcements' | 'interviews';

export interface CommunityResource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'video' | 'doc';
  description: string;
  uploadedBy: string;
  uploadedAt: string;
  size?: string;
}

export interface CommunityReaction {
  emoji: string;
  count: number;
}

export interface DriveFilter {
  workMode?: 'On-site' | 'Remote' | 'Hybrid';
  jobType?: 'Full-time' | 'Internship';
  department?: string;
  eligible?: boolean;
}

export interface ProfileCompletionItem {
  label: string;
  completed: boolean;
  route: 'EditProfile' | 'ProfileBuilder' | 'ResumeUpload';
}

