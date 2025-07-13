import { useTheme } from '@/context/ThemeContext';
import { BlogComment } from '@/types/blog';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CommentItemProps {
  comment: BlogComment;
  isLast?: boolean;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment, isLast = false }) => {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.container, 
      !isLast && { borderBottomColor: theme.border, borderBottomWidth: 1 }
    ]}>
      <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
        <MaterialIcons name="person" size={16} color="#fff" />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.author, { color: theme.text }]}>{comment.author.name}</Text>
          <Text style={[styles.date, { color: theme.textSecondary }]}>{comment.createdAt}</Text>
        </View>
        <Text style={[styles.text, { color: theme.textSecondary }]}>{comment.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 12,
  },
  date: {
    fontSize: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 