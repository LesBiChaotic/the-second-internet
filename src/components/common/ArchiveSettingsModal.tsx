import React, { useRef, useState } from 'react';
import { Archive, Download, RotateCcw, Upload, X } from 'lucide-react';
import { ArchiveState, ResetScope } from '../../state/useArchiveStore';

interface Props { store: ArchiveState; open: boolean; onClose: () => void; }

const resetOptions: Array<{ scope: ResetScope; title: string; detail: string }> = [
  { scope: 'investigation', title: 'Restart investigation', detail: 'Replay onboarding and clear discoveries, clearance, chapter and quiz result.' },
  { scope: 'messages', title: 'Reset messages', detail: 'Restore every simulated conversation to its opening state.' },
  { scope: 'caseboard', title: 'Reset caseboard', detail: 'Remove custom pins and restore the three starting records.' },
  { scope: 'appearance', title: 'Reset appearance', detail: 'Return theme and font preferences to automatic defaults.' },
  { scope: 'all', title: 'Factory reset everything', detail: 'Erase all investigation, message, caseboard and appearance data.' }
];

export const ArchiveSettingsModal: React.FC<Props> = ({ store, open, onClose }) => {
  const [confirming, setConfirming] = useState<ResetScope | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  if (!open) return null;

  const downloadSave = () => {
    const blob = new Blob([store.exportSave()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `nhf-investigation-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    store.notify('Investigation save exported.', 'success');
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <section className="modal-card archive-settings-modal" role="dialog" aria-modal="true" aria-labelledby="archive-settings-title">
        <header className="settings-modal-header">
          <div><span className="badge badge-blue"><Archive size={13} /> WORKSTATION CONTROL</span><h2 id="archive-settings-title">Save, restart, or restore</h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Close workstation controls"><X size={20} /></button>
        </header>
        <div className="modal-body settings-modal-body">
          <div className="save-transfer-row">
            <button className="btn btn-secondary" onClick={downloadSave}><Download size={16} /> Export save</button>
            <button className="btn btn-secondary" onClick={() => fileInput.current?.click()}><Upload size={16} /> Import save</button>
            <input ref={fileInput} hidden type="file" accept="application/json,.json" onChange={async e => {
              const file = e.target.files?.[0];
              if (file) store.importSave(await file.text());
              e.target.value = '';
            }} />
          </div>
          <p className="settings-explainer">Export first if you may want this investigation back. Reset operations only affect this browser.</p>
          <div className="reset-option-list">
            {resetOptions.map(option => (
              <div className={`reset-option ${option.scope === 'all' ? 'danger' : ''}`} key={option.scope}>
                <div><strong>{option.title}</strong><p>{option.detail}</p></div>
                {confirming === option.scope ? (
                  <div className="reset-confirm-actions">
                    <button className="btn btn-secondary" onClick={() => setConfirming(null)}>Cancel</button>
                    <button className="btn btn-danger" onClick={() => { store.resetProgress(option.scope); setConfirming(null); if (option.scope === 'all' || option.scope === 'investigation') onClose(); }}>Confirm</button>
                  </div>
                ) : (
                  <button className={option.scope === 'all' ? 'btn btn-danger' : 'btn btn-secondary'} onClick={() => setConfirming(option.scope)}><RotateCcw size={15} /> Reset</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
