import * as React from 'react';
import { PanResponder, Platform, Pressable, Text, View } from 'react-native';
import { TwoToneRun } from '../components/TwoToneRun';
import { AlarmIcon, AtIcon, CheckCircleFillIcon, CheckSquareIcon, ChecklistIcon, GearIcon, HourglassIcon, NotesIcon, PlusCircleIcon, PlusIcon, RecurringIcon, TimerIcon, TrayIcon } from '../icons';
import { colors, frame, space, type } from '../theme/tokens';
import { FIRST_RUN_PLAN_END, formatClock, gapHintParts, planningHint, Task } from '../store';

type RowLayout = {
  subTop: number;
  titleTop: number;
  titleLineHeight: number;
  discCy: number;
  discD: number;
  recurringLeft?: number;
  recurringTop?: number;
  noteTop?: number;
  timerTop?: number;
  countTop?: number;
  notesTop?: number;
  notesLeft?: number;
  glyphBox?: { w: number; h: number };
  ringCy?: number;
  ringH?: number;
  compact?: boolean;
  glyphDy?: number;
  discH?: number;
};

const GAP_HINT_H = 77.8;
const CAPSULE_H = 85.5;
const BODY_GAP = 11.6;

export const rowLayout: Record<string, RowLayout> = {
  rise: {
    subTop: 178.15,
    titleTop: 193.82,
    titleLineHeight: 21.09,
    discCy: 196.5,
    ringCy: 196.8,
    discD: 60.5,
    recurringLeft: 186.55,
    recurringTop: 177.45,
    noteTop: 267.27,
    timerTop: 283.8,
  },
  'guide-start': {
    subTop: 356.36,
    titleTop: 372.73,
    titleLineHeight: 21.64,
    discCy: 395.1,
    ringCy: 395.9,
    discD: 76.5,
    notesTop: 418.18,
  },
  'guide-first': {
    subTop: 448.36,
    titleTop: 464.73,
    titleLineHeight: 21.09,
    discCy: 476.7,
    ringCy: 477.0,
    discD: 60.5,
    countTop: 489.09,
    notesTop: 488.0,
    notesLeft: 180.36,
  },
  'guide-inbox': {
    subTop: 520.36,
    titleTop: 536.73,
    titleLineHeight: 21.09,
    discCy: 548.7,
    ringCy: 549.1,
    discD: 60.5,
    notesTop: 560.0,
  },
  'guide-own': {
    subTop: 592.36,
    titleTop: 608.73,
    titleLineHeight: 21.09,
    discCy: 620.8,
    ringCy: 621.1,
    discD: 60.5,
    notesTop: 632.0,
  },
  teamSync: {
    subTop: 687.6,
    titleTop: 703.4,
    titleLineHeight: 10.6,
    discCy: 692.0,
    discD: 60.5,
    ringCy: 698.0,
    ringH: 32,
    glyphBox: { w: 26.2, h: 21.5 },
    glyphDy: 11.25,
    compact: true,
  },
  grocery: {
    subTop: 680.0,
    titleTop: 696.4,
    titleLineHeight: 10.6,
    discCy: 685.0,
    discD: 60.5,
    ringCy: 691.0,
    ringH: 32,
    glyphBox: { w: 26.2, h: 21.5 },
    glyphDy: 11.25,
    compact: true,
  },
};

const GLYPH_BOX = 26.18;
const PLUS_SIZE = 22.55;
const GLYPH_SIZE = GLYPH_BOX;

export const discLabel: Record<Task['icon'], string> = {
  alarm: 'alarm_fill',
  checklist: 'checklist',
  plusCircle: 'plus_circle_fill',
  tray: 'tray_full_fill',
  gear: 'gearshape_2_fill',
  at: 'at',
};

