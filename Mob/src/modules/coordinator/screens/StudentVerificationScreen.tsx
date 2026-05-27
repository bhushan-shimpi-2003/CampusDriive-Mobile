import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Check, ClipboardCheck, AlertTriangle, Eye, X, Search } from 'lucide-react-native';

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

export default function StudentVerificationScreen() {
  const navigation = useNavigation<NavigationProp>();
  // Let's filter students who are "Unplaced" or pending verification as verification targets
  const [verificationStudents, setVerificationStudents] = useState<any[]>(
    mockStudents.slice(0, 10).map((s, index) => ({
      ...s,
      verificationStatus: index % 3 === 0 ? 'Pending' : 'Verified',
    }))
  );
  
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = verificationStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.prn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVerify = (prn: string, name: string) => {
    setVerificationStudents((prev) =>
      prev.map((s) =>
        s.prn === prn ? { ...s, verificationStatus: 'Verified' } : s
      )
    );
    Alert.alert(
      'Credentials Verified',
      `Academic details and PDF marksheet transcripts for ${name} have been approved and verified.`
    );
  };

  const handleRequestUpdate = (name: string) => {
    Alert.alert(
      'Document Resubmission',
      `Audit warning dispatched to ${name}. Student will be prompted to re-upload their Sem 5 marksheet.`,
      [{ text: 'OK' }]
    );
  };

  const handleRejectDemo = (prn: string, name: string) => {
    Alert.alert(
      'Reject Credentials',
      `Are you sure you want to flag and reject the academic submissions of ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            setVerificationStudents((prev) =>
              prev.map((s) =>
                s.prn === prn ? { ...s, verificationStatus: 'Rejected' } : s
              )
            );
            Alert.alert('Submissions Flagged', `Student ${name} credentials marked as Incomplete/Rejected.`);
          },
        },
      ]
    );
  };

  const renderStudentCard = ({ item }: { item: any }) => {
    const isPending = item.verificationStatus === 'Pending';
    const isVerified = item.verificationStatus === 'Verified';

    return (
      <AppCard style={styles.card}>
        <TouchableOpacity 
          style={styles.cardHeader} 
          onPress={() => navigation.navigate('CoordinatorStudentDetails', { studentId: item.prn })}
          activeOpacity={0.7}
        >
          <View style={styles.headerLeft}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {item.name.split(' ')[0][0] + item.name.split(' ').slice(-1)[0][0]}
              </Text>
            </View>
            <View>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text style={styles.studentDept}>{item.department}</Text>
            </View>
          </View>
          <Badge
            label={item.verificationStatus}
            variant={isVerified ? 'success' : item.verificationStatus === 'Rejected' ? 'error' : 'warning'}
          />
        </TouchableOpacity>

        {/* Audit Details */}
        <View style={styles.auditStats}>
          <View style={styles.auditItem}>
            <Text style={styles.auditLabel}>CGPA RECORD</Text>
            <Text style={[styles.auditValue, { color: colors.success }]}>{item.cgpa}</Text>
          </View>
          <View style={styles.auditDivider} />
          <View style={styles.auditItem}>
            <Text style={styles.auditLabel}>ROLL NUMBER</Text>
            <Text style={styles.auditValue}>{item.prn}</Text>
          </View>
          <View style={styles.auditDivider} />
          <View style={styles.auditItem}>
            <Text style={styles.auditLabel}>BACKLOGS</Text>
            <Text style={styles.auditValue}>{item.activeBacklogs}</Text>
          </View>
        </View>

        {/* Action Panel Buttons */}
        {isPending && (
          <View style={styles.actionPanel}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.btnReject]}
              onPress={() => handleRejectDemo(item.prn, item.name)}
              activeOpacity={0.7}
            >
              <X size={14} color={colors.error} />
              <Text style={styles.btnTextReject}>Reject</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.btnRequest]}
              onPress={() => handleRequestUpdate(item.name)}
              activeOpacity={0.7}
            >
              <AlertTriangle size={14} color={colors.warning} />
              <Text style={styles.btnTextRequest}>Fix Req</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.btnVerify]}
              onPress={() => handleVerify(item.prn, item.name)}
              activeOpacity={0.7}
            >
              <Check size={14} color={colors.white} />
              <Text style={styles.btnTextVerify}>Verify</Text>
            </TouchableOpacity>
          </View>
        )}
      </AppCard>
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Student Verifications"
        showNotification={true}
        notificationCount={1}
      />

      <View style={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Filter students by name or roll..."
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
            title="Verification Inbox Clear"
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
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
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
  auditStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  auditItem: {
    flex: 1,
    alignItems: 'center',
  },
  auditLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  auditValue: {
    fontSize: 12.5,
    fontWeight: '800',
    color: colors.text,
  },
  auditDivider: {
    width: 1,
    height: 18,
    backgroundColor: colors.border,
  },
  actionPanel: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  btnReject: {
    backgroundColor: colors.errorLight,
    borderColor: colors.error + '20',
  },
  btnRequest: {
    backgroundColor: colors.warningLight,
    borderColor: colors.warning + '20',
  },
  btnVerify: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  btnTextReject: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.error,
    marginLeft: 6,
  },
  btnTextRequest: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.warning,
    marginLeft: 6,
  },
  btnTextVerify: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    marginLeft: 6,
  },
});
