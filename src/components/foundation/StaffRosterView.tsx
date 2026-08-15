import React from 'react';
import { Users, Mail, ShieldAlert, AlertTriangle, UserCheck } from 'lucide-react';
import { staffRoster } from '../../data/foundationData';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const StaffRosterView: React.FC<Props> = ({ store }) => {
  const { discoverAnomaly } = store;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '4px' }}>
          Foundation Staff & Research Fellows
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--nhf-text-secondary)' }}>
          Directory of active archivists, systems recovery engineers, and oral history interviewers.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {staffRoster.map((staff) => {
          const isMissing = staff.status === 'Missing';
          const isUnverified = staff.status === 'Unverified';
          return (
            <div
              key={staff.id}
              style={{
                background: isMissing || isUnverified ? 'rgba(239, 68, 68, 0.04)' : 'var(--nhf-bg-surface)',
                border: '1px solid',
                borderColor: isMissing || isUnverified ? 'rgba(239, 68, 68, 0.3)' : 'var(--nhf-border)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
              onClick={() => {
                if (isMissing || isUnverified) {
                  soundEngine.playClick(900);
                  discoverAnomaly(`staff-${staff.id}`);
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--nhf-text-primary)' }}>
                    {staff.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 500 }}>
                    {staff.role}
                  </div>
                </div>

                <span className={`badge ${isMissing ? 'badge-red' : isUnverified ? 'badge-amber' : 'badge-green'}`}>
                  {staff.status.toUpperCase()}
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                Department: {staff.department}
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--nhf-text-secondary)', lineHeight: '1.5' }}>
                {staff.bio}
              </p>

              {staff.anomalyNote && (
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '8px 12px', borderRadius: '4px', fontSize: '0.78rem', color: '#fbbf24' }}>
                  ⚠ Internal Audit Flag: {staff.anomalyNote}
                </div>
              )}

              <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--nhf-border)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                <Mail size={13} />
                <span>{staff.email}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
