import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Plus, Search, Calendar, Users, Eye, XOctagon, Edit3 } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { SearchInput } from '../../../components/SearchInput';
import { Badge } from '../../../components/Badge';
import { AppCard } from '../../../components/AppCard';
import { EmptyState } from '../../../components/EmptyState';
import { mockPlacementDrives } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TPODriveManagementScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [drives, setDrives] = useState(mockPlacementDrives);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDrives = drives.filter(d =>
    d.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCloseDrive = (id: string, name: string) => {
    Alert.alert(
      'Close Recruitment Drive',
      `Are you sure you want to close registrations for ${name}? Eligible students will no longer be able to submit applications.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Close Drive',
          style: 'destructive',
          onPress: () => {
            setDrives(prev =>
              prev.map(d => (d.id === id ? { ...d, status: 'Closed' as const } : d))
            );
            Alert.alert('Drive Closed', 'Recruitment registrations closed successfully.');
          },
        },
      ]
    );
  };

  const handleEditDemo = (name: string) => {
    Alert.alert('Edit Drive (Demo)', `Opening edit configuration panel for ${name}.`);
  };

  const renderDriveCard = ({ item }: { item: typeof mockPlacementDrives[0] }) => {
    return (
      <AppCard style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>{item.companyName[0]}</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>{item.companyName} Hiring</Text>
              <Text style={styles.cardSub}>{item.role} • {item.packageOffer}</Text>
            </View>
          </View>
          <Badge
            label={item.status}
            variant={item.status === 'Active' ? 'success' : item.status === 'Upcoming' ? 'warning' : 'muted'}
          />
        </View>

        {/* Analytics counts inside drive card */}
        <View style={styles.analyticsRow}>
          <View style={styles.analyticCol}>
            <Text style={styles.analyticLabel}>ELIGIBLE</Text>
            <Text style={styles.analyticValue}>{item.eligibleCount}</Text>
          </View>
          <View style={styles.analyticDivider} />
          <View style={styles.analyticCol}>
            <Text style={styles.analyticLabel}>APPLICANTS</Text>
            <Text style={[styles.analyticValue, { color: colors.primary }]}>{item.applicantsCount}</Text>
          </View>
          <View style={styles.analyticDivider} />
          <View style={styles.analyticCol}>
            <Text style={styles.analyticLabel}>MIN CGPA</Text>
            <Text style={styles.analyticValue}>{item.minCGPA}</Text>
          </View>
        </View>

        {/* Calendar details */}
        <View style={styles.calendarRow}>
          <Calendar size={14} color={colors.textMuted} />
          <Text style={styles.calendarText}>Registrations Deadline: {item.deadline}</Text>
        </View>

        {/* Action Panel Buttons */}
        <View style={styles.actionPanel}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => handleEditDemo(item.companyName)}
            activeOpacity={0.6}
          >
            <Edit3 size={14} color={colors.textMuted} />
            <Text style={styles.actionBtnText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => navigation.navigate('TPODriveDetails', { driveId: item.id })}
            activeOpacity={0.6}
          >
            <Eye size={14} color={colors.primary} />
            <Text style={[styles.actionBtnText, { color: colors.primary }]}>View</Text>
          </TouchableOpacity>

          {item.status === 'Active' && (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => handleCloseDrive(item.id, item.companyName)}
              activeOpacity={0.6}
            >
              <XOctagon size={14} color={colors.error} />
              <Text style={[styles.actionBtnText, { color: colors.error }]}>Close</Text>
            </TouchableOpacity>
          )}
        </View>
      </AppCard>
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Placement Campaigns"
        rightElement={
          <TouchableOpacity
            style={styles.fabHeader}
            onPress={() => navigation.navigate('TPOCreateDrive')}
            activeOpacity={0.8}
          >
            <Plus size={20} color={colors.white} />
            <Text style={styles.fabHeaderText}>Create</Text>
          </TouchableOpacity>
        }
      />

      <View style={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Filter campaigns by company/role..."
        />
      </View>

      <FlatList
        data={filteredDrives}
        renderItem={renderDriveCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <EmptyState
            title="No Campaigns Found"
            description="Create a new recruitment drive or reset your active filters."
            actionTitle="Reset Search"
            onAction={() => setSearchQuery('')}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fabHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  fabHeaderText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  cardSub: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  analyticsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  analyticCol: {
    flex: 1,
    alignItems: 'center',
  },
  analyticLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  analyticValue: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.text,
  },
  analyticDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
  },
  calendarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  calendarText: {
    fontSize: 12.5,
    color: colors.textMuted,
    marginLeft: 8,
    fontWeight: '500',
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
    paddingVertical: 4,
  },
  actionBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.textMuted,
    marginLeft: 6,
  },
});
