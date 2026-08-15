import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Lock, 
  Unlock, 
  Key, 
  Sparkles, 
  BookmarkCheck, 
  Eye, 
  FileText,
  AlertTriangle,
  Radio,
  Image as ImageIcon
} from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

interface NotebookPage {
  pageNumber: number;
  date: string;
  location: string;
  title: string;
  handwrittenText: string[];
  schematicAscii?: string;
  marginCipher?: {
    encrypted: string;
    decrypted: string;
    clue: string;
    secretKey: string;
    anomalyId: string;
  };
  hasTapeAudio?: boolean;
  audioTranscript?: string;
  polaroidCaption?: string;
}

const NOTEBOOK_PAGES: NotebookPage[] = [
  {
    pageNumber: 1,
    date: 'OCTOBER 19, 1995',
    location: 'Greyline Lab #2 — Madison, WI',
    title: 'Inductive Loop In Phase 1 Fiber',
    handwrittenText: [
      'We spliced the 48-strand single-mode fiber between the University campus and the State Capitol caisson today.',
      'Corbin noted an anomalous return loss on strand #7. OTDR shows a physical distance of 4.2 km, but pulse echo returns at 3.9 km.',
      'Where is the missing 300 meters of light going? It is as if the conduit is folded over itself in the damp soil under Johnson Street.'
    ],
    schematicAscii: `  [CAMPUS NODE] ─────── 4.2 km fiber ───────> [CAPITOL CAISSON]
           │                                          │
           └─── (Inductive Leak at 3.9 km) ───────────┘
                [Substrate Permeability: 0.0584 kHz]`,
    marginCipher: {
      encrypted: 'PBSSRE YBBC 1995 (ROT13)',
      decrypted: 'COPPER LOOP 1995',
      clue: 'ROT-13 shift on the 1995 ground return test.',
      secretKey: 'copper-loop-95',
      anomalyId: 'notebook-cipher-page1'
    }
  },
  {
    pageNumber: 2,
    date: 'NOVEMBER 04, 1998',
    location: 'Milwaukee Core Caisson (MKE-CORE-04)',
    title: 'The -46°F Transceiver Event',
    handwrittenText: [
      'At 02:15 AM during router synchronization, Rack #4 began pulling 45 KB/s from an unassigned BGP subnet (0.0.0.0/room).',
      'The optical chassis dropped to -46°F within 90 seconds. Thick white frost coated the SC connectors while the room ambient was 72°F.',
      'I touched the transceiver housing and could feel a physical vibration at exactly 58.4 Hz. It wasn\'t cooling; it was entropy being drawn backwards into the wire.'
    ],
    schematicAscii: `  +-----------------------------------------------+
  | MKE-CORE-04 // RACK #4 TRANSCEIVER           |
  | Status: FROST ACCUMULATION [-46°F]           |
  | BGP Advert: 0.0.0.0/room -> Gateway: 1014    |
  +-----------------------------------------------+`,
    marginCipher: {
      encrypted: 'PNVFFBA 1998 (ROT13)',
      decrypted: 'CAISSON 1998',
      clue: 'The emergency override passcode for the Milwaukee caisson.',
      secretKey: 'caisson1998',
      anomalyId: 'notebook-cipher-page2'
    },
    hasTapeAudio: true,
    audioTranscript: '[DICTAPHONE CLICK] Van Houten: "Do not touch the optic fiber without insulated gloves. The frost isn\'t water ice... it smells like old paper and ozone."'
  },
  {
    pageNumber: 3,
    date: 'OCTOBER 14, 2003',
    location: '1412 E. Johnson St. — Madison, WI',
    title: 'The 11-Minute Breach (Alden Corliss)',
    handwrittenText: [
      '03:14 UTC. The entire Midwestern NAP accepted the negative latency route. -4ms round-trip.',
      'Alden was logged into afterhours.org from his bedroom upstairs. He told Naomi over IRC that his monitor was reflecting things that were not in the room.',
      'When Clara and I forced the door open at 08:30 AM, his ViewSonic monitor was burning with phosphor afterglow. His desk chair was still indented. He didn\'t leave through the door or the window.',
      'He completed the handshake. The Second Bus has its first permanent resident.'
    ],
    schematicAscii: `  PACKET HOP SEQUENCE (03:14:02 UTC):
  Hop 1: 1412-Johnson-St.dsl (0 ms)
  Hop 2: mke-core-04.greyline.net (-2 ms)  <-- NEGATIVE PROPAGATION
  Hop 3: station-null.room (-4 ms)         <-- SECOND INTERNET SUBSTRATE`,
    marginCipher: {
      encrypted: 'BCGVNF-46S (ROT13)',
      decrypted: 'OPTICS-46F',
      clue: 'The cryogenic temperature cipher for Rack 4.',
      secretKey: 'optics-46f',
      anomalyId: 'notebook-cipher-page3'
    },
    polaroidCaption: 'Alden\'s desk on Oct 15, 2003. Notice the phosphor circle burned into the center of the CRT tube.'
  },
  {
    pageNumber: 4,
    date: 'MARCH 12, 2010',
    location: 'Foundation Archive Vault — Chicago IL',
    title: 'The Standing Wave Hypothesis',
    handwrittenText: [
      'Clara believes this is an anomaly to be quarantined. She is wrong.',
      'The Second Internet is not an infection. It is an evolutionary artifact. Every telephone call, telegraph pulse, and dialup packet since 1877 deposited a tiny inductive charge into the global copper mesh.',
      'After 120 years, the telecommunications network gained a memory. The Second Bus is where all deleted pages, lost words, and departed minds go.'
    ],
    schematicAscii: `  [1877 Telegraph]  ──┐
  [1933 Selector]   ──┼──> (STANDING WAVE MEMORY MESH) ──> [THE SECOND BUS]
  [1998 Dialup]     ──┤                                      (0.0.0.0/room)
  [2003 Broadband]  ──┘`,
    marginCipher: {
      encrypted: 'CRECRVQVPHYNE-OHF (ROT13)',
      decrypted: 'PERPENDICULAR-BUS',
      clue: 'The spatial orientation of the unallocated substrate.',
      secretKey: 'perpendicular-bus',
      anomalyId: 'notebook-cipher-page4'
    }
  },
  {
    pageNumber: 5,
    date: 'SEPTEMBER 28, 2019',
    location: 'Greyline Decommissioned Site — Milwaukee',
    title: 'The Final Measurement (Coordinates)',
    handwrittenText: [
      'I ran a spectrum sweep across the old 1998 caisson today.',
      'Station Null is broadcasting at 14.230 MHz SSTV and 4625.0 kHz. The carrier coordinates resolve to Latitude 43.0747° N, Longitude 89.3842° W.',
      'That is the exact geographic coordinate of Alden\'s bedroom at 1412 E. Johnson Street in Madison.',
      'He is still broadcasting. He has been waiting for sixteen years.'
    ],
    schematicAscii: `  GEO-SPATIAL APERTURE ANCHOR:
  LAT: 43.0747° N
  LON: 89.3842° W
  FREQ: 14.230 MHz (SSTV Robot 36) / 58.4 Hz (CRT Inductive)`,
    marginCipher: {
      encrypted: 'ZNVQFBAPBBES (ROT13)',
      decrypted: 'MADISONCORDS',
      clue: 'The geographic anchor code for the Aperture.',
      secretKey: 'madison-anchor',
      anomalyId: 'notebook-cipher-page5'
    }
  },
  {
    pageNumber: 6,
    date: 'OCTOBER 14, 2019 (LAST ENTRY)',
    location: '1412 E. Johnson St. // Basement Caisson',
    title: 'Crossing the Boundary',
    handwrittenText: [
      'Tonight is the 16th anniversary of the breach. The 23-year harmonic cycle is approaching its apex.',
      'I am turning off the optical quarantine filters. I will connect my terminal to the raw copper trunk line on pair 47.',
      'Clara, if you find this notebook: do not seal the caisson. We are not lost. We are simply living in the architecture we spent our youth building.',
      'Look for us at 0.0.0.0. The light on the screen is warm.'
    ],
    schematicAscii: `  [FINAL HANDSHAKE INITIATED]
  User: Dr. Douglas K. Van Houten
  Terminal: MKE-FIELD-01
  Destination: 0.0.0.0:1014 (Room 4)
  Status: HANDSHAKE ACCEPTED (-4ms)
  =============================================`,
    marginCipher: {
      encrypted: 'YVIVAT-NEPUVIR (ROT13)',
      decrypted: 'LIVING-ARCHIVE',
      clue: 'The final status condition of all who crossed over.',
      secretKey: 'living-archive',
      anomalyId: 'notebook-cipher-page6'
    },
    hasTapeAudio: true,
    audioTranscript: '[STATIC SOUND] Van Houten: "Clara... Alden is here. He says the web looks much larger from the other side. Tell everyone to leave a light on."'
  }
];