const Disc: React.FC<{
  icon: Task['icon'];
  scheduled: boolean;
  done?: boolean;
  d: number;
  cy: number;
  onOpen: () => void;
  glyphBox?: { w: number; h: number };
  glyphDy?: number;
  h?: number;
  tint?: string;
}> = ({ icon, scheduled, done = false, d, cy, onOpen, glyphBox = { w: GLYPH_BOX, h: GLYPH_BOX }, glyphDy = 0, h = d, tint = colors.accent }) => {
  const layerFor = (): { w: number; h: number } => {
    if (icon === 'alarm') return { w: inner, h: inner };
    if (icon === 'at') return glyphBox;
    return { w: GLYPH_SIZE, h: GLYPH_SIZE };
  };
  const inner = d >= 70 ? 44 : 34;
  const glyph = (() => {
    switch (icon) {
      case 'alarm':
        return <AlarmIcon size={inner} color="#fff" />;
      case 'checklist':
        return <ChecklistIcon size={GLYPH_SIZE} color={colors.accent} />;
      case 'plusCircle':
        return <PlusCircleIcon size={PLUS_SIZE} color={colors.accent} bg={colors.surfaceMuted} />;
      case 'tray':
        return <TrayIcon size={GLYPH_SIZE} color={colors.accent} bg={colors.surfaceMuted} />;
      case 'gear':
        return <GearIcon size={GLYPH_SIZE} color={colors.accent} bg={colors.surfaceMuted} />;
      case 'at':
        return <AtIcon width={20} height={20} color={tint} />;
    }
  })();
  const layer = layerFor();
  return (
    <View
      style={{
        position: 'absolute',
        left: space.disc.cx - d / 2,
        top: cy - h / 2,
        width: d,
        height: h,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      pointerEvents="box-none"
    >
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          width: d,
          height: h,
          borderRadius: d / 2,
          backgroundColor: scheduled && icon !== 'at' && !done ? colors.accent : colors.surfaceMuted,
        }}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={discLabel[icon]}
        onPress={onOpen}
        style={{
          position: 'absolute',
          left: (d - glyphBox.w) / 2,
          top: (h - glyphBox.h) / 2 + glyphDy,
          width: glyphBox.w,
          height: glyphBox.h,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: (glyphBox.w - layer.w) / 2,
            top: (glyphBox.h - layer.h) / 2,
            width: layer.w,
            height: layer.h,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {glyph}
        </View>
      </Pressable>
    </View>
  );
};

const Ring: React.FC<{ cy: number; onToggle: () => void; h?: number; done?: boolean }> = ({ cy, onToggle, h = 48, done = false }) => {
  const { cx, outer, stroke } = space.ring;
  const BOX_W = 47.7;
  const BOX_H = h;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ checked: done }}
      aria-checked={done}
      onPress={onToggle}
      style={{ position: 'absolute', left: cx - BOX_W / 2, top: cy - BOX_H / 2, width: BOX_W, height: BOX_H, alignItems: 'center', justifyContent: 'center' }}
    >
      {done ? (
        <CheckCircleFillIcon size={outer} color={colors.accent} />
      ) : (
        <View
          pointerEvents="none"
          style={{
            width: outer,
            height: outer,
            borderRadius: outer / 2,
            borderWidth: stroke,
            borderColor: colors.accent,
            backgroundColor: 'transparent',
          }}
        />
      )}
    </Pressable>
  );
};

const Connector: React.FC<{ from: number; to: number; color?: string; solid?: boolean }> = ({
  from,
  to,
  color = colors.accent,
  solid = false,
}) => {
  const segs: number[] = [];
  const { dash, gap, width } = space.connector;
  for (let y = from; y < to; y += dash + gap) segs.push(y);
  if (solid) {
    return (
      <View
        style={{
          position: 'absolute',
          left: space.disc.cx - width / 2 - 0.18,
          top: from,
          width: width + 0.37,
          height: to - from,
          borderRadius: width / 2,
          backgroundColor: color,
        }}
        pointerEvents="none"
      />
    );
  }
  return (
    <View
      style={{ position: 'absolute', left: space.disc.cx - width / 2, top: from, width, height: to - from }}
      pointerEvents="none"
    >
      {segs.map((y) => (
        <View
          key={y}
          style={{
            position: 'absolute',
            top: y - from,
            width,
            height: Math.min(dash, to - y),
            borderRadius: width / 2,
            backgroundColor: color,
          }}
        />
      ))}
    </View>
  );
};

