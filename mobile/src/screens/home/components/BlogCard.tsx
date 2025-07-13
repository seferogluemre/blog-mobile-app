import { useTheme } from '@/context/ThemeContext';
import { BlogPost } from '@/types/blog';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BlogCardProps {
  post: BlogPost;
  onReadMore: (postId: number) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onReadMore }) => {
  const { theme } = useTheme();

  const renderTags = (tags: string[]) => {
    const displayTags = tags.slice(0, 3);
    const hasMoreTags = tags.length > 3;

    return (
      <View style={styles.tagsContainer}>
        {displayTags.map((tag, index) => (
          <View 
            key={index} 
            style={[styles.tag, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        {hasMoreTags && (
          <View style={[styles.tag, { backgroundColor: theme.textSecondary }]}>
            <Text style={styles.tagText}>...</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View 
      style={[
        styles.container,
        { 
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
        }
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]}>
        {post.title}
      </Text>
      
      <Text style={[styles.description, { color: theme.textSecondary }]}>
        {post.description}
      </Text>
      
      {renderTags(post.tags)}
      
      <View style={styles.footer}>
        <View style={styles.commentInfo}>
          <MaterialIcons name="comment" size={16} color={theme.textSecondary} />
          <Text style={[styles.commentCount, { color: theme.textSecondary }]}>
            {post.commentCount}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.readMoreButton, { backgroundColor: theme.primary }]}
          onPress={() => onReadMore(post.id)}
        >
          <Text style={styles.readMoreText}>Devamını Oku</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentCount: {
    fontSize: 14,
  },
  readMoreButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  readMoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
}); 