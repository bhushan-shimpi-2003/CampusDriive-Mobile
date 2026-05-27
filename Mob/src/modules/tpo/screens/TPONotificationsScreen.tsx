import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Send, Clock, Users, ArrowLeft, Info } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { AppButton } from '../../../components/AppButton';
import { AppCard } from '../../../components/AppCard';
import { mockNotifications } from '../../../data/mockData';

export default function TPONotificationsScreen() {
  const navigation = useNavigation();
  
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState<'All' | 'Eligible' | 'Applied'>('All');
  const [type, setType] = useState<'drive' | 'interview' | 'result' | 'deadline'>('drive');
  const [loading, setLoading] = useState(false);

  // Dynamic campaign log state
  const [history, setHistory] = useState<any[]>([
    {
      id: 'h1',
      title: 'TCS Digital Registrations Live',
      message: 'All students with CGPA >= 8.0 can register for TCS Digital at 7.0 LPA.',
      audience: 'Eligible Students',
      type: 'drive',
      time: '2026-05-27T10:00:00Z',
    },
    {
      id: 'h2',
      title: 'Accenture Interview Schedule',
      message: 'Cognitive and technical interview panels schedule dispatched to emails.',
      audience: 'Applied Students',
      type: 'interview',
      time: '2026-05-26T14:20:00Z',
    },
    {
      id: 'h3',
      title: 'Infosys SP Shortlists Posted',
      message: 'Congratulations to the 28 candidates shortlisted for the Specialist Programmer round.',
      audience: 'All Students',
      type: 'result',
      time: '2026-05-25T08:00:00Z',
    },
  ]);

  const handleSendCampaign = () => {
    if (!title || !message) {
      Alert.alert('Fields Incomplete', 'Please provide a campaign title and alert body message.');
      return;
    }

    setLoading(true);

    // Simulate sending campaign
    setTimeout(() => {
      setLoading(false);
      
      const newAlert = {
        id: `h_new_${Date.now()}`,
        title,
        message,
        audience: audience === 'All' ? 'All Students' : audience === 'Eligible' ? 'Eligible Students' : 'Applied Students',
        type,
        time: new Date().toISOString(),
      };

      setHistory(prev => [newAlert, ...prev]);
      setTitle('');
      setMessage('');

      Alert.alert(
        'Campaign Dispatched',
        'Placement notification campaign dispatched successfully to the student notification boards.'
      );
    }, 1200);
  };

  const renderHistoryCard = ({ item }: { item: any }) => {
    const cleanTime = new Date(item.time).toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <AppCard style={styles.historyCard}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>{item.title}</Text>
          <View style={styles.audienceBadge}>
            <Text style={styles.audienceText}>{item.audience}</Text>
          </View>
        </View>
        <Text style={styles.historyMsg}>{item.message}</Text>
        
        <View style={styles.historyFooter}>
          <View style={styles.timeRow}>
            <Clock size={12} color={colors.textMuted} />
            <Text style={styles.timeText}>{cleanTime}</Text>
          </View>
          <Text style={styles.typeText}>Type: {item.type.toUpperCase()}</Text>
        </View>
      </AppCard>
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Alert Campaign Manager"
        showBack={true}
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.scrollContainer}>
          <Text style={styles.leadText}>
            Draft and dispatch real-time push alerts, schedule updates, or shortlists to custom candidate lists.
          </Text>

          {/* Form */}
          <View style={styles.formCard}>
            <Text style={styles.cardHeaderTitle}>Alert Dispatcher Form</Text>

            {/* Campaign Title */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Notification Title</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="e.g., TCS Interview Postponed"
                placeholderTextColor={colors.textMuted}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Body message */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Body Message</Text>
              <TextInput
                style={[globalStyles.input, styles.multilineInput]}
                multiline
                numberOfLines={3}
                placeholder="Provide detailed instructions..."
                placeholderTextColor={colors.textMuted}
                value={message}
                onChangeText={setMessage}
              />
            </View>

            {/* Target Audience Tabs */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Target Audience Segment</Text>
              <View style={styles.audienceSelector}>
                {(['All', 'Eligible', 'Applied'] as const).map((a) => (
                  <TouchableOpacity
                    key={a}
                    style={[styles.selectorBtn, audience === a && styles.activeAudienceBtn]}
                    onPress={() => setAudience(a)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.selectorText, audience === a && styles.activeSelectorText]}>
                      {a === 'All' ? 'All' : a === 'Eligible' ? 'Eligible' : 'Applied'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Notification Type Picker */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Notification Type</Text>
              <View style={styles.audienceSelector}>
                {([
                  { id: 'drive', label: 'Drive' },
                  { id: 'interview', label: 'Interview' },
                  { id: 'result', label: 'Result' },
                  { id: 'deadline', label: 'Deadline' },
                ] as const).map((t) => (
                  <TouchableOpacity
                    key={t.id}
                    style={[styles.selectorBtn, type === t.id && styles.activeTypeBtn]}
                    onPress={() => setType(t.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.selectorText, type === t.id && styles.activeSelectorText]}>
                      {t.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <AppButton
              title="Dispatch Broadcast Campaign"
              onPress={handleSendCampaign}
              loading={loading}
              style={styles.sendBtn}
            />
          </View>

          {/* Campaign Log History List */}
          <Text style={styles.historyListTitle}>Alert Dispatch History</Text>
          
          <FlatList
            data={history}
            renderItem={renderHistoryCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false} // parent is scrollview
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  leadText: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 24,
  },
  cardHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    paddingLeft: 8,
    marginBottom: 16,
  },
  multilineInput: {
    height: 70,
    textAlignVertical: 'top',
  },
  audienceSelector: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 4,
  },
  selectorBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
  },
  activeAudienceBtn: {
    backgroundColor: colors.primary,
  },
  activeTypeBtn: {
    backgroundColor: colors.secondary,
  },
  selectorText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
  },
  activeSelectorText: {
    color: colors.white,
  },
  sendBtn: {
    marginTop: 8,
  },
  historyListTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  historyCard: {
    marginVertical: 4,
    padding: 14,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    paddingRight: 8,
  },
  audienceBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  audienceText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  historyMsg: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: 12,
  },
  historyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border + '40',
    paddingTop: 8,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    color: colors.textMuted,
    marginLeft: 4,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
  },
});
