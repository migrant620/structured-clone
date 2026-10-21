import * as React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import Svg, { Circle, Ellipse, Line, Path, Rect } from 'react-native-svg/lib/module/elements';
import { XIcon } from '../icons';
import { colors, fontFamily, frame } from '../theme/tokens';
import { BEDTIME_DEFAULT, formatClock } from '../store';

const GREY = '#85858A';
const WHEEL_FAR = '#DCDCE0';
const S = 49.45;

type Run = { text: string; accent?: boolean };

const Frame: React.FC<{
  title: Run[];
  subtitle: string;
  onClose: () => void;
  children?: React.ReactNode;
}> = ({ title, subtitle, onClose, children }) => (
  <View style={{ position: 'absolute', left: 0, top: 0, width: frame.width, height: frame.height, backgroundColor: colors.page, zIndex: 60 }}>
    {children}
    <Pressable accessibilityRole="button" onPress={onClose} style={{ position: 'absolute', left: 4, top: 57.45 - S, width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={onClose} style={{ width: 24, height: 24 }}>
        <XIcon size={24} color={colors.ink} />
      </Pressable>
    </Pressable>
    <Text
      accessibilityRole="header"
      style={{ position: 'absolute', left: 16, top: 129.45 - S - 0.54, width: 360.73, fontFamily: fontFamily.more, fontSize: 32, lineHeight: 39.8, color: colors.ink }}
    >
      {title.map((r) => (
        <Text key={r.text} style={r.accent ? { color: colors.accent } : undefined}>
          {r.text}
        </Text>
      ))}
    </Text>
    <Text style={{ position: 'absolute', left: 16, top: 222.91 - S + 0.8, width: 360.73, fontFamily: fontFamily.sub, fontSize: 16.6, lineHeight: 18.91, color: GREY }}>
      {subtitle}
    </Text>
  </View>
);

const PrimaryButton: React.FC<{ label: string; onPress: () => void; top?: number }> = ({ label, onPress, top = 743.27 - S }) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={label}
    onPress={onPress}
    style={{
      position: 'absolute', left: 32, top, width: 328.73, height: 51.64, borderRadius: 8.7,
      backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center',
      shadowColor: '#000000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.18, shadowRadius: 3,
    }}
  >
    <Text style={{ fontFamily: fontFamily.more, fontSize: 20.3, lineHeight: 23.27, color: '#FFFFFF' }}>{label}</Text>
  </Pressable>
);

const Footnote: React.FC<{ text: string; top: number; lines?: number }> = ({ text, top, lines = 1 }) => (
  <Text
    style={{
      position: 'absolute', left: 32, top: top + (lines > 1 ? -2.4 : 0.8), width: 328.73, textAlign: 'center',
      fontFamily: fontFamily.text, fontSize: 14.3, lineHeight: lines > 1 ? 21.1 : 16.36, color: GREY,
    }}
  >
    {text}
  </Text>
);

const WELCOME_SHAPES: { x: number; y: number; w: number; h: number; c: string }[] = [
  { x: 205.1, y: 285.1, w: 41.5, h: 41.5, c: '#3AA284' },
  { x: 82.9, y: 334.6, w: 41.5, h: 41.5, c: '#B86B88' },
  { x: 289.5, y: 346.6, w: 49.5, h: 121.4, c: '#40698A' },
  { x: 185.6, y: 390.0, w: 44.0, h: 44.0, c: '#88A9C3' },
  { x: 56.7, y: 418.9, w: 40.7, h: 40.7, c: '#FFADAC' },
  { x: 158.5, y: 481.0, w: 45.1, h: 45.1, c: '#FED46B' },
  { x: 248.7, y: 509.1, w: 52.4, h: 94.5, c: '#9BCB7D' },
  { x: 93.1, y: 516.4, w: 46.5, h: 100.4, c: '#6790B2' },
];

export const WelcomePage: React.FC<{ onNext: () => void; onClose: () => void }> = ({ onNext, onClose }) => (
  <Frame
    title={[{ text: 'Structured\nis a ' }, { text: 'Day Planner', accent: true }]}
    subtitle="Bring structure into your everyday life"
    onClose={onClose}
  >
    {WELCOME_SHAPES.map((s) => (
      <View key={`${s.x}-${s.y}`} pointerEvents="none" style={{ position: 'absolute', left: s.x, top: s.y, width: s.w, height: s.h, borderRadius: s.w / 2, backgroundColor: s.c }} />
    ))}
    <Footnote text="Get started in just one minute—no account needed." top={710.91 - S} />
    <PrimaryButton label="Get Started" onPress={onNext} />
  </Frame>
);

const TOUR: { sub: string; title: string; top: number; titleW: number; pill: { y: number; w: number; h: number; c: string } }[] = [
  { sub: '7:00 AM', title: 'Good Morning', top: 332.0, titleW: 90.91, pill: { y: 284.73, w: 33.09, h: 32.0, c: '#FFB8B7' } },
  { sub: '7:00 AM - 7:30 AM', title: 'Yoga', top: 398.91, titleW: 32.73, pill: { y: 329.82, w: 34.55, h: 74.91, c: '#789DBA' } },
  { sub: '7:30 AM - 7:45 AM', title: 'Coffee', top: 469.82, titleW: 44.0, pill: { y: 421.82, w: 33.45, h: 32.73, c: '#C37D97' } },
  { sub: '7:45 AM - 8:30 AM', title: 'Get Ready', top: 540.73, titleW: 66.18, pill: { y: 464.0, w: 37.09, h: 90.91, c: '#6888A0' } },
  { sub: '8:30 AM - 9:00 AM', title: 'Bike to office', top: 632.73, titleW: 84.73, pill: { y: 564.73, w: 40.36, h: 73.45, c: '#A7D28E' } },
];
const TOUR_CX = 104.36;

export const TourPage: React.FC<{ onNext: () => void; onClose: () => void }> = ({ onNext, onClose }) => (
  <Frame
    title={[{ text: 'A ' }, { text: 'Timeline', accent: true }, { text: '\nOf Your Day' }]}
    subtitle="All your tasks in a visual timeline"
    onClose={onClose}
  >
    <View pointerEvents="none" style={{ position: 'absolute', left: TOUR_CX - 1.09, top: 250.55, width: 2.18, height: 667.64 - 250.55, backgroundColor: '#F3D5D4' }} />
    {TOUR.map((row) => (
      <View key={row.title}>
        <View
          pointerEvents="none"
          style={{
            position: 'absolute', left: TOUR_CX - row.pill.w / 2, top: row.pill.y, width: row.pill.w, height: row.pill.h,
            borderRadius: row.pill.w / 2, backgroundColor: row.pill.c,
          }}
        />
        <Text style={{ position: 'absolute', left: 146.91, top: row.top - S, fontFamily: 'Courier New, monospace', fontSize: 9.7, lineHeight: 12, color: GREY }}>
          {row.sub}
        </Text>
        <Text style={{ position: 'absolute', left: 146.91, top: row.top + 12 - S, fontFamily: fontFamily.more, fontSize: 14.4, lineHeight: 16.36, color: colors.ink }}>
          {row.title}
        </Text>
      </View>
    ))}
    <PrimaryButton label="Continue" onPress={onNext} />
  </Frame>
);

const WHEEL_ROWS: { d: number; top: number; box: { top: number; h: number } }[] = [
  { d: -10, top: 409.45, box: { top: 396.36, h: 40.0 } },
  { d: -5, top: 449.45, box: { top: 436.36, h: 38.91 } },
  { d: 5, top: 529.45, box: { top: 525.45, h: 30.91 } },
  { d: 10, top: 569.45, box: { top: 556.36, h: 48.0 } },
];
const WHEEL_CX = 196.73;
const DAY = 24 * 60;

const TimeWheel: React.FC<{ value: number; onChange: (v: number) => void }> = ({ value, onChange }) => {
  const ref = React.useRef<View>(null);
  const step = React.useCallback((d: number) => onChange((((value + d) % DAY) + DAY) % DAY), [value, onChange]);
  React.useEffect(() => {
    if (Platform.OS !== 'web') return undefined;
    const node = ref.current as unknown as HTMLElement | null;
    if (!node || typeof node.addEventListener !== 'function') return undefined;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      step(e.deltaY > 0 ? 5 : -5);
    };
    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [step]);
  return (
    <View ref={ref} style={{ position: 'absolute', left: 0, top: 273.82 - S, width: frame.width, height: 577.09 - 66 }}>
      <View style={{ position: 'absolute', left: 0, top: -(273.82 - S), width: frame.width, height: frame.height }} pointerEvents="box-none">
        <Pressable
          accessibilityRole="adjustable"
          accessibilityLabel={formatClock(value)}
          accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
          onAccessibilityAction={(e) => step(e.nativeEvent.actionName === 'increment' ? 5 : -5)}
          style={{
            position: 'absolute', left: 66.55, top: 475.27 - S, width: 260, height: 50.18, borderRadius: 8.7,
            backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center',
            shadowColor: '#000000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.18, shadowRadius: 3,
          }}
        >
          <Text style={{ fontFamily: fontFamily.more, fontSize: 18.4, lineHeight: 21.09, color: '#FFFFFF' }}>{formatClock(value)}</Text>
        </Pressable>
        {WHEEL_ROWS.map((row) => (
          <Pressable
            key={row.d}
            accessibilityRole="button"
            accessibilityLabel={formatClock((((value + row.d) % DAY) + DAY) % DAY)}
            onPress={() => step(row.d)}
            style={{ position: 'absolute', left: WHEEL_CX - 36.73, top: row.box.top - S, width: 73.45, height: row.box.h }}
          >
            <Text
              style={{
                position: 'absolute', left: -13.27, top: row.top - row.box.top, width: 100, textAlign: 'center',
                fontFamily: fontFamily.setting, fontSize: 16.6, lineHeight: 22.18,
                color: Math.abs(row.d) === 10 ? WHEEL_FAR : colors.wheelInk,
              }}
            >
              {formatClock((((value + row.d) % DAY) + DAY) % DAY)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export const TimePage: React.FC<{
  kind: 'wake' | 'sleep';
  value: number;
  onChange: (v: number) => void;
  onNext: () => void;
  onClose: () => void;
}> = ({ kind, value, onChange, onNext, onClose }) => (
  <Frame
    title={[{ text: 'When Do You\nUsually ' }, { text: kind === 'wake' ? 'Wake Up' : 'Sleep', accent: true }, { text: '?' }]}
    subtitle="Scroll to adjust the time"
    onClose={onClose}
  >
    <TimeWheel value={value} onChange={onChange} />
    <Footnote text="You can always update this later" top={710.91 - S} />
    <PrimaryButton label="Continue" onPress={onNext} />
  </Frame>
);

const sparkle = (x: number, y: number, w: number, h: number): string => {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const k = 0.18;
  return `M${cx} ${y}Q${cx + w * k} ${cy - h * k} ${x + w} ${cy}Q${cx + w * k} ${cy + h * k} ${cx} ${y + h}Q${cx - w * k} ${cy + h * k} ${x} ${cy}Q${cx - w * k} ${cy - h * k} ${cx} ${y}Z`;
};
const curl = (x: number, y: number, w: number, h: number): string =>
  `M${x + w * 0.2} ${y + h * 0.3}C${x + w * 0.5} ${y} ${x + w} ${y + h * 0.1} ${x + w * 0.75} ${y + h * 0.4}` +
  `C${x + w * 0.55} ${y + h * 0.62} ${x + w * 0.15} ${y + h * 0.45} ${x + w * 0.4} ${y + h * 0.35}` +
  `C${x + w * 0.85} ${y + h * 0.3} ${x + w * 0.95} ${y + h * 0.8} ${x + w * 0.45} ${y + h * 0.95}`;

const BellArt: React.FC = () => (
  <View pointerEvents="none" style={{ position: 'absolute', left: 0, top: 0, width: frame.width, height: frame.height }}>
    <Svg width={frame.width} height={frame.height} viewBox={`0 0 ${frame.width} ${frame.height}`}>
      <Line x1={93.3} y1={358} x2={115.9} y2={371.5} stroke="#FA9A95" strokeWidth={7.6} strokeLinecap="round" />
      <Line x1={76.2} y1={393.8} x2={103.5} y2={391.6} stroke="#FA9A95" strokeWidth={7.6} strokeLinecap="round" />
      <Line x1={78} y1={422.3} x2={106.4} y2={411.4} stroke="#FA9A95" strokeWidth={7.6} strokeLinecap="round" />
      <Path d={sparkle(112.7, 429.1, 22.9, 27.3)} fill="#C8B1DD" />
      <Path d={sparkle(79.6, 448.4, 24.4, 30.5)} fill="#C8B1DD" />
      <Circle cx={214.9} cy={333} r={7.2} fill="#FEC121" />
      <Path d="M124.7 410.1C135 378 168 343 202 336C222 332 240 345 236.2 362C233 390 229 420 232 446C200 452 150 440 124.7 410.1Z" fill="#FEC121" />
      <Ellipse cx={180} cy={428} rx={55} ry={20} fill="#F6A61D" transform="rotate(19 180 428)" />
      <Circle cx={177.8} cy={418.5} r={17} fill="#FDB70C" />
      <Rect x={203.4} y={369.8} width={119.1} height={37.8} rx={18.9} fill="#CCD7DF" />
      <Rect x={214.9} y={384.6} width={55.4} height={7.3} rx={3.65} fill="#96ACBE" />
      <Rect x={276.6} y={384.6} width={27.7} height={7.3} rx={3.65} fill="#96ACBE" />
      <Circle cx={318.2} cy={378.2} r={10.5} fill="#FE9569" />
      <Path d={curl(173.1, 464.7, 21.1, 46.2)} stroke="#7EBA5C" strokeWidth={5.5} strokeLinecap="round" fill="none" />
      <Path d={curl(209.8, 464.0, 24.4, 40.7)} stroke="#00825F" strokeWidth={5.5} strokeLinecap="round" fill="none" />
      <Path d={curl(236.4, 446.9, 33.5, 37.5)} stroke="#527FA1" strokeWidth={5.5} strokeLinecap="round" fill="none" />
    </Svg>
  </View>
);

export const NotifyPage: React.FC<{ onAllow: () => void; onSkip: () => void; onClose: () => void }> = ({ onAllow, onSkip, onClose }) => (
  <Frame
    title={[{ text: 'Never Miss\nA ' }, { text: 'Task', accent: true }, { text: '!' }]}
    subtitle="Would you like timely alerts for your tasks?"
    onClose={onClose}
  >
    <BellArt />
    <Footnote text="Customize them anytime in the settings. No spam, ever." top={639.27 - S} lines={2} />
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Skip For Now"
      onPress={onSkip}
      style={{ position: 'absolute', left: 32, top: 675.64 - S, width: 328.73, height: 51.64, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{ fontFamily: fontFamily.more, fontSize: 20.3, lineHeight: 23.27, color: GREY, marginTop: 3 }}>Skip For Now</Text>
    </Pressable>
    <PrimaryButton label="Allow Notifications" onPress={onAllow} />
  </Frame>
);

const requestAlerts = (): void => {
  try {
    const N = (globalThis as { Notification?: { requestPermission?: () => Promise<unknown> } }).Notification;
    if (N && typeof N.requestPermission === 'function') N.requestPermission().catch(() => undefined);
  } catch {
  }
};

export const DEFAULT_WAKE = 8 * 60;
export const DEFAULT_SLEEP = BEDTIME_DEFAULT;

export const OnboardingFlow: React.FC<{
  only?: 'notify';
  onDone: (result: { wake: number; sleep: number } | null) => void;
}> = ({ only, onDone }) => {
  const [step, setStep] = React.useState(only === 'notify' ? 4 : 0);
  const [wake, setWake] = React.useState(DEFAULT_WAKE);
  const [sleep, setSleep] = React.useState(DEFAULT_SLEEP);
  const close = () => onDone(null);
  const finish = () => onDone(only === 'notify' ? null : { wake, sleep });
  switch (step) {
    case 0:
      return <WelcomePage onNext={() => setStep(1)} onClose={close} />;
    case 1:
      return <TourPage onNext={() => setStep(2)} onClose={close} />;
    case 2:
      return <TimePage kind="wake" value={wake} onChange={setWake} onNext={() => setStep(3)} onClose={close} />;
    case 3:
      return <TimePage kind="sleep" value={sleep} onChange={setSleep} onNext={() => setStep(4)} onClose={close} />;
    default:
      return (
        <NotifyPage
          onAllow={() => {
            requestAlerts();
            finish();
          }}
          onSkip={finish}
          onClose={close}
        />
      );
  }
};
