import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, FlatList,
  TouchableOpacity, TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search, X, Clock, Briefcase, MessageSquare, FileText, Bell } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { FilterChips } from '../../../components/FilterChips';
import { EmptyState } from '../../../components/EmptyState';
import { RootStackParamList } from '../../../navigation/types';
import {
  mockPlacementDrives, mockCommunities, mockApplications,
  mockAnnouncements, mockRecentSearches
} from '../../../data/mockData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type SearchCategory = 'all' | 'drives' | 'communities' | 'applications' | 'announcements';

const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Drives', value: 'drives' },
  { label: 'Communities', value: 'communities' },
  { label: 'Applications', value: 'applications' },
  { label: 'Announcements', value: 'announcements' },
];

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');
  const [recentSearches, setRecentSearches] = useState(mockRecentSearches);

  const q = query.toLowerCase().trim();

  const results = useMemo(() => {
    if (!q) return [];
    const items: { id: string; type: SearchCategory; title: string; subtitle: string; relatedId: string }[] = [];

    if (category === 'all' || category === 'drives') {
      mockPlacementDrives.filter(d =>
        d.companyName.toLowerCase().includes(q) || d.role.toLowerCase().includes(q)
      ).forEach(d => items.push({
        id: d.id, type: 'drives',
        title: `${d.companyName} — ${d.role}`,
        subtitle: `${d.packageOffer} · ${d.status}`,
        relatedId: d.id,
      }));
    }
    if (category === 'all' || category === 'communities') {
      mockCommunities.filter(c =>
        c.companyName.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)
      ).forEach(c => items.push({
        id: c.id, type: 'communities',
        title: `${c.companyName} Recruitment Group`,
        subtitle: `${c.memberCount} members`,
        relatedId: c.id,
      }));
    }
    if (category === 'all' || category === 'applications') {
      mockApplications.filter(a =>
        a.companyName.toLowerCase().includes(q) || a.role.toLowerCase().includes(q)
      ).forEach(a => items.push({
        id: a.id, type: 'applications',
        title: `${a.companyName} — ${a.role}`,
        subtitle: `Status: ${a.status}`,
        relatedId: a.id,
      }));
    }
    if (category === 'all' || category === 'announcements') {
      mockAnnouncements.filter(an =>
        an.title.toLowerCase().includes(q) || an.body.toLowerCase().includes(q)
      ).forEach(an => items.push({
        id: an.id, type: 'announcements',
        title: an.title,
        subtitle: `${an.author} · ${an.time}`,
        relatedId: an.id,
      }));
    }
    return items;
  }, [q, category]);

  const handleResultPress = (item: typeof results[0]) => {
    if (!recentSearches.includes(query) && query.trim()) {
      setRecentSearches(prev => [query, ...prev].slice(0, 5));
    }
    if (item.type === 'drives') {
      navigation.navigate('DriveDetails', { driveId: item.relatedId });
    } else if (item.type === 'communities') {
      navigation.navigate('CommunityChat', { communityId: item.relatedId });
    } else if (item.type === 'applications') {
      navigation.navigate('StudentApplicationDetails', { applicationId: item.relatedId });
    } else if (item.type === 'announcements') {
      navigation.navigate('AnnouncementFeed');
    }
  };

  const typeIcons: Record<string, React.ReactNode> = {
    drives: <Briefcase size={16} color={colors.primary} />,
    communities: <MessageSquare size={16} color={colors.secondary} />,
    applications: <FileText size={16} color={colors.success} />,
    announcements: <Bell size={16} color={colors.warning} />,
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader title="Search" onBack={() => navigation.goBack()} />

      {/* Search Input */}
      <View style={styles.searchBox}>
        <Search size={18} color={colors.textMuted} />
        <TextInput
          style={styles.input}
          placeholder="Search drives, communities, announcements..."
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
          autoFocus
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <X size={18} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      <FilterChips
        options={FILTER_OPTIONS}
        selected={[category]}
        onSelect={(v) => setCategory(v as SearchCategory)}
      />

      {query.length === 0 ? (
        <View style={styles.recentContainer}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {recentSearches.map((s, i) => (
            <TouchableOpacity
              key={i}
              style={styles.recentItem}
              onPress={() => setQuery(s)}
              activeOpacity={0.7}
            >
              <Clock size={14} color={colors.textMuted} />
              <Text style={styles.recentText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : results.length === 0 ? (
        <EmptyState
          title="No results found"
          description={`No matches for "${query}". Try a different keyword.`}
          icon={<Search size={40} color={colors.textMuted} />}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleResultPress(item)}
              activeOpacity={0.7}
            >
              <View style={styles.resultIcon}>{typeIcons[item.type]}</View>
              <View style={styles.resultInfo}>
                <Text style={styles.resultTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.resultSub}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    height: 46,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
    paddingVertical: 0,
  },
  recentContainer: {
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  recentText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
  },
  listContainer: {
    paddingBottom: 24,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resultInfo: { flex: 1 },
  resultTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  resultSub: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
});
