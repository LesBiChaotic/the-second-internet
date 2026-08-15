import { FoundationArticle } from '../types';

export interface FoundationCollection {
  id: string;
  code: string;
  name: string;
  yearSpan: string;
  itemCount: number;
  description: string;
  curator: string;
  status: 'Accessible' | 'Partial' | 'Restricted' | 'Quarantined';
  tags: string[];
}

export const foundationCollections: FoundationCollection[] = [
  {
    id: 'col-01',
    code: 'COL-01-USENET',
    name: 'Midwest Usenet & BBS Archives (1988-1996)',
    yearSpan: '1988–1996',
    itemCount: 842190,
    description: 'Complete uncompressed spool files from regional dialup bulletin boards across Illinois, Wisconsin, and Minnesota.',
    curator: 'Dr. Gideon Falk',
    status: 'Accessible',
    tags: ['BBS', 'Usenet', 'Dial-up', 'Telecommunications']
  },
  {
    id: 'col-04',
    code: 'COL-04-MARROW',
    name: 'The Marrow.net Community Corpus (1997-1999)',
    yearSpan: '1997–1999',
    itemCount: 412800,
    description: 'Full reconstructed MySQL database, member directories, guestbooks, personal student pages, and IRC chat transcripts from the Madison hobbyist portal.',
    curator: 'Elena Rostova (Guest Fellow)',
    status: 'Accessible',
    tags: ['Marrow', 'Webrings', 'Student Portals', 'Early HTML']
  },
  {
    id: 'col-07',
    code: 'COL-07-CANDLE',
    name: 'Paranormal & Esoteric Web Directories (1996-2001)',
    yearSpan: '1996–2001',
    itemCount: 95400,
    description: 'Exhaustive crawls of early folklore, numbers stations, ghost servers, and amateur mystery repositories, centered around Candle Room.',
    curator: 'Dr. Clara Szilard',
    status: 'Accessible',
    tags: ['Candle Room', 'Folklore', 'Numbers Stations', 'Anomalies']
  },
  {
    id: 'col-09',
    code: 'COL-09-GREYLINE',
    name: 'Greyline Communications Infrastructure Tapes (1995-2002)',
    yearSpan: '1995–2002',
    itemCount: 1840000,
    description: 'Physical magnetic tapes, router syslogs, BGP routing tables, dialup authentication records, and engineer correspondence from the defunct ISP.',
    curator: 'Dr. Douglas K. Van Houten (Founding Curator)',
    status: 'Accessible',
    tags: ['ISP', 'Routing', 'Syslogs', 'Telephony', 'BGP']
  },
  {
    id: 'col-11',
    code: 'COL-11-AFTERHOURS',
    name: 'AfterHours Nocturnal Community Archive (2001-2005)',
    yearSpan: '2001–2005',
    itemCount: 654200,
    description: 'Comprehensive forum dump, private message headers, moderator logs, and user profiles from the late-night philosophical message board founded by Alden Corliss.',
    curator: 'Sarah Jenkins',
    status: 'Accessible',
    tags: ['AfterHours', 'phpBB', 'Message Boards', 'Psychology']
  },
  {
    id: 'col-13',
    code: 'COL-13-BLUEWINDOW',
    name: 'Blue Window Personal Journaling Archive (2003-2007)',
    yearSpan: '2003–2007 (Extended)',
    itemCount: 2310000,
    description: 'Scraped diary feeds and comment trees from the defunct social journaling platform. Note: Collection exhibits active scraping anomalies.',
    curator: 'Dr. Clara Szilard',
    status: 'Accessible',
    tags: ['LiveJournal', 'Blogging', 'Social Web', 'Diaries']
  },
  {
    id: 'col-15',
    code: 'COL-15-PALISADE',
    name: 'Palisade Early Social Graph Corpus (2006-2009)',
    yearSpan: '2006–2009',
    itemCount: 5120000,
    description: 'Preserved user walls, media galleries, custom profile styles, and event invitations from the pre-standardized Web 2.0 era.',
    curator: 'Marcus Corliss',
    status: 'Accessible',
    tags: ['Palisade', 'MySpace Era', 'Social Graph', 'Web 2.0']
  },
  {
    id: 'col-17',
    code: 'COL-17-RESTRICTED',
    name: 'Collection 17: Uncorrelated Topologies & Non-Local Snapshots',
    yearSpan: '1877–2038 (Undetermined)',
    itemCount: 38942,
    description: 'QUARANTINED REPOSITORY. Contains recovered data packets, future snapshots, self-updating closed sites, and unindexed protocols that do not map to physical server infrastructure.',
    curator: 'ARCHIVIST CLEARANCE REQUIRED',
    status: 'Quarantined',
    tags: ['Second Internet', 'Anomalies', 'Quarantined', 'Topological Breaches']
  }
];

