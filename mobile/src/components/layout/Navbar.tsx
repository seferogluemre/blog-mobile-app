import { useTheme } from '@/context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NavbarProps {
  onProfilePress: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onProfilePress }) => {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <MaterialIcons name="auto-awesome" size={24} color={theme.primary} />
        <Text style={[styles.title, { color: theme.text }]}>OnlyJS Blog</Text>
      </View>
      
      <View style={styles.right}>
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
          onPress={onProfilePress}
        >
          <MaterialIcons name="person" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  right: {
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
}); 