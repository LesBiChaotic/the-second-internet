import React, { useState } from 'react';
import { BookmarkCheck, Plus, Trash2, Link2, ExternalLink, ShieldAlert, Sparkles } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { CaseboardPin } from '../../types';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const CaseboardView: React.FC<Props> = ({ store }) => {
  const { caseboardPins, removeCaseboardPin, connectCaseboardPins, navigate, pinToCaseboard } = store;
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteText, setNewNoteText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;
    soundEngine.playClick(900);
    pinToCaseboard({
      type: 'TECH',
      title: newNoteTitle.trim(),
      preview: newNoteText.trim() || 'Custom hypothesis recorded by researcher.',
      targetView: 'CASEBOARD',
      connectedTo: []
    });
    setNewNoteTitle('');
    setNewNoteText('');
    setShowAddModal(false);
  };

  const handleConnect = (pinId: string) => {
    soundEngine.playClick(800);
    if (!connectingFrom) {
      setConnectingFrom(pinId);
    } else {
      if (connectingFrom !== pinId) {
        connectCaseboardPins(connectingFrom, pinId);
        soundEngine.playClick(1100);
      }
      setConnectingFrom(null);
    }
  };

  return (
    <div className="caseboard-container forensic-route evidence-wall-route">
      {/* Header */}
      <div className="caseboard-header">
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '4px' }}>
            Personal Forensic Caseboard
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--nhf-text-secondary)' }}>
            Pinned evidence artifacts, cross-platform entity links, and researcher deduction notes.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} />
            <span>Add Research Note</span>
          </button>
        </div>
      </div>

      {connectingFrom && (
        <div style={{ background: 'rgba(59, 130, 246, 0.15)', border: '1px solid var(--nhf-accent-blue)', padding: '10px 16px', borderRadius: '4px', fontSize: '0.85rem', color: '#93c5fd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Click any second pin to create an evidence connection line.</span>
          <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '0.75rem' }} onClick={() => setConnectingFrom(null)}>
            Cancel
          </button>
        </div>
      )}

      {/* Grid of Pinned Cards */}
      <div className="caseboard-grid">
        {caseboardPins.map((pin) => {
          const isConnecting = connectingFrom === pin.id;
          return (
            <div 
              key={pin.id} 
              className="caseboard-card"
              style={{
                borderColor: isConnecting ? '#38bdf8' : undefined,
                boxShadow: isConnecting ? '0 0 12px rgba(56, 189, 248, 0.4)' : undefined
              }}
            >
              <div className="pin-badge"></div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="badge badge-gray" style={{ fontSize: '0.65rem' }}>{pin.type}</span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {pin.timestamp}
                  </span>
                </div>

                <div className="pin-title">{pin.title}</div>
                <div className="pin-preview" style={{ marginTop: '6px' }}>{pin.preview}</div>

                {pin.userNotes && (
                  <div style={{ marginTop: '8px', padding: '6px 10px', background: 'var(--nhf-bg-card)', borderRadius: '4px', fontStyle: 'italic', fontSize: '0.78rem', color: '#fbbf24', borderLeft: '2px solid #fbbf24' }}>
                    Note: {pin.userNotes}
                  </div>
                )}
              </div>

              {/* Connections list */}
              {pin.connectedTo.length > 0 && (
                <div className="pin-connections">
                  <Link2 size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  <span>Linked to {pin.connectedTo.length} other artifact{pin.connectedTo.length > 1 ? 's' : ''}</span>
                </div>
              )}

              {/* Card Footer Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--nhf-border)', paddingTop: '10px' }}>
                <button
                  className="btn btn-secondary"
                  style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                  onClick={() => handleConnect(pin.id)}
                  title="Connect with another pin"
                >
                  <Link2 size={13} color={isConnecting ? '#38bdf8' : undefined} />
                  <span>{isConnecting ? 'Linking...' : 'Connect'}</span>
                </button>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {pin.targetView !== 'CASEBOARD' && (
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '3px 6px' }}
                      onClick={() => {
                        soundEngine.playClick(750);
                        navigate(pin.targetView, pin.targetId);
                      }}
                      title="Jump to source record"
                    >
                      <ExternalLink size={13} />
                    </button>
                  )}

                  <button
                    className="btn btn-danger"
                    style={{ padding: '3px 6px' }}
                    onClick={() => {
                      soundEngine.playClick(500);
                      removeCaseboardPin(pin.id);
                    }}
                    title="Remove from board"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Note Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span style={{ fontWeight: 600 }}>Record Evidence Hypothesis</span>
              <button className="btn btn-secondary" style={{ padding: '4px 6px' }} onClick={() => setShowAddModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleAddCustomNote} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--nhf-text-muted)', display: 'block', marginBottom: '4px' }}>
                  HYPOTHESIS TITLE
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. October 14 Telecom Window 23-Year Cycle"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--nhf-bg-primary)',
                    border: '1px solid var(--nhf-border)',
                    borderRadius: '6px',
                    color: 'var(--nhf-text-primary)'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--nhf-text-muted)', display: 'block', marginBottom: '4px' }}>
                  RESEARCH DEDUCTION & EVIDENCE
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g. 1877 telegraph + 1933 phone exchange + 2003 routing event indicate cyclical harmonic resonance..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--nhf-bg-primary)',
                    border: '1px solid var(--nhf-border)',
                    borderRadius: '6px',
                    color: 'var(--nhf-text-primary)',
                    fontFamily: 'var(--font-sans)',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '6px' }}>
                Pin Hypothesis to Board
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
