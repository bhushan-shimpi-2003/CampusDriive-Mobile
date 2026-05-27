import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Bookmark, BookmarkCheck } from 'lucide-react-native';
import { colors } from '../config/colors';

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
  size?: number;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  isBookmarked,
  onToggle,
  size = 20,
}) => {
  return (
    <TouchableOpacity
      style={[styles.btn, isBookmarked && styles.btnActive]}
      onPress={onToggle}
      activeOpacity={0.7}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      {isBookmarked ? (
        <BookmarkCheck size={size} color={colors.primary} />
      ) : (
        <Bookmark size={size} color={colors.textMuted} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  btnActive: {
    backgroundColor: colors.primaryLight,
  },
});
