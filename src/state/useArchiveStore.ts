import { useState, useEffect, useCallback } from 'react';
import { 
  ClearanceLevel, 
  NetworkStatus, 
  ForensicMetadata, 
  CaseboardPin 
} from '../types';
import { ARCHIVE_RANKS, CosmeticCategory, cosmeticsCatalog, rankForXp } from '../data/cosmeticsData';
import { additionalDmThreads, discoveryReactions } from '../data/archiveActivityData';

export interface InvestigatorProfile {
  handle: string;
  displayName: string;
  pronouns: string;
  status: string;
  equipped: Partial<Record<CosmeticCategory, string>>;
}

export interface ArchiveState {
  currentView: string;
  currentSubId?: string;
  activeUrl: string;
  snapshotYear: number;
  clearanceLevel: ClearanceLevel;
  accessRoute: 'VISITOR' | 'KEYCARD';
  networkStatus: NetworkStatus;
  archiveIntegrity: number;
  discoveredAnomalies: string[];
  caseboardPins: CaseboardPin[];
  activeForensicDrawer: ForensicMetadata | null;
  activeSourceModal: { title: string; htmlSource: string } | null;
  audioMuted: boolean;
  ambientHumEnabled: boolean;
  notifications: ArchiveNotification[];
  investigationChapter: number;
  canEnterSecondInternet: boolean;
  investigatorProfile: InvestigatorProfile;
  archiveXp: number;
  archiveRank: number;
  archiveRankTitle: string;
  unlockedCosmeticIds: string[];
  
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
  authenticateClearance: (level: ClearanceLevel) => void;
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
  notify: (message: string, tone?: ArchiveNotification['tone']) => void;
  dismissNotification: (id: string) => void;
  resetProgress: (scope: ResetScope) => void;
  exportSave: () => string;
  importSave: (serialized: string) => boolean;
  updateInvestigatorProfile: (patch: Partial<Omit<InvestigatorProfile, 'equipped'>>) => void;
  equipCosmetic: (category: CosmeticCategory, cosmeticId: string) => void;
}

export type ResetScope = 'investigation' | 'messages' | 'caseboard' | 'appearance' | 'profile' | 'all';

export interface ArchiveNotification {
  id: string;
  message: string;
  tone: 'info' | 'success' | 'warning' | 'danger';
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
  },
  ...additionalDmThreads
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

const SAVE_VERSION = 3;
const SAVE_KEYS = [
  'nhf_currentView', 'nhf_currentSubId', 'nhf_activeUrl', 'nhf_clearance',
  'nhf_access_route',
  'nhf_anomalies', 'nhf_caseboard', 'nhf_gate_entered', 'nhf_archetype',
  'nhf_theme_mode', 'nhf_use_device_font', 'nhf_dm_threads', 'nhf_dm_indices',
  'nhf_skip_field_guide_warning'
  ,'nhf_investigator_profile'
  ,'nhf_cosmetics_seen_count'
  ,'nhf_guestbook_entries'
  ,'nhf_trace_posts'
  ,'nhf_trace_uncensored'
  ,'nhf_reacted_discoveries'
  ,'nhf_ambient_events'
  ,'nhf_route_visits'
  ,'nhf_room4_messages'
  ,'nhf_notebook_decoded'
  ,'nhf_vault_unredacted'
  ,'nhf_aperture_history'
  ,'nhf_aperture_logs'
  ,'nhf_dead_network_quizzes'
  ,'nhf_vault_override'
  ,'nhf_carrier_locked_signal'
  ,'nhf_station_decoded_signal'
] as const;

