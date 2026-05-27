import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Layers, Calendar, ChevronDown, ChevronUp, MapPin, Award } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { Badge } from '../../../components/Badge';
import { AppCard } from '../../../components/AppCard';
import { Timeline, TimelineStep } from '../../../components/Timeline';
import { EmptyState } from '../../../components/EmptyState';
import { mockApplications } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type TrackerTab = 'active' | 'selected' | 'rejected';

export default function PlacementTrackerScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<TrackerTab>('active');
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);

  // Application rounds timeline template
  const roundsOrder = [
    'Applied',
    'Shortlisted',
    'Aptitude Round',
    'Technical Round',
    'HR Round',
    'Selected',
  ];

  const getFilteredApps = () => {
    return mockApplications.filter((app) => {
      if (activeTab === 'selected') {
        return app.status === 'Selected';
      } else if (activeTab === 'rejected') {
        return app.status === 'Rejected';
      } else {
        // Active: everything other than Selected and Rejected
        return app.status !== 'Selected' && app.status !== 'Rejected';
      }
    });
  };

  const filteredApps = getFilteredApps();

  const handleToggleExpand = (id: string) => {
    setExpandedAppId(expandedAppId === id ? null : id);
  };

  const buildTimelineSteps = (app: typeof mockApplications[0]): TimelineStep[] => {
    const isAppRejected = app.status === 'Rejected';
    const activeIndex = roundsOrder.indexOf(app.status);

    return roundsOrder.map((roundName, index) => {
      let isCompleted = false;
      let isActive = false;
      let isStepRejected = false;

      if (isAppRejected && index === activeIndex) {
        isStepRejected = true;
      } else if (index < activeIndex || app.status === 'Selected') {
        isCompleted = true;
      } else if (index === activeIndex) {
        isActive = true;
      }

      return {
        title: roundName,
        description:
          isActive
            ? `Current Stage: ${app.nextStep}`
            : isCompleted
            ? 'Completed and qualified'
            : isStepRejected
            ? 'Not selected in this round'
            : 'Pending evaluation',
        isCompleted,
        isActive,
        isRejected: isStepRejected,
        date: isActive ? app.date : undefined,
      };
    });
  };

  const renderAppCard = ({ item }: { item: typeof mockApplications[0] }) => {
    const isExpanded = expandedAppId === item.id;
    const steps = buildTimelineSteps(item);

    return (
      <AppCard style={styles.card}>
        <TouchableOpacity
          style={styles.cardHeader}
          onPress={() => handleToggleExpand(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.leftInfo}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>{item.companyName[0]}</Text>
            </View>
            <View style={styles.textDetails}>
              <Text style={styles.companyTitle}>{item.companyName}</Text>
              <Text style={styles.roleTitle}>{item.role}</Text>
              <View style={styles.dateRow}>
                <Calendar size={12} color={colors.textMuted} />
                <Text style={styles.dateText}>Applied: {item.date}</Text>
              </View>
            </View>
          </View>

          <View style={styles.rightBadge}>
            <Badge
              label={item.status}
              variant={
                item.status === 'Selected'
                  ? 'success'
                  : item.status === 'Rejected'
                  ? 'error'
                  : 'warning'
              }
              style={styles.statusBadge}
            />
            <View style={styles.toggleIcon}>
              {isExpanded ? (
                <ChevronUp size={16} color={colors.textMuted} />
              ) : (
                <ChevronDown size={16} color={colors.textMuted} />
              )}
            </View>
          </View>
        </TouchableOpacity>

        {/* Next step teaser */}
        {!isExpanded && (
          <View style={styles.teaserRow}>
            <Text style={styles.teaserLabel}>Next Action:</Text>
            <Text style={styles.teaserText} numberOfLines={1}>{item.nextStep}</Text>
          </View>
        )}

        {/* Expandable Timeline Component */}
        {isExpanded && (
          <View style={styles.timelineWrapper}>
            <Text style={styles.timelineTitle}>Hiring Milestone Tracker</Text>
            <Timeline steps={steps} />
            
            {item.status !== 'Selected' && item.status !== 'Rejected' && (
              <View style={styles.trackerCallout}>
                <Award size={14} color={colors.primary} />
                <Text style={styles.calloutText}>
                  Keep your unified profile updated! Recruiters re-evaluate your GPA before moving to interviews.
                </Text>
              </View>
            )}

            <TouchableOpacity 
              style={styles.viewDetailsBtn} 
              onPress={() => navigation.navigate('StudentApplicationDetails', { applicationId: item.id })}
            >
              <Text style={styles.viewDetailsText}>View Application Details</Text>
            </TouchableOpacity>
          </View>
        )}
      </AppCard>
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Application Tracker"
        showNotification={true}
        notificationCount={2}
        onNotificationPress={() => navigation.navigate('Notifications')}
      />

      {/* Tabs Row */}
      <View style={styles.tabsRow}>
        {([
          { id: 'active', label: 'Active Tasks' },
          { id: 'selected', label: 'Placed' },
          { id: 'rejected', label: 'Closed' },
        ] as const).map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabBtn,
              activeTab === tab.id && styles.activeTabBtn,
            ]}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabBtnText,
                activeTab === tab.id && styles.activeTabBtnText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main List */}
      <FlatList
        data={filteredApps}
        renderItem={renderAppCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <EmptyState
            title={`No ${activeTab} records`}
            description={`No recruitment processes are currently listed in the ${activeTab} segment.`}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTabBtn: {
    backgroundColor: colors.primaryLight,
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
  },
  activeTabBtnText: {
    color: colors.primary,
  },
  listContainer: {
    paddingBottom: 24,
  },
  card: {
    marginVertical: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 8,
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
  textDetails: {
    flex: 1,
    paddingRight: 6,
  },
  companyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  roleTitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dateText: {
    fontSize: 11.5,
    color: colors.textMuted,
    marginLeft: 4,
  },
  rightBadge: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statusBadge: {
    marginBottom: 6,
  },
  toggleIcon: {
    padding: 2,
  },
  teaserRow: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  teaserLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    marginRight: 6,
  },
  teaserText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
    flex: 1,
  },
  timelineWrapper: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FAFAFA',
  },
  timelineTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  trackerCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    padding: 10,
    borderRadius: 6,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.primary + '15',
  },
  calloutText: {
    flex: 1,
    fontSize: 11.5,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 8,
    lineHeight: 16,
  },
  viewDetailsBtn: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
});
