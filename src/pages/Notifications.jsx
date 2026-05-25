import { useNotification } from '../context/NotificationContext';

export default function Notifications() {
  const { notifications, setNotifications } = useNotification();

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black dark:text-white" style={{ color: 'var(--primary)' }}>🔔 Notifications</h2>
        {notifications.length > 0 && (
          <button onClick={() => setNotifications([])}
            className="text-sm px-3 py-1 rounded-lg" style={{ background: 'var(--accent)', color: 'var(--secondary)' }}>
            Clear all
          </button>
        )}
      </div>
      {notifications.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">🔕</p>
          <p>No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border shadow-sm"
              style={{ background: 'var(--card-bg,#fff)', borderColor: 'var(--border,#e5e7eb)' }}>
              <span className="text-2xl">{n.type === 'like' ? '❤️' : '💬'}</span>
              <p className="text-sm dark:text-white">{n.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}