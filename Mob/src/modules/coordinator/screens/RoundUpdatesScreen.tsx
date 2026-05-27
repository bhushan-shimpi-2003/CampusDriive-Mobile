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
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Milestone, ChevronDown, Check } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { constants } from '../../../config/constants';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { AppButton } from '../../../components/AppButton';

export default function RoundUpdatesScreen() {
  const navigation = useNavigation();
  
  const [selectedDrive, setSelectedDrive] = useState('Accenture – Advanced ASE');
  const [selectedStudent, setSelectedStudent] = useState('Bhushan Shimpi (2022CS0101)');
  const [currentRound, setCurrentRound] = useState('Aptitude Round');
  const [newStatus, setNewStatus] = useState<'Aptitude Round' | 'Technical Round' | 'HR Round' | 'Selected' | 'Rejected'>('Technical Round');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSaveUpdate = () => {
    setSaving(true);
    
    // Simulate database record update
    setTimeout(() => {
      setSaving(false);
      Alert.alert(
        'Recruitment Round Updated',
        `Student progress updated successfully! Bhushan Shimpi was advanced to ${newStatus} for the ${selectedDrive} drive.`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, 1200);
  };

  const drivesOptions = [
    'Accenture – Advanced ASE',
    'TCS – Digital Developer',
    'Wipro – Elite Talent',
  ];

  const studentsOptions = [
    'Bhushan Shimpi (2022CS0101)',
    'Aarav Sharma (2022IT0145)',
    'Vihaan Joshi (2022ET0124)',
  ];

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <AppHeader
        title="Update Recruitment Stage"
        showBack={true}
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={globalStyles.scrollContainer}>
          <View style={styles.formCard}>
            {/* Select assigned drive */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Select Placement Drive</Text>
              <View style={styles.pickerSelector}>
                {drivesOptions.map((drv) => (
                  <TouchableOpacity
                    key={drv}
                    style={[styles.pickerItem, selectedDrive === drv && styles.activePickerItem]}
                    onPress={() => setSelectedDrive(drv)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.pickerItemText, selectedDrive === drv && styles.activePickerItemText]}>
                      {drv.split(' – ')[0]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Select candidate */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Select Student Application</Text>
              <View style={styles.pickerSelector}>
                {studentsOptions.map((stud) => (
                  <TouchableOpacity
                    key={stud}
                    style={[styles.pickerItem, selectedStudent === stud && styles.activePickerItem]}
                    onPress={() => setSelectedStudent(stud)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.pickerItemText, selectedStudent === stud && styles.activePickerItemText]}>
                      {stud.split(' ')[0]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Current round indicator */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Current Recruitment Stage</Text>
              <TextInput
                style={[globalStyles.input, styles.disabledInput]}
                value={currentRound}
                editable={false}
              />
            </View>

            {/* Select new round status */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>New Recruitment Stage</Text>
              <View style={styles.statusGrid}>
                {([
                  'Aptitude Round',
                  'Technical Round',
                  'HR Round',
                  'Selected',
                  'Rejected',
                ] as const).map((st) => (
                  <TouchableOpacity
                    key={st}
                    style={[
                      styles.statusChip,
                      newStatus === st && styles.activeStatusChip,
                      newStatus === st && st === 'Selected' && styles.selectedActiveChip,
                      newStatus === st && st === 'Rejected' && styles.rejectedActiveChip,
                    ]}
                    onPress={() => setNewStatus(st)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.statusChipText,
                        newStatus === st && styles.activeStatusChipText,
                      ]}
                    >
                      {st === 'Aptitude Round' ? 'Aptitude' : st === 'Technical Round' ? 'Technical' : st === 'HR Round' ? 'HR' : st}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Notes */}
            <View style={globalStyles.inputGroup}>
              <Text style={globalStyles.label}>Evaluation / Round Notes</Text>
              <TextInput
                style={[globalStyles.input, styles.multilineInput]}
                multiline
                numberOfLines={3}
                placeholder="Enter score, panel number, and notes..."
                placeholderTextColor={colors.textMuted}
                value={notes}
                onChangeText={setNotes}
              />
            </View>

            <AppButton
              title="Save Stage Transition"
              onPress={handleSaveUpdate}
              loading={saving}
              style={styles.saveBtn}
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
  disabledInput: {
    backgroundColor: colors.background,
    color: colors.textMuted,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  statusChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 8,
    marginHorizontal: 4,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  activeStatusChip: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  selectedActiveChip: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
  },
  rejectedActiveChip: {
    backgroundColor: colors.errorLight,
    borderColor: colors.error,
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
  },
  activeStatusChipText: {
    color: colors.text,
  },
  multilineInput: {
    height: 70,
    textAlignVertical: 'top',
  },
  saveBtn: {
    marginTop: 8,
  },
});
