import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors } from '../config/colors';

interface SkeletonBoxProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: object;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({ width = '100%', height = 16, borderRadius = 6, style }) => {
  const opacity = React.useRef(new Animated.Value(0.4)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { width: width as any, height, borderRadius, backgroundColor: colors.border, opacity },
        style,
      ]}
    />
  );
};

export const CardSkeleton: React.FC = () => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <SkeletonBox width={48} height={48} borderRadius={12} />
      <View style={styles.headerText}>
        <SkeletonBox width="60%" height={14} />
        <View style={{ height: 6 }} />
        <SkeletonBox width="40%" height={11} />
      </View>
      <SkeletonBox width={56} height={22} borderRadius={10} />
    </View>
    <View style={{ height: 12 }} />
    <SkeletonBox height={11} />
    <View style={{ height: 6 }} />
    <SkeletonBox width="80%" height={11} />
    <View style={{ height: 12 }} />
    <View style={styles.cardFooter}>
      <SkeletonBox width="30%" height={28} borderRadius={6} />
      <SkeletonBox width="30%" height={28} borderRadius={6} />
    </View>
  </View>
);

export const ListRowSkeleton: React.FC = () => (
  <View style={styles.listRow}>
    <SkeletonBox width={36} height={36} borderRadius={18} />
    <View style={styles.rowText}>
      <SkeletonBox width="55%" height={13} />
      <View style={{ height: 5 }} />
      <SkeletonBox width="35%" height={10} />
    </View>
    <SkeletonBox width={20} height={20} borderRadius={10} />
  </View>
);

export const StatCardSkeleton: React.FC = () => (
  <View style={styles.statCard}>
    <SkeletonBox width={36} height={36} borderRadius={8} />
    <View style={{ height: 10 }} />
    <SkeletonBox width="60%" height={20} />
    <View style={{ height: 6 }} />
    <SkeletonBox width="80%" height={10} />
  </View>
);

export const LoadingSkeleton: React.FC<{ type?: 'cards' | 'list' | 'stats'; count?: number }> = ({
  type = 'cards',
  count = 3,
}) => {
  const items = Array.from({ length: count });
  return (
    <View>
      {items.map((_, i) => {
        if (type === 'list') return <ListRowSkeleton key={i} />;
        if (type === 'stats') return <StatCardSkeleton key={i} />;
        return <CardSkeleton key={i} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    marginHorizontal: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowText: {
    flex: 1,
    marginHorizontal: 12,
  },
  statCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
