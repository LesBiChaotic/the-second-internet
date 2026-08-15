import React, { useState } from 'react';
import { FileSearch, ShieldAlert, BookmarkPlus, Hash, FileText, Image as ImageIcon, ZoomIn, X, BookOpen } from 'lucide-react';
import { physicalDocsData } from '../../data/physicalDocsData';
import { PhysicalDoc } from '../../types';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const PhysicalDocsView: React.FC<Props> = ({ store }) => {
  const { currentSubId, pinToCaseboard, discoverAnomaly } = store;
  const [selectedDocId, setSelectedDocId] = useState<string>(currentSubId || physicalDocsData[0].id);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const selectedDoc = physicalDocsData.find(d => d.id === selectedDocId) || physicalDocsData[0];

  const handleSelect = (doc: PhysicalDoc) => {
    soundEngine.playClick(650);
    setSelectedDocId(doc.id);
    if (doc.isAnomalous) {
      discoverAnomaly(`phys-doc-${doc.id}`);
    }
  };

  const handlePin = () => {
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'DOCUMENT',
      title: `Physical Scan: ${selectedDoc.title}`,
      preview: `Provenance: ${selectedDoc.provenance} | Classification: ${selectedDoc.classification}`,
      targetView: 'PHYSICAL_DOCS',
      targetId: selectedDoc.id,
      connectedTo: []
    });
    alert(`Pinned physical scan "${selectedDoc.title}" to Caseboard.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '4px' }}>
            Physical Artifacts, Scanned Photographs & Police Records
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--nhf-text-secondary)' }}>
            High-resolution optical digitizations of real-world physical evidence: 1990s server room photographs, crime scene documentation, urgent faxes, and paper telegraph spools.
          </p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => {
            soundEngine.playClick(750);
            store.navigate('NOTEBOOK');
          }}
          style={{
            borderColor: '#f59e0b',
            color: 'var(--nhf-accent-amber)',
            background: 'rgba(245, 158, 11, 0.08)',
            padding: '8px 16px'
          }}
        >
          <BookOpen size={16} />
          <span>Open Dr. Van Houten's Field Journal</span>
        </button>
      </div>

      <div className="responsive-grid-sidebar" style={{ minHeight: '650px' }}>
        {/* Document List */}
        <div style={{
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
          {physicalDocsData.map((doc) => {
            const isSelected = doc.id === selectedDocId;
            return (
              <div
                key={doc.id}
                onClick={() => handleSelect(doc)}
                style={{
                  background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'var(--nhf-bg-card)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--nhf-accent-blue)' : 'var(--nhf-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {doc.imageUrl && <ImageIcon size={13} color="#38bdf8" />}
                    <span className="badge badge-gray" style={{ fontSize: '0.65rem' }}>{doc.docType}</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {doc.date}
                  </span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: isSelected ? 'var(--nhf-accent-blue)' : 'var(--nhf-text-primary)' }}>
                  {doc.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Paper Document & Photographic Preview Container */}
        <div style={{
          background: '#e8e2d5',
          color: '#1a1a1a',
          borderRadius: 'var(--radius-md)',
          padding: '32px 36px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
          border: '1px solid #c4b9a3',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          fontFamily: 'var(--font-mono)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #222', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#666', letterSpacing: '0.1em' }}>
                NET HISTORY FOUNDATION PHYSICAL ARCHIVES // DIGITIZED ARTIFACT
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111', marginTop: '4px' }}>
                {selectedDoc.title}
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '4px' }}>
                Provenance: {selectedDoc.provenance} | Classification: {selectedDoc.classification}
              </div>
            </div>

            <button 
              className="btn btn-secondary"
              style={{ background: '#d5cdbd', color: '#111', borderColor: '#999' }}
              onClick={handlePin}
            >
              <BookmarkPlus size={14} />
              <span>Pin Scan</span>
            </button>
          </div>

          {/* Embedded Photograph if Available */}
          {selectedDoc.imageUrl && (
            <div style={{
              background: '#121417',
              border: '2px solid #333',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              position: 'relative'
            }}>
              <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setZoomedImage(selectedDoc.imageUrl || null)}>
                <img
                  src={selectedDoc.imageUrl}
                  alt={selectedDoc.title}
                  style={{
                    width: '100%',
                    maxHeight: '440px',
                    objectFit: 'contain',
                    display: 'block',
                    backgroundColor: '#0a0d12'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'rgba(0,0,0,0.75)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  color: '#fff',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ZoomIn size={14} />
                  <span>Click to Enlarge</span>
                </div>
              </div>
              {selectedDoc.imageCaption && (
                <div style={{
                  padding: '12px 16px',
                  background: '#1a1e24',
                  color: '#cbd5e1',
                  fontSize: '0.8rem',
                  lineHeight: '1.5',
                  borderTop: '1px solid #2e3644'
                }}>
                  📸 <em>{selectedDoc.imageCaption}</em>
                </div>
              )}
            </div>
          )}

          {/* Document Text Body */}
          <div style={{
            fontSize: '0.88rem',
            lineHeight: '1.7',
            whiteSpace: 'pre-wrap',
            color: '#111',
            background: 'rgba(255, 255, 255, 0.45)',
            padding: '20px',
            border: '1px solid #c0b49c'
          }}>
            {selectedDoc.content}
          </div>

          {/* Handwritten Sticky Notes */}
          {selectedDoc.handwrittenAnnotations && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#8b0000' }}>
                HANDWRITTEN MARGIN NOTES / ARCHIVIST STICKIES:
              </div>
              {selectedDoc.handwrittenAnnotations.map((note, idx) => (
                <div 
                  key={idx} 
                  style={{
                    background: '#fef08a',
                    color: '#713f12',
                    padding: '10px 14px',
                    borderRadius: '2px',
                    boxShadow: '2px 2px 5px rgba(0,0,0,0.15)',
                    fontFamily: 'Comic Sans MS, cursive, sans-serif',
                    fontSize: '0.85rem',
                    borderLeft: '4px solid #ca8a04'
                  }}
                >
                  "{note}"
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div className="modal-backdrop" onClick={() => setZoomedImage(null)}>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomedImage(null)}
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
              src={zoomedImage}
              alt="Enlarged Evidence"
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
