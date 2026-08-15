import React, { useState } from 'react';
import { ArchiveWrapperBar } from '../common/ArchiveWrapperBar';
import { ArchiveState } from '../../state/useArchiveStore';
import { candleRoomArticles, CandleArticle } from '../../data/candleRoomData';
import { soundEngine } from '../../state/useAudioEngine';

interface Props {
  store: ArchiveState;
}

export const CandleRoomSite: React.FC<Props> = ({ store }) => {
  const { currentSubId, discoverAnomaly } = store;
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    currentSubId && currentSubId !== 'candleroom' ? currentSubId : null
  );

  const forensicMeta = {
    objectId: 'CR-1998-001209',
    collection: 'Collection 07: Paranormal Web Directories',
    type: 'Reconstructed Personal Weird Web Directory',
    author: 'Elena Rostova (witch_candle)',
    observedDate: '02 Feb 1998',
    archiveConfidence: 91,
    integrity: 'Recovered' as const,
    knownCopies: 3,
    relatedObjects: 19,
    anomaliesCount: 2,
    anomaliesDescription: 'First recorded public use of the phrase "The Second Internet". Plaintext origin references Russian Akademgorodok 1974 telemetry files.'
  };

  const htmlSource = `<!-- CANDLE ROOM RAW SOURCE (1998) -->
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">
<html>
<head><title>~* CANDLE ROOM *~ Weird Web Directory (1998)</title></head>
<body bgcolor="#0A0505" text="#E5DADA" link="#FF7733">
<!-- CONTACT: witch_candle@novosibirsk-telecom.ru -->
<!-- "The door does not lock from the inside." -->
</body>
</html>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ArchiveWrapperBar
        store={store}
        siteName="candle-room.com"
        defaultSnapshotYear={1998}
        availableSnapshots={[1998, 1999, 2000, 2001]}
        forensicData={forensicMeta}
        htmlSource={htmlSource}
      />

      <div className="candleroom-container">
        <div className="candleroom-box">
          <h1 className="candleroom-title">🕯 THE CANDLE ROOM 🕯</h1>
          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#ffaa55', marginBottom: '20px' }}>
            A repository of abandoned servers, ghost URLs, numbers stations, and folklore from the edges of cyberspace. (Est. Feb 1998)
          </div>

          {selectedArticleId ? (
            (() => {
              const article = candleRoomArticles.find(a => a.id === selectedArticleId) || candleRoomArticles[0];
              return (
                <div>
                  <button 
                    className="btn btn-secondary" 
                    style={{ marginBottom: '14px', padding: '2px 8px', fontSize: '0.75rem', color: '#ffaa55', borderColor: '#994422' }}
                    onClick={() => setSelectedArticleId(null)}
                  >
                    ← Back to Index
                  </button>

                  <div style={{ borderBottom: '1px dashed #ff7733', paddingBottom: '8px', marginBottom: '16px' }}>
                    <h2 style={{ color: '#ffaa55', fontSize: '1.3rem' }}>{article.title}</h2>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>
                      Author: {article.author} • Added: {article.dateAdded} • Category: {article.category}
                    </div>
                  </div>

                  <div style={{ fontSize: '0.9rem', lineHeight: '1.7', whiteSpace: 'pre-wrap', color: '#e5dada' }}>
                    {article.content}
                  </div>

                  {/* Visitor Comments */}
                  <div style={{ marginTop: '24px', borderTop: '1px dashed #994422', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '0.95rem', color: '#ffaa55', margin: 0 }}>
                        VISITOR COMMENTS ({article.visitorComments.length + store.customGuestbookEntries.filter(e => e.site === 'candle').length})
                      </h3>
                      <button
                        onClick={() => { soundEngine.playClick(800); store.openGuestbookModal('candle'); }}
                        style={{
                          backgroundColor: '#3d1c1c',
                          border: '1px solid #ff7733',
                          color: '#ffaa55',
                          padding: '4px 10px',
                          cursor: 'pointer',
                          fontFamily: '"Times New Roman", Times, serif',
                          fontSize: '0.85rem'
                        }}
                      >
                        [ ✦ Leave a Comment ✦ ]
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {/* Render custom user entries */}
                      {store.customGuestbookEntries.filter(e => e.site === 'candle').map((gb) => (
                        <div key={gb.id} style={{ background: '#2c1414', padding: '10px 12px', border: '1px solid #ff7733' }}>
                          <div style={{ fontSize: '0.75rem', color: '#ffaa55', marginBottom: '4px' }}>
                            <strong>{gb.name}</strong> — {gb.date} ({gb.location})
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 500 }}>
                            {gb.comment}
                          </div>
                        </div>
                      ))}

                      {/* Historical comments */}
                      {article.visitorComments.map((vc, idx) => (
                        <div key={idx} style={{ background: '#1c0e0e', padding: '10px 12px', border: '1px solid #3d1c1c' }}>
                          <div style={{ fontSize: '0.75rem', color: '#ffaa55', marginBottom: '4px' }}>
                            <strong>{vc.user}</strong> — {vc.date}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: vc.isAnomalous ? '#ffbb77' : '#ccc' }}>
                            {vc.comment}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>
                Welcome, wanderer. Most people think the internet is a library. But it is more like an abandoned house with hundreds of unlit rooms. Click on an article below to begin exploring:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {candleRoomArticles.map((art) => (
                  <div
                    key={art.id}
                    style={{
                      background: '#1c0e0e',
                      border: '1px solid #994422',
                      padding: '14px',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s ease'
                    }}
                    onClick={() => {
                      soundEngine.playClick(750);
                      if (art.isAnomalous) discoverAnomaly('candle-article-read');
                      setSelectedArticleId(art.id);
                    }}
                  >
                    <div style={{ color: '#ff7733', fontWeight: 'bold', fontSize: '1rem', marginBottom: '4px' }}>
                      📁 {art.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#aaa' }}>
                      Category: {art.category} • Date: {art.dateAdded}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
