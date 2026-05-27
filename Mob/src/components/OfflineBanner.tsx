import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WifiOff, RefreshCw } from 'lucide-react-native';
import { colors } from '../config/colors';

interface OfflineBannerProps {
  onRetry?: () => void;
  showCached?: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ onRetry, showCached = true }) => {
  return (
    <View style={styles.banner}>
      <View style={styles.left}>
        <WifiOff size={16} color={colors.warning} />
        <View style={styles.textWrap}>
          <Text style={styles.title}>You are offline</Text>
          {showCached && (
            <Text style={styles.sub}>Showing cached placement data</Text>
          )}
        </View>
      </View>
      {onRetry && (
        <TouchableOpacity style={styles.retryBtn} onPress={onRetry} activeOpacity={0.7}>
          <RefreshCw size={13} color={colors.warning} />
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.warningLight,
    borderWidth: 1,
    borderColor: colors.warning + '30',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textWrap: {
    marginLeft: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.warning,
  },
  sub: {
    fontSize: 11,
    color: colors.warning,
    opacity: 0.8,
    marginTop: 1,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning + '20',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  retryText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.warning,
    marginLeft: 5,
  },
});
