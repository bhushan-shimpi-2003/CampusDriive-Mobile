import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { AppHeader } from '../../../components/AppHeader';
import { AppCard } from '../../../components/AppCard';
import { Badge } from '../../../components/Badge';
import { Timeline } from '../../../components/Timeline';
import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { mockApplications } from '../../../data/mockData';

type StudentApplicationDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'StudentApplicationDetails'>;
};

type RouteProps = RouteProp<RootStackParamList, 'StudentApplicationDetails'>;

export default function StudentApplicationDetailsScreen({ navigation }: StudentApplicationDetailsScreenProps) {
  const route = useRoute<RouteProps>();
  const { applicationId } = route.params;

  const app = mockApplications.find((a) => a.id === applicationId) || mockApplications[0];

  const roundsOrder = [
    'Applied',
    'Shortlisted',
    'Aptitude Round',
    'Technical Round',
    'HR Round',
    'Selected',
  ];

  const isAppRejected = app.status === 'Rejected';
  const activeIndex = roundsOrder.indexOf(app.status);

  const steps = roundsOrder.map((roundName, index) => {
    let isCompleted = false;
    let isActive = false;
    let isStepRejected = false;

    if (isAppRejected && index === activeIndex) {
      isStepRejected = true;
    } else if (index < activeIndex || app.status === 'Selected') {
      isCompleted = true;
    } else if (index === activeIndex) {
      isActive = true;
    }

    return {
      title: roundName,
      description: isActive ? `Current Stage: ${app.nextStep}` : isCompleted ? 'Completed and qualified' : isStepRejected ? 'Not selected in this round' : 'Pending evaluation',
      isCompleted,
      isActive,
      isRejected: isStepRejected,
      date: isActive ? app.date : undefined,
    };
  });

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader title="Application Details" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AppCard style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>{app.companyName[0]}</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.companyName}>{app.companyName}</Text>
              <Text style={styles.roleTitle}>{app.role}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Application ID:</Text>
            <Text style={styles.detailValue}>{app.id}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Applied On:</Text>
            <Text style={styles.detailValue}>{app.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Badge 
              label={app.status}
              variant={app.status === 'Selected' ? 'success' : app.status === 'Rejected' ? 'error' : 'warning'}
            />
          </View>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.sectionTitle}>Application Progress</Text>
          <Timeline steps={steps} />
        </AppCard>
        
        <AppCard style={styles.card}>
          <Text style={styles.sectionTitle}>Further Instructions</Text>
          <Text style={styles.instructionText}>
            Keep an eye on your email for further updates from {app.companyName}.
            Ensure your profile is complete as recruiters might review your updated academic records before the next round.
          </Text>
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
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  headerInfo: {
    flex: 1,
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
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  instructionText: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 24,
  }
});
