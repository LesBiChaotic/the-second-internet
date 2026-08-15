import React, { useState } from 'react';
import { FileText, BookmarkPlus, ShieldAlert, Lock, User, Calendar, Tag } from 'lucide-react';
import { foundationArticles } from '../../data/foundationData';
import { FoundationArticle } from '../../types';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const ResearchPapersView: React.FC<Props> = ({ store }) => {
  const { currentSubId, clearanceLevel, pinToCaseboard, discoverAnomaly } = store;
  const [selectedArticleId, setSelectedArticleId] = useState<string>(currentSubId || foundationArticles[0].id);

  const selectedArticle = foundationArticles.find(a => a.id === selectedArticleId) || foundationArticles[0];

  const handleSelect = (art: FoundationArticle) => {
    soundEngine.playClick(650);
    setSelectedArticleId(art.id);
    if (art.isAnomalous) {
      discoverAnomaly(`art-${art.id}`);
    }
  };

  const handlePin = () => {
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'DOCUMENT',
      title: selectedArticle.title,
      preview: selectedArticle.summary,
      targetView: 'RESEARCH',
      targetId: selectedArticle.id,
      connectedTo: []
    });
    alert(`Pinned "${selectedArticle.title}" to Caseboard.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '6px' }}>
          Foundation Research Papers & Oral Histories
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--nhf-text-secondary)', maxWidth: '750px' }}>
          Scholarly whitepapers, technical monographs, preservation documentation, and transcribed interviews with early web pioneers and telecom engineers.
        </p>
      </div>

      <div className="responsive-grid-sidebar" style={{ minHeight: '650px' }}>
        {/* Mobile Selector */}
        <select
          className="filter-mobile"
          value={selectedArticleId}
          onChange={(e) => {
            const art = foundationArticles.find(a => a.id === e.target.value);
            if (art) handleSelect(art);
          }}
          style={{ marginBottom: '16px' }}
        >
          <option value="" disabled>Select Research Paper...</option>
          {foundationArticles.map(art => (
            <option key={art.id} value={art.id}>
              {art.title} ({art.category.toUpperCase()})
            </option>
          ))}
        </select>

        {/* Left Article List */}
        <div className="filter-desktop" style={{
          background: 'var(--nhf-bg-surface)',
          border: '1px solid var(--nhf-border)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {foundationArticles.map((art) => {
            const isSelected = art.id === selectedArticleId;
            return (
              <div
                key={art.id}
                onClick={() => handleSelect(art)}
                style={{
                  background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'var(--nhf-bg-card)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--nhf-accent-blue)' : 'var(--nhf-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#60a5fa', fontFamily: 'var(--font-mono)' }}>
                    {art.category.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--nhf-text-muted)' }}>{art.date}</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: isSelected ? 'var(--nhf-accent-blue)' : 'var(--nhf-text-primary)' }}>
                  {art.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Article Reader */}
        <div style={{
          background: 'var(--nhf-bg-surface)',
          border: '1px solid var(--nhf-border)',
          borderRadius: 'var(--radius-md)',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-blue">{selectedArticle.category}</span>
                {selectedArticle.isAnomalous && <span className="badge badge-red">ANOMALOUS TOPOLOGY</span>}
              </div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '6px' }}>
                {selectedArticle.title}
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                By {selectedArticle.author} • Published {selectedArticle.date}
              </div>
            </div>

            <button className="btn btn-secondary" onClick={handlePin}>
              <BookmarkPlus size={14} />
              <span>Pin</span>
            </button>
          </div>

          <div style={{ background: 'var(--nhf-bg-card)', padding: '16px 20px', borderRadius: '6px', borderLeft: '4px solid var(--nhf-accent-blue)', fontStyle: 'italic', color: 'var(--nhf-text-secondary)', fontSize: '0.9rem' }}>
            {selectedArticle.summary}
          </div>

          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.05rem',
            lineHeight: '1.8',
            color: 'var(--nhf-text-primary)',
            whiteSpace: 'pre-wrap'
          }}>
            {selectedArticle.content}
          </div>
        </div>
      </div>
    </div>
  );
};
