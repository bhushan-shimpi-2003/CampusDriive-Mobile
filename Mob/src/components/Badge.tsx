import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../config/colors';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'muted';
  style?: any;
  textStyle?: any;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  style,
  textStyle,
}) => {
  const getBadgeStyle = (): any => {
    let variantStyle = styles.primary;

    switch (variant) {
      case 'success':
        variantStyle = styles.success;
        break;
      case 'warning':
        variantStyle = styles.warning;
        break;
      case 'error':
        variantStyle = styles.error;
        break;
      case 'info':
        variantStyle = styles.info;
        break;
      case 'muted':
        variantStyle = styles.muted;
        break;
      case 'primary':
        variantStyle = styles.primary;
        break;
    }

    return [styles.badge, variantStyle, style];
  };

  const getBadgeTextStyle = (): any => {
    let variantTextStyle = styles.primaryText;

    switch (variant) {
      case 'success':
        variantTextStyle = styles.successText;
        break;
      case 'warning':
        variantTextStyle = styles.warningText;
        break;
      case 'error':
        variantTextStyle = styles.errorText;
        break;
      case 'info':
        variantTextStyle = styles.infoText;
        break;
      case 'muted':
        variantTextStyle = styles.mutedText;
        break;
      case 'primary':
        variantTextStyle = styles.primaryText;
        break;
    }

    return [styles.text, variantTextStyle, textStyle];
  };

  return (
    <View style={getBadgeStyle()}>
      <Text style={getBadgeTextStyle()}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  primary: {
    backgroundColor: colors.primaryLight,
  },
  primaryText: {
    color: colors.primary,
  },
  success: {
    backgroundColor: colors.successLight,
  },
  successText: {
    color: colors.success,
  },
  warning: {
    backgroundColor: colors.warningLight,
  },
  warningText: {
    color: colors.warning,
  },
  error: {
    backgroundColor: colors.errorLight,
  },
  errorText: {
    color: colors.error,
  },
  info: {
    backgroundColor: colors.secondaryLight,
  },
  infoText: {
    color: colors.secondary,
  },
  muted: {
    backgroundColor: colors.border,
  },
  mutedText: {
    color: colors.textMuted,
  },
});
