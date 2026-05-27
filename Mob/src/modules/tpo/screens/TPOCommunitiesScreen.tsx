import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MessageSquare, Users, Eye, Megaphone, Inbox } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { SearchInput } from '../../../components/SearchInput';
import { Badge } from '../../../components/Badge';
import { AppCard } from '../../../components/AppCard';
import { EmptyState } from '../../../components/EmptyState';
import { mockCommunities } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TPOCommunitiesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [communities, setCommunities] = useState<any[]>(mockCommunities);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommunities = communities.filter(
    (comm) =>
      comm.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleArchiveDemo = (id: string, name: string) => {
    Alert.alert(
      'Archive Community Channel',
      `Are you sure you want to archive the ${name} recruitment channel? Students will be set to read-only.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Archive',
          style: 'destructive',
          onPress: () => {
            setCommunities((prev) =>
              prev.map((comm) =>
                comm.id === id ? { ...comm, isArchived: true } : comm
              )
            );
            Alert.alert('Channel Archived', 'Recruitment channel archived successfully.');
          },
        },
      ]
    );
  };

  const handleBroadcastAnnouncement = (id: string, name: string) => {
    Alert.prompt(
      'Broadcast Announcement',
      `Type the announcement you want to pin inside the ${name} student channel:`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Broadcast',
          onPress: (text?: string) => {
            if (!text) return;
            setCommunities((prev) =>
              prev.map((comm) =>
                comm.id === id
                  ? {
                      ...comm,
                      lastMessage: `TPO Announcement: "${text}"`,
                      unreadCount: comm.unreadCount + 1,
                    }
                  : comm
              )
            );
            Alert.alert('Announcement Pinned', 'Your message has been pinned in the channel.');
          },
        },
      ],
      'plain-text',
      'Registrations close in 2 hours. Ensure profiles are complete!'
    );
  };

  const renderCommunityCard = ({ item }: { item: any }) => {
    return (
      <AppCard style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>{item.companyName[0]}</Text>
            </View>
            <View>
              <Text style={styles.companyTitle}>{item.companyName} Recruitment</Text>
              <Text style={styles.roleSub}>{item.role}</Text>
            </View>
          </View>
          <Badge
            label={item.isArchived ? 'Archived' : 'Active'}
            variant={item.isArchived ? 'muted' : 'success'}
          />
        </View>

        {/* Member metrics row */}
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Users size={14} color={colors.textMuted} />
            <Text style={styles.metricText}>{item.memberCount} Candidates</Text>
          </View>
          
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount} Unread</Text>
            </View>
          )}
        </View>

        {/* Last message teaser */}
        <View style={styles.msgTeaser}>
          <MessageSquare size={13} color={colors.textMuted} />
          <Text style={styles.msgText} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>

        {/* Actions panel */}
        <View style={styles.actionPanel}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => navigation.navigate('TPOCommunityDetails', { communityId: item.id })}
            activeOpacity={0.6}
          >
            <Eye size={14} color={colors.primary} />
            <Text style={[styles.actionBtnText, { color: colors.primary }]}>Open</Text>
          </TouchableOpacity>

          {!item.isArchived && (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => handleBroadcastAnnouncement(item.id, item.companyName)}
              activeOpacity={0.6}
            >
              <Megaphone size={14} color={colors.secondary} />
              <Text style={[styles.actionBtnText, { color: colors.secondary }]}>Broadcast</Text>
            </TouchableOpacity>
          )}

          {!item.isArchived && (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => handleArchiveDemo(item.id, item.companyName)}
              activeOpacity={0.6}
            >
              <Inbox size={14} color={colors.error} />
              <Text style={[styles.actionBtnText, { color: colors.error }]}>Archive</Text>
            </TouchableOpacity>
          )}
        </View>
      </AppCard>
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Recruitment Channels"
        showBack={true}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search placement community channels..."
        />
      </View>

      <FlatList
        data={filteredCommunities}
        renderItem={renderCommunityCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <EmptyState
            title="No Channels Found"
            description="No corporate channels match your query search filters."
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
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  companyTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: colors.text,
  },
  roleSub: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    fontSize: 12,
    color: colors.textMuted,
    marginLeft: 6,
    fontWeight: '600',
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  unreadText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '800',
  },
  msgTeaser: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  msgText: {
    fontSize: 12.5,
    color: colors.textMuted,
    marginLeft: 8,
    flex: 1,
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
    paddingVertical: 2,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    marginLeft: 6,
  },
});
