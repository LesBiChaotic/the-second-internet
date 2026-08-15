import { CharacterIdentity } from '../types';

export const charactersData: CharacterIdentity[] = [
  {
    id: 'char-noemi-castille',
    canonicalName: 'Noemi Castille',
    tier: 1,
    aliases: [
      { platform: 'Marrow.net', handle: 'nyxgirl', era: '1997-1999' },
      { platform: 'AfterHours.org', handle: 'lucidwitch', era: '2001-2003' },
      { platform: 'Blue Window', handle: 'noemi_c', era: '2004-2006' },
      { platform: 'Palisade Social', handle: 'Noemi Castille (Real Name)', era: '2007' },
      { platform: 'Net History Foundation', handle: 'Oral History Interviewee #08', era: '2026' }
    ],
    firstSeen: '1997-11-14',
    lastSeen: '2026-03-02',
    avatarUrl: '/assets/images/naomi_polaroid_1998.jpg',
    biography: 'Central recurring figure across four distinct eras of early web culture. As "nyxgirl" on Marrow.net in 1997, she organized webrings and discussed strange 404 redirects. On AfterHours (2001-2003) as "lucidwitch", she was present during the infamous Oct 14, 2003 Routing Event where she received the broadcast "Please stop describing us". Later kept an emotional personal diary on Blue Window before attempting to retire to Palisade in 2007. In 2026, she provided a contradictory oral history interview to the Foundation claiming she never used the handle lucidwitch.',
    status: 'Active',
    contradictions: [
      'Claims in 2026 interview she never heard of AfterHours, but her 2004 Blue Window journal explicitly references AfterHours founder "janus" (Alden Corliss).',
      'Birth year listed as 1980 in Marrow member directory, but Palisade profile lists 1978 and high school archive lists 1976 graduation.'
    ],
    anomalousEvidenceIds: ['doc-oral-08', 'ah-thread-oct14', 'mw-post-nyx-below', 'bw-entry-naomi-04']
  },
  {
    id: 'char-wintermute42',
    canonicalName: 'wintermute42',
    tier: 1,
    aliases: [
      { platform: 'Marrow.net', handle: 'wintermute42', era: '1998' },
      { platform: 'AfterHours.org', handle: 'wintermute42', era: '2004' },
      { platform: 'Terminal 21', handle: 'w1ntermute', era: '2008' },
      { platform: 'TRACE Community', handle: 'wintermute_42', era: '2026' },
      { platform: 'Second Internet / Room', handle: 'wintermute42', era: '2031 (Recovered Snapshot)' }
    ],
    firstSeen: '1998-04-12',
    lastSeen: '2031-11-09 (Anomalous Timestamp)',
    biography: 'The most persistent, enigmatic identity across the archive. Originally registered on Marrow.net in April 1998, but forum database logs show a registration date of 2004. In 2004 on AfterHours, the user claimed to have no recollection of posting in 1998. In 2026, an identical handle appears on the TRACE research board asking questions about the Foundation\'s Collection 17. The restricted vault contains a cached Second Internet board snapshot timestamped 2031 warning: "don\'t answer wintermute42".',
    status: 'Impossible',
    contradictions: [
      'Registration timestamps precede account creation by 6 years on Marrow.net.',
      'Active posts discovered in snapshots dated 2029 and 2031.',
      'Writing style analysis shows identical keystroke cadence and punctuation idiosyncrasies across a 33-year span without aging markers.'
    ],
    anomalousEvidenceIds: ['mw-user-wintermute', 'ah-pm-wintermute', 't21-thread-wintermute', 'vault-snap-2031']
  },
  {
    id: 'char-rowan-glass',
    canonicalName: 'Rowan Glass',
    tier: 1,
    aliases: [
      { platform: 'AfterHours.org', handle: 'glasshouse', era: '2002-2003' },
      { platform: 'Blue Window', handle: 'rowanglass', era: '2003-2026' },
      { platform: 'Candle Room', handle: 'rowan_g (Commenter)', era: '1999' }
    ],
    firstSeen: '1999-08-20',
    lastSeen: '2026-07-14 (Still Updating Closed Host)',
    avatarUrl: '/assets/images/portland_payphone_rain.jpg',
    biography: 'Photographer and essayist based in Portland/Seattle. Maintained the famous "Glasshouse" persona on AfterHours. When Blue Window shut down its physical servers in December 2007, Rowan\'s blog continued updating through impossible HTTP routing. New journal entries have been recorded in 2011, 2018, and as recently as 2026, describing normal daily life while receiving comments from deceased friends.',
    status: 'Impossible',
    contradictions: [
      'Blog server hardware was physically decommissioned and recycled in 2008, yet the Foundation continues to scrape new live posts from unroutable IP 0.0.0.0/rowan.',
      'Posts in 2018 describe weather patterns that match Portland 1998 rather than 2018.'
    ],
    anomalousEvidenceIds: ['bw-blog-harper', 'ah-thread-glass-panic', 'greyline-log-harper-ip']
  },
  {
    id: 'char-douglas-van-houten',
    canonicalName: 'Dr. Douglas K. Van Houten',
    tier: 1,
    aliases: [
      { platform: 'Greyline ISP', handle: 'd.vanhouten@greyline.net', era: '1996-2002' },
      { platform: 'Terminal 21', handle: 'dk_vanhouten', era: '2002-2005' },
      { platform: 'Net History Foundation', handle: 'Co-Founder (Deceased / Missing)', era: '2017' }
    ],
    firstSeen: '1996-03-01',
    lastSeen: '2019-10-14',
    avatarUrl: '/assets/images/greyline_rack_frost.jpg',
    biography: 'Lead infrastructure engineer at Greyline ISP during the 1990s. Authored the famous 1998 internal memo: "It is behaving like we are connected to another network that believes we are the invalid address." Co-founded the Net History Foundation in 2017 to catalog anomalous early-net artifacts. Officially vanished on October 14, 2019 (the 16th anniversary of the 2003 Routing Event). Internal Foundation records list him alternately as "Deceased" and "On Indefinite Field Leave".',
    status: 'Disappeared',
    contradictions: [
      'Foundation HR documents contain a death certificate dated 2019 alongside badge scan entries from 2024.',
      'Wrote technical reports on the Second Internet in 1998 using networking terminology that was not standardized until 2015.'
    ],
    anomalousEvidenceIds: ['greyline-memo-holland-98', 'found-paper-holland-topology', 'police-report-holland']
  },
  {
    id: 'char-alden-corliss',
    canonicalName: 'Alden "Janus" Corliss',
    tier: 1,
    aliases: [
      { platform: 'AfterHours.org', handle: 'janus (Lead Admin)', era: '2001-2005' },
      { platform: 'Marrow.net', handle: 'corliss_a', era: '1998' },
      { platform: 'Candle Room', handle: 'janus_archive', era: '2000' }
    ],
    firstSeen: '1998-02-19',
    lastSeen: '2003-10-15',
    avatarUrl: '/assets/images/afterhours_crt_room.jpg',
    biography: 'Founder and chief moderator of AfterHours. Dedicated to creating an uncommercialized sanctuary for nocturnal thinkers. On the night of October 14, 2003, Janus received hundreds of automated moderator alerts as threads across the forum began mirroring real-world physical actions of users. His final post at 04:19 AM reads: "Do not look behind the monitor." His house at 1412 E. Johnson St in Madison, WI was found undisturbed the next morning with his ViewSonic CRT monitor still humming.',
    status: 'Disappeared',
    contradictions: [
      'Phone records show a 47-minute incoming call to his landline from his own forum\'s dial-in modem at the exact moment he vanished.'
    ],
    anomalousEvidenceIds: ['ah-thread-janus-last', 'police-report-vance', 'ah-mod-log-oct14']
  },
  {
    id: 'char-elena-rostova',
    canonicalName: 'Elena Rostova',
    tier: 1,
    aliases: [
      { platform: 'Candle Room', handle: 'witch_candle (Site Owner)', era: '1998-2001' },
      { platform: 'Terminal 21', handle: 'rostova_e', era: '2003' },
      { platform: 'TRACE Community', handle: 'candle_keeper', era: '2026' }
    ],
    firstSeen: '1998-01-10',
    lastSeen: '2026-08-01',
    biography: 'Creator of the eccentric 1998 paranormal web directory Candle Room. While initially seen as a teenage web enthusiast obsessed with spooky URLs and numbers stations, her site was the first publicly indexed location to coin the exact term "The Second Internet". Elena claims she did not invent the phrase, but copied it from an unindexed plaintext file retrieved from an open FTP server in Novosibirsk.',
    status: 'Active',
    contradictions: [
      'Claims she was 16 in 1998, but Russian university records indicate she presented an advanced paper on graph topology in 1989.'
    ],
    anomalousEvidenceIds: ['cr-faq-2ndnet', 'cr-story-novosibirsk', 'trace-post-rostova-ama']
  },
  {
    id: 'char-dr-clara-szilard',
    canonicalName: 'Dr. Clara Szilard',
    tier: 1,
    aliases: [
      { platform: 'Net History Foundation', handle: 'Lead Archivist / Senior Fellow', era: '2018-Present' },
      { platform: 'TRACE Community', handle: 'c_szilard_nhf', era: '2025-2026' }
    ],
    firstSeen: '2018-09-01',
    lastSeen: 'Present (2026)',
    biography: 'Chief Archivist at the Net History Foundation. Oversees Collections 01 through 16, and has publicly defended the Foundation against claims of archive censorship. However, internal leaked emails reveal she has been privately investigating "Collection 17" (the quarantined anomalous records) and has documented dozens of unexplainable data mutations in archived snapshot databases.',
    status: 'Active',
    contradictions: [
      'Published a paper in 2022 debunking the 2003 Routing Event, while simultaneously maintaining a locked personal notebook calculating its recurring 23-year cycle.'
    ],
    anomalousEvidenceIds: ['email-mendez-quarantine', 'found-paper-mendez-critique', 'vault-note-cycle']
  },
  {
    id: 'char-marcus-lin',
    canonicalName: 'Marcus Lin',
    tier: 1,
    aliases: [
      { platform: 'TRACE Community', handle: 'analogghost (Lead Investigator)', era: '2024-Present' },
      { platform: 'Terminal 21', handle: 'mlin_reconstructed', era: '2004' }
    ],
    firstSeen: '2024-02-11',
    lastSeen: 'Present (2026)',
    biography: 'Independent internet archaeologist and hardware collector. Marcus bought a lot of decommissioned Greyline ISP server drives from an e-waste auction in 2024, uncovering raw physical printouts and magnetic tapes with impossible packet routing logs that the Foundation had not published.',
    status: 'Active',
    contradictions: [
      'Physical printout of Greyline routing table from 1998 in his possession lists domains registered between 2004 and 2012.'
    ],
    anomalousEvidenceIds: ['trace-post-binder-scan', 'greyline-tape-lin', 'trace-thread-marcus-greyline']
  },
  {
    id: 'char-somnambulist',
    canonicalName: 'Simon "somnambulist" Callow',
    tier: 2,
    aliases: [
      { platform: 'AfterHours.org', handle: 'somnambulist', era: '2001-2003' },
      { platform: 'Blue Window', handle: 'callow_s', era: '2004' }
    ],
    firstSeen: '2001-04-10',
    lastSeen: '2003-10-14',
    biography: 'Chronic insomniac and poet on AfterHours. On Oct 14, 2003, wrote: "I have been awake for so long that the screen is no longer in front of me; I am standing on the other side of the glass." Disappeared from all records following the event.',
    status: 'Disappeared',
    contradictions: ['No death record or missing person report found under his real name.'],
    anomalousEvidenceIds: ['ah-post-somnambulist-glass']
  },
  {
    id: 'char-weatherboy',
    canonicalName: 'Julian "weatherboy" Frost',
    tier: 2,
    aliases: [
      { platform: 'AfterHours.org', handle: 'weatherboy', era: '2002-2005' },
      { platform: 'Palisade Social', handle: 'Julian Frost', era: '2007' }
    ],
    firstSeen: '2002-11-05',
    lastSeen: '2007-09-18',
    biography: 'Amateur meteorologist who posted daily atmospheric pressure and radar maps. Noticed that during the 2003 Routing Event, Doppler radar in Minnesota and Wisconsin captured circular electromagnetic voids over ISP switching hubs.',
    status: 'Active',
    contradictions: ['His Palisade account continued posting automated weather updates for 400 days after his death in 2006.'],
    anomalousEvidenceIds: ['ah-thread-weather-radar', 'palisade-post-frost-dead']
  },
  {
    id: 'char-cassia-morello',
    canonicalName: 'Cassia Morello',
    tier: 2,
    aliases: [
      { platform: 'AfterHours.org', handle: 'minor_key', era: '2001-2004' },
      { platform: 'Marrow.net', handle: 'cassia_m', era: '1998' }
    ],
    firstSeen: '1998-05-12',
    lastSeen: '2004-12-30',
    biography: 'Music theory student in Chicago. Mentioned in the famous chilling Oct 14 broadcast post: "minor_key is eating something from a blue bowl." She confirmed in panic that she was indeed alone in her kitchen eating cereal from a blue ceramic bowl.',
    status: 'Active',
    contradictions: ['Claims she threw the blue bowl away in 2001, two years before the 2003 incident.'],
    anomalousEvidenceIds: ['ah-thread-blue-bowl', 'mw-post-tessa-music']
  },
  {
    id: 'char-northbound',
    canonicalName: 'Kip "northbound" Larson',
    tier: 2,
    aliases: [
      { platform: 'AfterHours.org', handle: 'northbound', era: '2001-2003' },
      { platform: 'Terminal 21', handle: 'northbound_sys', era: '2003' }
    ],
    firstSeen: '2001-09-02',
    lastSeen: '2003-10-14',
    biography: 'Night-shift long-haul logistics coordinator who logged into AfterHours from highway truck stops using early mobile dialup adapters. Reported roadside telephone poles humming in unison on Oct 14, 2003.',
    status: 'Disappeared',
    contradictions: ['His truck was found parked at an abandoned rest stop in North Dakota with the laptop modem still dialing.'],
    anomalousEvidenceIds: ['ah-thread-northbound-hum', 'police-report-larson']
  },
  {
    id: 'char-corbin-keller',
    canonicalName: 'Corbin "pixelpunk" Keller',
    tier: 2,
    aliases: [
      { platform: 'Marrow.net', handle: 'pixelpunk (Webmaster)', era: '1997-1999' },
      { platform: 'Terminal 21', handle: 'corbin_k', era: '2002' }
    ],
    firstSeen: '1997-10-02',
    lastSeen: '2008-04-15',
    biography: 'Electrical engineering student and webmaster of Marrow.net. Wrote the custom Perl discussion board and maintained the physical server in the CS department basement in Madison.',
    status: 'Active',
    contradictions: [],
    anomalousEvidenceIds: ['mw-thread-welcome', 'mw-thread-bypass']
  },
  {
    id: 'char-bram-kostadinov',
    canonicalName: 'Bram "redshift" Kostadinov',
    tier: 2,
    aliases: [
      { platform: 'Marrow.net', handle: 'redshift', era: '1997-1999' },
      { platform: 'Greyline ISP', handle: 'bram.k@greyline.net', era: '1998' }
    ],
    firstSeen: '1997-12-01',
    lastSeen: '2006-11-20',
    biography: 'Physics researcher and Linux 2.0.33 kernel purist. First noticed the Apache CGI memory leak on Marrow that allowed unroutable packets from Greyline Node 4 to resolve.',
    status: 'Active',
    contradictions: [],
    anomalousEvidenceIds: ['mw-thread-glitch', 'greyline-memo-bram']
  },
  {
    id: 'char-vladimir-koren',
    canonicalName: 'Vladimir Koren',
    tier: 2,
    aliases: [
      { platform: 'Terminal 21', handle: 'koren_v', era: '2002-2004' },
      { platform: 'Greyline ISP', handle: 'Contractor #44', era: '1998' }
    ],
    firstSeen: '1998-07-11',
    lastSeen: '2004-05-20',
    biography: 'Soviet-era telecommunications engineer who worked on early packet switching in Akademgorodok before immigrating to the US. Warned Terminal 21 engineers that Western computer networks were making the same "topological puncture" that Russian researchers encountered in 1974.',
    status: 'Deceased',
    contradictions: ['Autopsy report lists date of death as 1991, despite posting detailed forum analysis in 2004.'],
    anomalousEvidenceIds: ['t21-thread-koren-soviet', 'telegraph-doc-1974']
  },
  {
    id: 'char-patchnotes',
    canonicalName: 'Samira "patchnotes" Al-Mansoor',
    tier: 2,
    aliases: [
      { platform: 'TRACE Community', handle: 'patchnotes', era: '2025-Present' },
      { platform: 'Terminal 21', handle: 'sm_almansoor (Archive Viewer)', era: '2026' }
    ],
    firstSeen: '2025-01-15',
    lastSeen: 'Present (2026)',
    biography: 'Prominent skeptic and senior web systems engineer in the TRACE community. Consistently argues for digital bit-rot, database race conditions, and archivist pranksters as the true cause of the anomalies.',
    status: 'Active',
    contradictions: [],
    anomalousEvidenceIds: ['trace-post-patchnotes-skeptic']
  }
];