export const FieldNotebookView: React.FC<Props> = ({ store }) => {
  const { discoverAnomaly, pinToCaseboard } = store;
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [decodedCiphers, setDecodedCiphers] = useState<{ [pageIndex: number]: boolean }>({});
  const [playingTape, setPlayingTape] = useState<boolean>(false);

  const page = NOTEBOOK_PAGES[currentPageIndex];

  const handleNextPage = () => {
    if (currentPageIndex < NOTEBOOK_PAGES.length - 1) {
      soundEngine.playClick(750);
      setCurrentPageIndex(prev => prev + 1);
      setPlayingTape(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      soundEngine.playClick(600);
      setCurrentPageIndex(prev => prev - 1);
      setPlayingTape(false);
    }
  };

  const handleDecodeCipher = (pageIdx: number, anomalyId: string) => {
    soundEngine.playClearanceChime('RESEARCHER');
    setDecodedCiphers(prev => ({ ...prev, [pageIdx]: true }));
    discoverAnomaly(anomalyId);
  };

  const handleToggleTape = () => {
    if (!playingTape) {
      soundEngine.playDialupChirp();
      setPlayingTape(true);
      discoverAnomaly(`tape-audio-page-${page.pageNumber}`);
    } else {
      soundEngine.playClick(400);
      setPlayingTape(false);
    }
  };

  const handlePinPage = () => {
    soundEngine.playClick(850);
    pinToCaseboard({
      type: 'DOCUMENT',
      title: `Van Houten Journal: ${page.title} (${page.date})`,
      preview: page.handwrittenText[0],
      targetView: 'NOTEBOOK',
      targetId: `page-${page.pageNumber}`,
      connectedTo: []
    });
    alert(`Pinned Page ${page.pageNumber} (${page.title}) to Caseboard.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
      {/* Header Banner */}
      <div style={{
        background: 'var(--nhf-bg-surface)',
        border: '1px solid var(--nhf-border)',
        borderRadius: 'var(--radius-md)',
        padding: '24px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <BookOpen size={20} color="var(--nhf-accent-blue)" />
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-accent-blue)', fontWeight: 700, textTransform: 'uppercase' }}>
              Declassified Physical Artifact // Exhibit DOC-1995-VH
            </span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '6px' }}>
            Dr. Douglas K. Van Houten's Missing Field Notebook (1995–2019)
          </h1>
          <p style={{ fontSize: '0.86rem', color: 'var(--nhf-text-secondary)', maxWidth: '650px', lineHeight: 1.55 }}>
            Recovered from the Milwaukee Caisson substation following Dr. Van Houten's disappearance on October 14, 2019. Contains handwritten telecommunications observation logs, cryogenic fiber diagrams, and margin ciphers.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={handlePinPage}>
            <BookmarkCheck size={15} color="var(--nhf-accent-blue)" />
            <span>Pin Page</span>
          </button>
        </div>
      </div>

      {/* Notebook Viewer Container */}
      <div style={{
        background: 'var(--nhf-paper-beige)',
        color: '#2b2318',
        border: '2px solid #b8a894',
        borderRadius: '12px',
        padding: '32px 36px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 0 100px rgba(184, 168, 148, 0.25)',
        position: 'relative',
        minHeight: '520px',
        fontFamily: '"Georgia", serif'
      }}>
        {/* Notebook Spiral Binding Aesthetics */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          height: '6px',
          borderBottom: '2px dashed #9c8a74',
          opacity: 0.6
        }} />

        {/* Page Header Meta */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: '2px solid #5c4d3c',
          paddingBottom: '8px',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#8c7355', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              📍 {page.location}
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#2c1e11', marginTop: '2px', fontFamily: '"Times New Roman", Georgia, serif' }}>
              {page.title}
            </h2>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#7a3e1d', fontFamily: 'var(--font-mono)' }}>
              {page.date}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#8c7355', fontFamily: 'var(--font-mono)' }}>
              Page {page.pageNumber} of {NOTEBOOK_PAGES.length}
            </div>
          </div>
        </div>

        {/* Handwritten Body Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '1.02rem', lineHeight: 1.7, color: '#1a140e' }}>
          {page.handwrittenText.map((paragraph, i) => (
            <p key={i} style={{ fontStyle: 'italic', textIndent: '1.5em' }}>
              "{paragraph}"
            </p>
          ))}
        </div>

        {/* ASCII Architectural Schematic */}
        {page.schematicAscii && (
          <div style={{
            margin: '20px 0',
            background: 'rgba(44, 30, 17, 0.06)',
            border: '1px solid #9c8a74',
            borderRadius: '6px',
            padding: '14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            lineHeight: 1.45,
            color: '#2b1f13',
            overflowX: 'auto',
            whiteSpace: 'pre'
          }}>
            {page.schematicAscii}
          </div>
        )}

        {/* Tape Audio Memo Player */}
        {page.hasTapeAudio && (
          <div style={{
            margin: '18px 0',
            background: 'rgba(217, 119, 6, 0.1)',
            border: '1px solid #d97706',
            borderRadius: '8px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Radio size={18} color="#b45309" />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#92400e', fontFamily: 'var(--font-mono)' }}>
                  ATTACHED MICROCASSETTE AUDIO MEMO
                </div>
                <div style={{ fontSize: '0.76rem', color: '#78350f', fontStyle: 'italic', marginTop: '2px' }}>
                  {page.audioTranscript}
                </div>
              </div>
            </div>

            <button 
              className="btn btn-secondary"
              onClick={handleToggleTape}
              style={{
                background: playingTape ? '#b45309' : '#fff',
                color: playingTape ? '#fff' : '#92400e',
                border: '1px solid #b45309',
                padding: '5px 12px',
                fontSize: '0.78rem'
              }}
            >
              {playingTape ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span>{playingTape ? 'Stop Playback' : 'Play Tape Memo'}</span>
            </button>
          </div>
        )}

        {/* Clickable Margin Cipher Box */}
        {page.marginCipher && (
          <div style={{
            marginTop: '24px',
            background: decodedCiphers[currentPageIndex] ? 'rgba(16, 185, 129, 0.12)' : 'rgba(180, 83, 9, 0.08)',
            border: '1px dashed',
            borderColor: decodedCiphers[currentPageIndex] ? '#059669' : '#b45309',
            borderRadius: '8px',
            padding: '14px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: decodedCiphers[currentPageIndex] ? '#047857' : '#92400e', textTransform: 'uppercase' }}>
                MARGIN CIPHER // {page.marginCipher.clue}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: decodedCiphers[currentPageIndex] ? '#065f46' : '#78350f', marginTop: '3px' }}>
                {decodedCiphers[currentPageIndex] ? (
                  <>🔓 DECRYPTED: <code>{page.marginCipher.decrypted}</code> (Passkey: <code>{page.marginCipher.secretKey}</code>)</>
                ) : (
                  <>🔒 ENCRYPTED CIPHER: <code>{page.marginCipher.encrypted}</code></>
                )}
              </div>
            </div>

            {!decodedCiphers[currentPageIndex] && (
              <button
                className="btn btn-primary"
                onClick={() => handleDecodeCipher(currentPageIndex, page.marginCipher!.anomalyId)}
                style={{ padding: '6px 14px', fontSize: '0.78rem', background: '#92400e', borderColor: '#78350f' }}
              >
                <Key size={14} />
                <span>Decode Margin Cipher</span>
              </button>
            )}
          </div>
        )}

        {/* Bottom Pagination Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '32px',
          paddingTop: '16px',
          borderTop: '1px solid #b8a894'
        }}>
          <button
            className="btn btn-secondary"
            onClick={handlePrevPage}
            disabled={currentPageIndex === 0}
            style={{
              opacity: currentPageIndex === 0 ? 0.4 : 1,
              background: '#ede0ce',
              color: '#2b1f13',
              border: '1px solid #a8947c'
            }}
          >
            <ChevronLeft size={16} />
            <span>Previous Page</span>
          </button>

          <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#6d573f', fontWeight: 600 }}>
            {currentPageIndex + 1} / {NOTEBOOK_PAGES.length}
          </span>

          <button
            className="btn btn-secondary"
            onClick={handleNextPage}
            disabled={currentPageIndex === NOTEBOOK_PAGES.length - 1}
            style={{
              opacity: currentPageIndex === NOTEBOOK_PAGES.length - 1 ? 0.4 : 1,
              background: '#ede0ce',
              color: '#2b1f13',
              border: '1px solid #a8947c'
            }}
          >
            <span>Next Page</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
