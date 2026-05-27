import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ShieldCheck, XCircle } from 'lucide-react-native';
import { RootStackParamList } from '../../../navigation/types';
import { AppHeader } from '../../../components/AppHeader';
import { AppCard } from '../../../components/AppCard';
import { Badge } from '../../../components/Badge';
import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { mockStudents } from '../../../data/mockData';

type CoordinatorStudentDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CoordinatorStudentDetails'>;
};

type RouteProps = RouteProp<RootStackParamList, 'CoordinatorStudentDetails'>;

export default function CoordinatorStudentDetailsScreen({ navigation }: CoordinatorStudentDetailsScreenProps) {
  const route = useRoute<RouteProps>();
  const { studentId } = route.params;

  const student = mockStudents.find((s) => s.prn === studentId) || mockStudents[0];

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader title="Student Verification" onBack={() => navigation.goBack()} />
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
            <Text style={styles.detailLabel}>Active Backlogs:</Text>
            <Text style={styles.detailValue}>0</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Resume Uploaded:</Text>
            <Badge 
              label={student.resumeStatus === 'Uploaded' ? 'Yes' : 'No'} 
              variant={student.resumeStatus === 'Uploaded' ? 'success' : 'warning'}
            />
          </View>
        </AppCard>

        {/* Verification Actions */}
        <Text style={styles.sectionTitle}>Verification Actions</Text>
        <AppCard style={styles.actionsCard}>
          <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
            <View style={[styles.actionIconCircle, { backgroundColor: colors.success + '15' }]}>
              <ShieldCheck size={20} color={colors.success} />
            </View>
            <Text style={styles.actionText}>Approve Student</Text>
          </TouchableOpacity>
          <View style={styles.actionDivider} />
          <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
            <View style={[styles.actionIconCircle, { backgroundColor: colors.error + '15' }]}>
              <XCircle size={20} color={colors.error} />
            </View>
            <Text style={styles.actionText}>Reject Student</Text>
          </TouchableOpacity>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.sectionTitle}>Uploaded Documents</Text>
          <View style={styles.documentItem}>
            <Text style={styles.documentName}>Resume.pdf</Text>
            <Text style={styles.documentLink}>View Document</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.documentItem}>
            <Text style={styles.documentName}>Transcript_Sem6.pdf</Text>
            <Text style={styles.documentLink}>View Document</Text>
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
  actionsCard: {
    marginBottom: 24,
    padding: 0,
    overflow: 'hidden',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  actionDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 72,
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  documentName: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  documentLink: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
  }
});
