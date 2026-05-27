import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../config/colors';
import { globalStyles } from '../styles/globalStyles';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subValue?: string;
  subValueColor?: string;
  style?: ViewStyle;
  iconBackgroundColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  subValue,
  subValueColor = colors.textMuted,
  style,
  iconBackgroundColor = colors.primaryLight,
}) => {
  return (
    <View style={[globalStyles.card, styles.container, style]}>
      <View style={styles.topRow}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.value} numberOfLines={1}>
            {value}
          </Text>
        </View>
        {icon && (
          <View style={[styles.iconWrapper, { backgroundColor: iconBackgroundColor }]}>
            {icon}
          </View>
        )}
      </View>
      {subValue && (
        <Text style={[styles.subValue, { color: subValueColor }]} numberOfLines={1}>
          {subValue}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    minWidth: 140,
    marginHorizontal: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subValue: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 8,
  },
});
