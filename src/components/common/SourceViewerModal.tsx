import React from 'react';
import { X, Code2, Copy, Check } from 'lucide-react';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  data: { title: string; htmlSource: string } | null;
  onClose: () => void;
}

export const SourceViewerModal: React.FC<Props> = ({ data, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!data) return null;

  const handleCopy = () => {
    soundEngine.playClick(900);
    navigator.clipboard.writeText(data.htmlSource);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code2 size={18} color="#38bdf8" />
            <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--nhf-text-primary)' }}>
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
