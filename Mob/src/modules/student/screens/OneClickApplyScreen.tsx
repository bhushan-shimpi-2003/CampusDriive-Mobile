import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FileText, CheckSquare, Square, AlertCircle, ShieldCheck } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { AppCard } from '../../../components/AppCard';
import { AppButton } from '../../../components/AppButton';
import { mockPlacementDrives, mockStudentProfile } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type RoutePropType = RouteProp<RootStackParamList, 'OneClickApply'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function OneClickApplyScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { driveId } = route.params;

  const drive = mockPlacementDrives.find((d) => d.id === driveId);
  const student = mockStudentProfile;

  const [agreed, setAgreed] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  if (!drive) {
    return (
      <SafeAreaView style={globalStyles.safeContainer}>
        <AppHeader title="Apply" showBack={true} onBack={() => navigation.goBack()} />
        <View style={styles.errorContainer}>
          <AlertCircle size={48} color={colors.error} />
          <Text style={styles.errorText}>Placement drive not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSubmit = () => {
    if (!agreed) {
      Alert.alert('Agreement Required', 'You must verify and agree to the academic details confirmation.');
      return;
    }

    setSubmitting(true);

    // Simulate submission request
    setTimeout(() => {
      setSubmitting(false);
      // Navigate to success page
      navigation.replace('ApplicationSuccess', {
        driveId: drive.id,
        companyName: drive.companyName,
      });
    }, 1200);
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="One-Click Apply"
        showBack={true}
        onBack={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.scrollContainer}>
        <Text style={styles.leadText}>
          You are applying for the <Text style={globalStyles.bold}>{drive.role}</Text> role at <Text style={globalStyles.bold}>{drive.companyName}</Text>. Please review your unified profile preview below.
        </Text>

        {/* Profile Preview Card */}
        <Text style={styles.sectionTitle}>Unified Profile Preview</Text>
        <AppCard style={styles.previewCard}>
          <View style={styles.previewRow}>
            <Text style={styles.previewLabel}>Full Name</Text>
            <Text style={styles.previewValue}>{student.personal.fullName}</Text>
          </View>
          <View style={styles.previewRow}>
            <Text style={styles.previewLabel}>PRN / Roll No</Text>
            <Text style={styles.previewValue}>{student.academic.collegeName ? '2022CS0101' : 'N/A'}</Text>
          </View>
          <View style={styles.previewRow}>
            <Text style={styles.previewLabel}>Branch / Dept</Text>
            <Text style={styles.previewValue}>{student.academic.department}</Text>
          </View>
          <View style={styles.previewRow}>
            <Text style={styles.previewLabel}>Cumulative CGPA</Text>
            <Text style={[styles.previewValue, globalStyles.bold, { color: colors.success }]}>
              {student.academic.cgpa}
            </Text>
          </View>
          <View style={styles.previewRow}>
            <Text style={styles.previewLabel}>Active Backlogs</Text>
            <Text style={styles.previewValue}>{student.academic.activeBacklogs}</Text>
          </View>
        </AppCard>

        {/* Resume Selected Card */}
        <Text style={styles.sectionTitle}>Attached ATS Resume</Text>
        <AppCard style={styles.resumeCard}>
          <View style={styles.resumeInner}>
            <FileText size={22} color={colors.primary} />
            <Text style={styles.resumeName} numberOfLines={1}>
              {student.resumeName || 'Bhushan_Shimpi_Resume.pdf'}
            </Text>
          </View>
          <Text style={styles.resumeScore}>ATS Analysis Verified • Active</Text>
        </AppCard>

        {/* Declaration Checkbox */}
        <AppCard style={styles.agreementCard}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreed(!agreed)}
            activeOpacity={0.7}
          >
            <View style={styles.checkboxIcon}>
              {agreed ? (
                <CheckSquare size={20} color={colors.primary} />
              ) : (
                <Square size={20} color={colors.textMuted} />
              )}
            </View>
            <Text style={styles.agreementText}>
              I confirm that all academic percentages, skills records, and my uploaded resume are fully verified, accurate, and up-to-date.
            </Text>
          </TouchableOpacity>
        </AppCard>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <ShieldCheck size={18} color={colors.primary} style={styles.infoIcon} />
          <Text style={styles.infoText}>
            CampusDrive auto-syncs this submission with the TPO recruitment engine.
          </Text>
        </View>

        <AppButton
          title="Submit Application"
          onPress={handleSubmit}
          loading={submitting}
          style={styles.submitBtn}
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
  leadText: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  previewCard: {
    marginBottom: 16,
    padding: 16,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  previewLabel: {
    fontSize: 13.5,
    color: colors.textMuted,
    fontWeight: '500',
  },
  previewValue: {
    fontSize: 13.5,
    color: colors.text,
    fontWeight: '600',
  },
  resumeCard: {
    padding: 14,
    marginBottom: 16,
  },
  resumeInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resumeName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  resumeScore: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '700',
    marginTop: 6,
    marginLeft: 30,
  },
  agreementCard: {
    padding: 14,
    marginBottom: 16,
    backgroundColor: colors.primaryLight + '10',
    borderColor: colors.primary + '30',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  agreementText: {
    flex: 1,
    fontSize: 12.5,
    color: colors.text,
    lineHeight: 18,
    fontWeight: '500',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.primary + '15',
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 11.5,
    color: colors.primary,
    fontWeight: '600',
  },
  submitBtn: {
    marginBottom: 24,
  },
});
