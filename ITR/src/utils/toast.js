// Lightweight global toast emitter. The ToastProvider listens for 'app:toast' events.
export const toast = {
  show(message, type = 'info', durationMs = 3000) {
    try {
      window.dispatchEvent(
        new CustomEvent('app:toast', { detail: { message, type, durationMs } })
      );
    } catch (e) {
      // fallback
      console[type === 'error' ? 'error' : 'log'](message);
    }
  },
  success(message, durationMs) { this.show(message, 'success', durationMs); },
  error(message, durationMs) { this.show(message, 'error', durationMs); },
  warning(message, durationMs) { this.show(message, 'warning', durationMs); },
  info(message, durationMs) { this.show(message, 'info', durationMs); }
};


