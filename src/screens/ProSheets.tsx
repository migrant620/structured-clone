import * as React from 'react';
import { AccessibilityRole, Pressable, ScrollView, Text, View } from 'react-native';
import { CheckCircleFillIcon, XIcon } from '../icons';
import { SCRIM } from './DetailSheet';
import { useDragDismiss } from '../components/dragDismiss';
import { colors, fontFamily, frame } from '../theme/tokens';

const GREY = '#85858A';
const dialogRole = 'dialog' as unknown as AccessibilityRole;

const NEWS_TOP = 439.58;

export const WhatsNewSheet: React.FC<{ onDismiss: () => void; onLearnMore: () => void }> = ({ onDismiss, onLearnMore }) => {
  const { pan, dy } = useDragDismiss(onDismiss);
  return (
  <View aria-modal accessibilityRole={dialogRole} style={{ position: 'absolute', left: 0, top: 0, width: frame.width, height: frame.height, zIndex: 45 }}>
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Close sheet"
      onPress={onDismiss}
      style={{ position: 'absolute', left: 0, top: -49.49, width: 393, height: 826.94, backgroundColor: SCRIM }}
    />
    <View
      {...pan.panHandlers}
      style={{
        position: 'absolute',
        left: 0,
        top: NEWS_TOP,
        width: frame.width,
        height: frame.height - NEWS_TOP,
        backgroundColor: colors.page,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        ...(dy > 0 ? { transform: [{ translateY: dy }] } : null),
      }}
    >
      <Pressable
        accessibilityRole="button"
        onPress={onDismiss}
        style={{ position: 'absolute', left: 172.36, top: 0, width: 48.0, height: 48.36 }}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Drag handle"
        onPress={onDismiss}
        style={{ position: 'absolute', left: 180.49, top: 461.77 - NEWS_TOP, width: 32.02, height: 4, borderRadius: 2, backgroundColor: colors.accent }}
      />
      <Text
        selectable={false}
        style={{
          position: 'absolute', left: 16.01, top: 503.99 - NEWS_TOP, width: 360.98,
          fontFamily: fontFamily.header, fontSize: 20.3, lineHeight: 22.74, color: colors.ink,
        }}
      >
        Google Calendar and Color Palette are here
      </Text>
      <Text
        selectable={false}
        style={{
          position: 'absolute', left: 16.01, top: 565.48 - NEWS_TOP, width: 360.98,
          fontFamily: fontFamily.note, fontSize: 15.6, lineHeight: 19.41, color: GREY,
        }}
      >
        {'You can now bring Google Calendar events into your Structured timeline and customize your planning with more task colors.\n\nBoth are part of Structured Pro, designed to give your planning a little more power and personality.'}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
        onPress={onDismiss}
        style={{ position: 'absolute', left: 16.01, top: 717.95 - NEWS_TOP, width: 176.49, height: 40.03, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ fontFamily: fontFamily.title, fontSize: 14.5, lineHeight: 16.38, color: GREY }}>Dismiss</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Learn more"
        onPress={onLearnMore}
        style={{
          position: 'absolute', left: 200.5, top: 717.95 - NEWS_TOP, width: 176.49, height: 40.03,
          borderRadius: 9.3, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Text style={{ fontFamily: fontFamily.title, fontSize: 14.5, lineHeight: 16.38, color: '#FFFFFF' }}>Learn more</Text>
      </Pressable>
    </View>
  </View>
);
};


const FEATURES = [
  'Plan Recurring Tasks',
  'Import Google Calendar',
  'Advanced Notifications',
  '550+ Premium Icons',
  'AI-powered Assistant',
];
const FEATURE_TOP = 265.64;
const PRO_SCROLL_H = 734.91 - 49.45;
const PRO_CONTENT_H = 665.19 + 3 * 16.38 + 16;
const FEATURE_PITCH = 26.93;

export const PaywallSheet: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <View
    aria-modal
    accessibilityRole={dialogRole}
    style={{ position: 'absolute', left: 0, top: 0, width: frame.width, height: frame.height, zIndex: 50, backgroundColor: colors.page }}
  >
    <ScrollView
      style={{ position: 'absolute', left: 0, top: 0, width: frame.width, height: PRO_SCROLL_H }}
      contentContainerStyle={{ height: PRO_CONTENT_H }}
      showsVerticalScrollIndicator={false}
    >
    <Text style={{ position: 'absolute', left: 16.01, top: 150.65, width: 360.98, fontFamily: fontFamily.more, fontSize: 32.1, lineHeight: 37.48, color: colors.ink }}>
      Get More Done
    </Text>
    <Text style={{ position: 'absolute', left: 16.01, top: 196.14, width: 360.98, fontFamily: fontFamily.more, fontSize: 32.1, lineHeight: 37.48, color: colors.accent }}>
      Structured Pro
    </Text>
    {FEATURES.map((label, i) => (
      <View key={label}>
        <View style={{ position: 'absolute', left: 32.02, top: FEATURE_TOP + 0.36 + i * FEATURE_PITCH, width: 18.19, height: 18.19 }}>
          <CheckCircleFillIcon size={18.19} color={colors.accent} />
        </View>
        <Text
          style={{
            position: 'absolute', left: 58.22, top: FEATURE_TOP + i * FEATURE_PITCH, width: 300,
            fontFamily: fontFamily.setting, fontSize: 17.2, lineHeight: 18.92, color: colors.ink,
          }}
        >
          {label}
        </Text>
      </View>
    ))}
    <Text
      style={{
        position: 'absolute', left: 16.01, top: 440.31, width: 360.98, textAlign: 'center',
        fontFamily: fontFamily.sub, fontSize: 13.8, lineHeight: 18.8, color: GREY,
      }}
    >
      Unlock premium features with our subscription! Cancel anytime with ease on the link below. Thanks for supporting us!
    </Text>
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Cancel Anytime"
      style={{ position: 'absolute', left: 134.64, top: 504.71, width: 123.72, height: 40.03, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{ fontFamily: fontFamily.chip, fontSize: 14.2, lineHeight: 20.01, color: colors.accent }}>Cancel Anytime</Text>
    </Pressable>
    <Text
      style={{
        position: 'absolute', left: 16.01, top: 572.76, width: 360.98, textAlign: 'center',
        fontFamily: fontFamily.text, fontSize: 14.5, lineHeight: 16.38, color: GREY,
      }}
    >
      Already purchased on Play Store?
    </Text>
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Restore Purchase"
      style={{ position: 'absolute', left: 128.09, top: 597.14, width: 136.82, height: 40.03, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{ fontFamily: fontFamily.chip, fontSize: 14.2, lineHeight: 20.01, color: colors.accent }}>Restore Purchase</Text>
    </Pressable>
    <Text
      style={{
        position: 'absolute', left: 16.01, top: 665.19, width: 360.98, textAlign: 'center',
        fontFamily: fontFamily.text, fontSize: 14.5, lineHeight: 16.38, color: GREY,
      }}
    >
      Have a custom code? Select the payment method in the Google Play purchase screen, then choose Redeem Code.
    </Text>
    </ScrollView>
    <Pressable
      accessibilityRole="button"
      onPress={onClose}
      style={{
        position: 'absolute', left: 332.96, top: 20.01, width: 40.03, height: 40.03, borderRadius: 20.02,
        backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center',
      }}
    >
      <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={onClose} style={{ width: 24.02, height: 24.02 }}>
        <XIcon size={24} color="#FFFFFF" />
      </Pressable>
    </Pressable>
  </View>
);
