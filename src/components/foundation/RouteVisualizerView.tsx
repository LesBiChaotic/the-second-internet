import React, { useState } from 'react';
import { GitCommit, Search, ShieldAlert, ArrowRight, BookmarkPlus, Zap } from 'lucide-react';
import { routeTraceRecords } from '../../data/whoisAndRoutesData';
import { RouteRecord } from '../../types';
import { ArchiveState } from '../../state/useArchiveStore';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const RouteVisualizerView: React.FC<Props> = ({ store }) => {
  const { currentSubId, pinToCaseboard, discoverAnomaly } = store;
  const [selectedRouteKey, setSelectedRouteKey] = useState<string>(currentSubId || 'roomwithoutdoors.net');

  const activeRecord: RouteRecord = routeTraceRecords[selectedRouteKey] || routeTraceRecords['roomwithoutdoors.net'];

  const handleSelectRoute = (key: string) => {
    soundEngine.playClick(800);
    setSelectedRouteKey(key);
    if (key === 'roomwithoutdoors.net') {
      discoverAnomaly('route-room-source');
    }
  };

  const handlePin = () => {
    soundEngine.playClick(1000);
    pinToCaseboard({
      type: 'TECH',
      title: `Traceroute: ${activeRecord.domain}`,
      preview: activeRecord.summary,
      targetView: 'ROUTE_TRACE',
      targetId: activeRecord.domain,
      connectedTo: []
    });
    alert(`Pinned Route Trace for ${activeRecord.domain} to Caseboard.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--nhf-text-primary)', marginBottom: '4px' }}>
          Packet Route & BGP Topology Tracer
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--nhf-text-secondary)' }}>
          Forensic simulation of packet propagation through regional backbones, gateway switches, and anomalous subnets.
        </p>
      </div>

      {/* Selectors */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {Object.keys(routeTraceRecords).map((k) => (
          <button
            key={k}
            className="btn btn-secondary"
            style={{
              padding: '6px 12px',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              borderRadius: '6px',
              borderColor: selectedRouteKey === k ? 'var(--nhf-accent-blue)' : 'var(--nhf-border)',
              color: selectedRouteKey === k ? 'var(--nhf-accent-blue)' : 'var(--nhf-text-muted)',
              background: selectedRouteKey === k ? 'rgba(59, 130, 246, 0.15)' : 'var(--nhf-bg-surface)'
            }}
            onClick={() => handleSelectRoute(k)}
          >
            {k}
          </button>
        ))}
      </div>

      {/* Trace Route Display */}
      <div style={{
        background: activeRecord.isAnomalous ? 'rgba(239, 68, 68, 0.04)' : 'var(--nhf-bg-surface)',
        border: '1px solid',
        borderColor: activeRecord.isAnomalous ? 'rgba(239, 68, 68, 0.3)' : 'var(--nhf-border)',
        borderRadius: 'var(--radius-md)',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GitCommit size={20} color={activeRecord.isAnomalous ? '#f87171' : 'var(--nhf-accent-blue)'} />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--nhf-text-primary)', fontFamily: 'var(--font-mono)' }}>
                traceroute to {activeRecord.domain} ({activeRecord.destinationIp})
              </h2>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--nhf-text-secondary)', marginTop: '4px' }}>
              {activeRecord.summary}
            </div>
          </div>

          <button className="btn btn-secondary" onClick={handlePin}>
            <BookmarkPlus size={14} />
            <span>Pin Route</span>
          </button>
        </div>

        {/* Hops Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activeRecord.steps.map((step) => {
            const isAnom = step.status === 'ANOMALOUS' || step.status === 'IMPOSSIBLE';
            return (
              <div
                key={step.hop}
                style={{
                  background: isAnom ? 'rgba(239, 68, 68, 0.1)' : 'var(--nhf-bg-card)',
                  border: '1px solid',
                  borderColor: isAnom ? 'rgba(239, 68, 68, 0.35)' : 'var(--nhf-border)',
                  borderRadius: '8px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: isAnom ? '#f87171' : 'var(--nhf-accent-blue)',
                    width: '32px'
                  }}>
                    #{step.hop}
                  </span>

                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.9rem', color: isAnom ? 'var(--nhf-accent-crimson)' : 'var(--nhf-text-primary)' }}>
                      {step.nodeName} ({step.ip})
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--nhf-text-muted)' }}>
                      Location: {step.location}
                    </div>
                    {step.comment && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--nhf-accent-amber)', marginTop: '4px', fontStyle: 'italic' }}>
                        ⚠ {step.comment}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: step.latency.startsWith('-') ? '#ef4444' : '#10b981',
                    fontWeight: 600
                  }}>
                    {step.latency}
                  </span>
                  <span className={`badge ${isAnom ? 'badge-red' : 'badge-green'}`}>
                    {step.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
