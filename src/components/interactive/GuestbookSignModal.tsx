import React, { useState } from 'react';
import { BookOpen, Send, X, Sparkles, MessageSquare, CheckCircle2, Radio } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const GuestbookSignModal: React.FC<Props> = ({ store }) => {
  const { isGuestbookModalOpen, closeGuestbookModal, guestbookModalTarget, addGuestbookEntry, discoverAnomaly } = store;
  const [handle, setHandle] = useState('');
  const [location, setLocation] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('✦');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  if (!isGuestbookModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim() || !message.trim()) return;

    soundEngine.playClick(850);
    setIsSubmitting(true);
    setFeedback('Writing entry to CGI guestbook spool...');

    const newEntry = {
      id: `gb-custom-${Date.now()}`,
      name: `${selectedBadge} ${handle.trim()}`,
      location: location.trim() || 'Unmapped Coordinate',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' (ARCHIVE ECHO)',
      comment: message.trim(),
      site: guestbookModalTarget || 'marrow'
    };

    setTimeout(() => {
      addGuestbookEntry(newEntry);
      soundEngine.playDialupChirp();
      setFeedback('Entry committed to 1998 guestbook cache.');
      discoverAnomaly(`guestbook-sign-${guestbookModalTarget}`);

      // 3-second simulated eerie ghost response
      setTimeout(() => {
        const ghostResponse = {
          id: `gb-ghost-${Date.now()}`,
          name: '✦ wintermute42',
          location: '0.0.0.0/room (Always Present)',
          date: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' (SECOND BUS)',
          comment: `to ${handle.trim()}: The screen is still warm. Thank you for leaving a light on.`,
          site: guestbookModalTarget || 'marrow'
        };
        addGuestbookEntry(ghostResponse);
        soundEngine.playClearanceChime('RESEARCHER');
      }, 3200);

      setTimeout(() => {
        setIsSubmitting(false);
        closeGuestbookModal();
      }, 1200);
    }, 800);
  };

  return (
    <div 
      className="modal-backdrop"
      onClick={closeGuestbookModal}
    >
      <div 
        className="modal-card"
        style={{
          maxWidth: '520px',
          backgroundColor: '#002B2B',
          border: '3px ridge #80CBC4',
          color: '#E0F2F1',
          fontFamily: '"Times New Roman", Times, serif'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Retro Header */}
        <div style={{
          backgroundColor: '#004D40',
          borderBottom: '2px ridge #80CBC4',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={18} color="#80DEEA" />
            <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#80DEEA' }}>
              ✦ SIGN THE {guestbookModalTarget === 'candle' ? 'CANDLE ROOM' : 'MARROW.NET'} GUESTBOOK ✦
            </span>
          </div>

          <button
            onClick={closeGuestbookModal}
            style={{ background: 'transparent', border: 'none', color: '#80CBC4', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="modal-body" style={{ padding: 'clamp(14px, 3vw, 20px)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ fontSize: '0.88rem', margin: 0, color: '#B2DFDB', fontStyle: 'italic' }}>
            Leave your handle and thoughts in the guestbook. Visitors and network listeners can see your message across all temporal archives.
          </p>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 'bold', marginBottom: '4px', color: '#80DEEA' }}>
              Your Handle / Name:
            </label>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="e.g. nightcrawler, starwatcher..."
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#001A1A',
                border: '1px solid #80CBC4',
                color: '#FFF',
                fontFamily: 'monospace'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 'bold', marginBottom: '4px', color: '#80DEEA' }}>
              Your City / Network Node:
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Chicago IL, Portland OR, Madison WI..."
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#001A1A',
                border: '1px solid #80CBC4',
                color: '#FFF',
                fontFamily: 'monospace'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 'bold', marginBottom: '4px', color: '#80DEEA' }}>
              Select Badge Icon:
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['✦', '★', '💾', '📼', '☕', '🕯', '⚡'].map((badge) => (
                <button
                  key={badge}
                  type="button"
                  onClick={() => { soundEngine.playClick(600); setSelectedBadge(badge); }}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: selectedBadge === badge ? '#00796B' : '#001A1A',
                    border: '1px solid #80CBC4',
                    color: '#FFF',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  {badge}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 'bold', marginBottom: '4px', color: '#80DEEA' }}>
              Guestbook Message:
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write something to the nocturnal web..."
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#001A1A',
                border: '1px solid #80CBC4',
                color: '#FFF',
                fontFamily: 'monospace'
              }}
              required
            />
          </div>

          {feedback && (
            <div style={{ color: '#ffcc00', fontSize: '0.85rem', fontStyle: 'italic', fontFamily: 'monospace' }}>
              {feedback}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#004D40',
                border: '2px outset #80CBC4',
                color: '#FFF',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '0.95rem'
              }}
            >
              ✦ POST TO GUESTBOOK ✦
            </button>

            <button
              type="button"
              onClick={closeGuestbookModal}
              style={{
                padding: '10px 16px',
                backgroundColor: '#001A1A',
                border: '2px outset #80CBC4',
                color: '#80CBC4',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
