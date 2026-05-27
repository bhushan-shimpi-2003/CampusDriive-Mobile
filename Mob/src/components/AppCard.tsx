import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Text
} from 'react-native';
import { colors } from '../config/colors';
import { globalStyles } from '../styles/globalStyles';

interface AppCardProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  headerRight?: React.ReactNode;
  footer?: React.ReactNode;
  onPress?: () => void;
  style?: any;
  contentStyle?: any;
}

export const AppCard: React.FC<AppCardProps> = ({
  children,
  title,
  description,
  headerRight,
  footer,
  onPress,
  style,
  contentStyle,
}) => {
  const Container = onPress ? TouchableOpacity : View;
  const containerProps = onPress
    ? { onPress, activeOpacity: 0.8 }
    : {};

  return (
    <Container style={[globalStyles.card, styles.cardOverride, style]} {...containerProps}>
      {(title || headerRight) && (
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            {title && <Text style={globalStyles.cardTitle}>{title}</Text>}
            {description && <Text style={styles.descriptionText}>{description}</Text>}
          </View>
          {headerRight && <View style={styles.headerRight}>{headerRight}</View>}
        </View>
      )}
      
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>

      {footer && (
        <View style={styles.footer}>
          {footer}
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  cardOverride: {
    marginVertical: 6,
    padding: 0, // Clean inner padding control
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitleContainer: {
    flex: 1,
    paddingRight: 8,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  descriptionText: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
});
