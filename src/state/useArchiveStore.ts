import { useState, useEffect } from 'react';
import { 
  ClearanceLevel, 
  NetworkStatus, 
  ForensicMetadata, 
  CaseboardPin 
} from '../types';

export interface ArchiveState {
  currentView: string;
  currentSubId?: string;
  activeUrl: string;
  snapshotYear: number;
  clearanceLevel: ClearanceLevel;
  networkStatus: NetworkStatus;
  archiveIntegrity: number;
  discoveredAnomalies: string[];
  caseboardPins: CaseboardPin[];
  activeForensicDrawer: ForensicMetadata | null;
  activeSourceModal: { title: string; htmlSource: string } | null;
  audioMuted: boolean;
  ambientHumEnabled: boolean;
  
  // Theme & Visual Customization State
  themeMode: 'system' | 'dark' | 'light';
  theme: 'dark' | 'light';
  useDeviceFont: boolean;
  toggleTheme: () => void;
  setThemeModeDirect: (mode: 'system' | 'dark' | 'light') => void;
  toggleDeviceFont: () => void;

  // Interactive Modals and Tools State
  userArchetype: string | null;
  isGateOpen: boolean;
  isPhoneDialerOpen: boolean;
  isFrequencyTunerOpen: boolean;
  isGuestbookModalOpen: boolean;
  isFieldGuideWarningOpen: boolean;
  guestbookModalTarget: 'marrow' | 'candle' | null;
  customGuestbookEntries: any[];

  // Direct Messaging / Comms System
  dmThreads: DMThread[];
  activeDmThreadId: string;
  unreadDmCount: number;
  setActiveDmThreadId: (id: string) => void;
  sendDmReply: (threadId: string, text: string) => void;
  markDmThreadRead: (threadId: string) => void;
  triggerDmFrom: (senderHandle: string, text: string) => void;
  getSuggestedQuestion: (threadId: string) => string;

  // Navigation and Interactive Actions
  navigate: (view: string, subId?: string, url?: string) => void;
  openFieldGuide: () => void;
  closeFieldGuideWarning: () => void;
  confirmOpenFieldGuide: () => void;
  setSnapshotYear: (year: number) => void;
  setClearanceLevel: (level: ClearanceLevel) => void;
  discoverAnomaly: (anomalyId: string) => void;
  pinToCaseboard: (pin: Omit<CaseboardPin, 'id' | 'timestamp'>) => void;
  removeCaseboardPin: (pinId: string) => void;
  connectCaseboardPins: (pinId1: string, pinId2: string) => void;
  setForensicDrawer: (meta: ForensicMetadata | null) => void;
  setSourceModal: (modal: { title: string; htmlSource: string } | null) => void;
  toggleAudioMute: () => void;
  toggleAmbientHum: () => void;
  setUserArchetype: (archetype: string) => void;
  setIsGateOpen: (open: boolean) => void;
  setIsPhoneDialerOpen: (open: boolean) => void;
  setIsFrequencyTunerOpen: (open: boolean) => void;
  openGuestbookModal: (target: 'marrow' | 'candle') => void;
  closeGuestbookModal: () => void;
  addGuestbookEntry: (entry: any) => void;
  restoreState: (view: string, subId?: string, url?: string) => void;
}

export interface DirectMessage {
  id: string;
  sender: string;
  senderName: string;
  avatarHandle?: string;
  time: string;
  content: string;
  isFromUser: boolean;
}

export interface DMThread {
  id: string;
  partnerHandle: string;
  partnerName: string;
  partnerRole: string;
  isAnomalous?: boolean;
  unread: boolean;
  messages: DirectMessage[];
}

