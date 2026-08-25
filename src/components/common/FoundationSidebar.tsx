import React, { useEffect, useRef } from 'react';
import { 
  Home, 
  Layers, 
  Users, 
  User,
  UserCheck,
  Clock, 
  FileText, 
  BookmarkCheck, 
  Share2, 
  Globe, 
  GitCommit, 
  Mail, 
  MessageSquare, 
  FileSearch, 
  Lock, 
  Radio, 
  ExternalLink,
  ShieldAlert,
  Server,
  Image as ImageIcon,
  Award,
  Sparkles,
  Activity,
  Cpu,
  Phone,
  Compass,
  BookOpen,
  Terminal,
  Tv,
  Zap,
  HelpCircle,
  Sun,
  Moon,
  Type,
  Volume2,
  VolumeX
  ,Settings
} from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';
import { TOTAL_ANOMALIES_COUNT } from '../../types';
import { canAccessView, requiredClearanceFor } from '../../state/accessControl';

interface Props {
  store: ArchiveState;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  isCrtActive: boolean;
  onToggleCrt: () => void;
  onOpenSettings: () => void;
}

export const FoundationSidebar: React.FC<Props> = ({ store, mobileOpen, onCloseMobile, isCrtActive, onToggleCrt, onOpenSettings }) => {
  const sidebarRef = useRef<HTMLElement>(null);
  const { 
    currentView, 
    navigate, 
    archiveIntegrity, 
    clearanceLevel, 
    discoveredAnomalies, 
    setIsPhoneDialerOpen,
    unreadDmCount,
    openFieldGuide,
    theme,
    themeMode,
    useDeviceFont,
    audioMuted,
    ambientHumEnabled,
    toggleTheme,
    toggleDeviceFont,
    toggleAudioMute,
    toggleAmbientHum
  } = store;

  const handleNav = (view: string, subId?: string) => {
    soundEngine.playClick(700);
    navigate(view, subId);
    if (onCloseMobile) onCloseMobile();
  };

  const handleOpenDialer = () => {
    soundEngine.playClick(750);
    setIsPhoneDialerOpen(true);
    if (onCloseMobile) onCloseMobile();
  };

  const lockBadge = (view: string) => !canAccessView(view, clearanceLevel) ? (
    <span className="nav-lock" title={`Requires ${requiredClearanceFor(view)} clearance`}><Lock size={12} /> {requiredClearanceFor(view)}</span>
  ) : null;

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    const items = sidebar.querySelectorAll<HTMLElement>('.sidebar-nav-item:not(button):not([data-static])');
    const cleanup = Array.from(items).map(item => {
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      if (item.classList.contains('active')) item.setAttribute('aria-current', 'page');
      const keyHandler = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          item.click();
        }
      };
      item.addEventListener('keydown', keyHandler);
      return () => item.removeEventListener('keydown', keyHandler);
    });
    return () => cleanup.forEach(dispose => dispose());
  }, [currentView, mobileOpen, theme, themeMode, useDeviceFont, audioMuted, ambientHumEnabled, isCrtActive]);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseMobile();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileOpen, onCloseMobile]);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div 
          className="sidebar-mobile-backdrop"
          onPointerDown={(event) => {
            event.preventDefault();
            onCloseMobile();
          }}
          role="button"
          tabIndex={0}
          aria-label="Close navigation menu"
          onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') onCloseMobile(); }}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`foundation-sidebar ${mobileOpen ? 'mobile-open' : ''}`}
        aria-label="Primary archive navigation"
        onPointerDown={(event) => {
          if (!mobileOpen) return;
          const target = event.target as HTMLElement;
          if (target.closest('.sidebar-nav-item, button, input, select, textarea, a, [role="button"]')) return;
          onCloseMobile();
        }}
      >
        {/* Institutional Brand Header in Sidebar */}
        <div 
          style={{
            padding: '16px 16px 14px 16px',
            borderBottom: '1px solid var(--nhf-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            background: 'var(--nhf-bg-primary)'
          }}
          onClick={() => handleNav('DASHBOARD')}
          title="Return to Foundation Dashboard"
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--nhf-accent-cobalt), var(--nhf-accent-blue))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.2rem',
            fontWeight: 800,
            boxShadow: '0 0 12px rgba(56, 189, 248, 0.3)',
            flexShrink: 0
          }}>
            Ψ
          </div>
          <div>
            <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--nhf-text-primary)', letterSpacing: '0.03em', lineHeight: 1.2 }}>
              NET HISTORY FOUNDATION
            </div>
            <div style={{ fontSize: '0.66rem', color: 'var(--nhf-text-muted)', marginTop: '2px', lineHeight: 1.3 }}>
              {store.networkStatus === 'HOME' ? 'And the internet that remembers us.' : 'Digital Archaeology & Telemetry'}
            </div>
          </div>
        </div>

        {/* Global Display, Audio & Telemetry Settings */}
        <div className="sidebar-nav-section" style={{
          background: 'rgba(56, 189, 248, 0.03)',
          border: '1px solid var(--nhf-border)',
          borderRadius: '10px',
          padding: '8px 6px'
        }}>
          <div className="sidebar-section-title" style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#38bdf8' }} />
            Display & Audio Controls
          </div>

          {/* Theme Toggle */}
          <div 
            className="sidebar-nav-item"
            onClick={() => {
              soundEngine.playClick(750);
              toggleTheme();
            }}
            style={{ justifyContent: 'space-between' }}
            title="Toggle Light / Dark / Auto System Theme"
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {themeMode === 'system' ? (
                <Sparkles size={16} color="var(--nhf-accent-blue)" />
              ) : theme === 'dark' ? (
                <Sun size={16} color="#f59e0b" />
              ) : (
                <Moon size={16} color="#3b82f6" />
              )}
              <span>Theme: {themeMode === 'system' ? `Auto (${theme})` : theme === 'dark' ? 'Dark' : 'Light'}</span>
            </span>
          </div>

          {/* Font Toggle */}
          <div 
            className="sidebar-nav-item"
            onClick={() => {
              soundEngine.playClick(800);
              toggleDeviceFont();
            }}
            style={{ 
              justifyContent: 'space-between',
              color: useDeviceFont ? '#38bdf8' : undefined
            }}
            title="Switch between Archival Typography (Inter/Newsreader) and Native Platform Font (Android Roboto / Apple SF Pro)"
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Type size={16} />
              <span>{useDeviceFont ? 'Device Font (Roboto/SF)' : 'Archival Font'}</span>
            </span>
            <span style={{ 
              fontSize: '0.65rem', 
              padding: '2px 6px', 
              borderRadius: '4px', 
              background: useDeviceFont ? 'rgba(56, 189, 248, 0.15)' : 'var(--nhf-bg-card)',
              color: useDeviceFont ? '#38bdf8' : 'var(--nhf-text-muted)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700
            }}>
              {useDeviceFont ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* CRT Toggle */}
          <div 
            className="sidebar-nav-item"
            onClick={() => {
              soundEngine.playClick(900);
              onToggleCrt();
            }}
            style={{
              color: isCrtActive ? '#38bdf8' : undefined
            }}
            title="Toggle CRT Scanline Overlay and Phosphor Glow"
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Tv size={16} />
              <span>CRT Scanlines</span>
            </span>
            <span style={{ 
              fontSize: '0.65rem', 
              padding: '2px 6px', 
              borderRadius: '4px', 
              background: isCrtActive ? 'rgba(56, 189, 248, 0.15)' : 'var(--nhf-bg-card)',
              color: isCrtActive ? '#38bdf8' : 'var(--nhf-text-muted)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700
            }}>
              {isCrtActive ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* Ambient Hum Toggle */}
          <div 
            className="sidebar-nav-item"
            onClick={() => {
              if (!ambientHumEnabled) {
                soundEngine.startAmbientHum();
              } else {
                soundEngine.stopAmbientHum();
              }
              toggleAmbientHum();
            }}
            title="Toggle 58.4Hz Carrier Background Hum"
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Radio size={16} color={ambientHumEnabled ? '#38bdf8' : 'var(--nhf-text-muted)'} />
              <span>58.4Hz Carrier Hum</span>
            </span>
            <span style={{ 
              fontSize: '0.65rem', 
              padding: '2px 6px', 
              borderRadius: '4px', 
              background: ambientHumEnabled ? 'rgba(56, 189, 248, 0.15)' : 'var(--nhf-bg-card)',
              color: ambientHumEnabled ? '#38bdf8' : 'var(--nhf-text-muted)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700
            }}>
              {ambientHumEnabled ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* Audio Mute Toggle */}
          <div 
            className="sidebar-nav-item"
            onClick={() => {
              toggleAudioMute();
              soundEngine.playClick(900);
            }}
            title="Mute or Unmute All UI Audio Feedback"
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {audioMuted ? <VolumeX size={16} color="var(--nhf-accent-crimson)" /> : <Volume2 size={16} />}
              <span>{audioMuted ? 'Audio Muted' : 'Audio Active'}</span>
            </span>
          </div>

          {/* Network Status */}
          <div 
            className="sidebar-nav-item"
            data-static
            style={{ cursor: 'default', opacity: 0.85 }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: store.networkStatus === 'HOME' ? '#ef4444' : store.networkStatus === 'OUTSIDE' ? '#f59e0b' : '#10b981',
                boxShadow: `0 0 6px ${store.networkStatus === 'HOME' ? '#ef4444' : store.networkStatus === 'OUTSIDE' ? '#f59e0b' : '#10b981'}`,
                flexShrink: 0
              }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>Subnet: {store.networkStatus}</span>
            </span>
          </div>

          <button className="sidebar-nav-item sidebar-button" onClick={() => { onOpenSettings(); onCloseMobile(); }}>
            <Settings size={16} />
            <span>Save & Restart Controls</span>
          </button>
        </div>

        {/* 1. Institutional Registry (🔵 Blue Accent) */}
        <div className="sidebar-nav-section">
          <div className="sidebar-section-title" style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#38bdf8' }} />
            Institutional Registry
          </div>
          
          <div 
            className={`sidebar-nav-item ${currentView === 'DASHBOARD' ? 'active' : ''}`}
            onClick={() => handleNav('DASHBOARD')}
          >
            <Home size={16} color="#38bdf8" />
            <span>Archive Dashboard</span>
          </div>

          <div
            className={`sidebar-nav-item ${currentView === 'INVESTIGATION_LEDGER' ? 'active' : ''}`}
            onClick={() => handleNav('INVESTIGATION_LEDGER')}
          >
            <Compass size={16} color="#38bdf8" />
            <span>Investigation Ledger</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'COLLECTIONS' ? 'active' : ''}`}
            onClick={() => handleNav('COLLECTIONS')}
          >
            <Layers size={16} />
            <span>Collections (01–16)</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'TIMELINE' ? 'active' : ''}`}
            onClick={() => handleNav('TIMELINE')}
          >
            <Clock size={16} />
            <span>Historical Timeline (1877–2026)</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'PEOPLE' ? 'active' : ''}`}
            onClick={() => handleNav('PEOPLE')}
          >
            <Users size={16} />
            <span>Biographical Roster</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'STAFF' ? 'active' : ''}`}
            onClick={() => handleNav('STAFF')}
          >
            <UserCheck size={16} />
            <span>Staff Directory</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'COMMUNITY' ? 'active' : ''}`}
            onClick={() => handleNav('COMMUNITY')}
          >
            <Award size={16} />
            <span>Community & Badges</span>
          </div>
        </div>

        {/* 2. Quarantined Sanctum & Deep Secrets (🔴 Crimson/Amber Accent) */}
        <div className="sidebar-nav-section">
          <div className="sidebar-section-title" style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
            Quarantined Sanctum
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'RESTRICTED_VAULT' ? 'active' : ''}`}
            onClick={() => handleNav('RESTRICTED_VAULT')}
            style={{ borderLeft: currentView === 'RESTRICTED_VAULT' ? '3px solid #ef4444' : undefined }}
          >
            <ShieldAlert size={16} color="#ef4444" />
            <span style={{ color: '#ef4444', fontWeight: 700 }}>Collection 17 Vault</span>
            <span className="badge badge-red" style={{ marginLeft: 'auto', fontSize: '0.62rem', padding: '1px 5px' }}>
              RESTRICTED
            </span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'NOTEBOOK' ? 'active' : ''}`}
            onClick={() => handleNav('NOTEBOOK')}
          >
            <BookOpen size={16} color="#f59e0b" />
            <span style={{ color: '#f59e0b', fontWeight: 600 }}>Van Houten's Field Journal</span>
            {lockBadge('NOTEBOOK')}
          </div>
        </div>

        {/* 3. Archaeological Forensics (🟢 Emerald Accent) */}
        <div className="sidebar-nav-section">
          <div className="sidebar-section-title" style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            Archaeological Forensics
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'TUNER' ? 'active' : ''}`}
            onClick={() => handleNav('TUNER')}
          >
            <Activity size={16} color="#10b981" />
            <span style={{ color: '#10b981', fontWeight: 600 }}>Carrier Tuner & Trace</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'RADIO_SPECTROGRAPH' ? 'active' : ''}`}
            onClick={() => handleNav('RADIO_SPECTROGRAPH')}
          >
            <Radio size={16} color="#38bdf8" />
            <span style={{ color: '#38bdf8', fontWeight: 600 }}>Station Null SDR Receiver</span>
            {lockBadge('RADIO_SPECTROGRAPH')}
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'APERTURE_TERMINAL' ? 'active' : ''}`}
            onClick={() => handleNav('APERTURE_TERMINAL')}
          >
            <Terminal size={16} color="#a78bfa" />
            <span style={{ color: '#a78bfa', fontWeight: 600 }}>Aperture UNIX Terminal</span>
            {lockBadge('APERTURE_TERMINAL')}
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'PACKET_TERMINAL' ? 'active' : ''}`}
            onClick={() => handleNav('PACKET_TERMINAL')}
          >
            <Cpu size={16} color="#38bdf8" />
            <span>Rack #4 Hex Disassembler</span>
            {lockBadge('PACKET_TERMINAL')}
          </div>

          <div 
            className="sidebar-nav-item"
            onClick={handleOpenDialer}
          >
            <Phone size={16} color="#fbbf24" />
            <span>Exchange #47 DTMF Dialer</span>
          </div>
        </div>

        {/* 4. Investigator Workbench (🟣 Purple/Violet Accent) */}
        <div className="sidebar-nav-section">
          <div className="sidebar-section-title" style={{ color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a78bfa' }} />
            Investigator Workbench
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'DMS' ? 'active' : ''}`}
            onClick={() => handleNav('DMS')}
            style={{ borderLeft: currentView === 'DMS' ? '3px solid #a78bfa' : undefined }}
          >
            <MessageSquare size={16} color="#a78bfa" />
            <span style={{ color: '#a78bfa', fontWeight: 700 }}>Direct Messages (PMs)</span>
            {unreadDmCount > 0 && (
              <span className="badge badge-purple" style={{ marginLeft: 'auto', fontSize: '0.65rem', background: '#7c3aed', color: '#fff', padding: '1px 6px' }}>
                {unreadDmCount} NEW
              </span>
            )}
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'CASEBOARD' ? 'active' : ''}`}
            onClick={() => handleNav('CASEBOARD')}
          >
            <BookmarkCheck size={16} />
            <span>Personal Caseboard</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'RESEARCH' ? 'active' : ''}`}
            onClick={() => handleNav('RESEARCH')}
          >
            <FileText size={16} />
            <span>Research Papers & Theses</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'NETWORK_GRAPH' ? 'active' : ''}`}
            onClick={() => handleNav('NETWORK_GRAPH')}
          >
            <Share2 size={16} />
            <span>Network Topology Graph</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'WHOIS' ? 'active' : ''}`}
            onClick={() => handleNav('WHOIS')}
          >
            <Globe size={16} />
            <span>WHOIS Registry</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'ROUTE_TRACE' ? 'active' : ''}`}
            onClick={() => handleNav('ROUTE_TRACE')}
          >
            <GitCommit size={16} />
            <span>Packet Route Tracer</span>
          </div>
        </div>

        {/* 5. Recovered Corpora & Feeds (🟠 Orange/Coral Accent) */}
        <div className="sidebar-nav-section">
          <div className="sidebar-section-title" style={{ color: '#fb923c', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#fb923c' }} />
            Recovered Corpora & Feeds
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'TRACE' ? 'active' : ''}`}
            onClick={() => handleNav('TRACE')}
          >
            <Radio size={16} color="#38bdf8" />
            <span style={{ color: '#38bdf8', fontWeight: 600 }}>TRACE Community Feed</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'PHYSICAL_DOCS' ? 'active' : ''}`}
            onClick={() => handleNav('PHYSICAL_DOCS')}
          >
            <ImageIcon size={16} color="#fb923c" />
            <span style={{ color: '#fb923c', fontWeight: 600 }}>Photos & Physical Evidence</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'EMAILS' ? 'active' : ''}`}
            onClick={() => handleNav('EMAILS')}
          >
            <Mail size={16} />
            <span>Email Transcripts</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'CHATS' ? 'active' : ''}`}
            onClick={() => handleNav('CHATS')}
          >
            <MessageSquare size={16} />
            <span>IRC & Chat Spools</span>
          </div>
        </div>

        {/* 6. Reconstructed Web & Hardware (🟡 Gold/Cyan Accent) */}
        <div className="sidebar-nav-section">
          <div className="sidebar-section-title" style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#fbbf24' }} />
            Reconstructed Web (1995–2007)
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'ROOM4_MONITOR' ? 'active' : ''}`}
            onClick={() => handleNav('ROOM4_MONITOR')}
          >
            <Tv size={16} color="#10b981" />
            <span style={{ color: '#10b981', fontWeight: 600 }}>"Room 4" CRT Monitor (2003)</span>
            {lockBadge('ROOM4_MONITOR')}
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'SITE_MARROW' ? 'active' : ''}`}
            onClick={() => handleNav('SITE_MARROW')}
          >
            <Server size={16} color="#2dd4bf" />
            <span>marrow.net (1998)</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'SITE_AFTERHOURS' ? 'active' : ''}`}
            onClick={() => handleNav('SITE_AFTERHOURS')}
          >
            <Server size={16} color="#60a5fa" />
            <span>afterhours.org (2003)</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'SITE_CANDLEROOM' ? 'active' : ''}`}
            onClick={() => handleNav('SITE_CANDLEROOM')}
          >
            <Server size={16} color="#f59e0b" />
            <span>candle-room.com (1998)</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'SITE_GREYLINE' ? 'active' : ''}`}
            onClick={() => handleNav('SITE_GREYLINE')}
          >
            <Server size={16} color="#94a3b8" />
            <span>greyline.net (1998)</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'SITE_BLUEWINDOW' ? 'active' : ''}`}
            onClick={() => handleNav('SITE_BLUEWINDOW')}
          >
            <Server size={16} color="#38bdf8" />
            <span>bluewindow.net (2004)</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'SITE_PALISADE' ? 'active' : ''}`}
            onClick={() => handleNav('SITE_PALISADE')}
          >
            <Server size={16} color="#ec4899" />
            <span>palisade-social.com (2007)</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'SITE_TERMINAL21' ? 'active' : ''}`}
            onClick={() => handleNav('SITE_TERMINAL21')}
          >
            <Server size={16} color="#a855f7" />
            <span>terminal21.org (2002)</span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'SITE_WEBRING' ? 'active' : ''}`}
            onClick={() => handleNav('SITE_WEBRING')}
          >
            <Share2 size={16} color="#eab308" />
            <span>webring.otherside.org (1996)</span>
          </div>
        </div>

        {/* 7. Investigator Manuals & Secrets (🛑 Ruby Accent) */}
        <div className="sidebar-nav-section">
          <div className="sidebar-section-title" style={{ color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f43f5e' }} />
            Investigator Manuals
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'FIELD_GUIDE' ? 'active' : ''}`}
            onClick={() => {
              soundEngine.playClick(750);
              openFieldGuide();
              if (onCloseMobile) onCloseMobile();
            }}
            style={{ 
              background: 'rgba(244, 63, 94, 0.08)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '6px',
              padding: '10px 12px'
            }}
          >
            <Compass size={16} color="#f43f5e" />
            <span style={{ color: '#f43f5e', fontWeight: 700 }}>Field Guide & Spoilers</span>
            <span className="badge badge-red" style={{ marginLeft: 'auto', fontSize: '0.62rem', background: '#f43f5e', color: '#fff', padding: '1px 5px' }}>
              SPOILERS
            </span>
          </div>

          <div 
            className={`sidebar-nav-item ${currentView === 'QUIZ' ? 'active' : ''}`}
            onClick={() => handleNav('QUIZ')}
            style={{ marginTop: '6px' }}
          >
            <HelpCircle size={16} color="#f43f5e" />
            <span>Archive Quiz Lab</span>
            <span className="badge badge-red" style={{ marginLeft: 'auto', fontSize: '0.58rem' }}>3 QUIZZES</span>
          </div>

          <div className={`sidebar-nav-item ${currentView === 'PROFILE' ? 'active' : ''}`} onClick={() => handleNav('PROFILE')} style={{ marginTop: '6px' }}>
            <User size={16} color="#a78bfa" />
            <span>Profile & Wardrobe</span>
            <span className="badge badge-purple" style={{ marginLeft: 'auto', fontSize: '0.6rem', background: '#7c3aed', color: '#fff' }}>RANK {store.archiveRank}</span>
          </div>
        </div>

        {/* Clearance and Integrity Status Widget */}
        <div style={{
          marginTop: 'auto',
          padding: '14px 16px',
          borderTop: '1px solid var(--nhf-border)',
          background: 'var(--nhf-bg-primary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--nhf-text-muted)' }}>CLEARANCE</span>
            <span style={{ 
              color: clearanceLevel === 'LEVEL_OMEGA' ? '#38bdf8' : clearanceLevel === 'ARCHIVIST' || clearanceLevel === 'LEVEL_NULL' ? 'var(--nhf-accent-amber)' : 'var(--nhf-accent-blue)', 
              fontWeight: 700 
            }}>
              {clearanceLevel}
            </span>
          </div>

          <button className="sidebar-profile-chip" onClick={() => handleNav('PROFILE')}>
            <span>{store.investigatorProfile.displayName || `@${store.investigatorProfile.handle}`}</span>
            <small>{store.archiveRankTitle}</small>
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--nhf-text-muted)' }}>ANOMALIES</span>
            <span style={{ color: 'var(--nhf-accent-emerald)', fontWeight: 700 }}>
              {discoveredAnomalies.length} / {Math.max(TOTAL_ANOMALIES_COUNT, discoveredAnomalies.length)}
            </span>
          </div>

          <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--nhf-bg-card)', borderRadius: '2px', overflow: 'hidden' }}>
            <div 
              style={{ 
                width: `${Math.min(100, (discoveredAnomalies.length / Math.max(TOTAL_ANOMALIES_COUNT, discoveredAnomalies.length)) * 100)}%`, 
                height: '100%', 
                backgroundColor: 'var(--nhf-accent-blue)',
                transition: 'width 0.4s ease'
              }} 
            />
          </div>

          {store.userArchetype && (
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                padding: '5px 8px',
                borderRadius: '6px',
                cursor: 'pointer',
                color: '#f59e0b',
                marginTop: '2px'
              }}
              onClick={() => handleNav('QUIZ')}
              title="View your assigned Lost Web Archetype"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <Sparkles size={11} color="#f59e0b" />
                <span>{store.userArchetype}</span>
              </span>
              <span style={{ fontSize: '0.62rem', textDecoration: 'underline', flexShrink: 0 }}>Quiz</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
