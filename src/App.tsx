import * as React from 'react';
import { View } from 'react-native';
import { BottomNav, Header, NavKey, WeekDay, WeekStrip } from './components/Chrome';
import { TimelineScreen } from './screens/TimelineScreen';
import { colors, frame, space } from './theme/tokens';
import {
  BEDTIME_DEFAULT,
  duplicateOf,
  planningHintParts,
  tailHintParts,
  DEFAULT_START,
  durationPresets,
  formatRange,
  initialTasks,
  nextFreeStart,
  recentSuggestions,
  s2Tasks,
  s7Tasks,
  s10Tasks,
  formatClock,
  Task,
} from './store';

const loadEditor = () => import('./screens/EditorSheet');
const loadDetail = () => import('./screens/DetailSheet');
const loadInbox = () => import('./screens/InboxScreen');
const loadAi = () => import('./screens/AiScreen');
const loadSettings = () => import('./screens/SettingsScreen');
const loadPro = () => import('./screens/ProSheets');
const loadOnboarding = () => import('./screens/Onboarding');
const EditorSheet = React.lazy(() => loadEditor().then((m) => ({ default: m.EditorSheet })));
const DetailSheet = React.lazy(() => loadDetail().then((m) => ({ default: m.DetailSheet })));
const DeleteDialog = React.lazy(() => loadDetail().then((m) => ({ default: m.DeleteDialog })));
const InboxScreen = React.lazy(() => loadInbox().then((m) => ({ default: m.InboxScreen })));
const AiScreen = React.lazy(() => loadAi().then((m) => ({ default: m.AiScreen })));
const SettingsScreen = React.lazy(() => loadSettings().then((m) => ({ default: m.SettingsScreen })));
const WhatsNewSheet = React.lazy(() => loadPro().then((m) => ({ default: m.WhatsNewSheet })));
const PaywallSheet = React.lazy(() => loadPro().then((m) => ({ default: m.PaywallSheet })));
const OnboardingFlow = React.lazy(() => loadOnboarding().then((m) => ({ default: m.OnboardingFlow })));
const preloadAll = (): void => {
  [loadEditor, loadDetail, loadInbox, loadAi, loadSettings, loadPro, loadOnboarding].forEach((load) => {
    load().catch(() => undefined);
  });
};

const weekDays: WeekDay[] = [
  { label: 'Mon', number: '28', marks: ['alarm', 'checklist', 'plus', 'plain'] },
  { label: 'Tue', number: '29', marks: ['alarm', 'moon'] },
  { label: 'Wed', number: '30', marks: ['alarm', 'moon'] },
  { label: 'Thu', number: '1', marks: ['alarm', 'moon'] },
  { label: 'Fri', number: '2', marks: ['alarm', 'moon'] },
  { label: 'Sat', number: '3', marks: ['alarm', 'moon'] },
  { label: 'Sun', number: '4', marks: ['alarm', 'moon'] },
];

const weekDaysS2: WeekDay[] = [
  { label: 'Sun', number: '27', marks: ['alarm', 'moon'] },
  { label: 'Mon', number: '28', marks: ['alarm', 'checklist', 'plus', 'plain'] },
  { label: 'Tue', number: '29', marks: ['alarm', 'moon'] },
  { label: 'Wed', number: '30', marks: ['alarm', 'moon'] },
  { label: 'Thu', number: '1', marks: ['alarm', 'moon'] },
  { label: 'Fri', number: '2', marks: ['alarm', 'moon'] },
  { label: 'Sat', number: '3', marks: ['alarm', 'moon'] },
  { label: 'Sun', number: '4', marks: ['alarm', 'moon'] },
];


const FONT_GRACE_MS = 1500;

