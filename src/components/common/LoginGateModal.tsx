import React, { useState } from 'react';
import { Shield, ShieldAlert, Key, Lock, ArrowRight, CheckCircle2, AlertTriangle, X, Terminal, Radio } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';
import { ClearanceLevel } from '../../types';

interface Props {
  store: ArchiveState;
}

export const LoginGateModal: React.FC<Props> = ({ store }) => {
  const { isGateOpen, setIsGateOpen, clearanceLevel, authenticateClearance, discoverAnomaly } = store;
  const [activeTab, setActiveTab] = useState<'VISITOR' | 'STAFF'>('VISITOR');
  const [badgeId, setBadgeId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Lock background body scroll when login gate is active
  React.useEffect(() => {
    if (isGateOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isGateOpen]);

  if (!isGateOpen) return null;

  const handleVisitorEnter = () => {
    soundEngine.playClick(800);
    authenticateClearance('VISITOR');
    setIsGateOpen(false);
  };

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    soundEngine.playClick(700);

    const user = badgeId.trim().toLowerCase();
    const pass = passcode.trim().toLowerCase();

    if ((user === 'c.szilard' || user === 'clara') && (pass === 'topology1997' || pass === 'mendez' || pass === 'szilard')) {
      authenticateClearance('RESEARCHER');
      setSuccessMsg('AUTHENTICATED: Dr. Clara Szilard (Chief Archivist) — Clearance Level 3 (RESEARCHER) Granted.');
      soundEngine.playClearanceChime('RESEARCHER');
      discoverAnomaly('login-szilard');
      setTimeout(() => setIsGateOpen(false), 1400);
    } else if ((user === 'd.vanhouten' || user === 'douglas') && (pass === 'milwaukee98' || pass === 'rack4' || pass === 'vanhouten')) {
      authenticateClearance('ARCHIVIST');
      setSuccessMsg('AUTHENTICATED: Dr. Douglas K. Van Houten (Co-Founder) — Clearance Level 4 (ARCHIVIST / RESTRICTED VAULT) Granted.');
      soundEngine.playClearanceChime('ARCHIVIST');
      discoverAnomaly('login-vanhouten');
      setTimeout(() => setIsGateOpen(false), 1400);
    } else if ((user === 'janus' || user === 'alden' || user === 'corliss') && (pass === 'october14' || pass === 'afterhours' || pass === 'behind')) {
      authenticateClearance('LEVEL_NULL');
      setSuccessMsg('CRITICAL OVERRIDE: Alden Corliss (Host 0.0.0.0) — [LEVEL: NULL / SECOND BUS] Permeability Active.');
      soundEngine.playClearanceChime('LEVEL_NULL');
      discoverAnomaly('login-janus-null');
      setTimeout(() => setIsGateOpen(false), 1800);
    } else if (user === 'root' && (pass === '0.0.0.0' || pass === 'station_null')) {
      authenticateClearance('LEVEL_NULL');
      setSuccessMsg('SYSTEM OVERRIDE: STATION NULL KEYCARD RECOGNIZED.');
      soundEngine.playClearanceChime('LEVEL_NULL');
      discoverAnomaly('login-station-null');
      setTimeout(() => setIsGateOpen(false), 1800);
    } else if (user === 'corbin_k' && pass === 'perl1998') {
      authenticateClearance('CONTRIBUTOR');
      setSuccessMsg('AUTHENTICATED: Corbin Keller (Marrow.net Admin) — Clearance Level 2 (CONTRIBUTOR) Granted.');
      soundEngine.playClearanceChime('CONTRIBUTOR');
      setTimeout(() => setIsGateOpen(false), 1400);
    } else {
      soundEngine.playClick(300);
      setErrorMsg('AUTHENTICATION REJECTED: Invalid Badge ID or Cryptographic Passkey.');
    }
  };

  const handleQuickFill = (user: string, pass: string) => {
    setBadgeId(user);
    setPasscode(pass);
    soundEngine.playClick(650);
  };

  return (
    <div 
      className="modal-backdrop"
      onClick={() => setIsGateOpen(false)}
    >
      <div 
        className="modal-card"
        style={{
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#0c111a',
          border: '1px solid #1e293b'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Institutional Top Bar */}
        <div style={{
          backgroundColor: '#070b12',
          borderBottom: '1px solid #1e293b',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '4px',
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8',
              fontFamily: 'Cinzel, serif',
              fontWeight: 'bold'
            }}>
              Ψ
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '0.05em' }}>
                NET HISTORY FOUNDATION
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                SECURE ARCHIVAL ACCESS GATEWAY v4.19
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsGateOpen(false)}
            style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
            title="Close / Continue"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid #1e293b', background: '#090e17' }}>
          <button
            onClick={() => { soundEngine.playClick(600); setActiveTab('VISITOR'); }}
            style={{
              flex: 1,
              padding: '12px',
              background: activeTab === 'VISITOR' ? '#0c111a' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'VISITOR' ? '2px solid #38bdf8' : 'none',
              color: activeTab === 'VISITOR' ? '#f8fafc' : '#64748b',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Shield size={15} color={activeTab === 'VISITOR' ? '#38bdf8' : '#64748b'} />
            <span>Public Visitor Access</span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(600); setActiveTab('STAFF'); }}
            style={{
              flex: 1,
              padding: '12px',
              background: activeTab === 'STAFF' ? '#0c111a' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'STAFF' ? '2px solid #38bdf8' : 'none',
              color: activeTab === 'STAFF' ? '#f8fafc' : '#64748b',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Key size={15} color={activeTab === 'STAFF' ? '#38bdf8' : '#64748b'} />
            <span>Staff / Keycard Sign-In</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ padding: 'clamp(14px, 3vw, 24px)' }}>
          {activeTab === 'VISITOR' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid #1e293b',
                borderRadius: '6px',
                padding: '16px',
                fontSize: '0.85rem',
                color: '#cbd5e1',
                lineHeight: 1.6
              }}>
                <div style={{ color: '#38bdf8', fontWeight: 600, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Radio size={14} /> PUBLIC TERMINAL MODE
                </div>
                You are entering the public viewing tier of the Net History Foundation repository. You will have open read access to Collections 01 through 15, reconstructed historical web communities (1995–2007), search indexes, and TRACE community threads.
              </div>

              <div style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                CURRENT CLEARANCE: <strong style={{ color: '#34d399' }}>{clearanceLevel}</strong> • NODE: MILWAUKEE BACKBONE #04
              </div>

              <button
                onClick={handleVisitorEnter}
                className="btn btn-primary"
                style={{
                  padding: '12px 20px',
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px'
                }}
              >
                <span>ENTER ARCHIVAL COMMONS</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleStaffLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginBottom: '6px' }}>
                  STAFF BADGE ID / HANDLE
                </label>
                <input
                  type="text"
                  value={badgeId}
                  onChange={(e) => setBadgeId(e.target.value)}
                  placeholder="e.g. c.szilard, d.vanhouten, janus..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: '#070a10',
                    border: '1px solid #1e293b',
                    borderRadius: '4px',
                    color: '#f8fafc',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                  autoFocus
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginBottom: '6px' }}>
                  CRYPTOGRAPHIC PASSKEY / SECRET
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter archive passkey..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: '#070a10',
                    border: '1px solid #1e293b',
                    borderRadius: '4px',
                    color: '#f8fafc',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
              </div>

              {errorMsg && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '4px', padding: '8px 12px', color: '#f87171', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={14} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: '4px', padding: '8px 12px', color: '#34d399', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} />
                  <span>{successMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  padding: '10px 16px',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Terminal size={15} />
                <span>AUTHENTICATE CREDENTIALS</span>
              </button>

              {/* Lore Clues / Preset Quick Fill Buttons */}
              <div style={{ marginTop: '8px', borderTop: '1px dashed #1e293b', paddingTop: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  ARCHIVE RECOVERY CLUES (CLICK TO AUTOFILL):
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('c.szilard', 'topology1997')}
                    className="badge badge-blue"
                    style={{ cursor: 'pointer', border: '1px solid rgba(56, 189, 248, 0.3)', background: 'transparent' }}
                  >
                    Dr. Szilard (Chief Archivist)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('d.vanhouten', 'milwaukee98')}
                    className="badge badge-amber"
                    style={{ cursor: 'pointer', border: '1px solid rgba(245, 158, 11, 0.3)', background: 'transparent' }}
                  >
                    Dr. Van Houten (Co-Founder)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('janus', 'october14')}
                    className="badge badge-red"
                    style={{ cursor: 'pointer', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'transparent' }}
                  >
                    janus (Second Bus Override)
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
