import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { CalendarEventCard } from '../../../components/CalendarEventCard';
import { FilterChips } from '../../../components/FilterChips';
import { EmptyState } from '../../../components/EmptyState';
import { RootStackParamList } from '../../../navigation/types';
import { mockCalendarEvents } from '../../../data/mockData';
import { CalendarEventType } from '../../../shared/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EVENT_TYPES: { label: string; value: CalendarEventType | 'all' }[] = [
  { label: 'All Events', value: 'all' },
  { label: 'Interviews', value: 'interview' },
  { label: 'Deadlines', value: 'deadline' },
  { label: 'Drives', value: 'drive' },
  { label: 'Results', value: 'result' },
  { label: 'Announcements', value: 'announcement' },
];

export default function CalendarScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [filterType, setFilterType] = useState<CalendarEventType | 'all'>('all');

  const filteredEvents = useMemo(() => {
    let evs = [...mockCalendarEvents];
    if (filterType !== 'all') {
      evs = evs.filter(e => e.type === filterType);
    }
    // Sort by date closest to farthest
    evs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return evs;
  }, [filterType]);

  const handleEventPress = (event: typeof mockCalendarEvents[0]) => {
    if (event.relatedId) {
      if (event.type === 'interview' || event.type === 'result') {
        navigation.navigate('StudentApplicationDetails', { applicationId: 'app1' }); // Mock app ID
      } else if (event.type === 'drive' || event.type === 'deadline') {
        navigation.navigate('DriveDetails', { driveId: event.relatedId });
      }
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader title="Placement Calendar" onBack={() => navigation.goBack()} />

      <View style={styles.calendarHeader}>
        <TouchableOpacity style={styles.navBtn}>
          <ChevronLeft size={20} color={colors.textMuted} />
        </TouchableOpacity>
        <Text style={styles.monthText}>June 2026</Text>
        <TouchableOpacity style={styles.navBtn}>
          <ChevronRight size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterWrapper}>
        <View style={styles.filterLabelRow}>
          <Filter size={14} color={colors.textMuted} />
          <Text style={styles.filterLabel}>Filter by Type</Text>
        </View>
        <FilterChips
          options={EVENT_TYPES}
          selected={[filterType]}
          onSelect={(v) => setFilterType(v as CalendarEventType | 'all')}
        />
      </View>

      {filteredEvents.length === 0 ? (
        <EmptyState
          title="No events found"
          description="There are no upcoming events for this filter."
          icon={<CalendarIcon size={40} color={colors.textMuted} />}
        />
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CalendarEventCard event={item} onPress={() => handleEventPress(item)} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  navBtn: {
    padding: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  filterWrapper: {
    marginBottom: 16,
  },
  filterLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    marginLeft: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  list: {
    paddingBottom: 24,
  },
});
