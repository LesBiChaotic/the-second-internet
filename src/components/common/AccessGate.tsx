import React from 'react';
import { KeyRound, LockKeyhole, ShieldCheck } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { requiredClearanceFor } from '../../state/accessControl';

export const AccessGate: React.FC<{ store: ArchiveState; view: string }> = ({ store, view }) => {
  const required = requiredClearanceFor(view);
  return (
    <section className="access-gate" aria-labelledby="access-gate-title">
      <LockKeyhole size={42} aria-hidden="true" />
      <p className="investigation-kicker">ROUTE PRESENT // CONTENT SEALED</p>
      <h1 id="access-gate-title">{required} clearance required</h1>
      <p>Your discoveries advance the investigation, but they do not alter institutional clearance. This workstation entered by the <strong>{store.accessRoute.toLowerCase()} route</strong> and currently presents <strong>{store.clearanceLevel}</strong> credentials.</p>
      <div className="access-gate-actions">
        <button className="btn btn-primary" onClick={() => store.setIsGateOpen(true)}><KeyRound size={16} /> Present keycard</button>
        <button className="btn btn-secondary" onClick={() => store.navigate('DASHBOARD')}><ShieldCheck size={16} /> Return to public archive</button>
      </div>
    </section>
  );
};
