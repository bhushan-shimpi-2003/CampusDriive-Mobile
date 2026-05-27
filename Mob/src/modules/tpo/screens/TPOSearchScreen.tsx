import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Search, X, Briefcase, User, MessageSquare } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { FilterChips } from '../../../components/FilterChips';
import { EmptyState } from '../../../components/EmptyState';
import { RootStackParamList } from '../../../navigation/types';
import { mockPlacementDrives, mockCommunities } from '../../../data/mockData';

// Assuming we want to mock a few students to search for
const mockStudents = [
  { id: 's1', name: 'Bhushan Shimpi', prn: '12345', dept: 'Computer Engineering', score: 9.2 },
  { id: 's2', name: 'John Doe', prn: '12346', dept: 'Information Technology', score: 8.5 },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type SearchCategory = 'all' | 'drives' | 'students' | 'communities';

const FILTER_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Drives', value: 'drives' },
  { label: 'Students', value: 'students' },
  { label: 'Communities', value: 'communities' },
];

export default function TPOSearchScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');

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
        subtitle: `Applicants: ${d.applicantsCount} · Eligible: ${d.eligibleCount}`,
        relatedId: d.id,
      }));
    }
    if (category === 'all' || category === 'students') {
      mockStudents.filter(s =>
        s.name.toLowerCase().includes(q) || s.prn.includes(q)
      ).forEach(s => items.push({
        id: s.id, type: 'students',
        title: s.name,
        subtitle: `${s.dept} · CGPA: ${s.score}`,
        relatedId: s.id, // For TPOStudentProfile
      }));
    }
    if (category === 'all' || category === 'communities') {
      mockCommunities.filter(c =>
        c.companyName.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)
      ).forEach(c => items.push({
        id: c.id, type: 'communities',
        title: `${c.companyName} Community`,
        subtitle: `${c.memberCount} members`,
        relatedId: c.id,
      }));
    }
    return items;
  }, [q, category]);

  const handleResultPress = (item: typeof results[0]) => {
    if (item.type === 'drives') {
      navigation.navigate('TPODriveDetails', { driveId: item.relatedId });
    } else if (item.type === 'students') {
      navigation.navigate('TPOStudentProfile', { studentId: item.relatedId });
    } else if (item.type === 'communities') {
      navigation.navigate('CommunityChat', { communityId: item.relatedId });
    }
  };

  const typeIcons: Record<string, React.ReactNode> = {
    drives: <Briefcase size={16} color={colors.primary} />,
    students: <User size={16} color={colors.secondary} />,
    communities: <MessageSquare size={16} color={colors.warning} />,
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader title="TPO Global Search" onBack={() => navigation.goBack()} />

      <View style={styles.searchBox}>
        <Search size={18} color={colors.textMuted} />
        <TextInput
          style={styles.input}
          placeholder="Search drives, students, communities..."
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
        <EmptyState
          title="Start searching"
          description="Type above to search across the entire placement database."
          icon={<Search size={40} color={colors.textMuted} />}
        />
      ) : results.length === 0 ? (
        <EmptyState
          title="No results found"
          description={`No matches for "${query}". Try different keywords.`}
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
