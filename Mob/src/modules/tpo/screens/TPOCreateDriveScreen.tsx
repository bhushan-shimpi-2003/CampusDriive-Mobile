import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Landmark, Settings } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { constants } from '../../../config/constants';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { AppButton } from '../../../components/AppButton';

export default function TPOCreateDriveScreen() {
  const navigation = useNavigation();
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [packageOffer, setPackageOffer] = useState('');
  const [location, setLocation] = useState('Pune');
  const [jobType, setJobType] = useState<'Full-time' | 'Internship'>('Full-time');
  const [workMode, setWorkMode] = useState<'On-site' | 'Remote' | 'Hybrid'>('On-site');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [minCGPA, setMinCGPA] = useState('7.0');
  const [passingYear, setPassingYear] = useState('2026');
  const [backlogsAllowed, setBacklogsAllowed] = useState(false);
  const [selectionRounds, setSelectionRounds] = useState('Aptitude, Tech, HR');
  const [autoCreateCommunity, setAutoCreateCommunity] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!companyName || !jobTitle || !packageOffer || !requiredSkills) {
      Alert.alert('Fields Incomplete', 'Please fill in all core parameters (Company, Role, Package, Skills).');
      return;
    }

    setSubmitting(true);

    // Simulate database record creation
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert(
        'Placement Drive Created',
        'Placement drive created successfully. Eligible students were auto-filtered and company community was created.',
        [{ text: 'Great', onPress: () => navigation.goBack() }]
      );
    }, 1200);
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Create Recruitment Drive"
        showBack={true}
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.scrollContainer}>
          <View style={styles.formCard}>
            {/* Company Name */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Company Name</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Google, TCS, Accenture"
                placeholderTextColor={colors.textMuted}
                value={companyName}
                onChangeText={setCompanyName}
              />
            </View>

            {/* Job Title */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Job Title / Role</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Software Engineer, Cloud Analyst"
                placeholderTextColor={colors.textMuted}
                value={jobTitle}
                onChangeText={setJobTitle}
              />
            </View>

            {/* Package */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Offer Package (e.g. 12 LPA)</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="8.5 LPA"
                placeholderTextColor={colors.textMuted}
                value={packageOffer}
                onChangeText={setPackageOffer}
              />
            </View>

            {/* Job Type Selector */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Job Type</Text>
              <View style={styles.tabSelector}>
                {(['Full-time', 'Internship'] as const).map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.selectorBtn, jobType === t && styles.activeSelector]}
                    onPress={() => setJobType(t)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.selectorText, jobType === t && styles.activeSelectorText]}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Work Mode Selector */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Work Mode</Text>
              <View style={styles.tabSelector}>
                {(['On-site', 'Remote', 'Hybrid'] as const).map((m) => (
                  <TouchableOpacity
                    key={m}
                    style={[styles.selectorBtn, workMode === m && styles.activeSelector]}
                    onPress={() => setWorkMode(m)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.selectorText, workMode === m && styles.activeSelectorText]}>
                      {m}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Location */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Location</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Bangalore / Pune / Hybrid"
                placeholderTextColor={colors.textMuted}
                value={location}
                onChangeText={setLocation}
              />
            </View>

            {/* Minimum CGPA */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Minimum CGPA Criteria</Text>
              <TextInput
                style={globalStyles.input}
                keyboardType="numeric"
                value={minCGPA}
                onChangeText={setMinCGPA}
              />
            </View>

            {/* Backlogs Toggles */}
            <View style={styles.switchRow}>
              <View>
                <Text style={styles.switchLabel}>Allow Active Backlogs</Text>
                <Text style={styles.switchDesc}>Students with active backlogs can apply</Text>
              </View>
              <Switch
                value={backlogsAllowed}
                onValueChange={setBacklogsAllowed}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>

            {/* Target Passing Year */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Target Passing Year</Text>
              <TextInput
                style={globalStyles.input}
                keyboardType="numeric"
                value={passingYear}
                onChangeText={setPassingYear}
              />
            </View>

            {/* Required Skills */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Required Skillsets (comma-separated)</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Java, React, SQL"
                placeholderTextColor={colors.textMuted}
                value={requiredSkills}
                onChangeText={setRequiredSkills}
              />
            </View>

            {/* Selection Rounds */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Selection Rounds Sequence (comma-separated)</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Aptitude, Tech, HR"
                placeholderTextColor={colors.textMuted}
                value={selectionRounds}
                onChangeText={setSelectionRounds}
              />
            </View>

            {/* Community Channel Toggle */}
            <View style={[styles.switchRow, styles.lastSwitchRow]}>
              <View>
                <Text style={styles.switchLabel}>Auto-create Company Community</Text>
                <Text style={styles.switchDesc}>Creates dedicated student-PC channel</Text>
              </View>
              <Switch
                value={autoCreateCommunity}
                onValueChange={setAutoCreateCommunity}
                trackColor={{ false: colors.border, true: colors.success }}
              />
            </View>

            <AppButton
              title="Publish Placement Campaign"
              onPress={handleSubmit}
              loading={submitting}
              style={styles.submitBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginTop: 16,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 4,
  },
  selectorBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 6,
  },
  activeSelector: {
    backgroundColor: colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: '0px 1px 2px rgba(15, 23, 42, 0.05)',
      },
    }),
  },
  selectorText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
  },
  activeSelectorText: {
    color: colors.primary,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  lastSwitchRow: {
    borderBottomWidth: 0,
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  switchDesc: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  submitBtn: {
    marginTop: 8,
  },
});