const Row: React.FC<{ task: Task; layout: RowLayout; onOpen: (id: string) => void; onToggle?: (id: string) => void }> = ({
  task,
  layout,
  onOpen,
  onToggle,
}) => {
  const l = layout;
  const tall = l.discD >= 70;
  return (
    <View>
      <Disc icon={task.icon} scheduled={task.scheduled} done={task.done} d={l.discD} cy={l.discCy} h={l.discH} tint={task.colour} onOpen={() => onOpen(task.id)} glyphBox={l.glyphBox} glyphDy={l.glyphDy} />
      <Ring cy={l.ringCy ?? l.discCy} h={l.ringH} onToggle={() => (onToggle ? onToggle(task.id) : onOpen(task.id))} done={task.done} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={task.title}
        onPress={() => onOpen(task.id)}
        style={({ pressed }) => ({
          position: 'absolute',
          left: space.textLeft,
          top: l.subTop,
          width: 220,
          height: l.titleTop + l.titleLineHeight - l.subTop + 6,
          backgroundColor: pressed ? colors.accentWash : 'transparent',
          borderRadius: 8,
        })}
      >
        <Text
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            ...type.rowMeta,
            letterSpacing: task.rangeLabel ? 0.12 : task.scheduled ? 0.19 : type.rowMeta.letterSpacing,
            color: colors.inkSecondary,
          }}
        >
          {task.rangeLabel ?? (task.scheduled && task.start !== null ? formatClock(task.start) : task.sub)}
        </Text>
        {l.compact ? (
          <>
            <Text
              style={{
                position: 'absolute',
                left: 0,
                top: l.titleTop - l.subTop,
                width: 240,
                ...type.rowTitle,
                lineHeight: l.titleLineHeight,
                color: 'transparent',
              }}
              numberOfLines={1}
            >
              {task.title}
            </Text>
            <Text
              aria-hidden
              pointerEvents="none"
              style={{
                position: 'absolute',
                left: 0,
                top: l.titleTop - l.subTop,
                width: 240,
                ...type.rowTitle,
                lineHeight: 23,
                color: task.done ? colors.doneInk : colors.ink,
                textDecorationLine: task.done ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </Text>
          </>
        ) : (
          <Text
            style={{
              position: 'absolute',
              left: 0,
              top: l.titleTop - l.subTop,
              width: tall ? 216.73 : 240,
              ...type.rowTitle,
              lineHeight: l.titleLineHeight,
              fontSize: tall ? type.rowTitleTall.fontSize : type.rowTitle.fontSize,
              color: task.done ? colors.doneInk : colors.ink,
              textDecorationLine: task.done ? 'line-through' : 'none',
            }}
            numberOfLines={tall ? undefined : 1}
          >
            {task.title}
          </Text>
        )}
      </Pressable>
      {l.recurringLeft !== undefined && task.recurring ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Is recurring"
          onPress={() => onOpen(task.id)}
          style={{ position: 'absolute', left: l.recurringLeft, top: l.recurringTop, width: 14.18, height: 14.18 }}
        >
          <RecurringIcon size={14.18} color={colors.inkSecondary} />
        </Pressable>
      ) : null}
      {l.notesTop !== undefined && task.hasNotes ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Has notes"
          onPress={() => onOpen(task.id)}
          style={{ position: 'absolute', left: l.notesLeft ?? space.textLeft, top: l.notesTop, width: 16, height: 16 }}
        >
          <NotesIcon size={16} color={colors.inkSecondary} />
        </Pressable>
      ) : null}
      {l.countTop !== undefined && task.checklist ? (
        <View pointerEvents="none" style={{ position: 'absolute', left: 130.15, top: l.countTop + 0.8, width: 11.4, height: 12.3 }}>
          <CheckSquareIcon size={11.4} color={colors.inkSecondary} />
        </View>
      ) : null}
      {l.countTop !== undefined && task.checklist ? (
        <Text style={{ position: 'absolute', left: 148.36, top: l.countTop, ...type.count, color: colors.inkSecondary }}>
          {`${task.checklist.done}/${task.checklist.total}`}
        </Text>
      ) : null}
      {l.timerTop !== undefined && task.note ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={task.noteAccent === null ? 'hourglass_bottom' : 'timer'}
          onPress={() => onOpen(task.id)}
          style={{ position: 'absolute', left: space.textLeft, top: l.timerTop, width: 14.18, height: 14.18 }}
        >
          {task.noteAccent === null ? (
            <HourglassIcon size={14.18} color={colors.inkSecondary} />
          ) : (
            <TimerIcon size={14.18} color={colors.inkSecondary} />
          )}
        </Pressable>
      ) : null}
      {l.noteTop !== undefined && task.note ? (
        task.noteAccent === null ? (
          <Text
            style={{ position: 'absolute', left: 146.18, top: l.noteTop, width: 250, ...type.note, lineHeight: 48, color: colors.inkSecondary }}
          >
            {task.note}
          </Text>
        ) : (
          <TwoToneRun
            text={task.note}
            style={{ position: 'absolute', left: 146.18, top: l.noteTop, width: 250, ...type.note, lineHeight: 48, color: colors.inkSecondary }}
            from={task.noteAccent?.[0] ?? 86.8}
            to={task.noteAccent?.[1] ?? 105.5}
            color={colors.inkSecondary}
            accent={colors.accent}
            backing={colors.sheet}
          />
        )
      ) : null}
    </View>
  );
};

