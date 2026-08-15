import React, { useState } from 'react';
import { ArchiveWrapperBar } from '../common/ArchiveWrapperBar';
import { ArchiveState } from '../../state/useArchiveStore';
import { greylineServerLogs, greylineMemos } from '../../data/greylineData';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const GreylineIspSite: React.FC<Props> = ({ store }) => {
  const { currentSubId, discoverAnomaly } = store;
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'LOGS' | 'MEMOS'>('OVERVIEW');
  const [selectedMemoId, setSelectedMemoId] = useState<string | null>(null);

  const forensicMeta = {
    objectId: 'GL-1998-000418',
    collection: 'Collection 09: Greyline Communications Tapes',
    type: 'Defunct Regional ISP Intranet & Syslog Pool',
    author: 'Dr. Douglas K. Van Houten (Lead Systems Architect)',
    observedDate: '19 Nov 1998',
    archiveConfidence: 96,
    integrity: 'Complete' as const,
    knownCopies: 3,
    relatedObjects: 34,
    anomaliesCount: 3,
    anomaliesDescription: 'Outbound TCP streams terminated at unallocated address 0.0.0.0/room with negative 4ms latency. BGP route updates were received without physical carrier synchronization.'
  };

  const htmlSource = `<!-- GREYLINE ISP INTRANET (1998) -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head><title>Greyline Communications // Regional Backbone Operations</title></head>
<body bgcolor="#C0C0C0" text="#000000">
<!-- ROUTER MKE-CORE-04 PEERED WITH 0.0.0.0/room -->
<!-- MEMO 1998-11-22 VAN HOUTEN: "It is behaving like we are connected to another network that believes we are the invalid address." -->
</body>
</html>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ArchiveWrapperBar
        store={store}
        siteName="greyline.net"
        defaultSnapshotYear={1998}
        availableSnapshots={[1995, 1998, 2001, 2002]}
        forensicData={forensicMeta}
        htmlSource={htmlSource}
      />

      <div className="greyline-container">
        <div className="greyline-window">
          <div className="greyline-titlebar">
            <span>Greyline Communications Corp. — Operations Portal v2.2</span>
            <span>[X]</span>
          </div>

          <div className="greyline-body">
            {/* Nav Tabs */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #808080', paddingBottom: '8px', marginBottom: '16px' }}>
              <button
                className="btn btn-secondary"
                style={{
                  background: activeTab === 'OVERVIEW' ? '#000080' : '#d4d0c8',
                  color: activeTab === 'OVERVIEW' ? '#ffffff' : '#000000',
                  borderColor: '#808080',
                  padding: '4px 12px'
                }}
                onClick={() => { soundEngine.playClick(600); setActiveTab('OVERVIEW'); setSelectedMemoId(null); }}
              >
                Network Status
              </button>

              <button
                className="btn btn-secondary"
                style={{
                  background: activeTab === 'LOGS' ? '#000080' : '#d4d0c8',
                  color: activeTab === 'LOGS' ? '#ffffff' : '#000000',
                  borderColor: '#808080',
                  padding: '4px 12px'
                }}
                onClick={() => { soundEngine.playClick(600); setActiveTab('LOGS'); setSelectedMemoId(null); }}
              >
                Router Syslogs (1998/2003)
              </button>

              <button
                className="btn btn-secondary"
                style={{
                  background: activeTab === 'MEMOS' ? '#000080' : '#d4d0c8',
                  color: activeTab === 'MEMOS' ? '#ffffff' : '#000000',
                  borderColor: '#808080',
                  padding: '4px 12px'
                }}
                onClick={() => { soundEngine.playClick(600); setActiveTab('MEMOS'); setSelectedMemoId(null); }}
              >
                Engineering Memos (Dr. Van Houten)
              </button>
            </div>

            {activeTab === 'OVERVIEW' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #808080', padding: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#000080', marginBottom: '6px' }}>
                    Midwest Regional Infrastructure Overview
                  </h3>
                  <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                    Greyline Communications provides dedicated T1/T3 optical frame-relay and dialup IP service across Wisconsin, Illinois, and Minnesota. Primary core nodes are located in Milwaukee, Chicago, and Minneapolis.
                  </p>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', background: '#fff', border: '1px solid #808080' }}>
                  <thead>
                    <tr style={{ background: '#000080', color: '#fff', textAlign: 'left' }}>
                      <th style={{ padding: '6px' }}>Core Router Node</th>
                      <th style={{ padding: '6px' }}>Interface Address</th>
                      <th style={{ padding: '6px' }}>Status</th>
                      <th style={{ padding: '6px' }}>Active Peers</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '6px' }}>MKE-CORE-04 (Milwaukee)</td>
                      <td style={{ padding: '6px' }}>198.51.100.1</td>
                      <td style={{ padding: '6px', color: '#b91c1c', fontWeight: 'bold' }}>ANOMALOUS (RACK 4 TEMP DROP)</td>
                      <td style={{ padding: '6px' }}>Sprint, Ameritech, 0.0.0.0/room</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '6px' }}>CHI-GW-01 (Chicago Gateway)</td>
                      <td style={{ padding: '6px' }}>209.142.68.1</td>
                      <td style={{ padding: '6px', color: '#15803d' }}>OPERATIONAL</td>
                      <td style={{ padding: '6px' }}>MCI WorldCom, UUNET</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '6px' }}>MSN-POP-02 (Madison Dial-in)</td>
                      <td style={{ padding: '6px' }}>209.142.68.14</td>
                      <td style={{ padding: '6px', color: '#15803d' }}>OPERATIONAL</td>
                      <td style={{ padding: '6px' }}>UW Campus Subnet, Marrow.net</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'LOGS' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#000080' }}>
                  Decrypted Syslog Buffer Dump (Node MKE-CORE-04 & CHI-GW-01)
                </div>
                <div style={{ background: '#000000', color: '#00ff00', padding: '16px', fontFamily: 'monospace', fontSize: '0.78rem', lineHeight: '1.6', overflowX: 'auto' }}>
                  {greylineServerLogs.map((log) => (
                    <div key={log.id} style={{ color: log.severity === 'ANOMALOUS' || log.severity === 'CRITICAL' ? '#ff4444' : '#00ff00' }}>
                      [{log.timestamp}] [{log.serverNode}] &lt;{log.severity}&gt; {log.message} (SRC: {log.sourceIp} → DST: {log.destIp})
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'MEMOS' && (
              <div>
                {selectedMemoId ? (
                  (() => {
                    const memo = greylineMemos.find(m => m.id === selectedMemoId) || greylineMemos[0];
                    return (
                      <div style={{ background: '#ffffff', border: '1px solid #808080', padding: '20px' }}>
                        <button
                          className="btn btn-secondary"
                          style={{ marginBottom: '12px', padding: '2px 8px', fontSize: '0.75rem' }}
                          onClick={() => setSelectedMemoId(null)}
                        >
                          ← Back to Memos List
                        </button>
                        <h3 style={{ color: '#000080', marginBottom: '4px' }}>{memo.title}</h3>
                        <div style={{ fontSize: '0.75rem', color: '#666', borderBottom: '1px solid #ccc', paddingBottom: '6px', marginBottom: '14px' }}>
                          Date: {memo.date} | Author: {memo.author} | To: {memo.to}
                        </div>
                        <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                          {memo.content}
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {greylineMemos.map((m) => (
                      <div
                        key={m.id}
                        style={{ background: '#fff', border: '1px solid #808080', padding: '14px', cursor: 'pointer' }}
                        onClick={() => {
                          soundEngine.playClick(750);
                          if (m.isAnomalous) discoverAnomaly('greyline-memo-read');
                          setSelectedMemoId(m.id);
                        }}
                      >
                        <div style={{ fontWeight: 'bold', color: '#000080', fontSize: '0.95rem' }}>
                          📄 {m.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>
                          Date: {m.date} | Author: {m.author}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
