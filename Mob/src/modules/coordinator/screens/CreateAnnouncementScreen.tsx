import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Megaphone, Pin } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { AppButton } from '../../../components/AppButton';

export default function CreateAnnouncementScreen() {
  const navigation = useNavigation();
  
  const [selectedChannel, setSelectedChannel] = useState('Accenture');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [pinAnnouncement, setPinAnnouncement] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleBroadcast = () => {
    if (!title || !message) {
      Alert.alert('Fields Incomplete', 'Please provide an announcement title and descriptive message.');
      return;
    }

    setSubmitting(true);

    // Simulate sending database announcement
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert(
        'Announcement Broadcasted',
        `Your announcement was published successfully inside the ${selectedChannel} student community and pinned at the top of the chat!`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, 1200);
  };

  const channelOptions = ['Accenture', 'TCS', 'Infosys', 'Wipro'];

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Create Community Alert"
        showBack={true}
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.scrollContainer}>
          <View style={styles.formCard}>
            {/* Select Target channel */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Select Recruitment Channel</Text>
              <View style={styles.pickerSelector}>
                {channelOptions.map((ch) => (
                  <TouchableOpacity
                    key={ch}
                    style={[styles.pickerItem, selectedChannel === ch && styles.activePickerItem]}
                    onPress={() => setSelectedChannel(ch)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.pickerItemText, selectedChannel === ch && styles.activePickerItemText]}>
                      {ch}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Announcement Title */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Announcement Title</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="e.g., Shortlisted Candidates for Technical round"
                placeholderTextColor={colors.textMuted}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Detailed description */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Announcement Message</Text>
              <TextInput
                style={[globalStyles.input, styles.multilineInput]}
                multiline
                numberOfLines={4}
                placeholder="Type your message, details, timings, and resources here..."
                placeholderTextColor={colors.textMuted}
                value={message}
                onChangeText={setMessage}
              />
            </View>

            {/* Pinned announcement Switch toggle */}
            <View style={styles.switchRow}>
              <View style={styles.switchLabelCol}>
                <Pin size={16} color={colors.primary} style={styles.pinIcon} />
                <View>
                  <Text style={styles.switchLabel}>Pin Announcement</Text>
                  <Text style={styles.switchDesc}>Keep pinned at top of the community chat</Text>
                </View>
              </View>
              <Switch
                value={pinAnnouncement}
                onValueChange={setPinAnnouncement}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            </View>

            <AppButton
              title="Broadcast & Pin Announcement"
              onPress={handleBroadcast}
              loading={submitting}
              style={styles.broadcastBtn}
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
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginTop: 16,
  },
  pickerSelector: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 4,
  },
  pickerItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
  },
  activePickerItem: {
    backgroundColor: colors.primary,
  },
  pickerItemText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
  },
  activePickerItemText: {
    color: colors.white,
  },
  multilineInput: {
    height: 90,
    textAlignVertical: 'top',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 20,
  },
  switchLabelCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  pinIcon: {
    marginRight: 10,
    transform: [{ rotate: '45deg' }],
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  switchDesc: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  broadcastBtn: {
    marginTop: 8,
  },
});
