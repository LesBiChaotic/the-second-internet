import React, { useState } from 'react';
import { FileSearch, ShieldAlert, BookmarkPlus, Hash, FileText, Image as ImageIcon, ZoomIn, X, BookOpen, Filter } from 'lucide-react';
import { physicalDocsData } from '../../data/physicalDocsData';
import { PhysicalDoc } from '../../types';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const PhysicalDocsView: React.FC<Props> = ({ store }) => {
  const { pinToCaseboard, discoverAnomaly } = store;
  const [selectedType, setSelectedType] = useState<string>('All');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const docTypes = ['All', ...Array.from(new Set(physicalDocsData.map(d => d.docType)))];
  
  const filteredDocs = selectedType === 'All' 
    ? physicalDocsData 
    : physicalDocsData.filter(d => d.docType === selectedType);

  const handlePin = (doc: PhysicalDoc) => {
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'DOCUMENT',
      title: `Physical Scan: ${doc.title}`,
      preview: `Provenance: ${doc.provenance} | Classification: ${doc.classification}`,
      targetView: 'PHYSICAL_DOCS',
      targetId: doc.id,
      connectedTo: []
    });
    alert(`Pinned physical scan "${doc.title}" to Caseboard.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
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

      {/* Subcategory Dropdown Filter */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        background: 'var(--nhf-bg-surface)', 
        padding: '16px', 
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--nhf-border)',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <Filter size={18} color="var(--nhf-text-muted)" />
        <select
          value={selectedType}
          onChange={(e) => {
            soundEngine.playClick(600);
            setSelectedType(e.target.value);
          }}
          style={{
            flex: 1,
            padding: '10px 14px',
            background: 'var(--nhf-bg-primary)',
            color: 'var(--nhf-text-primary)',
            border: '1px solid var(--nhf-border)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {docTypes.map(type => (
            <option key={type} value={type}>
              {type === 'All' ? 'All Document Types' : type}
            </option>
          ))}
        </select>
      </div>

      {/* Vertical Feed of Physical Documents */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {filteredDocs.map((doc) => {
          return (
            <article 
              key={doc.id}
              onClick={() => {
                if (doc.isAnomalous) {
                  discoverAnomaly(`phys-doc-${doc.id}`);
                }
              }}
              style={{
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
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #222', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#666', letterSpacing: '0.1em' }}>
                    NET HISTORY FOUNDATION PHYSICAL ARCHIVES // DIGITIZED ARTIFACT
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                    <span className="badge badge-gray" style={{ fontSize: '0.65rem' }}>{doc.docType}</span>
                    <span style={{ fontSize: '0.75rem', color: '#555' }}>| {doc.date}</span>
                  </div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111', marginTop: '8px' }}>
                    {doc.title}
                  </h2>
                  <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '4px' }}>
                    Provenance: {doc.provenance} | Classification: {doc.classification}
                  </div>
                </div>

                <button 
                  className="btn btn-secondary"
                  style={{ background: '#d5cdbd', color: '#111', borderColor: '#999' }}
                  onClick={(e) => { e.stopPropagation(); handlePin(doc); }}
                >
                  <BookmarkPlus size={14} />
                  <span>Pin Scan</span>
                </button>
              </div>

              {/* Embedded Photograph if Available */}
              {doc.imageUrl && (
                <div style={{
                  background: '#121417',
                  border: '2px solid #333',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                  position: 'relative'
                }}>
                  <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setZoomedImage(doc.imageUrl || null)}>
                    <img
                      src={doc.imageUrl}
                      alt={doc.title}
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
                  {doc.imageCaption && (
                    <div style={{
                      padding: '12px 16px',
                      background: '#1a1e24',
                      color: '#cbd5e1',
                      fontSize: '0.8rem',
                      lineHeight: '1.5',
                      borderTop: '1px solid #2e3644'
                    }}>
                      📸 <em>{doc.imageCaption}</em>
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
                {doc.content}
              </div>

              {/* Handwritten Sticky Notes */}
              {doc.handwrittenAnnotations && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#8b0000' }}>
                    HANDWRITTEN MARGIN NOTES / ARCHIVIST STICKIES:
                  </div>
                  {doc.handwrittenAnnotations.map((note, idx) => (
                    <div 
                      key={idx} 
                      style={{
                        background: '#fef08a',
                        color: '#713f12',
                        padding: '10px 14px',
                        borderRadius: '2px 2px 8px 2px',
                        border: '1px solid #eab308',
                        boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                        fontSize: '0.82rem',
                        transform: `rotate(${idx % 2 === 0 ? '-1deg' : '1.5deg'})`,
                        maxWidth: '85%'
                      }}
                    >
                      {note}
                    </div>
                  ))}
                </div>
              )}

              {/* Anomalous Footnote Warning */}
              {doc.isAnomalous && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '4px', color: '#b91c1c' }}>
                  <ShieldAlert size={16} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                    NHF WARNING: Artifact demonstrates non-standard temporality. Carbon dating or timestamp metadata does not match physical realities.
                  </span>
                </div>
              )}
            </article>
          );
        })}
        {filteredDocs.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--nhf-text-muted)' }}>
            No documents found in this category.
          </div>
        )}
      </div>

      {/* Fullscreen Image Zoom Modal */}
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
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>
            <img 
              src={zoomedImage} 
              alt="Zoomed Evidence" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '85vh', 
                objectFit: 'contain',
                borderRadius: '4px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
                border: '1px solid #444'
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};
