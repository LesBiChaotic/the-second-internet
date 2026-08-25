import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Network, Radio, RefreshCw } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';
import { usePersistentState } from '../../state/usePersistentState';

type Axis = 'PRESERVE' | 'CONTACT' | 'CONTAIN';
type Quiz = { id: string; title: string; subtitle: string; questions: { prompt: string; options: { label: string; axis: Axis }[] }[] };

const QUIZZES: Quiz[] = [
  {
    id: 'dead-link-protocol', title: 'What Do You Do When a Dead Network Answers?', subtitle: 'Five incident decisions. No answer is entirely safe.', questions: [
      { prompt: 'A decommissioned BBS answers your modem at 03:14. Its clock says 1998.', options: [{ label: 'Record the handshake and photograph the modem lights.', axis: 'PRESERVE' }, { label: 'Ask who is maintaining the board.', axis: 'CONTACT' }, { label: 'Disconnect the phone pair and isolate the machine.', axis: 'CONTAIN' }] },
      { prompt: 'The sysop recognizes a handle you have never used.', options: [{ label: 'Save the transcript before responding.', axis: 'PRESERVE' }, { label: 'Ask where they learned it.', axis: 'CONTACT' }, { label: 'Do not confirm the identity.', axis: 'CONTAIN' }] },
      { prompt: 'A directory contains tomorrow’s local weather report.', options: [{ label: 'Hash and duplicate the file to offline media.', axis: 'PRESERVE' }, { label: 'Leave a timestamped correction in the guestbook.', axis: 'CONTACT' }, { label: 'Close the directory and block its route.', axis: 'CONTAIN' }] },
      { prompt: 'Another visitor says they can hear your room through the carrier.', options: [{ label: 'Document every environmental sound.', axis: 'PRESERVE' }, { label: 'Ask them to describe one harmless object.', axis: 'CONTACT' }, { label: 'Mute the microphone and cover the CRT.', axis: 'CONTAIN' }] },
      { prompt: 'The board asks you to leave a light on after disconnecting.', options: [{ label: 'Write the request into the incident record.', axis: 'PRESERVE' }, { label: 'Leave one lamp on and watch.', axis: 'CONTACT' }, { label: 'Cut power at the wall and leave the room.', axis: 'CONTAIN' }] }
    ]
  },
  {
    id: 'network-autopsy', title: 'How Would You Autopsy a Dead Network?', subtitle: 'Choose what deserves protection when the hardware is already gone.', questions: [
      { prompt: 'You receive one hour with a condemned telephone exchange.', options: [{ label: 'Image labels, ledgers, wiring maps, and switch positions.', axis: 'PRESERVE' }, { label: 'Connect a test handset to the quietest pair.', axis: 'CONTACT' }, { label: 'Map hazards and remove all live feeds first.', axis: 'CONTAIN' }] },
      { prompt: 'A recovered disk contains private diaries beside routing logs.', options: [{ label: 'Preserve both under separate access controls.', axis: 'PRESERVE' }, { label: 'Contact living authors before opening personal files.', axis: 'CONTACT' }, { label: 'Quarantine the disk until ownership is established.', axis: 'CONTAIN' }] },
      { prompt: 'Checksums change whenever the disk is connected to a network.', options: [{ label: 'Create repeated offline images and compare mutations.', axis: 'PRESERVE' }, { label: 'Send one controlled query and observe the response.', axis: 'CONTACT' }, { label: 'Air-gap every copy immediately.', axis: 'CONTAIN' }] },
      { prompt: 'A dead user’s account posts a new ordinary grocery list.', options: [{ label: 'Archive it with provenance and uncertainty attached.', axis: 'PRESERVE' }, { label: 'Reply without mentioning the death.', axis: 'CONTACT' }, { label: 'Lock replies while preserving the post.', axis: 'CONTAIN' }] },
      { prompt: 'The final server must be powered down.', options: [{ label: 'Capture its last state and physical sound.', axis: 'PRESERVE' }, { label: 'Tell connected users the shutdown time.', axis: 'CONTACT' }, { label: 'Terminate external routes before shutdown.', axis: 'CONTAIN' }] }
    ]
  }
];

