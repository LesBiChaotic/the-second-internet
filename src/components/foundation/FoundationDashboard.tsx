import React from 'react';
import { 
  Database, 
  Layers, 
  Users, 
  Clock, 
  ShieldAlert, 
  ArrowRight, 
  Radio, 
  FileText, 
  Server, 
  ExternalLink,
  Lock,
  Sparkles,
  Activity
} from 'lucide-react';
import { ArchiveState } from '../../state/useArchiveStore';
import { foundationCollections, foundationArticles } from '../../data/foundationData';
import { soundEngine } from '../../state/useAudioEngine';
import { ArchiveActivityPanel } from './ArchiveActivityPanel';

interface Props {
  store: ArchiveState;
}

export const FoundationDashboard: React.FC<Props> = ({ store }) => {
  const { navigate, discoveredAnomalies, archiveIntegrity, clearanceLevel, userArchetype } = store;

  return (
    <div className="archive-intake-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner Stats */}
      <div className="stats-banner">
        <div className="stat-item">
          <span className="stat-value">14,803,201</span>
          <span className="stat-label">Objects Indexed</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">42,391</span>
          <span className="stat-label">Preserved Domains</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">1,927</span>
          <span className="stat-label">Online Communities</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">68.4 TB</span>
          <span className="stat-label">Magnetic Tapes Digitized</span>
        </div>
        <div className="stat-item">
          <span className="stat-value" style={{ color: 'var(--nhf-accent-blue)' }}>4 min ago</span>
          <span className="stat-label">Last Ingest Cycle</span>
        </div>
      </div>

      {/* Hero Welcome Box */}
      <section className="archive-mission-brief" style={{
        background: 'linear-gradient(135deg, var(--nhf-bg-surface), var(--nhf-bg-card))',
        border: '1px solid var(--nhf-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'clamp(16px, 3vw, 28px) clamp(14px, 3vw, 32px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div className="badge badge-blue">DIGITAL HUMANITIES ARCHIVE & PRESERVATION FACILITY</div>
          <span style={{ fontSize: '0.72rem', color: 'var(--nhf-text-muted)', fontFamily: 'var(--font-mono)' }}>
            EST. 2017 // MADISON & CHICAGO
          </span>
        </div>
        
        <h1 className="hero-headline" style={{ fontSize: 'clamp(1.2rem, 4.5vw, 1.8rem)', fontWeight: 700, color: 'var(--nhf-text-primary)', lineHeight: '1.3' }}>
          Preserving the digital commons before memory dissolves.
        </h1>
        
        <p style={{ fontSize: 'clamp(0.82rem, 2.2vw, 0.95rem)', color: 'var(--nhf-text-secondary)', maxWidth: '780px', lineHeight: '1.6' }}>
          The Net History Foundation catalogs, reconstructs, and safeguards endangered early internet culture (1994–2012). From regional dialup BBS spools and student webrings to early forum communities and personal blogs, our mission is to ensure the first digital generation is not erased.
        </p>

        <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-primary"
            onClick={() => {
              soundEngine.playClick(800);
              navigate('COLLECTIONS');
            }}
          >
            <Layers size={16} />
            <span>Explore Collections (01–17)</span>
          </button>

          <button className="btn btn-secondary" onClick={() => { soundEngine.playClick(800); navigate('PROFILE'); }} style={{ color: '#a78bfa', borderColor: 'rgba(167, 139, 250, 0.35)' }}>
            <Users size={16} /><span>Profile & Wardrobe · Rank {store.archiveRank}</span>
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => {
              soundEngine.playClick(800);
              navigate('QUIZ');
            }}
            style={{ borderColor: 'rgba(245, 158, 11, 0.4)', color: 'var(--nhf-accent-amber)' }}
          >
            <Sparkles size={16} />
            <span>{userArchetype ? `Quiz Lab · ${userArchetype}` : 'Archive Quiz Lab · 3 exercises'}</span>
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => {
              soundEngine.playClick(800);
              navigate('TIMELINE');
            }}
          >
            <Clock size={16} />
            <span>Interactive Timeline</span>
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => {
              soundEngine.playClick(800);
              navigate('TUNER');
            }}
            style={{ color: 'var(--nhf-accent-emerald)', borderColor: 'rgba(16, 185, 129, 0.3)' }}
          >
            <Activity size={16} />
            <span>Carrier Tuner</span>
          </button>
        </div>
        <span className="accession-stamp" aria-hidden="true">ACCESSION<br />NHF–2017<br />PUBLIC COPY</span>
      </section>

      <ArchiveActivityPanel store={store} />

      {/* Featured Reconstructed Communities */}
      <section className="reconstruction-ledger">
        <div className="archive-section-heading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--nhf-text-primary)' }}>
            Featured Reconstructed Communities
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--nhf-text-muted)' }}>
            Interactive Web 1.0 & 2.0 Snapshots
          </span>
        </div>

        <div className="dashboard-grid">
          {/* Marrow */}
          <div 
            className="dashboard-card"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              soundEngine.playClick(750);
              navigate('SITE_MARROW');
            }}
          >
            <div className="card-icon-header">
              <div className="card-icon-badge" style={{ color: '#2dd4bf' }}>
                <Server size={18} />
              </div>
              <span className="badge badge-gray">1997–1999</span>
            </div>
            <div className="card-title">marrow.net</div>
            <div className="card-description">
              Madison student portal featuring dark teal tables, guestbooks, member directory, webrings, and the unindexed /~room/ directory anomaly.
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: '#2dd4bf', fontSize: '0.82rem', fontWeight: 500 }}>
              <span>Enter Reconstructed Site</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* AfterHours */}
          <div 
            className="dashboard-card"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              soundEngine.playClick(750);
              navigate('SITE_AFTERHOURS');
            }}
          >
            <div className="card-icon-header">
              <div className="card-icon-badge" style={{ color: '#60a5fa' }}>
                <Server size={18} />
              </div>
              <span className="badge badge-gray">2001–2005</span>
            </div>
            <div className="card-title">afterhours.org</div>
            <div className="card-description">
              Intimate nocturnal message board founded by Alden Corliss. Site of the infamous October 14, 2003 Routing Event and broadcast anomaly.
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: '#60a5fa', fontSize: '0.82rem', fontWeight: 500 }}>
              <span>Enter Reconstructed Board</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Candle Room */}
          <div 
            className="dashboard-card"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              soundEngine.playClick(750);
              navigate('SITE_CANDLEROOM');
            }}
          >
            <div className="card-icon-header">
              <div className="card-icon-badge" style={{ color: '#fb923c' }}>
                <Server size={18} />
              </div>
              <span className="badge badge-gray">1998</span>
            </div>
            <div className="card-title">candle-room.com</div>
            <div className="card-description">
              Elena Rostova's eccentric paranormal web directory of numbers stations, dead servers, and the first indexed mention of "The Second Internet".
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: '#fb923c', fontSize: '0.82rem', fontWeight: 500 }}>
              <span>Enter Directory</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Greyline */}
          <div 
            className="dashboard-card"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              soundEngine.playClick(750);
              navigate('SITE_GREYLINE');
            }}
          >
            <div className="card-icon-header">
              <div className="card-icon-badge" style={{ color: '#cbd5e1' }}>
                <Server size={18} />
              </div>
              <span className="badge badge-gray">1995–2002</span>
            </div>
            <div className="card-title">greyline.net</div>
            <div className="card-description">
              Midwest dialup ISP corporate intranet and router syslogs. Contains Dr. Douglas K. Van Houten's internal memo regarding 0.0.0.0/room subnets.
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--nhf-text-secondary)', fontSize: '0.82rem', fontWeight: 500 }}>
              <span>Enter Technical Archive</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* Foundation Research & Announcements */}
      <section className="archive-desk-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '20px' }}>
        {/* Recent Publications */}
        <div className="archive-desk-panel publications-dossier" style={{ background: 'var(--nhf-bg-surface)', border: '1px solid var(--nhf-border)', borderRadius: 'var(--radius-md)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: 'var(--shadow-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--nhf-text-primary)' }}>
              Foundation Research & Blog
            </h3>
            <button 
              className="btn btn-secondary" 
              style={{ padding: '3px 8px', fontSize: '0.75rem' }}
              onClick={() => navigate('RESEARCH')}
            >
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {foundationArticles.slice(0, 3).map((art) => (
              <div className="dossier-entry"
                key={art.id}
                style={{
                  background: 'var(--nhf-bg-card)',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--nhf-border)',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  soundEngine.playClick(700);
                  navigate('RESEARCH', art.id);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--nhf-accent-blue)', fontFamily: 'var(--font-mono)' }}>
                    {art.category.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--nhf-text-muted)' }}>{art.date}</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--nhf-text-primary)', marginBottom: '4px' }}>
                  {art.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--nhf-text-secondary)', lineHeight: '1.4' }}>
                  {art.summary}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live System Diagnostics & Anomaly Counter */}
        <div className="archive-desk-panel diagnostic-sheet" style={{ background: 'var(--nhf-bg-surface)', border: '1px solid var(--nhf-border)', borderRadius: 'var(--radius-md)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: 'var(--shadow-subtle)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--nhf-text-primary)' }}>
            Archival Ingest Diagnostics
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'var(--nhf-bg-card)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--nhf-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--nhf-text-secondary)', marginBottom: '6px' }}>
                <span>Quarantined Artifacts</span>
                <span style={{ color: 'var(--nhf-accent-crimson)', fontWeight: 600 }}>38,942 objects</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--nhf-text-muted)' }}>
                Collection 17 contains non-local topologies and impossible temporal stamps.
              </div>
            </div>

            <div style={{ background: 'var(--nhf-bg-card)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--nhf-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--nhf-text-secondary)', marginBottom: '6px' }}>
                <span>Unresolved Entity Matches</span>
                <span style={{ color: 'var(--nhf-accent-amber)', fontWeight: 600 }}>14 across 8 networks</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--nhf-text-muted)' }}>
                Identities (e.g. wintermute42, Noemi Castille) appear across contradictory timestamps.
              </div>
            </div>

            <button 
              className="btn btn-secondary"
              style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}
              onClick={() => {
                soundEngine.playClick(850);
                navigate('NETWORK_GRAPH');
              }}
            >
              <span>Launch Network Topology Graph</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
