import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Linking
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Send, Pin, Megaphone, FileText, Calendar, ArrowLeft } from 'lucide-react-native';

import { colors } from '../../../config/colors';
import { globalStyles } from '../../../styles/globalStyles';
import { AppHeader } from '../../../components/AppHeader';
import { Badge } from '../../../components/Badge';
import { EmptyState } from '../../../components/EmptyState';
import { mockCommunities, mockCommunityMessages } from '../../../data/mockData';
import { RootStackParamList } from '../../../navigation/types';

type RoutePropType = RouteProp<RootStackParamList, 'CommunityChat'>;
type ChatTab = 'chat' | 'announcements' | 'resources' | 'schedule';

export default function CommunityChatScreen() {
  const navigation = useNavigation();
  const route = useRoute<RoutePropType>();
  const { communityId } = route.params;

  const community = mockCommunities.find((c) => c.id === communityId) || mockCommunities[0];
  const [activeTab, setActiveTab] = useState<ChatTab>('chat');
  const [inputMessage, setInputMessage] = useState('');
  
  // Dynamic state to hold chat messages so user can type & send!
  const [messages, setMessages] = useState<any[]>(mockCommunityMessages[community.id] || []);

  const flatListRef = useRef<FlatList>(null);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: `msg_new_${Date.now()}`,
      communityId: community.id,
      senderName: 'Bhushan Shimpi (You)',
      senderRole: 'student',
      text: inputMessage,
      timestamp: new Date().toISOString(),
      type: 'chat',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Scroll to end shortly after rendering
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const getFilteredMessages = () => {
    switch (activeTab) {
      case 'announcements':
        return messages.filter((m) => m.type === 'announcement');
      case 'resources':
        return messages.filter((m) => m.type === 'resource');
      case 'schedule':
        return messages.filter((m) => m.type === 'schedule');
      default:
        return messages; // Chat tab displays all messages
    }
  };

  const filteredMessages = getFilteredMessages();
  const pinnedMessage = messages.find((m) => m.isPinned);

  const renderItem = ({ item }: { item: any }) => {
    const isTPO = item.senderRole === 'tpo';
    const isPC = item.senderRole === 'coordinator';
    const isMe = item.senderName.includes('(You)');

    let bubbleStyle: any = styles.chatBubble;
    let textStyle: any = styles.chatText;
    let senderStyle: any = styles.chatSender;

    if (isTPO) {
      bubbleStyle = [styles.chatBubble, styles.tpoBubble];
      senderStyle = [styles.chatSender, { color: colors.error }];
    } else if (isPC) {
      bubbleStyle = [styles.chatBubble, styles.pcBubble];
      senderStyle = [styles.chatSender, { color: colors.secondary }];
    } else if (isMe) {
      bubbleStyle = [styles.chatBubble, styles.myBubble];
      textStyle = [styles.chatText, styles.myChatText];
      senderStyle = [styles.chatSender, { color: colors.primary }];
    }

    const cleanTime = new Date(item.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <View style={[styles.bubbleContainer, isMe && styles.myBubbleContainer]}>
        <View style={bubbleStyle}>
          {!isMe && (
            <View style={styles.senderHeader}>
              <Text style={senderStyle}>{item.senderName}</Text>
              {isTPO && <Badge label="TPO" variant="error" style={styles.roleTag} />}
              {isPC && <Badge label="Coordinator" variant="info" style={styles.roleTag} />}
            </View>
          )}
          <Text style={textStyle}>{item.text}</Text>
          <Text style={[styles.chatTime, isMe && styles.myTime]}>{cleanTime}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      {/* Custom navigation bar */}
      <View style={styles.customBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.6}>
          <ArrowLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.barInfo}>
          <Text style={styles.barTitle} numberOfLines={1}>
            {community.companyName} Recruitment Community
          </Text>
          <Text style={styles.barSub}>{community.memberCount} candidates active</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        {/* Pinned Message Banner */}
        {pinnedMessage && (
          <View style={styles.pinnedBanner}>
            <Pin size={14} color={colors.primary} style={styles.pinIcon} />
            <View style={styles.pinnedContent}>
              <Text style={styles.pinnedLabel}>PINNED ANNOUNCEMENT</Text>
              <Text style={styles.pinnedText} numberOfLines={1}>
                {pinnedMessage.text}
              </Text>
            </View>
          </View>
        )}

        {/* Tab Selection Row */}
        <View style={styles.tabsRow}>
          {([
            { id: 'chat', label: 'Chat', icon: <Send size={14} /> },
            { id: 'announcements', label: 'Alerts', icon: <Megaphone size={14} /> },
            { id: 'resources', label: 'Files', icon: <FileText size={14} /> },
            { id: 'schedule', label: 'Dates', icon: <Calendar size={14} /> },
          ] as const).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tabButton, isActive && styles.activeTab]}
                onPress={() => setActiveTab(tab.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Main Thread Content */}
        {filteredMessages.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={filteredMessages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyState
            title={`No ${activeTab} items`}
            description={`No items have been tagged as ${activeTab} in this channel yet.`}
            style={styles.emptyState}
          />
        )}

        {/* Bottom Input Area (Visible only in General Chat) */}
        {activeTab === 'chat' && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.chatInput}
              placeholder="Ask a question..."
              placeholderTextColor={colors.textMuted}
              value={inputMessage}
              onChangeText={setInputMessage}
              multiline
            />
            <TouchableOpacity
              style={[
                styles.sendButtonCircle,
                !inputMessage.trim() && styles.sendDisabled,
              ]}
              onPress={handleSendMessage}
              disabled={!inputMessage.trim()}
              activeOpacity={0.7}
            >
              <Send size={18} color={colors.white} />
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  customBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  backBtn: {
    padding: 6,
    marginRight: 6,
  },
  barInfo: {
    flex: 1,
  },
  barTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  barSub: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  keyboardView: {
    flex: 1,
  },
  pinnedBanner: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary + '20',
  },
  pinIcon: {
    marginRight: 10,
    transform: [{ rotate: '45deg' }],
  },
  pinnedContent: {
    flex: 1,
  },
  pinnedLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  pinnedText: {
    fontSize: 12,
    color: colors.text,
    marginTop: 1,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: colors.background,
  },
  tabText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.textMuted,
  },
  activeTabText: {
    color: colors.primary,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  emptyState: {
    flex: 1,
  },
  bubbleContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    width: '100%',
  },
  myBubbleContainer: {
    justifyContent: 'flex-end',
  },
  chatBubble: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  myBubble: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tpoBubble: {
    backgroundColor: colors.errorLight,
    borderColor: colors.error + '25',
  },
  pcBubble: {
    backgroundColor: colors.secondaryLight,
    borderColor: colors.secondary + '25',
  },
  senderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatSender: {
    fontSize: 12,
    fontWeight: '700',
  },
  roleTag: {
    marginLeft: 6,
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  chatText: {
    fontSize: 13.5,
    color: colors.text,
    lineHeight: 18,
  },
  myChatText: {
    color: colors.white,
  },
  chatTime: {
    fontSize: 9,
    color: colors.textMuted,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  myTime: {
    color: colors.white + '90',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  chatInput: {
    flex: 1,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: colors.text,
    maxHeight: 80,
    marginRight: 10,
  },
  sendButtonCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: {
    backgroundColor: colors.textMuted,
    opacity: 0.5,
  },
});