const RESULTS: Record<Axis, { title: string; copy: string }> = {
  PRESERVE: { title: 'The Continuity Archivist', copy: 'You treat context as life support. Your instinct is to preserve evidence without pretending uncertainty has vanished.' },
  CONTACT: { title: 'The Last Correspondent', copy: 'You believe abandoned networks are still communities. You make contact carefully, even when an answer may change the observer.' },
  CONTAIN: { title: 'The Quiet-Switch Custodian', copy: 'You protect people by controlling exposure. You do not destroy strange evidence, but you refuse to let curiosity become an open socket.' }
};

export const DeadNetworkQuizPanel: React.FC<{ store: ArchiveState; onBack: () => void }> = ({ store, onBack }) => {
  const [quizId, setQuizId] = useState<string | null>(null);
  const [question, setQuestion] = useState(0);
  const [scores, setScores] = useState<Record<Axis, number>>({ PRESERVE: 0, CONTACT: 0, CONTAIN: 0 });
  const [results, setResults] = usePersistentState<Record<string, Axis>>('nhf_dead_network_quizzes', {});
  const quiz = QUIZZES.find(item => item.id === quizId);
  const completedAxis = quizId ? results[quizId] : undefined;

  const choose = (axis: Axis) => {
    if (!quiz) return;
    soundEngine.playClick(700);
    const next = { ...scores, [axis]: scores[axis] + 1 };
    setScores(next);
    if (question < quiz.questions.length - 1) setQuestion(value => value + 1);
    else {
      const winner = (Object.keys(next) as Axis[]).sort((a, b) => next[b] - next[a])[0];
      setResults(previous => ({ ...previous, [quiz.id]: winner }));
      store.discoverAnomaly(`quiz-dead-network-${quiz.id}-${winner.toLowerCase()}`);
      soundEngine.playClearanceChime('RESEARCHER');
    }
  };

  const restart = () => { if (quizId) setResults(previous => { const next = { ...previous }; delete next[quizId]; return next; }); setQuestion(0); setScores({ PRESERVE: 0, CONTACT: 0, CONTAIN: 0 }); };

  if (!quiz) return <div className="dead-network-quiz-shell">
    <button className="btn btn-secondary" onClick={onBack}><ArrowLeft size={15} /> Back to archetype quiz</button>
    <div className="dead-network-quiz-heading"><Radio size={22} /><div><span>DEAD NETWORK DIAGNOSTICS</span><h1>Choose an Archive Exercise</h1><p>Two five-question investigations about abandoned systems, human continuity, and what to do when silence replies.</p></div></div>
    <div className="dead-network-quiz-grid">{QUIZZES.map(item => <button key={item.id} className="dead-network-quiz-card" onClick={() => { setQuizId(item.id); setQuestion(0); setScores({ PRESERVE: 0, CONTACT: 0, CONTAIN: 0 }); }}><Network size={24} /><strong>{item.title}</strong><span>{item.subtitle}</span>{results[item.id] && <small><CheckCircle2 size={13} /> Completed: {RESULTS[results[item.id]].title}</small>}</button>)}</div>
  </div>;

  if (completedAxis) return <div className="dead-network-quiz-shell">
    <button className="btn btn-secondary" onClick={() => setQuizId(null)}><ArrowLeft size={15} /> All dead-network quizzes</button>
    <div className="dead-network-result"><CheckCircle2 size={32} /><span>DIAGNOSTIC COMPLETE</span><h1>{RESULTS[completedAxis].title}</h1><p>{RESULTS[completedAxis].copy}</p><button className="btn btn-secondary" onClick={restart}><RefreshCw size={15} /> Retake exercise</button></div>
  </div>;

  const current = quiz.questions[question];
  return <div className="dead-network-quiz-shell">
    <button className="btn btn-secondary" onClick={() => setQuizId(null)}><ArrowLeft size={15} /> Exit exercise</button>
    <div className="dead-network-question"><span>CASE {question + 1} / {quiz.questions.length}</span><h1>{quiz.title}</h1><h2>{current.prompt}</h2>{current.options.map(option => <button key={option.label} onClick={() => choose(option.axis)}>{option.label}</button>)}</div>
  </div>;
};
