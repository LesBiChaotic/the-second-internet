import React, { useState } from 'react';
import { Layers, Lock, ShieldAlert, ArrowRight, CheckCircle2, Search, ExternalLink } from 'lucide-react';
import { foundationCollections } from '../../data/foundationData';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const CollectionsView: React.FC<Props> = ({ store }) => {
  const { navigate, clearanceLevel, discoverAnomaly } = store;
  const [filterTag, setFilterTag] = useState<string>('ALL');

  const allTags = ['ALL', 'BBS', 'Webrings', 'Folklore', 'ISP', 'Message Boards', 'Blogging', 'Social Graph', 'Second Internet'];

  const filtered = foundationCollections.filter((col) => {
    if (filterTag === 'ALL') return true;
    return col.tags.some(t => t.toLowerCase().includes(filterTag.toLowerCase()));
  });

  const handleOpenCollection = (colId: string) => {
    soundEngine.playClick(750);
    if (colId === 'col-04') navigate('SITE_MARROW');
    else if (colId === 'col-07') navigate('SITE_CANDLEROOM');
    else if (colId === 'col-09') navigate('SITE_GREYLINE');
    else if (colId === 'col-11') navigate('SITE_AFTERHOURS');
    else if (colId === 'col-13') navigate('SITE_BLUEWINDOW');
    else if (colId === 'col-15') navigate('SITE_PALISADE');
    else if (colId === 'col-17') {
      discoverAnomaly('col-17-click');
      navigate('RESTRICTED_VAULT');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '6px' }}>
            Curated Archival Collections
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--nhf-text-secondary)', maxWidth: '700px' }}>
            Catalog of primary digital collections preserved in the Net History Foundation repository. Each collection contains ingested databases, reconstructed assets, and forensic audit logs.
          </p>
        </div>
      </div>

      {/* Filter Tag Bar */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {allTags.map((tag) => (
          <button
            key={tag}
            className="btn btn-secondary"
            style={{
              padding: '4px 12px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              borderColor: filterTag === tag ? 'var(--nhf-accent-blue)' : 'var(--nhf-border)',
              color: filterTag === tag ? '#60a5fa' : 'var(--nhf-text-muted)',
              background: filterTag === tag ? 'rgba(59, 130, 246, 0.15)' : 'var(--nhf-bg-surface)'
            }}
            onClick={() => {
              soundEngine.playClick(600);
              setFilterTag(tag);
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Collections Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {filtered.map((col) => {
          const isQuarantined = col.status === 'Quarantined';
          return (
            <div
              key={col.id}
              style={{
                background: isQuarantined ? 'rgba(239, 68, 68, 0.05)' : 'var(--nhf-bg-surface)',
                border: '1px solid',
                borderColor: isQuarantined ? 'rgba(239, 68, 68, 0.3)' : 'var(--nhf-border)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onClick={() => handleOpenCollection(col.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = isQuarantined ? '#ef4444' : 'var(--nhf-border-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = isQuarantined ? 'rgba(239, 68, 68, 0.3)' : 'var(--nhf-border)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={`badge ${isQuarantined ? 'badge-red' : 'badge-blue'}`}>
                  {col.code}
                </span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-text-muted)' }}>
                  {col.yearSpan}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: isQuarantined ? 'var(--nhf-accent-crimson)' : 'var(--nhf-text-primary)', marginBottom: '6px' }}>
                  {col.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--nhf-text-secondary)', lineHeight: '1.5' }}>
                  {col.description}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {col.tags.map((t) => (
                  <span key={t} style={{ fontSize: '0.7rem', color: 'var(--nhf-text-muted)', background: 'var(--nhf-bg-card)', padding: '2px 6px', borderRadius: '3px' }}>
                    #{t}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--nhf-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ color: 'var(--nhf-text-muted)' }}>
                  {col.itemCount.toLocaleString()} items
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: isQuarantined ? '#f87171' : '#60a5fa', fontWeight: 500 }}>
                  {isQuarantined ? <Lock size={13} /> : <ExternalLink size={13} />}
                  <span>{isQuarantined ? 'Restricted Access' : 'Explore Corpus'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
