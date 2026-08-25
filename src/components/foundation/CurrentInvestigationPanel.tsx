import React from 'react';
import { ArrowRight, CheckCircle2, Circle, LockKeyhole, Sparkles } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { STORY_CHAPTERS } from '../../data/investigationStoryData';

type Objective = { label: string; view: string; test: (store: ArchiveState) => boolean };
type Chapter = (typeof STORY_CHAPTERS)[number] & { objectives: Objective[] };
const has = (id: string) => (store: ArchiveState) => store.discoveredAnomalies.includes(id);
const chapters: Chapter[] = [
  { ...STORY_CHAPTERS[0], objectives: [
    { label: 'Inspect Marrow’s hidden layer', view: 'SITE_MARROW', test: store => store.discoveredAnomalies.some(id => id.startsWith('mw-below')) },
    { label: 'Read the Greyline incident memo', view: 'SITE_GREYLINE', test: has('greyline-memo-read') },
    { label: 'Pin one piece of evidence', view: 'CASEBOARD', test: store => store.caseboardPins.length >= 1 }
  ]},
  { ...STORY_CHAPTERS[1], objectives: [
    { label: 'Open the AfterHours breach thread', view: 'SITE_AFTERHOURS', test: has('ah-thread-oct14-read') },
    { label: 'Find Palisade’s impossible account', view: 'SITE_PALISADE', test: has('pal-frost-anomaly') },
    { label: 'Check the Candle Room testimony', view: 'SITE_CANDLEROOM', test: has('candle-article-read') }
  ]},
  { ...STORY_CHAPTERS[2], objectives: [
    { label: 'Review the biographical roster', view: 'PEOPLE', test: store => store.discoveredAnomalies.length >= 4 },
    { label: 'Recover a live TRACE response', view: 'TRACE', test: has('wintermute-live-reply') },
    { label: 'Expose the Webring labyrinth', view: 'SITE_WEBRING', test: store => store.discoveredAnomalies.some(id => id.startsWith('webring-')) }
  ]},
  { ...STORY_CHAPTERS[3], objectives: [
    { label: 'Map the hidden network branch', view: 'NETWORK_GRAPH', test: has('graph-reveal-second-net') },
    { label: 'Locate the source route', view: 'ROUTE_TRACE', test: has('route-room-source') },
    { label: 'Reach nine corroborating anomalies', view: 'DASHBOARD', test: store => store.discoveredAnomalies.length >= 9 }
  ]},
  { ...STORY_CHAPTERS[4], objectives: [
    { label: 'Enter the stable crossing', view: 'SECOND_NET', test: has('si-room-direct') },
    { label: 'Record the final synthesis', view: 'CASEBOARD', test: has('grand-synthesis-unlocked') },
    { label: 'Revisit what the first archive omitted', view: 'DASHBOARD', test: store => store.discoveredAnomalies.length >= 12 }
  ]}
];

export const CurrentInvestigationPanel: React.FC<{ store: ArchiveState }> = ({ store }) => {
  const chapterIndex = store.investigationChapter - 1;
  const current = chapters[chapterIndex];
  const completedObjectives = current.objectives.filter(item => item.test(store)).length;
  const sideCaseDone = store.discoveredAnomalies.some(id => id.startsWith('webring-'));
  const nextLead = current.objectives.find(item => !item.test(store));
  return (
    <section className="current-investigation" aria-labelledby="current-investigation-title">
      <div className="investigation-copy">
        <span className="investigation-kicker">CHECKPOINT 6 // CHAPTER {store.investigationChapter} OF 5</span>
        <h2 id="current-investigation-title">{current.title}</h2><p>{current.brief}</p>
        <div className="objective-list">{current.objectives.map(item => { const done = item.test(store); return <button key={item.label} className={done ? 'objective done' : 'objective'} onClick={() => store.navigate(item.view)}>{done ? <CheckCircle2 size={16} /> : <Circle size={16} />}<span>{item.label}</span></button>; })}</div>
        <span className="investigation-progress-copy">{completedObjectives}/3 active objectives resolved. Clearance remains {store.clearanceLevel}.</span>
        {chapterIndex > 0 && <p className="chapter-consequence"><strong>Prior finding:</strong> {chapters[chapterIndex - 1].outcome}</p>}
        <button className={`side-case ${sideCaseDone ? 'done' : ''}`} onClick={() => store.navigate('SITE_WEBRING')}><Sparkles size={15} /> Side case: The Unmarked Door {sideCaseDone ? '— recorded' : '— optional'}</button>
      </div>
      <div className="chapter-track" aria-label="Investigation chapter progress">{chapters.map((chapter, index) => { const done = store.discoveredAnomalies.length >= chapter.threshold; return <span key={chapter.title} className={done ? 'complete' : ''} title={chapter.title}>{done ? <CheckCircle2 size={18} /> : index === chapterIndex + 1 ? <Circle size={18} /> : <LockKeyhole size={18} />}</span>; })}</div>
      <div className="investigation-action"><button className="btn btn-primary" onClick={() => store.navigate(nextLead?.view || 'CASEBOARD')}>Follow next unresolved lead <ArrowRight size={16} /></button><button className="btn btn-secondary" onClick={() => store.navigate('INVESTIGATION_LEDGER')}>Open full story ledger</button></div>
    </section>
  );
};
