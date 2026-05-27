import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { AppHeader } from '../../../components/AppHeader';
import { AppCard } from '../../../components/AppCard';
import { Badge } from '../../../components/Badge';
import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { mockStudents } from '../../../data/mockData';

type TPOStudentProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TPOStudentProfile'>;
};

type RouteProps = RouteProp<RootStackParamList, 'TPOStudentProfile'>;

export default function TPOStudentProfileScreen({ navigation }: TPOStudentProfileScreenProps) {
  const route = useRoute<RouteProps>();
  const { studentId } = route.params;

  const student = mockStudents.find((s) => s.prn === studentId) || mockStudents[0];

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader title="Student Profile Dossier" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <AppCard style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{student.name.split(' ')[0][0]}</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.studentName}>{student.name}</Text>
              <Text style={styles.studentDept}>{student.department}</Text>
              <Text style={styles.studentPrn}>{student.prn}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>CGPA:</Text>
            <Text style={styles.detailValue}>{student.cgpa}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Eligibility Score:</Text>
            <Text style={styles.detailValue}>{student.eligibilityScore}%</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Placement Status:</Text>
            <Badge 
              label={student.placementStatus} 
              variant={student.placementStatus === 'Placed' ? 'success' : 'warning'}
            />
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Resume Status:</Text>
            <Badge 
              label={student.resumeStatus} 
              variant={student.resumeStatus === 'Uploaded' ? 'success' : 'primary'}
            />
          </View>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {student.skills.map((skill: string, index: number) => (
              <View key={index} style={styles.skillChip}>
                <Text style={styles.skillChipText}>{skill}</Text>
              </View>
            ))}
          </View>
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
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  headerInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  studentDept: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  studentPrn: {
    fontSize: 12,
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
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    backgroundColor: colors.surface,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  skillChipText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  }
});
