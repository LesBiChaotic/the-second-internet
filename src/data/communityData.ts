import { CommunityMember } from '../types';

export const communityMembers: CommunityMember[] = [
  {
    id: 'mem-analogghost',
    handle: 'analogghost',
    displayName: 'Marcus Lin',
    category: 'INVESTIGATOR',
    role: 'Hardware Archaeologist & Lead Field Investigator',
    reputation: 14820,
    joinDate: 'Feb 2024',
    status: 'ONLINE',
    statusText: 'Analyzing Greyline tape block #14 on 9-track drive in Chicago lab',
    badges: [
      { label: 'HARDWARE RECOVERY', color: 'blue' },
      { label: 'MILWAUKEE BINDER FINDER', color: 'amber' },
      { label: 'FIELD RESEARCHER', color: 'green' }
    ],
    avatarUrl: './assets/images/greyline_rack_frost.jpg',
    bio: 'Independent e-waste hardware collector and telecommunications forensic specialist in Chicago. Bought the decommissioned Greyline server lot in 2024 and uncovered the anomalous 1998 dot-matrix route dumps.',
    notableFindings: [
      'Discovered 1998 Greyline dot-matrix route table listing 2007 domains.',
      'Carbon-dated magnetic tape oxide degradation confirming authentic late-90s provenance.'
    ]
  },
  {
    id: 'mem-patchnotes',
    handle: 'patchnotes',
    displayName: 'Samira Al-Mansoor',
    category: 'SKEPTIC',
    role: 'Senior Systems Engineer & Skeptic Lead',
    reputation: 18910,
    joinDate: 'Jan 2025',
    status: 'ONLINE',
    statusText: 'Auditing MySQL replication race condition logs',
    badges: [
      { label: 'SENIOR SKEPTIC', color: 'gray' },
      { label: 'RACE CONDITION DETECTIVE', color: 'blue' },
      { label: 'DATABASE AUDITOR', color: 'green' }
    ],
    bio: 'Infrastructure and distributed systems engineer. Dedicated to explaining archive anomalies through legitimate technical bugs, BGP misconfigurations, bit-rot, and database replication discrepancies.',
    notableFindings: [
      'Debunked 40+ fake numbers stations as synthetic WebAudio test oscillators.',
      'Documented the exact Apache 1.3 memory leak pattern in 1997 CGI scripts.'
    ]
  },
  {
    id: 'mem-candlekeeper',
    handle: 'candle_keeper',
    displayName: 'Elena Rostova',
    category: 'HISTORICAL',
    role: 'Founder of Candle Room (1998) & Folklorist',
    reputation: 29400,
    joinDate: 'Aug 2024',
    status: 'ONLINE',
    statusText: 'Translating 1974 Soviet telecommunications journals',
    badges: [
      { label: '1998 ORIGINAL', color: 'amber' },
      { label: 'CANDLE ROOM ARCHIVIST', color: 'blue' },
      { label: 'SECOND NET WITNESS', color: 'red' }
    ],
    bio: 'Creator of the 1998 Candle Room directory. First indexed person to record the phrase "The Second Internet" from an open Siberian FTP server.',
    notableFindings: [
      'Identified Dr. Douglas Van Houten\'s signature on 1998 Milwaukee server memos.',
      'Correlated 1877 Scottish telegraph anomalies with 1933 Bell Exchange #47.'
    ]
  },
  {
    id: 'mem-cszilard',
    handle: 'c_szilard_nhf',
    displayName: 'Dr. Clara Szilard',
    category: 'FOUNDATION',
    role: 'Chief Archivist & Senior Research Fellow (NHF)',
    reputation: 34200,
    joinDate: 'Sept 2018',
    status: 'RESEARCHING',
    statusText: 'Reviewing Collection 17 quarantine chain-of-custody logs',
    badges: [
      { label: 'FOUNDATION OFFICIAL', color: 'blue' },
      { label: 'CHIEF ARCHIVIST', color: 'green' },
      { label: 'RESTRICTED CLEARANCE', color: 'red' }
    ],
    bio: 'Senior fellow at the Net History Foundation. Oversees digital preservation pipelines across Collections 01-16 while privately investigating the 23-year topological cycle.',
    notableFindings: [
      'Conducted Oral History Interview #08 with Noemi Castille.',
      'Co-authored 2019 Graph Topology paper on early webring singularity loops.'
    ]
  },
  {
    id: 'mem-wintermute',
    handle: 'wintermute_42',
    displayName: 'wintermute42',
    category: 'ANOMALOUS',
    role: 'Undefined / Second Bus Resident',
    reputation: 0,
    joinDate: 'Apr 1998 (2004 / 2031)',
    status: 'UNRECOGNIZED_NETWORK',
    statusText: 'Active on 0.0.0.0/room (Always Present)',
    badges: [
      { label: 'LEVEL: NULL', color: 'red' },
      { label: 'TEMPORAL GHOST', color: 'red' },
      { label: 'DO NOT ANSWER', color: 'amber' }
    ],
    avatarUrl: './assets/images/afterhours_crt_room.jpg',
    bio: 'Impossible recurring presence recorded on Marrow.net (1998), AfterHours (2004), Terminal 21 (2008), TRACE (2026), and restricted 2031 archive mail spools without aging.',
    notableFindings: [
      'Warned users in 1998: "The door does not lock from the inside."',
      'Broadcasted to AfterHours on Oct 14 2003: "Please stop describing us."'
    ]
  },
  {
    id: 'mem-rowanglass',
    handle: 'rowanglass',
    displayName: 'Rowan Glass',
    category: 'HISTORICAL',
    role: 'Photographer & Continuous Blogger',
    reputation: 12190,
    joinDate: 'Jan 2002',
    status: 'UNRECOGNIZED_NETWORK',
    statusText: 'Posting to decommissioned Blue Window host in Portland',
    badges: [
      { label: 'ILFORD HP5 35MM', color: 'blue' },
      { label: 'CLOSED HOST RESIDENT', color: 'red' },
      { label: 'GLASSHOUSE 2002', color: 'amber' }
    ],
    avatarUrl: './assets/images/portland_payphone_rain.jpg',
    bio: 'Photographer on AfterHours. When Blue Window shut down its hardware in 2007, Rowan continued updating her blog through unallocated IP 0.0.0.0/rowan with live 2026 entries.',
    notableFindings: [
      'Photographed the Burnside payphone aperture in March 2002.',
      'Continues daily journal entries describing a silent, car-less Portland.'
    ]
  },
  {
    id: 'mem-dvanhouten',
    handle: 'd_vanhouten',
    displayName: 'Dr. Douglas K. Van Houten',
    category: 'FOUNDATION',
    role: 'Greyline Senior Architect & NHF Co-Founder',
    reputation: 99999,
    joinDate: 'Jun 1995',
    status: 'UNRECOGNIZED_NETWORK',
    statusText: 'Missing since October 14, 2019 (Root Shell Active)',
    badges: [
      { label: 'BGP PIONEER', color: 'blue' },
      { label: 'FOUNDATION CO-FOUNDER', color: 'green' },
      { label: 'DISAPPEARED 2019', color: 'red' }
    ],
    avatarUrl: './assets/images/greyline_rack_frost.jpg',
    bio: 'Authored the 1998 Invalid Address memo at Greyline. Vanished on the 16th anniversary of the 2003 Routing Event. Weekly root shell logins still execute under his credentials.',
    notableFindings: [
      'Identified negative 4ms latency on unrouted subnet 0.0.0.0/room.',
      'Formulated the 23-year harmonic telecommunications cycle equation.'
    ]
  },
  {
    id: 'mem-modoverseer',
    handle: 'mod_overseer',
    displayName: 'TRACE Moderator Team',
    category: 'INVESTIGATOR',
    role: 'Community Moderator & Verification Lead',
    reputation: 22100,
    joinDate: 'Jan 2024',
    status: 'ONLINE',
    statusText: 'Locking unverified conspiracy threads and enforcing citation rules',
    badges: [
      { label: 'MODERATOR', color: 'blue' },
      { label: 'RULE ENFORCER', color: 'gray' },
      { label: 'CHAIN OF CUSTODY', color: 'green' }
    ],
    bio: 'Ensures research on TRACE meets digital archaeology standards. Locks threads that leak proprietary telecommunications schematics or unverified missing person allegations.',
    notableFindings: [
      'Established the 3-point provenance rule for physical server tape scans.'
    ]
  }
];
