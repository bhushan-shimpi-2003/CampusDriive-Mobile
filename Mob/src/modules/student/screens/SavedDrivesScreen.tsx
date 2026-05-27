import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Bookmark, MapPin, Calendar, ChevronRight } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { Badge } from '../../../components/Badge';
import { EmptyState } from '../../../components/EmptyState';
import { BookmarkButton } from '../../../components/BookmarkButton';
import { RootStackParamList } from '../../../navigation/types';
import { mockPlacementDrives, mockSavedDriveIds } from '../../../data/mockData';
import { PlacementDrive } from '../../../shared/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SavedDrivesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [savedIds, setSavedIds] = useState<string[]>(mockSavedDriveIds);

  const savedDrives = mockPlacementDrives.filter(d => savedIds.includes(d.id));

  const handleToggle = (driveId: string) => {
    setSavedIds(prev =>
      prev.includes(driveId) ? prev.filter(id => id !== driveId) : [...prev, driveId]
    );
  };

  const renderDrive = ({ item }: { item: PlacementDrive }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DriveDetails', { driveId: item.id })}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>{item.companyName[0]}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.company}>{item.companyName}</Text>
          <Text style={styles.role}>{item.role}</Text>
        </View>
        <BookmarkButton
          isBookmarked={true}
          onToggle={() => handleToggle(item.id)}
        />
      </View>

      <View style={styles.tags}>
        <Badge
          label={item.status}
          variant={item.status === 'Active' ? 'success' : item.status === 'Upcoming' ? 'warning' : 'muted'}
          style={styles.tag}
        />
        <Badge label={item.jobType} variant="primary" style={styles.tag} />
        <Badge label={item.workMode} variant="info" style={styles.tag} />
      </View>

      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <MapPin size={12} color={colors.textMuted} />
          <Text style={styles.metaText}>{item.location}</Text>
        </View>
        <View style={styles.metaItem}>
          <Calendar size={12} color={colors.textMuted} />
          <Text style={styles.metaText}>Deadline: {item.deadline}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.package}>{item.packageOffer}</Text>
        <View style={styles.viewBtn}>
          <Text style={styles.viewBtnText}>View Details</Text>
          <ChevronRight size={14} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader title="Saved Drives" onBack={() => navigation.goBack()} />

      {savedDrives.length === 0 ? (
        <EmptyState
          title="No Saved Drives"
          description="Bookmark drives from the Eligible Drives section to access them quickly here."
          icon={<Bookmark size={40} color={colors.textMuted} />}
          actionTitle="Browse Drives"
          onAction={() => navigation.navigate('StudentApp', { screen: 'StudentDrives' })}
        />
      ) : (
        <FlatList
          data={savedDrives}
          keyExtractor={(item) => item.id}
          renderItem={renderDrive}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 24 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  info: { flex: 1 },
  company: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  role: {
    fontSize: 12.5,
    color: colors.textMuted,
    marginTop: 2,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    gap: 6,
  },
  tag: { marginRight: 0 },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11.5,
    color: colors.textMuted,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  package: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 2,
  },
});