const GUTTER: { top: number; label: string; now?: boolean }[] = [
  { top: 188.36, label: '8:00' },
  { top: 254.18, label: '11:00' },
  { top: 290.55, label: '2:00' },
  { top: 347.27, label: '6:40', now: true },
  { top: 408.36, label: '6:50' },
  { top: 438.18, label: '7:00' },
  { top: 498.18, label: '7:05' },
  { top: 510.18, label: '7:15' },
  { top: 570.18, label: '7:20' },
  { top: 582.18, label: '7:30' },
  { top: 642.18, label: '7:35' },
];

const GUTTER_S2: { top: number; label: string; now?: boolean }[] = [
  { top: 188.36, label: '8:00' },
  { top: 254.18, label: '11:00' },
  { top: 290.55, label: '2:00' },
  { top: 348.6, label: '6:44', now: true },
  { top: 408.36, label: '6:50' },
  { top: 438.18, label: '7:00' },
  { top: 498.18, label: '7:05' },
  { top: 510.18, label: '7:15' },
  { top: 570.18, label: '7:20' },
  { top: 582.18, label: '7:30' },
  { top: 642.18, label: '7:35' },
  { top: 654.6, label: '7:45' },
  { top: 697.2, label: '8:00' },
];

const S10_BASE = 58.18;
export const GUTTER_S10_LABELS: { top: number; label: string; now?: boolean }[] = [
  { top: 188.49 - S10_BASE, label: '8:00' },
  { top: 251.81 - S10_BASE, label: '12:00' },
  { top: 308.58 - S10_BASE, label: '6:45' },
  { top: 298.19, label: '6:48', now: true },
  { top: 368.62 - S10_BASE, label: '6:50' },
  { top: 398.46 - S10_BASE, label: '7:00' },
  { top: 458.5 - S10_BASE, label: '7:05' },
  { top: 470.51 - S10_BASE, label: '7:15' },
  { top: 530.55 - S10_BASE, label: '7:20' },
  { top: 542.56 - S10_BASE, label: '7:30' },
  { top: 602.6 - S10_BASE, label: '7:35' },
  { top: 614.61 - S10_BASE, label: '7:45' },
  { top: 657.18 - S10_BASE, label: '8:00' },
  { top: 700.12 - S10_BASE, label: '8:15' },
];

