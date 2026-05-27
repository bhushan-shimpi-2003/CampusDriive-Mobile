import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Check, ShieldCheck, Eye, Search, Award } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { Badge } from '../../../components/Badge';
import { AppCard } from '../../../components/AppCard';
import { SearchInput } from '../../../components/SearchInput';
import { EmptyState } from '../../../components/EmptyState';
import { mockStudents } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TPOStudentDatabaseScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [students, setStudents] = useState<any[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.prn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVerifyProfile = (prn: string, name: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.prn === prn
          ? { ...student, resumeStatus: 'Uploaded' as const }
          : student
      )
    );
    Alert.alert(
      'Profile Verified',
      `Graduation transcripts and resumes for student ${name} have been audited and verified.`
    );
  };

  const handleMarkEligible = (prn: string, name: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.prn === prn
          ? { ...student, eligibilityScore: 100 }
          : student
      )
    );
    Alert.alert(
      'Academic Override',
      `Student ${name} has been marked fully eligible for all upcoming drives.`
    );
  };

  const handleViewProfileDemo = (prn: string) => {
    navigation.navigate('TPOStudentProfile', { studentId: prn });
  };

  const renderStudentCard = ({ item }: { item: any }) => {
    const isCVUploaded = item.resumeStatus === 'Uploaded';
    const isPlaced = item.placementStatus === 'Placed';

    return (
      <AppCard style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <View style={styles.studentAvatar}>
              <Text style={styles.studentAvatarText}>
                {item.name.split(' ')[0][0] + item.name.split(' ').slice(-1)[0][0]}
              </Text>
            </View>
            <View>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text style={styles.studentDept}>{item.department}</Text>
            </View>
          </View>
          <Badge
            label={item.placementStatus}
            variant={isPlaced ? 'success' : item.placementStatus === 'In Process' ? 'warning' : 'muted'}
          />
        </View>

        {/* Academic specs row */}
        <View style={styles.specsRow}>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>ROLL / PRN</Text>
            <Text style={styles.specValue}>{item.prn}</Text>
          </View>
          <View style={styles.specDivider} />
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>CGPA</Text>
            <Text style={[styles.specValue, { color: colors.success }]}>{item.cgpa}</Text>
          </View>
          <View style={styles.specDivider} />
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>ELIGIBILITY</Text>
            <Text style={styles.specValue}>{item.eligibilityScore}%</Text>
          </View>
        </View>

        {/* Skills Tag list */}
        <View style={styles.skillsContainer}>
          {item.skills.map((skill: string, index: number) => (
            <View key={index} style={styles.skillChip}>
              <Text style={styles.skillChipText}>{skill}</Text>
            </View>
          ))}
        </View>

        {/* Document state row */}
        <View style={styles.docStateRow}>
          <Text style={styles.docLabel}>RESUME STATUS:</Text>
          <Badge
            label={item.resumeStatus}
            variant={isCVUploaded ? 'success' : 'warning'}
          />
        </View>

        {/* Action Panel Buttons */}
        <View style={styles.actionPanel}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => handleViewProfileDemo(item.prn)}
            activeOpacity={0.6}
          >
            <Eye size={14} color={colors.textMuted} />
            <Text style={styles.actionBtnText}>Dossier</Text>
          </TouchableOpacity>

          {!isCVUploaded && (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => handleVerifyProfile(item.prn, item.name)}
              activeOpacity={0.6}
            >
              <ShieldCheck size={14} color={colors.primary} />
              <Text style={[styles.actionBtnText, { color: colors.primary }]}>Verify</Text>
            </TouchableOpacity>
          )}

          {item.eligibilityScore < 100 && (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => handleMarkEligible(item.prn, item.name)}
              activeOpacity={0.6}
            >
              <Award size={14} color={colors.success} />
              <Text style={[styles.actionBtnText, { color: colors.success }]}>Override</Text>
            </TouchableOpacity>
          )}
        </View>
      </AppCard>
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Student Database"
        showNotification={true}
        notificationCount={2}
      />

      <View style={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by student name, roll, or branch..."
        />
      </View>

      <FlatList
        data={filteredStudents}
        renderItem={renderStudentCard}
        keyExtractor={(item) => item.prn}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <EmptyState
            title="No Records Found"
            description="No student registers match your search query."
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  listContainer: {
    paddingBottom: 24,
  },
  card: {
    marginVertical: 6,
    padding: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  studentAvatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  studentName: {
    fontSize: 14.5,
    fontWeight: '700',
    color: colors.text,
  },
  studentDept: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  specsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  specItem: {
    flex: 1,
    alignItems: 'center',
  },
  specLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  specValue: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.text,
  },
  specDivider: {
    width: 1,
    height: 18,
    backgroundColor: colors.border,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  skillChip: {
    backgroundColor: colors.background,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  skillChipText: {
    fontSize: 11,
    color: colors.text,
    fontWeight: '600',
  },
  docStateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  docLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  actionPanel: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    paddingVertical: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    marginLeft: 6,
  },
});
