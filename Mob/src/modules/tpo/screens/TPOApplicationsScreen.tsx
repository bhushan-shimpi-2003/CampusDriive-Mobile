import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CheckCircle, XCircle, ChevronRight, Layers, Award } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { Badge } from '../../../components/Badge';
import { AppCard } from '../../../components/AppCard';
import { EmptyState } from '../../../components/EmptyState';
import { mockApplications } from '../../../data/mockData';
import { SearchInput } from '../../../components/SearchInput';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TPOApplicationsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [applications, setApplications] = useState<any[]>(mockApplications);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = applications.filter((app) =>
    app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShortlist = (id: string, name: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: 'Shortlisted' as const,
              nextStep: 'Shortlisted for Online Aptitude assessment',
            }
          : app
      )
    );
    Alert.alert('Applicant Shortlisted', `${name} has been moved to the Shortlisted queue.`);
  };

  const handleAdvance = (id: string, name: string, currentStatus: string) => {
    const rounds = [
      'Applied',
      'Shortlisted',
      'Aptitude Round',
      'Technical Round',
      'HR Round',
      'Selected',
    ];
    const currentIndex = rounds.indexOf(currentStatus);
    
    if (currentIndex === -1 || currentIndex === rounds.length - 1) {
      Alert.alert('Fully Selected', `${name} has already reached the selection stage.`);
      return;
    }

    const nextStatus = rounds[currentIndex + 1];

    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: nextStatus as any,
              nextStep: `Moved to ${nextStatus} stage. Verify schedules.`,
            }
          : app
      )
    );
    Alert.alert('Milestone Advanced', `${name} advanced to ${nextStatus}.`);
  };

  const handleReject = (id: string, name: string) => {
    Alert.alert(
      'Reject Applicant',
      `Are you sure you want to close registrations and reject ${name} for this drive?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            setApplications((prev) =>
              prev.map((app) =>
                app.id === id
                  ? {
                      ...app,
                      status: 'Rejected' as const,
                      nextStep: 'Closed evaluation. Ineligible for this drive.',
                    }
                  : app
              )
            );
            Alert.alert('Applicant Rejected', `${name} marked as Rejected.`);
          },
        },
      ]
    );
  };

  const renderAppCard = ({ item }: { item: any }) => {
    const isSelected = item.status === 'Selected';
    const isRejected = item.status === 'Rejected';

    return (
      <AppCard style={styles.card}>
        <TouchableOpacity
          style={styles.cardHeader}
          onPress={() => navigation.navigate('TPOStudentProfile', { studentId: item.studentPrn })}
          activeOpacity={0.7}
        >
          <View style={styles.leftInfo}>
            <View style={styles.studentAvatar}>
              <Text style={styles.studentAvatarText}>
                {item.studentName.split(' ')[0][0] + item.studentName.split(' ').slice(-1)[0][0]}
              </Text>
            </View>
            <View>
              <Text style={styles.studentName}>{item.studentName}</Text>
              <Text style={styles.studentDept}>{item.studentDept}</Text>
            </View>
          </View>

          <View style={styles.scoreBox}>
            <Text style={styles.scoreText}>{item.eligibilityScore}% Match</Text>
          </View>
        </TouchableOpacity>

        {/* Applied Role */}
        <View style={styles.roleBox}>
          <Text style={styles.roleLabel}>APPLIED FOR</Text>
          <Text style={styles.roleText}>{item.companyName} – {item.role} ({item.packageOffer})</Text>
        </View>

        {/* Current status chip */}
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>CURRENT STAGE</Text>
          <Badge
            label={item.status}
            variant={isSelected ? 'success' : isRejected ? 'error' : 'warning'}
          />
        </View>

        {/* Action Panel */}
        {!isRejected && !isSelected && (
          <View style={styles.actionPanel}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.btnReject]}
              onPress={() => handleReject(item.id, item.studentName)}
              activeOpacity={0.7}
            >
              <XCircle size={14} color={colors.error} />
              <Text style={styles.btnTextReject}>Reject</Text>
            </TouchableOpacity>

            {item.status === 'Applied' && (
              <TouchableOpacity
                style={[styles.actionBtn, styles.btnShortlist]}
                onPress={() => handleShortlist(item.id, item.studentName)}
                activeOpacity={0.7}
              >
                <CheckCircle size={14} color={colors.primary} />
                <Text style={styles.btnTextShortlist}>Shortlist</Text>
              </TouchableOpacity>
            )}

            {item.status !== 'Applied' && (
              <TouchableOpacity
                style={[styles.actionBtn, styles.btnAdvance]}
                onPress={() => handleAdvance(item.id, item.studentName, item.status)}
                activeOpacity={0.7}
              >
                <CheckCircle size={14} color={colors.success} />
                <Text style={styles.btnTextAdvance}>Advance Stage</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </AppCard>
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Student Applications"
        showNotification={true}
        notificationCount={2}
      />

      <View style={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Filter applications by student or company..."
        />
      </View>

      <FlatList
        data={filteredApps}
        renderItem={renderAppCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <EmptyState
            title="No Applications"
            description="No student applications matched your current search filters."
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
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  studentAvatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondary,
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
  scoreBox: {
    backgroundColor: colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  scoreText: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '800',
  },
  roleBox: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  roleLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  roleText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginTop: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  statusLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
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
    borderColor: colors.error + '25',
  },
  btnShortlist: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary + '25',
  },
  btnAdvance: {
    backgroundColor: colors.successLight,
    borderColor: colors.success + '25',
  },
  btnTextReject: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.error,
    marginLeft: 6,
  },
  btnTextShortlist: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 6,
  },
  btnTextAdvance: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.success,
    marginLeft: 6,
  },
});