export const S10_LAYOUT: Record<string, RowLayout> = {
  rise: {
    subTop: 177.58 - S10_BASE,
    titleTop: 193.95 - S10_BASE,
    titleLineHeight: 21.09,
    discCy: 196.5 - S10_BASE,
    discD: 60.5,
    recurringLeft: 186.67,
    recurringTop: 177.58 - S10_BASE,
    noteTop: 247.44 - S10_BASE,
    timerTop: 263.82 - S10_BASE,
  },
  'guide-start': {
    subTop: 316.58 - S10_BASE,
    titleTop: 332.96 - S10_BASE,
    titleLineHeight: 21.64,
    discCy: 355.52 - S10_BASE,
    discD: 76.5,
    notesTop: 378.44 - S10_BASE,
  },
  'guide-first': {
    subTop: 408.65 - S10_BASE,
    titleTop: 425.02 - S10_BASE,
    titleLineHeight: 21.09,
    discCy: 436.67 - S10_BASE,
    discD: 60.5,
    countTop: 449.4 - S10_BASE,
    notesTop: 448.31 - S10_BASE,
    notesLeft: 180.49,
  },
  'guide-inbox': {
    subTop: 480.7 - S10_BASE,
    titleTop: 497.07 - S10_BASE,
    titleLineHeight: 21.09,
    discCy: 508.72 - S10_BASE,
    discD: 60.5,
    notesTop: 520.36 - S10_BASE,
  },
  'guide-own': {
    subTop: 552.75 - S10_BASE,
    titleTop: 569.12 - S10_BASE,
    titleLineHeight: 21.09,
    discCy: 580.77 - S10_BASE,
    discD: 60.5,
    notesTop: 592.41 - S10_BASE,
  },
  teamSync: {
    subTop: 646.99 - S10_BASE,
    titleTop: 663.37 - S10_BASE,
    titleLineHeight: 10.6,
    discCy: 606.91,
    discD: 60.5,
    discH: CAPSULE_H,
    ringCy: 607.27,
    ringH: 48,
    compact: true,
  },
  grocery: {
    subTop: 646.99 - S10_BASE + 84.36,
    titleTop: 663.37 - S10_BASE + 84.36,
    titleLineHeight: 10.6,
    discCy: 691.64,
    discD: 60.5,
    ringCy: 692.0,
    ringH: 48,
    compact: true,
  },
};

const GUTTER_S7_LABELS: { top: number; label: string; now?: boolean }[] = [
  { top: 188.36, label: '8:00' },
  { top: 251.55, label: '12:00' },
  { top: 308.35, label: '6:45' },
  { top: 320.15, label: '6:45', now: true },
  { top: 368.35, label: '6:50' },
  { top: 398.25, label: '7:00' },
  { top: 458.25, label: '7:05' },
  { top: 470.25, label: '7:15' },
];