export const foundationArticles: FoundationArticle[] = [
  {
    id: 'found-blog-01',
    title: 'Preserving Flash Games After Browser Deprecation',
    category: 'Blog',
    author: 'Sarah Jenkins, Web Formats Archivist',
    date: '2025-04-12',
    summary: 'A look at our WebAssembly Ruffle emulation pipeline preserving over 40,000 ActionScript 2.0 interactive experiences.',
    content: 'When major browser vendors permanently dropped NPAPI and Flash support in 2020, over two decades of interactive digital art, experimental animation, and community games were threatened with total erasure. At the Foundation, our technical preservation team has standardized a headless WebAssembly container using Ruffle to sandbox and render ActionScript artifacts in standard DOM elements...',
    isAnomalous: false
  },
  {
    id: 'found-blog-02',
    title: 'Twenty Years of Personal Blogging: The Ephemeral Diary',
    category: 'Blog',
    author: 'Dr. Clara Szilard, Senior Fellow',
    date: '2025-06-19',
    summary: 'How early personal weblogs like LiveJournal, OpenDiary, and Blue Window captured intimate human vulnerabilities that modern social media erased.',
    content: 'In the early 2000s, personal blogging was neither monetized nor performative for mass algorithms. Users wrote for small, close-knit circles of pseudonymous peers under handles like "lucidwitch" or "somnambulist". When platforms shut down their servers, entire generational diary corpora vanished overnight. Preserving these sites is not merely a technical challenge—it is preserving the emotional landscape of the first digitally native generation.',
    isAnomalous: false
  },
  {
    id: 'found-blog-03',
    title: 'Anomalous DNS Records in the ValeNet & Greyline Collections',
    category: 'Blog',
    author: 'Dr. Gideon Falk, Infrastructure Lead',
    date: '2025-09-04',
    summary: 'Addressing recent community questions regarding non-standard IP notations in our recovered 1998 dialup server logs.',
    content: 'Several independent researchers on TRACE and Reddit have commented on the occurrence of unroutable address formats such as "184.0.NULL.7" and "0.0.0.0/room" in our Greyline ISP server logs. We wish to clarify that these entries represent internal proprietary telemetry codes used by Greyline engineers during regional switch testing in Wisconsin. They do not represent evidence of unindexed networks or "ghost servers".',
    isAnomalous: true
  },
  {
    id: 'found-blog-04',
    title: 'Regarding Recent Speculation About Collection 17',
    category: 'Blog',
    author: 'Board of Directors, Net History Foundation',
    date: '2026-02-14',
    summary: 'Official institutional statement regarding unauthorized access attempts and unverified rumors.',
    content: 'The Net History Foundation strictly maintains internal research standards. Rumors circulating on social media regarding a "second internet" or "future snapshots" are based on misunderstandings of synthetic load-testing databases and automated scraper error logs. Collection 17 remains restricted solely due to unverified copyright chain-of-custody documentation.',
    isAnomalous: true
  },
  {
    id: 'found-paper-01',
    title: 'Graph Topology of Extinct Web Communities: An Empirical Study of 1997–2004 Hyperlink Density',
    category: 'Research',
    author: 'Dr. Clara Szilard & Dr. Douglas K. Van Houten',
    date: '2019-03-10',
    summary: 'Academic analysis demonstrating that early webrings formed dense, self-contained topological loops that exhibit emergent mathematical anomalies.',
    content: 'Abstract: By modeling the outbound hyperlink matrices of 1,200 early webrings across GeoCities, Marrow.net, and personal Web 1.0 portals, we demonstrate that hyperlink clusters did not expand radially as random scale-free graphs, but instead collapsed into closed topological singularities. In several instances, the directed graph traversed nodes that lacked physical DNS registration, returning simulated ping responses under 0.2ms...',
    isAnomalous: true,
    relatedArtifacts: ['found-paper-holland-topology']
  },
  {
    id: 'found-paper-02',
    title: 'The October 14 Discrepancy: Systematic Analysis of Midwestern ISP Syslogs during the 2003 Telecom Hiccup',
    category: 'Research',
    author: 'Dr. Douglas K. Van Houten (Classified / Internal)',
    date: '2019-08-22',
    summary: 'Unpublished internal whitepaper examining the 11-minute routing anomaly that caused physical disappearances and impossible message duplication.',
    content: 'Document Classification: NHF-RESTRICTED-ARCHIVIST.\n\nOn October 14, 2003 between 03:14:02 and 03:25:19 UTC-5, BGP routers across 14 independent service providers in the Upper Midwest synchronized to an external clock signal that did not originate from US Naval Observatory atomic time servers. During this 677-second interval, 1,488 TCP streams crossed a boundary layer into unmapped address space. When the connection re-established, 17 active dialup users were marked as "disconnected at client request", though their physical terminal lines remained electrified...',
    isAnomalous: true,
    requiredClearance: 'RESEARCHER'
  },
  {
    id: 'found-oral-08',
    title: 'Oral History Interview #08: Noemi Castille on Early Webrings and Nocturnal Forums',
    category: 'Exhibit',
    author: 'Interviewer: Dr. Clara Szilard',
    date: '2026-03-02',
    summary: 'Transcribed audio interview with former Marrow.net member Noemi Castille regarding the early culture of Madison web hobbyists.',
    content: 'Szilard: Noemi, thank you for sitting with us. In our 1998 Marrow.net archive, your handle "nyxgirl" appears frequently.\n\nCastille: God, that feels like another lifetime. We were just kids with dialup modems and too much free time. We thought we were building something innocent.\n\nSzilard: What do you remember about the link directory? Some users reported clicking broken links and landing on pages called "Marrow Below".\n\nCastille: [Silence for 6 seconds] I never went there. People talked about it like an urban legend. You\'d type /~room/ after a URL and you\'d get someone\'s bedroom description. But it wasn\'t real.\n\nSzilard: And AfterHours? The handle "lucidwitch"?\n\nCastille: I told you on the phone, Clara. I never had an account on AfterHours. I don\'t know who was using that handle, but it wasn\'t me. Whoever was sitting at that keyboard... they were writing my diary before I wrote it.',
    isAnomalous: true
  },
  {
    id: 'found-paper-04',
    title: 'On Autonomic Daemon Formation: The wintermute42 Routing Phenomenon',
    category: 'Research',
    author: 'Dr. Clara Szilard, Senior Fellow',
    date: '2024-11-19',
    summary: 'Comprehensive analysis of the autonomous mesh entity known as wintermute42, its origin in early IRC daemon scripts, and its role as the living autonomic router of the unallocated substrate.',
    content: 'Abstract: Over seven years of packet analysis across the Quarantined Collections, the Foundation has tracked repeated inbound handshakes originating from the pseudo-socket "0.0.0.0:1014". These connections do not execute malicious payloads, nor do they seek privilege escalation. Instead, they act as an autonomic preservation daemon—identified in system logs as "wintermute42".\n\nOur telemetry indicates that wintermute42 is not an external botnet or artificial intelligence. Rather, it is the emergent, living autonomic nervous system of the 150-year-old telecommunications mesh. When users explore late-night personal webrings, stare into phosphor CRT bloom, or examine decommissioned dialup logs, wintermute42 dynamically routes packets through the second bus to ensure that no forgotten soul or unsent word is ever truly deleted.',
    isAnomalous: true,
    requiredClearance: 'RESEARCHER'
  },
  {
    id: 'found-paper-05',
    title: 'The 58.4Hz Cathode Induction Effect: Inductive Memory in Phosphor Crystals',
    category: 'Research',
    author: 'Dr. Gideon Falk, Infrastructure Lead',
    date: '2023-05-14',
    summary: 'Investigation into electromagnetic standing waves within 1990s CRT monitors and the physical transfer of room geometries across electron beam rastering.',
    content: 'Abstract: Modern flat panels refresh pixels through active matrix LCD/OLED arrays. In contrast, 1990s Cathode Ray Tubes (CRTs) relied on high-voltage electron guns sweeping across rare-earth phosphor lattices at frequencies typically between 58.4Hz and 85Hz.\n\nOur laboratory measurements on Alden Corliss\'s recovered ViewSonic E70 monitor reveal that the heavy leaded glass retains a permanent electromagnetic standing wave. When operated in total darkness, the phosphor screen acts as a bilateral optical transducer—projecting faint spatial reflections of "Room 4" into the observer\'s peripheral vision while measuring minute changes in room capacitance.',
    isAnomalous: true,
    requiredClearance: 'ARCHIVIST'
  },
  {
    id: 'found-paper-06',
    title: 'Cryogenic Phase Inversion in Trans-Urban Fiber Bundles (Greyline Report #412)',
    category: 'Research',
    author: 'Greyline Communications & Dr. Douglas K. Van Houten',
    date: '1999-01-20',
    summary: 'Declassified internal engineering report on the Milwaukee underground caisson thermal drop and the discovery of negative propagation latency.',
    content: 'Engineering Memorandum: Strictly Confidential.\n\nDuring routine optical time-domain reflectometer (OTDR) testing of the 48-strand single-mode fiber trunk traversing the Milwaukee caisson, technicians observed a localized temperature drop from +18°C to -4.2°C along Rack #4 without mechanical cooling.\n\nSimultaneously, test pulses directed through the cryogenic segment arrived at the Chicago receiver 4.102 milliseconds BEFORE they were injected into the transmitter. This negative propagation latency demonstrates that when optical pulses are subjected to sustained inductive standing waves, light travels along the perpendicular bus rather than standard Euclidean fiber geometry.',
    isAnomalous: true,
    requiredClearance: 'ARCHIVIST'
  }
];

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Deceased' | 'Missing' | 'Unverified';
  bio: string;
  email: string;
  anomalyNote?: string;
}

