import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search, Calendar, Users, Milestone, ChevronRight } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { Badge } from '../../../components/Badge';
import { AppCard } from '../../../components/AppCard';
import { SearchInput } from '../../../components/SearchInput';
import { EmptyState } from '../../../components/EmptyState';
import { mockCoordinatorDrives } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AssignedDrivesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDrives = mockCoordinatorDrives.filter(d =>
    d.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDriveCard = ({ item }: { item: typeof mockCoordinatorDrives[0] }) => {
    return (
      <AppCard style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>{item.companyName[0]}</Text>
            </View>
            <View>
              <Text style={styles.companyTitle}>{item.companyName} Hiring</Text>
              <Text style={styles.roleTitle}>{item.role}</Text>
            </View>
          </View>
          <Badge
            label={item.status}
            variant={item.status === 'Active' ? 'success' : 'muted'}
          />
        </View>

        {/* Info Grid */}
        <View style={styles.infoRow}>
          <View style={styles.infoCol}>
            <Users size={14} color={colors.textMuted} />
            <Text style={styles.infoVal}>{item.applicantsCount} Applicants</Text>
          </View>
          <View style={styles.infoCol}>
            <Milestone size={14} color={colors.textMuted} />
            <Text style={styles.infoVal}>{item.currentRound}</Text>
          </View>
        </View>

        {/* Footer date */}
        <View style={styles.footerRow}>
          <View style={styles.dateRow}>
            <Calendar size={12} color={colors.textMuted} />
            <Text style={styles.dateText}>Registrations Deadline: {item.deadline}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => navigation.navigate('CoordinatorDriveDetails', { driveId: item.id })}
            activeOpacity={0.6}
          >
            <Text style={styles.actionBtnText}>View Details</Text>
            <ChevronRight size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </AppCard>
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Assigned Placement Drives"
        showNotification={true}
        notificationCount={1}
      />

      <View style={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Filter assigned drives..."
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
            title="No Assigned Drives"
            description="You have no active recruitment drives assigned to you at this time."
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
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  companyTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: colors.text,
  },
  roleTitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  infoCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoVal: {
    fontSize: 12.5,
    color: colors.text,
    marginLeft: 6,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FAFAFA',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 11.5,
    color: colors.textMuted,
    marginLeft: 4,
    fontWeight: '500',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 2,
  },
});
