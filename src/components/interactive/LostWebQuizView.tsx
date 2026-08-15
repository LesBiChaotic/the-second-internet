import React, { useState } from 'react';
import { HelpCircle, Sparkles, ArrowRight, RefreshCw, BookmarkPlus, ExternalLink, CheckCircle2, Radio, User, Compass, Zap } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

interface Question {
  id: number;
  question: string;
  subtext: string;
  options: {
    label: string;
    description: string;
    points: {
      DIARIST: number;
      HARDWARE: number;
      CARRIER: number;
      CARTOGRAPHER: number;
      SKEPTIC: number;
    };
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "It is 03:15 AM on a chilly autumn night in 1999. What is glowing on your cathode monitor?",
    subtext: "The streetlamps outside are silent. Choose your nocturnal habit.",
    options: [
      {
        label: "An empty LiveJournal / Blue Window textbox with a blinking green cursor.",
        description: "Writing down memories of conversations before they evaporate in the morning.",
        points: { DIARIST: 3, HARDWARE: 0, CARRIER: 1, CARTOGRAPHER: 1, SKEPTIC: 0 }
      },
      {
        label: "A raw terminal disassembly of a Linux kernel BGP routing table.",
        description: "Tracing why packets to the unallocated Milwaukee subnet keep returning with negative ping.",
        points: { DIARIST: 0, HARDWARE: 3, CARRIER: 1, CARTOGRAPHER: 0, SKEPTIC: 2 }
      },
      {
        label: "A Winamp 2.91 playlist looping shortwave frequencies while you listen to the room hum.",
        description: "Waiting for the monitor's flyback transformer to sync with the distant telephone exchange.",
        points: { DIARIST: 1, HARDWARE: 0, CARRIER: 3, CARTOGRAPHER: 1, SKEPTIC: 0 }
      },
      {
        label: "A sprawling webring link-list with 400 nested Geocities bookmarks.",
        description: "Indexing personal homepages that have no outward links before they get 404ed forever.",
        points: { DIARIST: 1, HARDWARE: 1, CARRIER: 0, CARTOGRAPHER: 3, SKEPTIC: 0 }
      },
      {
        label: "An Apache error log cross-referenced against MySQL replication race conditions.",
        description: "Proving that all recorded 'ghosts' are just unhandled socket timeouts in CGI scripts.",
        points: { DIARIST: 0, HARDWARE: 1, CARRIER: 0, CARTOGRAPHER: 0, SKEPTIC: 3 }
      }
    ]
  },
  {
    id: 2,
    question: "Your 56k dial-up connection drops at 99% of a 14-hour download. What is your immediate reaction?",
    subtext: "The USRobotics modem clicks into static silence.",
    options: [
      {
        label: "I write a 3,000-word melancholic diary entry about the transient nature of modern data.",
        description: "The feeling of loss is more interesting than the file itself.",
        points: { DIARIST: 3, HARDWARE: 0, CARRIER: 1, CARTOGRAPHER: 0, SKEPTIC: 0 }
      },
      {
        label: "I pick up the telephone handset to listen if the carrier tone is still alive on the physical copper pair.",
        description: "There's always residual voltage if you listen closely enough.",
        points: { DIARIST: 0, HARDWARE: 2, CARRIER: 3, CARTOGRAPHER: 0, SKEPTIC: 0 }
      },
      {
        label: "I inspect the partial hex dump in the temp cache to see what was reconstructed before the drop.",
        description: "You can learn more from corrupted fragments than finished archives.",
        points: { DIARIST: 0, HARDWARE: 3, CARRIER: 0, CARTOGRAPHER: 1, SKEPTIC: 2 }
      },
      {
        label: "I document the drop in my notebook and map the geographic phone trunk route through Chicago.",
        description: "Every dropped line is a node on an unmapped telecommunications topology.",
        points: { DIARIST: 0, HARDWARE: 1, CARRIER: 1, CARTOGRAPHER: 3, SKEPTIC: 1 }
      },
      {
        label: "I file an outage ticket with the ISP and measure the line signal-to-noise ratio in decibels.",
        description: "It's not mysterious; it's copper oxidation on the pole down the street.",
        points: { DIARIST: 0, HARDWARE: 1, CARRIER: 0, CARTOGRAPHER: 0, SKEPTIC: 3 }
      }
    ]
  },
  {
    id: 3,
    question: "You click a broken link in an abandoned 1997 webring. The page loads with an exact description of your room. What do you do?",
    subtext: "The page timestamp matches the current minute.",
    options: [
      {
        label: "I type a reply into the guestbook: 'I am here. Who is on the other side?'",
        description: "If there is someone looking through the glass, I want to talk to them.",
        points: { DIARIST: 3, HARDWARE: 0, CARRIER: 2, CARTOGRAPHER: 1, SKEPTIC: 0 }
      },
      {
        label: "I turn off the lamp and sit in the blue glow to match the description.",
        description: "Alden said the screen is the only window left.",
        points: { DIARIST: 1, HARDWARE: 0, CARRIER: 3, CARTOGRAPHER: 1, SKEPTIC: 0 }
      },
      {
        label: "I open the browser developer tools to trace the IP header and DNS resolver.",
        description: "Someone is running an active reverse proxy with browser canvas fingerprinting.",
        points: { DIARIST: 0, HARDWARE: 1, CARRIER: 0, CARTOGRAPHER: 1, SKEPTIC: 3 }
      },
      {
        label: "I take a 35mm photograph of the screen and save the raw HTML source to a 3.5-inch floppy disk.",
        description: "Physical preservation is the only hedge against topological erasure.",
        points: { DIARIST: 1, HARDWARE: 3, CARRIER: 0, CARTOGRAPHER: 2, SKEPTIC: 0 }
      },
      {
        label: "I trace the webring forward and backward to see which other personal sites are entangled.",
        description: "A loop with no entrance must have an exit somewhere.",
        points: { DIARIST: 0, HARDWARE: 0, CARRIER: 1, CARTOGRAPHER: 3, SKEPTIC: 1 }
      }
    ]
  },
  {
    id: 4,
    question: "An old telecommunications building in your city is slated for demolition next week. What do you do?",
    subtext: "The basement holds forty years of step-by-step telephone switches.",
    options: [
      {
        label: "I explore the basement at midnight to rescue magnetic tapes, binders, and circuit boards from the dumpster.",
        description: "Hardware archaeology is the purest form of historical recovery.",
        points: { DIARIST: 0, HARDWARE: 3, CARRIER: 1, CARTOGRAPHER: 1, SKEPTIC: 1 }
      },
      {
        label: "I photograph the brick exterior at twilight on high-grain black-and-white film.",
        description: "Capturing the architecture before it becomes an unindexed parking lot.",
        points: { DIARIST: 2, HARDWARE: 0, CARRIER: 0, CARTOGRAPHER: 3, SKEPTIC: 0 }
      },
      {
        label: "I plug a test handset into the exterior punch-down block to hear the dead dial tone.",
        description: "The line never really empties out; it just carries yesterday's echo.",
        points: { DIARIST: 0, HARDWARE: 1, CARRIER: 3, CARTOGRAPHER: 1, SKEPTIC: 0 }
      },
      {
        label: "I interview the retired switchboard operators about the 1933 Chicago Exchange #47 incident.",
        description: "Oral histories carry the human grief that doesn't fit into technical schematics.",
        points: { DIARIST: 3, HARDWARE: 0, CARRIER: 1, CARTOGRAPHER: 2, SKEPTIC: 0 }
      },
      {
        label: "I cross-reference the city tax records and telecom deregulation filings to explain the closure.",
        description: "Capital consolidation and fiber modernization explain 100% of abandoned infrastructure.",
        points: { DIARIST: 0, HARDWARE: 1, CARRIER: 0, CARTOGRAPHER: 0, SKEPTIC: 3 }
      }
    ]
  },
  {
    id: 5,
    question: "Which sound provides you with the deepest sense of nocturnal comfort?",
    subtext: "The world outside is asleep.",
    options: [
      {
        label: "The rhythmic clatter of mechanical Cherry MX keys writing into a private journal.",
        description: "The sound of thoughts being crystallized onto glass.",
        points: { DIARIST: 3, HARDWARE: 0, CARRIER: 1, CARTOGRAPHER: 0, SKEPTIC: 0 }
      },
      {
        label: "The 58.4Hz low sine hum vibrating the plastic casing of a 19-inch CRT monitor.",
        description: "The resonance that connects Midwestern bedroom computers to the Second Bus.",
        points: { DIARIST: 0, HARDWARE: 0, CARRIER: 3, CARTOGRAPHER: 1, SKEPTIC: 0 }
      },
      {
        label: "The whirr of a 9-track open-reel magnetic tape drive seeking a data block in a cold room.",
        description: "The tangible weight of forty gigabytes of lost history.",
        points: { DIARIST: 0, HARDWARE: 3, CARRIER: 1, CARTOGRAPHER: 1, SKEPTIC: 1 }
      },
      {
        label: "Rain falling on the metal roof of a Portland payphone booth at 3:00 AM.",
        description: "The boundary between the physical street and the unmapped network.",
        points: { DIARIST: 2, HARDWARE: 0, CARRIER: 1, CARTOGRAPHER: 3, SKEPTIC: 0 }
      },
      {
        label: "The steady hum of dual server fans in an orderly, well-maintained rack with zero packet loss.",
        description: "The peace of a system operating strictly within standard RFC specifications.",
        points: { DIARIST: 0, HARDWARE: 1, CARRIER: 0, CARTOGRAPHER: 0, SKEPTIC: 3 }
      }
    ]
  }
];

