import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, PhoneCall, X, Radio, Volume2, AlertTriangle, Hash, Clock } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

interface CallResponse {
  callee: string;
  location: string;
  transcript: string[];
  isAnomalous?: boolean;
}

const KNOWN_EXCHANGES: Record<string, CallResponse> = {
  '3125550047': {
    callee: 'BELL SYSTEM STEP-BY-STEP EXCHANGE #47',
    location: '212 W Washington, Chicago IL (1933)',
    transcript: [
      '[MECHANICAL RELAY SWITCHES CLICKING RAPIDLY AT 120 BPM]',
      'AUTOMATED OPERATOR: "You have reached Bell System mechanical selector pair 47."',
      'AUTOMATED OPERATOR: "All physical subscribers disconnected in 1978."',
      'FAINT VOICE IN BACKGROUND: "...the monitor is reflecting the room... why did you turn the lamp on..."',
      '[LINE PULSES WITH 58.4Hz CARRIER RESONANCE]'
    ],
    isAnomalous: true
  },
  '6085550214': {
    callee: 'CHADBOURNE HALL ROOM 214 PBX',
    location: 'UW-Madison Campus, Madison WI (1998)',
    transcript: [
      '[MODEM HANDSHAKE CARRIER SCREECH: 28.8k V.34 SYNCHRONIZING]',
      'ANSWERING MACHINE: "Hi, you\'ve reached Noemi. I\'m either in class or in the CS lab."',
      'VOICE: "If you\'re calling about the broken webring link... don\'t click /~room/ again. Corbin says the server isn\'t in the building."',
      '[BEEP]'
    ],
    isAnomalous: true
  },
  '4145550198': {
    callee: 'GREYLINE TELECOM MILWAUKEE CORE',
    location: 'Backbone Caisson, Milwaukee WI (1998)',
    transcript: [
      '[ALARM CHIME SOUNDING IN REVERBERANT SERVER ROOM]',
      'SHIFT LOG: "MKE-CORE-04 optical transceiver drawing 45KB/s on unallocated subnet."',
      'DR. VAN HOUTEN: "Do not cut the trunk line. If you sever it now, the route will stay open on the other side."',
      '[STATIC BURST]'
    ],
    isAnomalous: true
  },
  '5035550112': {
    callee: 'BURNSIDE STREET PAYPHONE BOOTH',
    location: 'Portland, OR (2002)',
    transcript: [
      '[SOUND OF RAIN FALLING ON GLASS BOOTH]',
      '[DISTANT TRAIN HORN OVER BRIDGE]',
      'VOICE: "This payphone hasn\'t had a dial tone since 1999. But every night at three in the morning, someone in Wisconsin dials this number."',
      'VOICE: "Tell Alden I still have the lens cap."'
    ],
    isAnomalous: true
  },
  '0000000000': {
    callee: 'STATION NULL (UNASSIGNED TRUNK)',
    location: 'Second Bus Infrastructure (Non-Local)',
    transcript: [
      '[CONTINUOUS 58.4Hz SINE CARRIER HUM]',
      'SYNTHETIC VOICE: "0... 4... 1... 4... 8... 8... 1... 2..."',
      'SYNTHETIC VOICE: "We are receiving your packets before you type them on the keyboard."',
      'SYNTHETIC VOICE: "The archive is not looking at us. We are looking at the archive."'
    ],
    isAnomalous: true
  }
};

