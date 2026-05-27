import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import { colors } from '../config/colors';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  style?: any;
  textStyle?: any;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  style,
  textStyle,
  ...rest
}) => {
  const getButtonStyles = (): any => {
    const base: ViewStyle = styles.button;
    let variantStyle: ViewStyle = {};

    switch (variant) {
      case 'primary':
        variantStyle = styles.primary;
        break;
      case 'secondary':
        variantStyle = styles.secondary;
        break;
      case 'outline':
        variantStyle = styles.outline;
        break;
      case 'ghost':
        variantStyle = styles.ghost;
        break;
    }

    let sizeStyle: ViewStyle = {};
    switch (size) {
      case 'sm':
        sizeStyle = styles.sm;
        break;
      case 'md':
        sizeStyle = styles.md;
        break;
      case 'lg':
        sizeStyle = styles.lg;
        break;
    }

    const disabledStyle: ViewStyle = disabled || loading ? styles.disabled : {};

    return [base, variantStyle, sizeStyle, disabledStyle, style];
  };

  const getTextStyles = (): any => {
    let variantTextStyle: TextStyle = {};

    switch (variant) {
      case 'primary':
        variantTextStyle = styles.primaryText;
        break;
      case 'secondary':
        variantTextStyle = styles.secondaryText;
        break;
      case 'outline':
        variantTextStyle = styles.outlineText;
        break;
      case 'ghost':
        variantTextStyle = styles.ghostText;
        break;
    }

    let sizeText: TextStyle = {};
    switch (size) {
      case 'sm':
        sizeText = { fontSize: 13, fontWeight: '600' };
        break;
      case 'md':
        sizeText = { fontSize: 15, fontWeight: '600' };
        break;
      case 'lg':
        sizeText = { fontSize: 17, fontWeight: '700' };
        break;
    }

    return [variantTextStyle, sizeText, textStyle];
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || loading}
      style={getButtonStyles()}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'primary' || variant === 'secondary'
              ? colors.white
              : colors.primary
          }
        />
      ) : (
        <Text style={getTextStyles()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  lg: {
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.6,
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.primary,
  },
  ghostText: {
    color: colors.primary,
  },
});
