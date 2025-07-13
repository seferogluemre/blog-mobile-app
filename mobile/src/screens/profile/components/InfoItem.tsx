import { useTheme } from '@/context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface InfoItemProps {
  icon: string;
  label: string;
  value: string;
}

export const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <MaterialIcons name={icon as any} size={20} color={theme.primary} />
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      </View>
      <Text style={[styles.value, { color: theme.textSecondary }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  value: {
    fontSize: 16,
  },
}); 