const safeParse = <T,>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return parsed == null ? fallback : parsed as T;
  } catch {
    return fallback;
  }
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
  const savedAccessRoute = typeof window !== 'undefined' ? localStorage.getItem('nhf_access_route') : null;
  const savedClearance = typeof window !== 'undefined' && savedAccessRoute === 'KEYCARD' ? (localStorage.getItem('nhf_clearance') as ClearanceLevel) : null;
  const savedAnomalies = typeof window !== 'undefined' ? localStorage.getItem('nhf_anomalies') : null;
  const savedCaseboard = typeof window !== 'undefined' ? localStorage.getItem('nhf_caseboard') : null;
  const savedGateEntered = typeof window !== 'undefined' ? localStorage.getItem('nhf_gate_entered') : null;
  const savedArchetype = typeof window !== 'undefined' ? localStorage.getItem('nhf_archetype') : null;
  const savedProfile = typeof window !== 'undefined' ? localStorage.getItem('nhf_investigator_profile') : null;
  const savedGuestbookEntries = typeof window !== 'undefined' ? localStorage.getItem('nhf_guestbook_entries') : null;

  const [clearanceLevel, setClearanceLevelState] = useState<ClearanceLevel>(savedClearance || 'VISITOR');
  const [accessRoute, setAccessRoute] = useState<'VISITOR' | 'KEYCARD'>(savedAccessRoute === 'KEYCARD' ? 'KEYCARD' : 'VISITOR');
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>('INTERNET');
  const [archiveIntegrity, setArchiveIntegrity] = useState<number>(99.74);
  const [discoveredAnomalies, setDiscoveredAnomalies] = useState<string[]>(safeParse(savedAnomalies, []));
  const [caseboardPins, setCaseboardPins] = useState<CaseboardPin[]>(safeParse(savedCaseboard, initialCaseboardPins));
  const [activeForensicDrawer, setActiveForensicDrawer] = useState<ForensicMetadata | null>(null);
  const [activeSourceModal, setActiveSourceModal] = useState<{ title: string; htmlSource: string } | null>(null);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);
  const [ambientHumEnabled, setAmbientHumEnabled] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<ArchiveNotification[]>([]);
  const defaultProfile: InvestigatorProfile = { handle: 'visitor_01', displayName: '', pronouns: '', status: 'Cataloguing what the first internet forgot.', equipped: { AVATAR: 'avatar-1', FRAME: 'frame-1', BADGE: 'badge-1', NAMEPLATE: 'nameplate-1', PALETTE: 'palette-1', STAMP: 'stamp-1', SIDEBAR: 'sidebar-1', OMNIBOX: 'omnibox-1', CURSOR: 'cursor-1', TRANSITION: 'transition-1', NOTIFICATION: 'notification-1', PINSET: 'pinset-1', IDCARD: 'idcard-1', SIGNATURE: 'signature-1', TERMINAL: 'terminal-1', AMBIENT: 'ambient-1', BACKGROUND: 'background-1', EFFECT: 'effect-1', HAUNTED: 'haunted-1' } };
  const restoredProfile = safeParse(savedProfile, defaultProfile);
  const [investigatorProfile, setInvestigatorProfile] = useState<InvestigatorProfile>({ ...restoredProfile, equipped: { ...defaultProfile.equipped, ...restoredProfile.equipped } });

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
  const [dmThreads, setDmThreads] = useState<DMThread[]>(safeParse(savedDms, initialDmThreads));
  const [activeDmThreadId, setActiveDmThreadId] = useState<string>('dm-kai');

  const unreadDmCount = dmThreads.filter(t => t.unread).length;

  useEffect(() => {
    setDmThreads(previous => {
      const missing = initialDmThreads.filter(base => !previous.some(thread => thread.id === base.id));
      if (!missing.length) return previous;
      const next = [...previous, ...missing];
      localStorage.setItem('nhf_dm_threads', JSON.stringify(next));
      return next;
    });
  }, []);

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
    safeParse(savedDmIndices, { 'dm-kai': 0, 'dm-wintermute': 0, 'dm-janus': 0 })
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
    "Collection 17 requires an Archivist keycard, though scoped exhibit tokens like 'caisson1998', 'optics-46f', or 'living-archive' can open that collection without changing your global clearance. Inside, click 'Optical Unredact' to reveal the classified blocks.",
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
        const partner = dmThreads.find(thread => thread.id === threadId);
        partnerSender = partner?.partnerHandle || 'archive_researcher';
        partnerName = partner?.partnerName || 'Archive Researcher';
        replyContent = threadId === 'dm-clara' ? 'Context hold recorded. I will compare your observation against the accession history.'
          : threadId === 'dm-samira' ? 'Received. I will test the least dramatic explanation first and report what survives.'
            : threadId === 'dm-marcus' ? 'I am checking the physical copy now. Give the scanner a minute; it has the temperament of a landlord.'
              : threadId === 'dm-elena' ? 'I remember that page differently. Let me find my old notes before certainty starts performing tricks.'
                : 'I received your packet trace. Cross-referencing against the 1998 Milwaukee BGP route dumps now.';
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
      const next = exists ? prev.map(t => t.id === threadId ? { ...t, unread: true, messages: [...t.messages, newMsg] } : t) : [
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
      localStorage.setItem('nhf_dm_threads', JSON.stringify(next));
      return next;
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
  const [customGuestbookEntries, setCustomGuestbookEntries] = useState<any[]>(safeParse(savedGuestbookEntries, []));

  useEffect(() => {
    const seen = safeParse<string[]>(localStorage.getItem('nhf_reacted_discoveries'), []);
    const reaction = [...discoveryReactions].reverse().find(item => discoveredAnomalies.includes(item.anomalyId) && !seen.includes(item.anomalyId));
    if (!reaction) return;
    const message: DirectMessage = { id: `reaction-${reaction.anomalyId}`, sender: reaction.sender, senderName: reaction.senderName, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), content: reaction.text, isFromUser: false };
    setDmThreads(previous => {
      const next = previous.map(thread => thread.id === reaction.threadId ? { ...thread, unread: true, messages: thread.messages.some(item => item.id === message.id) ? thread.messages : [...thread.messages, message] } : thread);
      localStorage.setItem('nhf_dm_threads', JSON.stringify(next));
      return next;
    });
    localStorage.setItem('nhf_reacted_discoveries', JSON.stringify([...seen, reaction.anomalyId]));
  }, [discoveredAnomalies]);

  const investigationChapter = discoveredAnomalies.length >= 9 ? 5
    : discoveredAnomalies.length >= 6 ? 4
      : discoveredAnomalies.length >= 3 ? 3
        : discoveredAnomalies.length >= 1 ? 2 : 1;
  const canEnterSecondInternet = investigationChapter >= 5 || clearanceLevel === 'LEVEL_NULL' || clearanceLevel === 'LEVEL_OMEGA';
  const curatedDiscoveryXp = discoveredAnomalies.filter(id => [
    'greyline-memo-read','ah-thread-oct14-read','pal-frost-anomaly','candle-article-read','wintermute-live-reply',
    'graph-reveal-second-net','route-room-source','webring-labyrinth','webring-unmarked-door','si-room-direct',
    'grand-synthesis-unlocked','crt-room4-reflection','terminal-cat-breach-log','trace-uncensored-read','mw-below-direct',
    'mw-below-tab','bw-impossible-date','t21-koren-anomaly','webring-random-door','radio-buzzer-4625',
    'radio-sstv-14230','radio-vlf-584','radio-am-120','terminal-finger-janus','terminal-telnet-null','terminal-traceroute-sub',
    'anom-future-snap','tl-future-era','trace-user-commented','vault-direct-portal','notebook-cipher-page6'
  ].includes(id)).length * 40;
  const sideCaseXp = discoveredAnomalies.some(id => id.startsWith('webring-')) ? 60 : 0;
  const quizXp = userArchetype ? 100 : 0;
  const chapterXp = Math.max(0, investigationChapter - 1) * 350;
  const synthesisXp = discoveredAnomalies.includes('grand-synthesis-unlocked') ? 500 : 0;
  const caseboardXp = Math.min(200, caseboardPins.reduce((sum, pin) => sum + (pin.connectedTo?.length || 0) * 25, 0));
  const archiveXp = curatedDiscoveryXp + sideCaseXp + quizXp + chapterXp + synthesisXp + caseboardXp;
  const archiveRank = rankForXp(archiveXp);
  const archiveRankTitle = ARCHIVE_RANKS[archiveRank - 1];
  const unlockedCosmeticIds = cosmeticsCatalog.filter(item => item.rank <= archiveRank).map(item => item.id);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(item => item.id !== id));
  }, []);

  const notify = useCallback((message: string, tone: ArchiveNotification['tone'] = 'info') => {
    const id = `notice-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setNotifications(prev => [...prev.slice(-3), { id, message, tone }]);
    window.setTimeout(() => dismissNotification(id), 4200);
  }, [dismissNotification]);

  useEffect(() => {
    if (isGateOpen || typeof window === 'undefined') return;
    const seen = Number(localStorage.getItem('nhf_cosmetics_seen_count') || 0);
    if (unlockedCosmeticIds.length > seen) {
      const gained = unlockedCosmeticIds.length - seen;
      notify(`${gained} cosmetic object${gained === 1 ? '' : 's'} unlocked at Archive Rank ${archiveRank}.`, 'success');
      localStorage.setItem('nhf_cosmetics_seen_count', String(unlockedCosmeticIds.length));
    }
  }, [archiveRank, isGateOpen, notify, unlockedCosmeticIds.length]);

  // Discoveries mutate the fiction, never the user's institutional authorization.
  useEffect(() => {
    // Do not auto-escalate clearance if the user is still at the login gate
    if (isGateOpen) return;

    const count = discoveredAnomalies.length;
    
    // Integrity slowly slips as anomalies accumulate
    if (count >= 1 && count < 3) {
      setArchiveIntegrity(99.52);
      setNetworkStatus('FIRST INTERNET');
    } else if (count >= 3 && count < 6) {
      setArchiveIntegrity(97.08);
      setNetworkStatus('FIRST INTERNET / LOCAL');
    } else if (count >= 6 && count < 9) {
      setArchiveIntegrity(91.40);
      setNetworkStatus('OUTSIDE');
    } else if (count >= 9) {
      setArchiveIntegrity(84.19);
      setNetworkStatus('HOME');
    }
  }, [discoveredAnomalies, isGateOpen]);

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

  const persistProfile = (profile: InvestigatorProfile) => {
    setInvestigatorProfile(profile);
    localStorage.setItem('nhf_investigator_profile', JSON.stringify(profile));
  };

  const updateInvestigatorProfile = (patch: Partial<Omit<InvestigatorProfile, 'equipped'>>) => {
    persistProfile({ ...investigatorProfile, ...patch });
  };

  const equipCosmetic = (category: CosmeticCategory, cosmeticId: string) => {
    const cosmetic = cosmeticsCatalog.find(item => item.id === cosmeticId && item.category === category);
    if (!cosmetic || !unlockedCosmeticIds.includes(cosmeticId)) {
      notify('COSMETIC SEALED: increase Archive Rank through curated casework.', 'warning');
      return;
    }
    persistProfile({ ...investigatorProfile, equipped: { ...investigatorProfile.equipped, [category]: cosmeticId } });
    notify(`${cosmetic.name} equipped. No institutional privileges were altered.`, 'success');
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
    if (view === 'SECOND_NET' && !canEnterSecondInternet) {
      notify('ROUTE REFUSED: the aperture is unstable. Resolve nine archive anomalies before attempting a permanent crossing.', 'warning');
      setCurrentView('RESTRICTED_VAULT');
      setCurrentSubId(undefined);
      setActiveUrl('https://nethistoryfoundation.org/restricted/collection-17');
      return;
    }
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
      else if (view === 'INVESTIGATION_LEDGER') calculatedUrl = 'https://nethistoryfoundation.org/investigation/ledger';
      else if (view === 'COLLECTIONS') calculatedUrl = `https://nethistoryfoundation.org/collections${subId ? '/' + subId : ''}`;
      else if (view === 'PEOPLE') calculatedUrl = `https://nethistoryfoundation.org/people${subId ? '/' + subId : ''}`;
      else if (view === 'COMMUNITY') calculatedUrl = 'https://nethistoryfoundation.org/community';
      else if (view === 'QUIZ') calculatedUrl = 'https://nethistoryfoundation.org/community/personality-archetype-quiz';
      else if (view === 'PROFILE') calculatedUrl = 'https://nethistoryfoundation.org/investigator/profile';
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

  const authenticateClearance = (level: ClearanceLevel) => {
    setClearanceLevelState(level);
    setAccessRoute(level === 'VISITOR' ? 'VISITOR' : 'KEYCARD');
    if (typeof window !== 'undefined') {
      localStorage.setItem('nhf_clearance', level);
      localStorage.setItem('nhf_access_route', level === 'VISITOR' ? 'VISITOR' : 'KEYCARD');
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
    setCustomGuestbookEntries(prev => {
      const next = [entry, ...prev];
      localStorage.setItem('nhf_guestbook_entries', JSON.stringify(next));
      return next;
    });
  };

  const resetProgress = (scope: ResetScope) => {
    if (scope === 'investigation' || scope === 'all') {
      ['nhf_currentView', 'nhf_currentSubId', 'nhf_activeUrl', 'nhf_clearance', 'nhf_access_route', 'nhf_anomalies', 'nhf_gate_entered', 'nhf_archetype', 'nhf_skip_field_guide_warning'].forEach(key => localStorage.removeItem(key));
      setCurrentView('DASHBOARD');
      setCurrentSubId(undefined);
      setActiveUrl('https://nethistoryfoundation.org/');
      setClearanceLevelState('VISITOR');
      setAccessRoute('VISITOR');
      setNetworkStatus('INTERNET');
      setArchiveIntegrity(99.74);
      setDiscoveredAnomalies([]);
      setUserArchetypeState(null);
      setIsGateOpenState(true);
    }
    if (scope === 'messages' || scope === 'all') {
      localStorage.removeItem('nhf_dm_threads');
      localStorage.removeItem('nhf_dm_indices');
      localStorage.removeItem('nhf_guestbook_entries');
      localStorage.removeItem('nhf_trace_posts');
      localStorage.removeItem('nhf_trace_uncensored');
      localStorage.removeItem('nhf_room4_messages');
      setDmThreads(initialDmThreads);
      setDmIndices({ 'dm-kai': 0, 'dm-wintermute': 0, 'dm-janus': 0 });
      setCustomGuestbookEntries([]);
    }
    if (scope === 'caseboard' || scope === 'all') {
      localStorage.removeItem('nhf_caseboard');
      setCaseboardPins(initialCaseboardPins);
    }
    if (scope === 'appearance' || scope === 'all') {
      localStorage.removeItem('nhf_theme_mode');
      localStorage.removeItem('nhf_use_device_font');
      setThemeMode('system');
      setUseDeviceFont(isMobileDevice);
    }
    if (scope === 'profile' || scope === 'all') {
      localStorage.removeItem('nhf_investigator_profile');
      localStorage.removeItem('nhf_cosmetics_seen_count');
      setInvestigatorProfile(defaultProfile);
    }
    if (scope === 'investigation' || scope === 'all') {
      localStorage.removeItem('nhf_notebook_decoded');
      localStorage.removeItem('nhf_vault_unredacted');
      localStorage.removeItem('nhf_aperture_history');
      localStorage.removeItem('nhf_aperture_logs');
      localStorage.removeItem('nhf_dead_network_quizzes');
      localStorage.removeItem('nhf_vault_override');
      localStorage.removeItem('nhf_carrier_locked_signal');
      localStorage.removeItem('nhf_station_decoded_signal');
    }
    notify(scope === 'all' ? 'Archive workstation restored to factory state.' : `${scope[0].toUpperCase() + scope.slice(1)} data reset.`, 'success');
  };

  const exportSave = () => JSON.stringify({
    version: SAVE_VERSION,
    exportedAt: new Date().toISOString(),
    data: Object.fromEntries(SAVE_KEYS.map(key => [key, localStorage.getItem(key)]))
  }, null, 2);

  const importSave = (serialized: string) => {
    try {
      const parsed = JSON.parse(serialized);
      if (!parsed || typeof parsed.data !== 'object') throw new Error('Invalid archive save');
      SAVE_KEYS.forEach(key => {
        const value = parsed.data[key];
        if (typeof value === 'string') localStorage.setItem(key, value);
        else localStorage.removeItem(key);
      });
      notify('Save imported. Reloading the archive workstation…', 'success');
      window.setTimeout(() => window.location.reload(), 500);
      return true;
    } catch {
      notify('Import rejected: this file is not a valid NHF investigation save.', 'danger');
      return false;
    }
  };

  return {
    currentView,
    currentSubId,
    activeUrl,
    snapshotYear,
    clearanceLevel,
    accessRoute,
    networkStatus,
    archiveIntegrity,
    discoveredAnomalies,
    caseboardPins,
    activeForensicDrawer,
    activeSourceModal,
    audioMuted,
    ambientHumEnabled,
    notifications,
    investigationChapter,
    canEnterSecondInternet,
    investigatorProfile,
    archiveXp,
    archiveRank,
    archiveRankTitle,
    unlockedCosmeticIds,
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
    authenticateClearance,
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
    restoreState,
    notify,
    dismissNotification,
    resetProgress,
    exportSave,
    importSave
    ,updateInvestigatorProfile,
    equipCosmetic
  };
}
