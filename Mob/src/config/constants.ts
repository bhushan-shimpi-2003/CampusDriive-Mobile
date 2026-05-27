export const constants = {
  appName: 'CampusDrive',
  tagline: 'Build Profile Once, Apply Everywhere',
  demoCredentials: {
    student: {
      email: 'student@campusdrive.demo',
      password: 'demo123',
      role: 'student' as const,
      name: 'Bhushan Shimpi',
    },
    tpo: {
      email: 'tpo@campusdrive.demo',
      password: 'demo123',
      role: 'tpo' as const,
      name: 'Dr. R. K. Patil (TPO)',
    },
    coordinator: {
      email: 'coordinator@campusdrive.demo',
      password: 'demo123',
      role: 'coordinator' as const,
      name: 'Amit Sharma (PC)',
    },
  },
  departments: [
    'Computer Engineering',
    'Information Technology',
    'Electronics & Telecommunication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
  ],
  passingYears: ['2024', '2025', '2026', '2027'],
  jobTypes: ['Full-time', 'Internship', 'Both'],
  workModes: ['On-site', 'Remote', 'Hybrid'],
  applicationStatuses: [
    'Applied',
    'Shortlisted',
    'Aptitude Round',
    'Technical Round',
    'HR Round',
    'Selected',
    'Rejected',
  ] as const,
};
