import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FileText, Link2, Video, File, Download } from 'lucide-react-native';
import { colors } from '../config/colors';
import { CommunityResource } from '../shared/types';

interface ResourceCardProps {
  resource: CommunityResource;
}

const typeIcons: Record<CommunityResource['type'], React.ReactNode> = {
  pdf: <FileText size={20} color={colors.error} />,
  link: <Link2 size={20} color={colors.primary} />,
  video: <Video size={20} color={colors.secondary} />,
  doc: <File size={20} color={colors.warning} />,
};

const typeBgColors: Record<CommunityResource['type'], string> = {
  pdf: colors.errorLight,
  link: colors.primaryLight,
  video: colors.secondaryLight,
  doc: colors.warningLight,
};

const typeLabels: Record<CommunityResource['type'], string> = {
  pdf: 'PDF',
  link: 'Link',
  video: 'Video',
  doc: 'Document',
};

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const handleOpen = () => {
    Alert.alert(
      resource.title,
      `This is a demo resource. In production, this would open the ${typeLabels[resource.type]}.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleOpen} activeOpacity={0.8}>
      <View style={[styles.iconBox, { backgroundColor: typeBgColors[resource.type] }]}>
        {typeIcons[resource.type]}
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{resource.title}</Text>
        <Text style={styles.description} numberOfLines={1}>{resource.description}</Text>
        <Text style={styles.meta}>
          {resource.uploadedBy} · {resource.uploadedAt}{resource.size ? ` · ${resource.size}` : ''}
        </Text>
      </View>
      <View style={styles.downloadBtn}>
        <Download size={15} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 8,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 2,
  },
  meta: {
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 3,
    fontWeight: '500',
  },
  downloadBtn: {
    padding: 6,
    backgroundColor: colors.primaryLight,
    borderRadius: 6,
  },
});
