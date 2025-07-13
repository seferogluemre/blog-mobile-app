import { useTheme } from '@/context/ThemeContext';
import { ProfileStats as ProfileStatsType } from '@/types/user';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProfileStatsProps {
  stats: ProfileStatsType;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.text }]}>İstatistikler</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Hesap aktivite özeti</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: theme.primary }]}>{stats.postsCount}</Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Gönderi</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: theme.primary }]}>{stats.commentsCount}</Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Yorum</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Üye olma</Text>
          <Text style={[styles.statDate, { color: theme.textSecondary }]}>{stats.joinDate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  statDate: {
    fontSize: 12,
    textAlign: 'center',
  },
}); 