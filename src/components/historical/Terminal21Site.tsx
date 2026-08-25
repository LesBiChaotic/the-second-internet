import React, { useState } from 'react';
import { ArchiveWrapperBar } from '../common/ArchiveWrapperBar';
import { ArchiveState } from '../../state/useArchiveStore';
import { terminal21Threads } from '../../data/terminal21Data';
import { ambientTerminalThreads } from '../../data/worldPopulationData';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const Terminal21Site: React.FC<Props> = ({ store }) => {
  const populatedThreads = [...terminal21Threads, ...ambientTerminalThreads];
  const { currentSubId, discoverAnomaly } = store;
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(
    currentSubId && currentSubId !== 'terminal21' ? currentSubId : null
  );

  const forensicMeta = {
    objectId: 'T21-2002-001094',
    collection: 'Collection 08: Low-Level Hacker Boards',
    type: 'BSD/Linux Kernel & Protocol Development Forum',
    author: 'Dr. Douglas K. Van Houten & Vladimir Koren',
    observedDate: '10 Aug 2002',
    archiveConfidence: 95,
    integrity: 'Complete' as const,
    knownCopies: 3,
    relatedObjects: 22,
    anomaliesCount: 2,
    anomaliesDescription: 'Soviet engineer Vladimir Koren warns against raw socket bindings to 0.0.0.0/0:room citing 1974 BESM-6 telemetry experiments at Akademgorodok.'
  };

  const htmlSource = `<!-- TERMINAL 21 RAW FORUM BUFFER (2002) -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
<head><title>Terminal 21 // Systems & Protocol Engineering</title></head>
<body bgcolor="#050A05" text="#33FF66">
<!-- KERNEL SOCKET: 0.0.0.0/0:room -->
<!-- "You are not observing a kernel bug. You are observing the substrate." -->
</body>
</html>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ArchiveWrapperBar
        store={store}
        siteName="terminal21.org"
        defaultSnapshotYear={2002}
        availableSnapshots={[2002, 2003, 2004, 2005]}
        forensicData={forensicMeta}
        htmlSource={htmlSource}
      />

      <div className="terminal21-container">
        <div className="terminal21-box">
          <div style={{ borderBottom: '1px solid #1a5e2a', paddingBottom: '12px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', color: '#33ff66', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                [ TERMINAL 21 // SYSTEMS HACKING ]
              </h1>
              <div style={{ fontSize: '0.78rem', color: '#1a9e3a' }}>
                Low-level networking, BSD kernel development, BGP routing anomalies (Est. 2002)
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#1a9e3a' }}>
              HOST: freebsd4.terminal21.org
            </div>
          </div>

          {selectedThreadId ? (
            (() => {
              const thread = populatedThreads.find(t => t.id === selectedThreadId) || populatedThreads[0];
              return (
                <div>
                  <button
                    className="btn btn-secondary"
                    style={{ marginBottom: '16px', padding: '3px 8px', fontSize: '0.75rem', color: '#33ff66', borderColor: '#1a5e2a', background: '#020502' }}
                    onClick={() => setSelectedThreadId(null)}
                  >
                    &lt;-- Back to Threads
                  </button>

                  <h2 style={{ fontSize: '1.2rem', color: '#33ff66', marginBottom: '8px' }}>
                    &gt; {thread.title}
                  </h2>
                  <div style={{ fontSize: '0.75rem', color: '#1a9e3a', borderBottom: '1px solid #1a5e2a', paddingBottom: '6px', marginBottom: '14px' }}>
                    Category: {thread.category} | Created: {thread.createdDate}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {thread.posts.map((p) => (
                      <div key={p.id} style={{ background: '#020702', border: '1px solid #1a5e2a', padding: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#1a9e3a', borderBottom: '1px dashed #1a5e2a', paddingBottom: '4px', marginBottom: '8px' }}>
                          <span style={{ fontWeight: 'bold', color: '#33ff66' }}>{p.authorHandle} ({p.authorTitle})</span>
                          <span>{p.timestamp}</span>
                        </div>
                        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '0.85rem' }}>
                          {p.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {populatedThreads.map((t) => (
                <div
                  key={t.id}
                  style={{ background: '#020702', border: '1px solid #1a5e2a', padding: '14px', cursor: 'pointer' }}
                  onClick={() => {
                    soundEngine.playClick(750);
                    if (t.isAnomalous) discoverAnomaly('t21-koren-anomaly');
                    setSelectedThreadId(t.id);
                  }}
                >
                  <div style={{ color: '#33ff66', fontWeight: 'bold', fontSize: '0.95rem' }}>
                    &gt; {t.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#1a9e3a', marginTop: '4px' }}>
                    Author: {t.authorHandle} • Replies: {t.replyCount} • Date: {t.createdDate}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
