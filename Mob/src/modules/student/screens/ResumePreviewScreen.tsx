import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FileText, Upload, Download, CheckCircle, Eye, User, BookOpen, Code2, Phone } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { AppCard } from '../../../components/AppCard';
import { AppButton } from '../../../components/AppButton';
import { SectionHeader } from '../../../components/SectionHeader';
import { mockStudentProfile } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ResumePreviewScreen() {
  const navigation = useNavigation<NavigationProp>();
  const student = mockStudentProfile;

  const handleReplace = () => {
    navigation.navigate('ResumeUpload');
  };

  const handleDownload = () => {
    Alert.alert('Demo Download', 'In production, this would download the PDF to your device.');
  };

  const handleUseResume = () => {
    Alert.alert('Resume Confirmed', 'This resume will be used for all your placement applications.');
  };

  const resumeSections = [
    {
      icon: <User size={16} color={colors.primary} />,
      title: 'Contact Information',
      items: [student.personal.email, student.personal.mobileNumber, student.personal.address],
    },
    {
      icon: <BookOpen size={16} color={colors.secondary} />,
      title: 'Education',
      items: [
        `${student.academic.collegeName}`,
        `${student.academic.course} — ${student.academic.department}`,
        `CGPA: ${student.academic.cgpa} | Passing Year: ${student.academic.passingYear}`,
      ],
    },
    {
      icon: <Code2 size={16} color={colors.success} />,
      title: 'Technical Skills',
      items: [
        `Languages: ${student.skills.languages.join(', ')}`,
        `Frameworks: ${student.skills.frameworks.join(', ')}`,
        `Databases: ${student.skills.databases.join(', ')}`,
      ],
    },
    {
      icon: <FileText size={16} color={colors.warning} />,
      title: 'Projects',
      items: student.projects.map(p => `${p.title} — ${p.techStack.join(', ')}`),
    },
    {
      icon: <Phone size={16} color={colors.error} />,
      title: 'Social Links',
      items: [student.personal.linkedIn, student.personal.gitHub],
    },
  ];

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader title="Resume Preview" onBack={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.scrollContainer}>
        {/* Resume File Info */}
        <AppCard style={styles.fileCard}>
          <View style={styles.fileHeader}>
            <View style={styles.pdfIcon}>
              <FileText size={28} color={colors.error} />
            </View>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>{student.resumeName || 'Resume.pdf'}</Text>
              <Text style={styles.fileMeta}>Last updated: 2026-05-20 · 512 KB</Text>
              <View style={styles.verifiedRow}>
                <CheckCircle size={12} color={colors.success} />
                <Text style={styles.verifiedText}>Verified by TPO</Text>
              </View>
            </View>
          </View>

          {/* Preview Placeholder */}
          <View style={styles.previewBox}>
            <Eye size={32} color={colors.textMuted} />
            <Text style={styles.previewTitle}>PDF Preview</Text>
            <Text style={styles.previewSub}>
              Actual PDF rendering would appear here in production.{'\n'}
              Below are the extracted resume sections.
            </Text>
          </View>
        </AppCard>

        {/* Resume Sections */}
        <SectionHeader title="Extracted Resume Content" />
        {resumeSections.map((section, idx) => (
          <AppCard key={idx} style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>{section.icon}</View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            {section.items.map((item, i) => (
              <Text key={i} style={styles.sectionItem}>• {item}</Text>
            ))}
          </AppCard>
        ))}

        {/* Action Buttons */}
        <View style={styles.actions}>
          <AppButton
            title="Use This Resume"
            variant="primary"
            size="md"
            onPress={handleUseResume}
            style={styles.actionBtn}
          />
          <AppButton
            title="Download Demo"
            variant="outline"
            size="md"
            onPress={handleDownload}
            style={styles.actionBtn}
          />
          <TouchableOpacity style={styles.replaceBtn} onPress={handleReplace} activeOpacity={0.7}>
            <Upload size={16} color={colors.textMuted} />
            <Text style={styles.replaceBtnText}>Replace Resume</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fileCard: {
    marginBottom: 16,
  },
  fileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pdfIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.errorLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  fileInfo: { flex: 1 },
  fileName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  fileMeta: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 3,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  verifiedText: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '600',
    marginLeft: 4,
  },
  previewBox: {
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  previewTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textMuted,
    marginTop: 12,
  },
  previewSub: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  sectionCard: { marginBottom: 10 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  sectionItem: {
    fontSize: 12.5,
    color: colors.textMuted,
    lineHeight: 20,
    paddingLeft: 4,
  },
  actions: {
    marginTop: 8,
    marginBottom: 24,
  },
  actionBtn: {
    marginBottom: 10,
  },
  replaceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  replaceBtnText: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '600',
    marginLeft: 6,
  },
});
