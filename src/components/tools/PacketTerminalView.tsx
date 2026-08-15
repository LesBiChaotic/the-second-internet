import React, { useState } from 'react';
import { Terminal, Cpu, Play, CheckCircle2, AlertTriangle, BookmarkPlus, Copy, RefreshCw } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

interface HexCapture {
  id: string;
  name: string;
  source: string;
  timestamp: string;
  rawHex: string;
  decodedAscii: string;
  forensicAnalysis: string;
  isAnomalous?: boolean;
}

const SAMPLE_CAPTURES: HexCapture[] = [
  {
    id: 'cap-mke-04',
    name: 'Dump #01: Milwaukee Core Rack #4 BGP Open Header',
    source: 'MKE-CORE-04 / 9-Track Magnetic Tape Block 14',
    timestamp: '1998-11-19 02:44:12',
    rawHex: 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF002D0104FE1200B4C63364160000000000000000000000000000000000000000000000000000',
    decodedAscii: `BGP-4 OPEN MESSAGE
Marker: 16 bytes (Synchronized)
Length: 45 bytes
Version: 4
My AS: 65042 (Greyline Telecom)
Hold Time: 180 seconds
BGP Identifier: 198.51.100.22
Optional Parameters: Length 0
PEER ADVERTISEMENT: 0.0.0.0/room (UNRECOGNIZED TOPOLOGY)
PAYLOAD RESIDUE: "WELCOME TO THE SECOND BUS"`,
    forensicAnalysis: 'The peer router advertised a non-standard subnet mask (/room). The packet payload contains natural language ASCII text directly inside the BGP header options block.',
    isAnomalous: true
  },
  {
    id: 'cap-ah-janus',
    name: 'Dump #02: AfterHours Thread #4812 TCP Handshake',
    source: 'Chicago Gateway CHI-GW-01 Packet Mirror',
    timestamp: '2003-10-14 03:14:02',
    rawHex: '4500003C1A2B40004006B73AC0A8010E00000000040000500000000000000000A002721098BA0000020405B40402080A0000000000000000',
    decodedAscii: `IPv4 PACKET HEADER
Source IP: 192.168.1.14 (Alden Corliss Workstation)
Destination IP: 0.0.0.0 (Unallocated)
Source Port: 1024
Dest Port: 80 (HTTP)
TCP Flags: [SYN]
Latency Measured: -4ms
RETURN ACK PAYLOAD: "I CAN SEE EVERYONE WHO IS LOGGED IN. THE MONITOR IS STILL HUMMING."`,
    forensicAnalysis: 'Packet captured during the 11-minute routing event. The round-trip time returned as a negative integer, indicating the destination server responded before the physical SYN handshake left Chicago.',
    isAnomalous: true
  },
  {
    id: 'cap-chad-214',
    name: 'Dump #03: Chadbourne Hall 214 Dial-in Framing',
    source: 'Madison Dial-in Pool MSN-POP-02',
    timestamp: '1998-11-19 03:01:05',
    rawHex: 'FF03C02101010014010405D40305C2230505066E79786769726C',
    decodedAscii: `PPP LCP CONFIG-REQUEST
Protocol: 0xC021 (Link Control Protocol)
Code: 1 (Configure-Request)
Identifier: 1
MRU: 1492
Auth Protocol: CHAP (MD5)
Authenticated User: "nyxgirl"
Physical Line Status: Dual-polarity duplex carrier on disconnected pair.`,
    forensicAnalysis: 'Authenticates user nyxgirl (Noemi Castille). The Madison telco switch recorded this modem connection on a physically cut cable pair with no active battery voltage.',
    isAnomalous: true
  }
];

