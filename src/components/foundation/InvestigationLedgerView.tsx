import React from 'react';
import { ArrowRight, CheckCircle2, CircleDot, Clock3, GitBranch, LockKeyhole, Map, RotateCcw, Sparkles, Users } from 'lucide-react';
import { STORY_CHAPTERS } from '../../data/investigationStoryData';
import { ArchiveState } from '../../state/useArchiveStore';

type Lead = { label: string; note: string; view: string; found: (store: ArchiveState) => boolean };
const has = (id: string) => (store: ArchiveState) => store.discoveredAnomalies.includes(id);
const hasPrefix = (prefix: string) => (store: ArchiveState) => store.discoveredAnomalies.some(id => id.startsWith(prefix));

const primaryLeads: Lead[] = [
  { label: 'Marrow hidden layer', note: 'Compare the reconstruction with the version its navigation does not advertise.', view: 'SITE_MARROW', found: hasPrefix('mw-below') },
  { label: 'Greyline incident memo', note: 'Find the institutional record closest to the first visible fracture.', view: 'SITE_GREYLINE', found: has('greyline-memo-read') },
  { label: 'AfterHours breach thread', note: 'Test whether a community witness remembers the same event.', view: 'SITE_AFTERHOURS', found: has('ah-thread-oct14-read') },
  { label: 'Palisade impossible account', note: 'Follow the identity whose dates refuse to remain historical.', view: 'SITE_PALISADE', found: has('pal-frost-anomaly') },
  { label: 'Candle Room testimony', note: 'Read the personal record alongside the technical ones.', view: 'SITE_CANDLEROOM', found: has('candle-article-read') },
  { label: 'Live TRACE response', note: 'Ask whether the archive can still answer in the present tense.', view: 'TRACE', found: has('wintermute-live-reply') },
  { label: 'Hidden network branch', note: 'Map the route only after its witnesses begin to corroborate one another.', view: 'NETWORK_GRAPH', found: has('graph-reveal-second-net') },
  { label: 'Source route', note: 'Trace the branch toward its unresolved origin.', view: 'ROUTE_TRACE', found: has('route-room-source') },
  { label: 'Stable crossing', note: 'Enter only when the collected record can support the crossing.', view: 'SECOND_NET', found: has('si-room-direct') }
];

const optionalLeads: Lead[] = [
  { label: 'The Unmarked Door', note: 'A webring detour with no guaranteed relevance and an excellent sense of drama.', view: 'SITE_WEBRING', found: hasPrefix('webring-') },
  { label: 'Room 4 reflection', note: 'Revisit a reconstructed monitor after the human names start to matter.', view: 'ROOM4_MONITOR', found: has('crt-room4-reflection') },
  { label: 'Terminal breach log', note: 'A technical appendix for investigators who distrust clean summaries.', view: 'APERTURE_TERMINAL', found: has('terminal-cat-breach-log') },
  { label: 'Future accession', note: 'A timeline footnote filed under a year the archive has not reached.', view: 'TIMELINE', found: has('tl-future-era') }
];

const eras = [
  { year: '1877', title: 'The cable before the network', gate: () => true, text: 'A pre-digital signal enters the institutional record. Its relevance remains disputed.' },
  { year: '1998', title: 'Marrow / Greyline', gate: (s: ArchiveState) => hasPrefix('mw-below')(s) || has('greyline-memo-read')(s), text: 'A hidden page and a provider memo establish the first corroborated fracture.' },
  { year: '2003', title: 'The October breach', gate: has('ah-thread-oct14-read'), text: 'Community testimony records a route that should have terminated locally.' },
  { year: '2007', title: 'Accounts that outlive their owners', gate: has('pal-frost-anomaly'), text: 'Later platforms inherit identities and timestamps from the earlier event.' },
  { year: '2019', title: 'The missing archivist', gate: (s: ArchiveState) => has('greyline-memo-read')(s) && s.discoveredAnomalies.length >= 6, text: 'Douglas Van Houten’s absence becomes part of the evidence, not merely its provenance.' },
  { year: '2026', title: 'The archive answers', gate: (s: ArchiveState) => has('wintermute-live-reply')(s) || has('trace-uncensored-read')(s), text: 'TRACE collapses the distance between preserved conversation and live response.' }
];

const relationships = [
  { names: 'Alden Corliss ⇄ Noemi Castille', detail: 'Two human accounts orbit the October breach from different sides of the screen.', gate: (s: ArchiveState) => has('candle-article-read')(s) || has('ah-thread-oct14-read')(s) },
  { names: 'Douglas Van Houten ⇄ Clara Szilard', detail: 'Archivist and systems architect connect the public record to Collection 17.', gate: (s: ArchiveState) => has('greyline-memo-read')(s) && s.discoveredAnomalies.length >= 6 },
  { names: 'wintermute42 ⇄ the preserved communities', detail: 'The same presence appears as account, witness, and network behavior.', gate: has('wintermute-live-reply') },
  { names: 'The investigator ⇄ the archive', detail: 'Your route changes what becomes legible, but it does not grant staff authority.', gate: (s: ArchiveState) => s.discoveredAnomalies.length >= 9 }
];

