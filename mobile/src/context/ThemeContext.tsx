import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ThemeColors {
  background: string;
  cardBackground: string;
  text: string;
  textSecondary: string;
  primary: string;
  border: string;
  gradient: string[];
}

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: ThemeColors;
}

const lightTheme: ThemeColors = {
  background: '#ffffff',
  cardBackground: '#f8fafc',
  text: '#1f2937',
  textSecondary: '#6b7280',
  primary: '#8b5cf6',
  border: '#e5e7eb',
  gradient: ['#f3f4f6', '#e5e7eb'],
};

const darkTheme: ThemeColors = {
  background: '#0f0f23',
  cardBackground: '#1a1a2e',
  text: '#ffffff',
  textSecondary: '#9ca3af',
  primary: '#a855f7',
  border: '#374151',
  gradient: ['#0f0f23', '#16213e', '#1a1a2e'],
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 