import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { AppHeader } from '../../../components/AppHeader';
import { AppButton } from '../../../components/AppButton';
import { AppCard } from '../../../components/AppCard';
import { SectionHeader } from '../../../components/SectionHeader';
import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';

type EditProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;
};

const InputField = ({ label, value, onChangeText, placeholder }: any) => (
  <View style={globalStyles.inputGroup}>
    <Text style={globalStyles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textMuted}
    />
  </View>
);

export default function EditProfileScreen({ navigation }: EditProfileScreenProps) {
  // Static initial data for demo
  const [personal, setPersonal] = useState({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    mobile: '+1 234 567 8900',
    address: '123 Campus Dr',
    linkedIn: 'linkedin.com/in/janedoe',
    gitHub: 'github.com/janedoe',
  });

  const [academic, setAcademic] = useState({
    college: 'Engineering College',
    course: 'B.Tech',
    department: 'Computer Science',
    passingYear: '2024',
    cgpa: '8.5',
    tenth: '90%',
    twelfth: '88%',
    activeBacklogs: '0',
    historyBacklogs: '0',
  });

  const [skills, setSkills] = useState({
    programming: 'JavaScript, Python, C++',
    frameworks: 'React, React Native, Node.js',
    databases: 'MongoDB, PostgreSQL',
    softSkills: 'Communication, Teamwork',
  });

  const [projects, setProjects] = useState({
    title: 'Campus Recruitment System',
    description: 'A comprehensive platform for campus placements.',
    techStack: 'React Native, Node.js',
    gitHub: 'github.com/janedoe/crs',
    liveLink: 'crs-demo.com',
  });

  const [preferences, setPreferences] = useState({
    type: 'Full-time',
    role: 'Software Engineer',
    location: 'Bangalore, India',
    expectedPackage: '12 LPA',
  });

  const handleSave = () => {
    Alert.alert('Success', 'Profile updated successfully.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <AppHeader title="Edit Profile" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <AppCard style={styles.card}>
            <SectionHeader title="Personal Details" />
            <InputField label="Full Name" value={personal.fullName} onChangeText={(t: string) => setPersonal({...personal, fullName: t})} />
            <InputField label="Email" value={personal.email} onChangeText={(t: string) => setPersonal({...personal, email: t})} />
            <InputField label="Mobile Number" value={personal.mobile} onChangeText={(t: string) => setPersonal({...personal, mobile: t})} />
            <InputField label="Address" value={personal.address} onChangeText={(t: string) => setPersonal({...personal, address: t})} />
            <InputField label="LinkedIn" value={personal.linkedIn} onChangeText={(t: string) => setPersonal({...personal, linkedIn: t})} />
            <InputField label="GitHub" value={personal.gitHub} onChangeText={(t: string) => setPersonal({...personal, gitHub: t})} />
          </AppCard>

          <AppCard style={styles.card}>
            <SectionHeader title="Academic Details" />
            <InputField label="College Name" value={academic.college} onChangeText={(t: string) => setAcademic({...academic, college: t})} />
            <InputField label="Course" value={academic.course} onChangeText={(t: string) => setAcademic({...academic, course: t})} />
            <InputField label="Department" value={academic.department} onChangeText={(t: string) => setAcademic({...academic, department: t})} />
            <InputField label="Passing Year" value={academic.passingYear} onChangeText={(t: string) => setAcademic({...academic, passingYear: t})} />
            <InputField label="CGPA" value={academic.cgpa} onChangeText={(t: string) => setAcademic({...academic, cgpa: t})} />
            <InputField label="10th Percentage" value={academic.tenth} onChangeText={(t: string) => setAcademic({...academic, tenth: t})} />
            <InputField label="12th/Diploma Percentage" value={academic.twelfth} onChangeText={(t: string) => setAcademic({...academic, twelfth: t})} />
            <InputField label="Active Backlogs" value={academic.activeBacklogs} onChangeText={(t: string) => setAcademic({...academic, activeBacklogs: t})} />
            <InputField label="History of Backlogs" value={academic.historyBacklogs} onChangeText={(t: string) => setAcademic({...academic, historyBacklogs: t})} />
          </AppCard>

          <AppCard style={styles.card}>
            <SectionHeader title="Skills" />
            <InputField label="Programming Languages" value={skills.programming} onChangeText={(t: string) => setSkills({...skills, programming: t})} />
            <InputField label="Frameworks" value={skills.frameworks} onChangeText={(t: string) => setSkills({...skills, frameworks: t})} />
            <InputField label="Databases" value={skills.databases} onChangeText={(t: string) => setSkills({...skills, databases: t})} />
            <InputField label="Soft Skills" value={skills.softSkills} onChangeText={(t: string) => setSkills({...skills, softSkills: t})} />
          </AppCard>

          <AppCard style={styles.card}>
            <SectionHeader title="Projects" />
            <InputField label="Project Title" value={projects.title} onChangeText={(t: string) => setProjects({...projects, title: t})} />
            <InputField label="Description" value={projects.description} onChangeText={(t: string) => setProjects({...projects, description: t})} />
            <InputField label="Tech Stack" value={projects.techStack} onChangeText={(t: string) => setProjects({...projects, techStack: t})} />
            <InputField label="GitHub Link" value={projects.gitHub} onChangeText={(t: string) => setProjects({...projects, gitHub: t})} />
            <InputField label="Live Link" value={projects.liveLink} onChangeText={(t: string) => setProjects({...projects, liveLink: t})} />
          </AppCard>

          <AppCard style={styles.card}>
            <SectionHeader title="Placement Preferences" />
            <InputField label="Internship/Full-time" value={preferences.type} onChangeText={(t: string) => setPreferences({...preferences, type: t})} />
            <InputField label="Preferred Role" value={preferences.role} onChangeText={(t: string) => setPreferences({...preferences, role: t})} />
            <InputField label="Preferred Location" value={preferences.location} onChangeText={(t: string) => setPreferences({...preferences, location: t})} />
            <InputField label="Expected Package" value={preferences.expectedPackage} onChangeText={(t: string) => setPreferences({...preferences, expectedPackage: t})} />
          </AppCard>

          <AppButton title="Save Profile" onPress={handleSave} style={styles.saveBtn} />

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
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
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    color: colors.text,
    fontSize: 14,
  },
  saveBtn: {
    marginTop: 8,
  }
});
