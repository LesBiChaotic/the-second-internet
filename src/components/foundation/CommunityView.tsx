import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  ShieldAlert, 
  Search, 
  ExternalLink, 
  BookmarkPlus, 
  User, 
  CheckCircle2, 
  AlertTriangle,
  Radio,
  Clock
} from 'lucide-react';
import { communityMembers } from '../../data/communityData';
import { ambientCommunityMembers } from '../../data/worldPopulationData';
import { CommunityMember } from '../../types';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const CommunityView: React.FC<Props> = ({ store }) => {
  const { navigate, pinToCaseboard, discoverAnomaly } = store;
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'ALL', label: 'All Researchers & Personae' },
    { id: 'INVESTIGATOR', label: 'Field Investigators' },
    { id: 'SKEPTIC', label: 'Skeptics & Engineers' },
    { id: 'FOUNDATION', label: 'Foundation Fellows' },
    { id: 'HISTORICAL', label: '1990s/2000s Pioneers' },
    { id: 'ANOMALOUS', label: 'Anomalous Entities' }
  ];

  const populatedMembers = [...communityMembers, ...ambientCommunityMembers];
  const filteredMembers = populatedMembers.filter((m) => {
    if (selectedCategory !== 'ALL' && m.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.handle.toLowerCase().includes(q) ||
        m.displayName.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.badges.some(b => b.label.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getStatusColor = (status: CommunityMember['status']) => {
    switch (status) {
      case 'ONLINE': return '#34d399';
      case 'RESEARCHING': return '#60a5fa';
      case 'UNRECOGNIZED_NETWORK': return '#ef4444';
      case 'AUTOMATED': return '#f59e0b';
      default: return '#64748b';
    }
  };

  const handleMemberClick = (m: CommunityMember) => {
    soundEngine.playClick(750);
    if (m.category === 'ANOMALOUS') {
      discoverAnomaly(`comm-anom-${m.handle}`);
    }
  };

  const handlePin = (m: CommunityMember) => {
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'PERSON',
      title: `Community Profile: @${m.handle} (${m.displayName})`,
      preview: `${m.role} • Rep: ${m.reputation} pts. Bio: ${m.bio.slice(0, 120)}...`,
      targetView: 'COMMUNITY',
      connectedTo: []
    });
    alert(`Pinned researcher @${m.handle} to Caseboard.`);
  };

  return (
    <div className="community-roster-route institutional-route" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="institutional-route-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Award size={24} color="#38bdf8" />
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', margin: 0 }}>
              Archaeological Community & Researcher Directory
            </h1>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--nhf-text-secondary)', maxWidth: '750px' }}>
            Roster of verified digital archaeologists, foundation curators, telecom skeptics, and anomalous forum regulars. Tracks member reputation, specialist badges, and active research status.
          </p>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={15} color="#64748b" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Filter by handle, role, or badge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 32px',
              background: 'var(--nhf-bg-surface)',
              border: '1px solid var(--nhf-border)',
              borderRadius: '4px',
              color: 'var(--nhf-text-primary)',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <>
        {/* Desktop View */}
        <div className="filter-desktop" style={{ gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="btn btn-secondary"
              style={{
                padding: '5px 12px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                borderColor: selectedCategory === cat.id ? 'var(--nhf-accent-blue)' : 'var(--nhf-border)',
                color: selectedCategory === cat.id ? '#60a5fa' : 'var(--nhf-text-muted)',
                background: selectedCategory === cat.id ? 'rgba(59, 130, 246, 0.15)' : 'var(--nhf-bg-surface)',
                whiteSpace: 'nowrap'
              }}
              onClick={() => {
                soundEngine.playClick(600);
                setSelectedCategory(cat.id);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mobile View */}
        <select
          className="filter-mobile"
          value={selectedCategory}
          onChange={(e) => {
            soundEngine.playClick(600);
            setSelectedCategory(e.target.value);
          }}
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
      </>

      {/* Members Grid */}
      <div className="community-registry-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))', gap: '20px' }}>
        {filteredMembers.map((m) => {
          const isAnom = m.category === 'ANOMALOUS' || m.status === 'UNRECOGNIZED_NETWORK';
          return (
            <div
              className={`community-registry-card ${isAnom ? 'anomalous' : ''}`}
              key={m.id}
              style={{
                background: isAnom ? 'rgba(239, 68, 68, 0.04)' : 'var(--nhf-bg-surface)',
                border: '1px solid',
                borderColor: isAnom ? 'rgba(239, 68, 68, 0.3)' : 'var(--nhf-border)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                transition: 'all 0.15s ease'
              }}
              onClick={() => handleMemberClick(m)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = isAnom ? '#ef4444' : 'var(--nhf-accent-blue)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isAnom ? 'rgba(239, 68, 68, 0.3)' : 'var(--nhf-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Header: Avatar + Handle + Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {m.avatarUrl ? (
                  <img
                    src={m.avatarUrl}
                    alt={m.displayName}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '6px',
                      objectFit: 'cover',
                      border: '1px solid var(--nhf-border)'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '6px',
                    background: 'var(--nhf-bg-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b'
                  }}>
                    <User size={24} />
                  </div>
                )}

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: isAnom ? 'var(--nhf-accent-crimson)' : 'var(--nhf-text-primary)' }}>
                      @{m.handle}
                    </span>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '2px 6px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePin(m);
                      }}
                      title="Pin to Caseboard"
                    >
                      <BookmarkPlus size={13} />
                    </button>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--nhf-text-secondary)', fontWeight: 500 }}>
                    {m.displayName}
                  </div>

                  {/* Status Indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', fontSize: '0.72rem', color: getStatusColor(m.status), fontFamily: 'var(--font-mono)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: getStatusColor(m.status) }} />
                    <span>{m.status.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>

              {/* Role & Bio */}
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#38bdf8', marginBottom: '4px' }}>
                  {m.role}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--nhf-text-muted)', lineHeight: '1.4' }}>
                  {m.bio}
                </div>
              </div>

              {/* Live Activity Status Box */}
              <div style={{ background: 'var(--nhf-bg-card)', border: '1px solid var(--nhf-border)', borderRadius: '4px', padding: '8px 12px', fontSize: '0.75rem', color: 'var(--nhf-text-secondary)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Radio size={12} color="#38bdf8" />
                <span>{m.statusText}</span>
              </div>

              {/* Badges Row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {m.badges.map((b, idx) => (
                  <span
                    key={idx}
                    className={`badge badge-${b.color}`}
                    style={{ fontSize: '0.68rem', padding: '2px 6px' }}
                  >
                    {b.label}
                  </span>
                ))}
              </div>

              {/* Footer: Rep + Join Date */}
              <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--nhf-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                <span>Reputation: <strong style={{ color: isAnom ? '#ef4444' : '#34d399' }}>{m.reputation.toLocaleString()}</strong> pts</span>
                <span>Joined {m.joinDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
