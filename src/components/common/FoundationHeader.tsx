import React, { useState } from 'react';
import { 
  Search, 
  Shield, 
  Volume2, 
  VolumeX, 
  Radio, 
  Tv, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Type, 
  Sparkles 
} from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
  onOpenSearch: () => void;
  isCrtActive: boolean;
  onToggleCrt: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const FoundationHeader: React.FC<Props> = ({ 
  store, 
  onOpenSearch, 
  isCrtActive, 
  onToggleCrt,
  mobileMenuOpen,
  onToggleMobileMenu
}) => {
  const { 
    networkStatus, 
    clearanceLevel, 
    audioMuted,
    ambientHumEnabled,
    themeMode,
    theme,
    useDeviceFont,
    toggleTheme,
    toggleDeviceFont,
    toggleAudioMute, 
    toggleAmbientHum, 
    navigate,
    activeUrl,
    setIsGateOpen
  } = store;

  const [inputUrl, setInputUrl] = useState(activeUrl);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick(600);
    const cleaned = inputUrl.trim().toLowerCase();
    
    if (cleaned.includes('marrow') && cleaned.includes('below')) {
      store.discoverAnomaly('mw-below-direct');
      navigate('SITE_MARROW', 'below', 'https://archive.nethistoryfoundation.org/1998/www.marrow.net/below');
    } else if (cleaned.includes('roomwithoutdoors') || cleaned.includes('second-bus') || cleaned.includes('second')) {
      store.discoverAnomaly('si-room-direct');
      navigate('SECOND_NET', 'roomwithoutdoors.net', 'second-bus://roomwithoutdoors.net');
    } else if (cleaned.includes('quiz')) {
      navigate('QUIZ');
    } else if (cleaned.includes('tuner') || cleaned.includes('frequency')) {
      navigate('TUNER');
    } else if (cleaned.includes('packet') || cleaned.includes('hex')) {
      navigate('PACKET_TERMINAL');
    } else if (cleaned.includes('marrow')) {
      navigate('SITE_MARROW');
    } else if (cleaned.includes('afterhours')) {
      navigate('SITE_AFTERHOURS');
    } else if (cleaned.includes('candle')) {
      navigate('SITE_CANDLEROOM');
    } else if (cleaned.includes('greyline')) {
      navigate('SITE_GREYLINE');
    } else if (cleaned.includes('blue') || cleaned.includes('window')) {
      navigate('SITE_BLUEWINDOW');
    } else if (cleaned.includes('palisade')) {
      navigate('SITE_PALISADE');
    } else if (cleaned.includes('terminal')) {
      navigate('SITE_TERMINAL21');
    } else if (cleaned.includes('trace')) {
      navigate('TRACE');
    } else if (cleaned.includes('dm') || cleaned.includes('pm') || cleaned.includes('message')) {
      navigate('DMS');
    } else {
      onOpenSearch();
    }
  };

  const handleSoundToggle = () => {
    toggleAudioMute();
    soundEngine.playClick(900);
  };

  const handleHumToggle = () => {
    if (!ambientHumEnabled) {
      soundEngine.startAmbientHum();
    } else {
      soundEngine.stopAmbientHum();
    }
    toggleAmbientHum();
  };

  const handleThemeToggle = () => {
    soundEngine.playClick(750);
    toggleTheme();
  };

  const handleFontToggle = () => {
    soundEngine.playClick(800);
    toggleDeviceFont();
  };

  return (
    <header className="foundation-header">
      {/* Mobile Hamburger Menu Button (Only visible on mobile <= 768px) */}
      <button 
        className="btn btn-secondary show-on-mobile mobile-menu-btn"
        style={{ padding: '6px', marginRight: '8px' }}
        onClick={() => {
          soundEngine.playClick(600);
          onToggleMobileMenu();
        }}
        title="Toggle Mobile Navigation Drawer"
      >
        {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Sleek Compact Brand Mark */}
      <div 
        className="foundation-brand" 
        onClick={() => {
          soundEngine.playClick(600);
          navigate('DASHBOARD');
        }}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}
        title="Net History Foundation Archive"
      >
        <div className="foundation-logo-mark" style={{ width: '28px', height: '28px', fontSize: '0.95rem' }}>Ψ</div>
        <span style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--nhf-accent-blue)', letterSpacing: '0.06em' }} className="hide-on-mobile">
          NHF // ARCHIVES
        </span>
      </div>

      {/* Spacious Omnibox / Interactive URL bar */}
      <form className="omnibox-container" onSubmit={handleUrlSubmit}>
        <Search className="omnibox-icon" size={15} />
        <input
          type="text"
          className="omnibox-input"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Search 14M+ archival objects, URL paths, passcodes..."
          onClick={() => {
            soundEngine.playClick(750);
          }}
        />
      </form>

      {/* Essential Global Display & Audio Controls */}
      <div className="header-status-group" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {/* Theme Toggle (Auto / Dark / Light) */}
        <button
          className="btn btn-secondary"
          style={{ padding: '5px 8px', fontSize: '0.75rem' }}
          onClick={handleThemeToggle}
          title={
            themeMode === 'system' 
              ? `Auto / System Theme Active (${theme.toUpperCase()}) — Click to switch to Dark` 
              : themeMode === 'dark' 
                ? 'Dark Theme Active — Click to switch to Light' 
                : 'Light Theme Active — Click to switch to Auto (System)'
          }
        >
          {themeMode === 'system' ? (
            <Sparkles size={14} color="var(--nhf-accent-blue)" />
          ) : theme === 'dark' ? (
            <Sun size={14} color="#f59e0b" />
          ) : (
            <Moon size={14} color="#3b82f6" />
          )}
          <span className="hide-on-mobile">
            {themeMode === 'system' ? `Auto (${theme})` : theme === 'dark' ? 'Dark' : 'Light'}
          </span>
        </button>

        {/* Font Toggle */}
        <button
          className="btn btn-secondary"
          style={{
            padding: '5px 8px',
            fontSize: '0.75rem',
            borderColor: useDeviceFont ? '#38bdf8' : undefined,
            color: useDeviceFont ? '#38bdf8' : undefined
          }}
          onClick={handleFontToggle}
          title={useDeviceFont ? 'Device System Font Active (Click for Archival Fonts)' : 'Click to use your device system font (Mobile friendly)'}
        >
          <Type size={14} />
          <span className="hide-on-mobile">{useDeviceFont ? 'Device Font' : 'Archival Font'}</span>
        </button>

        {/* CRT Scanline & Phosphor FX Toggle */}
        <button
          className="btn btn-secondary"
          style={{
            padding: '5px 8px',
            fontSize: '0.75rem',
            borderColor: isCrtActive ? '#38bdf8' : undefined,
            color: isCrtActive ? '#38bdf8' : undefined
          }}
          onClick={() => {
            soundEngine.playClick(900);
            onToggleCrt();
          }}
          title="Toggle CRT Screen Scanlines & Phosphor Glow"
        >
          <Tv size={14} />
          <span className="hide-on-mobile">CRT</span>
        </button>

        {/* Ambient CRT Hum Toggle */}
        <button 
          className="btn btn-secondary" 
          style={{ padding: '5px 8px', fontSize: '0.75rem' }}
          onClick={handleHumToggle}
          title="Toggle 58.4Hz Carrier Hum"
        >
          <Radio size={14} color={ambientHumEnabled ? '#38bdf8' : '#64748b'} />
        </button>

        {/* Mute Audio */}
        <button 
          className="btn btn-secondary" 
          style={{ padding: '5px 8px' }}
          onClick={handleSoundToggle}
          title={audioMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {audioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        {/* Network Status Badge */}
        <div className="network-badge" title="Underlying communication network layer">
          <span className="network-status-dot" style={{
            backgroundColor: networkStatus === 'HOME' ? '#ef4444' : networkStatus === 'OUTSIDE' ? '#f59e0b' : '#10b981'
          }}></span>
          <span style={{ fontSize: '0.72rem' }}>{networkStatus}</span>
        </div>

        {/* Clearance Level Pill / Login Switcher Trigger */}
        <div 
          className="clearance-pill" 
          onClick={() => {
            soundEngine.playClick(700);
            setIsGateOpen(true);
          }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          title="Click to Switch Clearance Level or Enter Staff Keycard"
        >
          <Shield size={12} />
          <span>{clearanceLevel}</span>
        </div>
      </div>
    </header>
  );
};