export const S7_LAYOUT: Record<string, RowLayout> = {
  rise: {
    subTop: 177.45,
    titleTop: 193.82,
    titleLineHeight: 21.09,
    discCy: 195.9,
    discD: 60.5,
    recurringLeft: 186.55,
    recurringTop: 177.45,
    noteTop: 247.27,
    timerTop: 263.8,
  },
  'guide-start': {
    subTop: 316.36,
    titleTop: 332.73,
    titleLineHeight: 21.64,
    discCy: 355.1,
    discD: 76.5,
    notesTop: 378.18,
  },
  'guide-first': {
    subTop: 408.36,
    titleTop: 424.73,
    titleLineHeight: 21.09,
    discCy: 436.0,
    discD: 60.5,
    countTop: 449.09,
    notesTop: 448.0,
    notesLeft: 180.36,
  },
  'guide-inbox': {
    subTop: 480.36,
    titleTop: 496.73,
    titleLineHeight: 21.09,
    discCy: 508.0,
    discD: 60.5,
    notesTop: 520.0,
  },
  'guide-own': {
    subTop: 552.36,
    titleTop: 568.73,
    titleLineHeight: 21.09,
    discCy: 580.0,
    discD: 60.5,
    notesTop: 592.0,
  },
  teamSync: {
    subTop: 647.0,
    titleTop: 663.4,
    titleLineHeight: 10.6,
    discCy: 652.0,
    discD: 60.5,
    ringCy: 658.0,
    ringH: 32,
    glyphBox: { w: 26.2, h: 21.5 },
    glyphDy: 11.25,
    compact: true,
  },
};

const HintRun: React.FC<{ parts: [string, string, string]; top: number; onPress: () => void }> = ({ parts, top, onPress }) => (
  <Text
    accessibilityRole="button"
    onPress={onPress}
    numberOfLines={1}
    style={{ position: 'absolute', left: 146.18, top, width: 240, ...type.note, lineHeight: 48, color: colors.inkSecondary }}
  >
    {parts[0]}
    <Text style={{ color: colors.accent }}>{parts[1]}</Text>
    {parts[2]}
  </Text>
);

