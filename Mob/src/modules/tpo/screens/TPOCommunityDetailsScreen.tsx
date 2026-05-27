import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MessageSquare, Users, Settings } from 'lucide-react-native';
import { RootStackParamList } from '../../../navigation/types';
import { AppHeader } from '../../../components/AppHeader';
import { AppCard } from '../../../components/AppCard';
import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';

type TPOCommunityDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TPOCommunityDetails'>;
};

type RouteProps = RouteProp<RootStackParamList, 'TPOCommunityDetails'>;

export default function TPOCommunityDetailsScreen({ navigation }: TPOCommunityDetailsScreenProps) {
  const route = useRoute<RouteProps>();
  const { communityId } = route.params;

  // Mock community data
  const community = {
    id: communityId,
    name: '2024 Placement Batch',
    description: 'Official community for all 2024 placement updates, discussions, and query resolutions.',
    members: 450,
    active: 120,
    recentAnnouncements: [
      { id: '1', title: 'Tech Mahindra Drive Postponed', date: 'Oct 15' },
      { id: '2', title: 'Resume formatting guidelines updated', date: 'Oct 12' },
    ]
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader title="Community Details" onBack={() => navigation.goBack()} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Info */}
        <AppCard style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.iconCircle}>
              <Users size={32} color={colors.primary} />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.communityName}>{community.name}</Text>
              <Text style={styles.communityDesc}>{community.description}</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{community.members}</Text>
              <Text style={styles.statLabel}>Total Members</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{community.active}</Text>
              <Text style={styles.statLabel}>Online Now</Text>
            </View>
          </View>
        </AppCard>

        {/* Actions */}
        <Text style={styles.sectionTitle}>Manage Community</Text>
        <AppCard style={styles.actionsCard}>
          <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
            <View style={[styles.actionIconCircle, { backgroundColor: colors.primaryLight }]}>
              <MessageSquare size={20} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Broadcast Message</Text>
          </TouchableOpacity>
          <View style={styles.actionDivider} />
          <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
            <View style={[styles.actionIconCircle, { backgroundColor: colors.secondary + '15' }]}>
              <Settings size={20} color={colors.secondary} />
            </View>
            <Text style={styles.actionText}>Community Settings</Text>
          </TouchableOpacity>
        </AppCard>

        {/* Recent Announcements */}
        <Text style={styles.sectionTitle}>Recent Announcements</Text>
        <AppCard style={styles.card}>
          {community.recentAnnouncements.map((announcement, index) => (
            <View key={announcement.id}>
              <View style={styles.announcementRow}>
                <View style={styles.announcementContent}>
                  <Text style={styles.announcementTitle}>{announcement.title}</Text>
                  <Text style={styles.announcementDate}>{announcement.date}</Text>
                </View>
              </View>
              {index < community.recentAnnouncements.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </AppCard>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  communityDesc: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  actionsCard: {
    marginBottom: 24,
    padding: 0,
    overflow: 'hidden',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  actionDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 72,
  },
  announcementRow: {
    paddingVertical: 12,
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  announcementDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  }
});
