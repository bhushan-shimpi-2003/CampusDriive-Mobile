import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MessageSquare, Users, Eye, Megaphone } from 'lucide-react-native';

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

export default function CoordinatorCommunityScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [communities, setCommunities] = useState<any[]>(mockCommunities);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommunities = communities.filter(
    (comm) =>
      comm.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBroadcastAnnouncement = (id: string, name: string) => {
    // Navigates directly to Create Announcement screen!
    navigation.navigate('CreateAnnouncement');
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
            onPress={() => navigation.navigate('CommunityChat', { communityId: item.id })}
            activeOpacity={0.6}
          >
            <Eye size={14} color={colors.primary} />
            <Text style={[styles.actionBtnText, { color: colors.primary }]}>Open Channel</Text>
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
        </View>
      </AppCard>
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Channel Management"
        showNotification={true}
        notificationCount={1}
      />

      <View style={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search assigned communities..."
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
            title="No Communities"
            description="You are not assigned to any placement communities at this time."
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
