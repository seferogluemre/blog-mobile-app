import { useTheme } from '@/context/ThemeContext';
import { Author } from '@/types/blog';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AuthorInfoProps {
  author: Author;
  createdAt: string;
  readingTime: number;
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ author, createdAt, readingTime }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
        <MaterialIcons name="person" size={20} color="#fff" />
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.text }]}>{author.name}</Text>
        <View style={styles.metaInfo}>
          <MaterialIcons name="calendar-today" size={14} color={theme.textSecondary} />
          <Text style={[styles.metaText, { color: theme.textSecondary }]}>{createdAt}</Text>
          <MaterialIcons name="access-time" size={14} color={theme.textSecondary} style={styles.metaIcon} />
          <Text style={[styles.metaText, { color: theme.textSecondary }]}>{readingTime} dakika okuma</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
  },
  metaIcon: {
    marginLeft: 12,
  },
}); 