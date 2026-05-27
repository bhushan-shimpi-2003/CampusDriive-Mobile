import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react-native';
import { colors } from '../config/colors';
import { CalendarEvent, CalendarEventType } from '../shared/types';

interface CalendarEventCardProps {
  event: CalendarEvent;
  onPress?: () => void;
}

const typeConfig: Record<CalendarEventType, { color: string; bg: string; label: string }> = {
  interview: { color: colors.primary, bg: colors.primaryLight, label: 'Interview' },
  deadline: { color: colors.error, bg: colors.errorLight, label: 'Deadline' },
  drive: { color: colors.secondary, bg: colors.secondaryLight, label: 'Drive Day' },
  announcement: { color: colors.warning, bg: colors.warningLight, label: 'Event' },
  result: { color: colors.success, bg: colors.successLight, label: 'Results' },
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const CalendarEventCard: React.FC<CalendarEventCardProps> = ({ event, onPress }) => {
  const config = typeConfig[event.type];

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={[styles.typeBar, { backgroundColor: config.color }]} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={[styles.typeBadge, { backgroundColor: config.bg }]}>
            <Text style={[styles.typeLabel, { color: config.color }]}>{config.label}</Text>
          </View>
          {onPress && <ChevronRight size={16} color={colors.textMuted} />}
        </View>
        <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{event.description}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Calendar size={12} color={colors.textMuted} />
            <Text style={styles.metaText}>{formatDate(event.date)}</Text>
          </View>
          {event.time && (
            <View style={styles.metaItem}>
              <Clock size={12} color={colors.textMuted} />
              <Text style={styles.metaText}>{event.time}</Text>
            </View>
          )}
          {event.location && (
            <View style={styles.metaItem}>
              <MapPin size={12} color={colors.textMuted} />
              <Text style={styles.metaText} numberOfLines={1}>{event.location}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
    overflow: 'hidden',
  },
  typeBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeLabel: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 17,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
});
