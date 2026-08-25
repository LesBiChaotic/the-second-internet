import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Code, 
  SearchCode, 
  BookmarkPlus, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle,
  Smartphone,
  Monitor
} from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { ForensicMetadata } from '../../types';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
  siteName: string;
  defaultSnapshotYear: number;
  availableSnapshots?: number[];
  forensicData: ForensicMetadata;
  htmlSource: string;
  isReadableMode?: boolean;
  onToggleReadableMode?: () => void;
}

export const ArchiveWrapperBar: React.FC<Props> = ({
  store,
  siteName,
  defaultSnapshotYear,
  availableSnapshots = [1997, 1998, 1999, 2003, 2007, 2011, 2026],
  forensicData,
  htmlSource,
  isReadableMode = false,
  onToggleReadableMode
}) => {
  const { navigate, setForensicDrawer, setSourceModal, pinToCaseboard, snapshotYear, setSnapshotYear } = store;

  const handleReturn = () => {
    soundEngine.playClick(600);
    navigate('DASHBOARD');
  };

  const handleViewSource = () => {
    soundEngine.playClick(850);
    store.discoverAnomaly(`src-${siteName.toLowerCase()}`);
    setSourceModal({
      title: `Source Code: ${siteName} (${snapshotYear || defaultSnapshotYear})`,
      htmlSource
    });
  };

  const handleAnalyze = () => {
    soundEngine.playClick(900);
    store.discoverAnomaly(`anlz-${siteName.toLowerCase()}`);
    setForensicDrawer(forensicData);
  };

  const handlePin = () => {
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'SITE',
      title: `${siteName} (${snapshotYear || defaultSnapshotYear} Snapshot)`,
      preview: forensicData.anomaliesDescription || `Reconstructed corpus from Collection ${forensicData.collection}.`,
      targetView: store.currentView,
      targetId: store.currentSubId,
      connectedTo: []
    });
    alert(`Pinned "${siteName}" to your Personal Caseboard.`);
  };

  return (
    <div className="archive-wrapper-bar">
      <div className="wrapper-nav-left">
        <button type="button" className="wrapper-return-btn" onClick={handleReturn} aria-label="Return to Net History Foundation">
          <ArrowLeft size={14} />
          <span className="hide-on-mobile">RETURN TO FOUNDATION</span>
          <span className="show-on-mobile">EXIT</span>
        </button>

        <span className="wrapper-site-badge">{siteName}</span>

        {/* Snapshot Year Picker */}
        <div className="wrapper-snapshot-picker">
          <Calendar size={13} color="#94a3b8" />
          <select 
            value={snapshotYear || defaultSnapshotYear}
            onChange={(e) => {
              const yr = Number(e.target.value);
              setSnapshotYear(yr);
              soundEngine.playClick(650);
              if (yr > 2026) {
                store.discoverAnomaly('anom-future-snap');
              }
            }}
            style={{
              backgroundColor: 'transparent',
              color: 'var(--nhf-text-primary)',
              border: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {availableSnapshots.map((yr) => (
              <option key={yr} value={yr} style={{ backgroundColor: 'var(--nhf-bg-card)', color: 'var(--nhf-text-primary)' }}>
                {yr} {yr > 2026 ? '(FUTURE)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="wrapper-actions-right">
        {onToggleReadableMode && (
          <button 
            className="btn btn-secondary"
            style={{ padding: '3px 8px', fontSize: '0.75rem' }}
            onClick={onToggleReadableMode}
            title="Toggle between Original 1998 Table Width and Responsive Mobile Reading View"
          >
            {isReadableMode ? <Monitor size={13} /> : <Smartphone size={13} />}
            <span className="hide-on-mobile">
              {isReadableMode ? 'Original View' : 'Readable View'}
            </span>
          </button>
        )}

        <button 
          className="btn btn-secondary"
          style={{ padding: '3px 8px', fontSize: '0.75rem' }}
          onClick={handleViewSource}
          title="Inspect reconstructed HTML and developer comments"
        >
          <Code size={13} />
          <span className="hide-on-mobile">VIEW SOURCE</span>
        </button>

        <button 
          className="btn btn-secondary"
          style={{ padding: '3px 8px', fontSize: '0.75rem' }}
          onClick={handleAnalyze}
          title="Open archaeological forensic metadata drawer"
        >
          <SearchCode size={13} color="#38bdf8" />
          <span style={{ color: '#38bdf8' }} className="hide-on-mobile">ANALYZE</span>
        </button>

        <button 
          className="btn btn-secondary"
          style={{ padding: '3px 8px', fontSize: '0.75rem' }}
          onClick={handlePin}
          title="Pin this page to your evidence board"
        >
          <BookmarkPlus size={13} />
          <span>PIN</span>
        </button>
      </div>
    </div>
  );
};
