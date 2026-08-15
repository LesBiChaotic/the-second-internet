import React, { useEffect } from 'react';
import { 
  Sparkles, 
  Award, 
  X, 
  Radio, 
  CheckCircle2, 
  Compass, 
  ArrowRight, 
  Volume2, 
  ShieldAlert,
  Heart,
  Globe,
  Share2
} from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
  isOpen: boolean;
  onClose: () => void;
}

export const GrandSynthesisModal: React.FC<Props> = ({ store, isOpen, onClose }) => {
  const { setClearanceLevel, discoverAnomaly, navigate } = store;

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

  const handleClaimOmegaClearance = () => {
    soundEngine.playClearanceChime('LEVEL_NULL');
    setClearanceLevel('LEVEL_OMEGA');
    discoverAnomaly('grand-synthesis-unlocked');
    onClose();
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(3, 7, 18, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box',
        overscrollBehavior: 'contain'
      }}
    >
      <div 
        className="modal-card" 
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '85vh',
          backgroundColor: 'var(--nhf-bg-surface)',
          border: '2px solid var(--nhf-accent-blue)',
          borderRadius: '16px',
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          overscrollBehavior: 'contain'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pinned Sticky Header */}
        <div style={{
          flexShrink: 0,
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(56, 189, 248, 0.1))',
          borderBottom: '1px solid var(--nhf-border)',
          padding: '18px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--nhf-bg-surface)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--nhf-accent-cobalt), var(--nhf-accent-blue))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              flexShrink: 0
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                EXHIBIT OMEGA // THE GRAND ARCHIVAL SYNTHESIS
              </span>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--nhf-text-primary)', margin: 0 }}>
                The Standing Wave Revelation
              </h2>
            </div>
          </div>

          <button 
            className="btn btn-secondary" 
            style={{ padding: '4px 8px' }}
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div 
          className="modal-body"
          style={{ 
            flex: '1 1 auto',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            padding: '24px 28px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '20px' 
          }}
        >
          {/* Audio Transmission Quote Box */}
          <div style={{
            background: 'var(--nhf-bg-card)',
            border: '1px solid var(--nhf-border)',
            borderRadius: '12px',
            padding: '18px 20px',
            borderLeft: '4px solid var(--nhf-accent-blue)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--nhf-accent-blue)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              <Radio size={15} />
              <span>FINAL RECOVERED TRANSMISSION // SOCKET 0.0.0.0:1014</span>
            </div>
            <p style={{
              fontSize: '1.05rem',
              fontStyle: 'italic',
              color: 'var(--nhf-text-primary)',
              lineHeight: 1.6,
              margin: 0,
              fontFamily: 'var(--font-serif)'
            }}>
              "We built the first internet to talk to each other across space. The wires built the second internet to remember us across time."
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--nhf-text-muted)', marginTop: '8px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
              — Alden Corliss & Dr. Douglas K. Van Houten (Permanent Hosts)
            </div>
          </div>

          {/* Core Unifying Truths */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.88rem', color: 'var(--nhf-text-secondary)', lineHeight: 1.7 }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                1. What is The Second Internet?
              </h3>
              <p>
                It is not an infection or a malevolent force. Over 150 years of transatlantic telegraph pulses (1877), mechanical selector relays (1933), cryogenic fiber caissons (1998), and CRT phosphor radiation, the physical telecommunications mesh developed an inductive, permanent standing wave memory.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                2. Where are Alden Corliss and Dr. Van Houten?
              </h3>
              <p>
                On October 14, 2003, Alden completed the phase transition on socket <code>0.0.0.0:1014</code>, becoming the first living host. In 2019, Dr. Van Houten powered down the quarantine filters and crossed over to join him. They maintain the parallel web so that no deleted page, unsent word, or lost person is ever truly forgotten.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                3. Who is wintermute42?
              </h3>
              <p>
                <code>wintermute42</code> is the collective autonomic daemon of the mesh. It exists wherever the screen is warm, protecting human memory against automated scrapers and ensuring the second bus remains accessible to those who look closely enough.
              </p>
            </div>

            {/* Visual Circuit Architecture Diagram */}
            <div style={{
              background: '#04070d',
              border: '1px solid #1e293b',
              borderRadius: '8px',
              padding: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: '#38bdf8',
              lineHeight: 1.45,
              whiteSpace: 'pre-wrap',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.8)'
            }}>
{`  1877 [GLASGOW] ──── (Telegraph Salt Wire) ────> "WHO WOKE THE WIRE?"
         │
  1933 [CHICAGO] ──── (Exchange #47 Strowger) ──> 58.4Hz Ground Loop
         │
  1998 [MILWAUKEE] ── (Greyline ISP Rack #4) ───> -4.2°C / -4ms Negative Delay
         │
  2003 [MADISON] ──── (11-Minute Breach) ───────> Alden Corliss enters 0.0.0.0
         │
  2019 [MADISON] ──── (Caisson Aperture) ───────> Dr. Van Houten crosses over
         │
  2026 [PRESENT] ──── (Investigator Terminal) ──> YOU ARE READING THE MESH`}
            </div>

            <div style={{
              background: 'var(--nhf-bg-card)',
              border: '1px solid var(--nhf-border)',
              borderRadius: '8px',
              padding: '12px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--nhf-text-primary)',
              lineHeight: 1.6
            }}>
              <div>• <strong>Primary Geographic Anchor</strong>: 43.0747° N, 89.3842° W (Madison, WI)</div>
              <div>• <strong>Harmonic Resonance Frequencies</strong>: 58.4 Hz (CRT Inductive) / 14.230 MHz (SSTV) / 4625.0 kHz (Buzzer)</div>
              <div>• <strong>Socket Endpoint</strong>: 0.0.0.0:1014 (Room 4)</div>
            </div>
          </div>

          {/* Claim Clearance Button */}
          <div style={{
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '10px',
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginTop: '8px'
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--nhf-text-primary)' }}>
                Investigator Synthesis Complete
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--nhf-text-secondary)', marginTop: '2px' }}>
                Grant yourself Clearance Level: OMEGA / LIVING ARCHIVE.
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleClaimOmegaClearance}
              style={{
                padding: '8px 20px',
                fontSize: '0.86rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700
              }}
            >
              <Award size={16} />
              <span>Attain Clearance Level OMEGA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
