import React from 'react';
import { ArrowRight, CheckCircle2, Circle, LockKeyhole, Sparkles } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';

type Objective = { label: string; view: string; test: (ids: string[]) => boolean };
type Chapter = { title: string; brief: string; threshold: number; outcome: string; objectives: Objective[] };
const has = (id: string) => (ids: string[]) => ids.includes(id);
const chapters: Chapter[] = [
  { title: 'Ordinary Archive', brief: 'Establish a clean baseline before trusting the reconstruction.', threshold: 0, outcome: 'The public archive is not as static as its catalog claims.', objectives: [
    { label: 'Inspect Marrow’s hidden layer', view: 'SITE_MARROW', test: ids => ids.some(id => id.startsWith('mw-below')) },
    { label: 'Read the Greyline incident memo', view: 'SITE_GREYLINE', test: has('greyline-memo-read') },
    { label: 'Pin one piece of evidence', view: 'CASEBOARD', test: ids => ids.length >= 1 }
  ]},
  { title: 'Cross-Contamination', brief: 'Trace the October 2003 event through sources that should not agree.', threshold: 1, outcome: 'Independent archives repeat the same impossible route and timestamp.', objectives: [
    { label: 'Open the AfterHours breach thread', view: 'SITE_AFTERHOURS', test: has('ah-thread-oct14-read') },
    { label: 'Find Palisade’s impossible account', view: 'SITE_PALISADE', test: has('pal-frost-anomaly') },
    { label: 'Check the Candle Room testimony', view: 'SITE_CANDLEROOM', test: has('candle-article-read') }
  ]},
  { title: 'The Human Cost', brief: 'Stop treating the records as packets. Identify who remained inside them.', threshold: 3, outcome: 'Alden, Noemi, Douglas, and wintermute42 form a human chain across the breach.', objectives: [
    { label: 'Review the biographical roster', view: 'PEOPLE', test: ids => ids.length >= 4 },
    { label: 'Recover a live TRACE response', view: 'TRACE', test: has('wintermute-live-reply') },
    { label: 'Expose the Webring labyrinth', view: 'SITE_WEBRING', test: ids => ids.some(id => id.startsWith('webring-')) }
  ]},
  { title: 'Aperture', brief: 'Separate investigative progress from authorization, then test the boundary.', threshold: 6, outcome: 'The route can be observed publicly; institutional systems still require a real keycard.', objectives: [
    { label: 'Map the hidden network branch', view: 'NETWORK_GRAPH', test: has('graph-reveal-second-net') },
    { label: 'Locate the source route', view: 'ROUTE_TRACE', test: has('route-room-source') },
    { label: 'Reach nine corroborating anomalies', view: 'DASHBOARD', test: ids => ids.length >= 9 }
  ]},
  { title: 'Stable Crossing', brief: 'Decide whether the mesh is an archive, a refuge, or a living witness.', threshold: 9, outcome: 'The crossing is a narrative route—not a staff promotion.', objectives: [
    { label: 'Enter the stable crossing', view: 'SECOND_NET', test: has('si-room-direct') },
    { label: 'Record the final synthesis', view: 'CASEBOARD', test: has('grand-synthesis-unlocked') },
    { label: 'Revisit what the first archive omitted', view: 'DASHBOARD', test: ids => ids.length >= 12 }
  ]}
];

export const CurrentInvestigationPanel: React.FC<{ store: ArchiveState }> = ({ store }) => {
  const chapterIndex = store.investigationChapter - 1;
  const current = chapters[chapterIndex];
  const completedObjectives = current.objectives.filter(item => item.test(store.discoveredAnomalies)).length;
  const sideCaseDone = store.discoveredAnomalies.some(id => id.startsWith('webring-'));
  const nextLead = current.objectives.find(item => !item.test(store.discoveredAnomalies));
  return (
    <section className="current-investigation" aria-labelledby="current-investigation-title">
      <div className="investigation-copy">
        <span className="investigation-kicker">CHECKPOINT 6 // CHAPTER {store.investigationChapter} OF 5</span>
        <h2 id="current-investigation-title">{current.title}</h2><p>{current.brief}</p>
        <div className="objective-list">{current.objectives.map(item => { const done = item.test(store.discoveredAnomalies); return <button key={item.label} className={done ? 'objective done' : 'objective'} onClick={() => store.navigate(item.view)}>{done ? <CheckCircle2 size={16} /> : <Circle size={16} />}<span>{item.label}</span></button>; })}</div>
        <span className="investigation-progress-copy">{completedObjectives}/3 active objectives resolved. Clearance remains {store.clearanceLevel}.</span>
        {chapterIndex > 0 && <p className="chapter-consequence"><strong>Prior finding:</strong> {chapters[chapterIndex - 1].outcome}</p>}
        <button className={`side-case ${sideCaseDone ? 'done' : ''}`} onClick={() => store.navigate('SITE_WEBRING')}><Sparkles size={15} /> Side case: The Unmarked Door {sideCaseDone ? '— recorded' : '— optional'}</button>
      </div>
      <div className="chapter-track" aria-label="Investigation chapter progress">{chapters.map((chapter, index) => { const done = store.discoveredAnomalies.length >= chapter.threshold; return <span key={chapter.title} className={done ? 'complete' : ''} title={chapter.title}>{done ? <CheckCircle2 size={18} /> : index === chapterIndex + 1 ? <Circle size={18} /> : <LockKeyhole size={18} />}</span>; })}</div>
      <button className="btn btn-primary investigation-action" onClick={() => store.navigate(nextLead?.view || 'CASEBOARD')}>Follow next unresolved lead <ArrowRight size={16} /></button>
    </section>
  );
};
