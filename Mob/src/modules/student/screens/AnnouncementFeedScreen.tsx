import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Bell, Filter, Circle } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { FilterChips } from '../../../components/FilterChips';
import { PinnedAnnouncement } from '../../../components/PinnedAnnouncement';
import { EmptyState } from '../../../components/EmptyState';
import { RootStackParamList } from '../../../navigation/types';
import { mockAnnouncements } from '../../../data/mockData';
import { AnnouncementCategory } from '../../../shared/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CATEGORIES: { label: string; value: AnnouncementCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Drives', value: 'drives' },
  { label: 'Communities', value: 'communities' },
  { label: 'Results', value: 'results' },
  { label: 'Deadlines', value: 'deadlines' },
];

export default function AnnouncementFeedScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [category, setCategory] = useState<AnnouncementCategory>('all');

  const filteredAnnouncements = useMemo(() => {
    let anns = [...mockAnnouncements];
    if (category !== 'all') {
      anns = anns.filter(a => a.category === category);
    }
    return anns;
  }, [category]);

  const pinnedAnns = filteredAnnouncements.filter(a => a.isPinned);
  const normalAnns = filteredAnnouncements.filter(a => !a.isPinned);

  const handlePress = (ann: typeof mockAnnouncements[0]) => {
    if (!ann.relatedId) return;
    if (ann.category === 'drives' || ann.category === 'results') {
      navigation.navigate('DriveDetails', { driveId: ann.relatedId });
    } else if (ann.category === 'communities') {
      navigation.navigate('CommunityChat', { communityId: ann.relatedId });
    }
  };

  const renderItem = ({ item }: { item: typeof mockAnnouncements[0] }) => (
    <TouchableOpacity
      style={[styles.card, !item.isRead && styles.cardUnread]}
      onPress={() => handlePress(item)}
      activeOpacity={item.relatedId ? 0.7 : 1}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          {!item.isRead && <Circle size={8} fill={colors.primary} color={colors.primary} style={styles.unreadDot} />}
          <Text style={[styles.title, !item.isRead && styles.titleUnread]} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.body} numberOfLines={3}>{item.body}</Text>
      <View style={styles.footer}>
        <Text style={styles.author}>{item.author}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader title="Announcements" onBack={() => navigation.goBack()} />

      <View style={styles.filterWrapper}>
        <View style={styles.filterLabelRow}>
          <Filter size={14} color={colors.textMuted} />
          <Text style={styles.filterLabel}>Filter Feed</Text>
        </View>
        <FilterChips
          options={CATEGORIES}
          selected={[category]}
          onSelect={(v) => setCategory(v as AnnouncementCategory)}
        />
      </View>

      <FlatList
        data={normalAnns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          pinnedAnns.length > 0 ? (
            <View style={styles.pinnedSection}>
              {pinnedAnns.map((p) => (
                <PinnedAnnouncement
                  key={p.id}
                  title={p.title}
                  body={p.body}
                  author={p.author}
                  time={p.time}
                  onPress={p.relatedId ? () => handlePress(p) : undefined}
                />
              ))}
            </View>
          ) : null
        }
        ListEmptyComponent={
          <EmptyState
            title="No announcements"
            description="There are no announcements in this category."
            icon={<Bell size={40} color={colors.textMuted} />}
          />
        }
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterWrapper: {
    marginBottom: 12,
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
  pinnedSection: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
  },
  cardUnread: {
    backgroundColor: colors.primaryLight + '50',
    borderColor: colors.primary + '50',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 10,
  },
  unreadDot: {
    marginTop: 5,
    marginRight: 6,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  titleUnread: {
    fontWeight: '800',
  },
  time: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  body: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontSize: 11.5,
    fontWeight: '500',
    color: colors.textMuted,
  },
  categoryBadge: {
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'capitalize',
  },
});
