import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, Clock3, Eye, History, X } from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';

type AmbientKind = 'echo' | 'time' | 'revisit' | 'institutional';
interface AmbientEvent { id: string; title: string; detail: string; kind: AmbientKind; witnessedAt: string; view: string; }

const safeRead = <T,>(key: string, fallback: T): T => {
  try { return JSON.parse(localStorage.getItem(key) || '') as T; } catch { return fallback; }
};

const routeLabel = (view: string) => view.replace(/^SITE_/, '').replace(/_/g, ' ').toLowerCase();

export const AmbientArchiveLayer: React.FC<{ store: ArchiveState }> = ({ store }) => {
  const [active, setActive] = useState<AmbientEvent | null>(null);
  const [logOpen, setLogOpen] = useState(false);
  const [events, setEvents] = useState<AmbientEvent[]>(() => safeRead('nhf_ambient_events', []));
  const previousView = useRef<string | null>(null);
  const timer = useRef<number | null>(null);

  const witnessedIds = useMemo(() => new Set(events.map(event => event.id)), [events]);

  useEffect(() => {
    const visits = safeRead<Record<string, number>>('nhf_route_visits', {});
    const nextCount = (visits[store.currentView] || 0) + 1;
    visits[store.currentView] = nextCount;
    localStorage.setItem('nhf_route_visits', JSON.stringify(visits));

    const now = new Date();
    const dayKey = now.toISOString().slice(0, 10);
    const candidates: Omit<AmbientEvent, 'witnessedAt'>[] = [];
    const prior = previousView.current;

    if (now.getHours() === 3 && now.getMinutes() === 14) candidates.push({ id: `time-0314-${dayKey}`, title: 'CLOCK SOURCE DISPUTED', detail: 'The workstation and archive index agree on 03:14. Their seconds counters do not.', kind: 'time', view: store.currentView });
    if (store.currentView === 'DASHBOARD' && !witnessedIds.has(`daily-ingest-${dayKey}`)) candidates.push({ id: `daily-ingest-${dayKey}`, title: 'UNSCHEDULED INGEST', detail: 'One ordinary domestic record entered the catalog while this workstation was closed. Provenance review remains pending.', kind: 'institutional', view: 'DASHBOARD' });
    if (nextCount === 3) candidates.push({ id: `revisit-${store.currentView}`, title: 'REVISIT DIFFERENTIAL', detail: `This is your third recorded visit to ${routeLabel(store.currentView)}. One punctuation mark no longer matches the first snapshot.`, kind: 'revisit', view: store.currentView });
    if (prior?.startsWith('SITE_') && store.currentView.startsWith('SITE_') && prior !== store.currentView) candidates.push({ id: `echo-${prior}-${store.currentView}`, title: 'CROSS-ARCHIVE ECHO', detail: `A cached phrase from ${routeLabel(prior)} appeared briefly in the reconstruction buffer for ${routeLabel(store.currentView)}. No link was followed.`, kind: 'echo', view: store.currentView });
    if (store.currentView === 'EMAILS' && store.discoveredAnomalies.length >= 3) candidates.push({ id: 'mail-index-self-sort', title: 'MAIL INDEX MUTATION', detail: 'The correspondence index briefly sorted itself by emotional urgency rather than date. The ingest service denies supporting that field.', kind: 'institutional', view: 'EMAILS' });
    if (store.currentView === 'STAFF' && store.discoveredAnomalies.length >= 6) candidates.push({ id: 'office-304-presence', title: 'OCCUPANCY SENSOR // OFFICE 304', detail: 'Motion detected for eleven seconds. Facilities confirms Office 304 remains a utility closet.', kind: 'institutional', view: 'STAFF' });
    if (store.currentView === 'TRACE' && store.discoveredAnomalies.includes('wintermute-live-reply')) candidates.push({ id: 'trace-watching-back', title: 'PRESENCE COUNT: +1', detail: 'TRACE reports one more reader than the connected-session list can name.', kind: 'echo', view: 'TRACE' });
    if (store.currentView === 'SITE_BLUEWINDOW' && store.discoveredAnomalies.includes('bw-impossible-date')) candidates.push({ id: 'bluewindow-curtain', title: 'SNAPSHOT WEATHER CHANGED', detail: 'Rain now appears outside the archived window. The source image contains no animated frames.', kind: 'echo', view: 'SITE_BLUEWINDOW' });

    const event = candidates.find(candidate => !witnessedIds.has(candidate.id));
    previousView.current = store.currentView;
    if (!event) return;
    const recorded: AmbientEvent = { ...event, witnessedAt: now.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) };
    const nextEvents = [recorded, ...events].slice(0, 40);
    setEvents(nextEvents);
    localStorage.setItem('nhf_ambient_events', JSON.stringify(nextEvents));
    setActive(recorded);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setActive(null), 6500);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [store.currentView, store.discoveredAnomalies.length]);

  return (
    <>
      {active && <div className={`ambient-phenomenon kind-${active.kind}`} role="status"><div className="ambient-scan-mark" aria-hidden="true" /><div><span>AMBIENT ARCHIVE EVENT</span><strong>{active.title}</strong><p>{active.detail}</p></div><button onClick={() => setActive(null)} aria-label="Dismiss ambient event"><X size={15} /></button></div>}
      <button className="ambient-log-toggle" onClick={() => setLogOpen(value => !value)} aria-expanded={logOpen} aria-controls="ambient-witness-log"><History size={15} /><span>{events.length} witnessed</span></button>
      {logOpen && <aside id="ambient-witness-log" className="ambient-witness-log" aria-label="Witnessed ambient archive events"><header><div><span>WORKSTATION MEMORY</span><h2>Witnessed phenomena</h2></div><button onClick={() => setLogOpen(false)} aria-label="Close witnessed phenomena"><X size={17} /></button></header>{events.length ? <div className="ambient-event-list">{events.map(event => <article key={event.id} className={`kind-${event.kind}`}><div>{event.kind === 'time' ? <Clock3 size={15} /> : event.kind === 'institutional' ? <Activity size={15} /> : <Eye size={15} />}<strong>{event.title}</strong></div><p>{event.detail}</p><small>{event.witnessedAt} // {routeLabel(event.view)}</small></article>)}</div> : <p className="ambient-empty">The workstation has not witnessed any ambient phenomena.</p>}</aside>}
    </>
  );
};