interface ArchetypeResult {
  id: string;
  name: string;
  tagline: string;
  badgeColor: 'blue' | 'amber' | 'red' | 'green' | 'gray';
  characterAffinity: string;
  biography: string;
  recommendedDestinations: {
    title: string;
    type: string;
    view: string;
    subId?: string;
    reason: string;
  }[];
}

const ARCHETYPES: Record<string, ArchetypeResult> = {
  DIARIST: {
    id: 'DIARIST',
    name: 'The Insomniac Diarist',
    tagline: 'Preserver of Emotional Residue & Late-Night Intimacy',
    badgeColor: 'blue',
    characterAffinity: 'Noemi Castille (nyxgirl / lucidwitch)',
    biography: 'You perceive the early web not as a technological network, but as a vast, intimate confessional. You know that behind every 1998 homepage was an actual person sitting alone in the dark, typing out secrets to strangers. You are drawn to personal blogs, dorm room guestbooks, and the quiet human grief of broken connections.',
    recommendedDestinations: [
      {
        title: 'Marrow.net: Thread #01 ("Late Night Chadbourne Check-in")',
        type: 'HISTORICAL_POST',
        view: 'SITE_MARROW',
        subId: 'mw-t-01',
        reason: 'Noemi\'s original 1997 freshman post describing 3:00 AM dorm room quiet.'
      },
      {
        title: 'Blue Window: "The Light from Across the Street"',
        type: 'PERSONAL_BLOG',
        view: 'SITE_BLUEWINDOW',
        subId: 'bw-post-01',
        reason: 'Rowan Glass\'s photographic journal exploring solitude in 2004 Portland.'
      },
      {
        title: 'Oral History Interview #08: Noemi Castille',
        type: 'FOUNDATION_RECORD',
        view: 'RESEARCH',
        subId: 'art-oral-08',
        reason: 'The 2026 transcript where Noemi reflects on the October 14 broadcast.'
      }
    ]
  },
  HARDWARE: {
    id: 'HARDWARE',
    name: 'The Hardware Archaeologist',
    tagline: 'Splicer of Dead Copper, Magnetic Oxide & E-Waste Relics',
    badgeColor: 'amber',
    characterAffinity: 'Marcus Lin (analogghost) & Corbin Keller (pixelpunk)',
    biography: 'You believe true history lives in physical matter: the carbon decay on magnetic tape, the solder joints of 1998 USRobotics modems, and the heat of server power supplies. While others theorize, you retrieve discarded binders from Chicago dumpsters and carbon-date optical transceivers.',
    recommendedDestinations: [
      {
        title: 'Exhibit A-14: Desk of Alden Corliss (Police Evidence)',
        type: 'PHYSICAL_SCAN',
        view: 'PHYSICAL_DOCS',
        subId: 'doc-pol-01',
        reason: 'High-res optical photo of the 19-inch ViewSonic CRT monitor humming in 2003.'
      },
      {
        title: 'Greyline ISP: Milwaukee Node #04 Server Memos',
        type: 'SYSTEM_MEMO',
        view: 'SITE_GREYLINE',
        subId: 'memos',
        reason: 'Dr. Van Houten\'s confidential 1998 logs on negative-latency packet loops.'
      },
      {
        title: 'BGP Route Table Analysis (1998 Milwaukee Dump)',
        type: 'FORENSIC_TOOL',
        view: 'ROUTE_TRACE',
        subId: 'greyline.net',
        reason: 'Direct packet hops leading into unallocated subnet 0.0.0.0/room.'
      }
    ]
  },
  CARRIER: {
    id: 'CARRIER',
    name: 'The 58.4Hz Carrier Listener',
    tagline: 'Attuned to the Second Bus & The Window Behind the Glass',
    badgeColor: 'red',
    characterAffinity: 'Alden Corliss (janus) & wintermute42',
    biography: 'You have felt it—the strange realization that when you stare into your screen at night, something on the other side is looking back. You are attuned to the 58.4Hz electromagnetic resonance and the unrouted corridors where the First Internet gave way to the Second.',
    recommendedDestinations: [
      {
        title: 'AfterHours: Thread #4812 ("I can see everyone who is logged in")',
        type: 'NOCTURNAL_FORUM',
        view: 'SITE_AFTERHOURS',
        subId: 'ah-t-01',
        reason: 'Alden\'s final broadcast on Oct 14, 2003 minutes before his room went dark.'
      },
      {
        title: 'Carrier Frequency Tuner (Forensic Audio Tool)',
        type: 'INTERACTIVE_TOOL',
        view: 'TUNER',
        reason: 'Tune directly to the 58.4Hz CRT flyback frequency and shortwave bands.'
      },
      {
        title: 'The Room Without Doors (Second Bus Node)',
        type: 'ANOMALOUS_NODE',
        view: 'SECOND_NET',
        subId: 'roomwithoutdoors.net',
        reason: 'The live topological singularity connecting 1998, 2003, and current visitors.'
      }
    ]
  },
  CARTOGRAPHER: {
    id: 'CARTOGRAPHER',
    name: 'The Dialup Cartographer',
    tagline: 'Mapper of Lost Webrings, Adjacent Municipalities & Hidden Nodes',
    badgeColor: 'green',
    characterAffinity: 'Elena Rostova (Candle Room) & Rowan Glass',
    biography: 'You understand that cyberspace was once an uncharted geography of small interconnected islands. You specialize in webring topology, dead hyperlinks, and tracing the physical telephone wires that bind cities together across temporal epochs.',
    recommendedDestinations: [
      {
        title: 'Candle Room: "The Second Internet Directory (1998)"',
        type: 'FOLKLORIC_DIRECTORY',
        view: 'SITE_CANDLEROOM',
        reason: 'The earliest indexed catalog of unmapped Russian and American telnet nodes.'
      },
      {
        title: 'Interactive Network Topology Graph',
        type: 'RESEARCH_GRAPH',
        view: 'NETWORK_GRAPH',
        reason: 'Visualize the 23-year topological webring singularity cycle.'
      },
      {
        title: 'Bell System Exchange #47 Dialer Terminal',
        type: 'PHONE_TOOL',
        view: 'DASHBOARD',
        reason: 'Dial directly into the 1933 Chicago mechanical switching matrix.'
      }
    ]
  },
  SKEPTIC: {
    id: 'SKEPTIC',
    name: 'The Null Set Skeptic',
    tagline: 'Auditor of BGP Misconfigurations & Protocol Anomalies',
    badgeColor: 'gray',
    characterAffinity: 'Samira Al-Mansoor (patchnotes) & Bram Kostadinov',
    biography: 'You demand rigorous digital forensics over supernatural speculation. To you, the ' + 
    'so-called Second Internet is the result of cascading Border Gateway Protocol race conditions, bit-rot on unshielded magnetic tape, and forgotten Apache 1.3 memory leaks.',
    recommendedDestinations: [
      {
        title: 'Foundation Whitepaper: Hyperlink Topology & Singularity Loops',
        type: 'RESEARCH_PAPER',
        view: 'RESEARCH',
        subId: 'art-topology-paper',
        reason: 'Dr. Clara Szilard\'s mathematical proof on cyclic graph convergence.'
      },
      {
        title: 'WHOIS Database & Route Lookup',
        type: 'ARCHIVAL_TOOL',
        view: 'WHOIS',
        subId: 'greyline.net',
        reason: 'Inspect historical ARIN registration blocks and IP allocations.'
      },
      {
        title: 'TRACE Community Debate: Debunking the Numbers Stations',
        type: 'COMMUNITY_FEED',
        view: 'TRACE',
        subId: 'tr-02',
        reason: 'Technical breakdown proving synthetic WebAudio test oscillators.'
      }
    ]
  }
};

