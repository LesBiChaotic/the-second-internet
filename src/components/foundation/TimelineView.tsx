import React, { useState } from 'react';
import { Clock, ShieldAlert, BookmarkPlus, ArrowRight, Calendar, Layers } from 'lucide-react';
import { timelineData } from '../../data/timelineData';
import { TimelineEvent } from '../../types';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const TimelineView: React.FC<Props> = ({ store }) => {
  const { navigate, pinToCaseboard, discoverAnomaly } = store;
  const [selectedEra, setSelectedEra] = useState<string>('ALL');

  const eras = [
    'ALL',
    'Pre-Web',
    'Early Web (1994-1999)',
    'Consolidation (2000-2005)',
    'Social Web (2006-2012)',
    'Modern Archive (2013-Present)',
    'Future Horizon'
  ];

  const filteredEvents = timelineData.filter((ev) => {
    if (selectedEra === 'ALL') return true;
    return ev.era === selectedEra;
  });

  const handlePin = (ev: TimelineEvent) => {
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: ev.isAnomalous ? 'ANOMALY' : 'INCIDENT',
      title: `${ev.year}: ${ev.title}`,
      preview: ev.summary,
      targetView: 'TIMELINE',
      targetId: ev.id,
      connectedTo: []
    });
    alert(`Pinned "${ev.title}" to Caseboard.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '6px' }}>
          Universal Communicative Timeline (1877–2031)
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--nhf-text-secondary)', maxWidth: '750px' }}>
          Chronology of telecommunications milestones, physical network infrastructure, societal crises, and unindexed temporal anomalies.
        </p>
      </div>

      {/* Era Selectors */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {eras.map((era) => (
          <button
            key={era}
            className="btn btn-secondary"
            style={{
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              borderColor: selectedEra === era ? 'var(--nhf-accent-blue)' : 'var(--nhf-border)',
              color: selectedEra === era ? '#60a5fa' : 'var(--nhf-text-muted)',
              background: selectedEra === era ? 'rgba(59, 130, 246, 0.15)' : 'var(--nhf-bg-surface)'
            }}
            onClick={() => {
              soundEngine.playClick(600);
              setSelectedEra(era);
              if (era === 'Future Horizon') {
                discoverAnomaly('tl-future-era');
              }
            }}
          >
            {era}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
        {filteredEvents.map((ev, idx) => {
          return (
            <div
              key={ev.id}
              style={{
                background: ev.isAnomalous ? 'rgba(239, 68, 68, 0.04)' : 'var(--nhf-bg-surface)',
                border: '1px solid',
                borderColor: ev.isAnomalous ? 'rgba(239, 68, 68, 0.25)' : 'var(--nhf-border)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'border-color 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: ev.isAnomalous ? '#f87171' : '#38bdf8'
                  }}>
                    {ev.year}
                  </span>
                  <span className="badge badge-gray">{ev.dateStr}</span>
                  <span className={`badge ${ev.isAnomalous ? 'badge-red' : 'badge-blue'}`}>
                    {ev.category}
                  </span>
                </div>

                <button
                  className="btn btn-secondary"
                  style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                  onClick={() => handlePin(ev)}
                >
                  <BookmarkPlus size={13} />
                  <span>Pin</span>
                </button>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--nhf-text-primary)', marginBottom: '6px' }}>
                  {ev.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--nhf-text-secondary)', lineHeight: '1.5', marginBottom: '8px' }}>
                  {ev.summary}
                </p>
                <div style={{ background: 'var(--nhf-bg-card)', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--nhf-border)', fontSize: '0.82rem', color: 'var(--nhf-text-muted)', lineHeight: '1.6' }}>
                  {ev.details}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
