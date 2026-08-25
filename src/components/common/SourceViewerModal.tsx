import React from 'react';
import { X, Code2, Copy, Check } from 'lucide-react';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  data: { title: string; htmlSource: string } | null;
  onClose: () => void;
}

export const SourceViewerModal: React.FC<Props> = ({ data, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => { if (!data) return; const close = (event: KeyboardEvent) => event.key === 'Escape' && onClose(); window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, [data, onClose]);

  if (!data) return null;

  const handleCopy = () => {
    soundEngine.playClick(900);
    navigator.clipboard.writeText(data.htmlSource);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="source-viewer-title" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code2 size={18} color="#38bdf8" />
            <span id="source-viewer-title" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--nhf-text-primary)' }}>
              {data.title}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              className="btn btn-secondary" 
              style={{ padding: '4px 8px', fontSize: '0.75rem' }}
              onClick={handleCopy}
            >
              {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ padding: '4px 6px' }}
              onClick={onClose}
              aria-label="Close source viewer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Source Body */}
        <div className="modal-body" style={{ backgroundColor: '#090c10', padding: '16px' }}>
          <pre style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            lineHeight: '1.5',
            color: '#7ee787',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}>
            {data.htmlSource}
          </pre>
        </div>
      </div>
    </div>
  );
};
