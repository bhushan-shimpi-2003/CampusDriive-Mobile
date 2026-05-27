import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../config/colors';
import { UserRole } from '../shared/types';

interface CommunityMessageBubbleProps {
  senderName: string;
  senderRole: UserRole | 'system';
  message: string;
  timestamp: string;
  reactionCount?: number;
  replyCount?: number;
  isPinned?: boolean;
  isOwnMessage?: boolean;
}

const roleColors: Record<string, string> = {
  tpo: colors.primary,
  coordinator: colors.secondary,
  student: colors.text,
  system: colors.warning,
};

const roleLabels: Record<string, string> = {
  tpo: 'TPO',
  coordinator: 'Coordinator',
  student: 'Student',
  system: 'System',
};

export const CommunityMessageBubble: React.FC<CommunityMessageBubbleProps> = ({
  senderName,
  senderRole,
  message,
  timestamp,
  reactionCount = 0,
  replyCount = 0,
  isPinned = false,
  isOwnMessage = false,
}) => {
  const roleColor = roleColors[senderRole] || colors.text;

  return (
    <View style={[styles.wrapper, isOwnMessage && styles.wrapperOwn]}>
      {!isOwnMessage && (
        <View style={[styles.avatar, { backgroundColor: roleColor + '20' }]}>
          <Text style={[styles.avatarText, { color: roleColor }]}>
            {senderName[0]?.toUpperCase()}
          </Text>
        </View>
      )}

      <View style={[styles.bubble, isOwnMessage && styles.bubbleOwn]}>
        {!isOwnMessage && (
          <View style={styles.senderRow}>
            <Text style={[styles.senderName, { color: roleColor }]}>{senderName}</Text>
            <View style={[styles.roleChip, { backgroundColor: roleColor + '15' }]}>
              <Text style={[styles.roleText, { color: roleColor }]}>
                {roleLabels[senderRole] || senderRole}
              </Text>
            </View>
            {isPinned && (
              <View style={styles.pinnedChip}>
                <Text style={styles.pinnedText}>📌 Pinned</Text>
              </View>
            )}
          </View>
        )}

        <Text style={[styles.messageText, isOwnMessage && styles.messageTextOwn]}>
          {message}
        </Text>

        <View style={styles.footer}>
          <Text style={[styles.timeText, isOwnMessage && styles.timeTextOwn]}>
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <View style={styles.reactions}>
            {reactionCount > 0 && (
              <Text style={styles.reactionText}>👍 {reactionCount}</Text>
            )}
            {replyCount > 0 && (
              <Text style={styles.replyText}>{replyCount} replies</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  wrapperOwn: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '800',
  },
  bubble: {
    maxWidth: '78%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderTopLeftRadius: 4,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bubbleOwn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    borderTopRightRadius: 4,
    borderColor: colors.primary,
  },
  senderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
    gap: 4,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '700',
  },
  roleChip: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  roleText: {
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  pinnedChip: {
    backgroundColor: colors.warningLight,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  pinnedText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.warning,
  },
  messageText: {
    fontSize: 13.5,
    color: colors.text,
    lineHeight: 19,
  },
  messageTextOwn: {
    color: colors.white,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  timeText: {
    fontSize: 10,
    color: colors.textMuted,
  },
  timeTextOwn: {
    color: colors.white + 'bb',
  },
  reactions: {
    flexDirection: 'row',
    gap: 8,
  },
  reactionText: {
    fontSize: 10,
    color: colors.textMuted,
  },
  replyText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '600',
  },
});
