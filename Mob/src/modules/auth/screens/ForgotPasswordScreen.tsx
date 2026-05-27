import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Mail, ArrowLeft } from 'lucide-react-native';
import { AuthStackParamList } from '../../../navigation/types';
import { AppHeader } from '../../../components/AppHeader';
import { AppButton } from '../../../components/AppButton';
import { SearchInput } from '../../../components/SearchInput'; // We'll use this as a text input for now, or just basic TextInput
import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { TextInput } from 'react-native';

type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
};

export default function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    // Show success message natively
    setIsSuccess(true);
  };

  return (
    <View style={globalStyles.container}>
      <AppHeader 
        title="Forgot Password"
        onBack={() => navigation.goBack()} 
      />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.content}>
            <Text style={styles.title}>Reset your password</Text>
            <Text style={styles.subtitle}>
              Enter your registered email or mobile number below. We'll send you instructions to reset your password.
            </Text>

            {isSuccess ? (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>
                  Password reset instructions have been sent to your registered email/mobile.
                </Text>
                <AppButton 
                  title="Back to Login" 
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                />
              </View>
            ) : (
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Mail color={colors.textMuted} size={20} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email or Mobile Number"
                    placeholderTextColor={colors.textMuted}
                    value={emailOrMobile}
                    onChangeText={setEmailOrMobile}
                    autoCapitalize="none"
                  />
                </View>

                <AppButton 
                  title="Send Reset Link" 
                  onPress={handleSubmit}
                  disabled={!emailOrMobile.trim()}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 32,
    lineHeight: 24,
  },
  formContainer: {
    gap: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  successContainer: {
    backgroundColor: `${colors.success}15`,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  successText: {
    color: colors.success,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  backButton: {
    width: '100%',
  }
});
