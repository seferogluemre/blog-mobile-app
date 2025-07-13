import { useTheme } from '@/context/ThemeContext';
import { BlogPost } from '@/types/blog';
import { ProfileDropdownItem } from '@/types/user';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

// Components
import { BlogHeader } from './components/BlogHeader';
import { BlogList } from './components/BlogList';
import { Navbar } from './components/Navbar';
import { ProfileDropdown } from './components/ProfileDropdown';

// Örnek blog verileri
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'React Hooks ile State Yönetimi',
    description: 'Modern React uygulamalarında useState ve useEffect kullanımı hakkında detaylı rehber.',
    tags: ['React', 'JavaScript', 'Frontend', 'Hooks', 'State'],
    commentCount: 12,
  },
  {
    id: 2,
    title: 'TypeScript ile Tip Güvenliği',
    description: 'JavaScript projelerinizde TypeScript kullanarak daha güvenli kod yazma teknikleri.',
    tags: ['TypeScript', 'JavaScript', 'Web Development'],
    commentCount: 8,
  },
  {
    id: 3,
    title: 'Next.js ile Full Stack Geliştirme',
    description: 'Next.js framework\'ü ile modern web uygulamaları geliştirme rehberi.',
    tags: ['Next.js', 'React', 'Full Stack', 'SSR', 'Performance', 'SEO'],
    commentCount: 15,
  },
];

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