export const TimelineScreen: React.FC<{
  tasks: Task[];
  hint: string;
  onOpen: (id: string) => void;
  onAdd: () => void;
  onToggle?: (id: string) => void;
  scenario?: 'S1' | 'S2' | 'S6' | 'S7' | 'S10';
  hintParts?: [string, string, string] | null;
  tailHint?: [string, string, string] | null;
}> = ({ tasks, hint, onOpen, onAdd, onToggle, scenario = 'S1', hintParts = null, tailHint = null }) => {
  const scrolled = scenario === 'S10' || scenario === 'S7';
  const GUTTER_ACTIVE =
    scenario === 'S1'
      ? GUTTER
      : scenario === 'S10'
        ? GUTTER_S10_LABELS
        : scenario === 'S7'
          ? GUTTER_S7_LABELS
          : GUTTER_S2;
  const baseLayouts = scenario === 'S10' ? S10_LAYOUT : scenario === 'S7' ? S7_LAYOUT : rowLayout;
  const { layouts, gapHints } = React.useMemo(() => {
    const merged: Record<string, RowLayout> = { ...baseLayouts };
    const hints: { parts: [string, string, string]; sub: number }[] = [];
    let prev: RowLayout | null = null;
    let planEnd = FIRST_RUN_PLAN_END;
    for (const task of tasks) {
      if (merged[task.id]) {
        prev = merged[task.id];
        if (task.icon === 'at' && task.start !== null) planEnd = task.start + task.duration;
        continue;
      }
      const gap = scenario === 'S1' && task.start !== null ? gapHintParts(task.start - planEnd) : null;
      if (task.start !== null) planEnd = Math.max(planEnd, task.start + task.duration);
      const discD = 60.5;
      const discH = task.duration >= 30 ? CAPSULE_H : discD;
      const prevBottom = prev ? prev.discCy + (prev.discH ?? prev.discD) / 2 : 650.25;
      const discCy: number = prevBottom + BODY_GAP + discH / 2 + (gap ? GAP_HINT_H : 0);
      const subTop = discCy - 18.3;
      if (gap) hints.push({ parts: gap, sub: subTop - GAP_HINT_H });
      const layout: RowLayout = {
        subTop,
        titleTop: subTop + 16.37,
        titleLineHeight: 10.6,
        discCy,
        discD,
        ...(discH > discD ? { discH } : null),
        ringCy: discCy + 0.36,
        ringH: 48,
        compact: true,
      };
      merged[task.id] = layout;
      prev = layout;
    }
    return { layouts: merged, gapHints: hints };
  }, [baseLayouts, tasks, scenario]);
  const shown = tasks.filter((task) => layouts[task.id]);
  const discs = shown.map((task) => ({ cy: layouts[task.id].discCy, d: layouts[task.id].discH ?? layouts[task.id].discD }));
  const lastBottom = discs.length ? Math.max(...discs.map((d) => d.cy + d.d / 2)) : 0;
  const userRows = shown.filter((task) => task.id.startsWith('user-'));
  const lastUser = userRows.length ? layouts[userRows[userRows.length - 1].id] : null;
  const tail = scenario === 'S1' && tailHint && lastUser ? { parts: tailHint, sub: lastUser.subTop } : null;
  const tailBottom = tail ? tail.sub + 111.2 + 13.8 : 0;
  const contentHeight = Math.max(frame.height, lastBottom + space.navBar.height + 16, tailBottom + space.navBar.height + 4);
  const maxOffset = Math.max(0, contentHeight - frame.height);
  const [offset, setOffset] = React.useState(0);
  const clamp = React.useCallback((v: number) => Math.min(maxOffset, Math.max(0, v)), [maxOffset]);
  React.useEffect(() => {
    setOffset((o) => clamp(o));
  }, [clamp]);
  const dragFrom = React.useRef(0);
  const offsetRef = React.useRef(0);
  offsetRef.current = offset;
  const pan = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: (_e, g) => maxOffset > 0 && Math.abs(g.dy) > 6 && Math.abs(g.dy) > Math.abs(g.dx),
        onPanResponderGrant: () => {
          dragFrom.current = offsetRef.current;
        },
        onPanResponderMove: (_e, g) => setOffset(clamp(dragFrom.current - g.dy)),
      }),
    [clamp, maxOffset]
  );
  const viewportRef = React.useRef<View>(null);
  React.useEffect(() => {
    if (Platform.OS !== 'web' || scrolled) return undefined;
    const node = viewportRef.current as unknown as HTMLElement | null;
    if (!node || typeof node.addEventListener !== 'function') return undefined;
    const onWheel = (e: WheelEvent) => {
      if (maxOffset <= 0) return;
      e.preventDefault();
      setOffset((o) => clamp(o + e.deltaY));
    };
    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [clamp, maxOffset, scrolled]);
  const body = (
    <View style={{ flex: 1 }}>
      {discs.map((disc, i) => {
        const next = shown[i + 1];
        const nextLayout = next ? layouts[next.id] : null;
        const fromUnscheduled = !shown[i].scheduled;
        const grey = !nextLayout || next.icon === 'at' || fromUnscheduled;
        return (
          <Connector
            key={i}
            from={disc.cy + disc.d / 2}
            to={nextLayout ? nextLayout.discCy - (nextLayout.discH ?? nextLayout.discD) / 2 : Math.max(space.nav.iconTop + 2, scrolled ? 0 : contentHeight)}
            color={grey ? colors.surfaceMuted : colors.accent}
            solid={!!next && (next.icon === 'at' || fromUnscheduled)}
          />
        );
      })}
      {GUTTER_ACTIVE.map((g, gi) => (
        <Text
          key={`${g.label}${g.now ? '-now' : ''}-${gi}`}
          style={{
            position: 'absolute',
            left: 0,
            top: g.top,
            width: 40,
            textAlign: 'right',
            ...(g.now ? type.gutterNow : type.gutter),
            color: g.now ? colors.ink : colors.inkSecondary,
          }}
        >
          {g.label}
        </Text>
      ))}
      {shown.map((task) => (
        <Row key={task.id} task={task} layout={layouts[task.id]} onOpen={onOpen} onToggle={onToggle} />
      ))}
    </View>
  );
  const firstRunFooter = (
    <>
      {scenario === 'S1' && !tasks.some((t) => t.id.startsWith('user-')) && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="timer"
          onPress={onAdd}
          style={{ position: 'absolute', left: space.textLeft, top: 682.3, width: 14.18, height: 14.18 }}
        >
          <TimerIcon size={14.18} color={colors.inkSecondary} />
        </Pressable>
      )}
      {scenario === 'S1' && !tasks.some((t) => t.id.startsWith('user-')) && hint !== planningHint && hintParts ? (
        <HintRun parts={hintParts} top={665.45} onPress={onAdd} />
      ) : null}
      {scenario === 'S1' && !tasks.some((t) => t.id.startsWith('user-')) && hint === planningHint && (
        <TwoToneRun
          text={hint}
          from={117}
          to={160.8}
          color={colors.inkSecondary}
          accent={colors.accent}
          backing={colors.sheet}
          style={{ position: 'absolute', left: 146.18, top: 665.45, width: 213.5, ...type.note, lineHeight: 48, color: colors.inkSecondary }}
        />
      )}
      {scenario === 'S1' && !tasks.some((t) => t.id.startsWith('user-')) && (
        <Pressable
          accessibilityRole="button"
          onPress={onAdd}
          style={{ position: 'absolute', left: 128, top: 701.95, width: 84.73, height: 12 }}
        />
      )}
      {gapHints.map((g) => (
        <React.Fragment key={`gap-${g.sub}`}>
          <View pointerEvents="none" style={{ position: 'absolute', left: space.textLeft, top: g.sub + 1.1, width: 14.18, height: 14.18 }}>
            <TimerIcon size={14.18} color={colors.inkSecondary} />
          </View>
          <HintRun parts={g.parts} top={g.sub - 15.3} onPress={onAdd} />
        </React.Fragment>
      ))}
      {tail ? (
        <>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="timer"
            onPress={onAdd}
            style={{ position: 'absolute', left: space.textLeft, top: tail.sub + 91.6, width: 14.18, height: 14.18 }}
          >
            <TimerIcon size={14.18} color={colors.inkSecondary} />
          </Pressable>
          <HintRun parts={tail.parts} top={tail.sub + 75.2} onPress={onAdd} />
          <Pressable accessibilityRole="button" onPress={onAdd} style={{ position: 'absolute', left: 128, top: tail.sub + 111.2, width: 84.73, height: 13.8 }} />
        </>
      ) : null}
    </>
  );
  return (
    <View style={{ flex: 1 }}>
      {scenario === 'S10' ? (
        <View style={{ position: 'absolute', left: 0, top: space.sheet.top, width: frame.width, height: frame.height - space.sheet.top, overflow: 'hidden' }}>
          <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, top: -space.sheet.top, width: frame.width, height: frame.height }}>
            {body}
          </View>
        </View>
      ) : scrolled ? (
        body
      ) : (
        <View
          ref={viewportRef}
          {...pan.panHandlers}
          style={{ position: 'absolute', left: 0, top: space.sheet.top, width: frame.width, height: frame.height - space.sheet.top, overflow: 'hidden' }}
        >
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute', left: 0, top: -space.sheet.top, width: frame.width, height: contentHeight,
              ...(offset > 0 ? { transform: [{ translateY: -offset }] } : null),
            }}
          >
            {body}
            {firstRunFooter}
          </View>
        </View>
      )}
      <Pressable
        accessibilityRole="button"
        onPress={onAdd}
        style={{
          position: 'absolute',
          left: space.fab.cx - space.fab.diameter / 2,
          top: space.fab.cy - space.fab.diameter / 2,
          width: space.fab.diameter,
          height: space.fab.diameter,
          borderRadius: space.fab.diameter / 2,
          backgroundColor: colors.accent,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.22,
          shadowRadius: 16,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add Task"
          onPress={onAdd}
          style={{ width: 24, height: 24 }}
        >
          <PlusIcon size={24} color="#fff" />
        </Pressable>
      </Pressable>
    </View>
  );
};