export const PhoneDialerModal: React.FC<Props> = ({ store }) => {
  const { isPhoneDialerOpen, setIsPhoneDialerOpen, discoverAnomaly } = store;
  const [dialedNumber, setDialedNumber] = useState('');
  const [callState, setCallState] = useState<'IDLE' | 'DIALING' | 'CONNECTED' | 'BUSY'>('IDLE');
  const [activeCallData, setActiveCallData] = useState<CallResponse | null>(null);
  const [transcriptLines, setTranscriptLines] = useState<string[]>([]);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval: any;
    if (callState === 'CONNECTED') {
      interval = setInterval(() => {
        setCallDuration(d => d + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  if (!isPhoneDialerOpen) return null;

  const handleKeyPress = (key: string) => {
    soundEngine.playDtmf(key);
    if (dialedNumber.length < 10) {
      setDialedNumber(prev => prev + key);
    }
  };

  const handleClear = () => {
    soundEngine.playClick(500);
    setDialedNumber('');
    if (callState === 'CONNECTED') {
      handleHangUp();
    }
  };

  const handlePreset = (num: string) => {
    soundEngine.playClick(750);
    setDialedNumber(num);
  };

  const handleCall = () => {
    if (!dialedNumber) return;
    soundEngine.playClick(900);
    setCallState('DIALING');
    setTranscriptLines([]);

    const cleanNum = dialedNumber.replace(/\D/g, '');
    const foundResponse = KNOWN_EXCHANGES[cleanNum];

    setTimeout(() => {
      if (foundResponse) {
        setCallState('CONNECTED');
        setActiveCallData(foundResponse);
        soundEngine.playDialupChirp();
        discoverAnomaly(`phone-${cleanNum}`);

        // Stream transcript lines
        foundResponse.transcript.forEach((line, idx) => {
          setTimeout(() => {
            setTranscriptLines(prev => [...prev, line]);
            soundEngine.playClick(600);
          }, (idx + 1) * 1200);
        });
      } else {
        setCallState('BUSY');
        soundEngine.playClick(350);
        setActiveCallData({
          callee: 'BELL / AMERITECH OPERATOR',
          location: 'Regional Automated Network',
          transcript: [
            '[FAST BUSY TONE - 120 IPM]',
            'AUTOMATED RECORDING: "The number you have dialed is currently in service on an adjacent network."'
          ]
        });
        setTranscriptLines([
          '[FAST BUSY TONE]',
          'AUTOMATED OPERATOR: "The number you have dialed is currently in service on an adjacent network. Please hang up and verify your routing table."'
        ]);
      }
    }, 1500);
  };

  const handleHangUp = () => {
    soundEngine.playClick(400);
    setCallState('IDLE');
    setActiveCallData(null);
    setTranscriptLines([]);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div 
      className="modal-backdrop"
      onClick={() => {
        handleHangUp();
        setIsPhoneDialerOpen(false);
      }}
    >
      <div 
        className="modal-card"
        style={{
          maxWidth: '520px',
          backgroundColor: '#0c111a',
          border: '1px solid #1e293b'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          backgroundColor: '#070b12',
          borderBottom: '1px solid #1e293b',
          padding: '14px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={16} color="#38bdf8" />
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '0.05em' }}>
              BELL EXCHANGE #47 // DTMF TERMINAL DIALER
            </span>
          </div>

          <button
            onClick={() => {
              handleHangUp();
              setIsPhoneDialerOpen(false);
            }}
            style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {/* Display Screen */}
          <div style={{
            backgroundColor: '#05080f',
            padding: '16px 20px',
            borderBottom: '1px solid #1e293b',
            minHeight: '100px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>
              CARRIER: {callState === 'CONNECTED' ? 'ONLINE (DUPLEX)' : callState === 'DIALING' ? 'HANDSHAKE...' : 'READY'}
            </span>
            {callState === 'CONNECTED' && (
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} /> {formatTimer(callDuration)}
              </span>
            )}
          </div>

          <div style={{ fontSize: '1.4rem', fontFamily: 'var(--font-mono)', color: '#38bdf8', letterSpacing: '0.15em', fontWeight: 600, textAlign: 'center', margin: '8px 0' }}>
            {dialedNumber || '___-___-____'}
          </div>

          {activeCallData && (
            <div style={{ fontSize: '0.75rem', color: '#f59e0b', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
              {activeCallData.callee} ({activeCallData.location})
            </div>
          )}
        </div>

        {/* Live Call Transcript (When in call) */}
        {callState !== 'IDLE' && (
          <div style={{
            backgroundColor: '#070a12',
            padding: '14px 18px',
            borderBottom: '1px solid #1e293b',
            maxHeight: '150px',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: '#94a3b8',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            {transcriptLines.map((t, i) => (
              <div key={i} style={{ color: t.startsWith('[') ? '#38bdf8' : '#f8fafc' }}>
                {t}
              </div>
            ))}
          </div>
        )}

        {/* Touch-Tone Dialpad */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', maxWidth: '320px', margin: '0 auto' }}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
              <button
                key={k}
                onClick={() => handleKeyPress(k)}
                style={{
                  padding: '12px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  color: '#f8fafc',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.1s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
                onMouseDown={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; }}
                onMouseUp={(e) => { e.currentTarget.style.backgroundColor = '#0f172a'; }}
              >
                {k}
              </button>
            ))}
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', maxWidth: '320px', margin: '0 auto', width: '100%' }}>
            {callState === 'CONNECTED' || callState === 'DIALING' ? (
              <button
                onClick={handleHangUp}
                className="btn"
                style={{ flex: 1, backgroundColor: '#dc2626', color: '#fff', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <PhoneOff size={16} />
                <span>HANG UP</span>
              </button>
            ) : (
              <button
                onClick={handleCall}
                className="btn btn-primary"
                style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                disabled={!dialedNumber}
              >
                <PhoneCall size={16} />
                <span>DIAL NUMBER</span>
              </button>
            )}

            <button
              onClick={handleClear}
              className="btn btn-secondary"
              style={{ padding: '10px 16px' }}
            >
              CLEAR
            </button>
          </div>

          {/* Speed Dial / Lore Clues */}
          <div style={{ borderTop: '1px dashed #1e293b', paddingTop: '12px', marginTop: '4px' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
              RECOVERED SPEED DIAL CLUES:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <button
                onClick={() => handlePreset('3125550047')}
                className="badge badge-amber"
                style={{ cursor: 'pointer', background: 'transparent', border: '1px solid rgba(245, 158, 11, 0.3)' }}
              >
                Exchange #47 (Chicago)
              </button>
              <button
                onClick={() => handlePreset('6085550214')}
                className="badge badge-blue"
                style={{ cursor: 'pointer', background: 'transparent', border: '1px solid rgba(56, 189, 248, 0.3)' }}
              >
                Chadbourne 214 (Madison)
              </button>
              <button
                onClick={() => handlePreset('4145550198')}
                className="badge badge-red"
                style={{ cursor: 'pointer', background: 'transparent', border: '1px solid rgba(239, 68, 68, 0.3)' }}
              >
                Rack #4 (Milwaukee Core)
              </button>
              <button
                onClick={() => handlePreset('5035550112')}
                className="badge badge-green"
                style={{ cursor: 'pointer', background: 'transparent', border: '1px solid rgba(52, 211, 153, 0.3)' }}
              >
                Burnside Booth (Portland)
              </button>
              <button
                onClick={() => handlePreset('0000000000')}
                className="badge badge-gray"
                style={{ cursor: 'pointer', background: 'transparent', border: '1px solid rgba(148, 163, 184, 0.3)' }}
              >
                Station Null
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
