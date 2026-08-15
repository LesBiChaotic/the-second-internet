import React from 'react';
import { X, ShieldAlert, CheckCircle2, BookmarkPlus, Hash, Calendar, User, Database, Link2 } from 'lucide-react';
import { ForensicMetadata } from '../../types';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  metadata: ForensicMetadata | null;
  onClose: () => void;
  onPin: (meta: ForensicMetadata) => void;
}

export const ForensicAnalyzerDrawer: React.FC<Props> = ({ metadata, onClose, onPin }) => {
  if (!metadata) return null;

  return (
    <div className={`forensic-drawer ${metadata ? 'open' : ''}`}>
      {/* Header */}
      <div className="modal-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={18} color="var(--nhf-accent-blue)" />
          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--nhf-text-primary)' }}>
            ARCHAEOLOGICAL FORENSICS
          </span>
        </div>
        <button 
          className="btn btn-secondary" 
          style={{ padding: '4px 6px' }}
          onClick={() => {
            soundEngine.playClick(500);
            onClose();
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Object ID & Collection */}
        <div style={{ background: 'var(--nhf-bg-card)', padding: '12px', borderRadius: '6px', border: '1px solid var(--nhf-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--nhf-text-muted)', marginBottom: '4px' }}>
            <Hash size={12} />
            <span>OBJECT ID</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--nhf-accent-blue)', fontSize: '0.95rem' }}>
            {metadata.objectId}
          </div>
        </div>

        {/* Core Metadata Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ background: 'var(--nhf-bg-card)', padding: '10px', borderRadius: '6px', border: '1px solid var(--nhf-border)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--nhf-text-muted)', display: 'block' }}>COLLECTION</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--nhf-text-primary)' }}>{metadata.collection}</span>
          </div>

          <div style={{ background: 'var(--nhf-bg-card)', padding: '10px', borderRadius: '6px', border: '1px solid var(--nhf-border)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--nhf-text-muted)', display: 'block' }}>RECORD TYPE</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--nhf-text-primary)' }}>{metadata.type}</span>
          </div>

          <div style={{ background: 'var(--nhf-bg-card)', padding: '10px', borderRadius: '6px', border: '1px solid var(--nhf-border)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--nhf-text-muted)', display: 'block' }}>AUTHOR / PEER</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--nhf-text-primary)' }}>{metadata.author}</span>
          </div>

          <div style={{ background: 'var(--nhf-bg-card)', padding: '10px', borderRadius: '6px', border: '1px solid var(--nhf-border)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--nhf-text-muted)', display: 'block' }}>FIRST OBSERVED</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--nhf-text-primary)' }}>{metadata.observedDate}</span>
          </div>
        </div>

        {/* Confidence & Integrity */}
        <div style={{ background: 'var(--nhf-bg-card)', padding: '12px', borderRadius: '6px', border: '1px solid var(--nhf-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.78rem' }}>
            <span style={{ color: 'var(--nhf-text-secondary)' }}>ARCHIVE CONFIDENCE</span>
            <span style={{ fontWeight: 600, color: metadata.archiveConfidence > 80 ? 'var(--nhf-accent-emerald)' : 'var(--nhf-accent-amber)' }}>
              {metadata.archiveConfidence}%
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'var(--nhf-border)', borderRadius: '3px', overflow: 'hidden' }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${metadata.archiveConfidence}%`, 
                backgroundColor: metadata.archiveConfidence > 80 ? '#10b981' : '#f59e0b' 
              }} 
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.75rem', color: 'var(--nhf-text-muted)' }}>
            <span>Integrity: {metadata.integrity}</span>
            <span>Known Copies: {metadata.knownCopies}</span>
          </div>
        </div>

        {/* Anomalies Box */}
        {metadata.anomaliesCount > 0 ? (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--nhf-accent-crimson)', fontWeight: 600, fontSize: '0.82rem', marginBottom: '6px' }}>
              <ShieldAlert size={14} />
              <span>{metadata.anomaliesCount} ANOMALOUS PROPERTIES DETECTED</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--nhf-text-secondary)', lineHeight: '1.4' }}>
              {metadata.anomaliesDescription}
            </div>
          </div>
        ) : (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--nhf-accent-emerald)', fontSize: '0.8rem' }}>
            <CheckCircle2 size={14} />
            <span>Standard Archaeological Record — No topological drift.</span>
          </div>
        )}

        <button 
          className="btn btn-secondary" 
          style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}
          onClick={() => {
            soundEngine.playClick(1000);
            onPin(metadata);
          }}
        >
          <BookmarkPlus size={14} />
          <span>Pin to Forensic Caseboard</span>
        </button>
      </div>
    </div>
  );
};
