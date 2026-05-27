import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Bell, Briefcase, Calendar, CheckSquare, MessageSquare, User, Clock, AlertTriangle, ArrowLeft } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { Badge } from '../../../components/Badge';
import { EmptyState } from '../../../components/EmptyState';
import { NotificationTabs, NotificationTabValue } from '../../../components/NotificationTabs';
import { mockNotifications } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function NotificationsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<NotificationTabValue>('all');
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (item: typeof mockNotifications[0]) => {
    // 1. Mark as read locally
    setNotifications(prev =>
      prev.map(n => (n.id === item.id ? { ...n, isRead: true } : n))
    );

    // 2. Perform Navigation Actions
    if (item.actionLink) {
      if (item.actionLink === 'DriveDetailsScreen') {
        navigation.navigate('DriveDetails', { driveId: 'd2' }); // Target TCS Digital as demo
      } else if (item.actionLink === 'PlacementTrackerScreen') {
        navigation.navigate('StudentApp', { screen: 'StudentTracker' });
      } else if (item.actionLink === 'ProfileBuilderScreen') {
        navigation.navigate('ProfileBuilder');
      }
    }
  };

  const getIcon = (type: typeof mockNotifications[0]['type']) => {
    switch (type) {
      case 'drive':
        return <Briefcase size={16} color={colors.primary} />;
      case 'deadline':
        return <AlertTriangle size={16} color={colors.error} />;
      case 'interview':
        return <Calendar size={16} color={colors.warning} />;
      case 'result':
        return <CheckSquare size={16} color={colors.success} />;
      case 'community':
        return <MessageSquare size={16} color={colors.secondary} />;
      default:
        return <User size={16} color={colors.primary} />;
    }
  };

  const renderNotificationCard = ({ item }: { item: typeof mockNotifications[0] }) => {
    const cleanTime = new Date(item.time).toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <TouchableOpacity
        style={[
          styles.notificationCard,
          !item.isRead && styles.unreadCard,
        ]}
        onPress={() => handleNotificationClick(item)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={styles.typeRow}>
            <View style={[styles.iconBox, { backgroundColor: colors.background }]}>
              {getIcon(item.type)}
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
          
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.cardMessage}>{item.message}</Text>
        
        <View style={styles.footerRow}>
          <View style={styles.timeRow}>
            <Clock size={12} color={colors.textMuted} />
            <Text style={styles.timeText}>{cleanTime}</Text>
          </View>

          {item.actionLink && (
            <Text style={styles.actionLinkText}>View details</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.6}>
          <ArrowLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alerts Center</Text>
        {unreadCount > 0 ? (
          <TouchableOpacity onPress={handleMarkAllRead} activeOpacity={0.6}>
            <Text style={styles.markReadText}>Read All</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      <NotificationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <FlatList
        data={notifications.filter(n => {
          if (activeTab === 'all') return true;
          if (activeTab === 'drives') return n.type === 'drive' || n.type === 'interview' || n.type === 'result';
          if (activeTab === 'deadlines') return n.type === 'deadline';
          if (activeTab === 'general') return n.type === 'community';
          return true;
        })}
        renderItem={renderNotificationCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <EmptyState
            title="Inbox Clean!"
            description="You have no placement alerts or notifications at this time."
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  markReadText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  placeholder: {
    width: 60,
  },
  listContainer: {
    paddingBottom: 24,
    paddingTop: 12,
  },
  notificationCard: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  unreadCard: {
    borderColor: colors.primary + '35',
    backgroundColor: colors.primaryLight + '10',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  cardMessage: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: 10,
    marginLeft: 38,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 38,
    borderTopWidth: 1,
    borderTopColor: colors.border + '50',
    paddingTop: 8,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    color: colors.textMuted,
    marginLeft: 4,
    fontWeight: '500',
  },
  actionLinkText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
  },
});
