import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Bell, Filter, Plus, PenSquare } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { FilterChips } from '../../../components/FilterChips';
import { EmptyState } from '../../../components/EmptyState';
import { RootStackParamList } from '../../../navigation/types';
import { mockAnnouncements } from '../../../data/mockData';
import { AnnouncementCategory } from '../../../shared/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CATEGORIES: { label: string; value: AnnouncementCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Drives', value: 'drives' },
  { label: 'Deadlines', value: 'deadlines' },
];

export default function TPOAnnouncementFeedScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [category, setCategory] = useState<AnnouncementCategory>('all');

  const filteredAnnouncements = useMemo(() => {
    let anns = [...mockAnnouncements];
    if (category !== 'all') {
      anns = anns.filter(a => a.category === category);
    }
    return anns;
  }, [category]);

  const handlePress = (ann: typeof mockAnnouncements[0]) => {
    if (!ann.relatedId) return;
    navigation.navigate('TPODriveDetails', { driveId: ann.relatedId });
  };

  const renderItem = ({ item }: { item: typeof mockAnnouncements[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePress(item)}
      activeOpacity={item.relatedId ? 0.7 : 1}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleRow}>
          {item.isPinned && <Text style={styles.pinText}>📌 </Text>}
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.body} numberOfLines={3}>{item.body}</Text>
      <View style={styles.footer}>
        <Text style={styles.author}>Sent by: {item.author}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="TPO Announcements"
        showBack={true}
        onBack={() => navigation.goBack()}
      />

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
        data={filteredAnnouncements}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            title="No announcements sent"
            description="You haven't sent any announcements in this category."
            icon={<PenSquare size={40} color={colors.textMuted} />}
          />
        }
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterWrapper: { marginBottom: 12 },
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
  list: { paddingBottom: 24 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
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
  pinText: { fontSize: 14 },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
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
