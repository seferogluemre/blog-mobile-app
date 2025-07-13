import { useTheme } from '@/context/ThemeContext';
import { blogPosts } from '@/data/blogPosts';
import { ProfileDropdownItem } from '@/types/user';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

// Components
import { Navbar } from '@/components/layout/Navbar';
import { BlogHeader } from './components/BlogHeader';
import { BlogList } from './components/BlogList';
import { ProfileDropdown } from './components/ProfileDropdown';

export default function HomeScreen() {
  const { isDarkMode, theme } = useTheme();
  const navigation = useNavigation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const profileMenuItems: ProfileDropdownItem[] = [
    {
      label: 'Hesabım',
      icon: 'person',
      action: () => {
        setShowProfileDropdown(false);
        (navigation as any).navigate('Profile');
      },
    },
    {
      label: 'Çıkış yap',
      icon: 'logout',
      action: () => {
        setShowProfileDropdown(false);
        // Navigate back to welcome screen
        navigation.navigate('Welcome' as never);
      },
    },
  ];

  const handleReadMore = (postId: number) => {
    (navigation as any).navigate('BlogDetail', { postId });
  };

  const handleProfilePress = () => {
    setShowProfileDropdown(true);
  };

  const handleProfileDropdownClose = () => {
    setShowProfileDropdown(false);
  };

  return (
    <LinearGradient
      colors={theme.gradient as any}
      style={styles.container}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      
      {/* Navbar */}
      <Navbar onProfilePress={handleProfilePress} />

      {/* Profile Dropdown */}
      <ProfileDropdown
        visible={showProfileDropdown}
        onClose={handleProfileDropdownClose}
        menuItems={profileMenuItems}
      />

      {/* Header Section */}
      <BlogHeader />

      {/* Blog Posts */}
      <BlogList posts={blogPosts} onReadMore={handleReadMore} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 