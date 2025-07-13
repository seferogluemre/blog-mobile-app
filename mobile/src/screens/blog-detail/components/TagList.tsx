import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TagListProps {
  tags: string[];
}

export const TagList: React.FC<TagListProps> = ({ tags }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {tags.map((tag, index) => (
        <View key={index} style={[styles.tag, { backgroundColor: theme.primary }]}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
}); 