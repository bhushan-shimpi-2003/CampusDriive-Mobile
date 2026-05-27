import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Users,
  Briefcase,
  Layers,
  Award,
  Calendar,
  PlusCircle,
  Bell,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  Search
} from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { StatCard } from '../../../components/StatCard';
import { AppCard } from '../../../components/AppCard';
import { SectionHeader } from '../../../components/SectionHeader';
import { mockTPOAnalytics, mockPlacementDrives, mockApplications } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TPODashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const stats = mockTPOAnalytics;

  const quickActions = [
    {
      title: 'Create Drive',
      icon: <PlusCircle size={20} color={colors.primary} />,
      bgColor: colors.primaryLight,
      onPress: () => navigation.navigate('TPOCreateDrive'),
    },
    {
      title: 'Applications',
      icon: <Layers size={20} color={colors.secondary} />,
      bgColor: colors.secondaryLight,
      onPress: () => navigation.navigate('TPOApp', { screen: 'TPOApplications' }),
    },
    {
      title: 'Calendar',
      icon: <Calendar size={20} color={colors.warning} />,
      bgColor: colors.warningLight,
      onPress: () => navigation.navigate('TPOCalendar'),
    },
    {
      title: 'Communities',
      icon: <MessageSquare size={20} color={colors.success} />,
      bgColor: colors.successLight,
      onPress: () => navigation.navigate('TPOCommunities'),
    },
  ];

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      {/* TPO Top Custom Header */}
      <View style={styles.headerRow}>
        <View style={styles.tpoInfo}>
          <View style={styles.tpoAvatar}>
            <Text style={styles.avatarText}>CD</Text>
          </View>
          <View>
            <Text style={styles.headerLabel}>PLACEMENT CELL ADMIN</Text>
            <Text style={styles.tpoName}>Dr. R. K. Patil (TPO)</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={[styles.headerActionBtn, { marginRight: 8 }]}
            onPress={() => navigation.navigate('TPOSearch')}
            activeOpacity={0.7}
          >
            <Search size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerActionBtn}
            onPress={() => navigation.navigate('TPONotifications')}
            activeOpacity={0.7}
          >
            <Bell size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.scrollContainer}>
        {/* Banner Analytics Summary */}
        <AppCard style={styles.bannerCard} onPress={() => navigation.navigate('TPOAnalytics')}>
          <View style={styles.bannerRow}>
            <View style={styles.bannerTextCol}>
              <Text style={styles.bannerLabel}>2026 PLACEMENT RATIO</Text>
              <Text style={styles.bannerPercentage}>
                {Math.round((stats.selectedStudents / stats.eligibleStudents) * 100)}% Placed
              </Text>
              <Text style={styles.bannerSub}>
                {stats.selectedStudents} offers secured out of {stats.eligibleStudents} students
              </Text>
            </View>
            <TrendingUp size={44} color={colors.white} strokeWidth={2.5} style={styles.bannerTrendIcon} />
          </View>
        </AppCard>

        {/* Quick actions panel */}
        <View style={styles.quickGrid}>
          {quickActions.map((act, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionItem}
              onPress={act.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIcon, { backgroundColor: act.bgColor }]}>
                {act.icon}
              </View>
              <Text style={styles.actionTitle}>{act.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Section Grid */}
        <SectionHeader title="Recruitment Metrics" />
        <View style={styles.statsRow}>
          <StatCard
            title="Total Database"
            value={stats.totalStudents}
            icon={<Users size={16} color={colors.primary} />}
            subValue="Registered Students"
            style={styles.statCol}
          />
          <StatCard
            title="Active Drives"
            value={stats.activeDrives}
            icon={<Briefcase size={16} color={colors.secondary} />}
            subValue="Corporate Channels"
            style={styles.statCol}
          />
        </View>

        <View style={styles.statsRow}>
          <StatCard
            title="Average CTC"
            value={stats.averagePackage}
            icon={<Award size={16} color={colors.success} />}
            subValue={`Highest: ${stats.highestPackage}`}
            style={styles.statCol}
          />
          <StatCard
            title="Applications"
            value={stats.applicationsReceived}
            icon={<Layers size={16} color={colors.warning} />}
            subValue={`${stats.upcomingInterviews} interviews today`}
            style={styles.statCol}
          />
        </View>

        {/* Recent Drives Card */}
        <SectionHeader
          title="Active Corporate Channels"
          actionTitle="All"
          onAction={() => navigation.navigate('TPOApp', { screen: 'TPODrives' })}
        />
        {mockPlacementDrives.slice(0, 3).map((drive) => (
          <TouchableOpacity
            key={drive.id}
            style={styles.driveRow}
            onPress={() => navigation.navigate('TPODriveDetails', { driveId: drive.id })}
            activeOpacity={0.7}
          >
            <View style={styles.driveLeft}>
              <View style={styles.driveLogoCircle}>
                <Text style={styles.logoLetter}>{drive.companyName[0]}</Text>
              </View>
              <View>
                <Text style={styles.driveCompanyName}>{drive.companyName} Hiring</Text>
                <Text style={styles.driveDetailsText}>{drive.role} • {drive.packageOffer}</Text>
              </View>
            </View>
            <ChevronRight size={18} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tpoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tpoAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 16,
  },
  headerLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  tpoName: {
    fontSize: 15.5,
    fontWeight: '700',
    color: colors.text,
  },
  headerActionBtn: {
    padding: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  bannerCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTextCol: {
    flex: 1,
  },
  bannerLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.white + '99',
    letterSpacing: 0.5,
  },
  bannerPercentage: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.white,
    marginTop: 4,
  },
  bannerSub: {
    fontSize: 12.5,
    color: colors.white + 'cc',
    marginTop: 6,
    lineHeight: 16,
  },
  bannerTrendIcon: {
    opacity: 0.15,
  },
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  statCol: {
    flex: 1,
    marginHorizontal: 4,
  },
  driveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  driveLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driveLogoCircle: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoLetter: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  driveCompanyName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  driveDetailsText: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
});