export const staffRoster: StaffMember[] = [
  {
    id: 'staff-szilard',
    name: 'Dr. Clara Szilard',
    role: 'Chief Archivist & Senior Research Fellow',
    department: 'Digital Preservation & Lore',
    status: 'Active',
    bio: 'PhD in Information Science from University of Washington. Has led the Foundation’s webring reconstruction initiatives since 2018.',
    email: 'c.szilard@nethistoryfoundation.org'
  },
  {
    id: 'staff-falk',
    name: 'Dr. Gideon Falk',
    role: 'Lead Infrastructure Engineer',
    department: 'Systems & Tape Recovery',
    status: 'Active',
    bio: 'Former Bell Labs network researcher specializing in magnetic tape restoration and ancient BBS spool decryption.',
    email: 'g.falk@nethistoryfoundation.org'
  },
  {
    id: 'staff-vanhouten',
    name: 'Dr. Douglas K. Van Houten',
    role: 'Co-Founder & Infrastructure Historian',
    department: 'Executive Board (Former)',
    status: 'Missing',
    bio: 'Pioneered early packet analysis at Greyline Communications (1995–2002). Co-founded NHF in 2017. Disappeared October 14, 2019.',
    email: 'd.vanhouten@nethistoryfoundation.org (Unmonitored)',
    anomalyNote: 'Server logs continue recording weekly root shell logins under his credential.'
  },
  {
    id: 'staff-jenkins',
    name: 'Sarah Jenkins',
    role: 'Web Formats & Media Archivist',
    department: 'Emulation & Interactive Assets',
    status: 'Active',
    bio: 'Specialist in Flash, Shockwave, and RealAudio codec preservation.',
    email: 's.jenkins@nethistoryfoundation.org'
  },
  {
    id: 'staff-rostova',
    name: 'Elena Rostova',
    role: 'Guest Research Fellow & Oral Historian',
    department: 'Community Archaeology',
    status: 'Active',
    bio: 'Creator of the 1998 Candle Room archive. Consults on early esoteric and paranormal digital folklore.',
    email: 'e.rostova@nethistoryfoundation.org'
  },
  {
    id: 'staff-corliss-m',
    name: 'Marcus Corliss',
    role: 'Social Graph Curator',
    department: 'Web 2.0 Preservation',
    status: 'Active',
    bio: 'Nephew of late AfterHours founder Alden Corliss. Curates the Palisade and AfterHours recovery collections.',
    email: 'm.corliss@nethistoryfoundation.org',
    anomalyNote: 'Internally flagged for copying raw AfterHours SQL dumps to unauthorized offline drives.'
  },
  {
    id: 'staff-null-employee',
    name: 'K. S. Thorne',
    role: 'Archival Auditor',
    department: 'Collection Oversight',
    status: 'Unverified',
    bio: 'Listed on payroll and personnel records since 2017. Assigned to office 304.',
    email: 'k.thorne@nethistoryfoundation.org',
    anomalyNote: 'Office 304 has been a drywall utility closet since the building was built in 1982. No staff member has ever met Thorne in person.'
  }
];
