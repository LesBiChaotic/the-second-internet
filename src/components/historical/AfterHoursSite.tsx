import React, { useState } from 'react';
import { ArchiveWrapperBar } from '../common/ArchiveWrapperBar';
import { ArchiveState } from '../../state/useArchiveStore';
import { afterhoursCategories, afterhoursThreads, afterhoursModLogs } from '../../data/afterhoursData';
import { ambientAfterHoursThreads } from '../../data/worldPopulationData';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const AfterHoursSite: React.FC<Props> = ({ store }) => {
  const populatedThreads = [...afterhoursThreads, ...ambientAfterHoursThreads];
  const { currentSubId, navigate, discoverAnomaly } = store;
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(
    currentSubId && currentSubId !== 'afterhours' ? currentSubId : null
  );

  const forensicMeta = {
    objectId: 'AH-2003-009841',
    collection: 'Collection 11: AfterHours Nocturnal Board',
    type: 'phpBB Forum Archive Dump',
    author: 'Alden Corliss (janus)',
    observedDate: '14 Oct 2003',
    archiveConfidence: 89,
    integrity: 'Conflicting' as const,
    knownCopies: 2,
    relatedObjects: 45,
    anomaliesCount: 3,
    anomaliesDescription: 'Thread #4812 ("I can see everyone who is logged in") was posted from unrouted loopback 0.0.0.0 during the 11-minute routing event. Admin Alden Corliss disappeared from physical premises.'
  };

  const htmlSource = `<!-- AFTERHOURS.ORG vBulletin/phpBB DUMP -->
<!-- ARCHIVED BY NET HISTORY FOUNDATION INGEST PIPELINE -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>AfterHours.org // The Night Country</title>
</head>
<body bgcolor="#080C14" text="#CBD5E1">
  <!-- DB ERROR: TABLE AFTERHOURS_POSTS LOCKED BY HIGHER PEER (0.0.0.0) -->
  <!-- ACTIVE SESSION: janus (DISCONNECTED AT CLIENT REQUEST: 2003-10-14 03:25:19) -->
  <!-- ACTIVE SESSION: lucidwitch (CONNECTED VIA CHICAGO GATEWAY) -->
</body>
</html>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ArchiveWrapperBar
        store={store}
        siteName="afterhours.org"
        defaultSnapshotYear={2003}
        availableSnapshots={[2001, 2002, 2003, 2004, 2005]}
        forensicData={forensicMeta}
        htmlSource={htmlSource}
      />

      <div className="afterhours-container">
        <div className="afterhours-wrapper">
          {/* Header */}
          <div className="afterhours-header">
            <div>
              <div className="afterhours-board-title" onClick={() => { soundEngine.playClick(600); setSelectedThreadId(null); }} style={{ cursor: 'pointer' }}>
                AFTERHOURS.ORG
              </div>
              <div className="afterhours-tagline">
                A sanctuary for nocturnal thoughts, late night frequencies, and insomniacs. (Est. 2001)
              </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: '0.78rem', color: '#64748b' }}>
              <div>Logged in as: <strong>Guest (Archive Read-Only)</strong></div>
              <div>Server Time: Oct 14, 2003 03:25:19 UTC-5</div>
            </div>
          </div>

          {selectedThreadId ? (
            (() => {
              const thread = populatedThreads.find(t => t.id === selectedThreadId) || populatedThreads[0];
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      className="btn btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                      onClick={() => setSelectedThreadId(null)}
                    >
                      ← Back to Board Index
                    </button>
                    <span className="badge badge-gray">{thread.category}</span>
                  </div>

                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: thread.isAnomalous ? '#f87171' : '#93c5fd', margin: '4px 0' }}>
                    {thread.title}
                  </div>

                  {thread.posts.map((post) => {
                    return (
                      <div key={post.id} className="afterhours-post-card">
                        <div className="afterhours-author-col">
                          <span className="afterhours-author-name">{post.authorHandle}</span>
                          <span style={{ color: '#64748b' }}>{post.authorTitle}</span>
                          {post.authorJoinDate && (
                            <span style={{ color: '#475569', marginTop: '6px' }}>
                              Joined: {post.authorJoinDate}
                            </span>
                          )}
                          {post.authorPostCount !== undefined && (
                            <span style={{ color: '#475569' }}>
                              Posts: {post.authorPostCount}
                            </span>
                          )}
                        </div>

                        <div className="afterhours-post-body">
                          <div style={{ fontSize: '0.75rem', color: '#64748b', borderBottom: '1px solid #1e293b', paddingBottom: '6px', marginBottom: '10px' }}>
                            Posted: {post.timestamp}
                          </div>
                          <div className="afterhours-post-content" style={{ color: post.isAnomalous ? '#fca5a5' : '#cbd5e1' }}>
                            {post.content}
                          </div>
                          <div style={{ marginTop: '16px', borderTop: '1px solid #1e293b', paddingTop: '6px', fontSize: '0.72rem', color: '#475569', fontStyle: 'italic' }}>
                            ____________________<br/>
                            AfterHours Community Archive Dump #009841
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Category Board Tables */}
              {afterhoursCategories.map((cat) => {
                const catThreads = populatedThreads.filter(t => t.category === cat.name || (cat.id === 'cat-quarantine' && t.isAnomalous));
                return (
                  <div key={cat.id}>
                    <table className="afterhours-table">
                      <thead>
                        <tr>
                          <th className="afterhours-th" style={{ width: '60%' }}>
                            {cat.name} — <span style={{ textTransform: 'none', fontWeight: 'normal', color: '#64748b' }}>{cat.description}</span>
                          </th>
                          <th className="afterhours-th" style={{ width: '15%' }}>Author</th>
                          <th className="afterhours-th" style={{ width: '10%' }}>Replies</th>
                          <th className="afterhours-th" style={{ width: '15%' }}>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {catThreads.map((t) => (
                          <tr 
                            key={t.id} 
                            className="afterhours-tr"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              soundEngine.playClick(750);
                              if (t.isAnomalous) discoverAnomaly('ah-thread-oct14-read');
                              setSelectedThreadId(t.id);
                            }}
                          >
                            <td className="afterhours-td">
                              <span style={{ color: t.isAnomalous ? '#f87171' : '#60a5fa', fontWeight: t.isPinned ? 'bold' : 'normal' }}>
                                {t.isPinned ? '📌 ' : ''}{t.isAnomalous ? '⚠ ' : ''}{t.title}
                              </span>
                            </td>
                            <td className="afterhours-td" style={{ color: '#94a3b8' }}>{t.authorHandle}</td>
                            <td className="afterhours-td" style={{ color: '#64748b' }}>{t.replyCount}</td>
                            <td className="afterhours-td" style={{ color: '#64748b' }}>{t.createdDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}

              {/* Moderator Logs Section */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '16px', borderRadius: '4px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#f59e0b', marginBottom: '8px' }}>
                  RECOVERED MODERATOR AUDIT TRAIL (OCTOBER 14, 2003)
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {afterhoursModLogs.map((log) => (
                    <div key={log.id}>
                      [{log.timestamp}] {log.admin}: {log.action} → <span style={{ color: '#ef4444' }}>{log.result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
