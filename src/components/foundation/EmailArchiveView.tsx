import React, { useState } from 'react';
import { Mail, ShieldAlert, BookmarkPlus, User, Calendar, Tag, ArrowRight } from 'lucide-react';
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

  const selectedEmail = emailsData.find(e => e.id === selectedEmailId) || emailsData[0];

  const handleSelect = (em: EmailRecord) => {
    soundEngine.playClick(650);
    setSelectedEmailId(em.id);
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
      <div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '4px' }}>
          Recovered Mail Spools & Correspondence
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--nhf-text-secondary)' }}>
          Ingested mbox spools from Greyline Communications, early webmasters, and Foundation internal communications.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', minHeight: '600px' }}>
        {/* Email List */}
        <div style={{
          background: 'var(--nhf-bg-surface)',
          border: '1px solid var(--nhf-border)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxHeight: '700px',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-subtle)'
        }}>
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
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isSelected ? 'var(--nhf-accent-blue)' : 'var(--nhf-text-primary)' }}>
                    {em.from.split('@')[0]}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {em.date.split(' ')[0]}
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--nhf-text-secondary)', fontWeight: 500 }}>
                  {em.subject}
                </div>
              </div>
            );
          })}
        </div>

        {/* Email Reader */}
        <div style={{
          background: 'var(--nhf-bg-surface)',
          border: '1px solid var(--nhf-border)',
          borderRadius: 'var(--radius-md)',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '8px' }}>
                {selectedEmail.subject}
              </div>
              <div style={{ background: 'var(--nhf-bg-card)', padding: '12px', borderRadius: '6px', border: '1px solid var(--nhf-border)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--nhf-text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div><strong>From:</strong> {selectedEmail.from}</div>
                <div><strong>To:</strong> {selectedEmail.to}</div>
                <div><strong>Date:</strong> {selectedEmail.date}</div>
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
            fontSize: '0.88rem',
            lineHeight: '1.7',
            color: selectedEmail.isAnomalous ? 'var(--nhf-accent-crimson)' : 'var(--nhf-text-primary)',
            whiteSpace: 'pre-wrap'
          }}>
            {selectedEmail.body}
          </div>
        </div>
      </div>
    </div>
  );
};
