import React, { useState } from 'react';
import { Users, User, ShieldAlert, ArrowRight, BookmarkPlus, Calendar, Globe, AlertTriangle, ZoomIn, X } from 'lucide-react';
import { charactersData } from '../../data/charactersData';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const PeopleView: React.FC<Props> = ({ store }) => {
  const { currentSubId, navigate, pinToCaseboard, discoverAnomaly } = store;
  const [selectedCharId, setSelectedCharId] = useState<string>(currentSubId || charactersData[0].id);
  const [zoomedAvatar, setZoomedAvatar] = useState<string | null>(null);

  const selectedChar = charactersData.find(c => c.id === selectedCharId) || charactersData[0];

  const handleSelect = (id: string) => {
    soundEngine.playClick(650);
    setSelectedCharId(id);
    if (id === 'char-wintermute42' || id === 'char-rowan-glass') {
      discoverAnomaly(`char-inspect-${id}`);
    }
  };

  const handlePin = () => {
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'PERSON',
      title: `${selectedChar.canonicalName} (${selectedChar.aliases.map(a => a.handle).join(', ')})`,
      preview: selectedChar.biography.slice(0, 160) + '...',
      targetView: 'PEOPLE',
      targetId: selectedChar.id,
      connectedTo: []
    });
    alert(`Pinned ${selectedChar.canonicalName} to Caseboard.`);
  };

  return (
    <div className="people-registry-route institutional-route" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="institutional-route-heading">
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '6px' }}>
          Historical Personae, Photographic Scans & Entity Directory
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--nhf-text-secondary)', maxWidth: '720px' }}>
          Reconstructed cross-platform identity database with archival polaroids and photographs. Tracks individual handles, aliases, and behavioral cadences across decades of online activity.
        </p>
      </div>

      {/* Main Split Layout: Left Roster, Right Dossier */}
      <div className="responsive-grid-sidebar biographical-registry" style={{ minHeight: '600px' }}>
        {/* Left Character List */}
        <div className="registry-index" style={{
          background: 'var(--nhf-bg-surface)',
          border: '1px solid var(--nhf-border)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxHeight: '750px',
          overflowY: 'auto'
        }}>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
            Cataloged Entities ({charactersData.length})
          </div>

          {charactersData.map((c) => {
            const isSelected = c.id === selectedCharId;
            return (
              <div
                key={c.id}
                onClick={() => handleSelect(c.id)}
                style={{
                  background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'var(--nhf-bg-card)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--nhf-accent-blue)' : 'var(--nhf-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                {c.avatarUrl ? (
                  <img 
                    src={c.avatarUrl} 
                    alt={c.canonicalName} 
                    style={{ width: '38px', height: '38px', borderRadius: '4px', objectFit: 'cover', border: '1px solid var(--nhf-border)' }}
                  />
                ) : (
                  <div style={{ width: '38px', height: '38px', borderRadius: '4px', background: 'var(--nhf-bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                    <User size={18} />
                  </div>
                )}

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: isSelected ? 'var(--nhf-accent-blue)' : 'var(--nhf-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {c.canonicalName}
                    </span>
                    {c.status === 'Impossible' && (
                      <span className="badge badge-red" style={{ fontSize: '0.62rem' }}>
                        IMPOSSIBLE
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {c.aliases.map(a => a.handle).slice(0, 2).join(' / ')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Dossier Detail */}
        <div className="registry-dossier" style={{
          background: 'var(--nhf-bg-surface)',
          border: '1px solid var(--nhf-border)',
          borderRadius: 'var(--radius-md)',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--nhf-text-primary)' }}>
                  {selectedChar.canonicalName}
                </h2>
                <span className={`badge ${selectedChar.status === 'Impossible' ? 'badge-red' : selectedChar.status === 'Disappeared' ? 'badge-amber' : 'badge-green'}`}>
                  STATUS: {selectedChar.status.toUpperCase()}
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                Observed Active Span: {selectedChar.firstSeen} → {selectedChar.lastSeen}
              </div>
            </div>

            <button 
              className="btn btn-secondary"
              onClick={handlePin}
            >
              <BookmarkPlus size={14} />
              <span>Pin to Caseboard</span>
            </button>
          </div>

          {/* Photographic Evidence Exhibit if Present */}
          {selectedChar.avatarUrl && (
            <div style={{
              background: 'var(--nhf-bg-card)',
              border: '1px solid var(--nhf-border)',
              borderRadius: '6px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              cursor: 'pointer'
            }} onClick={() => setZoomedAvatar(selectedChar.avatarUrl || null)}>
              <img
                src={selectedChar.avatarUrl}
                alt={selectedChar.canonicalName}
                style={{
                  width: '140px',
                  height: '140px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  border: '2px solid #3e485a',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#38bdf8', fontWeight: 600, marginBottom: '4px' }}>
                  RECOVERED PHOTOGRAPHIC ARTIFACT
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--nhf-text-secondary)', lineHeight: '1.5' }}>
                  Archival photograph associated with entity session logs. Click to view full high-resolution scan.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#60a5fa', fontSize: '0.78rem', marginTop: '8px' }}>
                  <ZoomIn size={14} />
                  <span>Enlarge Scan</span>
                </div>
              </div>
            </div>
          )}

          {/* Cross-Platform Aliases Timeline */}
          <div>
            <h4 style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
              Known Cross-Platform Aliases & Eras
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
              {selectedChar.aliases.map((a, idx) => (
                <div key={idx} style={{ background: 'var(--nhf-bg-card)', padding: '10px 12px', borderRadius: '4px', border: '1px solid var(--nhf-border)' }}>
                  <div style={{ fontSize: '0.7rem', color: '#60a5fa', fontFamily: 'var(--font-mono)' }}>{a.platform}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--nhf-text-primary)' }}>{a.handle}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--nhf-text-muted)' }}>{a.era}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Biography */}
          <div>
            <h4 style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Archival Biographical Profile
            </h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--nhf-text-secondary)', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
              {selectedChar.biography}
            </p>
          </div>

          {/* Forensic Contradictions */}
          {selectedChar.contradictions.length > 0 && (
            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '6px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>
                <ShieldAlert size={16} />
                <span>FORENSIC CONTRADICTIONS & TIMELINE ANOMALIES</span>
              </div>
              <ul style={{ paddingLeft: '20px', fontSize: '0.82rem', color: '#fca5a5', lineHeight: '1.6' }}>
                {selectedChar.contradictions.map((ct, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{ct}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomedAvatar && (
        <div className="modal-backdrop" onClick={() => setZoomedAvatar(null)}>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomedAvatar(null)}
              style={{
                position: 'absolute',
                top: '-36px',
                right: '0',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#fff',
                padding: '6px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
            <img
              src={zoomedAvatar}
              alt="Enlarged Character Scan"
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                borderRadius: '8px',
                boxShadow: '0 0 30px rgba(0,0,0,0.9)',
                border: '1px solid #444',
                display: 'block'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
