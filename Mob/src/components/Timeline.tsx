import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Check, X, Circle } from 'lucide-react-native';
import { colors } from '../config/colors';

export interface TimelineStep {
  title: string;
  description?: string;
  isCompleted: boolean;
  isActive: boolean;
  date?: string;
  isRejected?: boolean;
}

interface TimelineProps {
  steps: TimelineStep[];
  style?: ViewStyle;
}

export const Timeline: React.FC<TimelineProps> = ({ steps, style }) => {
  return (
    <View style={[styles.container, style]}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        // Node style calculations
        let nodeColor = colors.border;
        let NodeIcon = <Circle size={12} color={colors.textMuted} fill={colors.border} />;

        if (step.isRejected) {
          nodeColor = colors.error;
          NodeIcon = (
            <View style={[styles.nodeCircle, { backgroundColor: colors.error }]}>
              <X size={10} color={colors.white} strokeWidth={3} />
            </View>
          );
        } else if (step.isCompleted) {
          nodeColor = colors.success;
          NodeIcon = (
            <View style={[styles.nodeCircle, { backgroundColor: colors.success }]}>
              <Check size={10} color={colors.white} strokeWidth={3} />
            </View>
          );
        } else if (step.isActive) {
          nodeColor = colors.primary;
          NodeIcon = (
            <View style={[styles.nodeCircle, { backgroundColor: colors.primary, borderWidth: 2, borderColor: colors.primaryLight }]}>
              <View style={styles.activeInnerDot} />
            </View>
          );
        } else {
          NodeIcon = (
            <View style={[styles.nodeCircle, { backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.border }]}>
              <View style={[styles.activeInnerDot, { backgroundColor: colors.border }]} />
            </View>
          );
        }

        return (
          <View key={index} style={styles.stepRow}>
            {/* Timeline Line & Node */}
            <View style={styles.leftTimeline}>
              <View style={styles.nodeWrapper}>{NodeIcon}</View>
              {!isLast && (
                <View
                  style={[
                    styles.line,
                    {
                      backgroundColor: step.isCompleted && !step.isRejected ? colors.success : colors.border,
                    },
                  ]}
                />
              )}
            </View>

            {/* Step Details */}
            <View style={styles.rightContent}>
              <View style={styles.headerRow}>
                <Text
                  style={[
                    styles.title,
                    step.isActive && styles.activeTitle,
                    step.isRejected && styles.rejectedTitle,
                  ]}
                >
                  {step.title}
                </Text>
                {step.date && <Text style={styles.dateText}>{step.date}</Text>}
              </View>
              {step.description && (
                <Text style={styles.description}>{step.description}</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 4,
  },
  stepRow: {
    flexDirection: 'row',
    minHeight: 64,
  },
  leftTimeline: {
    alignItems: 'center',
    width: 24,
  },
  nodeWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  nodeCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeInnerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.white,
  },
  line: {
    width: 2,
    position: 'absolute',
    top: 22,
    bottom: -6,
    zIndex: 1,
  },
  rightContent: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  activeTitle: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 15,
  },
  rejectedTitle: {
    color: colors.error,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  description: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
});
