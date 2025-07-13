import { useTheme } from '@/context/ThemeContext';
import { BlogPost } from '@/types/blog';
import { ProfileDropdownItem } from '@/types/user';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

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
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const navigation = useNavigation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const profileMenuItems: ProfileDropdownItem[] = [
    {
      label: 'Hesabım',
      icon: 'person',
      action: () => {
        setShowProfileDropdown(false);
        // Navigate to profile screen
        console.log('Navigate to profile');
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

  const handleReadMore = (postId: number) => {
    (navigation as any).navigate('BlogDetail', { postId });
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
      <View style={styles.navbar}>
        <View style={styles.navbarLeft}>
          <MaterialIcons name="auto-awesome" size={24} color={theme.primary} />
          <Text style={[styles.navbarTitle, { color: theme.text }]}>OnlyJS Blog</Text>
        </View>
        
        <View style={styles.navbarRight}>
          <TouchableOpacity
            style={[styles.themeButton, { backgroundColor: theme.cardBackground }]}
            onPress={toggleTheme}
          >
            <MaterialIcons
              name={isDarkMode ? 'light-mode' : 'dark-mode'}
              size={20}
              color={theme.primary}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.profileButton, { backgroundColor: theme.primary }]}
            onPress={() => setShowProfileDropdown(true)}
          >
            <MaterialIcons name="person" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Dropdown Modal */}
      <Modal
        visible={showProfileDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowProfileDropdown(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowProfileDropdown(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.dropdownContainer, { top: 120, right: 20 }]}>
              <View style={[
                styles.dropdown,
                { 
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.border,
                }
              ]}>
                {profileMenuItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownItem,
                      index < profileMenuItems.length - 1 && {
                        borderBottomColor: theme.border,
                        borderBottomWidth: 1,
                      }
                    ]}
                    onPress={item.action}
                  >
                    <MaterialIcons 
                      name={item.icon as any} 
                      size={18} 
                      color={theme.textSecondary} 
                      style={styles.dropdownIcon}
                    />
                    <Text style={[styles.dropdownText, { color: theme.text }]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>
          ♥ Son Yazılar ♥
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          JavaScript dünyasından en güncel ve ilham verici içerikler
        </Text>
      </View>

      {/* Blog Posts */}
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {blogPosts.map((post) => (
          <View 
            key={post.id} 
            style={[
              styles.blogCard,
              { 
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
              }
            ]}
          >
            <Text style={[styles.blogTitle, { color: theme.text }]}>
              {post.title}
            </Text>
            
            <Text style={[styles.blogDescription, { color: theme.textSecondary }]}>
              {post.description}
            </Text>
            
            {renderTags(post.tags)}
            
            <View style={styles.blogFooter}>
              <View style={styles.commentInfo}>
                <MaterialIcons name="comment" size={16} color={theme.textSecondary} />
                <Text style={[styles.commentCount, { color: theme.textSecondary }]}>
                  {post.commentCount}
                </Text>
              </View>
              
              <TouchableOpacity 
                style={[styles.readMoreButton, { backgroundColor: theme.primary }]}
                onPress={() => handleReadMore(post.id)}
              >
                <Text style={styles.readMoreText}>Devamını Oku</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  navbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  navbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdownContainer: {
    position: 'absolute',
    zIndex: 1000,
  },
  dropdown: {
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownIcon: {
    marginRight: 12,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '500',
  },
  headerSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  blogCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  blogDescription: {
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
  blogFooter: {
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