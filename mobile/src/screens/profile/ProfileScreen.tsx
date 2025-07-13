import { useTheme } from '@/context/ThemeContext';
import { ProfileData } from '@/types/user';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Components
import { EditProfileModal } from './components/EditProfileModal';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileInfo } from './components/ProfileInfo';
import { ProfileStats } from './components/ProfileStats';

// Mock profil verisi
const mockProfileData: ProfileData = {
  id: 1,
  username: 'ahmet_dev',
  email: 'ahmet@example.com',
  role: 'author',
  avatar: undefined,
  createdAt: '2024-01-01',
  stats: {
    postsCount: 15,
    commentsCount: 42,
    joinDate: '2024-01-01',
  },
};

export default function ProfileScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState<ProfileData>(mockProfileData);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleEditPress = () => {
    setIsEditModalVisible(true);
  };

  const handleSaveProfile = (updatedData: Partial<ProfileData>) => {
    setProfileData(prev => ({
      ...prev,
      ...updatedData,
    }));
    console.log('Profile updated:', updatedData);
  };

  return (
    <LinearGradient colors={theme.gradient as any} style={styles.container}>
      <StatusBar barStyle={theme.text === '#ffffff' ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={theme.text} />
          <Text style={[styles.backText, { color: theme.text }]}>Geri Dön</Text>
        </TouchableOpacity>
      </View>

      {/* Page Title */}
      <View style={styles.titleContainer}>
        <Text style={[styles.pageTitle, { color: theme.primary }]}>Hesabım</Text>
        <Text style={[styles.pageSubtitle, { color: theme.textSecondary }]}>
          Hesap bilgilerinizi görüntüleyin ve düzenleyin
        </Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <ProfileHeader 
          username={profileData.username} 
          role={profileData.role} 
        />

        {/* Profile Info */}
        <ProfileInfo 
          profileData={profileData} 
          onEditPress={handleEditPress} 
        />

        {/* Profile Stats */}
        <ProfileStats stats={profileData.stats} />
      </ScrollView>

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        profileData={profileData}
        onSave={handleSaveProfile}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  scrollContainer: {
    flex: 1,
  },
}); 