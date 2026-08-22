import React from 'react';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';

export const NotificationViewport: React.FC<{ store: ArchiveState }> = ({ store }) => (
  <div className="archive-notification-viewport" role="region" aria-label="Archive notifications">
    {store.notifications.map(item => {
      const Icon = item.tone === 'success' ? CheckCircle2 : item.tone === 'warning' ? AlertTriangle : item.tone === 'danger' ? XCircle : Info;
      return (
        <div key={item.id} className={`archive-notification tone-${item.tone}`} role={item.tone === 'danger' ? 'alert' : 'status'}>
          <Icon size={18} aria-hidden="true" />
          <span>{item.message}</span>
          <button type="button" className="icon-button" onClick={() => store.dismissNotification(item.id)} aria-label="Dismiss notification">
            <X size={16} />
          </button>
        </div>
      );
    })}
  </div>
);
