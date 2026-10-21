import * as React from 'react';
import { PanResponder, PanResponderInstance } from 'react-native';

export const DISMISS_DRAG = 80;

export const useDragDismiss = (onClose?: () => void): { pan: PanResponderInstance; dy: number } => {
  const [dy, setDy] = React.useState(0);
  const closeRef = React.useRef(onClose);
  closeRef.current = onClose;
  const pan = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: (_e, g) => g.dy > 6 && Math.abs(g.dy) > Math.abs(g.dx),
        onPanResponderMove: (_e, g) => setDy(Math.max(0, g.dy)),
        onPanResponderRelease: (_e, g) => {
          setDy(0);
          if (g.dy > DISMISS_DRAG) closeRef.current?.();
        },
        onPanResponderTerminate: () => setDy(0),
      }),
    []
  );
  return { pan, dy };
};
