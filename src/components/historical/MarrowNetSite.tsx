import React, { useState } from 'react';
import { ArchiveWrapperBar } from '../common/ArchiveWrapperBar';
import { ArchiveState } from '../../state/useArchiveStore';
import { marrowMembers, marrowGuestbook, marrowThreads, marrowBelowContent } from '../../data/marrowData';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const MarrowNetSite: React.FC<Props> = ({ store }) => {
  const { currentSubId, navigate, discoverAnomaly } = store;
  const [activeTab, setActiveTab] = useState<'HOME' | 'FORUMS' | 'MEMBERS' | 'GUESTBOOK' | 'BELOW'>(
    currentSubId === 'below' ? 'BELOW' : 'HOME'
  );
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(
    currentSubId && currentSubId !== 'below' ? currentSubId : null
  );
  const [readableMode, setReadableMode] = useState<boolean>(false);

  const forensicMeta = {
    objectId: 'MW-1998-004712',
    collection: 'Collection 04: Marrow Network Corpus',
    type: 'Reconstructed Student Web Portal',
    author: 'Corbin Keller (pixelpunk) & Noemi Castille (nyxgirl)',
    observedDate: '14 Nov 1997',
    archiveConfidence: 94,
    integrity: 'Complete' as const,
    knownCopies: 4,
    relatedObjects: 28,
    anomaliesCount: activeTab === 'BELOW' ? 2 : 1,
    anomaliesDescription: 'User wintermute42 registration timestamp (2004) precedes database creation by 6 years. Subnet /~room/ points to unallocated loopback.'
  };

  const htmlSource = `<!-- MARROW.NET HOMEPAGE SOURCE DUMP -->
<!-- ARCHIVED BY NET HISTORY FOUNDATION INGEST PIPELINE -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<html>
<head>
  <title>Marrow.net // Madison Student Web Guild</title>
</head>
<body bgcolor="#002B2B" text="#E0F2F1" link="#80DEEA" vlink="#80CBC4">
  <center>
    <!-- DO NOT DELETE: httpd.conf alias /~room/ routed to Greyline Milwaukee Node 04 -->
    <!-- USER nyxgirl CURRENTLY CONNECTED (1998-11-19 23:44:12) -->
    <h1>MARROW.NET</h1>
    <p>Welcome to the Madison web hobbyist portal.</p>
  </center>
</body>
</html>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ArchiveWrapperBar
        store={store}
        siteName="marrow.net"
        defaultSnapshotYear={1998}
        availableSnapshots={[1997, 1998, 1999, 2003]}
        forensicData={forensicMeta}
        htmlSource={htmlSource}
        isReadableMode={readableMode}
        onToggleReadableMode={() => setReadableMode(!readableMode)}
      />

      <div className="marrow-container" style={{ padding: readableMode ? '16px' : '20px' }}>
        <table 
          className="marrow-layout-table"
          style={{
            maxWidth: readableMode ? '100%' : '960px',
            borderStyle: readableMode ? 'none' : 'ridge'
          }}
        >
          <tbody>
            <tr>
              <td colSpan={2} className="marrow-header-cell">
                <div className="marrow-logo-title">✦ MARROW.NET ✦</div>
                <div style={{ fontSize: '0.85rem', color: '#80cbc4', fontStyle: 'italic' }}>
                  The University of Wisconsin - Madison Web Guild & Community Portal (Est. Nov 1997)
                </div>
                
                {/* 1998 Visitor Counter */}
                <div style={{ marginTop: '10px', display: 'inline-block', background: '#000', border: '1px solid #00aaaa', padding: '2px 8px', fontFamily: 'VT323, monospace', fontSize: '1rem', color: '#ffcc00' }}>
                  VISITORS: 0 4 8 2 9 1
                </div>
              </td>
            </tr>

            {/* Navigation Bar */}
            <tr>
              <td colSpan={2} className="marrow-nav-bar">
                <span className="marrow-nav-link" onClick={() => { soundEngine.playClick(600); setActiveTab('HOME'); setSelectedThreadId(null); }}>
                  [ Home ]
                </span>
                <span className="marrow-nav-link" onClick={() => { soundEngine.playClick(600); setActiveTab('FORUMS'); setSelectedThreadId(null); }}>
                  [ Discussion Forums ]
                </span>
                <span className="marrow-nav-link" onClick={() => { soundEngine.playClick(600); setActiveTab('MEMBERS'); setSelectedThreadId(null); }}>
                  [ Member Directory ]
                </span>
                <span className="marrow-nav-link" onClick={() => { soundEngine.playClick(600); setActiveTab('GUESTBOOK'); setSelectedThreadId(null); }}>
                  [ Sign Guestbook ]
                </span>
                <span 
                  className="marrow-nav-link" 
                  style={{ color: '#ffaa55' }}
                  onClick={() => { 
                    soundEngine.playClick(900); 
                    discoverAnomaly('mw-below-tab'); 
                    setActiveTab('BELOW'); 
                  }}
                >
                  [ /~room/ (Marrow Below) ]
                </span>
              </td>
            </tr>

            <tr>
              <td className="marrow-content-area" style={{ verticalAlign: 'top' }}>
                {activeTab === 'HOME' && (
                  <div>
                    <div className="marrow-box">
                      <div className="marrow-box-title">Welcome to Marrow.net v1.4</div>
                      <p>
                        Marrow is an independent student portal hosted on the computer science department subnet in Madison, Wisconsin. We provide free 5MB homepage hosting, webrings, message boards, and local IRC chat on EFnet #marrow.
                      </p>
                      <p style={{ marginTop: '10px' }}>
                        <strong>Latest Announcement:</strong> We have upgraded our Apache web server to Linux kernel 2.0.33! If you notice any CGI errors on your student homepage, please contact Dave (pixelpunk).
                      </p>
                    </div>

                    <div className="marrow-box">
                      <div className="marrow-box-title">Recent Forum Threads</div>
                      <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                        {marrowThreads.map((t) => (
                          <li key={t.id}>
                            <span 
                              style={{ color: '#80deea', textDecoration: 'underline', cursor: 'pointer' }}
                              onClick={() => { soundEngine.playClick(750); setActiveTab('FORUMS'); setSelectedThreadId(t.id); }}
                            >
                              {t.title}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: '#80cbc4', marginLeft: '8px' }}>
                              by {t.authorHandle} ({t.replyCount} replies)
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Retro 88x31 Badges Row */}
                    <div className="retro-badge-row" style={{ justifyContent: 'center', marginTop: '24px' }}>
                      <div className="retro-88x31-badge badge-netscape">NETSCAPE 4.0 NOW</div>
                      <div className="retro-88x31-badge badge-notepad">MADE W/ NOTEPAD</div>
                      <div className="retro-88x31-badge badge-apache">APACHE POWERED</div>
                      <div className="retro-88x31-badge badge-resolution">BEST 800x600</div>
                      <div className="retro-88x31-badge badge-valid-html">W3C HTML 3.2</div>
                    </div>
                  </div>
                )}

                {activeTab === 'FORUMS' && (
                  <div>
                    {selectedThreadId ? (
                      (() => {
                        const thread = marrowThreads.find(t => t.id === selectedThreadId) || marrowThreads[0];
                        return (
                          <div className="marrow-box">
                            <div className="marrow-box-title">{thread.title}</div>
                            <button 
                              className="btn btn-secondary" 
                              style={{ marginBottom: '14px', padding: '2px 8px', fontSize: '0.75rem', background: '#001f1f', color: '#80deea', borderColor: '#006666' }}
                              onClick={() => setSelectedThreadId(null)}
                            >
                              ← Back to Thread List
                            </button>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                              {thread.posts.map((p) => (
                                <div key={p.id} style={{ background: '#001a1a', border: '1px solid #004d4d', padding: '12px' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #003333', paddingBottom: '4px', marginBottom: '8px', fontSize: '0.8rem', color: '#80cbc4' }}>
                                    <span style={{ fontWeight: 'bold', color: '#80deea' }}>
                                      {p.authorHandle} ({p.authorTitle})
                                    </span>
                                    <span>{p.timestamp}</span>
                                  </div>
                                  <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '0.9rem' }}>
                                    {p.content}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="marrow-box">
                        <div className="marrow-box-title">Discussion Boards</div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                          <thead>
                            <tr style={{ background: '#004d4d', color: '#e0f2f1', textAlign: 'left' }}>
                              <th style={{ padding: '6px' }}>Thread Topic</th>
                              <th style={{ padding: '6px' }}>Author</th>
                              <th style={{ padding: '6px' }}>Replies</th>
                              <th style={{ padding: '6px' }}>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {marrowThreads.map((t) => (
                              <tr key={t.id} style={{ borderBottom: '1px solid #004d4d' }}>
                                <td style={{ padding: '8px' }}>
                                  <span 
                                    style={{ color: '#80deea', textDecoration: 'underline', cursor: 'pointer', fontWeight: t.isPinned ? 'bold' : 'normal' }}
                                    onClick={() => { soundEngine.playClick(750); setSelectedThreadId(t.id); }}
                                  >
                                    {t.isPinned ? '📌 ' : ''}{t.title}
                                  </span>
                                </td>
                                <td style={{ padding: '8px' }}>{t.authorHandle}</td>
                                <td style={{ padding: '8px' }}>{t.replyCount}</td>
                                <td style={{ padding: '8px' }}>{t.createdDate}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'MEMBERS' && (
                  <div className="marrow-box">
                    <div className="marrow-box-title">Member Directory (1998 Roster)</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
                      {marrowMembers.map((m) => (
                        <div key={m.handle} style={{ background: '#001a1a', border: '1px solid #004d4d', padding: '12px' }}>
                          <div style={{ fontWeight: 'bold', color: '#80deea', fontSize: '1rem' }}>
                            ~{m.handle}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#80cbc4', margin: '4px 0' }}>
                            {m.realName} • {m.major}
                          </div>
                          <div style={{ fontSize: '0.75rem', fontStyle: 'italic', color: '#b2dfdb' }}>
                            "{m.quote}"
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'GUESTBOOK' && (
                  <div className="marrow-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div className="marrow-box-title" style={{ margin: 0 }}>Marrow.net Guestbook</div>
                      <button
                        onClick={() => { soundEngine.playClick(800); store.openGuestbookModal('marrow'); }}
                        style={{
                          backgroundColor: '#004d4d',
                          border: '2px outset #80deea',
                          color: '#fff',
                          padding: '6px 14px',
                          cursor: 'pointer',
                          fontFamily: '"Times New Roman", Times, serif',
                          fontWeight: 'bold',
                          fontSize: '0.9rem'
                        }}
                      >
                        [ ✦ Sign Guestbook ✦ ]
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {/* Render custom visitor entries */}
                      {store.customGuestbookEntries.filter(e => e.site === 'marrow').map((gb) => (
                        <div key={gb.id} style={{ background: '#002626', border: '2px solid #80deea', padding: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#80cbc4', borderBottom: '1px solid #004d4d', paddingBottom: '4px', marginBottom: '6px' }}>
                            <span style={{ fontWeight: 'bold', color: '#ffcc00' }}>{gb.name}</span>
                            <span>{gb.date} ({gb.location})</span>
                          </div>
                          <div style={{ fontSize: '0.88rem', color: '#ffffff', fontWeight: 500 }}>
                            {gb.comment}
                          </div>
                        </div>
                      ))}

                      {/* Historical entries */}
                      {marrowGuestbook.map((gb) => (
                        <div key={gb.id} style={{ background: '#001a1a', border: '1px solid #004d4d', padding: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#80cbc4', borderBottom: '1px solid #003333', paddingBottom: '4px', marginBottom: '6px' }}>
                            <span style={{ fontWeight: 'bold', color: '#80deea' }}>{gb.author}</span>
                            <span>{gb.date} ({gb.location})</span>
                          </div>
                          <div style={{ fontSize: '0.88rem', color: gb.isAnomalous ? '#ffaa55' : '#e0f2f1' }}>
                            {gb.comment}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'BELOW' && (
                  <div style={{ background: '#000000', color: '#38bdf8', padding: '24px', border: '2px solid #0088cc', fontFamily: 'var(--font-mono)' }}>
                    <h2 style={{ color: '#ffaa55', marginBottom: '12px' }}>{marrowBelowContent.title}</h2>
                    <pre style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                      {marrowBelowContent.content}
                    </pre>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
