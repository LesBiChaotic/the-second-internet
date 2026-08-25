import { SearchResultItem } from '../types';
import { charactersData } from './charactersData';
import { foundationArticles, foundationCollections } from './foundationData';
import { marrowThreads } from './marrowData';
import { afterhoursThreads } from './afterhoursData';
import { candleRoomArticles } from './candleRoomData';
import { greylineServerLogs, greylineMemos } from './greylineData';
import { blueWindowBlogs } from './blueWindowData';
import { terminal21Threads } from './terminal21Data';
import { tracePosts } from './traceFeedData';
import { emailsData } from './emailsData';
import { physicalDocsData } from './physicalDocsData';
import { whoisDatabase } from './whoisAndRoutesData';
import { palisadeProfiles } from './palisadeData';
import { webringSites } from './webringData';
import { chatLogsData } from './chatLogsData';

export const buildGlobalSearchIndex = (): SearchResultItem[] => {
  const index: SearchResultItem[] = [];

  // Archaeology Field Guide & Spoilers Matrix
  index.push({
    id: 'sr-field-guide',
    title: 'Archaeology Field Guide & Puzzle Decryption Matrix (Hints & Solutions)',
    type: 'DOCUMENT',
    collection: 'Investigator Manuals',
    date: '2026-08-15',
    snippet: 'Comprehensive investigator handbook containing deep lore timelines, the 4 grand mysteries, and multi-tier progressive spoiler blinds for all phone numbers, passcodes, and frequencies.',
    targetView: 'FIELD_GUIDE',
    isAnomalous: false
  });

  index.push({
    id: 'sr-tool-dead-network-quizzes',
    title: 'Dead Network Diagnostics (Two Interactive Quizzes)',
    type: 'DOCUMENT',
    collection: 'Archival Diagnostics',
    date: '1996–2026',
    snippet: 'Decide what to do when a decommissioned network answers, then perform an ethical five-stage autopsy of an abandoned communications system.',
    targetView: 'QUIZ',
    isAnomalous: true
  });

  // Dr. Van Houten's Missing Field Notebook
  index.push({
    id: 'sr-field-notebook',
    title: 'Dr. Douglas K. Van Houten\'s Missing Field Notebook (1995–2019)',
    type: 'DOCUMENT',
    collection: 'Recovered Corpora',
    date: '2019-10-14',
    snippet: 'Personal handwritten field journal of NHF co-founder Dr. Van Houten with cryogenic optical schematics, margin ciphers, and observation logs.',
    targetView: 'NOTEBOOK',
    isAnomalous: true
  });

  // Station Null Shortwave Receiver & Spectrogram
  index.push({
    id: 'sr-station-null-radio',
    title: 'Station Null Shortwave SDR Receiver & Waterfall Spectrograph',
    type: 'TECH_RECORD',
    collection: 'Archaeological Tools',
    date: '2026-08-15',
    snippet: 'Direct software-defined radio receiver with live waterfall spectrograph, Morse synthesizers, and Robot-36 SSTV image demodulator on 14.230 MHz.',
    targetView: 'RADIO_SPECTROGRAPH',
    isAnomalous: true
  });

  // Aperture UNIX Diagnostic Terminal CLI
  index.push({
    id: 'sr-aperture-terminal',
    title: 'Aperture UNIX Diagnostic Terminal CLI (/bin/sh)',
    type: 'TECH_RECORD',
    collection: 'Archaeological Tools',
    date: '2003-10-14',
    snippet: 'SunOS Ultra-Enterprise terminal console. Query user finger records, trace negative-latency packets, and unlock cryptographic substrate overrides.',
    targetView: 'APERTURE_TERMINAL',
    isAnomalous: true
  });

  // Room 4 CRT Monitor Live Simulation
  index.push({
    id: 'sr-room4-monitor',
    title: '"Room 4" CRT Monitor Live Simulation (Oct 14, 2003)',
    type: 'DOCUMENT',
    collection: 'Reconstructed Hardware',
    date: '2003-10-14',
    snippet: 'Authentic ViewSonic CRT monitor simulation from Alden Corliss\'s bedroom during the 11-Minute Breach with interactive BitchX IRC client.',
    targetView: 'ROOM4_MONITOR',
    isAnomalous: true
  });

  // Direct Messages & Terminal PMs
  index.push({
    id: 'sr-direct-messages',
    title: 'Direct Messages & Terminal PMs (Comms Inbox)',
    type: 'DOCUMENT',
    collection: 'Investigator Workbench',
    date: '2026-08-15',
    snippet: 'Encrypted real-time communication channel. Exchange direct private messages with @investigator_kai, @wintermute_42, and socket hosts.',
    targetView: 'DMS',
    isAnomalous: true
  });

  // Characters
  charactersData.forEach(c => {
    index.push({
      id: `sr-char-${c.id}`,
      title: `${c.canonicalName} (${c.aliases.map(a => a.handle).join(', ')})`,
      type: 'PERSON',
      collection: 'Biographical Roster',
      date: c.firstSeen,
      snippet: c.biography.slice(0, 180) + '...',
      targetView: 'PEOPLE',
      targetId: c.id,
      isAnomalous: c.tier === 1 && c.status === 'Impossible'
    });
  });

  // Foundation Articles
  foundationArticles.forEach(a => {
    index.push({
      id: `sr-found-${a.id}`,
      title: a.title,
      type: a.category === 'Research' ? 'TECH_RECORD' : 'DOCUMENT',
      collection: `Foundation ${a.category}`,
      date: a.date,
      snippet: a.summary,
      targetView: 'RESEARCH',
      targetId: a.id,
      isAnomalous: a.isAnomalous,
      requiredClearance: a.requiredClearance
    });
  });

  // Collections
  foundationCollections.forEach(col => {
    index.push({
      id: `sr-col-${col.id}`,
      title: `${col.code}: ${col.name}`,
      type: 'DOCUMENT',
      collection: 'Foundation Collections',
      date: col.yearSpan,
      snippet: col.description,
      targetView: 'COLLECTIONS',
      targetId: col.id,
      isAnomalous: col.status === 'Quarantined',
      requiredClearance: col.status === 'Quarantined' ? 'ARCHIVIST' : undefined
    });
  });

  // Marrow Threads
  marrowThreads.forEach(t => {
    index.push({
      id: `sr-mw-${t.id}`,
      title: `[Marrow.net] ${t.title}`,
      type: 'POST',
      collection: 'Collection 04: Marrow.net',
      date: t.createdDate,
      snippet: t.posts[0]?.content.slice(0, 160) + '...',
      targetView: 'SITE_MARROW',
      targetId: t.id,
      isAnomalous: t.isAnomalous
    });
  });

  // AfterHours Threads
  afterhoursThreads.forEach(t => {
    index.push({
      id: `sr-ah-${t.id}`,
      title: `[AfterHours] ${t.title}`,
      type: 'POST',
      collection: 'Collection 11: AfterHours',
      date: t.createdDate,
      snippet: t.posts[0]?.content.slice(0, 160) + '...',
      targetView: 'SITE_AFTERHOURS',
      targetId: t.id,
      isAnomalous: t.isAnomalous
    });
  });

  // Candle Room
  candleRoomArticles.forEach(a => {
    index.push({
      id: `sr-cr-${a.id}`,
      title: `[Candle Room] ${a.title}`,
      type: 'WEB_PAGE',
      collection: 'Collection 07: Candle Room',
      date: a.dateAdded,
      snippet: a.content.slice(0, 160) + '...',
      targetView: 'SITE_CANDLEROOM',
      targetId: a.id,
      isAnomalous: a.isAnomalous
    });
  });

  // Greyline Memos & Logs
  greylineMemos.forEach(m => {
    index.push({
      id: `sr-gl-${m.id}`,
      title: `[Greyline ISP] ${m.title}`,
      type: 'TECH_RECORD',
      collection: 'Collection 09: Greyline ISP',
      date: m.date,
      snippet: m.content.slice(0, 160) + '...',
      targetView: 'SITE_GREYLINE',
      targetId: m.id,
      isAnomalous: m.isAnomalous
    });
  });

  // Blue Window Blogs
  blueWindowBlogs.forEach(b => {
    index.push({
      id: `sr-bw-${b.id}`,
      title: `[Blue Window] ${b.authorName}: ${b.title}`,
      type: 'POST',
      collection: 'Collection 13: Blue Window',
      date: b.date,
      snippet: b.content.slice(0, 160) + '...',
      targetView: 'SITE_BLUEWINDOW',
      targetId: b.id,
      isAnomalous: b.isImpossibleDate
    });
  });

  // Terminal 21
  terminal21Threads.forEach(t => {
    index.push({
      id: `sr-t21-${t.id}`,
      title: `[Terminal 21] ${t.title}`,
      type: 'TECH_RECORD',
      collection: 'Hacker & Networking Boards',
      date: t.createdDate,
      snippet: t.posts[0]?.content.slice(0, 160) + '...',
      targetView: 'SITE_TERMINAL21',
      targetId: t.id,
      isAnomalous: t.isAnomalous
    });
  });

  // Palisade social profiles
  palisadeProfiles.forEach(profile => {
    index.push({
      id: `sr-pal-${profile.id}`,
      title: `[Palisade] ${profile.name} (${profile.handle})`,
      type: 'PERSON',
      collection: 'Collection 15: Palisade Social Graph',
      date: profile.statusDate,
      snippet: `${profile.headline}. ${profile.recentStatus}`,
      targetView: 'SITE_PALISADE',
      targetId: profile.id,
      isAnomalous: profile.isAnomalous
    });
  });

  // Other Side webring
  webringSites.forEach(site => {
    index.push({
      id: `sr-webring-${site.id}`,
      title: `[Other Side Webring] ${site.title}`,
      type: 'WEB_PAGE',
      collection: 'Collection 04: Early Webring Guilds',
      date: String(site.year),
      snippet: site.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160) + '...',
      targetView: 'SITE_WEBRING',
      targetId: site.id,
      isAnomalous: site.isAnomalous
    });
  });

  // Recovered chat spools
  chatLogsData.forEach(chat => {
    index.push({
      id: `sr-chat-${chat.id}`,
      title: `[IRC] ${chat.channel} — ${chat.date}`,
      type: 'CHAT',
      collection: 'Recovered IRC & Chat Spools',
      date: chat.date,
      snippet: chat.description,
      targetView: 'CHATS',
      targetId: chat.id,
      isAnomalous: chat.messages.some(message => message.isAnomalous)
    });
  });

  // TRACE Posts
  tracePosts.forEach(tp => {
    index.push({
      id: `sr-trace-${tp.id}`,
      title: `[TRACE Feed] ${tp.title}`,
      type: 'POST',
      collection: 'Modern Research Community',
      date: tp.timestamp,
      snippet: tp.content.slice(0, 160) + '...',
      targetView: 'TRACE',
      targetId: tp.id,
      isAnomalous: tp.tag === 'ANOMALOUS' || tp.tag === 'DISCOVERY'
    });
  });

  // Emails
  emailsData.forEach(em => {
    index.push({
      id: `sr-em-${em.id}`,
      title: `[Email] ${em.subject} (From: ${em.from})`,
      type: 'EMAIL',
      collection: 'Recovered Communications',
      date: em.date,
      snippet: em.body.slice(0, 160) + '...',
      targetView: 'EMAILS',
      targetId: em.id,
      isAnomalous: em.isAnomalous
    });
  });

  // Physical Documents
  physicalDocsData.forEach(pd => {
    index.push({
      id: `sr-pd-${pd.id}`,
      title: `[Physical Archive] ${pd.title}`,
      type: 'DOCUMENT',
      collection: 'Physical Evidence & Scans',
      date: pd.date,
      snippet: pd.content.slice(0, 160) + '...',
      targetView: 'PHYSICAL_DOCS',
      targetId: pd.id,
      isAnomalous: pd.isAnomalous
    });
  });

  // Interactive Tools & Diagnostics
  index.push({
    id: 'sr-tool-quiz',
    title: 'Which Lost Web Archetype Are You? (Personality Diagnostic)',
    type: 'DOCUMENT',
    collection: 'Archival Diagnostics',
    date: '1998–2003',
    snippet: 'Discover your cognitive resonance within the early telecommunications commons. Answer 5 historical inquiries to reveal your digital persona, character affinity, and curated archive recommendations.',
    targetView: 'QUIZ',
    isAnomalous: false
  });

  index.push({
    id: 'sr-tool-tuner',
    title: 'Carrier Resonance Frequency Tuner & Oscilloscope',
    type: 'TECH_RECORD',
    collection: 'Forensic Lab Tools',
    date: '1998–2026',
    snippet: 'Live Web Audio synthesis and real-time cathode oscilloscope trace. Tune to 58.4Hz, 120Hz, 1200Hz, and Station Null shortwave frequencies to demodulate encrypted packets.',
    targetView: 'TUNER',
    isAnomalous: true
  });

  index.push({
    id: 'sr-tool-hex',
    title: 'Milwaukee Rack #4 Packet Disassembler & Hex Terminal',
    type: 'TECH_RECORD',
    collection: 'Forensic Lab Tools',
    date: '1998-11-19',
    snippet: 'Direct binary byte stream inspection from recovered 1990s magnetic tape logs. Feed raw hexadecimal octets through the disassembler pipeline.',
    targetView: 'PACKET_TERMINAL',
    isAnomalous: true
  });

  index.push({
    id: 'sr-comm-roster',
    title: 'TRACE Community Researcher Roster & Badge Directory',
    type: 'PERSON',
    collection: 'Modern Research Community',
    date: '2026',
    snippet: 'Directory of verified digital archaeologists, hardware collectors, and systems skeptics auditing the Net History Foundation repository.',
    targetView: 'COMMUNITY',
    isAnomalous: false
  });

  return index;
};
