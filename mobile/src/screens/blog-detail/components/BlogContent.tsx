import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BlogContentProps {
  content: string;
}

export const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const { theme } = useTheme();

  const renderContent = () => {
    // Basit content parsing (gerçek uygulamada markdown parser kullanılabilir)
    const lines = content.split('\n');
    
    return (
      <View style={styles.container}>
        {lines.map((line, index) => {
          if (line.startsWith('## ')) {
            return (
              <Text key={index} style={[styles.subHeading, { color: theme.primary }]}>
                {line.replace('## ', '')}
              </Text>
            );
          } else if (line.startsWith('```')) {
            return null; // Code block başlangıcı/sonu
          } else if (line.includes('const [count, setCount]') || line.includes('useEffect(')) {
            return (
              <View key={index} style={[styles.codeBlock, { backgroundColor: theme.cardBackground }]}>
                <Text style={[styles.codeText, { color: theme.text }]}>{line}</Text>
              </View>
            );
          } else if (line.trim()) {
            return (
              <Text key={index} style={[styles.contentText, { color: theme.textSecondary }]}>
                {line}
              </Text>
            );
          }
          return <View key={index} style={styles.spacer} />;
        })}
      </View>
    );
  };

  return renderContent();
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
  },
  codeBlock: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
  spacer: {
    height: 12,
  },
}); 