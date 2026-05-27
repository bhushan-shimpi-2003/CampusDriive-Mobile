import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CheckCircle2, MessageSquare, ListTodo, Home } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppCard } from '../../../components/AppCard';
import { AppButton } from '../../../components/AppButton';
import { mockCommunities } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type RoutePropType = RouteProp<RootStackParamList, 'ApplicationSuccess'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ApplicationSuccessScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { driveId, companyName, applicationId } = route.params;

  // Generate a random high-quality Application ID
  const appId = `CD-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  // Find matching community channel for this company
  const community = mockCommunities.find((c) =>
    c.companyName.toLowerCase().includes(companyName.toLowerCase())
  );
  const communityId = community ? community.id : 'comm1';

  const handleJoinCommunity = () => {
    // Navigate straight to Community Chat Screen
    navigation.replace('CommunityChat', { communityId });
  };

  const handleTrackApplication = () => {
    // Navigate to StudentApplicationDetails if we have an applicationId, else fallback to tracker
    if (applicationId) {
      navigation.replace('StudentApplicationDetails', { applicationId });
    } else {
      navigation.replace('StudentApp', { screen: 'StudentTracker' });
    }
  };

  const handleGoHome = () => {
    navigation.replace('StudentApp', { screen: 'StudentHome' });
  };

  return (
    <SafeAreaView style={[globalStyles.safeContainer, styles.container]}>
      {/* Success Icon Header */}
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <CheckCircle2 size={56} color={colors.success} strokeWidth={2} />
        </View>

        <Text style={styles.successTitle}>Application Submitted!</Text>
        <Text style={styles.successSub}>
          Your unified profile was delivered successfully to the recruiting committee.
        </Text>

        {/* Application details card */}
        <AppCard style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Application ID</Text>
            <Text style={styles.value}>{appId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Company</Text>
            <Text style={styles.value}>{companyName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Current Round</Text>
            <Text style={[styles.value, { color: colors.primary }]}>Applied (Pending Screen)</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Next Milestones</Text>
            <Text style={styles.value}>TPO Profile Audit</Text>
          </View>
        </AppCard>

        {/* Action Panel */}
        <View style={styles.actionsPanel}>
          <AppButton
            title="Join Drive Community Channel"
            variant="primary"
            size="md"
            onPress={handleJoinCommunity}
            style={styles.actionBtn}
          />
          
          <AppButton
            title="Track Real-time Progress"
            variant="outline"
            size="md"
            onPress={handleTrackApplication}
            style={styles.actionBtn}
          />

          <TouchableOpacity style={styles.homeLink} onPress={handleGoHome} activeOpacity={0.6}>
            <Text style={styles.homeLinkText}>Return to Student Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: colors.success,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  successSub: {
    fontSize: 14.5,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  detailsCard: {
    width: '100%',
    padding: 16,
    marginBottom: 32,
    borderWidth: 1.5,
    borderColor: colors.success + '20',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  label: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '600',
  },
  value: {
    fontSize: 13.5,
    color: colors.text,
    fontWeight: '700',
  },
  actionsPanel: {
    width: '100%',
    paddingHorizontal: 8,
  },
  actionBtn: {
    width: '100%',
    marginVertical: 6,
  },
  homeLink: {
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
  },
  homeLinkText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});
