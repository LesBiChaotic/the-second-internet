import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Terminal, 
  RefreshCw, 
  Home, 
  Radio, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
  attemptedUrl: string;
  onReset: () => void;
}

export const SubstrateErrorView: React.FC<Props> = ({ store, attemptedUrl, onReset }) => {
  const { discoverAnomaly, navigate } = store;
  const [runningPing, setRunningPing] = useState(false);
  const [pingOutput, setPingOutput] = useState<string[]>([]);

  const handleRunPing = () => {
    soundEngine.playClick(800);
    setRunningPing(true);
    setPingOutput(['PING 0.0.0.0 (second-bus.net): 56 data bytes']);

    setTimeout(() => {
      setPingOutput(prev => [...prev, '64 bytes from 0.0.0.0: icmp_seq=1 ttl=255 time=-4.12 ms (NEGATIVE LATENCY)']);
    }, 400);

    setTimeout(() => {
      setPingOutput(prev => [...prev, '64 bytes from 0.0.0.0: icmp_seq=2 ttl=255 time=-4.08 ms (NEGATIVE LATENCY)']);
    }, 800);

    setTimeout(() => {
      setPingOutput(prev => [
        ...prev, 
        '64 bytes from 0.0.0.0: icmp_seq=3 ttl=255 time=-4.15 ms',
        '--- 0.0.0.0 ping statistics ---',
        '3 packets transmitted, 3 received, 0% packet loss, time -12.35ms',
        'SUBSTRATE DETECTED: Room 4 aperture is active on the unallocated second bus.'
      ]);
      setRunningPing(false);
      soundEngine.playClearanceChime('ARCHIVIST');
      discoverAnomaly('error-ping-0.0.0.0');
    }, 1300);
  };

  return (
    <div style={{
      maxWidth: '780px',
      margin: '16px auto',
      width: '100%',
      background: 'var(--nhf-bg-surface)',
      border: '2px solid rgba(239, 68, 68, 0.4)',
      borderRadius: 'var(--radius-md)',
      padding: 'clamp(16px, 3vw, 32px)',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      boxShadow: '0 8px 30px rgba(239, 68, 68, 0.15)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '12px',
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ef4444'
        }}>
          <AlertOctagon size={26} />
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#ef4444', fontWeight: 800, textTransform: 'uppercase' }}>
            SUBSTRATE ROUTING ERROR // HTTP 404 / PHASE_INVERSION
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--nhf-text-primary)', margin: 0 }}>
            Unallocated Second Bus Wire Fault
          </h2>
        </div>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'var(--nhf-text-secondary)', lineHeight: 1.6 }}>
        The target location <code style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)', background: 'var(--nhf-bg-primary)', padding: '2px 6px', borderRadius: '4px' }}>{attemptedUrl}</code> is not reachable via standard First Internet TCP/IP routing tables. The packet trace dropped into ungrounded copper.
      </p>

      {/* Interactive Ping Terminal */}
      <div style={{
        background: 'var(--nhf-bg-primary)',
        border: '1px solid var(--nhf-border)',
        borderRadius: '8px',
        padding: '16px 20px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.80rem',
        color: '#34d399',
        minHeight: '120px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <div style={{ color: 'var(--nhf-text-muted)', fontSize: '0.72rem', display: 'flex', justifyContent: 'space-between' }}>
          <span>DIAGNOSTIC TERMINAL: /usr/sbin/ping -c 3 0.0.0.0</span>
          <span>ETH-4 // 100BASE-FX</span>
        </div>

        {pingOutput.length === 0 ? (
          <div style={{ color: 'var(--nhf-text-muted)', fontStyle: 'italic', marginTop: '12px' }}>
            Click "Trace Negative Latency Loop" to test physical wire inductance...
          </div>
        ) : (
          pingOutput.map((line, idx) => (
            <div key={idx} style={{ color: line.includes('NEGATIVE') ? '#38bdf8' : line.includes('DETECTED') ? '#f59e0b' : '#34d399' }}>
              {line}
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
        <button
          className="btn btn-primary"
          onClick={handleRunPing}
          disabled={runningPing}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Terminal size={15} />
          <span>{runningPing ? 'Pinging Substrate...' : 'Trace Negative Latency Loop'}</span>
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => {
            soundEngine.playClick(600);
            onReset();
            navigate('DASHBOARD');
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Home size={15} />
          <span>Return to Dashboard</span>
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => {
            soundEngine.playClick(600);
            onReset();
            navigate('RESTRICTED_VAULT');
          }}
          style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' }}
        >
          <ShieldAlert size={15} />
          <span>Check Collection 17 Vault</span>
        </button>
      </div>
    </div>
  );
};
