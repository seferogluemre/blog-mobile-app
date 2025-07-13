import { useTheme } from '@/context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProfileHeaderProps {
  username: string;
  role: 'admin' | 'author' | 'reader';
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, role }) => {
  const { theme } = useTheme();

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'author':
        return 'Yazar';
      case 'reader':
        return 'Okuyucu';
      default:
        return 'Kullanıcı';
    }
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
        <MaterialIcons name="person" size={40} color="#fff" />
      </View>
      
      {/* Username */}
      <Text style={[styles.username, { color: theme.text }]}>{username}</Text>
      
      {/* Role Pill */}
      <View style={[styles.rolePill, { backgroundColor: theme.primary }]}>
        <Text style={styles.roleText}>{getRoleLabel(role)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rolePill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  roleText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
}); 