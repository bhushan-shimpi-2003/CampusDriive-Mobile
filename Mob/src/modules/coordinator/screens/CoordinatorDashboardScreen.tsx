import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CheckSquare, Briefcase, Bell, MessageSquare, ClipboardCheck, Megaphone, Milestone, ChevronRight, Search, Calendar } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { StatCard } from '../../../components/StatCard';
import { AppCard } from '../../../components/AppCard';
import { SectionHeader } from '../../../components/SectionHeader';
import { mockCoordinatorDrives } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CoordinatorDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();

  const quickActions = [
    {
      title: 'Verify Students',
      icon: <ClipboardCheck size={20} color={colors.primary} />,
      bgColor: colors.primaryLight,
      onPress: () => navigation.navigate('CoordinatorApp', { screen: 'CoordinatorVerify' }),
    },
    {
      title: 'Calendar',
      icon: <Calendar size={20} color={colors.secondary} />,
      bgColor: colors.secondaryLight,
      onPress: () => navigation.navigate('CoordinatorCalendar'),
    },
    {
      title: 'Update Round',
      icon: <Milestone size={20} color={colors.warning} />,
      bgColor: colors.warningLight,
      onPress: () => navigation.navigate('RoundUpdates'),
    },
    {
      title: 'Assigned Drives',
      icon: <Briefcase size={20} color={colors.success} />,
      bgColor: colors.successLight,
      onPress: () => navigation.navigate('CoordinatorApp', { screen: 'CoordinatorDrives' }),
    },
  ];

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      {/* Header Profile Row */}
      <View style={styles.headerRow}>
        <View style={styles.userProfile}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>PC</Text>
          </View>
          <View>
            <Text style={styles.roleLabel}>PLACEMENT COORDINATOR</Text>
            <Text style={styles.userName}>Amit Sharma (PC)</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={[styles.alertBtn, { marginRight: 8 }]}
            onPress={() => navigation.navigate('CoordinatorSearch')}
            activeOpacity={0.7}
          >
            <Search size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.alertBtn}
            onPress={() => navigation.navigate('CreateAnnouncement')}
            activeOpacity={0.7}
          >
            <Megaphone size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.scrollContainer}>
        {/* Quick action grid */}
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

        {/* Stats segment */}
        <SectionHeader title="Operational Tasks" />
        <View style={styles.statsRow}>
          <StatCard
            title="Assigned Drives"
            value="3"
            icon={<Briefcase size={16} color={colors.primary} />}
            subValue="Accenture, TCS, Wipro"
            style={styles.statCol}
          />
          <StatCard
            title="Pending Audit"
            value="14"
            icon={<ClipboardCheck size={16} color={colors.warning} />}
            subValue="Student Verifications"
            style={styles.statCol}
          />
        </View>

        {/* Today's interview schedule */}
        <SectionHeader title="Today's Drives Schedule" />
        <AppCard style={styles.scheduleCard}>
          <View style={styles.schedItem}>
            <View style={styles.timeBadge}>
              <Text style={styles.timeBadgeText}>10:00 AM</Text>
            </View>
            <View style={styles.schedDetails}>
              <Text style={styles.schedTitle}>Accenture Advanced ASE Mock Interviews</Text>
              <Text style={styles.schedSub}>95 Candidates registered • Lab 3 (TPO block)</Text>
            </View>
          </View>
        </AppCard>

        {/* Assigned drives tracker */}
        <SectionHeader
          title="Assigned Placement Drives"
          actionTitle="All"
          onAction={() => navigation.navigate('CoordinatorApp', { screen: 'CoordinatorDrives' })}
        />
        {mockCoordinatorDrives.slice(0, 2).map((drive) => (
          <TouchableOpacity
            key={drive.id}
            style={styles.assignedRow}
            onPress={() => navigation.navigate('CoordinatorDriveDetails', { driveId: drive.id })}
            activeOpacity={0.7}
          >
            <View style={styles.assignedLeft}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoLetter}>{drive.companyName[0]}</Text>
              </View>
              <View>
                <Text style={styles.assignedTitle}>{drive.companyName} – {drive.role}</Text>
                <Text style={styles.assignedSub}>Current Round: {drive.currentRound} ({drive.applicantsCount} apps)</Text>
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
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 16,
  },
  roleLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 15.5,
    fontWeight: '700',
    color: colors.text,
  },
  alertBtn: {
    padding: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
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
  scheduleCard: {
    padding: 16,
  },
  schedItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBadge: {
    backgroundColor: colors.warningLight,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 12,
  },
  timeBadgeText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.warning,
  },
  schedDetails: {
    flex: 1,
  },
  schedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  schedSub: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  assignedRow: {
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
  assignedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoBadge: {
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
  assignedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  assignedSub: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
});
