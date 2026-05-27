import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarChart, TrendingUp, Award, Layers, Users, Landmark } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { AppCard } from '../../../components/AppCard';
import { mockTPOAnalytics } from '../../../data/mockData';
import { ProgressBar } from '../../../components/ProgressBar';

export default function TPOAnalyticsScreen() {
  const navigation = useNavigation();
  const analytics = mockTPOAnalytics;

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Recruitment Analytics"
        showBack={true}
        onBack={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.scrollContainer}>
        <Text style={styles.leadText}>
          Real-time hiring pipelines, selection funnel progressions, and departmental hiring indices.
        </Text>

        {/* Department-wise Placements */}
        <Text style={styles.sectionHeader}>Department Hiring Rates</Text>
        <AppCard style={styles.chartCard}>
          {analytics.departmentWisePlacements.map((dept, index) => (
            <View key={index} style={styles.barItem}>
              <View style={styles.barLabelRow}>
                <Text style={styles.barLabel}>{dept.name}</Text>
                <Text style={styles.barPercent}>{dept.percentage}% Placed ({dept.placed} students)</Text>
              </View>
              <ProgressBar
                progress={dept.percentage}
                color={index % 2 === 0 ? colors.primary : colors.secondary}
                height={6}
              />
            </View>
          ))}
        </AppCard>

        {/* Company-wise hiring */}
        <Text style={styles.sectionHeader}>Company Selection Scale</Text>
        <AppCard style={styles.chartCard}>
          {analytics.companyWiseHiring.map((comp, index) => {
            const maxCount = 48; // TCS max count for scaling
            const barWidth = (comp.count / maxCount) * 100;
            return (
              <View key={index} style={styles.horizontalBarRow}>
                <Text style={styles.horizontalLabel}>{comp.company}</Text>
                <View style={styles.horizontalBarTrack}>
                  <View
                    style={[
                      styles.horizontalBarFill,
                      {
                        width: `${barWidth}%`,
                        backgroundColor: index % 2 === 0 ? colors.primary : colors.secondary,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.horizontalCount}>{comp.count}</Text>
              </View>
            );
          })}
        </AppCard>

        {/* Selection funnel */}
        <Text style={styles.sectionHeader}>Hiring Conversion Funnel</Text>
        <AppCard style={styles.chartCard}>
          {analytics.selectionFunnel.map((funnel, index) => {
            const maxVal = 1067;
            const sizePercent = (funnel.count / maxVal) * 100;
            return (
              <View key={index} style={styles.funnelItem}>
                <View style={styles.funnelHeader}>
                  <View style={styles.funnelNode}>
                    <Text style={styles.funnelNodeText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.funnelLabel}>{funnel.stage}</Text>
                  <Text style={styles.funnelValue}>{funnel.count}</Text>
                </View>
                <View style={styles.funnelTrack}>
                  <View
                    style={[
                      styles.funnelFill,
                      {
                        width: `${sizePercent}%`,
                        backgroundColor: colors.primary,
                        opacity: 1 - index * 0.15, // Sleek fading funnel representation
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  leadText: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  chartCard: {
    padding: 16,
    marginBottom: 20,
  },
  barItem: {
    marginBottom: 14,
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  barLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  barPercent: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  horizontalBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  horizontalLabel: {
    width: 80,
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  horizontalBarTrack: {
    flex: 1,
    height: 10,
    backgroundColor: colors.background,
    borderRadius: 5,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  horizontalBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  horizontalCount: {
    width: 24,
    fontSize: 13,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'right',
  },
  funnelItem: {
    marginBottom: 14,
  },
  funnelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  funnelNode: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  funnelNodeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
  },
  funnelLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  funnelValue: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.text,
  },
  funnelTrack: {
    height: 6,
    backgroundColor: colors.background,
    borderRadius: 3,
    marginLeft: 28,
    overflow: 'hidden',
  },
  funnelFill: {
    height: '100%',
    borderRadius: 3,
  },
});
