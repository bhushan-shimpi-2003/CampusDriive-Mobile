import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pin, ChevronRight } from 'lucide-react-native';
import { colors } from '../config/colors';

interface PinnedAnnouncementProps {
  title: string;
  body: string;
  author: string;
  time: string;
  onPress?: () => void;
}

export const PinnedAnnouncement: React.FC<PinnedAnnouncementProps> = ({
  title,
  body,
  author,
  time,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.pinRow}>
        <Pin size={13} color={colors.warning} />
        <Text style={styles.pinLabel}>Pinned Announcement</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text style={styles.body} numberOfLines={3}>{body}</Text>
      <View style={styles.footer}>
        <Text style={styles.author}>{author} · {time}</Text>
        {onPress && <ChevronRight size={14} color={colors.textMuted} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.warningLight,
    borderWidth: 1.5,
    borderColor: colors.warning + '30',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  pinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  pinLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.warning,
    marginLeft: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 5,
  },
  body: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
});
