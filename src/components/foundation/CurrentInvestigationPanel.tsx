import React from 'react';
import { ArrowRight, CheckCircle2, Circle, LockKeyhole } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';

const chapters = [
  { title: 'Ordinary Archive', objective: 'Compare the Marrow snapshot with the Foundation timeline.', view: 'SITE_MARROW', threshold: 0 },
  { title: 'Cross-Contamination', objective: 'Trace the same 2003 event through AfterHours and Greyline.', view: 'SITE_AFTERHOURS', threshold: 1 },
  { title: 'The Human Cost', objective: 'Match recurring identities across messages, records, and physical evidence.', view: 'PEOPLE', threshold: 3 },
  { title: 'Aperture', objective: 'Stabilize the signal and investigate Collection 17.', view: 'RESTRICTED_VAULT', threshold: 6 },
  { title: 'Stable Crossing', objective: 'Nine anomalies can hold the route open. Find what has been waiting.', view: 'SITE_WEBRING', threshold: 9 }
];

export const CurrentInvestigationPanel: React.FC<{ store: ArchiveState }> = ({ store }) => {
  const chapterIndex = store.investigationChapter - 1;
  const current = chapters[chapterIndex];
  const nextAt = chapters[chapterIndex + 1]?.threshold;
  return (
    <section className="current-investigation" aria-labelledby="current-investigation-title">
      <div className="investigation-copy">
        <span className="investigation-kicker">CURRENT INVESTIGATION // CHAPTER {store.investigationChapter} OF 5</span>
        <h2 id="current-investigation-title">{current.title}</h2>
        <p>{current.objective}</p>
        {nextAt && <span className="investigation-progress-copy">{Math.max(0, nextAt - store.discoveredAnomalies.length)} more anomal{nextAt - store.discoveredAnomalies.length === 1 ? 'y' : 'ies'} required for the next chapter.</span>}
      </div>
      <div className="chapter-track" aria-label="Investigation chapter progress">
        {chapters.map((chapter, index) => {
          const done = store.discoveredAnomalies.length >= chapter.threshold;
          return <span key={chapter.title} className={done ? 'complete' : ''} title={chapter.title}>{done ? <CheckCircle2 size={18} /> : index === chapterIndex + 1 ? <Circle size={18} /> : <LockKeyhole size={18} />}</span>;
        })}
      </div>
      <button className="btn btn-primary investigation-action" onClick={() => store.navigate(current.view)}>
        Follow current lead <ArrowRight size={16} />
      </button>
    </section>
  );
};
