import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Bell, Zap, MessageSquare, ChevronRight } from 'lucide-react-native';
import { colors } from '../../../config/colors';
import { AppButton } from '../../../components/AppButton';
import { RootStackParamList } from '../../../navigation/types';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AuthStack'>;

const slides = [
  {
    id: 1,
    title: 'Centralized Placement Updates',
    description: 'Get all placement drives, announcements, and interview updates in one centralized dashboard.',
    icon: <Bell size={48} color={colors.primary} />,
    color: colors.primary,
  },
  {
    id: 2,
    title: 'One-Click Applications',
    description: 'Create your comprehensive digital profile once and instantly apply to all eligible placement drives.',
    icon: <Zap size={48} color={colors.secondary} />,
    color: colors.secondary,
  },
  {
    id: 3,
    title: 'Company-Wise Communities',
    description: 'Join dedicated recruitment groups for every corporate drive to chat with coordinators and peer candidates.',
    icon: <MessageSquare size={48} color={colors.success} />,
    color: colors.success,
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    navigation.replace('AuthStack', { screen: 'Login' });
  };

  const handleGetStarted = () => {
    navigation.replace('AuthStack', { screen: 'Login' });
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Row with Skip Button */}
      <View style={styles.header}>
        {currentSlideIndex < slides.length - 1 ? (
          <TouchableOpacity onPress={handleSkip} activeOpacity={0.6}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>

      {/* Main Slide Carousel Block */}
      <View style={styles.slideContainer}>
        <View style={[styles.iconContainer, { backgroundColor: currentSlide.color + '15' }]}>
          {currentSlide.icon}
        </View>
        <Text style={styles.title}>{currentSlide.title}</Text>
        <Text style={styles.description}>{currentSlide.description}</Text>
      </View>

      {/* Footer Navigation Panel */}
      <View style={styles.footer}>
        {/* Progress Indicator Dots */}
        <View style={styles.dotsRow}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlideIndex ? styles.activeDot : styles.inactiveDot,
                index === currentSlideIndex && { backgroundColor: currentSlide.color },
              ]}
            />
          ))}
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          {currentSlideIndex === slides.length - 1 ? (
            <AppButton
              title="Get Started"
              variant="primary"
              size="lg"
              onPress={handleGetStarted}
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
            />
          ) : (
            <TouchableOpacity
              style={[styles.nextButtonCircle, { backgroundColor: colors.primary }]}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <ChevronRight size={24} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    justifyContent: 'space-between',
  },
  header: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 8,
  },
  skipText: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '600',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 30,
  },
  description: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 48,
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: colors.border,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  actionButton: {
    width: '100%',
  },
  nextButtonCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 4px 6px rgba(15, 23, 42, 0.1)',
      },
    }),
  },
});
