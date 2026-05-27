import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User, FileText, BookOpen, Layers, Settings, HelpCircle, LogOut, ChevronRight, GraduationCap } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { Badge } from '../../../components/Badge';
import { ProfileCompletionMeter } from '../../../components/ProfileCompletionMeter';
import { AppCard } from '../../../components/AppCard';
import { mockStudentProfile } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function StudentProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const student = mockStudentProfile;

  const handleLogout = () => {
    Alert.alert(
      'Signing Out',
      'Are you sure you want to end your demo session and logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            navigation.replace('AuthStack', { screen: 'Login' });
          },
        },
      ]
    );
  };

  const profileOptions = [
    {
      title: 'Academic Details',
      subtitle: 'CGPA: 9.2 • Computer Engineering',
      icon: <GraduationCap size={18} color={colors.primary} />,
      onPress: () => navigation.navigate('ProfileBuilder'),
    },
    {
      title: 'Resume & Documents',
      subtitle: 'Active: Bhushan_Shimpi_Resume.pdf',
      icon: <FileText size={18} color={colors.secondary} />,
      onPress: () => navigation.navigate('ResumeUpload'),
    },
    {
      title: 'Skills & Achievements',
      subtitle: 'Languages, Databases, Frameworks',
      icon: <Layers size={18} color={colors.success} />,
      onPress: () => navigation.navigate('ProfileBuilder'),
    },
  ];

  const appOptions = [
    {
      title: 'Recruitment Settings',
      icon: <Settings size={18} color={colors.textMuted} />,
      onPress: () => Alert.alert('Demo Settings', 'General notification configurations are auto-managed in this demo.'),
    },
    {
      title: 'Help & Support Cell',
      icon: <HelpCircle size={18} color={colors.textMuted} />,
      onPress: () => Alert.alert('TPO Helpdesk', 'Please contact placement-cell@college.edu for account query issues.'),
    },
  ];

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Student Profile"
        showNotification={true}
        notificationCount={2}
        onNotificationPress={() => navigation.navigate('Notifications')}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.scrollContainer}>
        {/* Profile Card Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>BS</Text>
          </View>
          <Text style={styles.nameText}>{student.personal.fullName}</Text>
          <Text style={styles.emailText}>{student.personal.email}</Text>
          
          <View style={styles.profileTagRow}>
            <Badge label="2026 Batch" variant="primary" style={styles.tagMargin} />
            <Badge label="Computer Engg" variant="info" />
          </View>
        </View>

        {/* Profile Completion percentage */}
        <AppCard style={styles.progressCard} onPress={() => navigation.navigate('ProfileBuilder')}>
          <ProfileCompletionMeter />
        </AppCard>

        {/* Edit Profile Button */}
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => navigation.navigate('EditProfile')}
          activeOpacity={0.8}
        >
          <Settings size={18} color={colors.primary} />
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Resume quick stats */}
        <Text style={styles.sectionHeader}>Placement Records</Text>
        {profileOptions.map((opt, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionItem}
            onPress={opt.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.optionLeft}>
              <View style={styles.iconCircle}>
                {opt.icon}
              </View>
              <View style={styles.optionTextWrapper}>
                <Text style={styles.optionTitle}>{opt.title}</Text>
                <Text style={styles.optionSub}>{opt.subtitle}</Text>
              </View>
            </View>
            <ChevronRight size={16} color={colors.textMuted} />
          </TouchableOpacity>
        ))}

        {/* General options */}
        <Text style={styles.sectionHeader}>System Options</Text>
        {appOptions.map((opt, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionItem}
            onPress={opt.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.optionLeft}>
              <View style={[styles.iconCircle, styles.grayCircle]}>
                {opt.icon}
              </View>
              <View style={styles.optionTextWrapper}>
                <Text style={styles.optionTitle}>{opt.title}</Text>
              </View>
            </View>
            <ChevronRight size={16} color={colors.textMuted} />
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <LogOut size={18} color={colors.error} />
          <Text style={styles.logoutText}>Sign Out from Demo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '800',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  emailText: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
    fontWeight: '500',
  },
  profileTagRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  tagMargin: {
    marginRight: 8,
  },
  progressCard: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary + '25',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 20,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 8,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  grayCircle: {
    backgroundColor: '#FAFAFA',
  },
  optionTextWrapper: {
    justifyContent: 'center',
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  optionSub: {
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.errorLight,
    borderWidth: 1,
    borderColor: colors.error + '25',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 32,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.error,
    marginLeft: 8,
  },
});
