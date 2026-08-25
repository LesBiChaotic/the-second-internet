import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArchiveState } from '../../state/useArchiveStore';

type Realm = 'foundation' | 'first-internet' | 'second-internet';
type Weather = 'dust' | 'phosphor' | 'rain' | 'snow' | 'moths' | 'paper';

const realmFor = (view: string): Realm => view === 'SECOND_NET' || view === 'TRACE' ? 'second-internet' : view.startsWith('SITE_') ? 'first-internet' : 'foundation';
const weatherFor = (view: string): Weather => {
  if (view === 'SITE_CANDLEROOM') return 'moths';
  if (view === 'SITE_BLUEWINDOW' || view === 'SITE_GREYLINE') return 'rain';
  if (view === 'SECOND_NET' || view === 'TRACE') return 'snow';
  if (['TUNER', 'RADIO_SPECTROGRAPH', 'APERTURE_TERMINAL', 'PACKET_TERMINAL', 'ROOM4_MONITOR', 'SITE_TERMINAL21'].includes(view)) return 'phosphor';
  if (['PHYSICAL_DOCS', 'EMAILS', 'COLLECTIONS', 'TIMELINE', 'RESEARCH'].includes(view)) return 'paper';
  return 'dust';
};

const snapshotLabels: Record<string, string> = {
  SITE_MARROW: 'MARROWNET // PERSONAL HOMEPAGE CAPTURE',
  SITE_AFTERHOURS: 'AFTERHOURS // MESSAGE BOARD MIRROR',
  SITE_CANDLEROOM: 'CANDLE ROOM // GUESTBOOK SNAPSHOT',
  SITE_GREYLINE: 'GREYLINE ISP // CUSTOMER CACHE',
  SITE_BLUEWINDOW: 'BLUE WINDOW // WEBCAM ARCHIVE',
  SITE_PALISADE: 'PALISADE // SOCIAL INDEX',
  SITE_TERMINAL21: 'TERMINAL 21 // REMOTE SHELL RECORD',
  SITE_WEBRING: 'WEBRING // SURVIVING LINK MAP'
};

export const EnvironmentalEffectsLayer: React.FC<{ store: ArchiveState }> = ({ store }) => {
  const [loading, setLoading] = useState(false);
  const [corrupting, setCorrupting] = useState(false);
  const routeCount = useRef(0);
  const realm = realmFor(store.currentView);
  const weather = weatherFor(store.currentView);
  const particleCount = store.environmentalIntensity === 'full' ? 24 : store.environmentalIntensity === 'standard' ? 14 : 7;
  const particles = useMemo(() => Array.from({ length: particleCount }, (_, index) => index), [particleCount]);

  useEffect(() => {
    routeCount.current += 1;
    if (store.currentView.startsWith('SITE_') && store.environmentalEffects) {
      setLoading(true);
      const timer = window.setTimeout(() => setLoading(false), store.environmentalIntensity === 'quiet' ? 280 : 520);
      return () => window.clearTimeout(timer);
    }
  }, [store.currentView, store.environmentalEffects, store.environmentalIntensity]);

  useEffect(() => {
    if (!store.environmentalEffects || store.motionPreference === 'reduced' || store.discoveredAnomalies.length < 4) return;
    const interval = store.environmentalIntensity === 'full' ? 9 : store.environmentalIntensity === 'standard' ? 13 : 19;
    if (routeCount.current % interval !== 0) return;
    setCorrupting(true);
    const timer = window.setTimeout(() => setCorrupting(false), 460);
    return () => window.clearTimeout(timer);
  }, [store.currentView, store.environmentalEffects, store.environmentalIntensity, store.motionPreference, store.discoveredAnomalies.length]);

  if (!store.environmentalEffects) return null;
  return <div className={`environment-layer realm-${realm} weather-${weather} intensity-${store.environmentalIntensity}`} aria-hidden="true">
    <div className="environment-particles">{particles.map(index => <i key={index} style={{ '--particle-left': `${index * 4.13}%`, '--particle-top': `${index * 4.1}%`, '--particle-duration': `${8 + index * .31}s`, '--particle-delay': `${index * -.47}s`, '--rain-duration': `${1.2 + index * .025}s`, '--snow-duration': `${.7 + index * .035}s`, '--phosphor-duration': `${3 + index * .08}s` } as React.CSSProperties} />)}</div>
    {loading && <div className="historical-loading-screen"><span>NET HISTORY FOUNDATION</span><strong>{snapshotLabels[store.currentView] || 'HISTORICAL SNAPSHOT'}</strong><small>Reconstructing period scripts · preserving broken links</small></div>}
    {corrupting && <div className="rare-route-corruption"><span>ROUTE MEMORY MISMATCH</span><small>Recovered before navigation diverged.</small></div>}
  </div>;
};
