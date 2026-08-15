import React, { useState, useMemo } from 'react';
import { Search, X, ShieldAlert, FileText, User, Globe, MessageSquare, Mail, Layers } from 'lucide-react';
import { buildGlobalSearchIndex } from '../../data/searchIndexData';
import { SearchResultItem } from '../../types';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
  onClose: () => void;
}

export const OmniboxSearchModal: React.FC<Props> = ({ store, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const allItems = useMemo(() => buildGlobalSearchIndex(), []);

  const filteredResults = useMemo(() => {
    let results = allItems;

    if (selectedFilter !== 'ALL') {
      results = results.filter(item => {
        if (selectedFilter === 'PEOPLE') return item.type === 'PERSON';
        if (selectedFilter === 'DOMAINS') return item.type === 'DOMAIN';
        if (selectedFilter === 'POSTS') return item.type === 'POST';
        if (selectedFilter === 'DOCUMENTS') return item.type === 'DOCUMENT' || item.type === 'TECH_RECORD';
        if (selectedFilter === 'EMAILS') return item.type === 'EMAIL' || item.type === 'CHAT';
        if (selectedFilter === 'ANOMALIES') return item.isAnomalous;
        return true;
      });
    }

    if (!query.trim()) return results.slice(0, 15);

    const q = query.toLowerCase();
    return results.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.snippet.toLowerCase().includes(q) ||
      item.collection.toLowerCase().includes(q)
    ).slice(0, 25);
  }, [allItems, query, selectedFilter]);

  const handleSelectResult = (item: SearchResultItem) => {
    soundEngine.playClick(800);
    if (item.isAnomalous) {
      store.discoverAnomaly(`search-${item.id}`);
    }
    store.navigate(item.targetView, item.targetId);
    onClose();
  };

  const getIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'PERSON': return <User size={15} color="#60a5fa" />;
      case 'DOMAIN': return <Globe size={15} color="#34d399" />;
      case 'POST': return <MessageSquare size={15} color="#f59e0b" />;
      case 'EMAIL': return <Mail size={15} color="#a78bfa" />;
      default: return <FileText size={15} color="#94a3b8" />;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-card" 
        style={{ maxWidth: '720px', maxHeight: '80vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--nhf-border)', background: 'var(--nhf-bg-card)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Search size={18} color="#38bdf8" />
          <input
            type="text"
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: 'var(--nhf-text-primary)',
              fontSize: '1rem',
              fontFamily: 'var(--font-sans)',
              outline: 'none'
            }}
            placeholder="Search 14,803,201 indexed items (e.g. wintermute42, October 14, 0.0.0.0, Naomi)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-secondary" style={{ padding: '4px 6px' }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--nhf-border)', display: 'flex', gap: '8px', overflowX: 'auto', background: 'var(--nhf-bg-surface)' }}>
          {['ALL', 'PEOPLE', 'DOMAINS', 'POSTS', 'DOCUMENTS', 'EMAILS', 'ANOMALIES'].map((flt) => (
            <button
              key={flt}
              onClick={() => {
                soundEngine.playClick(600);
                setSelectedFilter(flt);
              }}
              style={{
                padding: '4px 10px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                borderRadius: '4px',
                border: '1px solid',
                borderColor: selectedFilter === flt ? 'var(--nhf-accent-blue)' : 'var(--nhf-border)',
                background: selectedFilter === flt ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                color: selectedFilter === flt ? '#60a5fa' : 'var(--nhf-text-muted)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {flt}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="modal-body" style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredResults.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--nhf-text-muted)' }}>
              No cataloged records match "{query}". Try checking alternate handles or dates.
            </div>
          ) : (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectResult(item)}
                style={{
                  background: item.isAnomalous ? 'rgba(239, 68, 68, 0.06)' : 'var(--nhf-bg-card)',
                  border: '1px solid',
                  borderColor: item.isAnomalous ? 'rgba(239, 68, 68, 0.25)' : 'var(--nhf-border)',
                  borderRadius: '6px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = item.isAnomalous ? '#ef4444' : 'var(--nhf-accent-blue)';
                  e.currentTarget.style.transform = 'translateX(3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = item.isAnomalous ? 'rgba(239, 68, 68, 0.25)' : 'var(--nhf-border)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {getIcon(item.type)}
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--nhf-text-primary)' }}>
                      {item.title}
                    </span>
                  </div>
                  {item.isAnomalous && (
                    <span className="badge badge-red">
                      <ShieldAlert size={10} /> ANOMALOUS
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--nhf-text-secondary)', lineHeight: '1.4' }}>
                  {item.snippet}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.72rem', color: 'var(--nhf-text-muted)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                  <span>{item.collection}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
