import { useTheme } from '@/context/ThemeContext';
import { BlogDetail } from '@/types/blog';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
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

// Components
import { AuthorInfo } from './components/AuthorInfo';
import { BlogContent } from './components/BlogContent';
import { CommentSection } from './components/CommentSection';
import { TagList } from './components/TagList';

// Örnek blog detay verisi
const mockBlogDetail: BlogDetail = {
  id: 1,
  title: 'React ile State Yönetimi',
  content: `React Hooks, fonksiyonel bileşenlerde state ve diğer React özelliklerini kullanmamızı sağlayan güçlü araçlardır. Bu yazıda useState ve useEffect hook'larının detaylı kullanımını inceleyeceğiz.

## useState Hook'u

useState hook'u, fonksiyonel bileşenlerde state yönetimi için kullanılır. Temel kullanımı:

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

Bu hook, mevcut state değeri ve onu güncellemek için bir fonksiyon döndürür.

## useEffect Hook'u

useEffect hook'u, bileşenin yaşam döngüsü olaylarını yönetmek için kullanılır. Temel kullanımı:

\`\`\`javascript
useEffect(() => {
  // Side effect
}, [dependencies]);
\`\`\``,
  description: 'Modern React uygulamalarında useState ve useEffect kullanımı hakkında detaylı rehber.',
  tags: ['React', 'JavaScript', 'Frontend'],
  author: {
    id: 1,
    name: 'Ahmet Yılmaz',
    username: 'ahmetyilmaz',
    avatar: undefined,
  },
  createdAt: '2024-01-15',
  readingTime: 5,
  commentCount: 3,
  comments: [
    {
      id: 1,
      postId: 1,
      author: {
        id: 2,
        name: 'Mehmet K.',
        username: 'mehmetk',
      },
      content: 'Çok faydalı bir yazı olmuş, teşekkürler!',
      createdAt: '2024-01-16',
    },
    {
      id: 2,
      postId: 1,
      author: {
        id: 3,
        name: 'Ayşe Y.',
        username: 'aysey',
      },
      content: 'useEffect konusunu daha detaylı anlatabilir misiniz?',
      createdAt: '2024-01-17',
    },
    {
      id: 3,
      postId: 1,
      author: {
        id: 4,
        name: 'Can S.',
        username: 'cans',
      },
      content: 'Örnekler çok açıklayıcı, emeğinize sağlık.',
      createdAt: '2024-01-18',
    },
  ],
};

export default function BlogDetailScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  // Route parametresinden blog ID'sini al (şimdilik mock data kullanıyoruz)
  const blogData = mockBlogDetail;

  const renderCommentCount = (count: number) => (
    <View style={styles.commentCountContainer}>
      <MaterialIcons name="comment" size={16} color={theme.textSecondary} />
      <Text style={[styles.commentCountText, { color: theme.textSecondary }]}>
        {count} yorum
      </Text>
    </View>
  );

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

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Blog Content Card */}
        <View style={[styles.contentCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
          {/* Title */}
          <Text style={[styles.title, { color: theme.text }]}>{blogData.title}</Text>
          
          {/* Author Info */}
          <AuthorInfo 
            author={blogData.author} 
            createdAt={blogData.createdAt} 
            readingTime={blogData.readingTime} 
          />
          
          {/* Comment Count */}
          {renderCommentCount(blogData.commentCount)}
          
          {/* Tags */}
          <TagList tags={blogData.tags} />
          
          {/* Content */}
          <BlogContent content={blogData.content} />
        </View>

        {/* Comments Section */}
        <CommentSection 
          comments={blogData.comments} 
          commentCount={blogData.commentCount} 
        />
      </ScrollView>
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
    paddingBottom: 20,
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
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 32,
  },
  commentCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  commentCountText: {
    fontSize: 14,
    marginLeft: 4,
  },
}); 