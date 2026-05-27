import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Users, FileText, Bell, Users as CommunityIcon } from 'lucide-react-native';
import { RootStackParamList } from '../../../navigation/types';
import { AppHeader } from '../../../components/AppHeader';
import { AppCard } from '../../../components/AppCard';
import { Badge } from '../../../components/Badge';
import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { mockPlacementDrives as mockDrives, mockCommunities } from '../../../data/mockData';

type TPODriveDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TPODriveDetails'>;
};

type RouteProps = RouteProp<RootStackParamList, 'TPODriveDetails'>;

export default function TPODriveDetailsScreen({ navigation }: TPODriveDetailsScreenProps) {
  const route = useRoute<RouteProps>();
  const { driveId } = route.params;

  const drive = mockDrives.find((d) => d.id === driveId) || mockDrives[0];
  // Find the matching community for this drive's company
  const community = mockCommunities.find((c) => c.companyId === drive.companyId) || mockCommunities[0];
  const communityId = community.id;

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader title="Drive Details" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Company Header Card */}
        <AppCard style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>{drive.companyName[0]}</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.companyName}>{drive.companyName}</Text>
              <Text style={styles.roleTitle}>{drive.role}</Text>
              <Badge 
                label={drive.status} 
                variant={drive.status === 'Active' ? 'success' : 'primary'}
                style={styles.statusBadge}
              />
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{drive.applicantsCount}</Text>
              <Text style={styles.statLabel}>Applicants</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{drive.packageOffer}</Text>
              <Text style={styles.statLabel}>Package</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{drive.jobType}</Text>
              <Text style={styles.statLabel}>Type</Text>
            </View>
          </View>
        </AppCard>

        {/* Action Buttons */}
        <Text style={styles.sectionTitle}>Drive Actions</Text>
        <AppCard style={styles.actionsCard}>
          <TouchableOpacity 
            style={styles.actionItem} 
            onPress={() => navigation.navigate('TPOCommunityDetails', { communityId })}
          >
            <View style={[styles.iconCircle, { backgroundColor: colors.primaryLight }]}>
              <CommunityIcon size={20} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Open Community</Text>
          </TouchableOpacity>

          <View style={styles.actionDivider} />

          <TouchableOpacity 
            style={styles.actionItem} 
            onPress={() => navigation.navigate('TPOApp', { screen: 'TPOApplications' })}
          >
            <View style={[styles.iconCircle, { backgroundColor: colors.secondary + '15' }]}>
              <FileText size={20} color={colors.secondary} />
            </View>
            <Text style={styles.actionText}>View Applications</Text>
          </TouchableOpacity>

          <View style={styles.actionDivider} />

          <TouchableOpacity 
            style={styles.actionItem} 
            onPress={() => navigation.navigate('TPONotifications')}
          >
            <View style={[styles.iconCircle, { backgroundColor: colors.warning + '15' }]}>
              <Bell size={20} color={colors.warning} />
            </View>
            <Text style={styles.actionText}>Send Notification</Text>
          </TouchableOpacity>
        </AppCard>

        {/* Detailed Info */}
        <Text style={styles.sectionTitle}>Eligibility & Details</Text>
        <AppCard style={styles.card}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Branches Allowed:</Text>
            <Text style={styles.detailValue}>{drive.departments.join(', ')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Minimum CGPA:</Text>
            <Text style={styles.detailValue}>{drive.minCGPA}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Backlogs Allowed:</Text>
            <Text style={styles.detailValue}>{(drive.backlogsAllowed ? 'Yes' : 'No')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Drive Date:</Text>
            <Text style={styles.detailValue}>{drive.deadline}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>{drive.location}</Text>
          </View>
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
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'flex-start',
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  roleTitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
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
  iconCircle: {
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: 'bold',
  },
});
