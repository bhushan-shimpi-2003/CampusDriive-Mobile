import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BarChart2, BellRing, MessageCircle, LogOut, ChevronRight, Settings } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TPOMoreScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out Admin',
      'Are you sure you want to exit the TPO portal and return to the login screen?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            navigation.replace('AuthStack', { screen: 'Login' });
          },
        },
      ]
    );
  };

  const moreOptions = [
    {
      title: 'Hiring Analytics Summary',
      subtitle: 'Placement histograms & company scales',
      icon: <BarChart2 size={18} color={colors.primary} />,
      onPress: () => navigation.navigate('TPOAnalytics'),
    },
    {
      title: 'Alert Notification Broadcast',
      subtitle: 'Dispatch push notifications targeting custom aud.',
      icon: <BellRing size={18} color={colors.secondary} />,
      onPress: () => navigation.navigate('TPONotifications'),
    },
    {
      title: 'Corporate Discussion Channels',
      subtitle: 'Archive or broadcast pinned announcements',
      icon: <MessageCircle size={18} color={colors.success} />,
      onPress: () => navigation.navigate('TPOCommunities'),
    },
  ];

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader title="Administrative More Menu" />
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>TPO Administrative Tools</Text>

        {moreOptions.map((opt, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionItem}
            onPress={opt.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.leftRow}>
              <View style={styles.iconCircle}>{opt.icon}</View>
              <View>
                <Text style={styles.optionTitle}>{opt.title}</Text>
                <Text style={styles.optionSub}>{opt.subtitle}</Text>
              </View>
            </View>
            <ChevronRight size={16} color={colors.textMuted} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <LogOut size={18} color={colors.error} />
          <Text style={styles.logoutText}>Sign Out Admin Session</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  optionSub: {
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.errorLight,
    borderWidth: 1,
    borderColor: colors.error + '25',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.error,
    marginLeft: 8,
  },
});