export const InvestigationLedgerView: React.FC<{ store: ArchiveState }> = ({ store }) => {
  const chapterIndex = store.investigationChapter - 1;
  const current = STORY_CHAPTERS[chapterIndex];
  const nextLead = primaryLeads.find(lead => !lead.found(store));
  const recovered = primaryLeads.filter(lead => lead.found(store)).length;
  const revisit = optionalLeads.find(lead => !lead.found(store));

  return (
    <main className="investigation-ledger-route">
      <header className="ledger-hero">
        <div><span className="ledger-kicker">CASE FILE // PERSISTENT STORY INDEX</span><h1>Investigation Ledger</h1><p>A spoiler-light record of what the archive has established, what remains primary, and what is merely calling from an interesting side corridor.</p></div>
        <div className="ledger-chapter-stamp"><span>CHAPTER {store.investigationChapter} / 5</span><strong>{current.title}</strong><small>{recovered}/{primaryLeads.length} principal leads recovered</small></div>
      </header>

      <section className="ledger-recovered">
        <div className="ledger-section-title"><Clock3 size={18} /><div><span>PREVIOUSLY RECOVERED</span><h2>The story so far</h2></div></div>
        <p>{current.brief}</p>
        {chapterIndex === 0 ? <p className="ledger-muted">No prior chapter has been closed. Establish the archive’s ordinary shape first.</p> : STORY_CHAPTERS.slice(0, chapterIndex).map((chapter, index) => <div className="recovered-note" key={chapter.title}><CheckCircle2 size={17} /><span><strong>{index + 1}. {chapter.title}:</strong> {chapter.outcome}</span></div>)}
      </section>

      <div className="ledger-two-column">
        <section className="ledger-panel primary-leads"><div className="ledger-section-title"><Map size={18} /><div><span>PRIMARY LEADS</span><h2>The investigation spine</h2></div></div>
          <p className="ledger-muted">These routes advance the central reconstruction. Their order is suggested, not enforced.</p>
          <div className="ledger-lead-list">{primaryLeads.map(lead => { const done = lead.found(store); return <button key={lead.label} className={`ledger-lead ${done ? 'is-recorded' : ''}`} onClick={() => store.navigate(lead.view)}>{done ? <CheckCircle2 size={17} /> : <CircleDot size={17} />}<span><strong>{lead.label}</strong><small>{done ? 'Recorded in your case file.' : lead.note}</small></span><ArrowRight size={15} /></button>; })}</div>
          {nextLead && <button className="btn btn-primary ledger-next" onClick={() => store.navigate(nextLead.view)}>Follow recommended lead: {nextLead.label} <ArrowRight size={16} /></button>}
        </section>

        <aside className="ledger-panel optional-leads"><div className="ledger-section-title"><Sparkles size={18} /><div><span>OPTIONAL THREADS</span><h2>Rabbit holes</h2></div></div>
          <p className="ledger-muted">Texture, lore, and useful doubt. These are never required to earn access.</p>
          {optionalLeads.map(lead => { const done = lead.found(store); return <button key={lead.label} className={`optional-thread ${done ? 'is-recorded' : ''}`} onClick={() => store.navigate(lead.view)}><span>{done ? 'RECORDED' : 'OPTIONAL'}</span><strong>{lead.label}</strong><small>{lead.note}</small></button>; })}
          {revisit && <div className="revisit-prompt"><RotateCcw size={17} /><div><strong>Gentle revisit</strong><p>{revisit.label} remains untouched if you want a detour before the next chapter.</p></div></div>}
        </aside>
      </div>

      <section className="ledger-panel chronology"><div className="ledger-section-title"><GitBranch size={18} /><div><span>CHRONOLOGICAL EVIDENCE</span><h2>Events in recovered order</h2></div></div>
        <div className="chronology-track">{eras.map(era => { const visible = era.gate(store); return <article key={era.year} className={visible ? 'is-recovered' : 'is-sealed'}><time>{era.year}</time><div>{visible ? <CheckCircle2 size={17} /> : <LockKeyhole size={17} />}<h3>{visible ? era.title : 'Unresolved interval'}</h3><p>{visible ? era.text : 'The case file does not yet contain enough corroboration to summarize this interval.'}</p></div></article>; })}</div>
      </section>

      <div className="ledger-two-column closing-grid">
        <section className="ledger-panel"><div className="ledger-section-title"><Users size={18} /><div><span>RELATIONSHIP MAP</span><h2>People, systems, witnesses</h2></div></div>
          <div className="relationship-list">{relationships.map(item => { const visible = item.gate(store); return <article key={item.names} className={visible ? '' : 'is-sealed'}><strong>{visible ? item.names : 'Connection not yet established'}</strong><p>{visible ? item.detail : 'Recover more human testimony before drawing this line.'}</p></article>; })}</div>
          <button className="btn btn-secondary" onClick={() => store.navigate('PEOPLE')}>Open biographical roster <ArrowRight size={15} /></button>
        </section>
        <section className="ledger-panel"><div className="ledger-section-title"><Clock3 size={18} /><div><span>CHAPTER BRIEFINGS</span><h2>Transitions</h2></div></div>
          <div className="chapter-briefings">{STORY_CHAPTERS.map((chapter, index) => { const state = index < chapterIndex ? 'complete' : index === chapterIndex ? 'current' : 'locked'; return <article key={chapter.title} className={state}><span>{state === 'complete' ? <CheckCircle2 size={16} /> : state === 'current' ? <CircleDot size={16} /> : <LockKeyhole size={16} />} {index + 1}</span><div><strong>{state === 'locked' ? 'Briefing sealed' : chapter.title}</strong><p>{state === 'locked' ? 'Continue corroborating the present chapter to open this briefing.' : chapter.brief}</p></div></article>; })}</div>
        </section>
      </div>
    </main>
  );
};