export const LostWebQuizView: React.FC<Props> = ({ store }) => {
  const { navigate, pinToCaseboard, discoverAnomaly, setUserArchetype } = store;
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [scores, setScores] = useState({
    DIARIST: 0,
    HARDWARE: 0,
    CARRIER: 0,
    CARTOGRAPHER: 0,
    SKEPTIC: 0
  });
  const [quizComplete, setQuizComplete] = useState(false);
  const [finalArchetype, setFinalArchetype] = useState<ArchetypeResult | null>(null);

  const handleSelectOption = (points: { DIARIST: number; HARDWARE: number; CARRIER: number; CARTOGRAPHER: number; SKEPTIC: number }) => {
    soundEngine.playClick(700);
    const updatedScores = {
      DIARIST: scores.DIARIST + points.DIARIST,
      HARDWARE: scores.HARDWARE + points.HARDWARE,
      CARRIER: scores.CARRIER + points.CARRIER,
      CARTOGRAPHER: scores.CARTOGRAPHER + points.CARTOGRAPHER,
      SKEPTIC: scores.SKEPTIC + points.SKEPTIC
    };
    setScores(updatedScores);

    if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      // Calculate winner
      let highestKey = 'DIARIST';
      let maxScore = -1;
      (Object.keys(updatedScores) as (keyof typeof updatedScores)[]).forEach(k => {
        if (updatedScores[k] > maxScore) {
          maxScore = updatedScores[k];
          highestKey = k;
        }
      });
      const res = ARCHETYPES[highestKey];
      setFinalArchetype(res);
      setQuizComplete(true);
      setUserArchetype(res.name);
      soundEngine.playClearanceChime('RESEARCHER');
      discoverAnomaly(`quiz-archetype-${res.id}`);
    }
  };

  const handleRestart = () => {
    soundEngine.playClick(600);
    setCurrentQIndex(0);
    setScores({ DIARIST: 0, HARDWARE: 0, CARRIER: 0, CARTOGRAPHER: 0, SKEPTIC: 0 });
    setQuizComplete(false);
    setFinalArchetype(null);
  };

  const handlePin = () => {
    if (!finalArchetype) return;
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'PERSON',
      title: `Archetype: ${finalArchetype.name}`,
      preview: `${finalArchetype.tagline} • Affinity: ${finalArchetype.characterAffinity}`,
      targetView: 'QUIZ',
      connectedTo: []
    });
    alert(`Pinned "${finalArchetype.name}" result to your Caseboard.`);
  };

  const currentQ = QUIZ_QUESTIONS[currentQIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '840px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Sparkles size={20} color="#38bdf8" />
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Archival Personality Diagnostics // 1998–2003
          </span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '8px' }}>
          Which Lost Web Archetype Are You?
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--nhf-text-secondary)', lineHeight: 1.6 }}>
          Discover your cognitive resonance within the early telecommunications commons. Answer 5 historical inquiries to reveal your digital persona, character affinity, and curated archive recommendations.
        </p>
      </div>

      {!quizComplete ? (
        <div style={{
          backgroundColor: 'var(--nhf-bg-surface)',
          border: '1px solid var(--nhf-border)',
          borderRadius: 'var(--radius-md)',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          {/* Progress Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-text-muted)' }}>
            <span>INQUIRY {currentQIndex + 1} OF {QUIZ_QUESTIONS.length}</span>
            <span style={{ color: '#38bdf8' }}>{Math.round(((currentQIndex + 1) / QUIZ_QUESTIONS.length) * 100)}% COMPLETE</span>
          </div>

          <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--nhf-border)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: `${((currentQIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`, height: '100%', backgroundColor: '#38bdf8', transition: 'width 0.3s ease' }} />
          </div>

          {/* Question Text */}
          <div style={{ marginTop: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--nhf-text-primary)', lineHeight: 1.4, marginBottom: '6px' }}>
              {currentQ.question}
            </h2>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic' }}>
              {currentQ.subtext}
            </div>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt.points)}
                style={{
                  textAlign: 'left',
                  backgroundColor: 'var(--nhf-bg-card)',
                  border: '1px solid var(--nhf-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--nhf-border)';
                  e.currentTarget.style.backgroundColor = 'var(--nhf-bg-card)';
                }}
              >
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--nhf-bg-primary)',
                  border: '1px solid var(--nhf-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--nhf-text-secondary)',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  {String.fromCharCode(65 + idx)}
                </div>

                <div>
                  <div style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--nhf-text-primary)', marginBottom: '4px' }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--nhf-text-secondary)', lineHeight: '1.4' }}>
                    {opt.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : finalArchetype && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Result Showcase Card */}
          <div style={{
            backgroundColor: 'var(--nhf-bg-surface)',
            border: '1px solid var(--nhf-border)',
            borderRadius: 'var(--radius-md)',
            padding: '32px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
              <div>
                <span className={`badge badge-${finalArchetype.badgeColor}`} style={{ marginBottom: '10px', display: 'inline-block' }}>
                  ARCHIVE CLASSIFICATION
                </span>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--nhf-text-primary)', letterSpacing: '-0.02em', marginBottom: '6px' }}>
                  {finalArchetype.name}
                </h2>
                <div style={{ fontSize: '1rem', color: '#38bdf8', fontWeight: 500 }}>
                  {finalArchetype.tagline}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handlePin}
                  className="btn btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}
                >
                  <BookmarkPlus size={15} />
                  <span>Pin Result</span>
                </button>

                <button
                  onClick={handleRestart}
                  className="btn btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}
                >
                  <RefreshCw size={15} />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'var(--nhf-bg-card)', border: '1px solid var(--nhf-border)', borderRadius: '6px', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-text-muted)', marginBottom: '4px' }}>
                HISTORICAL PERSONA AFFINITY:
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--nhf-text-primary)' }}>
                {finalArchetype.characterAffinity}
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--nhf-text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              {finalArchetype.biography}
            </p>

            {/* Recommendations Section */}
            <div style={{ borderTop: '1px solid var(--nhf-border)', paddingTop: '20px' }}>
              <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-accent-blue)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Compass size={15} />
                <span>Tailored Archival Recommendations for Your Archetype</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {finalArchetype.recommendedDestinations.map((dest, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      soundEngine.playClick(800);
                      navigate(dest.view, dest.subId);
                    }}
                    style={{
                      padding: '14px 16px',
                      backgroundColor: 'var(--nhf-bg-card)',
                      border: '1px solid var(--nhf-border)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--nhf-accent-blue)';
                      e.currentTarget.style.backgroundColor = 'var(--nhf-bg-card-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--nhf-border)';
                      e.currentTarget.style.backgroundColor = 'var(--nhf-bg-card)';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--nhf-text-muted)' }}>
                          [{dest.type}]
                        </span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--nhf-text-primary)' }}>
                          {dest.title}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--nhf-text-secondary)' }}>
                        {dest.reason}
                      </div>
                    </div>

                    <ArrowRight size={16} color="#38bdf8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
