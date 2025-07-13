import { useTheme } from '@/context/ThemeContext';
import { ProfileDropdownItem } from '@/types/user';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

interface ProfileDropdownProps {
  visible: boolean;
  onClose: () => void;
  menuItems: ProfileDropdownItem[];
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  visible,
  onClose,
  menuItems,
}) => {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={[styles.dropdownContainer, { top: 120, right: 20 }]}>
            <View style={[
              styles.dropdown,
              { 
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
              }
            ]}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    index < menuItems.length - 1 && {
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
  );
};

const styles = StyleSheet.create({
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
}); 