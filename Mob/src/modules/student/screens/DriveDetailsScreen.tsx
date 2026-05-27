import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MapPin, Calendar, Briefcase, Award, CheckCircle, XCircle, AlertCircle, FileSpreadsheet } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { AppButton } from '../../../components/AppButton';
import { Badge } from '../../../components/Badge';
import { AppCard } from '../../../components/AppCard';
import { BookmarkButton } from '../../../components/BookmarkButton';
import { mockPlacementDrives, mockStudentProfile, mockSavedDriveIds } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type RoutePropType = RouteProp<RootStackParamList, 'DriveDetails'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function DriveDetailsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { driveId } = route.params;

  const drive = mockPlacementDrives.find((d) => d.id === driveId);
  const student = mockStudentProfile;
  const [savedIds, setSavedIds] = React.useState<string[]>(mockSavedDriveIds);

  const isSaved = drive ? savedIds.includes(drive.id) : false;
  const toggleSave = () => {
    if (!drive) return;
    setSavedIds(prev => prev.includes(drive.id) ? prev.filter(id => id !== drive.id) : [...prev, drive.id]);
  };

  if (!drive) {
    return (
      <SafeAreaView style={globalStyles.safeContainer}>
        <AppHeader title="Drive Details" showBack={true} onBack={() => navigation.goBack()} />
        <View style={styles.errorContainer}>
          <AlertCircle size={48} color={colors.error} />
          <Text style={styles.errorText}>Placement drive not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Eligibility Checks
  const cgpaMatches = student.academic.cgpa >= drive.minCGPA;
  const deptMatches = drive.departments.includes(student.academic.department);
  const backlogMatches = drive.backlogsAllowed || student.academic.activeBacklogs === 0;
  
  // Skills checking: partial match or full match
  const matchedSkills = drive.requiredSkills.filter(skill =>
    student.skills.languages.some(s => s.toLowerCase().includes(skill.toLowerCase())) ||
    student.skills.frameworks.some(s => s.toLowerCase().includes(skill.toLowerCase())) ||
    student.skills.databases.some(s => s.toLowerCase().includes(skill.toLowerCase()))
  );
  const skillsMatchRate = matchedSkills.length / drive.requiredSkills.length;
  const isSkillsMatched = skillsMatchRate >= 0.5;

  const isFullyEligible = cgpaMatches && deptMatches && backlogMatches;
  const isApplied = ['d6', 'd2', 'd1'].includes(drive.id);

  const handleApply = () => {
    if (isApplied) {
      Alert.alert('Already Applied', 'You have already submitted an application for this drive.');
      return;
    }
    
    if (!isFullyEligible) {
      Alert.alert(
        'Eligibility Warning',
        'Your profile does not meet the minimum eligibility parameters for this drive. Do you wish to override and apply for this demo?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Apply Anyway (Demo)',
            onPress: () => navigation.navigate('OneClickApply', { driveId: drive.id }),
          },
        ]
      );
      return;
    }

    navigation.navigate('OneClickApply', { driveId: drive.id });
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Placement Drive Profile"
        showBack={true}
        onBack={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.scrollContainer}>
        {/* Drive Overview Header */}
        <View style={styles.headerCard}>
          <View style={styles.headerTopRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>{drive.companyName[0]}</Text>
            </View>
            <BookmarkButton isBookmarked={isSaved} onToggle={toggleSave} />
          </View>
          <Text style={styles.roleTitle}>{drive.role}</Text>
          <Text style={styles.companyTitle}>{drive.companyName}</Text>

          <View style={styles.quickSpecsRow}>
            <View style={styles.specCol}>
              <Text style={styles.specLabel}>OFFER PACKAGE</Text>
              <Text style={styles.specValue}>{drive.packageOffer}</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.specCol}>
              <Text style={styles.specLabel}>JOB TYPE</Text>
              <Text style={styles.specValue}>{drive.jobType}</Text>
            </View>
            <View style={styles.specDivider} />
            <View style={styles.specCol}>
              <Text style={styles.specLabel}>WORK MODE</Text>
              <Text style={styles.specValue}>{drive.workMode}</Text>
            </View>
          </View>
        </View>

        {/* Real-time Profile Eligibility Report Card */}
        <Text style={styles.sectionHeader}>Eligibility Report</Text>
        <AppCard style={[styles.eligibilityCard, isFullyEligible ? styles.borderSuccess : styles.borderWarning]}>
          <View style={styles.eligibilityHeader}>
            <Text style={styles.eligibilityTitle}>Unified Eligibility Audit</Text>
            <Badge
              label={isFullyEligible ? 'Eligible' : 'Ineligible'}
              variant={isFullyEligible ? 'success' : 'error'}
            />
          </View>

          {/* GPA */}
          <View style={styles.auditRow}>
            <View style={styles.auditLeft}>
              {cgpaMatches ? (
                <CheckCircle size={16} color={colors.success} />
              ) : (
                <XCircle size={16} color={colors.error} />
              )}
              <Text style={styles.auditLabel}>Minimum CGPA ({drive.minCGPA})</Text>
            </View>
            <Text style={styles.auditValue}>Bhushan: {student.academic.cgpa}</Text>
          </View>

          {/* Department */}
          <View style={styles.auditRow}>
            <View style={styles.auditLeft}>
              {deptMatches ? (
                <CheckCircle size={16} color={colors.success} />
              ) : (
                <XCircle size={16} color={colors.error} />
              )}
              <Text style={styles.auditLabel}>Target Course Branches</Text>
            </View>
            <Text style={styles.auditValue}>Matched</Text>
          </View>

          {/* Backlogs */}
          <View style={styles.auditRow}>
            <View style={styles.auditLeft}>
              {backlogMatches ? (
                <CheckCircle size={16} color={colors.success} />
              ) : (
                <XCircle size={16} color={colors.error} />
              )}
              <Text style={styles.auditLabel}>Backlogs Allowed ({drive.backlogsAllowed ? 'Yes' : 'No'})</Text>
            </View>
            <Text style={styles.auditValue}>Bhushan: {student.academic.activeBacklogs}</Text>
          </View>

          {/* Skills Match */}
          <View style={styles.auditRow}>
            <View style={styles.auditLeft}>
              {isSkillsMatched ? (
                <CheckCircle size={16} color={colors.success} />
              ) : (
                <AlertCircle size={16} color={colors.warning} />
              )}
              <Text style={styles.auditLabel}>ATS Skills Overlap</Text>
            </View>
            <Text style={styles.auditValue}>
              {isSkillsMatched ? 'Matched' : 'Partial Match'}
            </Text>
          </View>
        </AppCard>

        {/* Job Description */}
        <Text style={styles.sectionHeader}>Role Description & Skills</Text>
        <AppCard style={styles.contentCard}>
          <Text style={styles.bodyText}>{drive.description}</Text>
          <Text style={styles.subSubtitle}>Required Skillsets</Text>
          <View style={styles.skillsTagsRow}>
            {drive.requiredSkills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillTagText}>{skill}</Text>
              </View>
            ))}
          </View>
        </AppCard>

        {/* Selection Timeline Rounds */}
        <Text style={styles.sectionHeader}>Selection Rounds</Text>
        <AppCard style={styles.contentCard}>
          {drive.selectionRounds.map((round, index) => (
            <View key={index} style={styles.roundItem}>
              <View style={styles.roundNumber}>
                <Text style={styles.roundNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.roundText}>{round}</Text>
            </View>
          ))}
        </AppCard>

        {/* Dates & Documents */}
        <Text style={styles.sectionHeader}>Dates & Required Documents</Text>
        <AppCard style={styles.contentCard}>
          <Text style={styles.subSubtitle}>Schedule Deadlines</Text>
          {drive.importantDates.map((item, index) => (
            <View key={index} style={styles.dateRow}>
              <Text style={styles.dateLabel}>{item.label}</Text>
              <Text style={styles.dateValue}>{item.date}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <Text style={styles.subSubtitle}>Required Documents</Text>
          {drive.documentsRequired.map((doc, index) => (
            <View key={index} style={styles.docCheckRow}>
              <FileSpreadsheet size={16} color={colors.primary} />
              <Text style={styles.docCheckText}>{doc}</Text>
            </View>
          ))}
        </AppCard>

        {/* Action Button */}
        <AppButton
          title={isApplied ? 'Application Submitted' : 'One-Click Apply Now'}
          variant={isApplied ? 'secondary' : 'primary'}
          onPress={handleApply}
          disabled={isApplied}
          style={styles.applyBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: colors.textMuted,
    marginTop: 12,
  },
  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'flex-start',
    marginTop: 16,
    marginBottom: 20,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-start',
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoBadgeText: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  companyTitle: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 16,
  },
  quickSpecsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  specCol: {
    flex: 1,
    alignItems: 'center',
  },
  specLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  specValue: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.text,
  },
  specDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  eligibilityCard: {
    marginBottom: 20,
    paddingTop: 16,
  },
  borderSuccess: {
    borderColor: colors.success,
  },
  borderWarning: {
    borderColor: colors.warning,
  },
  eligibilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
    marginBottom: 12,
  },
  eligibilityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  auditRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  auditLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  auditLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  auditValue: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
  contentCard: {
    marginBottom: 20,
    padding: 16,
  },
  bodyText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 21,
    marginBottom: 16,
  },
  subSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  skillsTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: colors.background,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  skillTagText: {
    fontSize: 12.5,
    color: colors.text,
    fontWeight: '600',
  },
  roundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  roundNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  roundNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  roundText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: colors.text,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  dateLabel: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  dateValue: {
    fontSize: 13,
    color: colors.error,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  docCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  docCheckText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
    marginLeft: 10,
  },
  applyBtn: {
    marginTop: 8,
    marginBottom: 20,
  },
});
