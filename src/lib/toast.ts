export interface ToastItem {
  id: number;
  message: string;
}

type Listener = (toast: ToastItem) => void;

const listeners = new Set<Listener>();
let seq = 0;

export function toast(message: string) {
  const item: ToastItem = { id: ++seq, message };
  for (const listener of listeners) listener(item);
}

export function subscribeToasts(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
