import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MessageSquare, Pin, Search, ChevronRight, Users } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { SearchInput } from '../../../components/SearchInput';
import { AppCard } from '../../../components/AppCard';
import { EmptyState } from '../../../components/EmptyState';
import { mockCommunities } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CommunitiesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommunities = mockCommunities.filter((comm) =>
    comm.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comm.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCommunityCard = ({ item }: { item: typeof mockCommunities[0] }) => {
    return (
      <AppCard
        style={styles.card}
        onPress={() => navigation.navigate('CommunityChat', { communityId: item.id })}
      >
        <View style={styles.cardHeader}>
          {/* Logo Circle */}
          <View style={styles.leftRow}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>{item.companyName[0]}</Text>
            </View>
            <View style={styles.titleWrapper}>
              <View style={styles.titleHeader}>
                <Text style={styles.companyTitle}>{item.companyName} Recruitment</Text>
                {item.isPinned && <Pin size={12} color={colors.primary} style={styles.pinIcon} />}
              </View>
              <Text style={styles.roleSub}>{item.role}</Text>
            </View>
          </View>
          
          <View style={styles.rightHeader}>
            <ChevronRight size={18} color={colors.textMuted} />
          </View>
        </View>

        {/* Message Snippet */}
        <View style={styles.messageContainer}>
          <MessageSquare size={14} color={colors.textMuted} style={styles.msgIcon} />
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>

        {/* Card Footer Info */}
        <View style={styles.footerRow}>
          <View style={styles.membersRow}>
            <Users size={12} color={colors.textMuted} />
            <Text style={styles.membersText}>{item.memberCount} members online</Text>
          </View>

          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount} new</Text>
            </View>
          )}
        </View>
      </AppCard>
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Recruitment Communities"
        showNotification={true}
        notificationCount={2}
        onNotificationPress={() => navigation.navigate('Notifications')}
      />

      <View style={styles.searchSection}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search corporate discussion channels..."
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
            description="No corporate communities match your current search terms."
            actionTitle="Reset Search"
            onAction={() => setSearchQuery('')}
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
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
    paddingBottom: 10,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 8,
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
  titleWrapper: {
    flex: 1,
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  pinIcon: {
    marginLeft: 6,
    transform: [{ rotate: '45deg' }],
  },
  roleSub: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  rightHeader: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  msgIcon: {
    marginRight: 8,
  },
  lastMessage: {
    fontSize: 13,
    color: colors.textMuted,
    flex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.background,
    paddingTop: 10,
  },
  membersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  membersText: {
    fontSize: 11.5,
    color: colors.textMuted,
    marginLeft: 4,
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  unreadText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '700',
  },
});
