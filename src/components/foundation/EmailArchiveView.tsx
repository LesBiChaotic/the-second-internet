import React, { useState, useEffect } from 'react';
import { Mail, ShieldAlert, BookmarkPlus, User, Calendar, Tag, ArrowRight, ArrowLeft } from 'lucide-react';
import { emailsData } from '../../data/emailsData';
import { EmailRecord } from '../../types';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const EmailArchiveView: React.FC<Props> = ({ store }) => {
  const { currentSubId, pinToCaseboard, discoverAnomaly } = store;
  const [selectedEmailId, setSelectedEmailId] = useState<string>(currentSubId || emailsData[0].id);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

  // If currentSubId is passed, default to detail view immediately
  useEffect(() => {
    if (currentSubId) {
      setViewMode('detail');
    }
  }, [currentSubId]);

  const selectedEmail = emailsData.find(e => e.id === selectedEmailId) || emailsData[0];

  const handleSelect = (em: EmailRecord) => {
    soundEngine.playClick(650);
    setSelectedEmailId(em.id);
    setViewMode('detail');
    if (em.isAnomalous) {
      discoverAnomaly(`email-${em.id}`);
    }
  };

  const handlePin = () => {
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'DOCUMENT',
      title: `Email: ${selectedEmail.subject}`,
      preview: `From: ${selectedEmail.from} | Date: ${selectedEmail.date}`,
      targetView: 'EMAILS',
      targetId: selectedEmail.id,
      connectedTo: []
    });
    alert(`Pinned email "${selectedEmail.subject}" to Caseboard.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <style>{`
        .email-app-container {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 20px;
        }
        
        .email-list-pane {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: var(--nhf-bg-surface);
          border: 1px solid var(--nhf-border);
          border-radius: var(--radius-md);
          padding: 16px;
          max-height: 700px;
          overflow-y: auto;
          box-shadow: var(--shadow-subtle);
        }

        .email-detail-pane {
          display: flex;
          flex-direction: column;
          gap: 18px;
          background: var(--nhf-bg-surface);
          border: 1px solid var(--nhf-border);
          border-radius: var(--radius-md);
          padding: 28px;
          box-shadow: var(--shadow-subtle);
        }

        .mobile-back-btn {
          display: none;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .email-app-container {
            grid-template-columns: 1fr;
          }
          .email-list-pane {
            display: var(--show-list, flex);
            max-height: none;
          }
          .email-detail-pane {
            display: var(--show-detail, none);
            padding: 16px;
          }
          .mobile-back-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: var(--nhf-text-muted);
            font-family: var(--font-sans);
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            padding: 8px 0;
            margin-bottom: 8px;
            background: none;
            border: none;
          }
          .mobile-back-btn:hover {
            color: var(--nhf-text-primary);
          }
        }
      `}</style>

      <div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '4px' }}>
          Recovered Mail Spools & Correspondence
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--nhf-text-secondary)' }}>
          Ingested mbox spools from Greyline Communications, early webmasters, and Foundation internal communications.
        </p>
      </div>

      <div 
        className="email-app-container" 
        style={{ 
          minHeight: '600px',
          '--show-list': viewMode === 'list' ? 'flex' : 'none',
          '--show-detail': viewMode === 'detail' ? 'flex' : 'none'
        } as React.CSSProperties}
      >
        {/* Email List (Inbox) */}
        <div className="email-list-pane">
          {emailsData.map((em) => {
            const isSelected = em.id === selectedEmailId;
            return (
              <div
                key={em.id}
                onClick={() => handleSelect(em)}
                style={{
                  background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'var(--nhf-bg-card)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--nhf-accent-blue)' : 'var(--nhf-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px 14px',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: isSelected ? 'var(--nhf-accent-blue)' : 'var(--nhf-text-primary)' }}>
                    {em.from.split('@')[0]}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {em.date.split(' ')[0]}
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--nhf-text-primary)', fontWeight: 600, lineHeight: 1.3 }}>
                  {em.subject}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--nhf-text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {em.body.substring(0, 100)}...
                </div>
              </div>
            );
          })}
        </div>

        {/* Email Reader (Detail) */}
        <div className="email-detail-pane">
          <button 
            className="mobile-back-btn"
            onClick={() => {
              soundEngine.playClick(600);
              setViewMode('list');
            }}
          >
            <ArrowLeft size={16} />
            Back to Inbox
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '12px', lineHeight: 1.3 }}>
                {selectedEmail.subject}
              </div>
              <div style={{ background: 'var(--nhf-bg-card)', padding: '14px', borderRadius: '8px', border: '1px solid var(--nhf-border)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--nhf-text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div><strong style={{ color: 'var(--nhf-text-primary)' }}>From:</strong> {selectedEmail.from}</div>
                <div><strong style={{ color: 'var(--nhf-text-primary)' }}>To:</strong> {selectedEmail.to}</div>
                <div><strong style={{ color: 'var(--nhf-text-primary)' }}>Date:</strong> {selectedEmail.date}</div>
              </div>
            </div>

            <button className="btn btn-secondary" onClick={handlePin}>
              <BookmarkPlus size={14} />
              <span>Pin Email</span>
            </button>
          </div>

          <div style={{
            background: 'var(--nhf-bg-card)',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid var(--nhf-border)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.92rem',
            lineHeight: '1.8',
            color: selectedEmail.isAnomalous ? 'var(--nhf-accent-crimson)' : 'var(--nhf-text-primary)',
            whiteSpace: 'pre-wrap',
            flex: 1
          }}>
            {selectedEmail.body}
          </div>
        </div>
      </div>
    </div>
  );
};
