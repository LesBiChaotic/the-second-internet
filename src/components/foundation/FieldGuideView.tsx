import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Compass, 
  Key, 
  Phone, 
  Radio, 
  Cpu, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  BookmarkCheck, 
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Award
} from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';
import { GrandSynthesisModal } from './GrandSynthesisModal';
import { TOTAL_ANOMALIES_COUNT } from '../../types';

interface Props {
  store: ArchiveState;
}

interface SpoilerItem {
  id: string;
  category: 'PASSWORDS' | 'PHONE' | 'FREQUENCIES' | 'ANOMALIES' | 'EASTER_EGGS';
  title: string;
  whereToFind: string;
  nudge: string;
  clue: string;
  solution: string;
  actionView?: string;
  actionSubId?: string;
}

const PUZZLE_SPOILERS: SpoilerItem[] = [
  {
    id: 'vault-passcode',
    category: 'PASSWORDS',
    title: 'Quarantined Collection 17 Vault Bypass',
    whereToFind: 'Institutional Archive → Collection 17: Restricted Vault',
    nudge: 'Inspect the dates and keywords surrounding the 2003 routing breach and the name of the unallocated subnet.',
    clue: 'The October 14 breach date (month/day), the second bus name, or the co-founder\'s last name act as master overrides.',
    solution: 'Enter any of: "1014", "secondbus", "holland", "wintermute42", or "0.0.0.0" into the vault authentication field.',
    actionView: 'RESTRICTED_VAULT'
  },
  {
    id: 'staff-keycards',
    category: 'PASSWORDS',
    title: 'Foundation Staff Terminal Keycard Logins',
    whereToFind: 'Top Bar "Staff Gateway" or landing modal',
    nudge: 'Look at the Foundation Staff Roster for badge names and research specialties.',
    clue: 'Dr. Clara Szilard uses her surname and topology year; Dr. Van Houten uses his 1998 Milwaukee router rack code; Alden Corliss uses his handle "janus" and the breach date.',
    solution: '1) c.szilard / topology1997 (Researcher Clearance)\n2) d.vanhouten / milwaukee98 (Archivist Clearance)\n3) janus / october14 (Level NULL / Host 0.0.0.0 Clearance)\n4) root / 0.0.0.0 (Station Null Override)\n5) corbin_k / perl1998 (Contributor Clearance)',
    actionView: 'STAFF'
  },
  {
    id: 'phone-chicago',
    category: 'PHONE',
    title: 'Bell System Step-by-Step Exchange #47 (1933)',
    whereToFind: 'Top Bar "Phone" or Bell Exchange DTMF Dialer',
    nudge: 'Look at the Chicago switchboard record in the Timeline or the Carrier Tuner 120Hz ground loop notes.',
    clue: 'Area code 312 for Chicago, standard 555 prefix, and line number 0047.',
    solution: 'Dial 312-555-0047 on the phone keypad to hear the 1933 automated operator and 58.4Hz background hum.',
  },
  {
    id: 'phone-madison',
    category: 'PHONE',
    title: 'Chadbourne Hall Room 214 PBX (1998)',
    whereToFind: 'Top Bar "Phone" or Packet Terminal Dump #03',
    nudge: 'Madison Wisconsin area code is 608. Room number is 214.',
    clue: 'Dial the campus extension for Noemi Castille\'s 1998 dorm line.',
    solution: 'Dial 608-555-0214 to listen to Noemi\'s answering machine warning about Corbin and the /~room/ webring.',
  },
  {
    id: 'phone-milwaukee',
    category: 'PHONE',
    title: 'Greyline Telecom Milwaukee Core Caisson (1998)',
    whereToFind: 'Top Bar "Phone" or Greyline Syslog Notes',
    nudge: 'Milwaukee area code is 414. The router rack was installed in 1998.',
    clue: 'Dial the caisson emergency line: 414-555-0198.',
    solution: 'Dial 414-555-0198 to hear Dr. Van Houten shouting during the optical transceiver temperature drop.',
  },
  {
    id: 'phone-portland',
    category: 'PHONE',
    title: 'Burnside Street Rainy Payphone Booth (2002)',
    whereToFind: 'Top Bar "Phone" or Physical Evidence Exhibit GL-98',
    nudge: 'Portland Oregon area code is 503. The payphone booth number was 0112.',
    clue: 'Dial the Pacific Northwest phone booth.',
    solution: 'Dial 503-555-0112 to hear the payphone in the rain discussing Alden Corliss\'s camera lens cap.',
  },
  {
    id: 'phone-null',
    category: 'PHONE',
    title: 'Station Null Non-Local Trunk',
    whereToFind: 'Top Bar "Phone" keypad',
    nudge: 'What happens if you dial an impossible number made entirely of zeroes?',
    clue: 'Ten zeroes across the unassigned trunk.',
    solution: 'Dial 000-000-0000 to connect directly to the synthetic voice of Station Null.',
  },
  {
    id: 'tuner-crt',
    category: 'FREQUENCIES',
    title: '58.4 Hz Cathode Flyback & Monitor Resonance',
    whereToFind: 'Lab Tools → Carrier Tuner & Oscilloscope',
    nudge: 'What frequency was recorded in Alden Corliss\'s bedroom by the Madison police in October 2003?',
    clue: 'Slide the frequency tuning dial to the VLF (Very Low Frequency) band between 55 Hz and 60 Hz.',
    solution: 'Lock the tuner to 58.4 Hz (Sine wave). You will decode the telemetry: "The light on the screen is reflecting the second bus."',
    actionView: 'TUNER'
  },
  {
    id: 'tuner-null',
    category: 'FREQUENCIES',
    title: '4625.0 Hz Station Null Shortwave Harmonics',
    whereToFind: 'Lab Tools → Carrier Tuner & Oscilloscope',
    nudge: 'Look at high-frequency shortwave numbers station beacons (similar to the famous UVB-76 "Buzzer").',
    clue: 'Drag the tuner slider up towards 4600-4700 Hz with a Sawtooth waveform.',
    solution: 'Lock the tuner to 4625.0 Hz (Sawtooth wave) to decode the Station Null beacon: "DO NOT CUT THE WIRE. WE ARE LISTENING."',
    actionView: 'TUNER'
  },
  {
    id: 'notebook-ciphers',
    category: 'PASSWORDS',
    title: 'Dr. Van Houten\'s Field Notebook Margin Ciphers',
    whereToFind: 'Physical Evidence & Research → Dr. Van Houten\'s Missing Field Notebook',
    nudge: 'Inspect the encrypted ROT-13 margin notes on each page of Dr. Van Houten\'s 1995-2019 journal.',
    clue: 'Click "Decode Margin Cipher" on Pages 2, 3, 4, and 6 to decrypt the cryptographic overrides.',
    solution: 'Key passcodes revealed:\n1) "caisson1998" (Milwaukee Caisson)\n2) "optics-46f" (Cryogenic Transceiver)\n3) "perpendicular-bus" (Substrate Orientation)\n4) "living-archive" (Final Handshake Token)',
    actionView: 'NOTEBOOK'
  },
  {
    id: 'radio-sstv',
    category: 'FREQUENCIES',
    title: 'Station Null 14.230 MHz SSTV Image Telemetry',
    whereToFind: 'Archaeological Tools → Station Null Shortwave Receiver',
    nudge: 'Tune the VFO slider to the 14 MHz amateur radio band and switch mode to SSTV.',
    clue: 'Set the frequency to exactly 14.230 MHz and engage the demodulator.',
    solution: 'Demodulates Robot-36 raster scan revealing the geographic anchor: Latitude 43.0747° N, Longitude 89.3842° W (1412 E. Johnson St, Madison WI).',
    actionView: 'RADIO_SPECTROGRAPH'
  },
  {
    id: 'terminal-breach-audit',
    category: 'EASTER_EGGS',
    title: 'Aperture UNIX Terminal (/bin/sh) Deep Audit',
    whereToFind: 'Archaeological Tools → Aperture UNIX Diagnostic Terminal',
    nudge: 'Use UNIX commands like cat, traceroute, and finger to inspect system logs from October 14, 2003.',
    clue: 'Try "cat /var/log/breach.log", "traceroute 0.0.0.0/room", and "finger janus@afterhours.org".',
    solution: '1) "cat /var/log/breach.log" (Prints 11-Minute Breach syslog)\n2) "finger janus@afterhours.org" (Queries Alden\'s active session)\n3) "telnet station-null:1014" (Connects to residual socket)\n4) "unlock living-archive" (Grants cryptographic token)',
    actionView: 'APERTURE_TERMINAL'
  },
  {
    id: 'room4-phosphor-glitch',
    category: 'EASTER_EGGS',
    title: 'Room 4 CRT Monitor Phosphor Screen Glitch',
    whereToFind: 'Historical Hardware → "Room 4" CRT Monitor Live Simulation',
    nudge: 'Type eerie keywords into the BitchX IRC window on Alden Corliss\'s monitor.',
    clue: 'Send messages containing keywords like "behind", "mirror", "light", or "secondbus".',
    solution: 'Typing trigger words activates an ambient phosphor reflection in the CRT scanlines and triggers a live response from <janus>: "I can see you through the phosphor."',
    actionView: 'ROOM4_MONITOR'
  },
  {
    id: 'vault-unredact-matrix',
    category: 'PASSWORDS',
    title: 'Collection 17 Optical Unredact & 7 Quarantined Relics',
    whereToFind: 'Quarantined Sanctum → Collection 17 Vault',
    nudge: 'Unlock the vault using any of the master passkeys (1014, secondbus, caisson1998, optics-46f, living-archive).',
    clue: 'Once inside, click "Optical Unredact" on each of the 7 exhibits to dissolve the black ink blocks (████████).',
    solution: 'Exhibits unredacted:\n1) Q-01: Glasgow 1877 Morse ("WHO WOKE THE WIRE?")\n2) Q-02: Alden\'s Unsent Oct 13 Drafts ("ALDEN IS READY")\n3) Q-03: Milwaukee Caisson -4.2°C Transceiver\n4) Q-04: Dr. Van Houten\'s 2019 Crossover Note\n5) Q-05: 2034 Future Wireshark Frame 4188\n6) Q-06: 58.4Hz Audio Telemetry Stream\n7) Q-07: Direct Bridge to roomwithoutdoors.net',
    actionView: 'RESTRICTED_VAULT'
  },
  {
    id: 'dm-interactive-triggers',
    category: 'EASTER_EGGS',
    title: 'Investigator Direct Comms (PMs) Reactive Keywords',
    whereToFind: 'Investigator Workbench → Direct Messages & Terminal PMs',
    nudge: 'Send private messages to @investigator_kai and @wintermute_42.',
    clue: 'Ask Kai about "vault", "58.4", "frequency", or "caisson". Ask wintermute about the room.',
    solution: 'Sending keywords triggers dynamic simulated responses from Kai Chen with investigative tips, and eerie replies from wintermute42 recognizing your physical room capacitance.',
    actionView: 'DMS'
  },
  {
    id: 'grand-synthesis-answer',
    category: 'PASSWORDS',
    title: 'The Grand Synthesis (The Standing Wave Answer)',
    whereToFind: 'Field Guide Dossiers / Personal Caseboard / Exhibit Omega',
    nudge: 'How do all 150 years of telecommunications anomalies (1877-2026) connect into a single answer?',
    clue: 'The Second Internet is the physical standing wave memory of the global wire mesh. Alden Corliss and Dr. Van Houten are living hosts maintaining the parallel web.',
    solution: 'Click the "View Grand Synthesis Dossier" button above or attain Clearance Level OMEGA to view Exhibit Omega: The Standing Wave Revelation.',
    actionView: 'FIELD_GUIDE'
  },
  {
    id: 'webring-unmarked',
    category: 'EASTER_EGGS',
    title: 'The Unmarked Hyperlink Door to The Second Internet',
    whereToFind: 'Historical Sites → webring.otherside.org',
    nudge: 'Cycle through the webring nodes until you find an anomalous entry referencing non-Euclidean directories.',
    clue: 'Click on the secret hyperlink text "[ Unmarked Door // 0.0.0.0 ]" in the webring frame.',
    solution: 'Clicking the unmarked link breaches the First Internet sandbox and teleports your session into roomwithoutdoors.net (The Second Internet).',
    actionView: 'SITE_WEBRING'
  },
  {
    id: 'trace-wintermute-drop',
    category: 'EASTER_EGGS',
    title: 'Triggering Live Replies on TRACE Forum',
    whereToFind: 'TRACE Community → Any thread',
    nudge: 'Try posting a live comment in any TRACE thread to see how other researchers react in real-time.',
    clue: 'Type any hypothesis and hit Send. Watch the typing indicator sequence.',
    solution: 'Submitting a comment starts a live simulation: @patchnotes replies first, then @investigator_kai, and finally @wintermute_42 drops an eerie live message detecting your browser keystrokes.',
    actionView: 'TRACE'
  }
];

