import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, User, BookOpen, Layers, Award, Heart, CheckCircle2 } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { constants } from '../../../config/constants';
import { globalStyles } from '../../../styles/globalStyles';
import { AppButton } from '../../../components/AppButton';
import { AppHeader } from '../../../components/AppHeader';
import { mockStudentProfile } from '../../../data/mockData';

type FormStep = 'personal' | 'academic' | 'skills' | 'projects' | 'preferences';

export default function ProfileBuilderScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState<FormStep>('personal');

  // Form State Pre-populated with Bhushan Shimpi's mock profile details
  const [personal, setPersonal] = useState({ ...mockStudentProfile.personal });
  const [academic, setAcademic] = useState({
    ...mockStudentProfile.academic,
    cgpa: String(mockStudentProfile.academic.cgpa),
    tenthPercentage: String(mockStudentProfile.academic.tenthPercentage),
    twelfthOrDiplomaPercentage: String(mockStudentProfile.academic.twelfthOrDiplomaPercentage),
    activeBacklogs: String(mockStudentProfile.academic.activeBacklogs),
    historyOfBacklogs: String(mockStudentProfile.academic.historyOfBacklogs),
  });

  const [skillsText, setSkillsText] = useState({
    languages: mockStudentProfile.skills.languages.join(', '),
    frameworks: mockStudentProfile.skills.frameworks.join(', '),
    databases: mockStudentProfile.skills.databases.join(', '),
    softSkills: mockStudentProfile.skills.softSkills.join(', '),
  });

  const [project, setProject] = useState({
    title: mockStudentProfile.projects[0].title,
    description: mockStudentProfile.projects[0].description,
    techStack: mockStudentProfile.projects[0].techStack.join(', '),
    gitHubLink: mockStudentProfile.projects[0].gitHubLink || '',
    liveLink: '',
  });

  const [preferences, setPreferences] = useState({ ...mockStudentProfile.preferences });

  const stepsList: { id: FormStep; label: string; icon: React.ReactNode }[] = [
    { id: 'personal', label: 'Personal', icon: <User size={16} /> },
    { id: 'academic', label: 'Academic', icon: <BookOpen size={16} /> },
    { id: 'skills', label: 'Skills', icon: <Layers size={16} /> },
    { id: 'projects', label: 'Projects', icon: <Award size={16} /> },
    { id: 'preferences', label: 'Preferences', icon: <Heart size={16} /> },
  ];

  const handleSave = () => {
    Alert.alert(
      'Profile Saved Successfully',
      'Your unified recruitment profile was saved and synchronised with the CampusDrive placement engine.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const renderStepTabs = () => {
    return (
      <View style={styles.stepTabsScroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
          {stepsList.map((item) => {
            const isActive = step === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.tabChip,
                  isActive && styles.activeTabChip,
                ]}
                onPress={() => setStep(item.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.tabIcon as any, isActive && styles.activeTabIcon as any]}>
                  {item.icon}
                </View>
                <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 'personal':
        return (
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>1. Personal Details</Text>
            
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Full Name</Text>
              <TextInput
                style={globalStyles.input}
                value={personal.fullName}
                onChangeText={(text) => setPersonal({ ...personal, fullName: text })}
              />
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Email Address</Text>
              <TextInput
                style={globalStyles.input}
                value={personal.email}
                keyboardType="email-address"
                onChangeText={(text) => setPersonal({ ...personal, email: text })}
              />
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Mobile Number</Text>
              <TextInput
                style={globalStyles.input}
                value={personal.mobileNumber}
                keyboardType="phone-pad"
                onChangeText={(text) => setPersonal({ ...personal, mobileNumber: text })}
              />
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Current Address</Text>
              <TextInput
                style={[globalStyles.input, styles.multilineInput]}
                multiline
                numberOfLines={2}
                value={personal.address}
                onChangeText={(text) => setPersonal({ ...personal, address: text })}
              />
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>LinkedIn Profile URL</Text>
              <TextInput
                style={globalStyles.input}
                value={personal.linkedIn}
                autoCapitalize="none"
                onChangeText={(text) => setPersonal({ ...personal, linkedIn: text })}
              />
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>GitHub Profile URL</Text>
              <TextInput
                style={globalStyles.input}
                value={personal.gitHub}
                autoCapitalize="none"
                onChangeText={(text) => setPersonal({ ...personal, gitHub: text })}
              />
            </View>

            <AppButton
              title="Next: Academic Details"
              onPress={() => setStep('academic')}
              style={styles.stepButton}
            />
          </View>
        );

      case 'academic':
        return (
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>2. Academic Details</Text>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>College Name</Text>
              <TextInput
                style={globalStyles.input}
                value={academic.collegeName}
                onChangeText={(text) => setAcademic({ ...academic, collegeName: text })}
              />
            </View>

            <View style={styles.formRow}>
              <View style={[globalStyles.inputGroup, styles.formCol]}>
                <Text style={globalStyles.label}>Course</Text>
                <TextInput
                  style={globalStyles.input}
                  value={academic.course}
                  onChangeText={(text) => setAcademic({ ...academic, course: text })}
                />
              </View>
              <View style={[globalStyles.inputGroup, styles.formCol]}>
                <Text style={globalStyles.label}>Passing Year</Text>
                <TextInput
                  style={globalStyles.input}
                  value={academic.passingYear}
                  onChangeText={(text) => setAcademic({ ...academic, passingYear: text })}
                />
              </View>
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Department</Text>
              <TextInput
                style={globalStyles.input}
                value={academic.department}
                onChangeText={(text) => setAcademic({ ...academic, department: text })}
              />
            </View>

            <View style={styles.formRow}>
              <View style={[globalStyles.inputGroup, styles.formCol]}>
                <Text style={globalStyles.label}>Current CGPA</Text>
                <TextInput
                  style={globalStyles.input}
                  keyboardType="numeric"
                  value={academic.cgpa}
                  onChangeText={(text) => setAcademic({ ...academic, cgpa: text })}
                />
              </View>
              <View style={[globalStyles.inputGroup, styles.formCol]}>
                <Text style={globalStyles.label}>10th Percentage</Text>
                <TextInput
                  style={globalStyles.input}
                  keyboardType="numeric"
                  value={academic.tenthPercentage}
                  onChangeText={(text) => setAcademic({ ...academic, tenthPercentage: text })}
                />
              </View>
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>12th / Diploma %</Text>
              <TextInput
                style={globalStyles.input}
                keyboardType="numeric"
                value={academic.twelfthOrDiplomaPercentage}
                onChangeText={(text) => setAcademic({ ...academic, twelfthOrDiplomaPercentage: text })}
              />
            </View>

            <View style={styles.formRow}>
              <View style={[globalStyles.inputGroup, styles.formCol]}>
                <Text style={globalStyles.label}>Active Backlogs</Text>
                <TextInput
                  style={globalStyles.input}
                  keyboardType="numeric"
                  value={academic.activeBacklogs}
                  onChangeText={(text) => setAcademic({ ...academic, activeBacklogs: text })}
                />
              </View>
              <View style={[globalStyles.inputGroup, styles.formCol]}>
                <Text style={globalStyles.label}>History of Backlogs</Text>
                <TextInput
                  style={globalStyles.input}
                  keyboardType="numeric"
                  value={academic.historyOfBacklogs}
                  onChangeText={(text) => setAcademic({ ...academic, historyOfBacklogs: text })}
                />
              </View>
            </View>

            <AppButton
              title="Next: Skills & Expertise"
              onPress={() => setStep('skills')}
              style={styles.stepButton}
            />
          </View>
        );

      case 'skills':
        return (
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>3. Skills & Technologies</Text>
            
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Programming Languages (comma-separated)</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Python, Java, TypeScript"
                placeholderTextColor={colors.textMuted}
                value={skillsText.languages}
                onChangeText={(text) => setSkillsText({ ...skillsText, languages: text })}
              />
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Frameworks & Libraries (comma-separated)</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="React Native, Node.js, Spring Boot"
                placeholderTextColor={colors.textMuted}
                value={skillsText.frameworks}
                onChangeText={(text) => setSkillsText({ ...skillsText, frameworks: text })}
              />
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Databases & Systems (comma-separated)</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="MongoDB, SQLite, MySQL"
                placeholderTextColor={colors.textMuted}
                value={skillsText.databases}
                onChangeText={(text) => setSkillsText({ ...skillsText, databases: text })}
              />
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Soft Skills (comma-separated)</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Problem Solving, Public Speaking"
                placeholderTextColor={colors.textMuted}
                value={skillsText.softSkills}
                onChangeText={(text) => setSkillsText({ ...skillsText, softSkills: text })}
              />
            </View>

            <AppButton
              title="Next: Projects Showcase"
              onPress={() => setStep('projects')}
              style={styles.stepButton}
            />
          </View>
        );

      case 'projects':
        return (
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>4. Major Project Details</Text>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Project Title</Text>
              <TextInput
                style={globalStyles.input}
                value={project.title}
                onChangeText={(text) => setProject({ ...project, title: text })}
              />
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Detailed Description</Text>
              <TextInput
                style={[globalStyles.input, styles.multilineInput]}
                multiline
                numberOfLines={3}
                value={project.description}
                onChangeText={(text) => setProject({ ...project, description: text })}
              />
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Tech Stack (comma-separated)</Text>
              <TextInput
                style={globalStyles.input}
                value={project.techStack}
                onChangeText={(text) => setProject({ ...project, techStack: text })}
              />
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>GitHub Link (Optional)</Text>
              <TextInput
                style={globalStyles.input}
                value={project.gitHubLink}
                autoCapitalize="none"
                onChangeText={(text) => setProject({ ...project, gitHubLink: text })}
              />
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Live Demo URL (Optional)</Text>
              <TextInput
                style={globalStyles.input}
                value={project.liveLink}
                autoCapitalize="none"
                onChangeText={(text) => setProject({ ...project, liveLink: text })}
              />
            </View>

            <AppButton
              title="Next: Job Preferences"
              onPress={() => setStep('preferences')}
              style={styles.stepButton}
            />
          </View>
        );

      case 'preferences':
        return (
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>5. Job Preferences</Text>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Hiring Interest Type</Text>
              <View style={styles.prefsRow}>
                {(['Internship', 'Full-time', 'Both'] as const).map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[
                      styles.prefChip,
                      preferences.jobType === t && styles.activePrefChip,
                    ]}
                    onPress={() => setPreferences({ ...preferences, jobType: t })}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.prefChipText,
                        preferences.jobType === t && styles.activePrefChipText,
                      ]}
                    >
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Preferred Roles</Text>
              <TextInput
                style={globalStyles.input}
                value={preferences.preferredRole}
                onChangeText={(text) => setPreferences({ ...preferences, preferredRole: text })}
              />
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Preferred Locations</Text>
              <TextInput
                style={globalStyles.input}
                value={preferences.preferredLocation}
                onChangeText={(text) => setPreferences({ ...preferences, preferredLocation: text })}
              />
            </View>

            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Expected CTC Packages</Text>
              <TextInput
                style={globalStyles.input}
                value={preferences.expectedPackage}
                onChangeText={(text) => setPreferences({ ...preferences, expectedPackage: text })}
              />
            </View>

            <AppButton
              title="Save Unified Profile"
              onPress={handleSave}
              style={[styles.stepButton, { backgroundColor: colors.success }]}
            />
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Recruitment Profile Builder"
        showBack={true}
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {renderStepTabs()}

        <ScrollView contentContainerStyle={globalStyles.scrollContainer} showsVerticalScrollIndicator={false}>
          {renderStepContent()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  stepTabsScroll: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 10,
  },
  tabsContainer: {
    paddingHorizontal: 12,
  },
  tabChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
    marginHorizontal: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeTabChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabIcon: {
    marginRight: 6,
    color: colors.textMuted,
  },
  activeTabIcon: {
    color: colors.white,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  activeTabLabel: {
    color: colors.white,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    paddingLeft: 8,
  },
  multilineInput: {
    height: 60,
    textAlignVertical: 'top',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formCol: {
    flex: 1,
    marginRight: 8,
  },
  stepButton: {
    marginTop: 16,
  },
  prefsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prefChip: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginHorizontal: 4,
    backgroundColor: colors.surface,
  },
  activePrefChip: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  prefChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
  },
  activePrefChipText: {
    color: colors.primary,
  },
});
