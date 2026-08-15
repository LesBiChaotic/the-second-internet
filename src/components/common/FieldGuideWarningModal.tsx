import React, { useState, useEffect } from 'react';
import { Compass, AlertTriangle, X, ArrowRight } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const FieldGuideWarningModal: React.FC<Props> = ({ store, isOpen, onClose, onConfirm }) => {
  const [dontAskAgain, setDontAskAgain] = useState(false);

  // Lock background body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProceed = () => {
    soundEngine.playClick(900);
    if (dontAskAgain && typeof window !== 'undefined') {
      localStorage.setItem('nhf_skip_field_guide_warning', 'true');
    }
    onConfirm();
  };

  const handleCancel = () => {
    soundEngine.playClick(500);
    onClose();
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleCancel} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(3, 7, 18, 0.82)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box'
      }}
    >
      <div 
        className="modal-card" 
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: 'var(--nhf-bg-surface)',
          border: '1px solid var(--nhf-border)',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--nhf-border)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          backgroundColor: 'var(--nhf-bg-card)',
          borderBottom: '1px solid var(--nhf-border)',
          padding: '14px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={18} color="var(--nhf-accent-amber)" />
            <span style={{ 
              fontWeight: 700, 
              fontSize: '0.86rem', 
              color: 'var(--nhf-accent-amber)', 
              letterSpacing: '0.05em',
              fontFamily: 'var(--font-mono)'
            }}>
              CLASSIFIED MANUAL // SPOILER WARNING
            </span>
          </div>
          <button 
            className="btn btn-secondary" 
            style={{ padding: '4px 6px', lineHeight: 1 }}
            onClick={handleCancel}
            title="Close warning"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', backgroundColor: 'var(--nhf-bg-surface)' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Compass size={24} color="var(--nhf-accent-blue)" />
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ 
                fontSize: '1.08rem', 
                fontWeight: 700, 
                color: 'var(--nhf-text-primary)', 
                marginBottom: '6px',
                lineHeight: 1.35
              }}>
                Open Field Guide & Puzzle Decryption Matrix?
              </h3>
              <p style={{ 
                fontSize: '0.86rem', 
                color: 'var(--nhf-text-secondary)', 
                lineHeight: 1.6 
              }}>
                This manual contains deep archival dossiers detailing the 11-Minute Breach, the 23-Year Cycle, and progressive solutions for secret passwords, telephone dial codes, tuner frequencies, and unallocated subnet routes.
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--nhf-bg-card)',
            border: '1px solid var(--nhf-border)',
            borderRadius: '8px',
            padding: '12px 14px',
            fontSize: '0.78rem',
            color: 'var(--nhf-text-secondary)',
            fontFamily: 'var(--font-mono)',
            lineHeight: 1.55
          }}>
            <strong style={{ color: 'var(--nhf-text-primary)' }}>ℹ NOTE:</strong> Solutions inside the guide are protected behind progressive 3-tier click-to-unredact blinds, so you will not see answers unless you choose to click them.
          </div>

          {/* Don't ask again checkbox */}
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            cursor: 'pointer', 
            fontSize: '0.84rem', 
            color: 'var(--nhf-text-primary)',
            userSelect: 'none'
          }}>
            <input 
              type="checkbox" 
              checked={dontAskAgain} 
              onChange={(e) => setDontAskAgain(e.target.checked)}
              style={{ cursor: 'pointer', accentColor: 'var(--nhf-accent-blue)', width: '16px', height: '16px' }}
            />
            <span>Do not ask again on this device</span>
          </label>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
            <button 
              className="btn btn-secondary" 
              onClick={handleCancel}
              style={{ padding: '8px 16px', fontSize: '0.86rem' }}
            >
              Cancel
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleProceed}
              style={{ padding: '8px 20px', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}
            >
              <span>Acknowledge & Open Guide</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