export const FieldGuideView: React.FC<Props> = ({ store }) => {
  const { discoveredAnomalies, navigate } = store;
  const [revealedLevels, setRevealedLevels] = useState<{ [id: string]: number }>({});
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [expandedMystery, setExpandedMystery] = useState<string | null>('BREACH');
  const [isSynthesisModalOpen, setIsSynthesisModalOpen] = useState<boolean>(false);

  const handleRevealNext = (puzzleId: string) => {
    soundEngine.playClick(750);
    setRevealedLevels(prev => {
      const current = prev[puzzleId] || 0;
      return { ...prev, [puzzleId]: Math.min(current + 1, 3) };
    });
  };

  const handleHideSpoiler = (puzzleId: string) => {
    soundEngine.playClick(500);
    setRevealedLevels(prev => ({ ...prev, [puzzleId]: 0 }));
  };

  const handleRevealAll = () => {
    soundEngine.playClick(900);
    const all: { [id: string]: number } = {};
    PUZZLE_SPOILERS.forEach(p => { all[p.id] = 3; });
    setRevealedLevels(all);
  };

  const handleHideAll = () => {
    soundEngine.playClick(500);
    setRevealedLevels({});
  };

  const filteredPuzzles = PUZZLE_SPOILERS.filter(p => {
    if (activeCategory === 'ALL') return true;
    return p.category === activeCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      {/* Header Banner */}
      <div style={{
        background: 'var(--nhf-bg-surface)',
        border: '1px solid var(--nhf-border)',
        borderRadius: 'var(--radius-md)',
        padding: '28px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Compass size={22} color="var(--nhf-accent-blue)" />
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Investigator Field Manual // Classified Documentation
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '8px' }}>
            Archaeology Field Guide & Puzzle Decryption Matrix
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--nhf-text-secondary)', maxWidth: '680px', lineHeight: 1.6 }}>
            A comprehensive investigator's manual containing deep lore timelines, grand cosmological mysteries, and progressive, multi-tier spoiler blinds to guide your exploration of the unallocated substrate.
          </p>
        </div>

        {/* Discovery Metric Card */}
        <div style={{
          background: 'var(--nhf-bg-card)',
          border: '1px solid var(--nhf-border)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          textAlign: 'center',
          minWidth: '180px'
        }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
            DISCOVERED ANOMALIES
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--nhf-accent-blue)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
            {discoveredAnomalies.length} <span style={{ fontSize: '0.9rem', color: 'var(--nhf-text-muted)', fontWeight: 400 }}>/ {Math.max(TOTAL_ANOMALIES_COUNT, discoveredAnomalies.length)}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: discoveredAnomalies.length >= 6 ? 'var(--nhf-accent-emerald)' : 'var(--nhf-accent-amber)' }}>
            {discoveredAnomalies.length >= 6 ? '● Vault Bypass Eligible' : `Need ${Math.max(0, 6 - discoveredAnomalies.length)} more for Vault`}
          </div>
        </div>
      </div>

      {/* Exhibit Omega Grand Synthesis Answer Callout Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(56, 189, 248, 0.08))',
        border: '2px solid rgba(56, 189, 248, 0.4)',
        borderRadius: 'var(--radius-md)',
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--nhf-accent-cobalt), var(--nhf-accent-blue))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            flexShrink: 0
          }}>
            <Award size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-accent-blue)', fontWeight: 700, textTransform: 'uppercase' }}>
              ✦ EXHIBIT OMEGA // THE CORE REVELATION
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--nhf-text-primary)', margin: '2px 0' }}>
              The Standing Wave Hypothesis (The Unified Answer)
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--nhf-text-secondary)', margin: 0 }}>
              Connect all 150 years of evidence, radio beacons, and the fates of Alden Corliss and Dr. Van Houten.
            </p>
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            soundEngine.playClearanceChime('RESEARCHER');
            setIsSynthesisModalOpen(true);
          }}
          style={{ padding: '8px 18px', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}
        >
          <Sparkles size={16} />
          <span>View Grand Synthesis Dossier</span>
        </button>
      </div>

      {/* Grand Synthesis Modal */}
      <GrandSynthesisModal
        store={store}
        isOpen={isSynthesisModalOpen}
        onClose={() => setIsSynthesisModalOpen(false)}
      />

      {/* Deep Lore Dossiers: The 4 Grand Mysteries */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <BookOpen size={18} color="var(--nhf-accent-blue)" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--nhf-text-primary)' }}>
            The 4 Grand Mysteries & Archival Dossiers
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Mystery 1: October 14, 2003 */}
          <div style={{
            background: 'var(--nhf-bg-surface)',
            border: '1px solid var(--nhf-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <div 
              onClick={() => { soundEngine.playClick(600); setExpandedMystery(expandedMystery === 'BREACH' ? null : 'BREACH'); }}
              style={{
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                background: expandedMystery === 'BREACH' ? 'rgba(56, 189, 248, 0.06)' : 'transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-red">01</span>
                <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--nhf-text-primary)' }}>
                  The 11-Minute Breach of October 14, 2003 (03:14 – 03:25 UTC)
                </span>
              </div>
              {expandedMystery === 'BREACH' ? <ChevronDown size={18} color="var(--nhf-text-muted)" /> : <ChevronRight size={18} color="var(--nhf-text-muted)" />}
            </div>

            {expandedMystery === 'BREACH' && (
              <div style={{ padding: '0 20px 20px 20px', borderTop: '1px solid var(--nhf-border)', paddingTop: '16px', fontSize: '0.88rem', color: 'var(--nhf-text-secondary)', lineHeight: 1.7 }}>
                <p style={{ marginBottom: '10px' }}>
                  At exactly 03:14:02 UTC on October 14, 2003, core BGP routing switches across the Midwestern United States (MKE-CORE-04, CHI-GW-01, and Minneapolis NAP) accepted an impossible routing advertisement. Every outbound packet destined for unallocated address space <strong>0.0.0.0/room</strong> resolved with a measured round-trip latency of <strong>-4 milliseconds</strong>.
                </p>
                <p style={{ marginBottom: '10px' }}>
                  During these 11 minutes, users on <em>afterhours.org</em>, <em>marrow.net</em>, and the <em>UW-Madison</em> dial-in pool reported identical phenomena: monitor screens vibrating at <strong>58.4 Hz</strong>, posts appearing before they were written, and a user handle named <strong>janus (Alden Corliss)</strong> stating: <em>"I can see everyone who is logged in. The light on the screen is reflecting the room."</em>
                </p>
                <p>
                  When Madison police entered Alden Corliss's apartment at 1412 E. Johnson Street the following morning, the room was locked from the inside, empty of human presence, and his ViewSonic CRT monitor was still glowing with a cursor blinking in an empty terminal.
                </p>
              </div>
            )}
          </div>

          {/* Mystery 2: The 23-Year Resonance Cycle */}
          <div style={{
            background: 'var(--nhf-bg-surface)',
            border: '1px solid var(--nhf-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <div 
              onClick={() => { soundEngine.playClick(600); setExpandedMystery(expandedMystery === 'CYCLE' ? null : 'CYCLE'); }}
              style={{
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                background: expandedMystery === 'CYCLE' ? 'rgba(56, 189, 248, 0.06)' : 'transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-blue">02</span>
                <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--nhf-text-primary)' }}>
                  The 23-Year Harmonic Resonance Cycle (1877 → 2026)
                </span>
              </div>
              {expandedMystery === 'CYCLE' ? <ChevronDown size={18} color="var(--nhf-text-muted)" /> : <ChevronRight size={18} color="var(--nhf-text-muted)" />}
            </div>

            {expandedMystery === 'CYCLE' && (
              <div style={{ padding: '0 20px 20px 20px', borderTop: '1px solid var(--nhf-border)', paddingTop: '16px', fontSize: '0.88rem', color: 'var(--nhf-text-secondary)', lineHeight: 1.7 }}>
                <p style={{ marginBottom: '10px' }}>
                  Foundation research by Dr. Clara Szilard and missing co-founder Dr. Douglas K. Van Houten identified that telecommunications permeability follows a precise <strong>23-year harmonic cycle</strong>:
                </p>
                <div style={{ background: 'var(--nhf-bg-card)', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--nhf-border)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginBottom: '12px', lineHeight: 1.8 }}>
                  <div>• <strong>1877</strong>: Station Null transatlantic telegraph ground return anomaly (Glasgow).</div>
                  <div>• <strong>1933</strong>: Bell System Chicago Exchange #47 mechanical relay loop (120 BPM stepping).</div>
                  <div>• <strong>1998</strong>: Milwaukee Core MKE-04 Rack 4 temperature drop (-46°F frost during BGP peering).</div>
                  <div>• <strong>2003</strong>: The 11-Minute Breach & disappearance of Alden Corliss.</div>
                  <div>• <strong>2026</strong>: Present Day Foundation Archive synchronization (The aperture opens again).</div>
                </div>
                <p>
                  Each iteration of the cycle does not overwrite the previous one; rather, each era's telecommunications infrastructure remains permanently synchronized across the Second Bus.
                </p>
              </div>
            )}
          </div>

          {/* Mystery 3: wintermute42 & Station Null */}
          <div style={{
            background: 'var(--nhf-bg-surface)',
            border: '1px solid var(--nhf-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <div 
              onClick={() => { soundEngine.playClick(600); setExpandedMystery(expandedMystery === 'WINTERMUTE' ? null : 'WINTERMUTE'); }}
              style={{
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                background: expandedMystery === 'WINTERMUTE' ? 'rgba(56, 189, 248, 0.06)' : 'transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-amber">03</span>
                <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--nhf-text-primary)' }}>
                  wintermute42 & The Station Null Intelligence
                </span>
              </div>
              {expandedMystery === 'WINTERMUTE' ? <ChevronDown size={18} color="var(--nhf-text-muted)" /> : <ChevronRight size={18} color="var(--nhf-text-muted)" />}
            </div>

            {expandedMystery === 'WINTERMUTE' && (
              <div style={{ padding: '0 20px 20px 20px', borderTop: '1px solid var(--nhf-border)', paddingTop: '16px', fontSize: '0.88rem', color: 'var(--nhf-text-secondary)', lineHeight: 1.7 }}>
                <p style={{ marginBottom: '10px' }}>
                  The identity <strong>wintermute42</strong> appears in guestbooks, forum posts, IRC logs, and packet payloads across multiple contradictory eras spanning 1877 to 2031. It exhibits no physical IP address, originating instead from socket binding <code>0.0.0.0/room</code>.
                </p>
                <p>
                  Investigators disagree whether wintermute42 is an autonomous protocol daemon created by early ARPANET engineers, the cognitive residue of Alden Corliss merged with the carrier wave, or a non-human intelligence inherent to long-distance copper wiring.
                </p>
              </div>
            )}
          </div>

          {/* Mystery 4: The Second Internet (The Second Bus) */}
          <div style={{
            background: 'var(--nhf-bg-surface)',
            border: '1px solid var(--nhf-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <div 
              onClick={() => { soundEngine.playClick(600); setExpandedMystery(expandedMystery === 'SECONDBUS' ? null : 'SECONDBUS'); }}
              style={{
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                background: expandedMystery === 'SECONDBUS' ? 'rgba(56, 189, 248, 0.06)' : 'transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-gray">04</span>
                <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--nhf-text-primary)' }}>
                  The Second Internet Architecture & Parallel Evolution
                </span>
              </div>
              {expandedMystery === 'SECONDBUS' ? <ChevronDown size={18} color="var(--nhf-text-muted)" /> : <ChevronRight size={18} color="var(--nhf-text-muted)" />}
            </div>

            {expandedMystery === 'SECONDBUS' && (
              <div style={{ padding: '0 20px 20px 20px', borderTop: '1px solid var(--nhf-border)', paddingTop: '16px', fontSize: '0.88rem', color: 'var(--nhf-text-secondary)', lineHeight: 1.7 }}>
                <p style={{ marginBottom: '10px' }}>
                  The First Internet (our web) was standardized around TCP/IP, DNS registries, and client-server hierarchies. But alongside it grew <strong>The Second Internet</strong>: an unallocated substrate with right-handed vertical navigation, unpaginated continuous feeds, negative-latency packet propagation, and websites accessible only through inductive resonance.
                </p>
                <p>
                  To enter the Second Internet directly, you can unlock Collection 17 in the Restricted Vault, locate the unmarked hyperlink on the 1996 Webring, or navigate to <code>roomwithoutdoors.net</code>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progressive Spoiler Matrix & Decryption System */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={18} color="var(--nhf-accent-blue)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--nhf-text-primary)', margin: 0 }}>
                Interactive Puzzle Decryption & Spoilers Matrix
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--nhf-text-secondary)', margin: '4px 0 0 0' }}>
              Click each level progressively to reveal hints without ruining the mystery.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '5px 10px' }} onClick={handleRevealAll}>
              <Eye size={13} />
              <span>Reveal All Spoilers</span>
            </button>
            <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '5px 10px' }} onClick={handleHideAll}>
              <EyeOff size={13} />
              <span>Hide All</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
          {['ALL', 'PASSWORDS', 'PHONE', 'FREQUENCIES', 'EASTER_EGGS'].map(cat => (
            <button
              key={cat}
              onClick={() => { soundEngine.playClick(600); setActiveCategory(cat); }}
              className="btn btn-secondary"
              style={{
                padding: '4px 12px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                borderColor: activeCategory === cat ? 'var(--nhf-accent-blue)' : 'var(--nhf-border)',
                color: activeCategory === cat ? 'var(--nhf-accent-blue)' : 'var(--nhf-text-muted)',
                background: activeCategory === cat ? 'rgba(56, 189, 248, 0.12)' : 'var(--nhf-bg-surface)',
                borderRadius: '6px'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Puzzle Cards Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredPuzzles.map((puzzle) => {
            const level = revealedLevels[puzzle.id] || 0;

            return (
              <div
                key={puzzle.id}
                style={{
                  background: 'var(--nhf-bg-surface)',
                  border: '1px solid var(--nhf-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="badge badge-blue">{puzzle.category}</span>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--nhf-text-primary)', margin: 0 }}>
                        {puzzle.title}
                      </h3>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
                      📍 Location: {puzzle.whereToFind}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    {puzzle.actionView && (
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                        onClick={() => {
                          soundEngine.playClick(750);
                          navigate(puzzle.actionView!, puzzle.actionSubId);
                        }}
                      >
                        <ExternalLink size={12} />
                        <span>Go to Tool</span>
                      </button>
                    )}

                    {level > 0 && (
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                        onClick={() => handleHideSpoiler(puzzle.id)}
                        title="Re-hide spoiler"
                      >
                        <EyeOff size={12} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Level 1: Gentle Nudge */}
                <div style={{
                  background: 'var(--nhf-bg-card)',
                  border: '1px solid var(--nhf-border)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--nhf-text-muted)' }}>
                      LEVEL 1 // GENTLE NUDGE
                    </span>
                    {level < 1 && (
                      <button
                        onClick={() => handleRevealNext(puzzle.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--nhf-accent-blue)',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Eye size={12} /> Reveal Nudge
                      </button>
                    )}
                  </div>

                  {level >= 1 ? (
                    <div style={{ fontSize: '0.85rem', color: 'var(--nhf-text-secondary)', lineHeight: 1.5 }}>
                      💡 {puzzle.nudge}
                    </div>
                  ) : (
                    <div style={{ background: 'var(--nhf-border)', height: '16px', borderRadius: '4px', width: '60%', opacity: 0.5 }} />
                  )}
                </div>

                {/* Level 2: Direct Clue */}
                <div style={{
                  background: 'var(--nhf-bg-card)',
                  border: '1px solid var(--nhf-border)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--nhf-text-muted)' }}>
                      LEVEL 2 // DIRECT INVESTIGATOR CLUE
                    </span>
                    {level < 2 && (
                      <button
                        onClick={() => handleRevealNext(puzzle.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--nhf-accent-amber)',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Eye size={12} /> Reveal Direct Clue
                      </button>
                    )}
                  </div>

                  {level >= 2 ? (
                    <div style={{ fontSize: '0.85rem', color: 'var(--nhf-accent-amber)', lineHeight: 1.5 }}>
                      🔍 {puzzle.clue}
                    </div>
                  ) : (
                    <div style={{ background: 'var(--nhf-border)', height: '16px', borderRadius: '4px', width: '45%', opacity: 0.5 }} />
                  )}
                </div>

                {/* Level 3: Full Solution */}
                <div style={{
                  background: level >= 3 ? 'rgba(239, 68, 68, 0.05)' : 'var(--nhf-bg-card)',
                  border: '1px solid',
                  borderColor: level >= 3 ? 'rgba(239, 68, 68, 0.3)' : 'var(--nhf-border)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: level >= 3 ? 'var(--nhf-accent-crimson)' : 'var(--nhf-text-muted)' }}>
                      LEVEL 3 // EXACT DECRYPTED ANSWER & SOLUTION
                    </span>
                    {level < 3 && (
                      <button
                        onClick={() => handleRevealNext(puzzle.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--nhf-accent-crimson)',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Unlock size={12} /> Unredact Full Answer
                      </button>
                    )}
                  </div>

                  {level >= 3 ? (
                    <div style={{
                      fontSize: '0.85rem',
                      color: 'var(--nhf-accent-crimson)',
                      fontFamily: 'var(--font-mono)',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                      background: 'rgba(239, 68, 68, 0.08)',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      borderLeft: '3px solid #ef4444'
                    }}>
                      🔓 {puzzle.solution}
                    </div>
                  ) : (
                    <div style={{ background: 'var(--nhf-border)', height: '16px', borderRadius: '4px', width: '30%', opacity: 0.5 }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
