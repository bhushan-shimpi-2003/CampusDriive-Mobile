import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FileText, UploadCloud, Trash2, CheckCircle, Clock, Eye } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { AppCard } from '../../../components/AppCard';
import { AppButton } from '../../../components/AppButton';
import { mockStudentProfile } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ResumeUploadScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [resumeName, setResumeName] = useState<string | null>(mockStudentProfile.resumeName || null);
  const [uploading, setUploading] = useState(false);

  // List of other required placement documents
  const [documents, setDocuments] = useState([
    { id: 'doc1', name: '10th Marksheet (Verified)', status: 'Uploaded', type: 'marksheet' },
    { id: 'doc2', name: '12th / Diploma Marksheet (Verified)', status: 'Uploaded', type: 'marksheet' },
    { id: 'doc3', name: 'College Photo ID (Verified)', status: 'Uploaded', type: 'id' },
    { id: 'doc4', name: 'React Native & AWS Certificate', status: 'Uploaded', type: 'certificate' },
    { id: 'doc5', name: 'Graduation Sem 1-5 Cumulative Transcript', status: 'Pending', type: 'marksheet' },
  ]);

  const handleUploadResume = () => {
    setUploading(true);
    // Simulate Upload Delay
    setTimeout(() => {
      setUploading(false);
      setResumeName('Bhushan_Shimpi_Resume_v2.pdf');
      Alert.alert('Upload Success', 'Your resume PDF was uploaded and analysed by our Smart ATS system.');
    }, 1500);
  };

  const handleDeleteResume = () => {
    Alert.alert(
      'Remove Resume',
      'Are you sure you want to delete your current resume? Active placement applications require a valid CV.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setResumeName(null),
        },
      ]
    );
  };

  const handleUploadDoc = (id: string) => {
    Alert.alert('Upload Document', 'Select document source (Files / Camera).');
    // Simulating document upload
    setDocuments(prev =>
      prev.map(d => (d.id === id ? { ...d, status: 'Uploaded' } : d))
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Document Vault"
        showBack={true}
        onBack={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.scrollContainer}>
        <Text style={styles.leadText}>
          Upload and organize your academic marksheets and career resumes. Our system shares these verified records with campus recruiters.
        </Text>

        {/* Primary Resume Section */}
        <Text style={styles.sectionHeader}>Primary Resume (PDF)</Text>
        
        {resumeName ? (
          <AppCard style={styles.resumeCard}>
            <View style={styles.fileRow}>
              <View style={styles.fileIconWrapper}>
                <FileText size={24} color={colors.primary} />
              </View>
              <View style={styles.fileDetails}>
                <Text style={styles.fileName} numberOfLines={1}>{resumeName}</Text>
                <Text style={styles.fileMeta}>PDF Format • 1.2 MB • ATS Score: 85</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={handleDeleteResume}
                activeOpacity={0.6}
              >
                <Trash2 size={18} color={colors.error} />
              </TouchableOpacity>
            </View>
            <View style={styles.resumeActions}>
              <AppButton
                title="Preview"
                variant="outline"
                size="sm"
                onPress={() => navigation.navigate('ResumePreview')}
                style={styles.actionBtn}
              />
              <AppButton
                title="Replace Resume"
                variant="primary"
                size="sm"
                onPress={handleUploadResume}
                style={[styles.actionBtn, { marginLeft: 8 }]}
              />
            </View>
          </AppCard>
        ) : (
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={handleUploadResume}
            activeOpacity={0.7}
          >
            {uploading ? (
              <View style={styles.uploadingLoader}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.uploadingText}>Analyzing layout structure...</Text>
              </View>
            ) : (
              <View style={styles.uploadContent}>
                <UploadCloud size={44} color={colors.primary} />
                <Text style={styles.uploadTitle}>Upload ATS Resume</Text>
                <Text style={styles.uploadSubtitle}>Supports PDF formats up to 5MB</Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        {/* Other Placement Credentials */}
        <Text style={styles.sectionHeader}>Academic & Skills Verification Credentials</Text>
        
        {documents.map((doc) => {
          const isUploaded = doc.status === 'Uploaded';
          return (
            <View key={doc.id} style={styles.docRow}>
              <View style={styles.docLeft}>
                <View style={[styles.statusIcon, { backgroundColor: isUploaded ? colors.successLight : colors.warningLight }]}>
                  {isUploaded ? (
                    <CheckCircle size={16} color={colors.success} />
                  ) : (
                    <Clock size={16} color={colors.warning} />
                  )}
                </View>
                <Text style={[styles.docName, !isUploaded && styles.docNamePending]} numberOfLines={1}>
                  {doc.name}
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.uploadButtonChip, isUploaded && styles.uploadedChip]}
                onPress={() => !isUploaded && handleUploadDoc(doc.id)}
                activeOpacity={0.7}
                disabled={isUploaded}
              >
                <Text style={[styles.uploadChipText, isUploaded && styles.uploadedChipText]}>
                  {isUploaded ? 'Verified' : 'Upload'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  leadText: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  resumeCard: {
    borderColor: colors.primary,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  fileDetails: {
    flex: 1,
    paddingRight: 8,
  },
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
  deleteBtn: {
    padding: 8,
  },
  resumeActions: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 12,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  uploadBox: {
    height: 140,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: colors.primaryLight + '05',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 8,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  uploadingLoader: {
    alignItems: 'center',
  },
  uploadingText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 10,
  },
  docRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  docLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
  },
  statusIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  docName: {
    fontSize: 13.5,
    fontWeight: '600',
    color: colors.text,
  },
  docNamePending: {
    color: colors.textMuted,
  },
  uploadButtonChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  uploadedChip: {
    backgroundColor: colors.successLight,
  },
  uploadChipText: {
    fontSize: 11,
    color: colors.white,
    fontWeight: '700',
  },
  uploadedChipText: {
    color: colors.success,
  },
});
