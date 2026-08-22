import React, { useState } from 'react';
import { FileText, BookmarkPlus, ShieldAlert, Lock, User, Calendar, Tag, Filter } from 'lucide-react';
import { foundationArticles } from '../../data/foundationData';
import { FoundationArticle } from '../../types';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const ResearchPapersView: React.FC<Props> = ({ store }) => {
  const { pinToCaseboard, discoverAnomaly } = store;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(foundationArticles.map(a => a.category)))];
  
  const filteredArticles = selectedCategory === 'All' 
    ? foundationArticles 
    : foundationArticles.filter(a => a.category === selectedCategory);

  const handlePin = (art: FoundationArticle) => {
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'DOCUMENT',
      title: art.title,
      preview: art.summary,
      targetView: 'RESEARCH',
      targetId: art.id,
      connectedTo: []
    });
    alert(`Pinned "${art.title}" to Caseboard.`);
  };

  return (
    <div className="research-reading-route institutional-route" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
      <div className="institutional-route-heading">
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '6px' }}>
          Foundation Research Papers & Oral Histories
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--nhf-text-secondary)' }}>
          Scholarly whitepapers, technical monographs, preservation documentation, and transcribed interviews with early web pioneers and telecom engineers.
        </p>
      </div>

      {/* Category Dropdown Filter */}
      <div className="reading-room-filter" style={{
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
          value={selectedCategory}
          onChange={(e) => {
            soundEngine.playClick(600);
            setSelectedCategory(e.target.value);
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
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Vertical Feed of Articles */}
      <div className="research-paper-stack" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {filteredArticles.map((art) => {
          return (
            <article 
              className={`research-paper-sheet ${art.isAnomalous ? 'anomalous' : ''}`}
              key={art.id}
              onClick={() => {
                if (art.isAnomalous) {
                  discoverAnomaly(`art-${art.id}`);
                }
              }}
              style={{
                background: 'var(--nhf-bg-surface)',
                border: '1px solid var(--nhf-border)',
                borderRadius: 'var(--radius-md)',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span className="badge badge-blue">{art.category}</span>
                    {art.isAnomalous && <span className="badge badge-red">ANOMALOUS TOPOLOGY</span>}
                  </div>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '8px', lineHeight: 1.3 }}>
                    {art.title}
                  </h2>
                  <div style={{ fontSize: '0.85rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    By {art.author} • Published {art.date}
                  </div>
                </div>

                <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); handlePin(art); }}>
                  <BookmarkPlus size={14} />
                  <span>Pin</span>
                </button>
              </div>

              <div style={{ background: 'var(--nhf-bg-card)', padding: '16px 20px', borderRadius: '6px', borderLeft: '4px solid var(--nhf-accent-blue)', fontStyle: 'italic', color: 'var(--nhf-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {art.summary}
              </div>

              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                lineHeight: '1.8',
                color: 'var(--nhf-text-primary)',
                whiteSpace: 'pre-wrap'
              }}>
                {art.content}
              </div>
            </article>
          );
        })}
        {filteredArticles.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--nhf-text-muted)' }}>
            No research papers found in this category.
          </div>
        )}
      </div>
    </div>
  );
};
