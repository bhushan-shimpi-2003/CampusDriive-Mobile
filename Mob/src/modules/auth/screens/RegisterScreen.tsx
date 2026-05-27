import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft } from 'lucide-react-native';
import { colors } from '../../../config/colors';
import { constants } from '../../../config/constants';
import { AppButton } from '../../../components/AppButton';
import { globalStyles } from '../../../styles/globalStyles';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [prn, setPrn] = useState('');
  const [department, setDepartment] = useState(constants.departments[0]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (!fullName || !email || !mobileNumber || !prn || !password || !confirmPassword) {
      Alert.alert('Fields Incomplete', 'Please fill in all standard registration parameters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Mismatched Passwords', 'Please verify that password matching matches.');
      return;
    }

    setLoading(true);

    // Simulate database registration
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Registration Success',
        'Account created successfully! Let\'s complete your professional recruitment profile.',
        [
          {
            text: 'Let\'s Go',
            onPress: () => {
              // Redirect straight to ProfileBuilder
              navigation.replace('ProfileBuilder');
            },
          },
        ]
      );
    }, 1200);
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Navigation Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={22} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Student Account</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView contentContainerStyle={globalStyles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.tagline}>
            Create your account once to apply for all campus-wide drives instantly.
          </Text>

          {/* Form */}
          <View style={styles.formCard}>
            {/* Full Name */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Full Name</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Bhushan Shimpi"
                placeholderTextColor={colors.textMuted}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Email */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Email Address</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="student@college.edu"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Mobile Number */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Mobile Number</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="+91 98765 43210"
                placeholderTextColor={colors.textMuted}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
              />
            </View>

            {/* PRN / Roll Number */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>PRN / Roll Number</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="2022CS0101"
                placeholderTextColor={colors.textMuted}
                value={prn}
                onChangeText={setPrn}
                autoCapitalize="characters"
              />
            </View>

            {/* Department Custom Segmented Pickers */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Department</Text>
              <View style={styles.deptContainer}>
                {constants.departments.slice(0, 3).map((deptOption) => (
                  <TouchableOpacity
                    key={deptOption}
                    style={[
                      styles.deptChip,
                      department === deptOption && styles.activeDeptChip,
                    ]}
                    onPress={() => setDepartment(deptOption)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.deptChipText,
                        department === deptOption && styles.activeDeptChipText,
                      ]}
                      numberOfLines={1}
                    >
                      {deptOption.split(' ')[0]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Password */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Password</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Min 6 characters"
                placeholderTextColor={colors.textMuted}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
            </View>

            {/* Confirm Password */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Confirm Password</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Re-enter password"
                placeholderTextColor={colors.textMuted}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
              />
            </View>

            <AppButton
              title="Register & Build Profile"
              onPress={handleRegister}
              loading={loading}
              style={styles.actionBtn}
            />
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  placeholder: {
    width: 34,
  },
  tagline: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  deptContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deptChip: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.background,
    marginHorizontal: 3,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeDeptChip: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  deptChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  activeDeptChipText: {
    color: colors.primary,
  },
  actionBtn: {
    marginTop: 12,
  },
});
