import React, { useState } from 'react';
import { Globe, Search, ShieldAlert, CheckCircle2, BookmarkPlus } from 'lucide-react';
import { whoisDatabase } from '../../data/whoisAndRoutesData';
import { WhoisRecord } from '../../types';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const WhoisLookupView: React.FC<Props> = ({ store }) => {
  const { currentSubId, pinToCaseboard, discoverAnomaly } = store;
  const [searchTerm, setSearchTerm] = useState(currentSubId || 'roomwithoutdoors.net');
  const [activeRecord, setActiveRecord] = useState<WhoisRecord | null>(
    whoisDatabase[currentSubId || 'roomwithoutdoors.net'] || whoisDatabase['roomwithoutdoors.net']
  );

  const handleSearch = (domainKey: string) => {
    soundEngine.playClick(800);
    setSearchTerm(domainKey);
    const found = whoisDatabase[domainKey.toLowerCase().trim()];
    setActiveRecord(found || null);
    if (found?.isAnomalous) {
      discoverAnomaly(`whois-${domainKey}`);
    }
  };

  const handlePin = () => {
    if (!activeRecord) return;
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'TECH',
      title: `WHOIS: ${activeRecord.domain}`,
      preview: `Registrant: ${activeRecord.registrant} | Status: ${activeRecord.status}`,
      targetView: 'WHOIS',
      targetId: activeRecord.domain,
      connectedTo: []
    });
    alert(`Pinned WHOIS record for ${activeRecord.domain} to Caseboard.`);
  };

  return (
    <div className="forensic-route whois-registry-route" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="forensic-route-heading">
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '4px' }}>
          InterNIC & Registry WHOIS Query Tool
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--nhf-text-secondary)' }}>
          Forensic registration database across historical domain registries (1994–2026).
        </p>
      </div>

      {/* Query Bar */}
      <div style={{ display: 'flex', gap: '10px', maxWidth: '640px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter domain (e.g. marrow.net, roomwithoutdoors.net, afterhours.org)..."
          style={{
            flex: 1,
            padding: '10px 14px',
            background: 'var(--nhf-bg-surface)',
            border: '1px solid var(--nhf-border)',
            borderRadius: '8px',
            color: 'var(--nhf-text-primary)',
            fontFamily: 'var(--font-mono)',
            outline: 'none'
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
        />
        <button className="btn btn-primary" onClick={() => handleSearch(searchTerm)}>
          <Search size={16} />
          <span>Lookup</span>
        </button>
      </div>

      {/* Quick Links */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {Object.keys(whoisDatabase).map((dom) => (
          <button
            key={dom}
            className="btn btn-secondary"
            style={{ padding: '4px 10px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', borderRadius: '6px' }}
            onClick={() => handleSearch(dom)}
          >
            {dom}
          </button>
        ))}
      </div>

      {/* Result Display */}
      {activeRecord ? (
        <div className={`whois-record-sheet ${activeRecord.isAnomalous ? 'anomalous' : ''}`} style={{
          background: activeRecord.isAnomalous ? 'rgba(239, 68, 68, 0.04)' : 'var(--nhf-bg-surface)',
          border: '1px solid',
          borderColor: activeRecord.isAnomalous ? 'rgba(239, 68, 68, 0.3)' : 'var(--nhf-border)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={20} color={activeRecord.isAnomalous ? '#f87171' : '#38bdf8'} />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--nhf-text-primary)', fontFamily: 'var(--font-mono)' }}>
                {activeRecord.domain}
              </h2>
            </div>

            <button className="btn btn-secondary" onClick={handlePin}>
              <BookmarkPlus size={14} />
              <span>Pin Record</span>
            </button>
          </div>

          <div style={{
            background: 'var(--nhf-bg-card)',
            border: '1px solid var(--nhf-border)',
            borderRadius: '8px',
            padding: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: '1.8',
            color: activeRecord.isAnomalous ? 'var(--nhf-accent-crimson)' : 'var(--nhf-text-secondary)'
          }}>
            <div><strong>Domain Name:</strong> {activeRecord.domain}</div>
            <div><strong>Registrar:</strong> {activeRecord.registrar}</div>
            <div><strong>Creation Date:</strong> {activeRecord.creationDate}</div>
            <div><strong>Expiration Date:</strong> {activeRecord.expirationDate}</div>
            <div><strong>Registrant:</strong> {activeRecord.registrant}</div>
            <div><strong>Nameservers:</strong> {activeRecord.nameservers.join(', ')}</div>
            <div><strong>Status:</strong> {activeRecord.status}</div>
            <div><strong>Last Resolved:</strong> {activeRecord.lastResolved}</div>
            {activeRecord.notes && (
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--nhf-border)', color: 'var(--nhf-accent-amber)' }}>
                <strong>Archivist Annotation:</strong> {activeRecord.notes}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--nhf-text-muted)', background: 'var(--nhf-bg-surface)', border: '1px solid var(--nhf-border)', borderRadius: 'var(--radius-md)' }}>
          No WHOIS record found for "{searchTerm}".
        </div>
      )}
    </div>
  );
};
