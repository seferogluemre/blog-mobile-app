import { useTheme } from '@/context/ThemeContext';
import { ProfileData } from '@/types/user';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { InfoItem } from './InfoItem';

interface ProfileInfoProps {
  profileData: ProfileData;
  onEditPress: () => void;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileData, onEditPress }) => {
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
    <View style={[styles.container, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Hesap Bilgileri</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Kişisel bilgilerinizi yönetin</Text>
        <TouchableOpacity 
          style={[styles.editButton, { backgroundColor: theme.primary }]}
          onPress={onEditPress}
        >
          <MaterialIcons name="edit" size={16} color="#fff" />
          <Text style={styles.editText}>Düzenle</Text>
        </TouchableOpacity>
      </View>

      {/* Info Items */}
      <View style={styles.infoList}>
        <InfoItem 
          icon="person" 
          label="Kullanıcı Adı" 
          value={profileData.username} 
        />
        <InfoItem 
          icon="email" 
          label="E-posta" 
          value={profileData.email} 
        />
        <InfoItem 
          icon="admin-panel-settings" 
          label="Rol" 
          value={getRoleLabel(profileData.role)} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  editText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  infoList: {
    gap: 8,
  },
}); 