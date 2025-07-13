import { useTheme } from '@/context/ThemeContext';
import { ProfileData } from '@/types/user';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  profileData: ProfileData;
  onSave: (updatedData: Partial<ProfileData>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
  profileData,
  onSave,
}) => {
  const { theme } = useTheme();
  const [username, setUsername] = useState(profileData.username);
  const [email, setEmail] = useState(profileData.email);
  const [role, setRole] = useState(profileData.role);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'author', label: 'Yazar' },
    { value: 'reader', label: 'Okuyucu' },
  ];

  const handleSave = () => {
    const updatedData = {
      username,
      email,
      role,
    };
    onSave(updatedData);
    onClose();
  };

  const handleCancel = () => {
    // Reset form to original values
    setUsername(profileData.username);
    setEmail(profileData.email);
    setRole(profileData.role);
    setShowRoleDropdown(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleCancel}
        />
        
        <View style={[styles.modalContainer, { backgroundColor: theme.cardBackground }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={theme.textSecondary} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: theme.text }]}>
              Hesap Bilgilerini Düzenle
            </Text>
          </View>

          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Hesap bilgilerinizi güncelleyebilirsiniz.{'\n'}
            Değişiklikleri kaydetmek için "Kaydet" butonuna tıklayın.
          </Text>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Username Field */}
            <View style={styles.fieldContainer}>
              <Text style={[styles.label, { color: theme.text }]}>Kullanıcı Adı</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.inputBackground,
                    borderColor: theme.border,
                    color: theme.text,
                  },
                ]}
                value={username}
                onChangeText={setUsername}
                placeholder="Kullanıcı adınızı girin"
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            {/* Email Field */}
            <View style={styles.fieldContainer}>
              <Text style={[styles.label, { color: theme.text }]}>E-posta</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.inputBackground,
                    borderColor: theme.border,
                    color: theme.text,
                  },
                ]}
                value={email}
                onChangeText={setEmail}
                placeholder="E-posta adresinizi girin"
                placeholderTextColor={theme.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Role Field */}
            <View style={styles.fieldContainer}>
              <Text style={[styles.label, { color: theme.text }]}>Rol</Text>
              <TouchableOpacity
                style={[
                  styles.dropdown,
                  {
                    backgroundColor: theme.inputBackground,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() => setShowRoleDropdown(!showRoleDropdown)}
              >
                <Text style={[styles.dropdownText, { color: theme.text }]}>
                  {roleOptions.find(option => option.value === role)?.label || 'Rol seçin'}
                </Text>
                <MaterialIcons
                  name={showRoleDropdown ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                  size={24}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>

              {/* Role Dropdown Options */}
              {showRoleDropdown && (
                <View style={[styles.dropdownOptions, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
                  {roleOptions.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.dropdownOption,
                        { backgroundColor: role === option.value ? theme.primaryLight : 'transparent' },
                      ]}
                      onPress={() => {
                        setRole(option.value);
                        setShowRoleDropdown(false);
                      }}
                    >
                      <Text style={[styles.dropdownOptionText, { color: theme.text }]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.cancelButton, { borderColor: theme.border }]}
              onPress={handleCancel}
            >
              <MaterialIcons name="close" size={20} color={theme.textSecondary} />
              <Text style={[styles.cancelButtonText, { color: theme.textSecondary }]}>İptal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: theme.primary }]}
              onPress={handleSave}
            >
              <MaterialIcons name="save" size={20} color="#fff" />
              <Text style={styles.saveButtonText}>Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  closeButton: {
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  formContainer: {
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    flex: 1,
  },
  dropdownOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 4,
    zIndex: 1000,
    maxHeight: 150,
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  dropdownOptionText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 4,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 4,
  },
}); 