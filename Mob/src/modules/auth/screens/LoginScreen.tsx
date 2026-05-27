import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Eye, EyeOff, Lock, Mail, Users } from 'lucide-react-native';
import { colors } from '../../../config/colors';
import { constants } from '../../../config/constants';
import { AppButton } from '../../../components/AppButton';
import { globalStyles } from '../../../styles/globalStyles';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [role, setRole] = useState<'student' | 'tpo' | 'coordinator'>('student');
  const [email, setEmail] = useState(constants.demoCredentials.student.email);
  const [password, setPassword] = useState(constants.demoCredentials.student.password);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pre-fill credentials when role is toggled
  const handleRoleChange = (selectedRole: 'student' | 'tpo' | 'coordinator') => {
    setRole(selectedRole);
    const creds = constants.demoCredentials[selectedRole];
    setEmail(creds.email);
    setPassword(creds.password);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);

    // Simulate Network Request
    setTimeout(() => {
      setLoading(false);
      
      const studentCreds = constants.demoCredentials.student;
      const tpoCreds = constants.demoCredentials.tpo;
      const coordCreds = constants.demoCredentials.coordinator;

      if (role === 'student' && email === studentCreds.email && password === studentCreds.password) {
        navigation.replace('StudentApp', { screen: 'StudentHome' });
      } else if (role === 'tpo' && email === tpoCreds.email && password === tpoCreds.password) {
        navigation.replace('TPOApp', { screen: 'TPODashboard' });
      } else if (role === 'coordinator' && email === coordCreds.email && password === coordCreds.password) {
        navigation.replace('CoordinatorApp', { screen: 'CoordinatorDashboard' });
      } else {
        // Fallback for custom entries - navigate by selected role anyway as a helpful demo fallback!
        if (role === 'student') {
          navigation.replace('StudentApp', { screen: 'StudentHome' });
        } else if (role === 'tpo') {
          navigation.replace('TPOApp', { screen: 'TPODashboard' });
        } else {
          navigation.replace('CoordinatorApp', { screen: 'CoordinatorDashboard' });
        }
      }
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === 'student') {
        navigation.replace('StudentApp', { screen: 'StudentHome' });
      } else if (role === 'tpo') {
        navigation.replace('TPOApp', { screen: 'TPODashboard' });
      } else {
        navigation.replace('CoordinatorApp', { screen: 'CoordinatorDashboard' });
      }
    }, 800);
  };

  const handleForgotPassword = () => {
    navigation.navigate('AuthStack', { screen: 'ForgotPassword' });
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={globalStyles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header Branding */}
          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>CD</Text>
            </View>
            <Text style={styles.title}>{constants.appName}</Text>
            <Text style={styles.subtitle}>Smart Recruitment & Placement Cell</Text>
          </View>

          {/* Role Selection Tabs */}
          <View style={styles.roleCard}>
            <Text style={styles.roleLabel}>Choose Demo Role:</Text>
            <View style={styles.tabsRow}>
              {(['student', 'tpo', 'coordinator'] as const).map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[
                    styles.tabButton,
                    role === r && styles.activeTab,
                  ]}
                  onPress={() => handleRoleChange(r)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.tabText,
                      role === r && styles.activeTabText,
                    ]}
                  >
                    {r === 'coordinator' ? 'PC' : r.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.formContainer}>
            {/* Email Field */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Mail size={20} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={globalStyles.inputGroup}>
              <View style={styles.passwordLabelRow}>
                <Text style={globalStyles.label}>Password</Text>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgotText}>Forgot?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputWrapper}>
                <Lock size={20} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter password"
                  placeholderTextColor={colors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={colors.textMuted} />
                  ) : (
                    <Eye size={20} color={colors.textMuted} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <AppButton
              title={`Sign In as ${role === 'coordinator' ? 'Coordinator' : role === 'tpo' ? 'TPO' : 'Student'}`}
              onPress={handleLogin}
              loading={loading}
              style={styles.loginBtn}
            />

            {/* Google Demo Login */}
            <AppButton
              title="Continue with Google (Demo)"
              variant="outline"
              onPress={handleGoogleLogin}
              style={styles.googleBtn}
            />

            {/* Register Shortcut */}
            <View style={styles.signupRow}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('AuthStack', { screen: 'Register' })}>
                <Text style={styles.signupLink}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
    fontWeight: '500',
  },
  roleCard: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  roleLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    padding: 4,
    borderRadius: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: '0px 1px 2px rgba(15, 23, 42, 0.05)',
      },
    }),
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
  },
  activeTabText: {
    color: colors.primary,
  },
  formContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 6px rgba(15, 23, 42, 0.04)',
      },
    }),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    height: '100%',
  },
  eyeIcon: {
    padding: 4,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 6,
  },
  loginBtn: {
    marginTop: 12,
  },
  googleBtn: {
    marginTop: 12,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
});
