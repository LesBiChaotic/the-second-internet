import React from 'react';
import { 
  Sparkles, 
  Terminal, 
  Radio, 
  Cpu, 
  ShieldAlert, 
  User, 
  Layers, 
  Compass, 
  Activity, 
  Zap,
  Globe
} from 'lucide-react';

interface AvatarProps {
  handleOrName: string;
  size?: number;
  imageUrl?: string;
  badgeRole?: string;
  isSpecial?: boolean;
}

export const UserAvatar: React.FC<AvatarProps> = ({
  handleOrName,
  size = 36,
  imageUrl,
  badgeRole,
  isSpecial = false
}) => {
  const clean = (handleOrName || '').toLowerCase().replace(/[@\s]/g, '');

  if (imageUrl) {
    return (
      <div 
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          overflow: 'hidden',
          border: isSpecial ? '2px solid #38bdf8' : '1px solid var(--nhf-border)',
          flexShrink: 0,
          position: 'relative'
        }}
      >
        <img 
          src={imageUrl} 
          alt={handleOrName} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
    );
  }

  // Specialized SVG glyphs for notable handles
  if (clean.includes('wintermute')) {
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #022c22, #047857)',
          border: '2px solid #10b981',
          boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6ee7b7',
          flexShrink: 0
        }}
        title="wintermute42 (Autonomic Mesh Daemon)"
      >
        <Zap size={Math.round(size * 0.55)} />
      </div>
    );
  }

  if (clean.includes('janus') || clean.includes('alden')) {
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e1b4b, #3b82f6)',
          border: '2px solid #38bdf8',
          boxShadow: '0 0 12px rgba(56, 189, 248, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#93c5fd',
          flexShrink: 0
        }}
        title="janus (Alden Corliss // Socket 0.0.0.0)"
      >
        <Globe size={Math.round(size * 0.55)} />
      </div>
    );
  }

  if (clean.includes('nyxgirl') || clean.includes('noemi') || clean.includes('lucidwitch')) {
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #831843, #ec4899)',
          border: '2px solid #f472b6',
          boxShadow: '0 0 12px rgba(244, 114, 182, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fbcfe8',
          flexShrink: 0
        }}
        title="nyxgirl (Noemi Castille)"
      >
        <Sparkles size={Math.round(size * 0.55)} />
      </div>
    );
  }

  if (clean.includes('kai') || clean.includes('investigator')) {
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e293b, #0ea5e9)',
          border: '2px solid #38bdf8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#e0f2fe',
          flexShrink: 0
        }}
        title="@investigator_kai"
      >
        <Compass size={Math.round(size * 0.55)} />
      </div>
    );
  }

  if (clean.includes('patchnotes') || clean.includes('d_miller') || clean.includes('corbin')) {
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #451a03, #d97706)',
          border: '2px solid #f59e0b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fef3c7',
          flexShrink: 0
        }}
        title="corbin_k / @patchnotes"
      >
        <Terminal size={Math.round(size * 0.55)} />
      </div>
    );
  }

  if (clean.includes('szilard') || clean.includes('clara')) {
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #311042, #8b5cf6)',
          border: '2px solid #a78bfa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ede9fe',
          flexShrink: 0
        }}
        title="Dr. Clara Szilard (Chief Archivist)"
      >
        <Layers size={Math.round(size * 0.55)} />
      </div>
    );
  }

  if (clean.includes('vanhouten') || clean.includes('douglas')) {
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e3a5f, #0284c7)',
          border: '2px solid #38bdf8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#bae6fd',
          flexShrink: 0
        }}
        title="Dr. Douglas K. Van Houten (Co-Founder)"
      >
        <Activity size={Math.round(size * 0.55)} />
      </div>
    );
  }

  // Generative monogram based on handle name characters
  const char1 = (handleOrName || 'U').charAt(0).toUpperCase();
  const char2 = (handleOrName || 'U').charAt(1).toUpperCase() || '';
  const hue = Math.abs(
    (handleOrName || 'user').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
  );

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: `linear-gradient(135deg, hsl(${hue}, 40%, 25%), hsl(${hue}, 60%, 40%))`,
        border: `1px solid hsl(${hue}, 60%, 55%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f8fafc',
        fontFamily: 'var(--font-mono)',
        fontSize: `${Math.max(10, Math.round(size * 0.38))}px`,
        fontWeight: 700,
        flexShrink: 0,
        letterSpacing: '-0.02em',
        userSelect: 'none'
      }}
      title={handleOrName}
    >
      {char1}{char2}
    </div>
  );
};
