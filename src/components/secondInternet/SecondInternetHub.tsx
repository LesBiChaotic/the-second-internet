import React, { useState } from 'react';
import { ArrowUp, ShieldAlert, Globe, Compass, Radio, Search, ExternalLink } from 'lucide-react';
import { secondInternetSites, SecondInternetSite } from '../../data/secondInternetData';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const SecondInternetHub: React.FC<Props> = ({ store }) => {
  const { currentSubId, navigate, discoverAnomaly } = store;
  const [activeDomain, setActiveDomain] = useState<string>(currentSubId || 'roomwithoutdoors.net');
  const [lookupQuery, setLookupQuery] = useState<string>('');
  const [lookupResult, setLookupResult] = useState<string | null>(null);

  const activeSite: SecondInternetSite = secondInternetSites[activeDomain] || secondInternetSites['roomwithoutdoors.net'];

  const handleNavDomain = (dom: string) => {
    soundEngine.playDialupChirp();
    setActiveDomain(dom);
    discoverAnomaly(`si-domain-${dom}`);
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick(900);
    const q = lookupQuery.trim().toLowerCase();

    if (q === 'where am i') {
      setLookupResult('1 match found: "You are on the first internet, looking through an aperture into the second."');
    } else if (q.includes('october 14') || q.includes('2003')) {
      setLookupResult('1 match found: "The 11-minute bridge was not a failure. It was the first time we shook hands."');
    } else if (q.includes('wintermute') || q.includes('wintermute42')) {
      setLookupResult('1 match found: "wintermute42 has been present since Station Null (1877). He will leave when the cables rust."');
    } else if (q.includes('alden') || q.includes('janus') || q.includes('corliss') || q.includes('vance')) {
      setLookupResult('1 match found: "Alden Corliss is sitting in Room 4. His monitor is still on."');
    } else {
      setLookupResult(`Query "${lookupQuery}" returned 0 physical matches. The First Internet does not retain memories of this event.`);
    }
  };

  return (
    <div className="si-wrapper">
      {/* Parallel Evolution Layout: Right-Hand Vertical Navigation */}
      <aside className="si-right-nav">
        <div className="si-nav-header">
          SECOND BUS TOPOLOGY
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {Object.keys(secondInternetSites).map((dom) => (
            <div
              key={dom}
              className={`si-nav-item ${activeDomain === dom ? 'active' : ''}`}
              onClick={() => handleNavDomain(dom)}
            >
              {dom}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', borderTop: '1px solid #222933', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
            STATUS: RESIDENT ON UNALLOCATED SUBSTRATE
          </div>

          <button
            className="btn btn-secondary"
            style={{ color: '#38bdf8', borderColor: '#222933', justifyContent: 'center' }}
            onClick={() => {
              soundEngine.playClick(600);
              navigate('DASHBOARD');
            }}
          >
            <ArrowUp size={14} />
            <span>RETURN UP (FIRST INTERNET)</span>
          </button>
        </div>
      </aside>

      {/* Main Parallel Web Content */}
      <main className="si-main-content">
        <div 
          dangerouslySetInnerHTML={{ __html: activeSite.content }}
        />

        {/* Index Search Form if active domain is index */}
        {activeDomain === 'index.second-net' && (
          <div style={{ marginTop: '20px' }}>
            <form onSubmit={handleLookup} style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Search residue of the First Network (e.g. where am i, october 14, wintermute42)..."
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  background: '#040608',
                  border: '1px solid #222933',
                  borderRadius: '4px',
                  color: '#38bdf8',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none'
                }}
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ background: '#0284c7', borderColor: '#38bdf8' }}
              >
                Lookup
              </button>
            </form>

            {lookupResult && (
              <div style={{
                background: '#040608',
                border: '1px solid #38bdf8',
                padding: '16px 20px',
                borderRadius: '4px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: '#7dd3fc',
                lineHeight: '1.6'
              }}>
                {lookupResult}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
