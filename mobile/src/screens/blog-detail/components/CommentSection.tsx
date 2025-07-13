import { useTheme } from '@/context/ThemeContext';
import { BlogComment } from '@/types/blog';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CommentItem } from './CommentItem';

interface CommentSectionProps {
  comments: BlogComment[];
  commentCount: number;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments, commentCount }) => {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: theme.cardBackground, 
        borderColor: theme.border 
      }
    ]}>
      <View style={styles.header}>
        <MaterialIcons name="comment" size={20} color={theme.primary} />
        <Text style={[styles.title, { color: theme.text }]}>
          Yorumlar ({commentCount})
        </Text>
      </View>
      
      {comments.map((comment, index) => (
        <CommentItem 
          key={comment.id} 
          comment={comment} 
          isLast={index === comments.length - 1}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
}); 