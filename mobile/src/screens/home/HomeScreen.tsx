import { useTheme } from '@/context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Örnek blog verileri
const blogPosts = [
  {
    id: 1,
    title: 'React Hooks ile State Yönetimi',
    description: 'Modern React uygulamalarında useState ve useEffect kullanımı hakkında detaylı rehber.',
    tags: ['React', 'JavaScript', 'Frontend'],
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
    tags: ['Next.js', 'React', 'Full Stack'],
    commentCount: 15,
  },
];

export default function HomeScreen() {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <LinearGradient
      colors={theme.gradient}
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
          >
            <MaterialIcons name="person" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

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
            
            <View style={styles.tagsContainer}>
              {post.tags.map((tag, index) => (
                <View 
                  key={index} 
                  style={[styles.tag, { backgroundColor: theme.primary }]}
                >
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.blogFooter}>
              <View style={styles.commentInfo}>
                <MaterialIcons name="comment" size={16} color={theme.textSecondary} />
                <Text style={[styles.commentCount, { color: theme.textSecondary }]}>
                  {post.commentCount}
                </Text>
              </View>
              
              <TouchableOpacity 
                style={[styles.readMoreButton, { backgroundColor: theme.primary }]}
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