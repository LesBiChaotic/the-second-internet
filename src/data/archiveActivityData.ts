import type { ArchiveState, DMThread } from '../state/useArchiveStore';

export interface DiscoveryReaction {
  anomalyId: string;
  threadId: string;
  sender: string;
  senderName: string;
  text: string;
  activity: string;
  view: string;
}

export const discoveryReactions: DiscoveryReaction[] = [
  { anomalyId: 'mw-below-tab', threadId: 'dm-clara', sender: 'c_szilard_nhf', senderName: 'Dr. Clara Szilard', text: 'Your session opened Marrow’s unindexed layer. I have placed the 1998 alias table under review. Please preserve the ordinary pages around it; the anomaly is meaningless without the site it interrupted.', activity: 'Clara opened a preservation review for Marrow /~room/.', view: 'SITE_MARROW' },
  { anomalyId: 'greyline-memo-read', threadId: 'dm-samira', sender: 'patchnotes', senderName: 'Samira Al-Mansoor', text: 'I saw your Greyline memo access. Before we call it impossible, compare the memo timestamp against the bakery receipt and the Rack 4 authentication window. Contradictions are useful only when we keep the boring records.', activity: 'Samira began an independent control check on the Greyline memo.', view: 'SITE_GREYLINE' },
  { anomalyId: 'ah-thread-oct14-read', threadId: 'dm-marcus', sender: 'analogghost', senderName: 'Marcus Lin', text: 'You opened the restored October thread. I am checking its SQL page boundaries against the copy from Alden’s laptop. Please do not treat the frightened replies as flavor text; they are witness statements.', activity: 'Marcus started comparing two AfterHours database copies.', view: 'SITE_AFTERHOURS' },
  { anomalyId: 'candle-article-read', threadId: 'dm-elena', sender: 'candle_keeper', senderName: 'Elena Rostova', text: 'You found my old Candle Room article. I was twenty and far too certain. Read the corrections underneath it too. Folklore becomes dangerous when an archive preserves only the most dramatic sentence.', activity: 'Elena appended a context note to her Candle Room article.', view: 'SITE_CANDLEROOM' },
  { anomalyId: 'pal-frost-anomaly', threadId: 'dm-marcus', sender: 'analogghost', senderName: 'Marcus Lin', text: 'Julian Frost’s Palisade status is now in your case file. I preserved the account headers and the classmates’ objections. A dead person’s familiar voice is not consent to engage.', activity: 'Marcus quarantined the Frost profile headers for review.', view: 'SITE_PALISADE' },
  { anomalyId: 'graph-reveal-second-net', threadId: 'dm-kai', sender: 'investigator_kai', senderName: 'Kai Chen', text: 'The topology branch appeared in your session. Good work. I am comparing your graph state with other visitor routes; so far the shape changes, but the human relationships do not.', activity: 'Kai added your graph state to the visitor-route comparison.', view: 'NETWORK_GRAPH' },
  { anomalyId: 'route-room-source', threadId: 'dm-samira', sender: 'patchnotes', senderName: 'Samira Al-Mansoor', text: 'Your trace returned its own source as destination. I reran the ordinary explanations first: cached output, loopback rewriting, and UI contamination. None reproduce the negative hop. I dislike this result professionally.', activity: 'Samira marked the source-route result “unexplained after controls.”', view: 'ROUTE_TRACE' },
  { anomalyId: 'wintermute-live-reply', threadId: 'dm-clara', sender: 'c_szilard_nhf', senderName: 'Dr. Clara Szilard', text: 'TRACE logged a live response after your comment. Do not delete your wording or edit the timestamp. I have moved from Available to Incident Review and asked Gideon to preserve the websocket record.', activity: 'Clara changed status to Incident Review after a live TRACE response.', view: 'TRACE' },
  { anomalyId: 'grand-synthesis-unlocked', threadId: 'dm-marcus', sender: 'analogghost', senderName: 'Marcus Lin', text: 'I read your synthesis connections. Thank you for keeping the meals, jokes, and consent notes beside the breach evidence. Alden was a person before he became a route.', activity: 'Marcus acknowledged the completed synthesis.', view: 'CASEBOARD' },
  { anomalyId: 'si-room-direct', threadId: 'dm-janus', sender: 'janus', senderName: 'Alden Corliss', text: 'You crossed without becoming staff, saint, or administrator. That matters. The archive is allowed to witness you without owning you.', activity: 'An impossible host acknowledged the stable crossing.', view: 'SECOND_NET' }
];

export const additionalDmThreads: DMThread[] = [
  { id: 'dm-clara', partnerHandle: 'c_szilard_nhf', partnerName: 'Dr. Clara Szilard', partnerRole: 'Chief Archivist // Preservation Review', unread: false, messages: [{ id: 'clara-initial', sender: 'c_szilard_nhf', senderName: 'Dr. Clara Szilard', time: '09:42 AM', content: 'This channel records context corrections and preservation holds. I will contact you if your route changes an active accession.', isFromUser: false }] },
  { id: 'dm-samira', partnerHandle: 'patchnotes', partnerName: 'Samira Al-Mansoor', partnerRole: 'Senior Systems Engineer // Control Desk', unread: false, messages: [{ id: 'samira-initial', sender: 'patchnotes', senderName: 'Samira Al-Mansoor', time: '11:08 AM', content: 'Send reproducible observations, not conclusions. If the boring explanation survives, we keep it. If it fails, we keep that too.', isFromUser: false }] },
  { id: 'dm-marcus', partnerHandle: 'analogghost', partnerName: 'Marcus Lin', partnerRole: 'Hardware Archaeologist // Field Lab', unread: false, messages: [{ id: 'marcus-initial', sender: 'analogghost', senderName: 'Marcus Lin', time: '08:17 AM', content: 'I have physical media, terrible coffee, and a scanner that overheats. If you disturb a record tied to the Greyline lot, I will compare it against the hardware.', isFromUser: false }] },
  { id: 'dm-elena', partnerHandle: 'candle_keeper', partnerName: 'Elena Rostova', partnerRole: 'Folklorist // Candle Room Custodian', unread: false, messages: [{ id: 'elena-initial', sender: 'candle_keeper', senderName: 'Elena Rostova', time: '01:14 AM', content: 'Old pages make young certainty look permanent. I am available when the archive needs a correction from the person who wrote one.', isFromUser: false }] }
];

export const staffLiveState = (staffId: string, store: ArchiveState): { status: string; note?: string } | null => {
  const ids = store.discoveredAnomalies;
  if (staffId === 'staff-szilard' && ids.includes('wintermute-live-reply')) return { status: 'Incident Review', note: 'Preserving live TRACE transport records from the visitor session.' };
  if (staffId === 'staff-falk' && ids.includes('graph-reveal-second-net')) return { status: 'In Lab', note: 'Comparing the revealed branch against isolated tape-controller output.' };
  if (staffId === 'staff-rostova' && ids.includes('candle-article-read')) return { status: 'Annotating', note: 'Adding author corrections to the 1998 Candle Room accession.' };
  if (staffId === 'staff-corliss-m' && ids.includes('ah-thread-oct14-read')) return { status: 'Field Review', note: 'Reconciling the restored thread with the Corliss family disk image.' };
  if (staffId === 'staff-null-employee' && ids.length >= 6) return { status: 'Typing…', note: 'Office 304 terminal reports keyboard activity. The room remains a utility closet.' };
  return null;
};
