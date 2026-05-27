import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  User,
  Bell,
  Briefcase,
  Layers,
  FileText,
  CheckCircle,
  Calendar,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  Search,
  Bookmark
} from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { constants } from '../../../config/constants';
import { globalStyles } from '../../../styles/globalStyles';
import { RootStackParamList } from '../../../navigation/types';
import { ProgressBar } from '../../../components/ProgressBar';
import { StatCard } from '../../../components/StatCard';
import { AppCard } from '../../../components/AppCard';
import { SectionHeader } from '../../../components/SectionHeader';
import { LoadingSkeleton } from '../../../components/LoadingSkeleton';
import { mockStudentProfile, mockPlacementDrives, mockCommunities, mockNotifications } from '../../../data/mockData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function StudentDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const activeDrivesCount = mockPlacementDrives.filter(d => d.status === 'Active').length;
  const unreadNotificationsCount = mockNotifications.filter(n => !n.isRead).length;

  const quickActions = [
    {
      title: 'Complete Profile',
      icon: <User size={20} color={colors.primary} />,
      bgColor: colors.primaryLight,
      onPress: () => navigation.navigate('ProfileBuilder'),
    },
    {
      title: 'Upload Resume',
      icon: <FileText size={20} color={colors.secondary} />,
      bgColor: colors.secondaryLight,
      onPress: () => navigation.navigate('ResumeUpload'),
    },
    {
      title: 'Saved Drives',
      icon: <Bookmark size={20} color={colors.warning} />,
      bgColor: colors.warningLight,
      onPress: () => navigation.navigate('SavedDrives'),
    },
    {
      title: 'Track Apps',
      icon: <Layers size={20} color={colors.success} />,
      bgColor: colors.successLight,
      onPress: () => navigation.navigate('StudentApp', { screen: 'StudentTracker' }),
    },
  ];

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      {/* Top Custom Header */}
      <View style={styles.topHeader}>
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>BS</Text>
          </View>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>{mockStudentProfile.personal.fullName}</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.bellButton}
            onPress={() => navigation.navigate('Search')}
            activeOpacity={0.7}
          >
            <Search size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bellButton}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.7}
          >
            <Bell size={22} color={colors.text} />
            {unreadNotificationsCount > 0 && (
              <View style={styles.bellBadge}>
                <Text style={styles.badgeText}>{unreadNotificationsCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.scrollContainer}>
        {isLoading ? (
          <LoadingSkeleton type="cards" count={3} />
        ) : (
          <>
            {/* Profile Progress Card */}
        <AppCard style={styles.progressCard} onPress={() => navigation.navigate('ProfileBuilder')}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>Unified Recruitment Profile</Text>
              <Text style={styles.progressDesc}>Build profile once, apply everywhere.</Text>
            </View>
            <TrendingUp size={20} color={colors.primary} />
          </View>
          <ProgressBar progress={mockStudentProfile.profileCompletionPercentage} showLabel={true} />
        </AppCard>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Eligible Drives"
            value={activeDrivesCount}
            icon={<Briefcase size={20} color={colors.primary} />}
            subValue="Matching your profile"
            iconBackgroundColor={colors.primaryLight}
            style={styles.statCardHalf}
          />
          <StatCard
            title="Applied Drives"
            value="4"
            icon={<CheckCircle size={20} color={colors.success} />}
            subValue="Track real-time rounds"
            iconBackgroundColor={colors.successLight}
            style={styles.statCardHalf}
          />
        </View>

        {/* Upcoming Interview Banner */}
        <SectionHeader
          title="Interview Alerts"
          actionTitle="View Calendar"
          onAction={() => navigation.navigate('Calendar')}
        />
        <AppCard style={styles.interviewCard}>
          <TouchableOpacity
            style={styles.interviewRow}
            onPress={() => navigation.navigate('Calendar')}
            activeOpacity={0.7}
          >
            <View style={styles.calendarCircle}>
              <Calendar size={22} color={colors.warning} />
            </View>
            <View style={styles.interviewDetails}>
              <Text style={styles.interviewCompany}>Infosys Ltd. (Specialist Programmer)</Text>
              <Text style={styles.interviewTime}>Tomorrow, 10:00 AM • Lab 3 (TPO Block)</Text>
              <Text style={styles.interviewRound}>Technical Round Panel #2</Text>
            </View>
          </TouchableOpacity>
        </AppCard>

        {/* Quick Actions */}
        <SectionHeader title="Quick Operations" />
        <View style={styles.quickGrid}>
          {quickActions.map((act, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionItem}
              onPress={act.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconWrapper, { backgroundColor: act.bgColor }]}>
                {act.icon}
              </View>
              <Text style={styles.actionTitle}>{act.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Latest Announcements */}
        <SectionHeader
          title="Placement Cell Announcements"
          actionTitle="All"
          onAction={() => navigation.navigate('AnnouncementFeed')}
        />
        <AppCard style={styles.announcementCard} onPress={() => navigation.navigate('AnnouncementFeed')}>
          <View style={styles.announcementItem}>
            <View style={styles.announcementBadge}>
              <Text style={styles.announcementBadgeText}>Urgent</Text>
            </View>
            <Text style={styles.announcementText}>
              All students shortlisted for Accenture AASE must verify their CGPA credentials in the TPO cell before June 2nd.
            </Text>
            <Text style={styles.announcementTime}>TPO • 2 hours ago</Text>
          </View>
        </AppCard>

        {/* Active Communities */}
        <SectionHeader
          title="My Placement Channels"
          actionTitle="Explore"
          onAction={() => navigation.navigate('StudentApp', { screen: 'StudentCommunities' })}
        />
        {mockCommunities.slice(0, 3).map((comm) => (
          <TouchableOpacity
            key={comm.id}
            style={styles.communityRow}
            onPress={() => navigation.navigate('CommunityChat', { communityId: comm.id })}
            activeOpacity={0.7}
          >
            <View style={styles.communityAvatar}>
              <Text style={styles.communityAvatarText}>{comm.companyName[0]}</Text>
            </View>
            <View style={styles.communityInfo}>
              <Text style={styles.communityName}>{comm.companyName} Recruitment Group</Text>
              <Text style={styles.communityLastMsg} numberOfLines={1}>
                {comm.lastMessage}
              </Text>
            </View>
            <View style={styles.communityRight}>
              {comm.unreadCount > 0 ? (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{comm.unreadCount}</Text>
                </View>
              ) : (
                <ChevronRight size={18} color={colors.textMuted} />
              )}
            </View>
          </TouchableOpacity>
        ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 16,
  },
  welcomeText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bellButton: {
    padding: 8,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  bellBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '800',
  },
  progressCard: {
    marginTop: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  progressDesc: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statCardHalf: {
    flex: 1,
    marginHorizontal: 0,
    marginRight: 8,
  },
  interviewCard: {
    borderColor: colors.warning,
    borderWidth: 1,
  },
  interviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.warningLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  interviewDetails: {
    flex: 1,
  },
  interviewCompany: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  interviewTime: {
    fontSize: 13,
    color: colors.warning,
    fontWeight: '600',
    marginTop: 3,
  },
  interviewRound: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
  },
  actionIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  announcementCard: {
    backgroundColor: colors.surface,
  },
  announcementItem: {
    paddingVertical: 4,
  },
  announcementBadge: {
    backgroundColor: colors.errorLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  announcementBadgeText: {
    color: colors.error,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  announcementText: {
    fontSize: 13.5,
    color: colors.text,
    lineHeight: 19,
  },
  announcementTime: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 8,
    fontWeight: '500',
  },
  communityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  communityAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  communityAvatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  communityInfo: {
    flex: 1,
    paddingRight: 8,
  },
  communityName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  communityLastMsg: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  communityRight: {
    alignItems: 'flex-end',
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
});