const FACES: Record<string, string> = {
  RobotoText: require('../assets/fonts/RobotoText.ttf'),
  RobotoGutter: require('../assets/fonts/RobotoGutter.ttf'),
  RobotoNow: require('../assets/fonts/RobotoNow.ttf'),
  RobotoNote: require('../assets/fonts/RobotoNote.ttf'),
  RobotoNumber: require('../assets/fonts/RobotoNumber.ttf'),
  RobotoTitle: require('../assets/fonts/RobotoTitle.ttf'),
  RobotoHeader: require('../assets/fonts/RobotoHeader.ttf'),
  RobotoSub: require('../assets/fonts/RobotoSub.ttf'),
  RobotoAction: require('../assets/fonts/RobotoAction.ttf'),
  RobotoSetting: require('../assets/fonts/RobotoSetting.ttf'),
  RobotoChip: require('../assets/fonts/RobotoChip.ttf'),
  RobotoMore: require('../assets/fonts/RobotoMore.ttf'),
};
const FIRST_SCREEN_FACES = ['RobotoText', 'RobotoGutter', 'RobotoNow', 'RobotoNote', 'RobotoNumber', 'RobotoTitle', 'RobotoHeader'];
const installFaces = (): Promise<unknown> | null => {
  if (typeof document === 'undefined') return null;
  const style = document.createElement('style');
  style.textContent = Object.entries(FACES)
    .map(([family, url]) => `@font-face{font-family:${family};src:url("${url}") format("truetype");font-display:swap;}`)
    .join('\n');
  document.head.appendChild(style);
  if (!document.fonts || typeof document.fonts.load !== 'function') return null;
  const load = (families: string[]) => Promise.all(families.map((family) => document.fonts.load(`16px ${family}`)));
  const later = Object.keys(FACES).filter((family) => !FIRST_SCREEN_FACES.includes(family));
  const rest = () => load(later);
  const afterLoad = new Promise<void>((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', () => resolve(), { once: true });
  });
  return afterLoad.then(() => load(FIRST_SCREEN_FACES)).then(rest, rest);
};
const facesReady = installFaces();

export type Scenario =
  | 'S1' | 'S2'
  | 'S3' | 'S3b' | 'S4' | 'S5'
  | 'S6' | 'S7'
  | 'S8' | 'S9'
  | 'S10'
  | 'S11' | 'S12';

