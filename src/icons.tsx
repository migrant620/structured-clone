import * as React from 'react';
import Svg, { Circle, G, Line, Path, Rect } from 'react-native-svg/lib/module/elements';

export type IconProps = { size?: number; color?: string; bg?: string };

export const AlarmIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', bg = '#F49F99' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={12} cy={12.4} r={6.93} fill={color} />
    <Line x1={12} y1={12.4} x2={12} y2={8.6} stroke={bg} strokeWidth={2} strokeLinecap="round" />
    <Line x1={12} y1={12.4} x2={14.9} y2={14.1} stroke={bg} strokeWidth={2} strokeLinecap="round" />
    <Line x1={4.72} y1={5.12} x2={6.72} y2={7.12} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Line x1={19.28} y1={5.12} x2={17.28} y2={7.12} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

export const ChecklistIcon: React.FC<IconProps> = ({ size = 24, color = '#F49F99' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M2.6 6.4 L5 8.9 L9.2 4.2" stroke={color} strokeWidth={2.1} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2.6 15.4 L5 17.9 L9.2 13.2" stroke={color} strokeWidth={2.1} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Line x1={12.4} y1={7.4} x2={17.4} y2={7.4} stroke={color} strokeWidth={2.1} strokeLinecap="round" />
    <Line x1={12.4} y1={16.4} x2={21.4} y2={16.4} stroke={color} strokeWidth={2.1} strokeLinecap="round" />
  </Svg>
);

export const CheckSquareIcon: React.FC<IconProps> = ({ size = 11.4, color = '#8A8A8E' }) => (
  <Svg width={size} height={size * 1.08} viewBox="0 0 24 25.9">
    <Path d="M5.3 0h13.4A5.3 5.3 0 0 1 24 5.3v15.3a5.3 5.3 0 0 1-5.3 5.3H5.3A5.3 5.3 0 0 1 0 20.6V5.3A5.3 5.3 0 0 1 5.3 0z" fill={color} />
    <Path d="M5.6 13.6 9.8 17.8 18.4 7.8" stroke="#fff" strokeWidth={2.7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const PlusCircleIcon: React.FC<IconProps> = ({ size = 24, color = '#F49F99', bg = '#F49F99' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={12} cy={12} r={12} fill={color} />
    <Line x1={6.6} y1={12} x2={17.4} y2={12} stroke={bg} strokeWidth={2.5} strokeLinecap="round" />
    <Line x1={12} y1={6.6} x2={12} y2={17.4} stroke={bg} strokeWidth={2.5} strokeLinecap="round" />
  </Svg>
);

export const TrayIcon: React.FC<IconProps> = ({ size = 26.18, color = '#F49F99', bg = '#EBEBEB' }) => (
  <Svg width={size} height={size} viewBox="0 0 26.18 26.18">
    <Rect x={3.27} y={2.91} width={20.36} height={20.36} rx={1.8} fill={color} />
    <Path d="M5.82 5.45H20.73V15.27H16.73Q13.45 19.53 10.18 15.27H5.82Z" fill={bg} />
    <Rect x={8.0} y={7.27} width={10.91} height={2.2} rx={1.0} fill={color} />
    <Rect x={8.0} y={10.98} width={10.91} height={2.2} rx={1.0} fill={color} />
  </Svg>
);

export const GearIcon: React.FC<IconProps> = ({ size = 24, color = '#F49F99', bg = '#EBEBEB' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <G>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <Rect key={a} x={10.5} y={0.6} width={3} height={5} rx={1.2} fill={color} transform={`rotate(${a} 12 12)`} />
      ))}
    </G>
    <Circle cx={12} cy={12} r={7.9} fill={color} />
    <Circle cx={12} cy={12} r={3.1} fill={bg} />
  </Svg>
);

export const TimerIcon: React.FC<IconProps> = ({ size = 14.18, color = '#8A8A8E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={11.6} cy={13.2} r={8.2} stroke={color} strokeWidth={2} fill="none" />
    <Line x1={11.6} y1={13.2} x2={11.6} y2={8.4} stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1={11.6} y1={13.2} x2={15} y2={15} stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1={18.4} y1={4.4} x2={21.4} y2={7.4} stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const HourglassIcon: React.FC<IconProps> = ({ size = 14.18, color = '#8A8A8E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Rect x={3.7} y={1.3} width={16.4} height={2.3} rx={0.6} fill={color} />
    <Rect x={3.7} y={20.1} width={16.4} height={2.3} rx={0.6} fill={color} />
    <Path
      fillRule="evenodd"
      fill={color}
      d="M5.2 3.6V6.8C5.2 9.6 8 11 10.6 11.5C8 12.2 5.2 13.6 5.2 16.4V20.1H18.6V16.4C18.6 13.6 15.8 12.2 13.2 11.5C15.8 11 18.6 9.6 18.6 6.8V3.6ZM6.9 3.6V6.8C6.9 9 9.4 10.4 11.9 10.4C14.4 10.4 16.9 9 16.9 6.8V3.6Z"
    />
  </Svg>
);

export const RecurringIcon: React.FC<IconProps> = ({ size = 14.18, color = '#8A8A8E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M4 7.2h11.6" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
    <Path d="M13.4 4.2 16.8 7.2 13.4 10.2" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M20 16.8H8.4" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
    <Path d="M10.6 13.8 7.2 16.8 10.6 19.8" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const NotesIcon: React.FC<IconProps> = ({ size = 16, color = '#8A8A8E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Line x1={3.3} y1={7.05} x2={21.3} y2={7.05} stroke={color} strokeWidth={2.2} strokeLinecap="round" />
    <Line x1={3.3} y1={12.5} x2={21.3} y2={12.5} stroke={color} strokeWidth={2.2} strokeLinecap="round" />
    <Line x1={3.3} y1={17.95} x2={15.3} y2={17.95} stroke={color} strokeWidth={2.2} strokeLinecap="round" />
  </Svg>
);

export const CalendarsIcon: React.FC<IconProps> = ({ size = 24, color = '#F49F99' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M3.6 5.6h13.2a2 2 0 0 1 2 2v2.2" stroke={color} strokeWidth={2.1} fill="none" strokeLinecap="round" />
    <Path d="M3.6 5.6a2 2 0 0 0-2 2v10.6a2 2 0 0 0 2 2h5" stroke={color} strokeWidth={2.1} fill="none" strokeLinecap="round" />
    <Line x1={2.2} y1={10.4} x2={18.4} y2={10.4} stroke={color} strokeWidth={2.1} />
    <Path d="M12.4 5.9V2.6M7.4 5.9V2.6" stroke={color} strokeWidth={2.1} strokeLinecap="round" />
    <Path d="M14.6 20.6 21.4 13.8 23 15.4 16.2 22.2 13.9 22.7z" fill={color} />
  </Svg>
);

export const NavInboxIcon: React.FC<IconProps> = ({ size = 24, color = '#828286' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M4.4 3.4h15.2a2.2 2.2 0 0 1 2.2 2.2v12.8a2.2 2.2 0 0 1-2.2 2.2H4.4a2.2 2.2 0 0 1-2.2-2.2V5.6a2.2 2.2 0 0 1 2.2-2.2z"
      stroke={color}
      strokeWidth={2}
      fill="none"
    />
    <Path d="M2.2 13h5.4l1 1.8h6.8l1-1.8h5.4" stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round" />
  </Svg>
);

export const NavTimelineIcon: React.FC<IconProps> = ({ size = 24, color = '#F49F99' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={3.4} cy={5.6} r={2.4} fill={color} />
    <Line x1={9} y1={5.6} x2={16.6} y2={5.6} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    <Circle cx={3.4} cy={12} r={2.4} fill={color} />
    <Line x1={9} y1={12} x2={21.4} y2={12} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    <Circle cx={3.4} cy={18.4} r={2.4} fill={color} />
    <Line x1={9} y1={18.4} x2={16.6} y2={18.4} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
  </Svg>
);

export const NavAiIcon: React.FC<IconProps> = ({ size = 24, color = '#828286' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M10 1.62Q11.3 9.25 18.93 10.55Q11.3 11.85 10 19.48Q8.7 11.85 1.07 10.55Q8.7 9.25 10 1.62Z" stroke={color} strokeWidth={1.45} strokeLinejoin="round" fill="none" />
    <Path d="M18.6 12.72Q19.3 16.75 23.33 17.45Q19.3 18.15 18.6 22.18Q17.9 18.15 13.87 17.45Q17.9 16.75 18.6 12.72Z" stroke={color} strokeWidth={1.45} strokeLinejoin="round" fill="none" />
  </Svg>
);

export const NavSettingsIcon: React.FC<IconProps> = ({ size = 24, color = '#828286', bg = '#F2F2F5' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <G>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <Rect key={a} x={10.5} y={0.6} width={3} height={5} rx={1.2} fill={color} transform={`rotate(${a} 12 12)`} />
      ))}
    </G>
    <Circle cx={12} cy={12} r={7.9} fill={color} />
    <Circle cx={12} cy={12} r={3.1} fill={bg} />
  </Svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Line x1={4.6} y1={12} x2={19.4} y2={12} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    <Line x1={12} y1={4.6} x2={12} y2={19.4} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
  </Svg>
);

export const AtIcon: React.FC<IconProps & { width?: number; height?: number }> = ({
  width = 20,
  height = 20,
  color = '#F49F99',
}) => (
  <Svg width={width} height={height} viewBox="2 2 20 20" preserveAspectRatio="xMidYMid meet" style={{ marginTop: 3.4 }}>
    <Circle cx={12} cy={12} r={4} stroke={color} strokeWidth={2.1} fill="none" />
    <Path
      d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"
      stroke={color}
      strokeWidth={2.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);


export const XIcon: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Line x1={5.6} y1={5.6} x2={18.4} y2={18.4} stroke={color} strokeWidth={2.3} strokeLinecap="round" />
    <Line x1={18.4} y1={5.6} x2={5.6} y2={18.4} stroke={color} strokeWidth={2.3} strokeLinecap="round" />
  </Svg>
);

export const TvIcon: React.FC<IconProps> = ({ size = 24, color = '#F49F99' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Line x1={7.4} y1={2.4} x2={11} y2={6.6} stroke={color} strokeWidth={2.1} strokeLinecap="round" />
    <Line x1={16.6} y1={2.4} x2={13} y2={6.6} stroke={color} strokeWidth={2.1} strokeLinecap="round" />
    <Rect x={2.6} y={6.2} width={18.8} height={14.4} rx={3.4} fill={color} />
    <Rect x={6.4} y={9.8} width={11.2} height={7.2} rx={1.4} fill="#fff" />
  </Svg>
);

export const Person2Icon: React.FC<IconProps> = ({ size = 24, color = '#F49F99' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={8.6} cy={7.6} r={3.6} fill={color} />
    <Path d="M2.4 19c0-3.6 2.8-6.2 6.2-6.2s6.2 2.6 6.2 6.2v.6H2.4z" fill={color} />
    <Circle cx={16.4} cy={8.4} r={2.9} fill={color} />
    <Path d="M15.4 12.6c3 .2 6.2 2.4 6.2 5.9v.5h-5" fill={color} />
  </Svg>
);

export const RunIcon: React.FC<IconProps> = ({ size = 24, color = '#F49F99' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={14.4} cy={4.2} r={2.3} fill={color} />
    <Path
      d="M13.6 8.2 9.4 10.4l-1.6 3.4M13.6 8.2l3 1.6 2.6-.8M13.6 8.2l-.8 5 3.4 3 1 4.4M12.8 13.2l-3.6 2.4-2.8 4"
      stroke={color}
      strokeWidth={2.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const TrashIcon: React.FC<IconProps> = ({ size = 18.19, color = '#F49F99', bg = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 18.19 18.19">
    <Rect x={6.55} y={1.82} width={5.09} height={1.2} rx={0.3} fill={color} />
    <Rect x={2.55} y={2.55} width={13.45} height={1.45} rx={0.3} fill={color} />
    <Path d="M3.27 3.9h11.64v11.36a1.1 1.1 0 0 1-1.1 1.1H4.37a1.1 1.1 0 0 1-1.1-1.1z" fill={color} />
    <Rect x={6.91} y={5.45} width={1.09} height={7.64} rx={0.5} fill={bg} />
    <Rect x={10.18} y={5.45} width={1.09} height={7.64} rx={0.5} fill={bg} />
  </Svg>
);

export const DuplicateIcon: React.FC<IconProps> = ({ size = 24, color = '#F49F99' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M8 3h7.2L20 7.8V16a1.6 1.6 0 0 1-1.6 1.6H8A1.6 1.6 0 0 1 6.4 16V4.6A1.6 1.6 0 0 1 8 3z" fill={color} />
    <Path d="M4.6 7.4h1.4v12.8h9.6v1.4a1.4 1.4 0 0 1-1.4 1.4H4.6A1.4 1.4 0 0 1 3.2 21.6V8.8a1.4 1.4 0 0 1 1.4-1.4z" fill={color} />
  </Svg>
);

export const CheckCircleFillIcon: React.FC<IconProps> = ({ size = 24, color = '#F49F99' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={12} cy={12} r={10.4} fill={color} />
    <Path d="M7.4 12.4l3 3 6-6.2" stroke="#fff" strokeWidth={2.3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const IncompleteIcon: React.FC<IconProps> = ({ size = 18.19, color = '#F49F99', bg = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 18.19 18.19">
    <Circle cx={9.1} cy={9.09} r={7.64} fill={color} />
    <Path d="M5.4 8.9L7.7 11.3L12.1 6.7" stroke={bg} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <Line x1={2.1} y1={1.08} x2={16.92} y2={15.88} stroke={bg} strokeWidth={1.3} strokeLinecap="round" />
    <Line x1={1.2} y1={2.0} x2={16.0} y2={16.8} stroke={color} strokeWidth={1.3} strokeLinecap="round" />
  </Svg>
);

export const PencilIcon: React.FC<IconProps> = ({ size = 24, color = '#F49F99' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M4 20l1-4.2L16.4 4.4a1.9 1.9 0 0 1 2.7 0l1.5 1.5a1.9 1.9 0 0 1 0 2.7L9.2 20z" fill={color} />
  </Svg>
);

export const CalendarSmallIcon: React.FC<IconProps> = ({ size = 20, color = '#F49F99' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M4.4 5h15.2A1.8 1.8 0 0 1 21.4 6.8v13.4a1.8 1.8 0 0 1-1.8 1.8H4.4a1.8 1.8 0 0 1-1.8-1.8V6.8A1.8 1.8 0 0 1 4.4 5z"
      fill={color}
    />
    <Rect x={2.6} y={9.4} width={18.8} height={1.9} fill="#fff" />
    <Rect x={6.8} y={2.6} width={1.9} height={4.2} rx={0.9} fill={color} />
    <Rect x={15.3} y={2.6} width={1.9} height={4.2} rx={0.9} fill={color} />
  </Svg>
);

export const InboxFillIcon: React.FC<IconProps> = ({ size = 48, color = '#F49F99' }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48">
    <Path
      d="M8 8h32a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z"
      fill={color}
    />
    <Path
      d="M4 26h10.6l2.2 3.8h14.4l2.2-3.8H44v10a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"
      fill="#fff"
    />
  </Svg>
);

export const ProBadgeIcon: React.FC<IconProps> = ({ size = 62, color = '#F49F99' }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48">
    <Circle cx={24} cy={19} r={11.5} fill="#E8837C" />
    <Circle cx={24} cy={19} r={7.6} fill={color} />
    <Circle cx={21.4} cy={17.4} r={2.6} fill="#fff" />
    <Circle cx={26.8} cy={17.6} r={1.6} fill="#fff" />
    <Circle cx={23.6} cy={21.4} r={1.6} fill="#fff" />
    <Path d="M17 27.5 13.4 38l5-2 2.6 4.6 3.4-10.5z" fill="#3E6DA8" />
    <Path d="M31 27.5 34.6 38l-5-2-2.6 4.6L23.6 30z" fill="#3E6DA8" />
    <Path d="M20 28.6l2 8.6 2-8.6z" fill="#E8837C" />
  </Svg>
);

export const CloudCheckIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M7 18.5a4.5 4.5 0 0 1-.6-8.96 6 6 0 0 1 11.6 1.4 3.8 3.8 0 0 1-.9 7.5z"
      fill={color}
    />
    <Path d="M9.4 13.2l2 2 3.6-3.8" stroke="#F49F99" strokeWidth={1.9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BellSquareIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 3.4c-3.2 0-5.4 2.4-5.4 5.6v3.4l-1.7 3a.9.9 0 0 0 .8 1.4h12.6a.9.9 0 0 0 .8-1.4l-1.7-3V9c0-3.2-2.2-5.6-5.4-5.6z"
      fill={color}
    />
    <Path d="M9.8 18.6a2.3 2.3 0 0 0 4.4 0z" fill={color} />
  </Svg>
);

export const BrushIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M20.6 3.4c-4 .8-8.6 4.4-11 7.6l3.4 3.4c3.2-2.4 6.8-7 7.6-11z" fill={color} />
    <Path d="M8.6 12.4c-2.2.4-3.8 2.2-3.8 4.6 0 1.6-1.2 2.4-2.8 2.4 1.2 1.4 2.8 2 4.4 2 2.6 0 4.6-2 4.6-4.4 0-.8-.2-1.6-.8-2.2z" fill={color} />
  </Svg>
);

export const CogsIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <G>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <Rect key={a} x={10.9} y={0.8} width={2.2} height={3.4} rx={0.9} fill={color} transform={`rotate(${a} 12 8)`} />
      ))}
    </G>
    <Circle cx={12} cy={8} r={4.6} fill={color} />
    <Circle cx={12} cy={8} r={1.7} fill="#6185A8" />
    <G>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <Rect key={a} x={16.1} y={12.4} width={1.9} height={3} rx={0.8} fill={color} transform={`rotate(${a} 17 16)`} />
      ))}
    </G>
    <Circle cx={17} cy={16} r={3.9} fill={color} />
    <Circle cx={17} cy={16} r={1.4} fill="#6185A8" />
  </Svg>
);

export const BoltIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M13.4 2 5.6 13.4h5L10.2 22l8.2-11.8h-5.2z" fill={color} />
  </Svg>
);

export const CalendarFillIcon: React.FC<IconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M4.4 5h15.2A1.8 1.8 0 0 1 21.4 6.8v13.4a1.8 1.8 0 0 1-1.8 1.8H4.4a1.8 1.8 0 0 1-1.8-1.8V6.8A1.8 1.8 0 0 1 4.4 5z"
      fill={color}
    />
    <Rect x={2.6} y={9.4} width={18.8} height={1.9} fill="#974767" />
    <Rect x={6.8} y={2.6} width={1.9} height={4.2} rx={0.9} fill={color} />
    <Rect x={15.3} y={2.6} width={1.9} height={4.2} rx={0.9} fill={color} />
  </Svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 16, color = '#C6C6C8' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M9 5.4 15.6 12 9 18.6" stroke={color} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const StarIcon: React.FC<IconProps> = ({ size = 10, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 2.6l2.9 5.9 6.5 1-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.1 1.1-6.5L2.6 9.5l6.5-1z"
      fill={color}
    />
  </Svg>
);

