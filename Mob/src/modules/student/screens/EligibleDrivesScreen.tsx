import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MapPin, Calendar, Award, CheckCircle, Clock, SlidersHorizontal } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { SearchInput } from '../../../components/SearchInput';
import { Badge } from '../../../components/Badge';
import { AppCard } from '../../../components/AppCard';
import { EmptyState } from '../../../components/EmptyState';
import { FilterChips } from '../../../components/FilterChips';
import { LoadingSkeleton } from '../../../components/LoadingSkeleton';
import { OfflineBanner } from '../../../components/OfflineBanner';
import { BookmarkButton } from '../../../components/BookmarkButton';
import { mockPlacementDrives, mockStudentProfile, mockSavedDriveIds } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type DriveTab = 'eligible' | 'applied' | 'all';

export default function EligibleDrivesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<DriveTab>('eligible');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [savedIds, setSavedIds] = useState<string[]>(mockSavedDriveIds);

  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const handleBookmarkToggle = (driveId: string) => {
    setSavedIds(prev =>
      prev.includes(driveId) ? prev.filter(id => id !== driveId) : [...prev, driveId]
    );
  };

  // Bhushan's profile details to check eligibility locally
  const { cgpa, activeBacklogs, department } = mockStudentProfile.academic;

  const checkEligibility = (drive: typeof mockPlacementDrives[0]) => {
    const cgpaEligible = cgpa >= drive.minCGPA;
    const deptEligible = drive.departments.includes(department);
    const backlogEligible = drive.backlogsAllowed || activeBacklogs === 0;

    return cgpaEligible && deptEligible && backlogEligible;
  };

  const getFilteredDrives = () => {
    return mockPlacementDrives.filter((drive) => {
      // 1. Tab Filters
      if (activeTab === 'eligible') {
        const eligible = checkEligibility(drive);
        if (!eligible) return false;
      } else if (activeTab === 'applied') {
        // Mocking applied state - let's treat Accenture and TCS Ninja/Digital as applied
        const isApplied = ['d6', 'd2', 'd1'].includes(drive.id);
        if (!isApplied) return false;
      }

      // 2. Search query filter
      const matchesSearch =
        drive.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drive.role.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // 3. Job Type Filter
      if (jobTypeFilter !== 'All') {
        if (drive.jobType !== jobTypeFilter) return false;
      }

      return true;
    });
  };

  const filteredDrives = getFilteredDrives();

  const renderDriveCard = ({ item }: { item: typeof mockPlacementDrives[0] }) => {
    const isEligible = checkEligibility(item);
    const isApplied = ['d6', 'd2', 'd1'].includes(item.id);

    return (
      <AppCard
        title={`${item.companyName} – ${item.role}`}
        description={item.description}
        headerRight={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.packageText}>{item.packageOffer}</Text>
            <View style={{ width: 8 }} />
            <BookmarkButton
              isBookmarked={savedIds.includes(item.id)}
              onToggle={() => handleBookmarkToggle(item.id)}
            />
          </View>
        }
        footer={
          <View style={styles.cardFooter}>
            <View style={styles.metaRow}>
              <MapPin size={14} color={colors.textMuted} />
              <Text style={styles.metaText}>{item.location} ({item.workMode})</Text>
            </View>
            <View style={styles.metaRow}>
              <Calendar size={14} color={colors.textMuted} />
              <Text style={styles.metaText}>Deadline: {item.deadline}</Text>
            </View>
          </View>
        }
        onPress={() => navigation.navigate('DriveDetails', { driveId: item.id })}
        style={styles.driveCard}
      >
        <View style={styles.chipsRow}>
          <Badge
            label={item.jobType}
            variant="info"
            style={styles.badgeMargin}
          />
          {isApplied ? (
            <Badge label="Applied" variant="success" style={styles.badgeMargin} />
          ) : isEligible ? (
            <Badge label="Eligible" variant="primary" style={styles.badgeMargin} />
          ) : (
            <Badge label="Ineligible" variant="error" style={styles.badgeMargin} />
          )}
          
          <Badge
            label={item.status}
            variant={item.status === 'Active' ? 'success' : item.status === 'Upcoming' ? 'warning' : 'muted'}
          />
        </View>
      </AppCard>
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Placement Drives"
        showNotification={true}
        notificationCount={2}
        onNotificationPress={() => navigation.navigate('Notifications')}
      />

      <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
        <OfflineBanner />
      </View>

      {/* Tabs Row */}
      <View style={styles.tabHeader}>
        {(['eligible', 'applied', 'all'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabBtn,
              activeTab === tab && styles.activeTabBtn,
            ]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabBtnText,
                activeTab === tab && styles.activeTabBtnText,
              ]}
            >
              {tab === 'eligible' ? 'Eligible' : tab === 'applied' ? 'Applied' : 'All Drives'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filter Widgets Header */}
      <View style={styles.filterSection}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by company or role..."
          style={styles.searchBar}
        />
      </View>

      {/* Category Horizontal Scrolling Filters */}
      <View style={styles.categoryScrollContainer}>
        <FilterChips
          options={[
            { label: 'All', value: 'All' },
            { label: 'Full-time', value: 'Full-time' },
            { label: 'Internship', value: 'Internship' },
          ]}
          selected={[jobTypeFilter]}
          onSelect={(v) => setJobTypeFilter(v)}
        />
      </View>

      {/* Drive Lists */}
      {isLoading ? (
        <View style={{ paddingHorizontal: 16 }}>
          <LoadingSkeleton type="cards" count={3} />
        </View>
      ) : (
        <FlatList
        data={filteredDrives}
        renderItem={renderDriveCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <EmptyState
            title="No Drives Found"
            description="No placement drives match your active search terms or filters."
            actionTitle="Reset Filters"
            onAction={() => {
              setSearchQuery('');
              setJobTypeFilter('All');
              setActiveTab('eligible');
            }}
          />
        }
      />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabHeader: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTabBtn: {
    backgroundColor: colors.primaryLight,
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
  },
  activeTabBtnText: {
    color: colors.primary,
  },
  filterSection: {
    paddingTop: 12,
    paddingHorizontal: 4,
  },
  searchBar: {
    flex: 1,
  },
  categoryScrollContainer: {
    marginVertical: 10,
    paddingHorizontal: 4,
  },
  categoryScroll: {
    paddingBottom: 2,
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    marginRight: 8,
  },
  activeCategoryChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  activeCategoryChipText: {
    color: colors.white,
  },
  listContainer: {
    paddingBottom: 24,
  },
  driveCard: {
    marginVertical: 6,
  },
  packageText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.secondary,
  },
  chipsRow: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 8,
  },
  badgeMargin: {
    marginRight: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: 4,
  },
});