const readScenario = (): Scenario => {
  if (typeof window === 'undefined') return 'S1';
  const p = new URLSearchParams(window.location.search).get('p');
  const all: Scenario[] = ['S1', 'S2', 'S3', 'S3b', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12'];
  return all.includes(p as Scenario) ? (p as Scenario) : 'S1';
};

const readWelcome = (): boolean =>
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('p') === 'welcome';

const TIMELINE_SCENARIOS: Scenario[] = ['S1', 'S2', 'S6', 'S7', 'S10'];
const SHEET_SCENARIOS: Scenario[] = ['S1', 'S2', 'S6', 'S7', 'S10'];

export default React.memo(function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(facesReady === null);
  React.useEffect(() => {
    let live = true;
    const done = () => {
      if (live) setFontsLoaded(true);
    };
    facesReady?.then(done, done);
    return () => {
      live = false;
    };
  }, []);
  const [graceOver, setGraceOver] = React.useState(false);
  React.useEffect(() => {
    const id = setTimeout(() => setGraceOver(true), FONT_GRACE_MS);
    return () => clearTimeout(id);
  }, []);

  const [scenario] = React.useState<Scenario>(readScenario);
  const seed: Task[] =
    scenario === 'S2' ? s2Tasks
    : scenario === 'S6' ? s2Tasks
    : scenario === 'S7' ? s7Tasks
    : scenario === 'S10' ? s10Tasks
    : initialTasks;
  const [tasks, setTasks] = React.useState<Task[]>(seed);
  const [tab, setTab] = React.useState<NavKey>(
    scenario === 'S11' ? 'inbox' : scenario === 'S12' ? 'settings' : 'timeline'
  );
  const [selectedDay, setSelectedDay] = React.useState(scenario === 'S2' || scenario === 'S6' || scenario === 'S7' ? 1 : 0);
  const [editor, setEditor] = React.useState<
    | null
    | { mode: 'new'; step: 1 | 2; title: string; duration: number; start: number; colour?: string }
    | { mode: 'edit'; step: 2; title: string; duration: number; start: number; colour?: string }
  >(() => {
    switch (scenario) {
      case 'S3': return { mode: 'new', step: 1, title: '', duration: 15, start: DEFAULT_START };
      case 'S3b': return { mode: 'new', step: 1, title: 'Weekly review', duration: 15, start: DEFAULT_START };
      case 'S4': return { mode: 'new', step: 2, title: 'Weekly review', duration: 15, start: DEFAULT_START };
      case 'S5': return { mode: 'new', step: 2, title: 'Weekly review', duration: 30, start: DEFAULT_START };
      case 'S8': return { mode: 'edit', step: 2, title: 'Weekly review', duration: 30, start: DEFAULT_START };
      case 'S9': return { mode: 'edit', step: 2, title: 'Weekly review', duration: 30, start: 20 * 60 + 15 };
      default: return null;
    }
  });
  const [proSurface, setProSurface] = React.useState<null | 'news' | 'paywall'>(null);
  const [onboarding, setOnboarding] = React.useState<null | 'full' | 'notify'>(() => (readWelcome() ? 'full' : null));
  const [bedtime, setBedtime] = React.useState(BEDTIME_DEFAULT);
  const finishOnboarding = React.useCallback(
    (result: { wake: number; sleep: number } | null) => {
      const full = onboarding === 'full';
      setOnboarding(null);
      if (!full) return;
      if (result !== null) {
        const wake = result.wake;
        setTasks((s) => s.map((t) => (t.id === 'rise' ? { ...t, start: wake, sub: formatClock(wake) } : t)));
        setBedtime(result.sleep);
      }
      setProSurface('paywall');
    },
    [onboarding]
  );
  const [openId, setOpenId] = React.useState<string | null>(
    scenario === 'S6' || scenario === 'S7' ? 'teamSync' : null
  );
  const [confirmId, setConfirmId] = React.useState<string | null>(scenario === 'S10' ? 'grocery' : null);

  const openTask = React.useCallback((id: string) => setOpenId(id), []);
  const duplicateTask = React.useCallback((id: string) => {
    setTasks((s) => {
      const src = s.find((t) => t.id === id);
      return src ? [...s, duplicateOf(src, s, `user-${Date.now()}`)] : s;
    });
    setOpenId(null);
  }, []);
  const toggleDone = React.useCallback((id: string) => {
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }, []);
  const deleteTask = React.useCallback((id: string | null) => {
    if (!id) return;
    setTasks((s) => s.filter((t) => t.id !== id));
    setOpenId(null);
    setConfirmId(null);
  }, []);
  const commitTask = React.useCallback((title: string, duration: number, start: number, colour?: string) => {
    const range = formatRange(start, duration);
    const task: Task = {
      id: `user-${Date.now()}`,
      title,
      sub: range,
      start,
      duration,
      icon: 'at',
      scheduled: true,
      done: false,
      recurring: false,
      hasNotes: false,
      note: '',
      rangeLabel: range,
      noteAccent: [86.8, 105.5],
      ...(colour ? { colour } : null),
    };
    setTasks((s) => [...s, task]);
    setEditor(null);
  }, []);

  const applyEdit = React.useCallback((id: string, title: string, duration: number, start: number, colour?: string) => {
    setTasks((s) =>
      s.map((t) => {
        if (t.id !== id) return t;
        const range = formatRange(start, duration);
        return { ...t, title: title || t.title, start, duration, sub: range, rangeLabel: range, ...(colour ? { colour } : null) };
      })
    );
  }, []);

  const onFab = React.useCallback(() => {
    if (editor === null) setEditor({ mode: 'new', step: 1, title: '', duration: 15, start: nextFreeStart(tasks) });
  }, [editor, tasks]);

  React.useEffect(() => {
    const id = setTimeout(preloadAll, 0);
    return () => clearTimeout(id);
  }, []);

  const escRef = React.useRef<() => boolean>(() => false);
  escRef.current = () => {
    if (onboarding) { finishOnboarding(null); return true; }
    if (proSurface) { setProSurface(null); return true; }
    if (confirmId) { setConfirmId(null); return true; }
    if (editor) { setEditor(null); return true; }
    if (openId) { setOpenId(null); return true; }
    return false;
  };
  React.useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && escRef.current()) e.preventDefault();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  if (!fontsLoaded && !graceOver) {
    return <View style={{ width: frame.width, height: frame.height, backgroundColor: colors.page }} />;
  }

  const chromeless = tab === 'inbox' || tab === 'settings' || tab === 'ai';
  const timelineScenario = scenario === 'S10' ? 'S10' : scenario === 'S7' ? 'S7' : scenario === 'S6' ? 'S6' : scenario === 'S2' ? 'S2' : 'S1';
  const openTaskObj = tasks.find((t) => t.id === openId) ?? null;
  const hintParts = planningHintParts(bedtime);
  const tailHint = tailHintParts(tasks, bedtime);

  return (
    <View style={{ width: frame.width, height: frame.height, backgroundColor: colors.page, overflow: 'hidden' }}>
      {!chromeless && <Header month="September" year="2026" onCalendars={() => setProSurface('news')} />}
      {!chromeless && (
        <WeekStrip
          days={selectedDay === 1 ? weekDaysS2 : weekDays}
          selected={selectedDay}
          s2={selectedDay === 1}
        />
      )}
      {SHEET_SCENARIOS.includes(scenario) && !chromeless ? (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: 0,
            top: space.sheet.top,
            width: frame.width,
            height: space.navBar.top - space.sheet.top,
            backgroundColor: colors.sheet,
            borderTopLeftRadius: space.sheet.radius,
            borderTopRightRadius: space.sheet.radius,
          }}
        />
      ) : null}
      <View style={{ flex: 1, pointerEvents: 'box-none' }}>
        {tab === 'timeline' ? (
          <TimelineScreen
            tasks={tasks}
            hint={scenario === 'S1' ? (hintParts ? hintParts.join('') : '') : ''}
            hintParts={hintParts}
            tailHint={tailHint}
            onOpen={openTask}
            onAdd={onFab}
            onToggle={toggleDone}
            scenario={timelineScenario}
          />
        ) : null}
        <React.Suspense fallback={null}>
        {tab === 'inbox' ? <InboxScreen onNew={onFab} /> : null}
        {tab === 'ai' ? <AiScreen onNew={onFab} /> : null}
        {tab === 'settings' ? (
          <SettingsScreen
            onPro={() => setProSurface('paywall')}
            onGoogleCalendar={() => setProSurface('news')}
            onNotifications={() => setOnboarding('notify')}
          />
        ) : null}
        </React.Suspense>
      </View>
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: 0,
          top: space.navBar.top,
          width: frame.width,
          height: space.navBar.height,
          backgroundColor: colors.navBar,
          zIndex: 25,
        }}
      />
      <BottomNav active={tab} onSelect={setTab} />

      <React.Suspense fallback={null}>
      {openTaskObj && !editor ? (
        <DetailSheet
          title={openTaskObj.title}
          range={`9/28/26, ${openTaskObj.rangeLabel ?? openTaskObj.sub}`}
          done={openTaskObj.done}
          tint={openTaskObj.colour}
          onToggleDone={() => toggleDone(openTaskObj.id)}
          onDelete={() => {
            setConfirmId(openTaskObj.id);
            setOpenId(null);
          }}
          onDuplicate={() => duplicateTask(openTaskObj.id)}
          onEdit={() =>
            setEditor({
              mode: 'edit',
              step: 2,
              title: openTaskObj.title,
              duration: openTaskObj.duration,
              start: openTaskObj.start ?? DEFAULT_START,
              colour: openTaskObj.colour,
            })
          }
          onClose={() => setOpenId(null)}
        />
      ) : null}
      {confirmId ? (
        <DeleteDialog onCancel={() => setConfirmId(null)} onDelete={() => deleteTask(confirmId)} />
      ) : null}

      {editor ? (
        <EditorSheet
          mode={editor.mode}
          step={editor.step}
          title={editor.title}
          duration={editor.duration}
          start={editor.start}
          recent={editor.mode === 'new' ? recentSuggestions(tasks) : []}
          onTitle={(v) => setEditor((e) => (e ? { ...e, title: v } : e))}
          onPickSuggestion={(title: string, minutes: number) =>
            setEditor((e) =>
              e ? { ...e, title, step: 2, duration: durationPresets.includes(minutes) ? minutes : e.duration } : e
            )
          }
          onDuration={(minutes: number) => setEditor((e) => (e ? { ...e, duration: minutes } : e))}
          onStart={(minutes: number) => setEditor((e) => (e ? { ...e, start: minutes } : e))}
          colour={editor.colour}
          onColour={(colour: string) => setEditor((e) => (e ? { ...e, colour } : e))}
          onCommit={() => {
            if (editor.step === 1) setEditor({ ...editor, step: 2 });
            else if (editor.mode === 'edit') {
              if (openId) applyEdit(openId, editor.title, editor.duration, editor.start, editor.colour);
              setOpenId(null);
              setEditor(null);
            } else commitTask(editor.title || 'Answer Emails', editor.duration, editor.start, editor.colour);
          }}
          onClose={() => setEditor(null)}
        />
      ) : null}

      {proSurface === 'news' ? (
        <WhatsNewSheet onDismiss={() => setProSurface(null)} onLearnMore={() => setProSurface('paywall')} />
      ) : null}
      {proSurface === 'paywall' ? <PaywallSheet onClose={() => setProSurface(null)} /> : null}
      {onboarding ? <OnboardingFlow only={onboarding === 'notify' ? 'notify' : undefined} onDone={finishOnboarding} /> : null}
      </React.Suspense>
    </View>
  );
});
