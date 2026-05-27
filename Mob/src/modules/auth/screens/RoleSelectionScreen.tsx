import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GraduationCap, Briefcase, Landmark, ChevronRight } from 'lucide-react-native';
import { colors } from '../../../config/colors';
import { constants } from '../../../config/constants';
import { globalStyles } from '../../../styles/globalStyles';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RoleSelectionScreen() {
  const navigation = useNavigation<NavigationProp>();

  const roles = [
    {
      id: 'student',
      title: 'Student Portal',
      description: 'Build your unified profile, search matching drives, apply in 1-click, track rounds, and discuss in communities.',
      icon: <GraduationCap size={32} color={colors.primary} />,
      color: colors.primary,
    },
    {
      id: 'tpo',
      title: 'TPO Portal (Admin)',
      description: 'Create placement drives, shortlist applicants, broadcast alert campaigns, view analytics, and verify student records.',
      icon: <Landmark size={32} color={colors.secondary} />,
      color: colors.secondary,
    },
    {
      id: 'coordinator',
      title: 'Placement Coordinator',
      description: 'Manage assigned drives, audit student marksheets, announce schedule updates, and advance hiring round milestones.',
      icon: <Briefcase size={32} color={colors.success} />,
      color: colors.success,
    },
  ];

  const handleSelectRole = (roleId: string) => {
    // In our LoginScreen, we can pre-select the role!
    // Since we handle role pre-fill directly, redirecting to Login is very natural.
    navigation.replace('AuthStack', { screen: 'Login' });
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <ScrollView contentContainerStyle={globalStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header Title */}
        <View style={styles.header}>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.appName}>{constants.appName}</Text>
          <Text style={styles.tagline}>{constants.tagline}</Text>
        </View>

        <Text style={styles.subLabel}>Choose your portal to proceed:</Text>

        {/* Roles List */}
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={styles.roleCard}
            onPress={() => handleSelectRole(role.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrapper, { backgroundColor: role.color + '15' }]}>
              {role.icon}
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.roleTitle}>{role.title}</Text>
              <Text style={styles.roleDescription}>{role.description}</Text>
            </View>
            <ChevronRight size={20} color={colors.textMuted} style={styles.chevron} />
          </TouchableOpacity>
        ))}

        <View style={styles.footer}>
          <Text style={styles.demoModeText}>Running in Demo Presentation Mode</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  welcome: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textMuted,
  },
  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.primary,
    marginTop: 4,
  },
  tagline: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 6,
    textAlign: 'center',
    fontWeight: '500',
  },
  subLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 6px rgba(15, 23, 42, 0.03)',
      },
    }),
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textWrapper: {
    flex: 1,
    paddingRight: 8,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  chevron: {
    marginLeft: 4,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  demoModeText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
