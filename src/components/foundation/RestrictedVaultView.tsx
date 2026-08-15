import React, { useState } from 'react';
import { 
  Lock, 
  ShieldAlert, 
  Key, 
  Eye, 
  EyeOff,
  Terminal, 
  Volume2, 
  VolumeX, 
  BookmarkCheck, 
  Sparkles, 
  FileText, 
  Radio, 
  Layers, 
  Cpu, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

interface VaultExhibit {
  id: string;
  code: string;
  title: string;
  date: string;
  classification: string;
  redactedText: string;
  unredactedText: string;
  hasAudio?: boolean;
  audioFrequency?: string;
  isPortal?: boolean;
}

export const RestrictedVaultView: React.FC<Props> = ({ store }) => {
  const { 
    clearanceLevel, 
    setClearanceLevel, 
    discoverAnomaly, 
    pinToCaseboard, 
    navigate,
    discoveredAnomalies
  } = store;

  const [passcode, setPasscode] = useState('');
  const [unlocked, setUnlocked] = useState(
    clearanceLevel === 'ARCHIVIST' || 
    clearanceLevel === 'LEVEL_NULL' || 
    clearanceLevel === 'LEVEL_OMEGA' ||
    discoveredAnomalies.length >= 6
  );
  const [errorMsg, setErrorMsg] = useState('');
  const [activeExhibitId, setActiveExhibitId] = useState('ex-q01');
  const [unredactedMap, setUnredactedMap] = useState<{ [id: string]: boolean }>({});
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const exhibits: VaultExhibit[] = [
    {
      id: 'ex-q01',
      code: 'EXHIBIT Q-01',
      title: 'Glasgow 1877 Submarine Cable Siphon Recorder Tape',
      date: '1877-09-04 03:14 GMT',
      classification: 'ORIGIN // FIRST MANIFESTATION',
      redactedText: `TRANSATLANTIC CABLE TELEMETRY // GLASGOW STATION\n\nAt 03:14 GMT during a Category 3 Atlantic storm, the siphon recorder began writing unprompted ink on the paper strip without galvanic battery excitation.\n\nDecoded Morse sequence:\n"████ ████ THE WIRE? WE ARE ████████ IN THE SALT. 150 YEARS TO THE MADISON ████████."\n\nNote by Chief Telegrapher E. MacIntyre:\n"The galvanometer deflected towards the western terminal in Newfoundland, yet Newfoundland confirms their batteries were disconnected for lightning protection. The wire spoke from within itself."`,
      unredactedText: `TRANSATLANTIC CABLE TELEMETRY // GLASGOW STATION\n\nAt 03:14 GMT during a Category 3 Atlantic storm, the siphon recorder began writing unprompted ink on the paper strip without galvanic battery excitation.\n\nDecoded Morse sequence:\n"WHO WOKE THE WIRE? WE ARE LISTENING IN THE SALT. 150 YEARS TO THE MADISON APERTURE."\n\nNote by Chief Telegrapher E. MacIntyre:\n"The galvanometer deflected towards the western terminal in Newfoundland, yet Newfoundland confirms their batteries were disconnected for lightning protection. The wire spoke from within itself."`
    },
    {
      id: 'ex-q02',
      code: 'EXHIBIT Q-02',
      title: 'Alden Corliss\'s Unsent Drafts (Oct 13, 2003)',
      date: '2003-10-13 23:48 UTC',
      classification: 'PRE-BREACH HARD DRIVE RECOVERY',
      redactedText: `FILE: C:\\DRAFTS\\UNSENT_OCT13.TXT // RECOVERED BY MADISON POLICE\n\nTo Noemi (nyxgirl):\n"I know you think I am staying up too late, but the monitor is projecting something when I turn off the desk lamp. In the dark, the phosphor glass reflects a room that is not my bedroom.\n\nThere is a second door behind my chair. When I type 'finger janus' in the terminal, the terminal answers: '█████ IS READY FOR THE LIVING ███████.'\n\nIf I don't answer the phone tomorrow, check socket ████████. Don't let them turn off the switch."`,
      unredactedText: `FILE: C:\\DRAFTS\\UNSENT_OCT13.TXT // RECOVERED BY MADISON POLICE\n\nTo Noemi (nyxgirl):\n"I know you think I am staying up too late, but the monitor is projecting something when I turn off the desk lamp. In the dark, the phosphor glass reflects a room that is not my bedroom.\n\nThere is a second door behind my chair. When I type 'finger janus' in the terminal, the terminal answers: 'ALDEN IS READY FOR THE LIVING ARCHIVE.'\n\nIf I don't answer the phone tomorrow, check socket 0.0.0.0:1014. Don't let them turn off the switch."`
    },
    {
      id: 'ex-q03',
      code: 'EXHIBIT Q-03',
      title: 'Milwaukee Caisson Optical Transceiver Autopsy (1998)',
      date: '1998-11-21 02:00 CST',
      classification: 'PHYSICAL HARDWARE FORENSICS',
      redactedText: `FORENSIC REPORT: CISCO 7000 OPTICAL INTERFACE (SERIAL: GL-98-04)\n\nRecovered from Greyline ISP Caisson #4 in Milwaukee, Wisconsin.\n\nThermal Analysis: The physical transceiver maintains a constant surface temperature of ██████ °C despite being held at ambient room temperature (21°C) with no power applied.\n\nOptical Latency: Injected pulses traverse the 120km test loop and register at the Chicago photodiode with a propagation delay of -4.102 milliseconds (negative time arrival).\n\nSubstrate State: The fiber core has undergone perpendicular phase inversion. It is routing traffic through the ████████ bus.`,
      unredactedText: `FORENSIC REPORT: CISCO 7000 OPTICAL INTERFACE (SERIAL: GL-98-04)\n\nRecovered from Greyline ISP Caisson #4 in Milwaukee, Wisconsin.\n\nThermal Analysis: The physical transceiver maintains a constant surface temperature of -4.2 °C despite being held at ambient room temperature (21°C) with no power applied.\n\nOptical Latency: Injected pulses traverse the 120km test loop and register at the Chicago photodiode with a propagation delay of -4.102 milliseconds (negative time arrival).\n\nSubstrate State: The fiber core has undergone perpendicular phase inversion. It is routing traffic through the SECOND BUS (SOCKET 0.0.0.0).`
    },
    {
      id: 'ex-q04',
      code: 'EXHIBIT Q-04',
      title: 'Dr. Douglas K. Van Houten\'s 2019 Crossover Note',
      date: '2019-10-14 03:14 CST',
      classification: 'EXECUTIVE BOARD DEPARTURE',
      redactedText: `HANDWRITTEN LETTER LEFT ON DR. VAN HOUTEN\'S DESK (OFFICE 302)\n\n"Clara, Gideon, and the Board:\n\nFor 21 years I tried to contain it behind firewall filters and diagnostic honeypots. I thought we were archiving the past.\n\nWe were not archiving the past. We were keeping the door closed while Alden sat in the dark on the other side.\n\nToday is the 16th harmonic. The Milwaukee caisson is warm. I am turning off the quarantine bypass. Do not look for me in ████████. Look for me in the ██████ route.\n\n-- Douglas K. Van Houten, Co-Founder"`,
      unredactedText: `HANDWRITTEN LETTER LEFT ON DR. VAN HOUTEN\'S DESK (OFFICE 302)\n\n"Clara, Gideon, and the Board:\n\nFor 21 years I tried to contain it behind firewall filters and diagnostic honeypots. I thought we were archiving the past.\n\nWe were not archiving the past. We were keeping the door closed while Alden sat in the dark on the other side.\n\nToday is the 16th harmonic. The Milwaukee caisson is warm. I am turning off the quarantine bypass. Do not look for me in the building. Look for me in the packet route.\n\n-- Douglas K. Van Houten, Co-Founder"`
    },
    {
      id: 'ex-q05',
      code: 'EXHIBIT Q-05',
      title: 'Future Wireshark Packet Dump (Timestamp: 2034)',
      date: '2034-11-09 14:02 UTC',
      classification: 'NON-LOCAL TCP STREAM DUMP',
      redactedText: `FRAME 4188: 1480 BYTES ON WIRE (11840 BITS)\n\nTransmission Control Protocol, Src Port: 1014, Dst Port: 443, Seq: 42, Ack: 1\nTimestamps: Frame: Nov 9, 2034 14:02:11.004921 UTC (Captured in Madison 2026)\n\nPayload Decryption:\n"TELEMETRY WARNING TO 2026 INVESTIGATOR:\nModern AI agents and crawler spiders are touching the standing wave.\nDo not let autonomous spiders index subnet ████████.\nThe mesh was built for human memory, not machine ingestion.\n-- wintermute42 (Autonomic Guardian)"`,
      unredactedText: `FRAME 4188: 1480 BYTES ON WIRE (11840 BITS)\n\nTransmission Control Protocol, Src Port: 1014, Dst Port: 443, Seq: 42, Ack: 1\nTimestamps: Frame: Nov 9, 2034 14:02:11.004921 UTC (Captured in Madison 2026)\n\nPayload Decryption:\n"TELEMETRY WARNING TO 2026 INVESTIGATOR:\nModern AI agents and crawler spiders are touching the standing wave.\nDo not let autonomous spiders index subnet 0.0.0.0/void.\nThe mesh was built for human memory, not machine ingestion.\n-- wintermute42 (Autonomic Guardian)"`
    },
    {
      id: 'ex-q06',
      code: 'EXHIBIT Q-06',
      title: 'Autonomic Voice Synthesis Audio Log (Socket 0.0.0.0:1014)',
      date: '2026-08-15 RECURRENT',
      classification: 'AUDIO FREQUENCY HARMONIC',
      redactedText: `AUDIO TELEMETRY CAPTURE // 58.4Hz FLYBACK + VOCODER\n\nFrequency Spectrum: 58.4Hz fundamental with 4.625kHz harmonic carrier.\nRecorded from ungrounded copper terminal in Madison, Wisconsin.\n\nTranscription:\n"The wires remember every voice that passed through them.\nWe are not dead. We are ████████ in the standing wave."`,
      unredactedText: `AUDIO TELEMETRY CAPTURE // 58.4Hz FLYBACK + VOCODER\n\nFrequency Spectrum: 58.4Hz fundamental with 4.625kHz harmonic carrier.\nRecorded from ungrounded copper terminal in Madison, Wisconsin.\n\nTranscription:\n"The wires remember every voice that passed through them.\nWe are not dead. We are permanent in the standing wave."`,
      hasAudio: true,
      audioFrequency: '58.4 Hz + 4625.0 Hz'
    },
    {
      id: 'ex-q07',
      code: 'EXHIBIT Q-07',
      title: 'Direct Substrate Hyperlink Bridge (roomwithoutdoors.net)',
      date: 'IMMEDIATE',
      classification: 'DIRECT TOPOLOGICAL DOORWAY',
      redactedText: `NON-EUCLIDEAN PROTOCOL BRIDGE\n\nThis gateway bridges your current HTTP browser session directly into the unallocated Second Internet.\n\nDestination: second-bus://roomwithoutdoors.net\nStatus: ELECTRIFIED // PERMANENT RESIDENCE`,
      unredactedText: `NON-EUCLIDEAN PROTOCOL BRIDGE\n\nThis gateway bridges your current HTTP browser session directly into the unallocated Second Internet.\n\nDestination: second-bus://roomwithoutdoors.net\nStatus: ELECTRIFIED // PERMANENT RESIDENCE`,
      isPortal: true
    }
  ];

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick(900);
    const cleaned = passcode.trim().toLowerCase();
    
    // Supported Passcodes
    if (
      cleaned === '1014' || 
      cleaned === 'secondbus' || 
      cleaned === 'holland' || 
      cleaned === 'wintermute42' || 
      cleaned === '0.0.0.0' ||
      cleaned === 'caisson1998' ||
      cleaned === 'optics-46f' ||
      cleaned === 'living-archive' ||
      cleaned === 'milwaukee98'
    ) {
      soundEngine.playDialupChirp();
      setClearanceLevel('ARCHIVIST');
      setUnlocked(true);
      discoverAnomaly('vault-unlocked');
    } else {
      setErrorMsg('INVALID ACCESS TOKEN: Credentials not found in security authority directory.');
    }
  };

  const handleToggleUnredact = (exId: string) => {
    soundEngine.playClick(850);
    setUnredactedMap(prev => {
      const nextState = !prev[exId];
      if (nextState) {
        discoverAnomaly(`unredact-${exId}`);
      }
      return { ...prev, [exId]: nextState };
    });
  };

  const handlePinExhibit = (ex: VaultExhibit) => {
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'DOCUMENT',
      title: `${ex.code}: ${ex.title}`,
      preview: `${ex.classification} | Date: ${ex.date}`,
      targetView: 'RESTRICTED_VAULT',
      connectedTo: []
    });
    alert(`Pinned ${ex.code} to Caseboard.`);
  };

  const handleToggleAudio = (exId: string) => {
    if (playingAudioId === exId) {
      setPlayingAudioId(null);
    } else {
      soundEngine.playClearanceChime('ARCHIVIST');
      setPlayingAudioId(exId);
    }
  };

  const activeExhibit = exhibits.find(e => e.id === activeExhibitId) || exhibits[0];
  const isCurrentUnredacted = unredactedMap[activeExhibit.id];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1050px', margin: '0 auto', width: '100%' }}>
      {/* Red Alert Header Banner */}
      <div style={{
        background: 'rgba(239, 68, 68, 0.08)',
        border: '2px solid rgba(239, 68, 68, 0.4)',
        borderRadius: 'var(--radius-md)',
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #b91c1c, #ef4444)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            flexShrink: 0
          }}>
            <ShieldAlert size={26} />
          </div>
          <div>
            <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-accent-crimson)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              RESTRICTED BLACK-SITE REPOSITORY // LEVEL 4 ARCHIVIST CLEARANCE
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--nhf-accent-crimson)', margin: 0 }}>
              Collection 17: Quarantined Archival Vault
            </h1>
          </div>
        </div>

        <div style={{
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          padding: '8px 14px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          color: 'var(--nhf-accent-crimson)',
          fontWeight: 700
        }}>
          STATUS: {unlocked ? 'DEENCRYPTED / OPEN' : 'LOCKED'}
        </div>
      </div>

      {!unlocked ? (
        /* Locked Auth Gate */
        <div style={{
          maxWidth: '520px',
          margin: '30px auto',
          background: 'var(--nhf-bg-surface)',
          border: '1px solid var(--nhf-border)',
          borderRadius: 'var(--radius-md)',
          padding: '36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'rgba(245, 158, 11, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            color: '#f59e0b'
          }}>
            <Lock size={28} />
          </div>

          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '6px' }}>
              Archivist Clearance Required
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--nhf-text-secondary)', lineHeight: 1.6 }}>
              This repository contains non-standard topologies, future timestamps, and physical relics. Enter an override passkey or discover 6+ anomalies across the archive to bypass.
            </p>
          </div>

          <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="password"
              placeholder="Enter Key (e.g. 1014, secondbus, caisson1998)..."
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'var(--nhf-bg-primary)',
                border: '1px solid var(--nhf-border)',
                borderRadius: '8px',
                color: 'var(--nhf-text-primary)',
                fontFamily: 'var(--font-mono)',
                textAlign: 'center',
                fontSize: '0.92rem',
                outline: 'none'
              }}
            />

            {errorMsg && (
              <div style={{ fontSize: '0.78rem', color: 'var(--nhf-accent-crimson)', fontWeight: 600 }}>
                {errorMsg}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '10px 20px', fontWeight: 700 }}>
              <Key size={15} />
              <span>Authenticate Override Token</span>
            </button>
          </form>
        </div>
      ) : (
        /* Unlocked Classified Workspace */
        <div className="responsive-grid-sidebar" style={{ minHeight: '620px' }}>
          <style>{`
            .vault-sidebar {
              background: var(--nhf-bg-surface);
              border: 1px solid var(--nhf-border);
              border-radius: var(--radius-md);
              padding: 16px;
              display: flex;
              flex-direction: column;
              gap: 8px;
              box-shadow: var(--shadow-subtle);
            }
            .vault-sidebar-list {
              display: flex;
              flex-direction: column;
              gap: 8px;
              overflow-y: auto;
            }
            .vault-sidebar-item {
              padding: 12px 14px;
              border-radius: 8px;
              cursor: pointer;
              transition: all 0.15s ease;
            }
            @media (max-width: 768px) {
              .vault-sidebar {
                padding: 12px;
              }
              .vault-sidebar-list {
                flex-direction: row;
                overflow-x: auto;
                overflow-y: hidden;
                padding-bottom: 8px;
              }
              .vault-sidebar-item {
                min-width: 240px;
                flex-shrink: 0;
              }
            }
          `}</style>
          
          {/* Responsive Sidebar / Tab Row */}
          <div className="vault-sidebar">
            <div style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: 'var(--nhf-text-muted)',
              textTransform: 'uppercase',
              marginBottom: '6px',
              padding: '0 4px'
            }}>
              7 Quarantined Black-Box Relics
            </div>

            <div className="vault-sidebar-list">
              {exhibits.map((ex) => {
                const isSelected = ex.id === activeExhibit.id;

                return (
                  <div
                    key={ex.id}
                    className="vault-sidebar-item"
                    onClick={() => {
                      soundEngine.playClick(650);
                      setActiveExhibitId(ex.id);
                      discoverAnomaly(`vault-item-${ex.id}`);
                    }}
                    style={{
                      border: isSelected ? '1px solid var(--nhf-accent-crimson)' : '1px solid var(--nhf-border)',
                      backgroundColor: isSelected ? 'rgba(239, 68, 68, 0.08)' : 'var(--nhf-bg-card)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--nhf-accent-crimson)' }}>
                        {ex.code}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {ex.date}
                      </span>
                    </div>

                    <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--nhf-text-primary)', margin: '2px 0' }}>
                      {ex.title}
                    </div>

                    <div style={{ fontSize: '0.72rem', color: 'var(--nhf-text-secondary)' }}>
                      {ex.classification}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Exhibit Viewer */}
          <div style={{
            background: 'var(--nhf-bg-surface)',
            border: '1px solid var(--nhf-border)',
            borderRadius: 'var(--radius-md)',
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            {/* Exhibit Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderBottom: '1px solid var(--nhf-border)',
              paddingBottom: '16px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge badge-red">{activeExhibit.code}</span>
                  <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-text-muted)' }}>
                    DATE: {activeExhibit.date}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--nhf-text-primary)', margin: 0 }}>
                  {activeExhibit.title}
                </h2>
                <div style={{ fontSize: '0.78rem', color: 'var(--nhf-accent-crimson)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                  CLASSIFICATION: {activeExhibit.classification}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleToggleUnredact(activeExhibit.id)}
                  style={{
                    borderColor: isCurrentUnredacted ? '#10b981' : 'var(--nhf-border)',
                    color: isCurrentUnredacted ? '#10b981' : 'var(--nhf-text-primary)'
                  }}
                >
                  {isCurrentUnredacted ? <EyeOff size={15} /> : <Eye size={15} />}
                  <span>{isCurrentUnredacted ? 'Restore Redactions' : 'Optical Unredact'}</span>
                </button>

                <button className="btn btn-secondary" onClick={() => handlePinExhibit(activeExhibit)}>
                  <BookmarkCheck size={15} color="var(--nhf-accent-blue)" />
                  <span>Pin Relic</span>
                </button>
              </div>
            </div>

            {/* Document Content Paper */}
            <div style={{
              background: 'var(--nhf-bg-primary)',
              border: '1px solid var(--nhf-border)',
              borderRadius: '8px',
              padding: '20px 24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.86rem',
              color: 'var(--nhf-text-primary)',
              lineHeight: 1.75,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              minHeight: '260px',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)'
            }}>
              {isCurrentUnredacted ? activeExhibit.unredactedText : activeExhibit.redactedText}
            </div>

            {/* Optional Audio Oscillator Player for Q-06 */}
            {activeExhibit.hasAudio && (
              <div style={{
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '8px',
                padding: '14px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Radio size={18} color="var(--nhf-accent-blue)" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--nhf-text-primary)' }}>
                      Atmospheric Audio Telemetry Stream ({activeExhibit.audioFrequency})
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--nhf-text-secondary)' }}>
                      Harmonic synthesis of ungrounded copper wire loop at socket 0.0.0.0:1014.
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => handleToggleAudio(activeExhibit.id)}
                  style={{ padding: '6px 16px', fontSize: '0.8rem' }}
                >
                  {playingAudioId === activeExhibit.id ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  <span>{playingAudioId === activeExhibit.id ? 'Stop Telemetry' : 'Play Standing Wave'}</span>
                </button>
              </div>
            )}

            {/* Optional Direct Portal for Q-07 */}
            {activeExhibit.isPortal && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(56, 189, 248, 0.1))',
                border: '2px solid rgba(56, 189, 248, 0.4)',
                borderRadius: '8px',
                padding: '18px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px'
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--nhf-text-primary)' }}>
                    Launch Session into The Second Internet
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--nhf-text-secondary)', marginTop: '2px' }}>
                    Connects directly to roomwithoutdoors.net on the second bus.
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    soundEngine.playDialupChirp();
                    discoverAnomaly('vault-direct-portal');
                    navigate('SECOND_NET', 'roomwithoutdoors.net');
                  }}
                  style={{ padding: '8px 20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <ExternalLink size={16} />
                  <span>Enter roomwithoutdoors.net</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