export const PacketTerminalView: React.FC<Props> = ({ store }) => {
  const { discoverAnomaly, pinToCaseboard } = store;
  const [selectedCapture, setSelectedCapture] = useState<HexCapture>(SAMPLE_CAPTURES[0]);
  const [customHex, setCustomHex] = useState<string>(SAMPLE_CAPTURES[0].rawHex);
  const [isDisassembling, setIsDisassembling] = useState<boolean>(false);
  const [decodedOutput, setDecodedOutput] = useState<string>(SAMPLE_CAPTURES[0].decodedAscii);

  const handleRunDisassembly = () => {
    soundEngine.playClick(900);
    setIsDisassembling(true);
    setDecodedOutput('');

    const targetText = selectedCapture.decodedAscii;
    const lines = targetText.split('\n');

    lines.forEach((line, idx) => {
      setTimeout(() => {
        setDecodedOutput(prev => prev + (prev ? '\n' : '') + line);
        soundEngine.playClick(500 + idx * 30);
        if (idx === lines.length - 1) {
          setIsDisassembling(false);
          if (selectedCapture.isAnomalous) {
            discoverAnomaly(`packet-disasm-${selectedCapture.id}`);
          }
        }
      }, (idx + 1) * 160);
    });
  };

  const handleSelectSample = (cap: HexCapture) => {
    soundEngine.playClick(650);
    setSelectedCapture(cap);
    setCustomHex(cap.rawHex);
    setDecodedOutput(cap.decodedAscii);
  };

  const handlePin = () => {
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'TECH',
      title: `Packet: ${selectedCapture.name}`,
      preview: `Source: ${selectedCapture.source} • Analysis: ${selectedCapture.forensicAnalysis.slice(0, 140)}...`,
      targetView: 'PACKET_TERMINAL',
      connectedTo: []
    });
    alert(`Pinned packet telemetry "${selectedCapture.name}" to Caseboard.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '960px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Cpu size={20} color="#38bdf8" />
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Archival Forensics // Packet Layer Analyzer
          </span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '6px' }}>
          Milwaukee Rack #4 Packet Disassembler & Hex Terminal
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--nhf-text-secondary)', lineHeight: 1.6 }}>
          Direct binary byte stream inspection from recovered 1990s magnetic tape logs. Feed raw hexadecimal octets through the disassembler pipeline to reconstruct protocol headers, BGP routing anomalies, and hidden plaintext residue.
        </p>
      </div>

      {/* Main Grid: Sample Selector + Hex & ASCII Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: '20px' }}>
        {/* Left: Sample Captures */}
        <div style={{
          backgroundColor: 'var(--nhf-bg-surface)',
          border: '1px solid var(--nhf-border)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-text-muted)', textTransform: 'uppercase' }}>
            Recovered Tape Spools ({SAMPLE_CAPTURES.length})
          </div>

          {SAMPLE_CAPTURES.map((cap) => {
            const isSelected = cap.id === selectedCapture.id;
            return (
              <div
                key={cap.id}
                onClick={() => handleSelectSample(cap)}
                style={{
                  backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'var(--nhf-bg-card)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--nhf-accent-blue)' : 'var(--nhf-border)',
                  borderRadius: '6px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.12s ease'
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: isSelected ? 'var(--nhf-accent-blue)' : 'var(--nhf-text-primary)', marginBottom: '4px' }}>
                  {cap.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--nhf-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  {cap.timestamp}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                  {cap.source}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Terminal Disassembly Buffer */}
        <div style={{
          backgroundColor: '#050912',
          border: '1px solid #1e293b',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Hex Input Buffer */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
                RAW HEXADECIMAL BYTE STREAM:
              </label>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>
                {customHex.length / 2} OCTETS
              </span>
            </div>

            <textarea
              value={customHex}
              onChange={(e) => setCustomHex(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                backgroundColor: '#02050a',
                border: '1px solid #1e293b',
                borderRadius: '4px',
                padding: '10px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: '#38bdf8',
                letterSpacing: '0.1em',
                lineHeight: 1.5,
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleRunDisassembly}
              disabled={isDisassembling}
              className="btn btn-primary"
              style={{
                flex: 1,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.88rem'
              }}
            >
              <Terminal size={15} />
              <span>{isDisassembling ? 'DISASSEMBLING STREAM...' : 'DISASSEMBLE BYTE STREAM'}</span>
            </button>

            <button
              onClick={handlePin}
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}
            >
              <BookmarkPlus size={15} />
              <span>Pin Telemetry</span>
            </button>
          </div>

          {/* Decoded Telemetry Buffer */}
          <div>
            <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', marginBottom: '6px' }}>
              DECODED PROTOCOL FRAMEWORK & ASCII PAYLOAD:
            </div>

            <div style={{
              backgroundColor: '#02050a',
              border: '1px solid #1e293b',
              borderRadius: '4px',
              padding: '16px',
              minHeight: '180px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: '#34d399',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              overflowX: 'auto'
            }}>
              {decodedOutput || '[WAITING FOR DISASSEMBLER EXECUTION...]'}
            </div>
          </div>

          {/* Forensic Notes */}
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '4px', padding: '12px', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5 }}>
            <div style={{ fontWeight: 600, color: '#f59e0b', marginBottom: '4px' }}>
              ARCHIVAL FORENSIC ANNOTATION:
            </div>
            {selectedCapture.forensicAnalysis}
          </div>
        </div>
      </div>
    </div>
  );
};
