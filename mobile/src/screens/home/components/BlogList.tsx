import { BlogPost } from '@/types/blog';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { BlogCard } from './BlogCard';

interface BlogListProps {
  posts: BlogPost[];
  onReadMore: (postId: number) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ posts, onReadMore }) => {
  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {posts.map((post) => (
        <BlogCard 
          key={post.id} 
          post={post} 
          onReadMore={onReadMore}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
}); 