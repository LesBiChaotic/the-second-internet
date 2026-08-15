import React, { useState } from 'react';
import { ArchiveWrapperBar } from '../common/ArchiveWrapperBar';
import { ArchiveState } from '../../state/useArchiveStore';
import { blueWindowBlogs } from '../../data/blueWindowData';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const BlueWindowSite: React.FC<Props> = ({ store }) => {
  const { currentSubId, discoverAnomaly } = store;
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(
    currentSubId && currentSubId !== 'bluewindow' ? currentSubId : null
  );

  const forensicMeta = {
    objectId: 'BW-2004-002891',
    collection: 'Collection 13: Blue Window Journaling Network',
    type: 'Personal Weblog Platform & Feed Scrape',
    author: 'Rowan Glass (rowanglass) & Noemi Castille (noemi_c)',
    observedDate: '12 Mar 2004',
    archiveConfidence: 87,
    integrity: 'Impossible' as const,
    knownCopies: 2,
    relatedObjects: 52,
    anomaliesCount: 4,
    anomaliesDescription: 'Server hardware physically decommissioned in Dec 2007, yet Foundation scrapers continue receiving live posts dated 2011, 2018, and 2026 from host 0.0.0.0/rowan.'
  };

  const htmlSource = `<!-- BLUE WINDOW RAW XML/HTML FEED DUMP -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>Blue Window // Personal Journaling Platform</title></head>
<body>
<!-- HOST HARDWARE STATUS: RECYCLED (2008) -->
<!-- INCOMING SOCKET: 0.0.0.0/rowan -->
<!-- USER AGENT SCRAPER: NetHistoryFoundationBot/3.2 -->
</body>
</html>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ArchiveWrapperBar
        store={store}
        siteName="bluewindow.net"
        defaultSnapshotYear={2004}
        availableSnapshots={[2003, 2004, 2005, 2007, 2011, 2026]}
        forensicData={forensicMeta}
        htmlSource={htmlSource}
      />

      <div className="bluewindow-container">
        <div className="bluewindow-wrapper">
          <div style={{ borderBottom: '2px solid #3b82f6', paddingBottom: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', color: '#1e3a8a', fontWeight: 700 }}>
                BLUE WINDOW
              </h1>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Personal diaries, intimate reflections, and late-night weblogs (2003–2007)
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#64748b' }}>
              <div>Community Active: <strong>Extended Scrape</strong></div>
              <div>Entries: 160+ preserved</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {blueWindowBlogs.map((blog) => {
              const isImpossible = blog.isImpossibleDate;
              return (
                <div 
                  key={blog.id} 
                  className="bluewindow-entry"
                  onClick={() => {
                    if (isImpossible) discoverAnomaly('bw-impossible-date');
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: isImpossible ? '#b91c1c' : '#1e40af' }}>
                      {blog.title}
                    </h2>
                    <span className={`badge ${isImpossible ? 'badge-red' : 'badge-gray'}`}>
                      {blog.date} {isImpossible ? '(POST-SHUTDOWN)' : ''}
                    </span>
                  </div>

                  <div className="bluewindow-meta">
                    Author: <strong>{blog.authorName}</strong> (~{blog.authorHandle}) 
                    {blog.mood && ` • Current Mood: ${blog.mood}`}
                    {blog.music && ` • Current Music: ${blog.music}`}
                  </div>

                  <div style={{ fontSize: '0.92rem', lineHeight: '1.7', color: '#334155', whiteSpace: 'pre-wrap', marginBottom: '16px' }}>
                    {blog.content}
                  </div>

                  {/* Comments */}
                  <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '10px' }}>
                      COMMENTS ({blog.comments.length})
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {blog.comments.map((c) => (
                        <div key={c.id} style={{ background: '#fff', padding: '10px 14px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>
                            <strong>~{c.author}</strong>
                            <span>{c.date}</span>
                          </div>
                          <div style={{ fontSize: '0.85rem', color: c.isAnomalous ? '#b91c1c' : '#334155' }}>
                            {c.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