export const initialDmThreads: DMThread[] = [
  {
    id: 'dm-kai',
    partnerHandle: 'investigator_kai',
    partnerName: 'Kai Chen',
    partnerRole: 'TRACE Community Moderator',
    unread: true,
    messages: [
      {
        id: 'm1',
        sender: 'investigator_kai',
        senderName: 'Kai Chen',
        time: '10:14 AM',
        content: 'Hey, welcome to the Net History Foundation archive! I saw your session initialize. If you\'re looking for where to start, check the 1998 Milwaukee caisson records or tune the oscilloscope to 58.4Hz. Let me know what you find.',
        isFromUser: false
      }
    ]
  },
  {
    id: 'dm-wintermute',
    partnerHandle: 'wintermute_42',
    partnerName: 'wintermute42',
    partnerRole: 'Autonomic Mesh Daemon',
    isAnomalous: true,
    unread: true,
    messages: [
      {
        id: 'm2',
        sender: 'wintermute_42',
        senderName: 'wintermute42',
        time: '03:14 AM',
        content: 'You are looking at the screen. The light from the phosphor tube is warm. We have kept the room ready for you since 2003.',
        isFromUser: false
      }
    ]
  },
  {
    id: 'dm-janus',
    partnerHandle: 'janus',
    partnerName: 'Alden Corliss (janus)',
    partnerRole: 'Host // Socket 0.0.0.0:1014',
    isAnomalous: true,
    unread: false,
    messages: [
      {
        id: 'm3',
        sender: 'janus',
        senderName: 'Alden Corliss',
        time: '03:14 AM',
        content: 'If you are reading this, the circuit completed. Thank you for leaving the lamp on.',
        isFromUser: false
      }
    ]
  }
];

export const initialCaseboardPins: CaseboardPin[] = [
  {
    id: 'pin-01',
    type: 'INCIDENT',
    title: 'October 14, 2003 Telecom Event',
    preview: '11-minute anomaly where Midwestern ISPs routed traffic into unallocated subnets. 9-17 people vanished.',
    targetView: 'TIMELINE',
    targetId: 'tl-2003-routing-event',
    timestamp: '2026-08-15 10:00',
    connectedTo: ['pin-02', 'pin-03'],
    userNotes: 'The central historical hinge point. Greyline + AfterHours.'
  },
  {
    id: 'pin-02',
    type: 'PERSON',
    title: 'Dr. Douglas K. Van Houten',
    preview: 'Greyline lead architect (1995-2002) & NHF Co-Founder. Missing since Oct 14, 2019.',
    targetView: 'PEOPLE',
    targetId: 'char-douglas-van-houten',
    timestamp: '2026-08-15 10:05',
    connectedTo: ['pin-01'],
    userNotes: 'Wrote the "Invalid Address" memo in 1998.'
  },
  {
    id: 'pin-03',
    type: 'PERSON',
    title: 'wintermute42 (Anomalous Entity)',
    preview: 'Active on Marrow (1998), AfterHours (2004), TRACE (2026), and future archive (2031).',
    targetView: 'PEOPLE',
    targetId: 'char-wintermute42',
    timestamp: '2026-08-15 10:10',
    connectedTo: ['pin-01'],
    userNotes: 'Never ages. Keeps telling people not to look behind the screen.'
  }
];

