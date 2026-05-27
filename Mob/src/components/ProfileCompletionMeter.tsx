import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react-native';
import { colors } from '../config/colors';
export interface ProfileCompletionItem {
  label: string;
  completed: boolean;
  route: any; // navigation route name
}

import { ProgressBar } from './ProgressBar';

interface ProfileCompletionMeterProps {
  items?: ProfileCompletionItem[];
  onItemPress?: (route: ProfileCompletionItem['route']) => void;
  showDetails?: boolean;
}

export const ProfileCompletionMeter: React.FC<ProfileCompletionMeterProps> = ({
  items = [
    { label: 'Basic Details', completed: true, route: 'ProfileBuilder' },
    { label: 'Academic Records', completed: true, route: 'ProfileBuilder' },
    { label: 'Resume Upload', completed: false, route: 'ResumeUpload' },
  ],
  onItemPress,
  showDetails = false,
}) => {
  const completed = items.filter((i) => i.completed).length;
  const total = items.length;
  const percentage = Math.round((completed / total) * 100);
  const missing = items.filter((i) => !i.completed);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.percentText}>{percentage}% Complete</Text>
          <Text style={styles.subText}>{completed}/{total} sections filled</Text>
        </View>
        <View style={[styles.badge, percentage === 100 && styles.badgeComplete]}>
          <Text style={[styles.badgeText, percentage === 100 && styles.badgeTextComplete]}>
            {percentage === 100 ? '✓ Complete' : `${total - completed} missing`}
          </Text>
        </View>
      </View>

      <ProgressBar progress={percentage} showLabel={false} style={styles.bar} />

      {showDetails && missing.length > 0 && (
        <View style={styles.missingList}>
          <Text style={styles.missingTitle}>Complete these sections:</Text>
          {missing.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.missingItem}
              onPress={() => onItemPress?.(item.route)}
              activeOpacity={0.7}
            >
              <Circle size={14} color={colors.textMuted} />
              <Text style={styles.missingLabel}>{item.label}</Text>
              <ChevronRight size={14} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {showDetails && missing.length > 0 && (
        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={() => onItemPress?.(missing[0].route)}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaText}>Complete Missing Sections →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  percentText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  subText: {
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 2,
  },
  badge: {
    backgroundColor: colors.warningLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeComplete: {
    backgroundColor: colors.successLight,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.warning,
  },
  badgeTextComplete: {
    color: colors.success,
  },
  bar: {
    marginBottom: 12,
  },
  missingList: {
    marginTop: 4,
  },
  missingTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  missingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  missingLabel: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
    marginLeft: 10,
  },
  ctaBtn: {
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
});