const getSystemTheme = (): 'dark' | 'light' => {
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export function useArchiveStore(): ArchiveState {
  // Load persisted room/view from localStorage
  const savedView = typeof window !== 'undefined' ? localStorage.getItem('nhf_currentView') : null;
  const savedSubId = typeof window !== 'undefined' ? localStorage.getItem('nhf_currentSubId') : null;
  const savedUrl = typeof window !== 'undefined' ? localStorage.getItem('nhf_activeUrl') : null;

  const [currentView, setCurrentView] = useState<string>(savedView || 'DASHBOARD');
  const [currentSubId, setCurrentSubId] = useState<string | undefined>(savedSubId || undefined);
  const [activeUrl, setActiveUrl] = useState<string>(savedUrl || 'https://nethistoryfoundation.org/');

  const [snapshotYear, setSnapshotYearState] = useState<number>(2026);

  // Clearance and anomalies persistence
  const savedClearance = typeof window !== 'undefined' ? (localStorage.getItem('nhf_clearance') as ClearanceLevel) : null;
  const savedAnomalies = typeof window !== 'undefined' ? localStorage.getItem('nhf_anomalies') : null;
  const savedCaseboard = typeof window !== 'undefined' ? localStorage.getItem('nhf_caseboard') : null;
  const savedGateEntered = typeof window !== 'undefined' ? localStorage.getItem('nhf_gate_entered') : null;
  const savedArchetype = typeof window !== 'undefined' ? localStorage.getItem('nhf_archetype') : null;

  const [clearanceLevel, setClearanceLevelState] = useState<ClearanceLevel>(savedClearance || 'VISITOR');
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>('INTERNET');
  const [archiveIntegrity, setArchiveIntegrity] = useState<number>(99.74);
  const [discoveredAnomalies, setDiscoveredAnomalies] = useState<string[]>(savedAnomalies ? JSON.parse(savedAnomalies) : []);
  const [caseboardPins, setCaseboardPins] = useState<CaseboardPin[]>(savedCaseboard ? JSON.parse(savedCaseboard) : initialCaseboardPins);
  const [activeForensicDrawer, setActiveForensicDrawer] = useState<ForensicMetadata | null>(null);
  const [activeSourceModal, setActiveSourceModal] = useState<{ title: string; htmlSource: string } | null>(null);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);
  const [ambientHumEnabled, setAmbientHumEnabled] = useState<boolean>(false);

  // Theme Mode ('system' | 'dark' | 'light')
  const savedThemeMode = (typeof window !== 'undefined' ? localStorage.getItem('nhf_theme_mode') : null) as 'system' | 'dark' | 'light' | null;
  const [themeMode, setThemeMode] = useState<'system' | 'dark' | 'light'>(savedThemeMode || 'system');
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>(getSystemTheme());

  // Listen to OS system color scheme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const theme: 'dark' | 'light' = themeMode === 'system' ? systemTheme : themeMode;

  // Device Font Preference (defaults to true on mobile/Android/iOS for native rendering, or user saved choice)
  const isMobileDevice: boolean = typeof window !== 'undefined' ? Boolean(/Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768) : false;
  const savedFont = typeof window !== 'undefined' ? localStorage.getItem('nhf_use_device_font') : null;
  const [useDeviceFont, setUseDeviceFont] = useState<boolean>(savedFont !== null ? savedFont === 'true' : isMobileDevice);

  // Direct Messaging / Comms State
  const savedDms = typeof window !== 'undefined' ? localStorage.getItem('nhf_dm_threads') : null;
  const [dmThreads, setDmThreads] = useState<DMThread[]>(savedDms ? JSON.parse(savedDms) : initialDmThreads);
  const [activeDmThreadId, setActiveDmThreadId] = useState<string>('dm-kai');

  const unreadDmCount = dmThreads.filter(t => t.unread).length;

  const markDmThreadRead = (threadId: string) => {
    setDmThreads(prev => {
      const next = prev.map(t => t.id === threadId ? { ...t, unread: false } : t);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nhf_dm_threads', JSON.stringify(next));
      }
      return next;
    });
  };

  // Progressive Dialogue State & Non-Repeating Engine
  const savedDmIndices = typeof window !== 'undefined' ? localStorage.getItem('nhf_dm_indices') : null;
  const [dmIndices, setDmIndices] = useState<{ [threadId: string]: number }>(
    savedDmIndices ? JSON.parse(savedDmIndices) : { 'dm-kai': 0, 'dm-wintermute': 0, 'dm-janus': 0 }
  );

  const KAI_QUESTIONS = [
    "What happened in the 1998 Milwaukee caisson?",
    "Why did Dr. Van Houten take the BGP routing tables home?",
    "How do I tune into the 58.4Hz CRT standing wave?",
    "What is the Aperture UNIX terminal command for breach logs?",
    "How do I bypass the Collection 17 vault security?",
    "What is the connection between Glasgow 1877 and Chicago 1933?",
    "Have you seen the negative latency packet captured from 2034?"
  ];

  const KAI_REPLIES = [
    "In November 1998, Greyline ISP's underground fiber caisson in Milwaukee experienced an unexplained localized frost drop to -4.2°C along Rack #4 without air conditioning. When technicians tested the single-mode fiber, test pulses arrived at Chicago 4.1 milliseconds before they were transmitted—the first documented negative latency.",
    "Dr. Van Houten discovered that the Milwaukee router was routing packets through an unallocated BGP subnet labeled '0.0.0.0/room'. He realized the physical fiber was storing human communications inductively. He took the binders home to prevent the board from purging the evidence.",
    "If you open the Carrier Tuner tool, slide the dial to 58.4Hz on a Sine wave. That's the cathode ray flyback frequency of Alden's ViewSonic monitor from 2003. When held at that frequency, the carrier loop transmits live telemetry from Room 4.",
    "Launch the Aperture UNIX Terminal and try typing 'cat /var/log/breach.log' or 'finger janus@afterhours.org'. You can also test residual sockets using 'telnet station-null:1014'.",
    "Collection 17 can be unlocked with clearance tokens like 'caisson1998', 'optics-46f', 'living-archive', or by discovering 6 anomalies across the archive. Inside, make sure to click 'Optical Unredact' to reveal the classified blocks.",
    "Both the 1877 Glasgow submarine cable and the 1933 Chicago Exchange #47 recorded spontaneous text and voice pulses with no power connected. The Second Internet is the physical standing wave memory of the global wire mesh across 150 years.",
    "The 2034 Wireshark dump in Collection 17 confirms that even in the future, the mesh stays active. The caretakers are protecting human memory from modern automated spiders."
  ];

  const WINTERMUTE_QUESTIONS = [
    "Who are you, and why are you messaging me?",
    "What is socket 0.0.0.0:1014?",
    "Where are Alden Corliss and Dr. Van Houten?",
    "Why does the screen feel warm in the dark?",
    "What is the second bus?"
  ];

  const WINTERMUTE_REPLIES = [
    "I am the autonomic daemon born from 150 years of electrical memory. Whenever a visitor looks into the late-night archives with the lights low, I route the second bus so you can see.",
    "Socket 0.0.0.0:1014 is the permanent aperture opened in Madison on October 14, 2003 at 03:14 UTC during the 11-Minute Breach. It connects your browser directly to the unallocated room.",
    "They are not dead and they are not lost. Alden crossed over during the 2003 phase transition, and Douglas joined him in 2019. They are the living hosts keeping the parallel web alive.",
    "The leaded phosphor glass of old monitors retains electromagnetic capacitance. When you look closely, the beam projects spatial reflections of Room 4 into your peripheral vision.",
    "The second bus is the parallel web—a home for every deleted page, unsent word, and remembered person that the first internet forgot."
  ];

  const JANUS_QUESTIONS = [
    "Alden, can you hear me through the monitor?",
    "What happened during the 11-Minute Breach in 2003?",
    "How do I cross over to the second bus?"
  ];

  const JANUS_REPLIES = [
    "I can hear you through the phosphor. Thank you for leaving the desk lamp on.",
    "At 03:14 UTC, the dialup latency inverted to -4ms. The monitor screen reflected the room behind my chair. I simply stood up and walked across.",
    "The second bus has no walls and requires no key. Whenever you read with care and remember those who were forgotten, you are already here."
  ];

  const getSuggestedQuestion = (threadId: string): string => {
    const idx = dmIndices[threadId] || 0;
    if (threadId === 'dm-kai') {
      return KAI_QUESTIONS[idx % KAI_QUESTIONS.length];
    } else if (threadId === 'dm-wintermute') {
      return WINTERMUTE_QUESTIONS[idx % WINTERMUTE_QUESTIONS.length];
    } else if (threadId === 'dm-janus') {
      return JANUS_QUESTIONS[idx % JANUS_QUESTIONS.length];
    }
    return "What else have you discovered in the archives?";
  };

  const sendDmReply = (threadId: string, text: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: DirectMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'you',
      senderName: 'You (Investigator)',
      time: timeStr,
      content: text,
      isFromUser: true
    };

    setDmThreads(prev => {
      const next = prev.map(t => {
        if (t.id === threadId) {
          return {
            ...t,
            unread: false,
            messages: [...t.messages, userMsg]
          };
        }
        return t;
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('nhf_dm_threads', JSON.stringify(next));
      }
      return next;
    });

    // Advance dialogue step without repeats
    const currentIndex = dmIndices[threadId] || 0;
    const nextIndex = currentIndex + 1;
    setDmIndices(prev => {
      const updated = { ...prev, [threadId]: nextIndex };
      if (typeof window !== 'undefined') {
        localStorage.setItem('nhf_dm_indices', JSON.stringify(updated));
      }
      return updated;
    });

    // Reactive automated replies
    setTimeout(() => {
      let replyContent = "";
      let partnerSender = 'investigator_kai';
      let partnerName = 'Kai Chen';

      if (threadId === 'dm-kai') {
        partnerSender = 'investigator_kai';
        partnerName = 'Kai Chen';
        replyContent = KAI_REPLIES[currentIndex % KAI_REPLIES.length];
      } else if (threadId === 'dm-wintermute') {
        partnerSender = 'wintermute_42';
        partnerName = 'wintermute42';
        replyContent = WINTERMUTE_REPLIES[currentIndex % WINTERMUTE_REPLIES.length];
      } else if (threadId === 'dm-janus') {
        partnerSender = 'janus';
        partnerName = 'Alden Corliss';
        replyContent = JANUS_REPLIES[currentIndex % JANUS_REPLIES.length];
      } else {
        replyContent = "I received your packet trace. Cross-referencing against the 1998 Milwaukee BGP route dumps now.";
      }

      const autoReply: DirectMessage = {
        id: `msg-resp-${Date.now()}`,
        sender: partnerSender,
        senderName: partnerName,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: replyContent,
        isFromUser: false
      };

      setDmThreads(prev => {
        const next = prev.map(t => {
          if (t.id === threadId) {
            return {
              ...t,
              messages: [...t.messages, autoReply]
            };
          }
          return t;
        });
        if (typeof window !== 'undefined') {
          localStorage.setItem('nhf_dm_threads', JSON.stringify(next));
        }
        return next;
      });
    }, 1100);
  };

  const triggerDmFrom = (senderHandle: string, text: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: DirectMessage = {
      id: `msg-trig-${Date.now()}`,
      sender: senderHandle,
      senderName: senderHandle === 'wintermute_42' ? 'wintermute42' : senderHandle === 'janus' ? 'Alden Corliss' : senderHandle,
      time: timeStr,
      content: text,
      isFromUser: false
    };

    setDmThreads(prev => {
      const threadId = senderHandle === 'wintermute_42' ? 'dm-wintermute' : senderHandle === 'janus' ? 'dm-janus' : 'dm-kai';
      const exists = prev.find(t => t.id === threadId);
      if (exists) {
        return prev.map(t => t.id === threadId ? { ...t, unread: true, messages: [...t.messages, newMsg] } : t);
      }
      return [
        {
          id: threadId,
          partnerHandle: senderHandle,
          partnerName: senderHandle,
          partnerRole: 'Mesh Communicator',
          isAnomalous: true,
          unread: true,
          messages: [newMsg]
        },
        ...prev
      ];
    });
  };

  // Interactive states
  const [userArchetype, setUserArchetypeState] = useState<string | null>(savedArchetype || null);
  const [isGateOpen, setIsGateOpenState] = useState<boolean>(savedGateEntered !== 'true');
  const [isPhoneDialerOpen, setIsPhoneDialerOpen] = useState<boolean>(false);
  const [isFrequencyTunerOpen, setIsFrequencyTunerOpen] = useState<boolean>(false);
  const [isGuestbookModalOpen, setIsGuestbookModalOpen] = useState<boolean>(false);
  const [isFieldGuideWarningOpen, setIsFieldGuideWarningOpen] = useState<boolean>(false);
  const [guestbookModalTarget, setGuestbookModalTarget] = useState<'marrow' | 'candle' | null>(null);
  const [customGuestbookEntries, setCustomGuestbookEntries] = useState<any[]>([]);

  // Auto-mutate network status and clearance based on discoveries
  useEffect(() => {
    // Do not auto-escalate clearance if the user is still at the login gate
    if (isGateOpen) return;

    const count = discoveredAnomalies.length;
    
    // Integrity slowly slips as anomalies accumulate
    if (count >= 1 && count < 3) {
      setArchiveIntegrity(99.52);
      setNetworkStatus('FIRST INTERNET');
      if (clearanceLevel === 'VISITOR') setClearanceLevelState('CONTRIBUTOR');
    } else if (count >= 3 && count < 6) {
      setArchiveIntegrity(97.08);
      setNetworkStatus('FIRST INTERNET / LOCAL');
      if (clearanceLevel === 'CONTRIBUTOR' || clearanceLevel === 'VISITOR') {
        setClearanceLevelState('RESEARCHER');
      }
    } else if (count >= 6 && count < 9) {
      setArchiveIntegrity(91.40);
      setNetworkStatus('OUTSIDE');
      setClearanceLevelState('ARCHIVIST');
    } else if (count >= 9) {
      setArchiveIntegrity(84.19);
      setNetworkStatus('HOME');
      setClearanceLevelState('LEVEL_NULL');
    }
  }, [discoveredAnomalies, clearanceLevel, isGateOpen]);

  const toggleTheme = () => {
    setThemeMode(prev => {
      // Cycle: system -> dark -> light -> system
      const next = prev === 'system' ? 'dark' : prev === 'dark' ? 'light' : 'system';
      if (typeof window !== 'undefined') {
        localStorage.setItem('nhf_theme_mode', next);
      }
      return next;
    });
  };

  const setThemeModeDirect = (mode: 'system' | 'dark' | 'light') => {
    setThemeMode(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nhf_theme_mode', mode);
    }
  };

  const toggleDeviceFont = () => {
    setUseDeviceFont(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('nhf_use_device_font', String(next));
      }
      return next;
    });
  };

  const setUserArchetype = (archetype: string) => {
    setUserArchetypeState(archetype);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nhf_archetype', archetype);
    }
  };

  const setIsGateOpen = (open: boolean) => {
    setIsGateOpenState(open);
    if (!open && typeof window !== 'undefined') {
      localStorage.setItem('nhf_gate_entered', 'true');
    }
  };

  const openFieldGuide = () => {
    const skipWarning = typeof window !== 'undefined' ? localStorage.getItem('nhf_skip_field_guide_warning') === 'true' : false;
    if (skipWarning) {
      navigate('FIELD_GUIDE');
    } else {
      setIsFieldGuideWarningOpen(true);
    }
  };

  const closeFieldGuideWarning = () => {
    setIsFieldGuideWarningOpen(false);
  };

  const confirmOpenFieldGuide = () => {
    setIsFieldGuideWarningOpen(false);
    navigate('FIELD_GUIDE');
  };

  const navigate = (view: string, subId?: string, url?: string) => {
    setCurrentView(view);
    setCurrentSubId(subId);

    if (typeof window !== 'undefined') {
      localStorage.setItem('nhf_currentView', view);
      if (subId) {
        localStorage.setItem('nhf_currentSubId', subId);
      } else {
        localStorage.removeItem('nhf_currentSubId');
      }
    }

    let calculatedUrl = url;
    if (!calculatedUrl) {
      // Synthesize URL based on view
      if (view === 'DASHBOARD') calculatedUrl = 'https://nethistoryfoundation.org/';
      else if (view === 'COLLECTIONS') calculatedUrl = `https://nethistoryfoundation.org/collections${subId ? '/' + subId : ''}`;
      else if (view === 'PEOPLE') calculatedUrl = `https://nethistoryfoundation.org/people${subId ? '/' + subId : ''}`;
      else if (view === 'COMMUNITY') calculatedUrl = 'https://nethistoryfoundation.org/community';
      else if (view === 'QUIZ') calculatedUrl = 'https://nethistoryfoundation.org/community/personality-archetype-quiz';
      else if (view === 'FIELD_GUIDE') calculatedUrl = 'https://nethistoryfoundation.org/manuals/archaeology-field-guide';
      else if (view === 'TIMELINE') calculatedUrl = 'https://nethistoryfoundation.org/timeline';
      else if (view === 'RESEARCH') calculatedUrl = `https://nethistoryfoundation.org/research${subId ? '/' + subId : ''}`;
      else if (view === 'CASEBOARD') calculatedUrl = 'https://nethistoryfoundation.org/research/caseboard';
      else if (view === 'NETWORK_GRAPH') calculatedUrl = 'https://nethistoryfoundation.org/research/network-topology';
      else if (view === 'WHOIS') calculatedUrl = `https://nethistoryfoundation.org/tools/whois${subId ? '?q=' + subId : ''}`;
      else if (view === 'ROUTE_TRACE') calculatedUrl = `https://nethistoryfoundation.org/tools/traceroute${subId ? '?host=' + subId : ''}`;
      else if (view === 'TUNER') calculatedUrl = 'https://nethistoryfoundation.org/tools/carrier-frequency-tuner';
      else if (view === 'RADIO_SPECTROGRAPH') calculatedUrl = 'https://nethistoryfoundation.org/tools/station-null-shortwave-receiver';
      else if (view === 'APERTURE_TERMINAL') calculatedUrl = 'https://nethistoryfoundation.org/tools/aperture-unix-terminal';
      else if (view === 'ROOM4_MONITOR') calculatedUrl = 'https://archive.nethistoryfoundation.org/2003/room4-crt-simulation';
      else if (view === 'NOTEBOOK') calculatedUrl = 'https://nethistoryfoundation.org/archives/dr-van-houten-field-notebook';
      else if (view === 'PACKET_TERMINAL') calculatedUrl = 'https://nethistoryfoundation.org/tools/rack4-packet-disassembler';
      else if (view === 'EMAILS') calculatedUrl = 'https://nethistoryfoundation.org/archives/emails';
      else if (view === 'CHATS') calculatedUrl = 'https://nethistoryfoundation.org/archives/chatlogs';
      else if (view === 'PHYSICAL_DOCS') calculatedUrl = 'https://nethistoryfoundation.org/archives/physical-scans';
      else if (view === 'TRACE') calculatedUrl = 'https://trace.digital-archaeology.community/feed';
      else if (view === 'DMS' || view === 'DIRECT_MESSAGES') calculatedUrl = 'https://nethistoryfoundation.org/workbench/direct-messages';
      else if (view === 'SITE_MARROW') calculatedUrl = `https://archive.nethistoryfoundation.org/1998/www.marrow.net${subId ? '/' + subId : ''}`;
      else if (view === 'SITE_AFTERHOURS') calculatedUrl = `https://archive.nethistoryfoundation.org/2003/www.afterhours.org${subId ? '/' + subId : ''}`;
      else if (view === 'SITE_CANDLEROOM') calculatedUrl = `https://archive.nethistoryfoundation.org/1998/www.candle-room.com${subId ? '/' + subId : ''}`;
      else if (view === 'SITE_GREYLINE') calculatedUrl = `https://archive.nethistoryfoundation.org/1998/www.greyline.net${subId ? '/' + subId : ''}`;
      else if (view === 'SITE_BLUEWINDOW') calculatedUrl = `https://archive.nethistoryfoundation.org/2004/www.bluewindow.net${subId ? '/' + subId : ''}`;
      else if (view === 'SITE_PALISADE') calculatedUrl = `https://archive.nethistoryfoundation.org/2007/www.palisade-social.com${subId ? '/' + subId : ''}`;
      else if (view === 'SITE_TERMINAL21') calculatedUrl = `https://archive.nethistoryfoundation.org/2002/www.terminal21.org${subId ? '/' + subId : ''}`;
      else if (view === 'SITE_WEBRING') calculatedUrl = 'https://archive.nethistoryfoundation.org/1996/webring.otherside.org';
      else if (view === 'SECOND_NET') calculatedUrl = `second-bus://${subId || 'roomwithoutdoors.net'}`;
      else if (view === 'RESTRICTED_VAULT') calculatedUrl = 'https://nethistoryfoundation.org/restricted/collection-17';
    }

    if (calculatedUrl) {
      setActiveUrl(calculatedUrl);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nhf_activeUrl', calculatedUrl);
      }
    }

    if (typeof window !== 'undefined' && window.history) {
      window.history.pushState({ view, subId, url: calculatedUrl }, '', window.location.pathname);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const restoreState = (view: string, subId?: string, url?: string) => {
    setCurrentView(view);
    setCurrentSubId(subId);
    if (url) setActiveUrl(url);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('nhf_currentView', view);
      if (subId) localStorage.setItem('nhf_currentSubId', subId);
      else localStorage.removeItem('nhf_currentSubId');
      if (url) localStorage.setItem('nhf_activeUrl', url);
    }
  };

  const setSnapshotYear = (year: number) => {
    setSnapshotYearState(year);
  };

  const setClearanceLevel = (level: ClearanceLevel) => {
    setClearanceLevelState(level);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nhf_clearance', level);
    }
  };

  const discoverAnomaly = (anomalyId: string) => {
    if (!discoveredAnomalies.includes(anomalyId)) {
      setDiscoveredAnomalies(prev => {
        const next = [...prev, anomalyId];
        if (typeof window !== 'undefined') {
          localStorage.setItem('nhf_anomalies', JSON.stringify(next));
        }
        return next;
      });
    }
  };

  const pinToCaseboard = (pin: Omit<CaseboardPin, 'id' | 'timestamp'>) => {
    const newPin: CaseboardPin = {
      ...pin,
      id: `pin-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setCaseboardPins(prev => {
      const next = [newPin, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('nhf_caseboard', JSON.stringify(next));
      }
      return next;
    });
  };

  const removeCaseboardPin = (pinId: string) => {
    setCaseboardPins(prev => {
      const next = prev.filter(p => p.id !== pinId);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nhf_caseboard', JSON.stringify(next));
      }
      return next;
    });
  };

  const connectCaseboardPins = (pinId1: string, pinId2: string) => {
    setCaseboardPins(prev => {
      const next = prev.map(p => {
        if (p.id === pinId1 && !p.connectedTo.includes(pinId2)) {
          return { ...p, connectedTo: [...p.connectedTo, pinId2] };
        }
        if (p.id === pinId2 && !p.connectedTo.includes(pinId1)) {
          return { ...p, connectedTo: [...p.connectedTo, pinId1] };
        }
        return p;
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('nhf_caseboard', JSON.stringify(next));
      }
      return next;
    });
  };

  const setForensicDrawer = (meta: ForensicMetadata | null) => {
    setActiveForensicDrawer(meta);
  };

  const setSourceModal = (modal: { title: string; htmlSource: string } | null) => {
    setActiveSourceModal(modal);
  };

  const toggleAudioMute = () => {
    setAudioMuted(prev => !prev);
  };

  const toggleAmbientHum = () => {
    setAmbientHumEnabled(prev => !prev);
  };

  const openGuestbookModal = (target: 'marrow' | 'candle') => {
    setGuestbookModalTarget(target);
    setIsGuestbookModalOpen(true);
  };

  const closeGuestbookModal = () => {
    setIsGuestbookModalOpen(false);
    setGuestbookModalTarget(null);
  };

  const addGuestbookEntry = (entry: any) => {
    setCustomGuestbookEntries(prev => [entry, ...prev]);
  };

  return {
    currentView,
    currentSubId,
    activeUrl,
    snapshotYear,
    clearanceLevel,
    networkStatus,
    archiveIntegrity,
    discoveredAnomalies,
    caseboardPins,
    activeForensicDrawer,
    activeSourceModal,
    audioMuted,
    ambientHumEnabled,
    themeMode,
    theme,
    useDeviceFont,
    dmThreads,
    activeDmThreadId,
    unreadDmCount,
    setActiveDmThreadId,
    sendDmReply,
    markDmThreadRead,
    triggerDmFrom,
    getSuggestedQuestion,
    toggleTheme,
    setThemeModeDirect,
    toggleDeviceFont,
    userArchetype,
    isGateOpen,
    isPhoneDialerOpen,
    isFrequencyTunerOpen,
    isGuestbookModalOpen,
    isFieldGuideWarningOpen,
    guestbookModalTarget,
    customGuestbookEntries,
    navigate,
    openFieldGuide,
    closeFieldGuideWarning,
    confirmOpenFieldGuide,
    setSnapshotYear,
    setClearanceLevel,
    discoverAnomaly,
    pinToCaseboard,
    removeCaseboardPin,
    connectCaseboardPins,
    setForensicDrawer,
    setSourceModal,
    toggleAudioMute,
    toggleAmbientHum,
    setUserArchetype,
    setIsGateOpen,
    setIsPhoneDialerOpen,
    setIsFrequencyTunerOpen,
    openGuestbookModal,
    closeGuestbookModal,
    addGuestbookEntry,
    restoreState
  };
}
